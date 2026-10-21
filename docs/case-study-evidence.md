# 제작 사례 근거 — 2026-10-20

화면은 짧은 핵심어, 발표자노트는 관찰·시도·개선·미해결을 구분한다. 과거 후보의 검수 상태를 현재 상영본의 승인 상태로 전용하지 않는다. 아래 경로는 로컬 프로젝트 루트 기준이며 원본 파일은 변경하지 않았다.

## 드론축구
프로젝트: `20260908_070435_blue-orbit-astra-alternative`

| ID | 원본 기록 | 반영 범위 |
|---|---|---|
| D1 | `lanes/planner/last_second_r4/result.md` | 2026-09-15 재정비: 기존 이미지41장, 프롬프트18개, 참조 연결106개. 최종 영상 수 아님. |
| D2 | wiki `queries/blue-orbit-production-retrospective-2026-09-15.md` 및 해당 원본 근거 목록 | 인물 연기, 공중 물리, 프록시 잔존, 연속 득점, 자료 계보. 당시 미완료/부분검수 상태 보존. |
| D3 | `lanes/planner/ensemble_cut_actions.tsv`, `ensemble_reference_catalog.json` | 다섯 인물 목적 행동, 인물/기체/공간 참조 역할. |
| D4 | `lanes/planner/AL14_SEED_GOAL_REPAIR.md`, `AL15_SEED_SIDE_TRANSIT.md` | 회전 효과와 골 평면 직선 통과 분리. 수정 의도이지 성공 보장 아님. |
| D5 | `lanes/seedance_qc/AL12_dense_goal_qc.json`, `AL13_dense_goal_qc.json`, `AL14_dense_goal_qc.json` | 반복 공전·정체·완전 이탈 부족을 시간 구간으로 판단. |
| D6 | `lanes/seedance_qc/AB_pair_appearance_review.md` | 두 A/B 후보 모두 FAIL_PROXY_GEOMETRY_RETAINED. 카메라/상대위치 전달과 외형 충실도 분리. |

41·18·106은 서로 다른 범주의 당시 작업량이다. 레지스트리에는 검수 캡처도 포함되므로 전체 등록 수를 작품의 사용 에셋 수로 소개하지 않았다. `drone-film.jpg`는 기존 강의 상영본20초의 추출 프레임이며 AB01 수정 전후로 제시하지 않는다.

## 화성시 공모전 — 이전 설명 근거

현재 최종 상영본은 유지하고 뒤 설명은 후처리·4K 회고로 교체했다. H2–H8은 이전 근거로 보존한다. 현재95–98장의 H9–H13은 `docs/hwaseong-postproduction-evidence.md` 참조.
프로젝트: `20261008_234653_hwaseong-recast-noi2v-door-test`

| ID | 원본 기록 | 반영 범위 |
|---|---|---|
| H1 | Claude 원작업 대화 및 2026-10-20 명시적 질의 답변, `1008(1)_grade_v2_4K_info_v5.mp4` | 최종본 식별. 색보정v2·4K 업스케일·사업명 표기v5. 이전 `info.mp4`는 v1. |
| H2 | `brief.md`의 최신 제작·문턱 전환 교정 기록 | 원래 승인 인물 유지, 문턱 발접촉과 전환 상태, 새 정체성 자료 거부 이력. |
| H3 | `lanes/planner/action_revision_20261009.md` | 지정 셔틀 참조 누락 교정, 대사-복싱 공간 연결, 지역과 무관한 파쿠르 제외. |
| H4 | `lanes/seedance_qc/HWR_URBAN_MOBILITY_CARE_15S_R1_qc.json` | 주인공 의상이 아버지에게 전이. 전체 영상 실패/재시도 판정. |
| H5 | `lanes/seedance_qc/HWR_URBAN_MOBILITY_CARE_15S_R2_qc.json` | 11개 표본에서 의상 구분 개선. 문·단말 연결은 남아 EDIT_TRIM_ONLY. 전체재생·청감 미검증. |
| H6 | `lanes/seedance/prompts/HWR_URBAN_MOBILITY_CARE_15S_R2_prompt.txt` | 실제 제출 원문을 그대로 전문/다운로드에 포함. 화면은 정확한 발췌. |
| H7 | `lanes/seedance_qc/HWR_INDUSTRY_LIVING_LIGHT_15S_R1_qc.json`, `HWR_INDUSTRY_LIVING_LIGHT_15S_R2_qc.json` | 인물 복제·제품 일관성 개선, 조명/좌석 연결 문제 잔존. |
| H8 | `brief.md`의 2026-10-14 바둑 중단·비바둑 R2 범위 종료, `lanes/seedance/recovery/heartbeat_1022_final_audit.json` | 반복 실패 중단, 좋은 기존 장면 보존, 대기 작업/중복접수 구별. |

CARE R1/R2 사진은 같은 장면의 각8초 표본이다. 전체 시간축의 성공이나 최종본 채택을 증명하지 않는다. 화성 장면은 창작 표현이며 실제 시 정책의 운영 실적을 주장하지 않는다. 공모전 규정·접수 상태·수상 사실을 새로 추가하지 않았다.

## 최종 미디어 식별
- 파일: `assets/case-studies/hwaseong-final.mp4`
- 원본 프로젝트: `20260922_073547_mv-type-lab-30s/media/90_work_작업중/MV_TYPE_RESEARCH_20260922/1008(1)`
- 원본명: `1008(1)_grade_v2_4K_info_v5.mp4`
- 237,366,439 bytes / 59.906009초 / H.264 3840×2160 30fps / AAC.
- 원본과 복사본 SHA-256 일치. 해시: `assets/case-studies/provenance.json`.
- Claude 최종 답변은 원래 음성을 보존했다고 명시. 여기서는 원본 전체 파일 동일성을 검증하며 오디오를 재편집하지 않았다.
- 영상은 로컬 복사만 수행. Drive 업로드·공개 배포·공모전 제출은 이 작업의 범위 밖이다.
