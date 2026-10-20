# 261023 경기도청 강의

사진우의 AI 영상 제작 경험과 에이전틱 영상 제작 워크플로우 강의 자료.

- 기준 폴더: 바탕화면 `261023경기도청 강의`
- 공개 시점: 2026-10-20
- 슬라이드: 91장
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
python -m http.server 8000
```

이후 `http://localhost:8000`에 접속하세요.

## 파일

- `index.html`: 강의 슬라이드
- `*.css`, `*.js`: 디자인과 인터랙션
- `assets/`: 영상·사진·GIF·폰트 등
- `assets/ai-slop-found/sources.md` 등: 참고 이미지 출처

참고·인용된 이미지와 영상의 권리는 원저작자에게 있습니다. 공개 저장소에 포함되었다는 이유로 해당 자료의 별도 이용 권한이 부여되는 것은 아닙니다.
