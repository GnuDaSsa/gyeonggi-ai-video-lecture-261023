# Seedance 문법 장표 근거

2026-10-21. 현재56장 `lecture-084`. 사용자가 보고 있던54장(시댄스로 만드는 순서) 직후로 이동. 앞선54/55교환을 반영해 최종54요금 →55순서 →56문법. 영상 생성·Runway 실행 없음.

## 현행 문법과 당시 제작 원문의 구분
- 설치된2.0/default `seedance-prompting.md`와 `seedance-shared-contract.md` 확인.
- 현행 입력은 영어, 첫 줄 길이/샷 수 → STYLE → IDENTITY → 참조 역할 → `Shot k (a-bs):` → `Sound:` → `End frame:`.
- Atmosphere/Continuity는 강의용 분류이며 필수 리터럴 헤더가 아니다. 시간표는 의도이며 실제 결과의 프레임 단위 보장 아님.
- 이전 가상 영어 예시는 장표에서 제거. 실제 성공 사례로 피지S09 당시 한국어 원문을 그대로 보존. 현행 스킬 템플릿에 맞게 소급 번역·재작성한 것처럼 소개하지 않는다.

## 원문 ↔ 생성 결과
프로젝트 루트: `/Users/gnudas/Documents/Codex/video-team-runtime/20260824_191442_kim-wooyoung-fiji-rebuild`
- 원문: `lanes/seedance/prompts/fresh_v1/S09_CEREMONY_CULTURE_prompt_ko.txt`
- `.strip()` SHA-256: `6c81d79fc5576d75ac0459a9adf0c48d219d2270028b5d9d332d5c844bb1edb6`. registry의 card16 `prompt_hash`와 일치(Astra 읽기전용 확인).
- 결과: `media/07_videos_approved_영상승인/S09_CEREMONY_CULTURE_runway_card16_seedance2_0.mp4`
- 파일 SHA-256: `322186a6760f38b1340191bd8618e609f93adbd6a24628fa760fefd91e185b19`
- 24,293,304 B /15.069002초 /H.264 1280×720 24fps /AAC. 원본 그대로 복사하고 전체 ffmpeg 디코드 확인.
- QC: `lanes/seedance_qc/evidence/S09_CEREMONY_CULTURE_runway_card_16_qc.json`, 2026-08-25 개별 PASS. registry approved.
- 원문 요청:0–8초 리본 절단→박수 /8–15초 나무 아래 카바 컵 전달. 실제 전환8.833333초. 정확히8초 전환 성공으로 과장하지 않는다.
- QC 성공 범위: 리본의 물리적 분리, 박수, 어깨 이완·큰 미소, 두 손 컵 전달, 중대한 중복 인물·글자·검은 프레임·프리즈 없음. 최종 출품본 채택 여부까지 주장하지 않는다.
- 원본 `frames/card16_02.jpg`, `card16_07.jpg`를 결과 스틸로 사용.

## 강의 파일과 인터랙션
- `assets/case-studies/seedance-fiji-s09-prompt.txt` 원문, HTML template에 전문을 그대로 포함.
- `assets/case-studies/seedance-fiji-s09.mp4` 결과, `seedance-fiji-ribbon.jpg`/`seedance-fiji-cup.jpg` 스틸.
- 전문 버튼은 `#seedance-prompt-dialog`를 열고 새 탭/외부TXT로 나가지 않는다. 전문 스크롤, 결과 재생·탐색, Esc/닫기/바깥클릭, 포커스 복원, 장표 이탈 시 닫힘·재생 정지.
