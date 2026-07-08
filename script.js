const salons = [
  {
    name: "Maison Matsuyama",
    area: "松山市大街道 徒歩3分",
    price: "¥2,500〜 / h",
    time: "7:00 - 22:00",
    tags: ["今日利用可能", "駅近", "シャンプー台あり"],
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Lino by Atelier",
    area: "松山市駅 徒歩5分",
    price: "¥2,800〜 / h",
    time: "8:00 - 21:00",
    tags: ["駅近", "Wi-Fiあり", "セット面あり"],
    image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Rualia Matsuyama",
    area: "松山市湊町 徒歩4分",
    price: "¥2,200〜 / h",
    time: "9:00 - 20:00",
    tags: ["今日利用可能", "低価格", "ロッカーあり"],
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Blanc Matsuyama",
    area: "松山市久米 徒歩6分",
    price: "¥2,300〜 / h",
    time: "8:00 - 22:00",
    tags: ["駐車場あり", "静かな空間", "長期利用可"],
    image: "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?auto=format&fit=crop&w=900&q=80"
  }
];

const salonList = document.getElementById("salonList");
const favoriteList = document.getElementById("favoriteList");

function createSalonCard(salon) {
  return `
    <article class="salon-card">
      <img src="${salon.image}" alt="${salon.name}">
      <div class="salon-body">
        ${salon.tags.map(tag => `<span class="tag">${tag}</span>`).join(" ")}
        <h3>${salon.name}</h3>
        <p>${salon.area}</p>
        <div class="salon-meta">
          <strong>${salon.price}</strong>
          <span>${salon.time}</span>
        </div>
        <div class="card-actions">
          <button class="outline">詳細を見る</button>
          <button>予約する</button>
        </div>
      </div>
    </article>
  `;
}

salonList.innerHTML = salons.map(createSalonCard).join("");
favoriteList.innerHTML = salons.slice(0, 3).map(createSalonCard).join("");