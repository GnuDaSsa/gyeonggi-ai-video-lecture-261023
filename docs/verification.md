# 제작 사례 보강 검증

로컬 브랜치 `codex/lecture-local-case-studies-20261020`

## 2026-10-21 — 5장 부연 문구 삭제

- 합계 아래 원래 지출 비교·추가 전 금액·분담금 제외 문구 삭제. 대체 문구 없음.
- 정적 검증104장/노트 및 diff 검사 PASS. Chromium 문구 부재·합계645,000원 확인. 증거:`output/subscription-copy-removal-qa.txt`.
- 미수행: 전체 화면/영상/Safari 재검수·GitHub push.

## 2026-10-21 — 5장 구독 항목 교정

- 기존 Claude35,000원 항목 삭제, ChatGPT Pro5x를 Claude Max5x로 변경.150,000원 유지. 합계와 발표자 노트 동기화.
- 정적 검증104장/노트·206참조·27해시, Range 단위테스트8개, diff 검사 PASS.
- Chromium 실제 화면:7개 항목, 기본645,000원, 쿠폰485,000원, Claude Max5x·SuperGrok 해제290,000원, Pro20x 제외295,000원, 초기화 PASS.
- 증거:`output/subscription-correction-qa.txt`, `output/playwright/subscription-correction-5.png`.
- 미수행:Safari·프로젝터·전체 강의 재검수·GitHub commit/push. 서비스 정가 재조사가 아닌 사용자 개인 구독 내역 교정.

## 2026-10-21 — 최신 후속 수정 및 작품 넘버링

- 현재104장. 원본55장과98장 및 기존 화성 설명4장 삭제, 현장 영상·활용 결과·Claude 후처리4장 추가. 화성 최종본 유지. 58장은2×2 기존 작풍과 선택 이유.
- 65장 피지3번째·73장 드론축구4번째·94장 화성5번째 소제목. 57장두번째 유지. 비교·실습·참조클립은 번호 제외. 97장은Real-ESRGAN GitHub와Claude 연결, 프레임→확대→영상 개요로 축약.
- 첨부MOV는원본을보존하고MP4 remux. 비디오·오디오패킷SHA-256 일치. 브라우저duration10.516초(표기10.5초),1080p,H.264/AAC. 화성 최종편집본/최종4K의원음패킷해시도 일치.
- 사용자 요청에 따라 로컬Claude CLI의기존세션을읽기전용·비영속fork로질의. 응답을보존코드·세션로그·실제추출프레임으로대조. 삭제된up4k.py전체코드는원세션로그에서확인. 새후처리/업스케일은실행하지않음. 근거는`docs/hwaseong-postproduction-evidence.md`.
- `node scripts/verify.mjs`:104장/노트·206로컬참조·27에셋해시·83목록·9갤러리·안정ID이동·JS문법 PASS. Range서버unittest8개, `git diff --check`, harness validation PASS.
- Chromium1440×900/1920×1080/390×844:50/58/60/94–98장및최신65/73/94/97장의레이아웃·이미지로드·경계·가로넘침 PASS.58장2×2, 확대갤러리와v5자막확대,49→50/59→60이동·삭제목차제거 확인.
- 현장영상8초·독립운동가120초·화성24초탐색과재생진행·이탈정지 PASS. 최신소제목추가후플레이어컨트롤·소스보존확인. console오류/경고0. 대표데스크톱/모바일스크린샷시각검수.
- Astra Ultra:후처리근거검토 및 최신번호/노트/97장축약읽기전용재검토 PASS.
- 증거:`output/lecture-revision-qa.txt`, `output/lecture-numbering-qa.txt`, `output/playwright/revision-*.png`, `output/playwright/numbering-*.png`, `output/lecture-revision-preservation.json`.
- 미수행:Safari·실제프로젝터·전체음향청취·전체104장리허설·새업스케일/전체시간축화질QC·성과공식문서확인·GitHub commit/push. 성과3개는사용자직접진술범위.

## 2026-10-21 — 57장 실제 영상 상영

- 발견한 원본:`/Users/gnudas/Documents/메일보내기/CapCut 영상_2026-07-28_메일용.mp4`. 현재 성남→남상목·한백봉·한순회→현대 일상/감사 인사까지 파일 내용을 확인해 해당 프로젝트로 특정.
- 원본/강의 사본 SHA-256 일치.217.778005초,1920×1080,30fps,H.264/AAC,83,939,763바이트. 전체 디코드 종료0·오류로그0바이트. MP4 Git LFS 속성 확인.
- 소제목 `시댄스로 만든 두번째 작품`과 큰 네이티브 플레이어. 자동재생은 하지 않고 재생/탐색/전체화면 컨트롤 제공.58–59장 본문은 유지.
- `node scripts/verify.mjs`:104장/노트,203참조,21에셋해시,83목록/9갤러리,소제목/영상컨트롤 PASS.
- 초기 브라우저 탐색 실패:기존 기본 Python 서버가 `Range: bytes=1000-1999` 요청에도200/전체 길이로 응답.120초 탐색이0초로 돌아가는 현상을 확인.
- 로컬 전용 `scripts/serve.py`로 같은8765포트 교체.GET의206/Content-Range/정확한1000바이트 응답 확인. 범위·suffix·HEAD·조건부304·416·fallback·404 등 unittest8개 PASS.
- Astra 코드 리뷰에서 HEAD/조건부 요청 처리를 지적해 기본 핸들러로 위임하고 테스트 보강. 재리뷰 PASS. 수정 후 기존8765서버의 HEAD200/조건부304/GET206과 실제 영상 탐색 모두 재검증.
- Chromium 1440×900,1920×1080,390×844:57장 제목·플레이어 경계·가로 넘침 PASS. 실제 재생 진행,120초/210초 탐색,영상 전체화면,58장 이동 시 일시정지,복귀 시 정지 유지 PASS.
- 58장9이미지 갤러리 열기/닫기 재확인. 브라우저 console 오류·경고0. 종료 시57장0초·정지·음소거 해제 상태.
- 증거:`output/independence-film-qa.txt`, `output/playwright/independence/screening-*.png`, `output/independence-film-candidate/ffprobe.json`/`decode.log`/샘플 프레임.
- 미수행:Safari·실제 프로젝터·전체 음향 청취·공식 최종 마스터 승인/메일 발송 확인·GitHub commit/push. 발견 파일은7/28 메일용 내보내기본으로 명시.

## 2026-10-21 — 사용자 작풍 설명 교정

- 57장: 시청 건물 대신 기존 고양이·열차창 인물 MV 장면 사용. 보훈 주제라 일본풍 대신 진중한 수묵화를 선택했다는 설명으로 변경.
- 58장: 과거 봉화와 현재 성남의 공원2열 비교. 시작·복귀의 깔끔한 선은 과거·현재 대비를 위한 선택으로 설명. 노트57–59와 근거·계약·기억 동기화.
- 직전104장과 비교해 본문 수정은57–58, 노트 수정은57–59로 한정. 기존 장표 순서·갤러리9장·파일 해시 보존.
- `node scripts/verify.mjs`:104장/노트,201로컬 참조,19에셋 해시,83개 파일 목록,9장 갤러리 PASS. `git diff --check` PASS.
- Chromium 1440×900,1920×1080,390×844의57–59장 이미지 로드·경계·가로 넘침 PASS. 데스크톱57·58,모바일58 캡처 직접 확인.
- 데스크톱/모바일9장 갤러리 로드·방향키·Esc·포커스·이탈닫기와56→60 이동 재검증 PASS. console 오류·경고0.
- Astra Ultra: 사용자 의도와 화면·노트·근거의 일치 확인, 필수 수정 없음.
- 증거: `output/independence-style-intent-qa.txt`, `output/playwright/independence/updated-*.png`. 비교본 `output/before-style-intent/`.
- 미수행: Safari·프로젝터·전체 리허설·영상 전체 재생/디코드 재검증·GitHub commit/push. 이번 수정은 이미지 재사용과 작풍 설명에 한정.

## 2026-10-21 — 독립운동가 사례 및 후기 자료 보강

- 총104장. `node scripts/verify.mjs`:104개 노트 제목·본문,201개 로컬 참조,19개 에셋 해시,83개 복구 파일 목록·8개 사본 대응,9개 갤러리 항목, 삽입 위치·안정ID·프롬프트·영상컨트롤·JS 문법 PASS.
- 삽입 직전 로컬101장과 비교해 본문·순서 보존 확인. 러닝번호만 변경. 기존 노트는 보존하고 `lecture-057`에 연결 설명만 추가.
- 후기 PNG83개는 같은 세션의 프로젝트 경로 지정 이력과 대조. Astra Ultra가83개 원본 크기·SHA-256과8개 강의 사본 원본 일치를 별도로 확인. 초기·후기 이미지 픽셀 직접 확인.
- Astra Ultra 최종 사실·서사·문구 리뷰 PASS. 중간 작풍 재설정, 후기 제작,7/28 사용자 완료 보고와 최종 MP4 미검증의 구분 확인.
- Chromium 1440×900,1920×1080,390×844의57–59장: 이미지 로드·장표 경계·가로 넘침 검사 PASS. 데스크톱3장과 모바일 대표 캡처 시각 검수.
- 9장 갤러리: 데스크톱·모바일 전 이미지 디코드, 첫·마지막 버튼 상태, 방향키 격리, Esc로 목록 복귀→닫기, 포커스 복원, 소유 장표 이탈 시 닫기 PASS. 갤러리 화면 경계와 캡처 확인.
- 56→57→58→59→60 연결 PASS. 기존 컴퓨터 유즈·자료 모음 ID 이동과 화성 프롬프트 열기/Esc는 앞선 같은 날짜 검사에서 PASS.
- 화성 영상은 변경하지 않음. 같은 날짜 앞선 메타데이터 검사59.906009초·3840px, 자동재생 없음·오류 없음. 전체 디코드는 아래10/20 결과이며 이번에 재실행하지 않음.
- 브라우저 console 오류·경고0. `git diff --check`, harness validation PASS.
- 최신 증거: 로컬 `output/independence-recovered-qa.txt`, 실행 코드 `output/independence-recovered-qa.js`, `output/playwright/independence/updated-*.png`, `gallery-*.png`. 이전 검사 로그도 보존. 비교본 `output/before-20261021/`.
- Playwright CLI는 `file:` 프로토콜을 지원하지 않아 직접 파일 열기는 검사하지 못했으며 같은 파일을 기존 localhost 서버로 제공해 검사.
- 미수행: Safari·프로젝터·전체 강의 리허설, 독립운동가 최종 MP4 동일성·개별 컷 최종 채택·역사 감수·배포 확인, GitHub commit/push. 제작 완료는7/28 사용자 보고에 근거하며 이번에 최종 영상을 재검증했다는 뜻이 아님.

현재 미리보기: `http://127.0.0.1:8765/#slide-65`. 화성 상영 장표는94장.

## 2026-10-20 — 최초 사례 보강 당시 통과

| 항목 | 확인 결과 |
| --- | --- |
| 구조·근거 리뷰 | 사용자 지정 `gpt-6-astra` / `ultra`가 수정 전 구조와 수정 후 근거·내용을 읽기 전용 검토. 최종 PASS |
| 기존 내용 보존 | 기준 커밋 `303eb497014cb0cea99b9e629c65b39b607e31fe`의 91개 제목·순서 보존, 사례 10장 추가 |
| 정적 검증 | `node scripts/verify.mjs`: 101장, 러닝번호, 발표자 노트 제목·순서, 192개 로컬 참조, 10개 에셋 크기·SHA-256, 이동 대상, JS 문법 |
| 화면 | Chromium 1440×900 / 1920×1080 / 390×844에서 신규 10장 검사. 장표 경계 이탈·가로 넘침 없음 |
| 시각 검수 | 신규 10장 데스크톱 캡처와 모바일 대표 장표 확인. 91장 하단 설명·94장 표 간격 수정 후 재검사 |
| 이동 | 69→70, 74→75, 94→95 경계와 컴퓨터 유즈·실습 자료 ID 이동 확인 |
| 실제 프롬프트 | 제작 원문과 TXT·모달 본문 일치. 열기, 방향키 격리, Esc 닫기, 포커스 복원, 장표 이탈 시 닫기 확인 |
| 영상 | Claude 기존 작업 맥락에 질의해 최종본 확인. 원본과 복사본 해시 일치. H.264 / AAC, 3840×2160, 30fps, 59.906009초 |
| 디코드 | `ffmpeg -v error -i assets/case-studies/hwaseong-final.mp4 -f null -`: 전체 파일 디코드 성공, 오류 로그 없음 |
| 브라우저 재생 | 화성 영상 재생 진행, 30초 탐색, 실제 영상 프레임, 장표 이탈 시 일시정지, 전체화면 확인 |
| 문구 | 신규 장표의 짧고 구체적인 제목·본문, 원문 프롬프트, 실패·부분 개선 한계 확인. 과거 후보를 최종 채택본으로 단정하지 않음 |

## 재현

```bash
node scripts/verify.mjs
python3 -m unittest discover -s scripts -p 'test_*.py'
git diff --check
python3 scripts/serve.py
```

현재 브라우저에서 드론 사례는 `http://127.0.0.1:8765/#slide-76`, 화성 상영은 `#slide-98`을 확인한다. 이전 기록의 번호는 당시 버전이다.
화면 검증은 Playwright CLI의 실제 Chromium으로 수행했다. 세부 실행 코드와 결과는 로컬 `output/layout-qa.txt`, `output/interaction-qa.txt`에 있다.
캡처는 `output/playwright/`, 미디어 메타데이터는 `output/hwaseong-ffprobe.json`, 디코드 로그는 `output/hwaseong-decode.log`에 있다. `output/`은 Git 제외다.

## 수행하지 않은 검증·작업

- 실제 강의실 프로젝터, 별도 Safari/WebKit 엔진, 강사의 전체 영상·음향 청취.
- 기존 91장 전체에 대한 모든 인터랙션·화면의 재검수.
- PDF/PPT 변환 또는 `pack-single.mjs` 단일파일 생성.
- 신규 영상 생성, 원본 제작 프로젝트 변경, 공모전 제출·Drive 업로드.
- GitHub commit/push·배포. 현재 결과는 로컬 작업본이다.

브라우저 영상 검사는 음소거 상태에서 수행했다. 전체 디코드 성공은 장면의 의미·연출·음향 품질에 대한 사람의 최종 승인을 뜻하지 않는다.

## 2026-10-21 최신 후속 수정

- 대상: AI 슬롭40, 작풍 선택 이유58, 푸드테크64, 드론75–78 순서/삭제, 컴퓨터 유즈85–87 이동, Seedance 문법96, 화성 효과98·소개 자막101.
- 정적:104장·104노트·213로컬참조·35에셋 해시·전체JS 구문 검사.
- Chromium:1440×900 /1024×768 /390×844에서11개 장표(33회) 실제 활성ID·이미지 decode·가로 넘침·슬라이드 경계 확인. 확대창10개 열기/Esc 닫기,5개 앞뒤 이동 체인, 영어 예시 전문HTTP확인 PASS.
- 대표 스크린샷 직접 확인:푸드테크64, 문법96, 효과98, 자막101(데스크톱)과 자막101모바일. `output/playwright/followups-*.png`.
- 결과: `output/final-followups-qa.txt`. 첫 검수에서 푸드테크64가63장 갤러리 안에 중첩된 문제와96장 하단 넘침을 발견해 수정했다. 실패 화면을 완료 증거로 사용하지 않음.
- 중첩 원인:단순 section 정규식이 갤러리의 내부 section을 장표 끝으로 오인. 삽입 위치를 실제 형제 장표 경계로 수정하고 `scripts/verify_structure.py`의 HTMLParser로 모든 slide가 main#canvas 직접 자식인지 검사. 구조 회귀5개 추가. 기존 갤러리 내부 일반section은 허용한다.
- Astra 읽기 전용 검수:사용자 의도·장표 순서·6개 실제 스틸·상태 구분 PASS. 원코드 변수명/전환 프레임 설명2곳 정정 반영.
- 이번에 새 이미지·영상 생성, 원본 재렌더, 전체 강의실 리허설, Safari/프로젝터 검수, GitHub commit/push는 하지 않았다. verifyFull은 미설정.
- 최종 quick 검증:정적 검사 및 Python13개 테스트 PASS, `git diff --check`, harness validation PASS.
- 추가 GUI:63장 기존 갤러리 닫기→64장 이동,97장 최종영상 재생·33.65초 탐색·이탈 정지 PASS(3840×2160,59.906009초). 갤러리의 첫Esc는 상세→전체목록으로 돌아가는 기존 동작이라 닫기 버튼으로 확인. `output/final-followups-media-qa.txt`.
- 균형 있는 section 파싱으로 직전 추가 전 HTML과 본문 보존 비교:푸드테크1장 추가, 드론 우선점1장 삭제, 문법·효과·자막3장 변경 외 본문 동일. 이동한 컴퓨터 유즈3장 본문 동일. `output/final-followups-preservation.json`.

## 2026-10-21 최신 — 작풍 선택·순서 교환·실제 프롬프트 모달·Dola

- 최종105장/105노트/221로컬참조/45해시. Python13테스트와 HTML구조·JS구문·git diff --check PASS.
- `output/style-syntax-preservation.json`:직전104장 대비 Dola1장 추가, 캐릭터후보/문법2장 본문 변경 외 기존본문 보존. 요금·순서는본문변경없이이동.
- 실제Chromium 9장×3뷰포트(1440×900,1024×768,390×844)=27레이아웃 PASS. 이미지 decode,경계이탈/가로넘침없음. 작풍후보5+Dola1확대/Esc PASS.
-54요금→55순서→56문법→57할인→58Dola→59상영,46→47작풍후보→48,97스킬→98화성 이동체인 PASS.
- 모달:버튼으로열기,새탭없음,원문전체TXT와일치,모바일스크롤,방향키격리,Esc/닫기,포커스복귀,장표이탈닫기·정지 PASS. 실제결과영상 재생진행/10초탐색/닫기정지 PASS.
- 피지S09 원본바이트복사·해시일치 및 `ffmpeg -v error -i assets/case-studies/seedance-fiji-s09.mp4 -f null -` 전체디코드 PASS. 기존개별QC PASS와 연결. 이번청감검수·최종출품편집채택검증은 미수행.
-1차레이아웃검사에서 story-preview 기본16:9가 새그림컨테이너에 적용돼 높이넘침/크롭 발생. 해당신규클래스에 aspect-ratio:auto 적용후재검사PASS. 닫기이벤트비동기경계에서 즉시정지보장을위해 close/cancel에도pause처리.
- 스크린샷 `output/playwright/latest-*.png`, GUI실행/결과 `output/style-syntax-qa.js`/`.txt`. 대표데스크톱3장과모바일전문창을직접열람.
- Astra읽기전용추가검토 PASS. 노트의 ‘다음58–59장’을 ‘다음 작풍·기획 장표’로교정.
- 미수행: Dola실제무료생성·다운로드·워터마크검증,전체강의리허설/프로젝터/별도Safari,새생성·결제·commit/push. verifyFull미설정.

## 2026-10-21 — 57쪽 할인·Unlimited 삭제

- `lecture-056`만 삭제, 총104장. 나머지 본문·순서 보존(러닝번호 제외).
- 구조/노트/참조/해시 검사, Python13테스트, diff 공백 검사 PASS.
- IAB 목차에서 삭제 확인, 현재57쪽 Dola 화면 확인.
- 전체 리허설·GitHub commit/push 미수행.

## 2026-10-21 — 워크플로우 위치 이동

- 기존81장 lecture-071을 lecture-074 바로 앞으로 이동. 현재83워크플로우→84컴퓨터 유즈.
- 전체104장 본문 보존(번호 제외), 노트 동기화, 구조/에셋 검사와13테스트 PASS. IAB 목차 확인.
- 전체 리허설·GitHub commit/push 미수행.

## 2026-10-21 — 89쪽 Claude Code도 활용 삭제

- lecture-076만 삭제, 총103장. 나머지 본문·순서 보존(번호 제외), 노트 동기화.
- 구조/참조/해시 검사, Python13테스트, diff 검사 PASS. IAB 목차 삭제 확인.
- 전체 리허설·GitHub commit/push 미수행.

## 2026-10-21 — 95쪽 힉스필드 링크

- 힉스필드 이미지·문구를 공식 https://higgsfield.ai/community 새 탭 링크로 변경. XAZINGA 확대와 다른 본문 보존.
- 공식 홈페이지 Community 링크 확인, IAB 실제 클릭 후 /ko/community 로딩 확인. 구조·참조·해시 검사와13테스트 PASS.
- 전체 리허설·GitHub commit/push 미수행.

## 2026-10-21 — 후처리를 시도한 계기

- 새97장 case-postproduction-origin. 기존103장 본문·순서 보존(번호 제외), 총104장.
- 구조/참조/에셋해시/노트 검사와 Python13테스트 PASS. diff·harness validation PASS.
- 1440×900,1024×768,390×844의 내용 경계·가로 overflow 검사 PASS. 모바일 끝까지 스크롤하면 마지막 적용 흐름도 HUD 위에 모두 노출.
- 96화성영상→97계기→98효과 이동 PASS. IAB 최신 목차 확인.
- 첫 QA는 구105장 페이지에서 hash만 이동하여 새 DOM이 없어 타임아웃. 명시적 reload 후 최신104장으로 정상 검증.
- Astra 문구검토 PASS. 탐구한 기술과 화성의 실제 사용 스택을 구분.
- 증거: output/playwright/post-origin-{1440,1024,390}.png, post-origin-390-ending.png, output/post-origin-qa.txt.
- 새 영상 생성·전체 리허설·GitHub commit/push 미수행.

## 2026-10-21 — 후처리 GIF·새 마무리

- 구101 소개자막/102생성구간 삭제,103CapCut 결론을 향후계획으로 교체.100뒤 추천1장. 현재101추천→102향후계획→103감사. 삭제된 장표의 에셋·근거는 보존.
- 97쪽 HyperFrames·Three.js공식9초GIF(108프레임), Remotion공식2초GIF(60프레임), 내화성13.3–16.7초GIF(3.41초/41프레임) 추가.3정지포스터와출처등록. 원본 영상 무변경.
- 구조/참조/51해시/103노트·13테스트·diff·harness PASS. GIF3개전체디코드PASS.
- 97/101/102장×1440·1024·390폭=9레이아웃 경계검사PASS. GIF3개450ms차이실제픽셀변화,3확대/Esc,저감모션3정지포스터PASS. reduced-motion 첫검사는선택소스전환비동기타이밍으로실패, 실제currentSrc변화를기다린뒤PASS.
- 96→97→98 및100→101→102→103이동PASS. IAB최신목차/102향후계획확인.
- 증거: output/ending-qa.txt, output/post-gifs-qa.txt, output/playwright/ending-*.png, post-gifs-*.png. 정지미리보기는 실제reduced-motion화면.
- 새모델생성·전체리허설·GitHub commit/push 미수행. 외부GIF재배포조건 미확인으로공개전권리검토필요.
