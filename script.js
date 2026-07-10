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
    image: "./salon1.jpg",
    gallery: ["./salon1.jpg", "./shampoo.jpg", "./waiting.jpg", "./reception.jpg", "./staffroom.jpg"]
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
    image: "./salon2.jpg",
    gallery: ["./salon2.jpg", "./shampoo.jpg", "./waiting.jpg", "./reception.jpg", "./staffroom.jpg"]
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
    image: "./salon3.jpg",
    gallery: ["./salon3.jpg", "./shampoo.jpg", "./waiting.jpg", "./reception.jpg", "./staffroom.jpg"]
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
    image: "./salon4.jpg",
    gallery: ["./salon4.jpg", "./shampoo.jpg", "./waiting.jpg", "./reception.jpg", "./staffroom.jpg"]
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
  address: `松山市${["大街道", "三番町", "道後", "湊町", "久米"][index % 5]} ${index + 1}-${index + 3}`
}));

const allSalons = [...salons, ...extraSalons];
let favorites = [];

function showPage(page) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(`${page}Page`).classList.add("active");

  if (page === "favorites") renderFavorites();
  if (page === "map") showMapSalon(1);

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function recommendCard(salon) {
  return `
    <article class="recommend-card" onclick="openDetail(${salon.id})">
      <button class="recommend-heart" onclick="event.stopPropagation(); addFavorite(${salon.id})">♡</button>
      <img src="${salon.image}" alt="${salon.name}">

      <div class="recommend-body">
        <div class="tags">
          ${salon.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
        </div>

        <h3>${salon.name}</h3>
        <p>${salon.address}</p>
        <strong>¥${salon.price.toLocaleString()}〜 / h</strong>
        <p>${salon.time}</p>

        <div class="recommend-actions">
          <button onclick="event.stopPropagation(); openDetail(${salon.id})">詳細</button>
          <button onclick="event.stopPropagation(); reserveSalon(${salon.id})">予約</button>
        </div>
      </div>
    </article>
  `;
}

function searchCard(salon) {
  return `
    <article class="search-card">
      <button class="search-heart" onclick="addFavorite(${salon.id})">♡</button>
      <img src="${salon.image}" alt="${salon.name}" onclick="openDetail(${salon.id})">

      <div class="search-body">
        <div class="tags">
          ${salon.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
        </div>

        <h3 onclick="openDetail(${salon.id})">${salon.name}</h3>
        <p>${salon.address}</p>
        <strong>¥${salon.price.toLocaleString()}〜 / h</strong>
        <p>${salon.time}</p>

        <div class="search-actions">
          <button onclick="openDetail(${salon.id})">詳細</button>
          <button onclick="reserveSalon(${salon.id})">予約</button>
        </div>
      </div>
    </article>
  `;
}

function renderRecommend() {
  document.getElementById("recommendList").innerHTML =
    salons.map(salon => recommendCard(salon)).join("");
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
  document.getElementById("resultCount").textContent = `検索結果：${list.length}件`;
  document.getElementById("salonList").innerHTML =
    list.map(salon => searchCard(salon)).join("");
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
      <div>
        <img class="detail-img" src="${salon.image}" alt="${salon.name}" id="mainDetailImage">

        <div class="detail-thumbs">
          ${salon.gallery.map(img => `
            <img src="${img}" onclick="changeMainImage('${img}')">
          `).join("")}
        </div>
      </div>

      <div class="detail-info">
        <button class="detail-favorite" onclick="addFavorite(${salon.id})">♡</button>

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

        <div class="detail-actions">
          <button class="outline" onclick="showPage('search')">戻る</button>
          <button class="reserve-main-btn" onclick="reserveSalon(${salon.id})">予約する</button>
        </div>
      </div>
    </div>
  `;

  showPage("detail");
}

function changeMainImage(imagePath) {
  document.getElementById("mainDetailImage").src = imagePath;
}

function showMapSalon(id) {
  const salon = salons.find(s => s.id === id);

  document.getElementById("mapPreviewPage").innerHTML = `
    <div class="map-card-image">
      <img src="${salon.image}" alt="${salon.name}">
    </div>

    <div class="map-card-info">
      <div class="tags">
        ${salon.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
      </div>

      <h3>${salon.name}</h3>
      <p>${salon.address}</p>

      <div class="map-card-meta">
        <strong>¥${salon.price.toLocaleString()}〜 / h</strong>
        <span>${salon.time}</span>
      </div>
    </div>

    <div class="map-card-buttons">
      <button class="outline" onclick="openDetail(${salon.id})">詳細</button>
      <button onclick="reserveSalon(${salon.id})">予約</button>
    </div>
  `;
}

function addFavorite(id) {
  if (!favorites.includes(id)) {
    favorites.push(id);
    alert("お気に入りに追加しました");
  } else {
    alert("すでにお気に入りに入っています");
  }
}

function renderFavorites() {
  const list = allSalons.filter(salon => favorites.includes(salon.id));

  document.getElementById("favoriteList").innerHTML = list.length
    ? list.map(salon => recommendCard(salon)).join("")
    : `<div class="empty">お気に入りはまだありません。</div>`;
}

function reserveSalon(id) {
  const salon = allSalons.find(s => s.id === id);
  document.getElementById("reservationContent").innerHTML = `<h3>${salon.name}</h3><p>¥${salon.price.toLocaleString()}〜 / h</p>`;
  showPage("reservation");
}

renderRecommend();
renderAreas();
renderSearch(salons);
showMapSalon(1);