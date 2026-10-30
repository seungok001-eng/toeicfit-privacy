// catalog.js 의 목록을 화면에 그린다 — 홈(index.html)의 카드와 교재 상세(book.html).
(function () {
  var C = window.YUNLAB_CATALOG || {};
  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
  };
  var br = function (s) { return esc(s).replace(/\n/g, "<br />"); };
  var status = function (x) {
    return x.status ? '<span class="status' + (x.status === "on" ? " on" : "") + '">' + esc(x.statusText || (x.status === "on" ? "출시" : "준비 중")) + "</span>" : "";
  };
  var pic = function (x, big) {
    if (x.icon) return '<img class="thumb" src="' + esc(x.icon) + '" alt="" width="72" height="72" />';
    if (x.cover) return '<img class="cover' + (big ? " big" : "") + '" src="' + esc(x.cover) + '" alt="' + esc(x.title) + ' 표지" />';
    if (x.coverText) return '<div class="cover' + (big ? " big" : "") + '">' + br(x.coverText) + "</div>";
    return "";
  };
  var btns = function (links) {
    return links.length ? '<div class="links">' + links.map(function (l, i) {
      return '<a class="btn' + (i ? " line" : "") + '" href="' + esc(l.href) + '">' + esc(l.label) + "</a>";
    }).join("") + "</div>" : "";
  };

  // 홈: [data-list="apps" | "books"]
  document.querySelectorAll("[data-list]").forEach(function (box) {
    box.innerHTML = (C[box.dataset.list] || []).map(function (x) {
      var links = (x.links || []).slice();
      if (x.id && !x.placeholder) {
        var n = (x.materials || []).length;
        links.unshift({ label: "교재 소개", href: "book.html?id=" + encodeURIComponent(x.id) },
          { label: "수업자료" + (n ? " " + n : ""), href: "book.html?id=" + encodeURIComponent(x.id) + "#materials" });
      }
      return '<article class="item' + (x.placeholder ? " soon" : "") + '">' + pic(x) + "<div><h3>" + esc(x.title) + status(x) + "</h3>"
        + (x.sub ? '<div class="sub">' + esc(x.sub) + "</div>" : "") + "<p>" + esc(x.desc) + "</p>" + btns(links) + "</div></article>";
    }).join("");
  });

  // 교재 상세: book.html?id=...
  var page = document.querySelector("[data-book]");
  if (!page) return;
  var id = new URLSearchParams(location.search).get("id");
  var b = (C.books || []).filter(function (x) { return x.id && x.id === id; })[0];
  if (!b) {
    page.innerHTML = '<div class="wrap empty"><h1 class="serif">교재를 찾을 수 없습니다</h1><p><a href="./#books">교재 목록으로 돌아가기</a></p></div>';
    return;
  }
  document.title = b.title + " · YUNLAB";
  var mats = b.materials || [];
  var info = (b.info || []).map(function (r) { return "<tr><th>" + esc(r[0]) + "</th><td>" + esc(r[1]) + "</td></tr>"; }).join("");
  var matHtml = mats.length ? mats.map(function (m) {
    var act = m.soon || !m.href ? '<span class="status">준비 중</span>'
      : '<a class="btn" href="' + esc(m.href) + '" target="_blank" rel="noopener">' + (m.type ? esc(m.type) + " " : "") + "내려받기</a>";
    return '<li class="mat"><div><b>' + esc(m.title) + "</b>" + (m.type ? '<span class="type">' + esc(m.type) + "</span>" : "")
      + (m.desc ? "<p>" + esc(m.desc) + "</p>" : "") + "</div>" + act + "</li>";
  }).join("") : '<li class="mat"><div><b>수업자료를 준비하고 있습니다</b><p>올라오면 이곳에서 내려받을 수 있습니다.</p></div></li>';

  page.innerHTML =
    '<div class="page-hero"><div class="wrap">' + pic(b, true) + "<div>"
    + '<span class="eyebrow">' + esc(b.sub || "교재") + "</span><h1>" + esc(b.title) + "</h1><p>" + esc(b.desc) + "</p>"
    + (b.buy ? '<div class="links" style="margin-top:16px"><a class="btn gold" href="' + esc(b.buy.href) + '" target="_blank" rel="noopener">' + esc(b.buy.label || "구매하기") + "</a></div>" : "")
    + "</div></div></div>"
    + '<div class="wrap"><div class="tabs" role="tablist">'
    + '<button role="tab" data-tab="about">교재 소개</button><button role="tab" data-tab="materials">수업자료 <small>' + mats.length + "</small></button></div>"
    + '<section class="tab-panel" data-panel="about">' + (b.about || []).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("")
    + (info ? '<table class="info">' + info + "</table>" : "") + "</section>"
    + '<section class="tab-panel" data-panel="materials"><p class="muted">선생님이 수업에 바로 쓸 수 있는 자료입니다.</p><ul class="mats">' + matHtml + "</ul></section>"
    + '<p class="fine"><a href="./#books">← 교재 목록</a></p></div>';

  var show = function (t) {
    page.querySelectorAll("[data-tab]").forEach(function (x) { x.setAttribute("aria-selected", x.dataset.tab === t); });
    page.querySelectorAll("[data-panel]").forEach(function (x) { x.hidden = x.dataset.panel !== t; });
  };
  page.querySelectorAll("[data-tab]").forEach(function (x) {
    x.addEventListener("click", function () { show(x.dataset.tab); history.replaceState(null, "", x.dataset.tab === "materials" ? "#materials" : location.pathname + location.search); });
  });
  show(location.hash === "#materials" ? "materials" : "about");
})();
