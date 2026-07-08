const salons = [
  {
    id: 1,
    name: "Maison matsuyama",
    area: "大街道",
    address: "松山市大街道1丁目8-39",
    price: 2500,
    time: "7:00 - 22:00",
    facilities: ["シャンプー台", "Wi-Fi"],
    tags: ["今日利用可能", "駅近", "人気"],
    x: "46%",
    y: "30%",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=90"
  },
  {
    id: 2,
    name: "Lino by atelier",
    area: "松山市駅",
    address: "松山市三番町3-15-5",
    price: 2800,
    time: "8:00 - 21:00",
    facilities: ["シャンプー台", "Wi-Fi"],
    tags: ["駅近", "人気"],
    x: "28%",
    y: "44%",
    image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=900&q=90"
  },
  {
    id: 3,
    name: "Ru.aia",
    area: "湊町",
    address: "松山市湊町2-2-8",
    price: 2200,
    time: "9:00 - 20:00",
    facilities: ["セット面", "Wi-Fi"],
    tags: ["今日利用可能", "低価格"],
    x: "63%",
    y: "58%",
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=900&q=90"
  },
  {
    id: 4,
    name: "Blanc Matsuyama",
    area: "久米",
    address: "松山市久米",
    price: 2300,
    time: "8:00 - 22:00",
    facilities: ["駐車場", "シャンプー台"],
    tags: ["駐車場あり", "長期利用可"],
    x: "39%",
    y: "72%",
    image: "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?auto=format&fit=crop&w=900&q=90"
  }
];

const extraSalons = [
  "Atelier Nami", "Ciel Matsuyama", "Noa Studio", "Riche Hair", "Sola Salon",
  "Mellow Room", "Fika Hair", "Luce Space", "Towa Studio", "Aile Salon", "Mira Hair"
].map((name, index) => ({
  ...salons[index % 4],
  id: index + 5,
  name,
  price: [2400, 2600, 3000, 1800, 3500][index % 5],
  area: ["大街道", "松山市駅", "道後", "湊町", "久米"][index % 5],
  address: `松山市${["大街道", "三番町", "道後", "湊町", "久米"][index % 5]} ${index + 1}-${index + 3}`,
}));

const allSalons = [...salons, ...extraSalons];
let favorites = [];

function showPage(page) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));

  document.getElementById(`${page}Page`).classList.add("active");

  if (page === "favorites") renderFavorites();
  if (page === "map") {
    renderMap("mapBoxPage", "mapPreviewPage");
    showMapSalon(1, "mapPreviewPage");
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function salonCard(salon, type = "small") {
  const cls = type === "search" ? "search-card salon-card" : "salon-card";

  return `
    <article class="${cls}">
      <img src="${salon.image}" alt="${salon.name}">
      <div class="salon-body">
        <div class="tags">
          ${salon.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
        </div>
        <h3>${salon.name}</h3>
        <p>${salon.address}</p>
        <strong>¥${salon.price.toLocaleString()}〜 / h</strong>
        <p>${salon.time}</p>
        <div class="card-actions">
          <button class="outline" onclick="openDetail(${salon.id})">詳細を見る</button>
          <button onclick="addFavorite(${salon.id})">♡</button>
        </div>
      </div>
    </article>
  `;
}

function renderRecommend() {
  document.getElementById("recommendList").innerHTML =
    salons.map(salon => salonCard(salon)).join("");
}

function showAllSalons() {
  renderSearch(allSalons);
  showPage("search");
}

function renderAreas() {
  const areas = ["大街道", "松山市駅", "道後", "湊町", "久米", "銀天街"];

  document.getElementById("areaList").innerHTML = areas.map(area => `
    <button class="area-card" onclick="filterByArea('${area}')">${area}</button>
  `).join("");
}

function filterByArea(area) {
  document.getElementById("areaFilter").value = area;
  const filtered = allSalons.filter(salon => salon.area === area);
  renderSearch(filtered);
  showPage("search");
}

function renderSearch(list = salons) {
  document.getElementById("resultCount").textContent = `該当件数：${list.length}件`;
  document.getElementById("salonList").innerHTML =
    list.map(salon => salonCard(salon, "search")).join("");
}

function searchSalons() {
  const area = document.getElementById("areaFilter").value;
  const price = document.getElementById("priceFilter").value;
  const facility = document.getElementById("facilityFilter").value;

  const filtered = allSalons.filter(salon => {
    const areaMatch = area === "all" || salon.area === area;
    const priceMatch = price === "all" || salon.price <= Number(price);
    const facilityMatch = facility === "all" || salon.facilities.includes(facility);

    return areaMatch && priceMatch && facilityMatch;
  });

  renderSearch(filtered);
}

function openDetail(id) {
  const salon = allSalons.find(s => s.id === id);

  document.getElementById("detailContent").innerHTML = `
    <div class="detail-layout">
      <img class="detail-img" src="${salon.image}" alt="${salon.name}">
      <div class="detail-info">
        <div class="tags">
          ${salon.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
        </div>
        <h2>${salon.name}</h2>
        <p>${salon.address}</p>
        <p class="price">¥${salon.price.toLocaleString()}〜 / h</p>
        <p>営業時間：${salon.time}</p>

        <div class="facility-grid">
          ${salon.facilities.map(f => `<span>${f}</span>`).join("")}
          <span>セット面</span>
          <span>ロッカー</span>
        </div>

        <p>
          落ち着いた空間で、自分らしい働き方を叶えられるサロンです。
          短時間利用から定期利用まで対応できます。
        </p>

        <div class="card-actions">
          <button>予約する</button>
          <button class="outline" onclick="addFavorite(${salon.id})">お気に入り</button>
        </div>
      </div>
    </div>
  `;

  showPage("detail");
}

function renderMap(mapId, previewId) {
  const map = document.getElementById(mapId);

  map.innerHTML = salons.map(salon => `
    <button 
      class="map-pin"
      style="left:${salon.x}; top:${salon.y};"
      onmouseenter="showMapSalon(${salon.id}, '${previewId}')"
      onclick="openDetail(${salon.id})"
    >
      ¥${salon.price.toLocaleString()}/h
    </button>
  `).join("");
}

function showMapSalon(id, previewId = "mapPreview") {
  const salon = salons.find(s => s.id === id);

  document.getElementById(previewId).innerHTML = `
    <img src="${salon.image}" alt="${salon.name}">
    <div class="tags">
      ${salon.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
    </div>
    <h3>${salon.name}</h3>
    <p>${salon.address}</p>
    <strong>¥${salon.price.toLocaleString()}〜 / h</strong>
    <p>${salon.time}</p>
    <div class="card-actions">
      <button class="outline" onclick="openDetail(${salon.id})">詳細を見る</button>
      <button onclick="addFavorite(${salon.id})">♡</button>
    </div>
  `;
}

function addFavorite(id) {
  if (!favorites.includes(id)) favorites.push(id);
  alert("お気に入りに追加しました");
}

function renderFavorites() {
  const list = allSalons.filter(salon => favorites.includes(salon.id));

  document.getElementById("favoriteList").innerHTML = list.length
    ? list.map(salon => salonCard(salon)).join("")
    : `<div class="empty">お気に入りはまだありません。</div>`;
}

renderRecommend();
renderAreas();
renderSearch(salons);
renderMap("mapBox", "mapPreview");
showMapSalon(1);