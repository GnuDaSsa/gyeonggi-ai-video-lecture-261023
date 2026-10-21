# 261023 경기도청 강의

사진우의 AI 영상 제작 경험과 에이전틱 영상 제작 워크플로우 강의 자료.

- 기준 폴더: 바탕화면 `261023경기도청 강의`
- 공개 시점: 2026-10-20
- 슬라이드: 103장
- 시작 파일: `index.html`

## 실행

영상은 Git LFS로 관리합니다. Git LFS를 설치한 후 내려받으세요.

```bash
git lfs install
git clone https://github.com/GnuDaSsa/gyeonggi-ai-video-lecture-261023.git
cd gyeonggi-ai-video-lecture-261023
git lfs pull
```

`index.html`을 브라우저에서 열면 됩니다. 폴더 구조를 유지해야 이미지와 영상이 표시됩니다. 방향키로 이동하며 전체화면 버튼을 사용할 수 있습니다.

로컬 서버로 열려면:

```bash
python3 scripts/serve.py
```

이후 `http://127.0.0.1:8765`에 접속하세요. 이 서버는 영상 구간 탐색을 위한 HTTP Range 요청을 지원합니다. 다른 포트는 `--port 8000`으로 지정합니다.

## 파일

- `index.html`: 강의 슬라이드
- `*.css`, `*.js`: 디자인과 인터랙션
- `assets/`: 영상·사진·GIF·폰트 등
- `assets/ai-slop-found/sources.md` 등: 참고 이미지 출처

참고·인용된 이미지와 영상의 권리는 원저작자에게 있습니다. 공개 저장소에 포함되었다는 이유로 해당 자료의 별도 이용 권한이 부여되는 것은 아닙니다.

## 현재 장표 구성 · 2026-10-21

- 40장: AI 슬롭을39장 이미지 중요성 바로 뒤로 이동.
- 47장: 캐릭터 후보 선택. Midjourney 공식 작풍 선택 이미지와 Grok 스타일 변환 예시4개. 클릭 확대.
- 52장: 사용자 첨부 성남시청 현장 상영영상10.5초. 재인코딩 없이MP4 remux.
- 54–57장: 요금 → 시댄스로 만드는 순서 → 프롬프트 문법 → Dola 체험.
- 56장: 피지S09 실제 제출 원문과 개별 검수PASS 결과. 버튼을 누르면 HTML 안에서 전문·15초 결과영상 확인. 당시 한국어 원문이며 현행 영어 스킬로 소급 변환한 예시가 아님.
- 57장: Aside 실제Dola 모델 선택 스크린샷. 공식 무료 플랜의 일일 영상 생성 제한, 실제2.0Fast/5초·10초 선택지. 정확한 무료횟수·출력 워터마크·화질은 미확인으로 구분.
- 58–61장: 성남 독립운동가 상영, 작풍 선택 이유, 기획, 영상 활용 결과. 보훈이라 일본풍 대신 진중한 수묵화, 현재 성남 시작·복귀는 과거와 구분되는 깔끔한 선이라는 사용자 의견 유지.
- 65장: 푸드테크 ‘너무 자글자글해서 싫어’ 피드백과 이전/Seedream5.0Pro 시트 비교. 단순 노이즈 제거 실험이 아니라 재제작 사례.
- 주요 작품 소제목:58장 두번째,67장 피지3번째,75장 드론축구4번째,96장 화성5번째.
- 75–79장: 드론축구 상영, 참조 분리, 에셋 관리, 공중 동작, Blender 한계.
- 81–84장: 코딩 에이전트 → 내 컴퓨터의 자료도 작업 대상 → 내 영상 제작 워크플로우 → 컴퓨터 유즈.
- 84–88장: 컴퓨터 유즈, Codex 자동화, Runway Unlimited, 개발자 도구, 검수용 파일 정리.
- 97장: Opus5.5 바이럴 영상 → 웹 기술 탐구 → HTML 위 효과라는 깨달음 → Claude와 후처리 시도. HyperFrames·Three.js 공식 카드, Remotion 공식 로고, 내 화성 후처리 GIF3개와 클릭 확대. 외부 데모는 Opus 생성물이라는 뜻이 아님.
- 96–100장: 화성4K 최종본(59.906초), 후처리 계기, Claude 후처리4장면, 색보정, GitHub 도구로4K 업스케일.
- 100장: 실제 Mac/Real-ESRGAN 활용과 Windows용 Video2X GitHub·GUI 선택지. Windows 실행은 미검증.
- 101–103장: 추천하는 방식 → 향후 계획 → 감사합니다. 기존 소개자막·생성구간 장표 삭제, CapCut 결론을 향후계획으로 교체.
- 독립운동가 영상은7/28 메일용 내보내기본(3분38초/1080p), 원본 그대로 포함. 공식 최종 마스터 승인·배포 상태까지 검증했다는 뜻은 아님. 후기PNG83개 목록 중8장과 초기1장의 확대 갤러리 제공.

## 근거와 검증

- `발표자노트.md`, `docs/speaker-notes.json`:103장 제목·순서 동기화.
- `assets/case-studies/provenance.json`:원본·URL·크기·해시.
- `docs/case-study-evidence.md`, `docs/independence-case-evidence.md`, `docs/hwaseong-postproduction-evidence.md`:프로젝트 근거·한계.
- `docs/foodtech-character-evidence.md`, `docs/seedance-syntax-evidence.md`, `docs/style-selection-evidence.md`, `docs/dola-verification.md`:후속 요청 근거.
- 검증: `node scripts/verify.mjs && python3 -m unittest discover -s scripts -p 'test_*.py'`.
- 실제 화면·인터랙션·미디어 검증과 미수행 항목은 `docs/verification.md`.

원본 제작 폴더는 변경하지 않았고 새 이미지·영상 생성·결제는 수행하지 않았습니다. 사용자 요청에 따라 현재 수정본을 `codex/lecture-local-case-studies-20261020` 브랜치에 저장합니다. `main` 병합과 웹 배포는 별도입니다.

외부 GIF 출처·권리 확인 범위는 `docs/postproduction-gif-sources.md`. 외부 미디어의 개별 재배포 허락까지 확인한 것은 아니며, 저장소 공개가 별도 이용 허락을 뜻하지 않습니다.
