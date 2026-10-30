// YUNLAB 상품 목록 — 여기에 한 항목을 추가하면 홈페이지에 카드가 생긴다.
// status: "on"(출시) | "soon"(준비 중) · statusText 로 표시 문구를 바꿀 수 있다.
// 그림: icon(앱 아이콘 경로) 또는 cover(교재 표지 대신 보일 짧은 글자). links: [{ label, href }]
// placeholder: true 이면 '준비 중' 빈 칸(점선)으로 보인다.
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
    { placeholder: true, title: "교재", cover: "준비 중", desc: "시험 대비·어학 교재를 준비하고 있습니다. 출간 소식은 이곳에서 알려 드립니다." },
  ],
  materials: [
    { placeholder: true, title: "수업자료", cover: "준비 중", desc: "선생님을 위한 수업 가이드, 단어 테스트, 받아쓰기 활동지 같은 자료를 준비하고 있습니다." },
  ],
};
