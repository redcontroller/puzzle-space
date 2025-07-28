# Puzzle Space 🧩

**"퍼즐처럼 완벽한 공간 매칭 플랫폼"**

[![Vercel](https://therealsujitk-vercel-badge.vercel.app/?app=space-depot)](https://space-depot.vercel.app/)

**🚀 [Puzzle Space 서비스 바로가기](https://space-depot.vercel.app/)**

---

## 📖 서비스 소개

**Puzzle Space**는 사용자들이 원하는 공간을 쉽게 찾고, 공간 소유자는 자신의 공간을 효과적으로 홍보할 수 있는 공간 매칭 플랫폼입니다. '등록된 공간 둘러보기'라는 핵심 기능에 집중한 홈 화면과 '공간 요청하기' 기능을 별도 페이지로 분리하여 사용자에게 명확하고 직관적인 경험을 제공합니다.

---

## ✨ 주요 기능

### 1. 광고 타입별 차별화된 공간 카드

사용자가 한눈에 공간의 특징을 파악할 수 있도록 3가지 광고 타입에 따라 시각적으로 차별화된 디자인을 적용했습니다.

| 타입 (Type)   | 특징                     | 아이콘        |
| :------------ | :----------------------- | :------------ |
| **Premium**   | 보라색-핑크 그라데이션   | 👑 (Crown)    |
| **Featured**  | 파란색-시안 그라데이션   | ✨ (Sparkles) |
| **Sponsored** | 노란색-오렌지 그라데이션 | ⚡️ (Zap)     |

<img width='400' alt='광고 타입별 카드 디자인 스크린샷' src='https://github.com/user-attachments/assets/c6f0f4e5-0b29-4396-aeef-5e1efb2d09a7'>


### 2. 직관적인 UX를 위한 '공간 요청' 기능 분리

- **명확한 사용자 동선**: 홈 화면에서는 '등록된 공간 둘러보기'라는 핵심 기능에 집중하고, '공간 요청하기' 기능은 하단 탭 메뉴를 통해 별도의 전용 페이지로 제공합니다. 이를 통해 사용자는 명확한 목적에 따라 서비스를 이용할 수 있습니다.

| (홈) 등록된 공간   | 공간 요청하기                     |
| :------------: | :-----------------------: |
| <img width="669" alt="등록된 공간 화면" src="https://github.com/user-attachments/assets/f841cc32-5224-4ab0-952f-16469f82d846" />   |  <img width="668" alt="공간 요청하기 화면" src="https://github.com/user-attachments/assets/ca85bc5f-ef62-47d3-912c-eb2830cd07ca" /> |

### 3. 무료 오픈소스 지도를 활용한 강력한 위치 기반 서비스

무료 오픈소스 솔루션인 **OpenStreetMap**과 **Leaflet**을 사용하여 비용 효율적이면서도 강력한 지도 기능을 구현했습니다.

<img width='400' alt='지도에서 찾기 기능' src='https://github.com/user-attachments/assets/0ea3164f-7d2a-47fd-a2c4-4b92eec75c85'>

#### 🗺️ 실제 지도 통합 및 동적 로딩

- **OpenStreetMap & Leaflet**: 무료 오픈소스 지도 솔루션을 사용하여 실제 지도를 서비스에 통합했습니다.
- **CDN 동적 로딩**: CDN을 통해 Leaflet 라이브러리를 동적으로 로드하여 초기 로딩 속도를 최적화했습니다.
- **실제 좌표 기반**: 서울 강남구를 중심으로 실제 GPS 좌표를 사용하여 현실감 있는 지도 서비스를 제공합니다.

#### 📍 인터랙티브 커스텀 마커 시스템

- **커스텀 마커**: 공간 타입(예: 카페, 스튜디오, 오피스)에 따라 각기 다른 색상과 아이콘을 적용하여 시각적 구분이 용이합니다.
- **인터랙티브 요소**: 마커를 클릭하면 해당 공간의 정보가 담긴 팝업과 상세 정보를 보여주는 바텀 시트가 연동되어 사용자 편의성을 높였습니다.
- **선택 상태 강조**: 사용자가 선택한 마커는 크기와 색상이 변경되어 현재 어떤 공간을 보고 있는지 명확하게 인지할 수 있습니다.

<img width="400" alt="커스텀 마커 및 인터랙션 예시" src="https://github.com/user-attachments/assets/77842f5f-502b-48de-b517-cbb393729460" />


#### 🛰️ 다양한 지도 기능

- **현재 위치 찾기**: GPS를 통해 사용자의 현재 위치를 지도에 표시하고, 버튼 클릭 시 해당 위치로 지도를 이동시킵니다.
- **실시간 지도 검색**:
  - **Nominatim API 활용**: OpenStreetMap의 무료 지오코딩 서비스인 Nominatim API를 연동하여 주소 및 장소 검색 기능을 구현했습니다.
  - **한국 지역 우선 검색**: `countrycodes=kr` 파라미터를 적용하여 한국 내 검색 결과의 정확도를 높였습니다.
  - **디바운스(Debounce)**: 사용자가 입력을 멈춘 후 300ms 뒤에 API를 호출하도록 디바운스 기술을 적용하여 불필요한 API 요청을 최소화했습니다.
- **지도 컨트롤 기능**:
  - **레이어 토글**: 일반 지도와 위성 이미지 맵을 자유롭게 전환할 수 있습니다.
  - **마커 필터**: 지도 위의 모든 마커를 한 번에 표시하거나 숨길 수 있는 토글 기능을 제공합니다.

---

## 🛠️ 기술 스택

- **Frontend**: React, Next.js, TypeScript
- **Styling**: Tailwind CSS
- **Map**: OpenStreetMap, Leaflet.js
- **Geocoding**: Nominatim API
- **Deployment**: Vercel

---

## 🚀 시작하기

프로젝트를 로컬 환경에서 실행하려면 다음 단계를 따르세요.

```bash
# 1. 저장소 복제
git clone [https://github.com/](https://github.com/)[Your-Username]/[Your-Repository-Name].git

# 2. 디렉토리 이동
cd [Your-Repository-Name]

# 3. 의존성 설치
pnpm install

# 4. 개발 서버 실행
pnpm run dev
```

이제 브라우저에서 `http://localhost:3000`으로 접속하여 Puzzle Space를 확인할 수 있습니다.
