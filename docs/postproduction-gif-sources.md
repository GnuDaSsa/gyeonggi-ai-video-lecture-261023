# 후처리 계기 GIF 예시

2026-10-21 사용자 요청으로97쪽에3개 예시 추가. 특정 Opus5.5 바이럴 작품의 원본이라고 주장하지 않는다.

|표시|출처|변환|
|---|---|---|
|HyperFrames·Three.js 공식 카드|[공식 문서](https://github.com/heygen-com/hyperframes/blob/main/docs/prompting/examples.mdx), [MP4](https://static.heygen.ai/hyperframes-oss/docs/images/prompting/example-3d-cards.mp4)|9초/1920×1080/30fps 원본을640×360/12fps GIF로 변환. 내용 편집 없음.|
|Remotion 공식 로고|[공식 브랜드](https://github.com/remotion-dev/brand), [GIF](https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-light.gif)|2초 원본GIF 그대로 복사.|
|내 영상 위에 효과|기존 화성 최종본 assets/case-studies/hwaseong-final.mp4|13.3–16.7초 타이틀·잉크 프리즈를640×360/12fps GIF로 추출. 원본 무변경.|

- 그림·동작은 실제 미디어를 직접 검수. 생성 이미지나 가짜 스크린샷 없음.
- 포스터는 원본에서 프레임 추출. prefers-reduced-motion일 때 장표에 정지 포스터 표시.
- 출처/바이트/SHA256/프레임수/길이: assets/case-studies/provenance.json. 변환용원본: ignored output/postproduction-sources/.
- **권리 범위**: HyperFrames 코드 저장소는Apache-2.0이나 CDN 예시영상 개별 재배포 조건 미확인. Remotion 브랜드 저장소는package.json UNLICENSED. 공개 저장소의 존재만으로 자유 재배포 가능하다고 주장하지 않는다. 강의 설명용 참고 예시로 포함하며, 사용자가 이번 수정본의 GitHub 푸시를 요청했다. 출처를 보존하되 외부 미디어의 개별 재배포 허락을 확인했다는 뜻은 아니다. 별도 이용 시 권리 확인이 필요하다.
