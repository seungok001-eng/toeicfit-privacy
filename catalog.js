// YUNLAB 상품 목록 — 여기에 한 항목을 추가하면 홈페이지에 카드가 생긴다.
// status: "on"(출시) | "soon"(준비 중) · statusText 로 표시 문구를 바꿀 수 있다.
// 그림: icon(앱 아이콘 경로) 또는 cover(표지 그림 경로) / coverText(표지 대신 보일 짧은 글자). links: [{ label, href }]
// placeholder: true 이면 '준비 중' 빈 칸(점선)으로 보인다.
//
// 교재는 id 가 있으면 book.html?id=<id> 상세 페이지가 생기고, 카드에 '교재 소개'·'수업자료' 버튼이 붙는다.
// 교재 예시 (복사해서 books 에 넣고 고치면 된다):
// {
//   id: "listening-mock-1", title: "고등 영어 듣기 모의고사 1", sub: "고등 · 영어 듣기", coverText: "듣기\n모의고사", status: "on",
//   desc: "카드에 보일 한두 줄 소개.",
//   about: ["상세 페이지 첫 문단.", "둘째 문단."],            // 교재 소개 탭
//   info: [["대상", "고등학생"], ["구성", "모의고사 20회"]],      // 교재 정보 표
//   buy: { label: "구매하기", href: "https://..." },             // 없으면 생략
//   materials: [                                                  // 수업자료 탭
//     { title: "원어민 교사용 가이드", type: "PDF", desc: "회차별 수업 진행안", href: "materials/listening-mock-1/guide.pdf" },
//     { title: "학생 단어 테스트", type: "PDF", desc: "회차별 어휘 시험지", soon: true },  // soon: 준비 중
//   ],
// },
window.YUNLAB_CATALOG = {
  apps: [
    {
      title: "토익핏", sub: "토익 · 앱", icon: "toeicfit/icon.png", status: "soon", statusText: "Android 출시 준비 중",
      desc: "목표 점수 맞춤 토익 단어 3,600개와 Part 1~7 실전 문제, 모의고사·예상 점수까지. 7개 언어 지원.",
      links: [{ label: "자세히 보기", href: "toeicfit/" }, { label: "개인정보 처리방침", href: "privacy.html" }],
    },
    { placeholder: true, title: "새 학습 앱", desc: "시험 대비·어학 학습 앱을 계속 준비하고 있습니다." },
  ],
  books: [
    { placeholder: true, title: "교재", coverText: "준비 중", desc: "시험 대비·어학 교재를 준비하고 있습니다. 교재마다 선생님용 수업자료를 함께 제공합니다." },
  ],
};
