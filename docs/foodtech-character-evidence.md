# 푸드테크 캐릭터시트 — 자글거림 피드백

2026-10-21. 기존 제작 기록과 이미지로 회고 장표를 작성. 새 이미지 생성·원본 수정 없음.

## 사용자 피드백
- 프로젝트: `/Users/gnudas/Documents/Codex/video-team-runtime/20260924_204417_seongnam-foodtech-one-table`
- `docs/codex_seedream_r43_chars_20261020.md:4`, `brief.md:57`에 ‘인물 이미지를 다른 걸 써줄 수 있을까? 너무 자글자글해서 싫어’, Runway의 Seedream5.0Pro를 써보자는 사용자 요청이 보존돼 있다.
- 원세션 `/Users/gnudas/.claude/projects/-Users-gnudas/8d9b796f-c6a0-45d4-8b58-591745d00cfd.jsonl:5216`, 2026-10-20 07:31 KST와 대조. 전체 사적 대화는 저장소에 복사하지 않는다.

## 실제 사용한 두 이미지
| 구분 | 프로젝트 내 경로 | 상태·크기 |
|---|---|---|
| 이전 보호자 시트 | `media/03_characters_캐릭터/web_CHAR_GUARDIAN_R2.png` | 기존 승인본, 1,763,147bytes |
| Seedream 재제작 | `media/05_images_approved_이미지승인/CHAR_GUARDIAN_R43_SEEDREAM_A1.png` | 후속 승인본, 5,767,782bytes |

- registry: 이전 `AST_62718C23417C4086`, 후속 `AST_06EFF8D3C4A74476`. 후속 승인 이동 기록10/20 13:22:30.
- 후보목록의 과거04폴더 경로와 생성 직후 NOT_RUN을 최종 상태로 해석하지 않는다. 이후 승인 이동·brief64–65·실제 파일을 함께 확인했다.
- 10/19 `lanes/seedance/prompts/R4V02_pack.json`, `R4V16_pack.json`은 이전R2 참조.10/20 `R5V02_pack.json`, `R5V16_pack.json`은 새R43 참조.
- 후속 프롬프트: `lanes/image_creator_02/r43_seedream_chars_20261020/CHAR_GUARDIAN_R43.prompt.txt`. ‘smooth natural skin with a soft matte finish’, ‘crisp clean edges’, ‘noise-free tonal gradients’를 지정했다.
- 강의 사본은 각각 `assets/case-studies/foodtech-guardian-earlier.png`, `foodtech-guardian-seedream.png`. 복사 후 원본과 해시 대조. 해시·크기는 provenance.json.

## 설명의 한계
사용자 피드백은 인물 이미지 전체를 대상으로 한다. 이전 보호자 시트 한 장만 실패 판정됐다고 단정하지 않는다. 두 이미지 모두 승인 이력이 있다. 새 시트는 이전 이미지를 보정한 것이 아니라 텍스트로 다시 생성했으며 얼굴·포즈·배치도 달라졌다. 노이즈만 제거한 통제 비교가 아니다. 새 시트가 후속 참조로 채택된 사실까지 설명하며, 사용자가 최종 만족했다거나 Seedream이 항상 더 좋다고 주장하지 않는다.
