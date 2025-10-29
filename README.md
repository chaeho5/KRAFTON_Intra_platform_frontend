# KRAFTON TODO List 과제

KRAFTON Intra Platform Team 신입 프론트엔드 개발자 채용 과제입니다.

## 🎯 프로젝트 설명

### ✅ 필수 기능
- [x] TODO 등록 (제목, 내용)
- [x] TODO 목록 조회
- [x] TODO 수정 (제목, 내용)
- [x] TODO 삭제
- [x] 마감 기한 설정 및 수정
- [x] 우선순위 설정 (높음, 중간, 낮음) 및 수정
- [x] 완료 처리 (토글)

### ✨ 추가 기능
- [x] **데이터 영구 저장**: LocalStorage를 활용해 새로고침 시에도 데이터 유지
- [x] **테스트 코드 작성**: Pinia 스토어의 핵심 로직(CRUD)에 대한 Vitest 유닛 테스트 구현
- [x] **체계적 상태 관리**: Pinia (Vuex)를 도입하여 상태 로직을 컴포넌트와 분리
- [x] **오류 피드백**: 폼 유효성 검사 (제목 필수) 시 `alert` 대신 인라인 오류 메시지 표시
- [x] **반응형 레이아웃**: 화면 크기에 따라 컴포넌트 크기가 자동으로 조절


## 🚀 프로젝트 실행 방법

1.  **의존성 설치**
    ```bash
    npm install
    ```

2.  **개발 서버 실행**
    ```bash
    npm run dev
    ```

3.  **유닛 테스트 실행**
    ```bash
    npm run test:unit
    ```

## 🛠 사용 기술

- **Core**: Vue.js 3 (Composition API, `<script setup>`)
- **Build Tool**: Vite
- **State Management**: Pinia
- **Testing**: Vitest
- **Linting / Formatting**: ESLint, Prettier