# 젠스파크 실제 제작 사례

사용자가 지정한 본인 세션: https://www.genspark.ai/agents?id=3cfb97f6-3a8a-42ec-9833-b6680995be37

제목: 신카이 스타일 30대 캐릭터 변형. 2026-09-13에 로그인된 Chrome에서 대화와 이미지를 확인했다. 27–30장에 사용한다.

| 로컬 파일 | 세션 이미지 | 용도 |
| --- | --- | --- |
| genspark-character-selected.jpg | https://www.genspark.ai/api/files/s/DJeSYupY?cache_control=3600 | Version 3 Younger · 사용자가 최종 선택한 얼굴 |
| genspark-character-fullbody.jpg | https://www.genspark.ai/api/files/s/Qgs4M9CP?cache_control=3600 | Full Body Version · 흰 배경·16:9 전신 |
| genspark-scene-guitar.svg | https://www.genspark.ai/api/files/s/rHo4t9cG?cache_control=3600 | 스튜디오에서 연주 시작 |
| genspark-scene-rain.svg | https://www.genspark.ai/api/files/s/7RyOmet3?cache_control=3600 | 빗속 걷기 |
| genspark-scene-friends.svg | https://www.genspark.ai/api/files/s/eXAo6cFp?cache_control=3600 | 친구들과 캠프파이어 |
| genspark-running-046.svg | https://www.genspark.ai/api/files/s/E7ZoxCLb?cache_control=3600 | 회색 티셔츠를 입고 달리는 의사 |
| genspark-running-047.svg | https://www.genspark.ai/api/files/s/7CuPL6Iz?cache_control=3600 | 수정 전 047번 · 현재 주인공의 파란 수술복 |
| genspark-running-047-revised.svg | https://www.genspark.ai/api/files/s/DWqo8q8B?cache_control=3600 | 의상 통일을 요청한 뒤 생성된 수정 결과 |
| genspark-hair-drift.svg | https://www.genspark.ai/api/files/s/QrPVVvBC?cache_control=3600 | 헤드셋 이미지 묶음의 5번째, 장발 지적 직전 결과 |

JPEG 두 개는 페이지 이미지 다운로드로 받은 원본이다. SVG는 실제 생성 이미지의 확대 화면을 캡처한 PNG를 내장하고, viewBox로 이미지 영역만 표시한다. 이미지를 새로 생성하거나 얼굴·머리·의상·색감·선명도를 가공하지 않았다. 단일 HTML에는 이 파일들까지 내장한다.

## 대화에서 확인한 제작 과정

후보 3가지 → 긴 얼굴형 강조 → 버전 3을 더 젊게 수정 → 캐릭터 선택 → 흰 배경의 전신 요청 → 40컷 뮤직비디오 스토리 요청 → Nano Banana Pro로 장면별 이미지 생성 요청 → 001~040 파일명으로 다운로드 요청.

캐릭터 이미지를 첨부하고 장면별 이미지로 영상을 만들었다는 전체 제작 방식은 사용자의 설명도 함께 반영했다. 이 세션에서 확인한 생성 내역은 이미지이며, 영상 생성 서비스나 모델을 새로 추정하지 않는다.

## 실제 수정 요청

- “047번의 현재의 주인공의 안에 옷이 046번과 달라서 쓸수가없어 046에 맞춰서 옷을 통일해줘”
- “얼씨구 머리 장발되고 일관성 다날아갔네? 기존 캐릭터 특성을 제대로 반영해서 다시해”

의상 비교는 046번과 최초 047번의 성인 의사가 대상이다. 047번의 학생 시절 옷은 의도된 차이이므로 실패 사례로 다루지 않는다. 머리 비교는 수정 요청 전에 나온 결과이며, 수정된 짧은 머리 결과와 혼동하지 않는다.

여기서 ‘이미지 열화’는 사용자가 요청한 의미인, 계속 생성하면서 처음 선정한 캐릭터와 멀어지고 일관성이 옅어지는 경험으로 설명한다. 생성 횟수에 따른 보편적 품질 저하 법칙이나 다운로드 자체의 화질 손실을 주장하지 않는다.
