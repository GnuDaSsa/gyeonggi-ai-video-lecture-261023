# 실사풍 가상 인물 생성 예시

2026-09-13, 사용자의 요청에 따라 내장 `image_gen`으로 각각 별도로 생성한 여덟 장이다. 현재 강의 39쪽 다음, 새 40쪽 「내가 실사를 안 했던 이유」에 사용한다.

턱선의 과도한 정돈, 피부 보정감, 눈의 반사, 미소, 비슷한 미형 인상을 설명하기 위해 특징을 의도적으로 강조해 요청했다. 특정 실제 인물이나 유명인의 사진을 참조하지 않았다. 일반 프롬프트로 무작위 표본을 수집한 실험이나, 특정 모델의 실패율을 보여주는 자료가 아니다.

이미지는 원본 PNG를 그대로 복사했다. 슬라이드 미리보기는 CSS로 얼굴 쪽을 보여주고, 클릭하면 자르지 않은 원본을 확대한다. 생성 이미지 안의 얼굴·피부를 별도 보정하지 않았다.

공통 지시와 각 이미지별 전체 프롬프트: `../../realism-examples.json`.

## 원본 생성 파일

- `01-sculpted-jaw-woman.png` ← `C:\Users\sajw1\.codex\generated_images\01a08091-36ef-7f00-90b2-c6c3e611f5d8\exec-c7558e55-3270-4007-b9ab-157e35b40aeb.png`
- `02-sculpted-jaw-man.png` ← `C:\Users\sajw1\.codex\generated_images\01a08091-36ef-7f00-90b2-c6c3e611f5d8\exec-8ea3e805-fa04-476a-9755-ce941d561ab6.png`
- `03-waxy-skin.png` ← `C:\Users\sajw1\.codex\generated_images\01a08091-36ef-7f00-90b2-c6c3e611f5d8\exec-7df03b32-1ebd-4fd8-9133-b51db0741985.png`
- `04-ageless-middle-age.png` ← `C:\Users\sajw1\.codex\generated_images\01a08091-36ef-7f00-90b2-c6c3e611f5d8\exec-229dfb6e-9791-4ff3-9674-2b99aa9dd919.png`
- `05-glassy-eyes.png` ← `C:\Users\sajw1\.codex\generated_images\01a08091-36ef-7f00-90b2-c6c3e611f5d8\exec-2ce13cd5-615d-434a-b30d-ec86e3986e5b.png`
- `06-perfect-smile.png` ← `C:\Users\sajw1\.codex\generated_images\01a08091-36ef-7f00-90b2-c6c3e611f5d8\exec-50a07999-96c1-4708-a053-e76f14732ddf.png`
- `07-face-lighting.png` ← `C:\Users\sajw1\.codex\generated_images\01a08091-36ef-7f00-90b2-c6c3e611f5d8\exec-343b23dd-c539-40c5-ae77-fc6777a5b11a.png`
- `08-generic-handsome.png` ← `C:\Users\sajw1\.codex\generated_images\01a08091-36ef-7f00-90b2-c6c3e611f5d8\exec-94958dc7-f95e-4438-b3b8-1eb35b87e29f.png`
