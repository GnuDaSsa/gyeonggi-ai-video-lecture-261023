import fs from 'node:fs';
import path from 'node:path';
import {once} from 'node:events';
import {fileURLToPath} from 'node:url';

const sourceDir=path.dirname(fileURLToPath(import.meta.url));
const outputDir=path.join(path.dirname(sourceDir),'260915 경기도청 발표_단일파일');
const outputName=process.argv[2]||'260915-경기도청-발표-단일파일.html';
const outputFile=path.join(outputDir,outputName);
const temporaryFile=outputFile+'.partial';
const mime={
  '.woff2':'font/woff2','.mp4':'video/mp4','.png':'image/png','.gif':'image/gif',
  '.jpg':'image/jpeg','.jpeg':'image/jpeg','.svg':'image/svg+xml'
};
const read=file=>fs.readFileSync(path.join(sourceDir,file),'utf8');
const assetInfo=reference=>{
  const clean=reference.replace(/\\\\/g,'/').replace(/^\.\//,'').split(/[?#]/,1)[0];
  if(!clean.startsWith('assets/'))return null;
  const absolute=path.resolve(sourceDir,clean);
  if(!absolute.startsWith(sourceDir+path.sep))throw Error('Invalid asset path: '+reference);
  if(!fs.existsSync(absolute)||!fs.statSync(absolute).isFile())return null;
  const type=mime[path.extname(absolute).toLowerCase()];
  if(!type)throw Error('Unsupported asset type: '+reference);
  return {absolute,type};
};

if(fs.existsSync(outputFile))throw Error('Existing single-file output found: '+outputFile);
fs.mkdirSync(outputDir,{recursive:true});
const output=fs.createWriteStream(temporaryFile,{encoding:'utf8'});
const write=async text=>{if(!output.write(text))await once(output,'drain')};
const writeAsset=async reference=>{
  const asset=assetInfo(reference);
  if(!asset)return false;
  await write(`data:${asset.type};base64,`);
  let carry=Buffer.alloc(0);
  for await(const chunk of fs.createReadStream(asset.absolute,{highWaterMark:3*1024*1024})){
    const joined=carry.length?Buffer.concat([carry,chunk]):chunk;
    const usable=joined.length-joined.length%3;
    if(usable)await write(joined.subarray(0,usable).toString('base64'));
    carry=usable===joined.length?Buffer.alloc(0):joined.subarray(usable);
  }
  if(carry.length)await write(carry.toString('base64'));
  return true;
};
const writeAttributeAssets=async text=>{
  const pattern=/\b(src|href|poster)=(['"])((?:\.\/)?assets\/[^'"]+)\2/g;
  let cursor=0;
  for(const match of text.matchAll(pattern)){
    await write(text.slice(cursor,match.index));
    await write(`${match[1]}=${match[2]}`);
    if(!(await writeAsset(match[3])))await write(match[3]);
    await write(match[2]);
    cursor=match.index+match[0].length;
  }
  await write(text.slice(cursor));
};
const writeScriptAssets=async text=>{
  const pattern=/(['"])((?:\.\/)?assets\/[^'"]+)\1/g;
  let cursor=0;
  for(const match of text.matchAll(pattern)){
    await write(text.slice(cursor,match.index));
    await write(match[1]);
    if(!(await writeAsset(match[2])))await write(match[2]);
    await write(match[1]);
    cursor=match.index+match[0].length;
  }
  await write(text.slice(cursor));
};
const cssWithAssets=text=>text.replace(/url\((['"]?)((?:\.\/)?assets\/[^)'"\s]+)\1\)/g,(_,__,reference)=>{
  const asset=assetInfo(reference);
  return asset?`url("data:${asset.type};base64,${fs.readFileSync(asset.absolute).toString('base64')}")`:_;
});

try{
  let html=read('index.html');
  html=html.replace(/<link\s+rel=(['"])stylesheet\1\s+href=(['"])([^'"]+\.css)(?:\?[^'"]*)?\2\s*>/g,(_,__,___,stylesheet)=>`<style>${cssWithAssets(read(stylesheet))}</style>`);
  const scripts=[];
  html=html.replace(/<script\s+src=(['"])([^'"]+\.js)(?:\?[^'"]*)?\1\s+defer><\/script>/g,(_,__,script)=>{
    let code=read(script).replace(/<\/script/gi,'<\\/script');
    if(script==='app.js'){
      code=code.replaceAll("!/^\\.\\/assets\\//.test(path)","!/^\\.\\/assets\\//.test(path)&&!/^data:(video\\/mp4|image\\/(?:png|gif|jpeg|svg));base64,/.test(path)");
    }
    scripts.push(code);
    return '';
  });
  const bodyClose=html.lastIndexOf('</body>');
  if(bodyClose<0)throw Error('Closing body tag not found');
  await writeAttributeAssets(html.slice(0,bodyClose));
  await write('<script>');
  for(const script of scripts)await writeScriptAssets(script);
  await write('</script></body>'+html.slice(bodyClose+'</body>'.length));
  output.end();
  await once(output,'finish');
  fs.renameSync(temporaryFile,outputFile);
  console.log(`Created ${outputFile}`);
  console.log(`Size: ${fs.statSync(outputFile).size} bytes`);
}catch(error){
  output.destroy();
  if(fs.existsSync(temporaryFile))fs.unlinkSync(temporaryFile);
  throw error;
}
