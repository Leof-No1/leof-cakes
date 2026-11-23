const ASSET_DIR = "./public/assets";
const IMAGE = `${ASSET_DIR}/placeholder.jpg`;
const STORE_MAP_IFRAME = `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d245.3805665712036!2d106.38151477828065!3d10.254400445006182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310aa8ef8102cfd5%3A0xd1713e6814055539!2zNzkzSitRSFgsIE5ndXnhu4VuIEh14buHLCBQaMO6IEtoxrDGoW5nLCBWxKluaCBMb25nLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1782476423737!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>`;

const BANK_CONFIG = {
  bankId: "BIDV",
  bankName: "BIDV",
  accountNo: "7211224826",
  accountName: "HUYNH MINH THUC",
};

// Kết nối Supabase Cloud Database
const SUPABASE_URL = "https://ojzpvftearmlbsxugztb.supabase.co";
const SUPABASE_KEY = "sb_publishable_cw49MfOWBiQ9TcFvlisOxg_sdo4qNnH";
const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

function productImage(product) {
  return product?.image || `${ASSET_DIR}/${product.id}.jpg`;
}

// Tự động thử lần lượt: .jpg -> .jpeg -> .png -> placeholder.jpg
function handleImgError(img, id) {
  const step = img.dataset.step || "jpg";
  if (step === "jpg") {
    img.dataset.step = "jpeg";
    img.src = `${ASSET_DIR}/${id}.jpeg`;
  } else if (step === "jpeg") {
    img.dataset.step = "png";
    img.src = `${ASSET_DIR}/${id}.png`;
  } else {
    img.onerror = null;
    img.src = IMAGE;
  }
}

const products = [
  { id: "croissantbophap", name: "Croissant Bơ Pháp", category: "Bánh mì & Viennoiserie", weight: "80g", price: 55000, rating: 5, reviews: 211, tags: ["Nổi bật"], quick: ["Bán chạy nhất"] },
  { id: "MacaronHongCanhSen", name: "Bánh Macaron Hồng Cánh Sen", category: "Bánh nhỏ & Pastry", weight: "30g/cái", price: 85000, rating: 5, reviews: 124, tags: ["Nổi bật", "Mới"], quick: ["Mới nhất"] },
  { id: "opera", name: "Opera Cake Cổ Điển", category: "Bánh nguyên cái", weight: "500g (6-8 phần)", price: 320000, rating: 5, reviews: 89, tags: ["Nổi bật"], quick: ["Bán chạy nhất"] },
  { id: "TartChanhLeoTuoi", name: "Tart Chanh Leo Tươi", category: "Tart & Quiche", weight: "150g", price: 145000, rating: 5, reviews: 67, tags: ["Theo mùa", "Nổi bật"], quick: ["Mới nhất"] },
  { id: "Mousse", name: "Bánh mousse", category: "Bánh nguyên cái", weight: "700g", price: 275000, rating: 5, reviews: 56, tags: ["Theo mùa", "Mới"], quick: ["Đang giảm"] },
  { id: "TiramisuMongNgotNhe", name: "Tiramisu Mọng Ngọt Nhẹ", category: "Bánh nhỏ & Pastry", weight: "120g", price: 99000, rating: 5, reviews: 77, tags: ["Theo mùa"], quick: ["Đang giảm"] },
  { id: "BanhMiBoToi", name: "Bánh Mì Bơ Tỏi", category: "Bánh mì & Viennoiserie", weight: "180g", price: 69000, rating: 4, reviews: 43, tags: ["Mới"], quick: ["Mới nhất"] },
  { id: "QuicheNamPhoMai", name: "Quiche Nấm Phô Mai", category: "Tart & Quiche", weight: "180g", price: 125000, rating: 5, reviews: 34, tags: ["Theo mùa"], quick: ["Bán chạy nhất"] },
];

const articles = [
  { id: "autumn", category: "Theo mùa", title: "Bộ sưu tập bánh Thu 2026 đã ra mắt", excerpt: "Khám phá hương vị mùa thu với những chiếc bánh hạt dẻ, việt quất và caramel muối tinh tế từ bộ sưu tập mới nhất.", body: "Bộ sưu tập Thu 2026 tập trung vào lớp kem nhẹ, phần đế giòn và vị ngọt thanh. Mỗi chiếc bánh được hoàn thiện thủ công để giữ cảm giác sang trọng nhưng gần gũi.", image: IMAGE },
  { id: "birthday", category: "Khuyến mãi", title: "Ưu đãi sinh nhật LEOF Cakes tháng 7", excerpt: "Giảm 20% tất cả đơn hàng bánh sinh nhật trong suốt tháng 7/2026.", body: "Khách hàng đặt bánh sinh nhật trong tháng 7 sẽ được tư vấn mẫu miễn phí và ưu đãi cho đơn hàng đặt trước 48 giờ.", image: IMAGE },
  { id: "workshop", category: "Sự kiện", title: "Workshop Làm Bánh Pháp tháng 8", excerpt: "Tham gia cùng chúng tôi trong buổi workshop độc quyền với Master Baker từ Paris, Pháp.", body: "Workshop gồm phần giới thiệu nguyên liệu, kỹ thuật đánh kem, tạo hình và trang trí món bánh cá nhân.", image: IMAGE },
  { id: "voucher", category: "Voucher", title: "Voucher cuối tuần cho đơn hàng online", excerpt: "Nhận voucher giao hàng cho các đơn bánh đặt vào thứ bảy và chủ nhật.", body: "Voucher được áp dụng tự động trong giỏ hàng cho các đơn đạt giá trị tối thiểu theo chương trình.", image: IMAGE },
  { id: "preserve", category: "Bảo quản bánh", title: "Cách giữ bánh tươi ngon sau khi nhận", excerpt: "Một vài lưu ý nhỏ giúp bánh giữ đúng kết cấu và hương vị trong ngày đặc biệt.", body: "Hãy bảo quản bánh trong ngăn mát, lấy ra trước khi dùng 10-15 phút và tránh ánh nắng trực tiếp.", image: IMAGE },
];

const categories = ["Tất cả", "Bánh nhỏ & Pastry", "Bánh nguyên cái", "Tart & Quiche", "Bánh mì & Viennoiserie"];
const quickFilters = ["Tất cả", "Bán chạy nhất", "Mới nhất", "Đang giảm"];

const STORAGE_KEYS = {
  CURRENT_USER: "leof_current_user",
};

const DEFAULT_ADMIN = {
  id: "admin_01",
  name: "Quản Lý LEOF Cakes",
  email: "admin@leofcakes.vn",
  phone: "0901234567",
  address: "466C1 Nguyễn Huệ, Phú Khương, Vĩnh Long",
  password: "admin123",
  role: "admin",
  locked: false,
};

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

const state = {
  route: "home",
  slide: 0,
  category: "Tất cả",
  quick: "Tất cả",
  search: "",
  min: "",
  max: "",
  sort: "default",
  wishlist: new Set(),
  cart: new Map(),
  newsCategory: "Tất cả",
  newsLoading: false,
  payment: "cod",
  detailQty: 1,
  users: [DEFAULT_ADMIN],
  currentUser: loadJSON(STORAGE_KEYS.CURRENT_USER, null),
  orders: [],
  authMode: "login",
  authNotice: "",
  redirectAfterLogin: null,
  accountTab: "orders",
  adminTab: "orders",
  adminCustomerSearch: "",
  lastOrderCode: "",
  pendingBankOrder: null,
};

const app = document.querySelector("#app");
const drawer = document.querySelector("#cartDrawer");

// ==========================================
// ĐỒNG BỘ DỮ LIỆU VỚI SUPABASE DATABASE
// ==========================================
async function syncFromDatabase() {
  try {
    const [usersRes, ordersRes] = await Promise.all([
      db.from("users").select("*"),
      db.from("orders").select("*").order("created_timestamp", { ascending: false }),
    ]);

    if (usersRes.data) {
      state.users = usersRes.data;
      if (!state.users.some((u) => u.email === DEFAULT_ADMIN.email)) {
        state.users.unshift(DEFAULT_ADMIN);
        await db.from("users").insert([DEFAULT_ADMIN]);
      }
      if (state.currentUser) {
        const freshUser = state.users.find((u) => u.id === state.currentUser.id);
        if (freshUser && !freshUser.locked) {
          state.currentUser = freshUser;
          saveJSON(STORAGE_KEYS.CURRENT_USER, freshUser);
        } else {
          state.currentUser = null;
          localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
        }
      }
    }

    if (ordersRes.data) {
      state.orders = ordersRes.data.map((o) => ({
        orderCode: o.order_code,
        userId: o.user_id,
        customer: o.customer,
        items: o.items,
        total: Number(o.total),
        payment: o.payment,
        customerReportedPaid: Boolean(o.customer_reported_paid),
        isPaid: Boolean(o.is_paid),
        status: o.status,
        createdAt: o.created_at,
        createdTimestamp: Number(o.created_timestamp),
      }));
    }

    render();
  } catch (err) {
    console.error("Lỗi đồng bộ Supabase:", err);
  }
}

function formatPrice(value) {
  return new Intl.NumberFormat("vi-VN").format(value) + " đ";
}

function updateUserUI() {
  const dot = document.querySelector("#userDot");
  const trigger = document.querySelector("#userTrigger");
  if (dot) dot.classList.toggle("show", Boolean(state.currentUser));
  if (trigger) {
    trigger.title = state.currentUser ? `Tài khoản: ${state.currentUser.name}` : "Đăng nhập / Đăng ký";
  }
}

function setRoute(route) {
  let targetRoute = route || "home";

  if (targetRoute !== "checkout" && state.pendingBankOrder) {
    state.pendingBankOrder = null;
  }

  if ((targetRoute === "checkout" || targetRoute === "account" || targetRoute === "admin") && !state.currentUser) {
    state.redirectAfterLogin = targetRoute;
    state.authNotice = targetRoute === "checkout"
      ? "Vui lòng đăng nhập hoặc đăng ký tài khoản trước khi tiến hành thanh toán."
      : "Vui lòng đăng nhập để tiếp tục.";
    targetRoute = "auth";
    history.replaceState(null, "", "#auth");
  }

  if (targetRoute === "admin" && state.currentUser?.role !== "admin") {
    targetRoute = "account";
    history.replaceState(null, "", "#account");
  }

  state.route = targetRoute;
  const activeRoute = state.route.startsWith("product/") ? "shop" : state.route;
  document.querySelectorAll(".main-nav a").forEach((link) => link.classList.toggle("active", link.dataset.route === activeRoute));
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function productLabels(product) {
  return product.tags.map((tag) => `<span class="label ${tag === "Mới" ? "new" : tag === "Theo mùa" ? "season" : ""}">${tag}</span>`).join("");
}

function productCard(product) {
  const loved = state.wishlist.has(product.id);
  const stars = "★".repeat(product.rating) + "☆".repeat(5 - product.rating);
  return `
    <article class="product-card">
      <a class="product-image product-link" href="#product/${product.id}" aria-label="Xem chi tiết ${product.name}">
        <img src="${productImage(product)}" onerror="handleImgError(this, '${product.id}')" alt="${product.name}" />
        <div class="labels">${productLabels(product)}</div>
      </a>
      <div class="product-body">
        <h3><a class="product-title-link" href="#product/${product.id}">${product.name}</a></h3>
        <div class="weight">${product.weight}</div>
        <div class="rating-row">
          <span class="stars">${stars} <span class="muted">(${product.reviews})</span></span>
          <button class="heart ${loved ? "active" : ""}" data-action="toggle-wish" data-id="${product.id}" aria-label="Yêu thích ${product.name}">
            <svg viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"></path></svg>
          </button>
        </div>
        <div class="price-row">
          <strong class="price">${formatPrice(product.price)}</strong>
          <button class="bag-button" data-action="add-cart" data-id="${product.id}" aria-label="Thêm ${product.name} vào giỏ">
            <svg viewBox="0 0 24 24"><path d="M6 8h12l-1 12H7L6 8Z"></path><path d="M9 8a3 3 0 0 1 6 0"></path></svg>
          </button>
        </div>
      </div>
    </article>
  `;
}

function renderProductDetail(id) {
  const product = products.find((item) => item.id === id) || products[0];
  const loved = state.wishlist.has(product.id);
  const related = products.filter((item) => item.id !== product.id && item.category === product.category).concat(products.filter((item) => item.id !== product.id)).slice(0, 3);
  const sold = product.reviews * 4 + 24;
  return `
    <section class="product-detail">
      <nav class="breadcrumbs" aria-label="Đường dẫn">
        <a href="#home">Trang chủ</a><span>›</span><a href="#shop">Sản phẩm</a><span>›</span><span>${product.name}</span>
      </nav>
      <div class="detail-layout">
        <div class="detail-media">
          <img src="${productImage(product)}" onerror="handleImgError(this, '${product.id}')" alt="${product.name}" />
        </div>
        <div class="detail-info">
          <div class="detail-tags">${product.tags.map((tag) => `<span class="detail-tag">${tag === "Nổi bật" ? "✦ " : "✨ "}${tag}</span>`).join("")}</div>
          <h1>${product.name}</h1>
          <p class="detail-weight">${product.weight}</p>
          <div class="detail-rating"><span class="stars">★★★★★</span><strong>4.8</strong><span>(${product.reviews} đánh giá)</span><span>·</span><span>${sold} đã bán</span></div>
          <div class="detail-price">${formatPrice(product.price)}</div>
          <div class="flavor-box">
            <strong>Hương vị nổi bật</strong>
            <ul>
              <li>Ngọt thanh, hậu vị nhẹ và cân bằng</li>
              <li>Kết cấu mềm mịn, lớp bánh thơm bơ</li>
              <li>Hoàn thiện thủ công mỗi ngày tại LEOF Cakes</li>
            </ul>
          </div>
          <div class="detail-qty-row">
            <span>Số lượng:</span>
            <div class="qty detail-qty">
              <button data-action="detail-minus">−</button>
              <span>${state.detailQty}</span>
              <button data-action="detail-plus">+</button>
            </div>
          </div>
          <div class="detail-actions">
            <button class="primary detail-add" data-action="detail-add-cart" data-id="${product.id}">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 8h12l-1 12H7L6 8Z"></path><path d="M9 8a3 3 0 0 1 6 0"></path></svg>
              Thêm vào giỏ
            </button>
            <button class="heart detail-heart ${loved ? "active" : ""}" data-action="toggle-wish" data-id="${product.id}" aria-label="Yêu thích ${product.name}">
              <svg viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"></path></svg>
            </button>
          </div>
          <button class="outline-button full" data-action="detail-buy-now" data-id="${product.id}">Mua ngay</button>
          <div class="detail-copy">
            <h2>Mô tả</h2>
            <p>${product.name} được làm thủ công với nguyên liệu tuyển chọn, giữ vị ngọt thanh và hương thơm đặc trưng cho từng dịp thưởng thức.</p>
            <h2>Thành phần</h2>
            <p>Bột mì, bơ Président, trứng, sữa tươi, đường bột và hương liệu tự nhiên theo từng dòng bánh.</p>
          </div>
        </div>
      </div>
      <section class="reviews-section">
        <h2>Đánh giá từ khách hàng</h2>
        <div class="review-summary"><strong>4.8</strong><span class="stars">★★★★★</span><span>3 đánh giá</span></div>
        <form class="review-form">
          <h3>Viết đánh giá</h3>
          <label>Chấm sao <span class="stars big-stars">★★★★★</span></label>
          <textarea placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."></textarea>
          <button class="primary" type="button">Gửi đánh giá</button>
        </form>
        <div class="review-list">
          ${[
            ["Nguyễn Thị Lan", "10/6/2026", "Bánh tuyệt vời! Lớp kem mịn, hương thơm nhẹ, cả nhà đều khen ngợi."],
            ["Trần Văn Minh", "8/6/2026", "Đúng chuẩn vị Pháp, không quá ngọt và đóng gói rất cẩn thận."],
            ["Phạm Thu Hà", "5/6/2026", "Rất ngon và đẹp. Giao hàng nhanh. Sẽ tiếp tục ủng hộ LEOF Cakes!"],
          ].map(([name, date, text]) => `<article class="review-item"><div><strong>${name}</strong><span class="stars">★★★★★</span></div><time>${date}</time><p>${text}</p></article>`).join("")}
        </div>
      </section>
      <section class="related-products">
        <h2>Sản phẩm liên quan</h2>
        <div class="products-grid">${related.map(productCard).join("")}</div>
      </section>
    </section>
    ${footer()}
  `;
}

function sectionTitle(eyebrow, title, sub = "") {
  return `
    <div class="section-title">
      <div class="eyebrow">${eyebrow}</div>
      <h2>${title}</h2>
      <span class="gold-line"></span>
      ${sub ? `<p>${sub}</p>` : ""}
    </div>
  `;
}

function benefitIcon(type) {
  const icons = {
    cake: '<path d="M4 11h16v9H4z"></path><path d="M4 15h16"></path><path d="M8 11V8"></path><path d="M12 11V7"></path><path d="M16 11V8"></path><path d="M8 8c0-1 1-1.4 1-2.2S8.3 4.5 8 4"></path><path d="M12 7c0-1 1-1.4 1-2.2S12.3 3.5 12 3"></path><path d="M16 8c0-1 1-1.4 1-2.2S16.3 4.5 16 4"></path>',
    truck: '<path d="M3 7h11v10H3z"></path><path d="M14 11h4l3 3v3h-7z"></path><circle cx="7" cy="18" r="2"></circle><circle cx="17" cy="18" r="2"></circle>',
    sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"></path><path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"></path>',
    gift: '<path d="M4 10h16v11H4z"></path><path d="M4 14h16"></path><path d="M12 10v11"></path><path d="M12 10H8.5A2.5 2.5 0 1 1 12 6.5z"></path><path d="M12 10h3.5A2.5 2.5 0 1 0 12 6.5z"></path>',
  };
  return `<span class="benefit-icon"><svg viewBox="0 0 24 24" aria-hidden="true">${icons[type]}</svg></span>`;
}

function renderHome() {
  const featured = products.slice(0, 4);
  const seasonal = products.filter((p) => p.tags.includes("Theo mùa")).slice(0, 4);
  return `
    <section class="hero">
      ${["Nghệ Thuật Từ Bếp Bánh", "Đặt Bánh Sinh Nhật", "Tinh Tế Cho Mỗi Dịp"].map((title, index) => `
        <div class="hero-slide ${index === state.slide ? "active" : ""}">
          <img src="${IMAGE}" alt="${title}" />
        </div>
      `).join("")}
      <div class="hero-content">
        <span class="hero-kicker">LEOF CAKES</span>
        <h1>${["Nghệ Thuật Từ Bếp Bánh", "Đặt Bánh Sinh Nhật", "Tinh Tế Cho Mỗi Dịp"][state.slide]}</h1>
        <p>Mỗi chiếc bánh - một tác phẩm tinh tế được tạo nên bởi tình yêu và kỹ thuật Pháp thuần tuý.</p>
        <a href="#shop" class="primary">Khám phá ngay →</a>
      </div>
      <div class="hero-dots">${[0, 1, 2].map((i) => `<button class="${i === state.slide ? "active" : ""}" data-action="slide" data-slide="${i}" aria-label="Slide ${i + 1}"></button>`).join("")}</div>
      <button class="hero-arrow prev" data-action="prev-slide" aria-label="Slide trước đó">‹</button>
      <button class="hero-arrow next" data-action="next-slide" aria-label="Slide kế tiếp">›</button>
    </section>
    <section class="benefits">
      <div>${benefitIcon("cake")}<strong>Bánh tươi mỗi ngày</strong><p>Làm mới trong ngày</p></div>
      <div>${benefitIcon("truck")}<strong>Giao hàng tận nơi</strong><p>Nhanh trong nội thành</p></div>
      <div>${benefitIcon("sparkle")}<strong>Nguyên liệu cao cấp</strong><p>Tuyển chọn kỹ lưỡng</p></div>
      <div>${benefitIcon("gift")}<strong>Thiết kế riêng</strong><p>Cho mọi dịp đặc biệt</p></div>
    </section>
    <section class="section">
      ${sectionTitle("Tuyển chọn tinh tế", "Sản phẩm nổi bật", "Những chiếc bánh được yêu thích nhất, làm nên thương hiệu LEOF Cakes.")}
      <div class="products-grid">${featured.map(productCard).join("")}</div>
      <div class="center" style="margin-top: 48px"><a class="outline-button" href="#shop">Xem tất cả sản phẩm →</a></div>
    </section>
    <section class="quote-band"><div><p>"Baking is love made edible."</p><small>LEOF Cakes - Est. 2018</small></div></section>
    <section class="section">
      ${sectionTitle("Hương vị mùa này", "Sản phẩm theo mùa", "Những sáng tạo mới, được hoàn thiện với nguyên liệu theo mùa.")}
      <div class="products-grid">${seasonal.map(productCard).join("")}</div>
    </section>
    <section class="section story">
      <div>
        <span class="eyebrow">Câu chuyện của chúng tôi</span>
        <h2>Nghệ Thuật Làm Bánh Từ Tâm</h2>
        <span class="gold-line" style="margin-left: 0"></span>
        <p>Khởi nguồn từ niềm đam mê với nền ẩm thực Pháp, LEOF Cakes mang những chiếc bánh đạt tiêu chuẩn patisserie Âu đến với người Việt.</p>
        <p>Từng chiếc bánh là sự kết hợp giữa kỹ thuật truyền thống và sáng tạo đương đại.</p>
        <a class="outline-button" href="#about">Tìm hiểu thêm →</a>
      </div>
      <div class="video-card"><img src="${IMAGE}" alt="Video giới thiệu" /><span class="play">▷</span></div>
    </section>
    <section class="section">
      ${sectionTitle("Tin tức & sự kiện", "Câu chuyện mới nhất")}
      <div class="news-grid">${articles.slice(0, 3).map(articleCard).join("")}</div>
    </section>
    ${footer()}
  `;
}

function filteredProducts() {
  return products
    .filter((p) => state.category === "Tất cả" || p.category === state.category)
    .filter((p) => state.quick === "Tất cả" || p.quick.includes(state.quick) || p.tags.includes(state.quick.replace("Mới nhất", "Mới")))
    .filter((p) => !state.search || p.name.toLowerCase().includes(state.search.toLowerCase()))
    .filter((p) => !state.min || p.price >= Number(state.min))
    .filter((p) => !state.max || p.price <= Number(state.max))
    .sort((a, b) => {
      if (state.sort === "price-asc") return a.price - b.price;
      if (state.sort === "price-desc") return b.price - a.price;
      if (state.sort === "name") return a.name.localeCompare(b.name, "vi");
      return 0;
    });
}

function renderShop() {
  const list = filteredProducts();
  return `
    <section class="page-hero">
      <span class="eyebrow">Thực đơn của chúng tôi</span>
      <h1>Các Loại Bánh</h1>
      <span class="gold-line"></span>
      <p>Khám phá bộ sưu tập bánh ngọt đa dạng được làm thủ công mỗi ngày.</p>
    </section>
    <section class="shop-layout">
      <aside class="shop-sidebar">
        <input class="search-box" data-action="search" value="${state.search}" placeholder="Tìm kiếm bánh..." />
        <div class="filter-group">
          <h3>Danh mục</h3>
          ${categories.map((cat) => `<button class="filter-button ${state.category === cat ? "active" : ""}" data-action="category" data-value="${cat}">${cat}</button>`).join("")}
        </div>
        <div class="filter-group">
          <h3>Khoảng giá</h3>
          <div class="price-fields">
            <input data-action="min-price" value="${state.min}" inputmode="numeric" placeholder="Từ (đ)" />
            <input data-action="max-price" value="${state.max}" inputmode="numeric" placeholder="Đến (đ)" />
          </div>
        </div>
        <div class="filter-group">
          <h3>Lọc nhanh</h3>
          ${quickFilters.map((q) => `<button class="filter-button ${state.quick === q ? "active" : ""}" data-action="quick" data-value="${q}">${q}</button>`).join("")}
        </div>
      </aside>
      <div>
        <div class="shop-toolbar">
          <p>Hiển thị ${list.length} sản phẩm</p>
          <select class="sort-select" data-action="sort">
            <option value="default" ${state.sort === "default" ? "selected" : ""}>Mặc định</option>
            <option value="price-asc" ${state.sort === "price-asc" ? "selected" : ""}>Giá tăng dần</option>
            <option value="price-desc" ${state.sort === "price-desc" ? "selected" : ""}>Giá giảm dần</option>
            <option value="name" ${state.sort === "name" ? "selected" : ""}>Tên A-Z</option>
          </select>
        </div>
        ${list.length ? `<div class="products-grid">${list.map(productCard).join("")}</div>` : emptyState("Không tìm thấy sản phẩm phù hợp.", "Xóa bộ lọc")}
      </div>
    </section>
    ${footer()}
  `;
}

function emptyState(message, cta) {
  return `
    <div class="empty-state">
      <div>
        <svg viewBox="0 0 24 24"><path d="M12 21s-7-4.4-9.3-9A5.6 5.6 0 0 1 12 5.5 5.6 5.6 0 0 1 21.3 12C19 16.6 12 21 12 21Z"></path></svg>
        <p>${message}</p>
        <button class="primary" data-action="clear-filters">${cta}</button>
      </div>
    </div>
  `;
}

function renderWishlist() {
  const list = products.filter((p) => state.wishlist.has(p.id));
  return `
    <section class="page-hero">
      <span class="eyebrow">Bộ sưu tập riêng</span>
      <h1>Yêu Thích Của Tôi</h1>
      <span class="gold-line"></span>
    </section>
    <section class="section">
      ${list.length ? `<div class="products-grid">${list.map(productCard).join("")}</div>` : emptyState("Chưa có sản phẩm yêu thích.", "Khám phá sản phẩm")}
    </section>
  `;
}

function renderAbout() {
  return `
    <section class="about-hero"><div><span class="eyebrow">Về chúng tôi</span><h1>LEOF Cakes</h1></div></section>
    <section class="section story">
      <div>
        <span class="eyebrow">Câu chuyện của chúng tôi</span>
        <h2>Từ Tình Yêu Đến Nghệ Thuật</h2>
        <span class="gold-line" style="margin-left: 0"></span>
        <p>LEOF Cakes được sinh ra từ mong muốn mang phong cách tiệm bánh Âu chính hiệu đến giữa lòng Việt Nam. Chúng tôi chọn nguyên liệu kỹ, làm bánh thủ công và giữ từng chi tiết ở mức tinh tế.</p>
        <p>Mỗi chiếc bánh là một món quà nhỏ dành cho khoảnh khắc đáng nhớ.</p>
      </div>
      <div class="video-card"><img src="${IMAGE}" alt="Không gian cửa hàng" /></div>
    </section>
    <section class="section">
      ${sectionTitle("Không gian cửa hàng", "Nơi Bánh Được Hoàn Thiện")}
      <div class="gallery-grid">
        <img src="${IMAGE}" alt="Không gian cửa hàng" />
        <img src="${IMAGE}" alt="Bánh trưng bày" />
        <img src="${IMAGE}" alt="Bếp bánh" />
        <img src="${IMAGE}" alt="Chi tiết bánh" />
        <img src="${IMAGE}" alt="Quầy bánh" />
      </div>
    </section>
    ${footer()}
  `;
}

function renderContact() {
  return `
    <section class="contact">
      <div>
        <span class="eyebrow">Liên hệ</span>
        <h1>Nói Chuyện<br /> Với Chúng Tôi</h1>
        <span class="gold-line" style="margin-left: 0"></span>
        <div class="contact-list">
          ${contactItem("pin", "Địa chỉ", "466C1 Nguyễn Huệ, Phú Khương, Vĩnh Long")}
          ${contactItem("phone", "Điện thoại", "0901 234 567")}
          ${contactItem("mail", "Email", "hello@leofcakes.vn")}
        </div>
        <div class="map-placeholder">${STORE_MAP_IFRAME}</div>
      </div>
      <form class="contact-form" data-form="contact" novalidate>
        <h2>Gửi tin nhắn</h2>
        <div class="form-grid" style="margin-top: 34px">
          <label>Họ và tên *<input class="field" name="name" placeholder="Nguyễn Văn A" /></label>
          <label>Email *<input class="field" name="email" placeholder="email@example.com" /></label>
          <label>Số điện thoại<input class="field" name="phone" placeholder="0901234567" /></label>
          <label>Nội dung *<textarea name="message" placeholder="Nội dung tin nhắn của bạn..."></textarea></label>
          <div class="form-message"></div>
          <button class="primary full" type="submit">✈ Gửi tin nhắn</button>
        </div>
      </form>
    </section>
  `;
}

function contactItem(icon, title, text) {
  const paths = {
    pin: '<path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z"></path><circle cx="12" cy="10" r="2.5"></circle>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 3 5.2 2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.7c.1.9.3 1.7.6 2.5a2 2 0 0 1-.4 2.1L8 11a16 16 0 0 0 5 5l1.7-2.2a2 2 0 0 1 2.1-.4c.8.3 1.6.5 2.5.6A2 2 0 0 1 22 16.9Z"></path>',
    mail: '<path d="M4 4h16v16H4z"></path><path d="m4 7 8 6 8-6"></path>',
  };
  return `<div class="contact-item"><span class="contact-icon"><svg viewBox="0 0 24 24">${paths[icon]}</svg></span><div><strong>${title}</strong><span>${text}</span></div></div>`;
}

function articleCard(article) {
  return `
    <article class="article-card">
      <img src="${article.image}" alt="${article.title}" />
      <div class="news-copy">
        <span class="tag">${article.category}</span>
        <h3>${article.title}</h3>
        <p>${article.excerpt}</p>
        <button class="read-more" data-action="article" data-id="${article.id}">Đọc thêm →</button>
      </div>
    </article>
  `;
}

function renderNews() {
  const tabs = ["Tất cả", "Khuyến mãi", "Voucher", "Sự kiện", "Bảo quản bánh", "Theo mùa"];
  const list = state.newsCategory === "Tất cả" ? articles : articles.filter((a) => a.category === state.newsCategory);
  const first = list[0] || articles[0];
  return `
    <section class="page-hero">
      <span class="eyebrow">Tin tức & sự kiện</span>
      <h1>Tin Tức & Sự Kiện</h1>
      <span class="gold-line"></span>
      <p>Những câu chuyện, khuyến mãi và sự kiện mới nhất từ LEOF Cakes.</p>
    </section>
    <section class="section">
      <div class="news-tabs">${tabs.map((tab) => `<button class="pill ${state.newsCategory === tab ? "active" : ""}" data-action="news-tab" data-value="${tab}">${tab}</button>`).join("")}</div>
      ${state.newsLoading ? `<div class="skeleton-grid"><div class="skeleton"></div><div class="skeleton"></div><div class="skeleton"></div></div>` : `
        <article class="news-feature">
          <img src="${first.image}" alt="${first.title}" />
          <div class="news-copy">
            <span class="tag">${first.category}</span>
            <h2>${first.title}</h2>
            <p>${first.excerpt}</p>
            <button class="read-more" data-action="article" data-id="${first.id}">Đọc thêm →</button>
          </div>
        </article>
        <div class="news-grid">${list.slice(1).map(articleCard).join("")}</div>
      `}
    </section>
    ${footer()}
  `;
}

function renderArticle(id) {
  const article = articles.find((item) => item.id === id) || articles[0];
  return `
    <article class="wide-section">
      <img src="${IMAGE}" alt="${article.title}" style="width: 100%; max-height: 420px; object-fit: cover; border-radius: 8px" />
      <div style="max-width: 880px; margin: 42px auto 0">
        <span class="tag">${article.category}</span>
        <h1 style="font-family: var(--serif); font-size: 56px; font-weight: 500; margin: 12px 0">${article.title}</h1>
        <p style="color: var(--muted)">Cập nhật 26/06/2026 · LEOF Cakes</p>
        <p style="font-size: 19px; line-height: 1.9">${article.body}</p>
        <p style="font-size: 19px; line-height: 1.9">Bạn có thể đặt trước hoặc ghé cửa hàng để được tư vấn hương vị phù hợp cho từng dịp.</p>
      </div>
    </article>
    ${footer()}
  `;
}

// ==========================================
// TRANG ĐĂNG NHẬP / ĐĂNG KÝ (#auth)
// ==========================================
function renderAuth() {
  const isLogin = state.authMode === "login";
  return `
    <section class="auth-section">
      <div class="auth-card">
        <div class="auth-tabs">
          <button class="auth-tab ${isLogin ? "active" : ""}" data-action="auth-tab" data-mode="login">Đăng nhập</button>
          <button class="auth-tab ${!isLogin ? "active" : ""}" data-action="auth-tab" data-mode="register">Đăng ký</button>
        </div>
        ${state.authNotice ? `<div class="auth-notice">${state.authNotice}</div>` : ""}
        ${isLogin ? `
          <form class="form-grid" data-form="login" novalidate>
            <label>Email *<input class="field" name="email" type="email" placeholder="email@example.com" /></label>
            <label>Mật khẩu *<input class="field" name="password" type="password" placeholder="Nhập mật khẩu" /></label>
            <div class="form-message"></div>
            <button class="primary full" type="submit">Đăng nhập</button>
          </form>
        ` : `
          <form class="form-grid" data-form="register" novalidate>
            <label>Họ và tên *<input class="field" name="name" placeholder="Nguyễn Văn A" /></label>
            <label>Email *<input class="field" name="email" type="email" placeholder="email@example.com" /></label>
            <label>Số điện thoại *<input class="field" name="phone" placeholder="0901234567" /></label>
            <label>Địa chỉ mặc định *<input class="field" name="address" placeholder="Số nhà, đường, phường/xã..." /></label>
            <label>Mật khẩu *<input class="field" name="password" type="password" placeholder="Tối thiểu 6 ký tự" /></label>
            <div class="form-message"></div>
            <button class="primary full" type="submit">Tạo tài khoản</button>
          </form>
        `}
      </div>
    </section>
    ${footer()}
  `;
}

// ==========================================
// TRANG TÀI KHOẢN & THEO DÕI ĐƠN HÀNG (#account)
// ==========================================
function getOrderStatusInfo(status) {
  const map = {
    pending: { label: "Chờ xác nhận", cls: "status-pending", step: 1 },
    cancel_requested: { label: "Chờ duyệt hủy", cls: "status-cancel-req", step: 1 },
    baking: { label: "Đang làm bánh", cls: "status-baking", step: 2 },
    shipping: { label: "Đang giao hàng", cls: "status-shipping", step: 3 },
    completed: { label: "Hoàn thành", cls: "status-completed", step: 4 },
    cancelled: { label: "Đã hủy", cls: "status-cancelled", step: 0 },
  };
  return map[status] || map.pending;
}

function getUserAddresses(user) {
  if (!user) return [];
  if (!Array.isArray(user.addresses)) {
    user.addresses = user.address
      ? [{
          id: "addr_init",
          label: "Mặc định",
          recipientName: user.name,
          phone: user.phone || "",
          detail: user.address,
          isDefault: true,
        }]
      : [];
  }
  return user.addresses;
}

async function syncUserAddresses(user) {
  const defaultAddr = user.addresses.find((a) => a.isDefault) || user.addresses[0];
  if (defaultAddr) {
    defaultAddr.isDefault = true;
    user.address = defaultAddr.detail;
    if (defaultAddr.phone) user.phone = defaultAddr.phone;
  } else {
    user.address = "";
  }
  const idx = state.users.findIndex((u) => u.id === user.id);
  if (idx !== -1) state.users[idx] = user;
  saveJSON(STORAGE_KEYS.CURRENT_USER, user);

  await db.from("users").update({
    address: user.address,
    phone: user.phone,
    addresses: user.addresses,
  }).eq("id", user.id);
}

function renderAccount() {
  const user = state.currentUser;
  if (!user) return renderAuth();

  const myOrders = state.orders
    .filter((order) => order.userId === user.id)
    .sort((a, b) => b.createdTimestamp - a.createdTimestamp);
  const addresses = getUserAddresses(user);

  return `
    <section class="page-hero">
      <span class="eyebrow">Khách hàng thành viên</span>
      <h1>Tài Khoản Của Tôi</h1>
      <span class="gold-line"></span>
    </section>
    <section class="account-layout">
      <aside class="account-sidebar">
        <div class="account-user-box">
          <strong>${user.name}</strong>
          <span>${user.email}</span>
        </div>
        <button class="filter-button ${state.accountTab === "orders" ? "active" : ""}" data-action="account-tab" data-tab="orders">Đơn hàng của tôi (${myOrders.length})</button>
        <button class="filter-button ${state.accountTab === "profile" ? "active" : ""}" data-action="account-tab" data-tab="profile">Thông tin cá nhân</button>
        <button class="filter-button ${state.accountTab === "addresses" ? "active" : ""}" data-action="account-tab" data-tab="addresses">Sổ địa chỉ (${addresses.length})</button>
        <button class="filter-button ${state.accountTab === "password" ? "active" : ""}" data-action="account-tab" data-tab="password">Đổi mật khẩu</button>
        <a class="filter-button" href="#wishlist" style="text-decoration:none">Danh sách yêu thích (${state.wishlist.size})</a>
        <button class="filter-button" data-action="logout" style="color: var(--danger); margin-top: 12px">Đăng xuất</button>
      </aside>

      <div>
        ${state.accountTab === "orders" ? `
          <h2 style="font-family: var(--serif); font-size: 36px; margin-top: 0">Theo Dõi Tiến Độ Đơn Hàng</h2>
          ${!myOrders.length ? `
            <div class="account-card" style="text-align:center; padding: 60px 24px">
              <p style="color: var(--muted)">Bạn chưa có đơn hàng nào.</p>
              <a class="primary" href="#shop">Đặt bánh ngay</a>
            </div>
          ` : myOrders.map((order) => {
            const st = getOrderStatusInfo(order.status);
            return `
              <article class="order-card">
                <div class="order-head">
                  <div>
                    <strong style="font-size: 18px">Mã đơn: ${order.orderCode}</strong><br />
                    <small style="color: var(--muted)">Ngày đặt: ${order.createdAt} · ${order.payment === "cod"
                      ? "Thanh toán COD"
                      : `Chuyển khoản ngân hàng ${
                          order.isPaid
                            ? '<span class="status-badge status-completed" style="padding:2px 8px; font-size:11px; margin-left:6px">Đã nhận tiền</span>'
                            : order.customerReportedPaid
                              ? '<span class="status-badge status-pending" style="padding:2px 8px; font-size:11px; margin-left:6px">Chờ đối chiếu CK</span>'
                              : ""
                        }`
                    }</small>
                  </div>
                  <span class="status-badge ${st.cls}">${st.label}</span>
                </div>

                ${order.status !== "cancelled" ? `
                  <div class="order-tracker">
                    <div class="tracker-step ${st.step >= 1 ? "done" : ""}"><span class="tracker-dot">1</span>Đã tiếp nhận</div>
                    <div class="tracker-step ${st.step >= 2 ? "done" : ""}"><span class="tracker-dot">2</span>Bếp đang làm</div>
                    <div class="tracker-step ${st.step >= 3 ? "done" : ""}"><span class="tracker-dot">3</span>Đang giao bánh</div>
                    <div class="tracker-step ${st.step >= 4 ? "done" : ""}"><span class="tracker-dot">4</span>Đã giao hàng</div>
                  </div>
                ` : ""}

                <div class="order-items-mini">
                  ${order.items.map((item) => `
                    <div class="order-item-row">
                      <span><strong>${item.name}</strong> × ${item.qty}</span>
                      <span>${formatPrice(item.price * item.qty)}</span>
                    </div>
                  `).join("")}
                </div>

                <div style="font-size: 14px; color: var(--muted); margin-top: 10px">
                  Giao đến: <strong>${order.customer.name}</strong> (${order.customer.phone}) — ${order.customer.address}
                </div>

                <div class="order-foot">
                  <div>Tổng cộng: <strong class="price">${formatPrice(order.total)}</strong></div>
                  <div style="display:flex; align-items:center; gap:10px">
                    ${order.status === "pending" ? `<button class="btn-danger-outline" data-action="cancel-order" data-code="${order.orderCode}">Yêu cầu hủy đơn</button>` : ""}
                    ${order.status === "cancel_requested" ? `<span style="font-size:13px; color:#b44b4b; font-weight:600">Đang chờ Admin xác nhận hủy...</span>` : ""}
                    ${(order.status === "completed" || order.status === "cancelled") ? `<button class="btn-keep-outline" data-action="reorder" data-code="${order.orderCode}">↻ Đặt lại đơn</button>` : ""}
                  </div>
                </div>
              </article>
            `;
          }).join("")}

        ` : state.accountTab === "profile" ? `
          <div class="account-card">
            <h2 style="font-family: var(--serif); font-size: 36px; margin-top: 0">Hồ Sơ Cá Nhân</h2>
            <form class="form-grid" data-form="profile" novalidate>
              <label>Họ và tên *<input class="field" name="name" value="${user.name}" /></label>
              <label>Email (Không thể thay đổi)<input class="field" value="${user.email}" disabled style="background: var(--paper-2)" /></label>
              <label>Số điện thoại *<input class="field" name="phone" value="${user.phone || ""}" /></label>
              <label>Địa chỉ giao hàng mặc định *<input class="field" name="address" value="${user.address || ""}" /></label>
              <div class="form-message"></div>
              <button class="primary" type="submit" style="width: fit-content">Lưu thay đổi</button>
            </form>
          </div>

        ` : state.accountTab === "addresses" ? `
          <div class="account-card" style="margin-bottom: 24px">
            <h2 style="font-family: var(--serif); font-size: 36px; margin-top: 0">Sổ Địa Chỉ Giao Hàng</h2>
            ${!addresses.length ? `<p style="color: var(--muted)">Bạn chưa lưu địa chỉ giao hàng nào.</p>` : `
              <div class="address-list">
                ${addresses.map((addr) => `
                  <div class="address-card ${addr.isDefault ? "default" : ""}">
                    <div>
                      <div style="display:flex; align-items:center; gap:10px; margin-bottom:6px">
                        <strong>${addr.label}</strong>
                        ${addr.isDefault ? `<span class="address-badge">Mặc định</span>` : ""}
                      </div>
                      <div style="font-size:15px"><strong>${addr.recipientName}</strong> · ${addr.phone}</div>
                      <div style="color: var(--muted); font-size:14px; margin-top:4px">${addr.detail}</div>
                    </div>
                    <div style="display:flex; flex-wrap:wrap; gap:8px">
                      ${!addr.isDefault ? `<button class="btn-keep-outline" data-action="set-default-address" data-id="${addr.id}">Đặt mặc định</button>` : ""}
                      <button class="btn-danger-outline" data-action="delete-address" data-id="${addr.id}">Xóa</button>
                    </div>
                  </div>
                `).join("")}
              </div>
            `}
          </div>

          <div class="account-card">
            <h3 style="font-family: var(--serif); font-size: 28px; margin-top: 0">Thêm Địa Chỉ Mới</h3>
            <form class="form-grid" data-form="add-address" novalidate>
              <div class="two-col">
                <label>Tên gợi nhớ *<input class="field" name="label" placeholder="Ví dụ: Nhà riêng, Công ty, Tặng bạn..." /></label>
                <label>Tên người nhận *<input class="field" name="recipientName" value="${user.name}" /></label>
              </div>
              <label>Số điện thoại người nhận *<input class="field" name="phone" value="${user.phone || ""}" placeholder="0901234567" /></label>
              <label>Địa chỉ chi tiết *<input class="field" name="detail" placeholder="Số nhà, đường, phường/xã, quận/huyện..." /></label>
              <label style="display:flex; align-items:center; gap:10px; font-weight:500; cursor:pointer">
                <input type="checkbox" name="isDefault" style="width:18px; height:18px" /> Đặt làm địa chỉ giao hàng mặc định
              </label>
              <div class="form-message"></div>
              <button class="primary" type="submit" style="width: fit-content">+ Lưu địa chỉ</button>
            </form>
          </div>

        ` : `
          <div class="account-card">
            <h2 style="font-family: var(--serif); font-size: 36px; margin-top: 0">Đổi Mật Khẩu</h2>
            <form class="form-grid" data-form="change-password" novalidate>
              <label>Mật khẩu hiện tại *<input class="field" name="oldPassword" type="password" placeholder="Nhập mật khẩu đang dùng" /></label>
              <label>Mật khẩu mới *<input class="field" name="newPassword" type="password" placeholder="Tối thiểu 6 ký tự" /></label>
              <label>Xác nhận mật khẩu mới *<input class="field" name="confirmPassword" type="password" placeholder="Nhập lại mật khẩu mới" /></label>
              <div class="form-message"></div>
              <button class="primary" type="submit" style="width: fit-content">Cập nhật mật khẩu</button>
            </form>
          </div>
        `}
      </div>
    </section>
    ${footer()}
  `;
}

// ==========================================
// TRANG QUẢN TRỊ ADMIN (#admin)
// ==========================================
function renderAdmin() {
  const user = state.currentUser;
  if (!user || user.role !== "admin") return renderAuth();

  const allOrders = [...state.orders].sort((a, b) => b.createdTimestamp - a.createdTimestamp);
  const completedRevenue = allOrders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + o.total, 0);
  const pendingCount = allOrders.filter(
    (o) => o.status === "pending" || (o.payment === "bank" && !o.isPaid && o.status !== "cancelled")
  ).length;

  const allCustomers = state.users.filter((u) => u.role !== "admin");
  const keyword = state.adminCustomerSearch.trim().toLowerCase();
  const filteredCustomers = allCustomers.filter(
    (c) =>
      !keyword ||
      c.name.toLowerCase().includes(keyword) ||
      c.email.toLowerCase().includes(keyword) ||
      (c.phone && c.phone.includes(keyword))
  );

  return `
    <section class="page-hero">
      <span class="eyebrow">Hệ thống quản trị</span>
      <h1>Quản Lý Cửa Hàng</h1>
      <span class="gold-line"></span>
    </section>

    <section class="account-layout">
      <aside class="account-sidebar">
        <div class="account-user-box">
          <strong>${user.name}</strong>
          <span>Quyền: Quản trị viên (Admin)</span>
        </div>
        <button class="filter-button ${state.adminTab === "orders" ? "active" : ""}" data-action="admin-tab" data-tab="orders">Quản lý đơn hàng (${allOrders.length})</button>
        <button class="filter-button ${state.adminTab === "customers" ? "active" : ""}" data-action="admin-tab" data-tab="customers">Quản lý khách hàng (${allCustomers.length})</button>
        <button class="filter-button ${state.adminTab === "products" ? "active" : ""}" data-action="admin-tab" data-tab="products">Danh sách sản phẩm (${products.length})</button>
        <button class="filter-button" data-action="logout" style="color: var(--danger); margin-top: 12px">Đăng xuất</button>
      </aside>

      <div>
        <div class="admin-stats">
          <div class="stat-card"><span>Tổng đơn hàng</span><strong>${allOrders.length}</strong></div>
          <div class="stat-card"><span>Cần xử lý / đối chiếu</span><strong>${pendingCount}</strong></div>
          <div class="stat-card"><span>Doanh thu dự kiến</span><strong>${formatPrice(completedRevenue)}</strong></div>
          <div class="stat-card"><span>Khách hàng</span><strong>${allCustomers.length}</strong></div>
        </div>

        ${state.adminTab === "orders" ? `
          <h2 style="font-family: var(--serif); font-size: 36px; margin-top: 0">Danh Sách Đơn Đặt Hàng</h2>
          ${!allOrders.length ? `
            <div class="account-card" style="text-align:center; padding: 50px 20px">
              <p style="color: var(--muted)">Chưa có đơn hàng nào từ khách hàng.</p>
            </div>
          ` : allOrders.map((order) => {
            const st = getOrderStatusInfo(order.status);
            return `
              <article class="order-card">
                <div class="order-head">
                  <div>
                    <strong style="font-size: 18px">Mã đơn: ${order.orderCode}</strong><br />
                    <small style="color: var(--muted)">Khách hàng: <strong>${order.customer.name}</strong> · ${order.customer.phone} · Đặt lúc ${order.createdAt}</small>
                  </div>
                  <div style="display:flex; align-items:center; gap: 10px">
                    <span class="status-badge ${st.cls}">${st.label}</span>
                    <select class="admin-select" data-action="admin-status" data-code="${order.orderCode}">
                      <option value="pending" ${order.status === "pending" ? "selected" : ""}>Chờ xác nhận</option>
                      <option value="cancel_requested" ${order.status === "cancel_requested" ? "selected" : ""}>Chờ duyệt hủy</option>
                      <option value="baking" ${order.status === "baking" ? "selected" : ""}>Đang làm bánh</option>
                      <option value="shipping" ${order.status === "shipping" ? "selected" : ""}>Đang giao hàng</option>
                      <option value="completed" ${order.status === "completed" ? "selected" : ""}>Hoàn thành</option>
                      <option value="cancelled" ${order.status === "cancelled" ? "selected" : ""}>Đã hủy</option>
                    </select>
                  </div>
                </div>

                ${order.status === "cancel_requested" ? `
                  <div class="cancel-request-banner">
                    <span>⚠️ Khách hàng đã gửi yêu cầu hủy đơn hàng này.</span>
                    <div style="display:flex; gap:8px">
                      <button class="btn-danger-outline" data-action="approve-cancel" data-code="${order.orderCode}">Xác nhận hủy</button>
                      <button class="btn-keep-outline" data-action="reject-cancel" data-code="${order.orderCode}">Từ chối (Giữ đơn)</button>
                    </div>
                  </div>
                ` : ""}

                ${order.payment === "bank" && !order.isPaid && order.status !== "cancelled" ? `
                  <div class="bank-verify-banner">
                    <div>
                      <strong>${order.customerReportedPaid ? "💳 Khách đã báo chuyển khoản" : "⏳ Chờ khách chuyển khoản"}</strong><br />
                      <small>Đối chiếu BIDV: <strong>${formatPrice(order.total)}</strong> · Nội dung: <strong>${order.orderCode}</strong></small>
                    </div>
                    <div style="display:flex; gap:8px">
                      <button class="btn-keep-outline" data-action="confirm-payment-received" data-code="${order.orderCode}">✓ Xác nhận đã nhận tiền</button>
                      <button class="btn-danger-outline" data-action="reject-payment-received" data-code="${order.orderCode}">Chưa nhận được</button>
                    </div>
                  </div>
                ` : ""}

                <div class="order-items-mini">
                  ${order.items.map((item) => `
                    <div class="order-item-row">
                      <span><strong>${item.name}</strong> × ${item.qty}</span>
                      <span>${formatPrice(item.price * item.qty)}</span>
                    </div>
                  `).join("")}
                </div>

                <div style="font-size: 14px; color: var(--muted); margin-top: 8px">
                  Địa chỉ giao: ${order.customer.address} ${order.customer.note ? `· Ghi chú: <em>"${order.customer.note}"</em>` : ""}
                </div>

                <div class="order-foot">
                  <span>Hình thức: <strong>${order.payment === "cod"
                    ? "Thanh toán COD"
                    : `Chuyển khoản ngân hàng ${
                        order.isPaid
                          ? '<span class="status-badge status-completed" style="padding:2px 8px; font-size:11px; margin-left:6px">Đã nhận tiền</span>'
                          : order.customerReportedPaid
                            ? '<span class="status-badge status-pending" style="padding:2px 8px; font-size:11px; margin-left:6px">Chờ đối chiếu CK</span>'
                            : ""
                      }`
                  }</strong></span>
                  <div>Tổng tiền: <strong class="price">${formatPrice(order.total)}</strong></div>
                </div>
              </article>
            `;
          }).join("")}

        ` : state.adminTab === "customers" ? `
          <div style="display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; gap:16px; margin-bottom:24px">
            <h2 style="font-family: var(--serif); font-size: 36px; margin: 0">Danh Sách Khách Hàng</h2>
            <input class="search-box" style="width: min(320px, 100%); margin: 0" data-action="admin-customer-search" value="${state.adminCustomerSearch}" placeholder="Tìm tên, email hoặc SĐT..." />
          </div>

          ${!filteredCustomers.length ? `
            <div class="account-card" style="text-align:center; padding: 50px 20px">
              <p style="color: var(--muted)">Không tìm thấy tài khoản khách hàng nào.</p>
            </div>
          ` : `
            <div class="admin-table-wrap">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th>Khách hàng</th>
                    <th>Liên hệ & Địa chỉ</th>
                    <th>Đơn hợp lệ</th>
                    <th>Tổng chi tiêu</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  ${filteredCustomers.map((c) => {
                    const validOrders = state.orders.filter((o) => o.userId === c.id && o.status !== "cancelled");
                    const totalSpent = validOrders.reduce((sum, o) => sum + o.total, 0);
                    return `
                      <tr>
                        <td>
                          <strong>${c.name}</strong><br />
                          <small style="color: var(--muted)">${c.email}</small>
                        </td>
                        <td>
                          <span>${c.phone || "Chưa có SĐT"}</span><br />
                          <small style="color: var(--muted)">${c.address || "Chưa có địa chỉ"}</small>
                        </td>
                        <td><strong>${validOrders.length}</strong> đơn</td>
                        <td><strong class="price" style="font-size: 18px">${formatPrice(totalSpent)}</strong></td>
                        <td>
                          <span class="status-badge ${c.locked ? "status-cancelled" : "status-completed"}">
                            ${c.locked ? "Đã khóa" : "Hoạt động"}
                          </span>
                        </td>
                        <td>
                          <button class="${c.locked ? "btn-keep-outline" : "btn-danger-outline"}" data-action="toggle-lock-user" data-id="${c.id}">
                            ${c.locked ? "Mở khóa" : "Khóa tài khoản"}
                          </button>
                        </td>
                      </tr>
                    `;
                  }).join("")}
                </tbody>
              </table>
            </div>
          `}

        ` : `
          <h2 style="font-family: var(--serif); font-size: 36px; margin-top: 0">Danh Mục Bánh Hiện Có</h2>
          <div class="admin-table-wrap">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Tên bánh</th>
                  <th>Danh mục</th>
                  <th>Khối lượng</th>
                  <th>Đơn giá</th>
                  <th>Nhãn</th>
                </tr>
              </thead>
              <tbody>
                ${products.map((p) => `
                  <tr>
                    <td><strong>${p.name}</strong></td>
                    <td>${p.category}</td>
                    <td>${p.weight}</td>
                    <td>${formatPrice(p.price)}</td>
                    <td>${p.tags.join(", ")}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        `}
      </div>
    </section>
    ${footer()}
  `;
}

// ==========================================
// TRANG THANH TOÁN (#checkout)
// ==========================================
async function finalizeOrder(orderData) {
  await db.from("orders").insert([{
    order_code: orderData.orderCode,
    user_id: orderData.userId,
    customer: orderData.customer,
    items: orderData.items,
    total: orderData.total,
    payment: orderData.payment,
    customer_reported_paid: orderData.customerReportedPaid || false,
    is_paid: orderData.isPaid || false,
    status: orderData.status,
    created_at: orderData.createdAt,
    created_timestamp: orderData.createdTimestamp,
  }]);

  state.orders.unshift(orderData);
  state.lastOrderCode = orderData.orderCode;
  state.pendingBankOrder = null;
  state.cart.clear();
  state.accountTab = "orders";
  location.hash = "checkout-complete";
}

function renderCheckout() {
  const user = state.currentUser;
  if (!user) return renderAuth();

  if (state.pendingBankOrder) {
    const order = state.pendingBankOrder;
    const qrUrl = `https://img.vietqr.io/image/${BANK_CONFIG.bankId}-${BANK_CONFIG.accountNo}-compact2.png?amount=${order.total}&addInfo=${encodeURIComponent(order.orderCode)}&accountName=${encodeURIComponent(BANK_CONFIG.accountName)}`;

    return `
      <section class="checkout">
        <div class="qr-payment-box">
          <span class="eyebrow">Thanh toán trực tuyến</span>
          <h1 style="font-family: var(--serif); font-size: 40px; margin: 10px 0">Quét Mã QR Chuyển Khoản</h1>
          <p style="color: var(--muted); margin-bottom: 28px">
            Sử dụng ứng dụng ngân hàng hoặc ví điện tử hỗ trợ VietQR để quét mã. Sau khi chuyển khoản thành công, vui lòng bấm <strong>"Tôi đã chuyển khoản"</strong> bên dưới để hoàn tất đơn hàng.
          </p>

          <div class="qr-grid">
            <div class="qr-image-wrap">
              <img src="${qrUrl}" alt="Mã QR thanh toán ${order.orderCode}" />
            </div>

            <div class="qr-details">
              <div class="qr-row">
                <span>Ngân hàng</span>
                <strong>${BANK_CONFIG.bankName}</strong>
              </div>
              <div class="qr-row">
                <span>Chủ tài khoản</span>
                <strong>${BANK_CONFIG.accountName}</strong>
              </div>
              <div class="qr-row">
                <span>Số tài khoản</span>
                <div>
                  <strong>${BANK_CONFIG.accountNo}</strong>
                  <button type="button" class="copy-btn" data-action="copy-text" data-text="${BANK_CONFIG.accountNo}">Sao chép</button>
                </div>
              </div>
              <div class="qr-row">
                <span>Số tiền</span>
                <strong class="price" style="font-size: 22px">${formatPrice(order.total)}</strong>
              </div>
              <div class="qr-row">
                <span>Nội dung CK</span>
                <div>
                  <strong style="color: var(--gold-dark)">${order.orderCode}</strong>
                  <button type="button" class="copy-btn" data-action="copy-text" data-text="${order.orderCode}">Sao chép</button>
                </div>
              </div>

              <div class="qr-status-box">
                <span>Sau khi chuyển khoản thành công, vui lòng bấm nút xác nhận bên dưới để cửa hàng kiểm tra giao dịch.</span>
              </div>

              <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-top: 18px">
                <button type="button" class="primary" style="flex:1" data-action="confirm-bank-paid">✓ Tôi đã chuyển khoản</button>
                <button type="button" class="btn-danger-outline" data-action="cancel-bank-qr">Hủy thanh toán</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  const items = cartItems();
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  return `
    <section class="checkout">
      <h1>Thanh toán</h1>
      <div class="checkout-layout">
        <form class="checkout-card" data-form="checkout" novalidate>
          <div class="form-grid">
            <h2>Thông tin giao hàng</h2>
            ${getUserAddresses(user).length ? `
              <label>Chọn nhanh từ sổ địa chỉ đã lưu
                <select class="sort-select" style="width:100%" data-action="select-checkout-address">
                  ${getUserAddresses(user).map((addr) => `
                    <option value="${addr.id}" ${addr.isDefault ? "selected" : ""}>
                      [${addr.label}] ${addr.recipientName} (${addr.phone}) - ${addr.detail}
                    </option>
                  `).join("")}
                </select>
              </label>
            ` : ""}
            <label>Họ và tên *<input class="field" name="name" value="${user.name || ""}" /></label>
            <div class="two-col">
              <label>Số điện thoại *<input class="field" name="phone" value="${user.phone || ""}" /></label>
              <label>Email *<input class="field" name="email" value="${user.email || ""}" /></label>
            </div>
            <label>Địa chỉ giao hàng *<input class="field" name="address" value="${user.address || ""}" placeholder="Ví dụ: 466C1 Nguyễn Huệ, Phú Khương, Vĩnh Long" /></label>
            <label>Ghi chú đơn hàng<textarea name="note" placeholder="Lưu ý riêng cho đơn hàng của bạn"></textarea></label>
            <h2>Phương thức thanh toán</h2>
            <div class="payment-options">
              <label class="payment-option ${state.payment === "cod" ? "active" : ""}"><input type="radio" name="payment" value="cod" ${state.payment === "cod" ? "checked" : ""} /> <span><strong>Thanh toán khi nhận hàng (COD)</strong><br /><small>Thanh toán bằng tiền mặt khi nhận bánh.</small></span></label>
              <label class="payment-option ${state.payment === "bank" ? "active" : ""}"><input type="radio" name="payment" value="bank" ${state.payment === "bank" ? "checked" : ""} /> <span><strong>Chuyển khoản ngân hàng (VietQR)</strong><br /><small>Quét mã QR bằng ứng dụng ngân hàng để thanh toán.</small></span></label>
            </div>
            <div class="form-message"></div>
          </div>
        </form>
        <aside class="order-summary">
          <h2>Đơn hàng của bạn</h2>
          ${items.length ? items.map(({ product, qty }) => `<div class="summary-item"><img src="${productImage(product)}" onerror="handleImgError(this, '${product.id}')" alt="${product.name}" /><div><strong>${product.name}</strong><br />x${qty}</div><span>${formatPrice(product.price * qty)}</span></div>`).join("") : `<p>Giỏ hàng đang trống.</p>`}
          <div class="summary-row"><span>Tạm tính</span><span>${formatPrice(subtotal)}</span></div>
          <div class="summary-row"><span>Giao hàng</span><span>Liên hệ báo phí</span></div>
          <div class="summary-row summary-total"><span>Tổng cộng</span><strong>${formatPrice(subtotal)}</strong></div>
          <button class="primary full" data-action="place-order">✓ Đặt hàng</button>
          <p class="terms">Bằng cách đặt hàng, bạn đồng ý với điều khoản của chúng tôi.</p>
        </aside>
      </div>
    </section>
  `;
}

// ==========================================
// TRANG ĐẶT HÀNG THÀNH CÔNG (#checkout-complete)
// ==========================================
function renderCheckoutComplete() {
  return `
    <section class="wide-section">
      <div class="success-box">
        <div class="success-icon">✓</div>
        <span class="eyebrow">Cảm ơn bạn đã đặt bánh</span>
        <h1 style="font-family: var(--serif); font-size: 46px; font-weight: 500; margin: 14px 0">Đặt Hàng Thành Công!</h1>
        <p style="color: var(--muted); line-height: 1.7">
          Đơn hàng ${state.lastOrderCode ? `<strong>${state.lastOrderCode}</strong>` : "của bạn"} đã được lưu vào hệ thống. Bếp bánh LEOF Cakes sẽ liên hệ xác nhận trong ít phút.
        </p>
        <div style="display: flex; flex-wrap: wrap; gap: 14px; justify-content: center; margin-top: 32px">
          <a class="primary" href="#account">Theo dõi tiến độ đơn hàng</a>
          <a class="outline-button" href="#shop">Tiếp tục mua sắm</a>
        </div>
      </div>
    </section>
    ${footer()}
  `;
}

function footer() {
  return `
    <footer class="wide-section" style="background: var(--rose); padding-top: 70px; padding-bottom: 34px">
        <div class="footer-grid">
        <div>
          <a class="brand" href="#home"><span>LEOF</span><small>CAKES</small></a>
          <p style="color: var(--muted); line-height: 1.8">Mỗi chiếc bánh là một tác phẩm nghệ thuật được tạo nên bởi tình yêu và sự tỉ mỉ - phong cách tiệm bánh Âu chính hiệu giữa lòng Việt Nam.</p>
          <div style="display: flex; gap: 14px; margin-top: 26px"><span class="round-icon">f</span><span class="round-icon">◎</span><span class="round-icon">▶</span></div>
        </div>
        <div><h3>Điều hướng</h3><p><a href="#home">Trang chủ</a></p><p><a href="#shop">Các loại bánh</a></p><p><a href="#about">Giới thiệu</a></p><p><a href="#news">Tin tức & Khuyến mãi</a></p><p><a href="#account">Theo dõi đơn hàng</a></p><p><a href="#wishlist">Danh sách yêu thích</a></p><p><a href="#contact">Liên hệ</a></p></div>
        <div><h3>Liên hệ</h3><p>📍 466C1 Nguyễn Huệ, Phú Khương, Vĩnh Long</p><p>📞 0901 234 567</p><p>✉ hello@leofcakes.vn</p><h3>Giờ mở cửa:</h3><p>Thứ 2 - Thứ 6: 8:00 - 20:00</p><p>Thứ 7 - Chủ nhật: 8:00 - 22:00</p></div>
        <div class="map-placeholder" style="margin-top: 0">${STORE_MAP_IFRAME}</div>
      </div>
      <div style="border-top: 1px solid var(--line); margin-top: 48px; padding-top: 24px; display: flex; justify-content: space-between; color: var(--muted); font-size: 13px"><span>© 2026 LEOF Cakes. Tất cả quyền được bảo lưu.</span><span>Chính sách bảo mật · Điều khoản sử dụng · Chính sách đổi trả</span></div>
    </footer>
  `;
}

function cartItems() {
  return [...state.cart.entries()].map(([id, qty]) => ({ product: products.find((p) => p.id === id), qty })).filter((item) => item.product);
}

function cartCount() {
  return cartItems().reduce((sum, item) => sum + item.qty, 0);
}

function updateCartUI() {
  const count = cartCount();
  const badge = document.querySelector("#cartBadge");
  badge.textContent = count;
  badge.classList.toggle("show", count > 0);
  document.querySelector("#drawerCount").textContent = count;
  const items = cartItems();
  const drawerItems = document.querySelector("#drawerItems");
  if (!items.length) {
    drawerItems.innerHTML = `<div class="drawer-empty"><div><p>Giỏ hàng của bạn đang trống.</p><button class="primary" data-action="close-cart">Khám phá sản phẩm</button></div></div>`;
  } else {
    drawerItems.innerHTML = items.map(({ product, qty }) => `
      <div class="cart-line">
        <img src="${productImage(product)}" onerror="handleImgError(this, '${product.id}')" alt="${product.name}" />
        <div>
          <strong>${product.name}</strong><br />
          <span class="price">${formatPrice(product.price)}</span>
          <div class="qty">
            <button data-action="cart-minus" data-id="${product.id}">−</button>
            <span style="display:grid;place-items:center">${qty}</span>
            <button data-action="cart-plus" data-id="${product.id}">+</button>
          </div>
        </div>
        <button class="remove" data-action="cart-remove" data-id="${product.id}">×</button>
      </div>
    `).join("");
  }
  document.querySelector("#drawerSubtotal").textContent = formatPrice(items.reduce((sum, item) => sum + item.product.price * item.qty, 0));
}

function render404() {
  return `
    <section class="not-found">
      <div>
        <h1>404</h1>
        <p>Page Not Found</p>
        <div class="warning-box"><strong>Admin Note</strong><br />Trang bạn tìm kiếm không tồn tại.</div>
        <a class="outline-button" href="#home">Về trang chủ</a>
      </div>
    </section>
  `;
}

function render() {
  if (state.route.startsWith("product/")) app.innerHTML = renderProductDetail(state.route.split("/")[1]);
  else if (state.route.startsWith("article/")) app.innerHTML = renderArticle(state.route.split("/")[1]);
  else if (state.route === "home") app.innerHTML = renderHome();
  else if (state.route === "shop") app.innerHTML = renderShop();
  else if (state.route === "wishlist") app.innerHTML = renderWishlist();
  else if (state.route === "about") app.innerHTML = renderAbout();
  else if (state.route === "contact") app.innerHTML = renderContact();
  else if (state.route === "news") app.innerHTML = renderNews();
  else if (state.route === "auth") app.innerHTML = renderAuth();
  else if (state.route === "account") app.innerHTML = renderAccount();
  else if (state.route === "admin") app.innerHTML = renderAdmin();
  else if (state.route === "checkout") app.innerHTML = renderCheckout();
  else if (state.route === "checkout-complete") app.innerHTML = renderCheckoutComplete();
  else app.innerHTML = render404();
  updateCartUI();
  updateUserUI();
}

function renderAndRestore(action, cursor) {
  render();
  const field = document.querySelector(`[data-action="${action}"]`);
  if (field) {
    field.focus();
    const position = Math.min(cursor, field.value.length);
    field.setSelectionRange(position, position);
  }
}

function openCart() {
  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
}

function closeCart() {
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
}

function validateForm(form) {
  let ok = true;
  const message = form.querySelector(".form-message");
  form.querySelectorAll(".invalid").forEach((el) => el.classList.remove("invalid"));
  form.querySelectorAll("[name]").forEach((field) => {
    const required = field.closest("label")?.textContent.includes("*");
    if (required && !field.value.trim()) {
      field.classList.add("invalid");
      ok = false;
    }
    if (field.name === "email" && field.value && !field.value.includes("@")) {
      field.classList.add("invalid");
      ok = false;
    }
  });
  if (message) message.innerHTML = ok ? "" : `<span class="error">Vui lòng kiểm tra các trường bắt buộc.</span>`;
  return ok;
}

document.body.addEventListener("click", async (event) => {
  const target = event.target.closest("[data-action]");
  if (!target) return;
  const action = target.dataset.action;
  const id = target.dataset.id;

  if (action === "go-shop") location.hash = "shop";
  if (action === "go-account") {
    if (!state.currentUser) location.hash = "auth";
    else location.hash = state.currentUser.role === "admin" ? "admin" : "account";
  }
  if (action === "admin-tab") {
    state.adminTab = target.dataset.tab;
    render();
  }
  if (action === "open-cart") openCart();
  if (action === "close-cart") closeCart();
  if (action === "slide") { state.slide = Number(target.dataset.slide); render(); }
  if (action === "prev-slide") { state.slide = (state.slide - 1 + 3) % 3; render(); }
  if (action === "next-slide") { state.slide = (state.slide + 1) % 3; render(); }
  if (action === "toggle-wish") { state.wishlist.has(id) ? state.wishlist.delete(id) : state.wishlist.add(id); render(); }
  if (action === "add-cart") { state.cart.set(id, (state.cart.get(id) || 0) + 1); updateCartUI(); }
  if (action === "cart-plus") { state.cart.set(id, (state.cart.get(id) || 0) + 1); updateCartUI(); }
  if (action === "cart-minus") {
    const next = (state.cart.get(id) || 0) - 1;
    next > 0 ? state.cart.set(id, next) : state.cart.delete(id);
    updateCartUI();
  }
  if (action === "cart-remove") { state.cart.delete(id); updateCartUI(); }
  if (action === "detail-minus") { state.detailQty = Math.max(1, state.detailQty - 1); render(); }
  if (action === "detail-plus") { state.detailQty += 1; render(); }
  if (action === "detail-add-cart") {
    state.cart.set(id, (state.cart.get(id) || 0) + state.detailQty);
    updateCartUI();
  }
  if (action === "detail-buy-now") {
    state.cart.set(id, (state.cart.get(id) || 0) + state.detailQty);
    closeCart();
    location.hash = "checkout";
  }
  if (action === "checkout") { closeCart(); location.hash = "checkout"; }
  if (action === "view-cart") { closeCart(); location.hash = "shop"; }
  if (action === "category") { state.category = target.dataset.value; render(); }
  if (action === "quick") { state.quick = target.dataset.value; render(); }
  if (action === "clear-filters") { state.category = "Tất cả"; state.quick = "Tất cả"; state.search = ""; state.min = ""; state.max = ""; state.sort = "default"; location.hash = "shop"; render(); }
  if (action === "news-tab") {
    state.newsCategory = target.dataset.value;
    state.newsLoading = true;
    render();
    setTimeout(() => { state.newsLoading = false; render(); }, 520);
  }
  if (action === "article") location.hash = `article/${id}`;

  if (action === "auth-tab") {
    state.authMode = target.dataset.mode;
    render();
  }

  if (action === "account-tab") {
    state.accountTab = target.dataset.tab;
    render();
  }

  if (action === "logout") {
    state.currentUser = null;
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    location.hash = "home";
  }

  if (action === "reorder") {
    const code = target.dataset.code;
    const order = state.orders.find((o) => o.orderCode === code);
    if (order) {
      let addedCount = 0;
      order.items.forEach((item) => {
        const exists = products.some((p) => p.id === item.id);
        if (exists) {
          state.cart.set(item.id, (state.cart.get(item.id) || 0) + item.qty);
          addedCount += item.qty;
        }
      });
      if (addedCount > 0) {
        updateCartUI();
        openCart();
      }
    }
  }

  if (action === "cancel-order") {
    const code = target.dataset.code;
    const order = state.orders.find((o) => o.orderCode === code);
    if (order && order.status === "pending") {
      order.status = "cancel_requested";
      await db.from("orders").update({ status: "cancel_requested" }).eq("order_code", code);
      render();
    }
  }

  if (action === "approve-cancel") {
    const code = target.dataset.code;
    const order = state.orders.find((o) => o.orderCode === code);
    if (order && order.status === "cancel_requested") {
      order.status = "cancelled";
      await db.from("orders").update({ status: "cancelled" }).eq("order_code", code);
      render();
    }
  }

  if (action === "reject-cancel") {
    const code = target.dataset.code;
    const order = state.orders.find((o) => o.orderCode === code);
    if (order && order.status === "cancel_requested") {
      order.status = "pending";
      await db.from("orders").update({ status: "pending" }).eq("order_code", code);
      render();
    }
  }

  if (action === "place-order") {
    const latestUser = state.users.find((u) => u.id === state.currentUser?.id);
    if (latestUser?.locked) {
      alert("Tài khoản của bạn đã bị khóa, không thể đặt hàng.");
      state.currentUser = null;
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
      location.hash = "auth";
      return;
    }

    const form = document.querySelector('[data-form="checkout"]');
    if (form && validateForm(form) && cartCount() && state.currentUser) {
      const items = cartItems().map(({ product, qty }) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        qty,
      }));
      const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
      const now = new Date();
      const orderCode = `LEOF-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${String(state.orders.length + 1).padStart(3, "0")}`;

      const newOrder = {
        orderCode,
        userId: state.currentUser.id,
        customer: {
          name: form.name.value.trim(),
          phone: form.phone.value.trim(),
          email: form.email.value.trim(),
          address: form.address.value.trim(),
          note: form.note.value.trim(),
        },
        items,
        total,
        payment: state.payment,
        customerReportedPaid: false,
        isPaid: false,
        status: "pending",
        createdAt: now.toLocaleString("vi-VN"),
        createdTimestamp: now.getTime(),
      };

      if (state.payment === "bank") {
        state.pendingBankOrder = newOrder;
        render();
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        target.disabled = true;
        await finalizeOrder(newOrder);
      }
    }
  }

  if (action === "confirm-bank-paid" && state.pendingBankOrder) {
    target.disabled = true;
    state.pendingBankOrder.customerReportedPaid = true;
    await finalizeOrder(state.pendingBankOrder);
  }

  if (action === "cancel-bank-qr") {
    state.pendingBankOrder = null;
    render();
  }

  if (action === "copy-text") {
    navigator.clipboard?.writeText(target.dataset.text);
    const oldText = target.textContent;
    target.textContent = "Đã chép";
    setTimeout(() => { target.textContent = oldText; }, 1500);
  }

  if (action === "set-default-address" && state.currentUser) {
    const addresses = getUserAddresses(state.currentUser);
    addresses.forEach((a) => { a.isDefault = a.id === id; });
    await syncUserAddresses(state.currentUser);
    render();
  }

  if (action === "delete-address" && state.currentUser) {
    const addresses = getUserAddresses(state.currentUser);
    state.currentUser.addresses = addresses.filter((a) => a.id !== id);
    await syncUserAddresses(state.currentUser);
    render();
  }

  if (action === "toggle-lock-user") {
    const targetUser = state.users.find((u) => u.id === id && u.role !== "admin");
    if (targetUser) {
      targetUser.locked = !targetUser.locked;
      await db.from("users").update({ locked: targetUser.locked }).eq("id", id);
      render();
    }
  }

  if (action === "confirm-payment-received") {
    const code = target.dataset.code;
    const order = state.orders.find((o) => o.orderCode === code);
    if (order && order.payment === "bank") {
      order.isPaid = true;
      if (order.status === "pending") {
        order.status = "baking";
      }
      await db.from("orders").update({ is_paid: true, status: order.status }).eq("order_code", code);
      render();
    }
  }

  if (action === "reject-payment-received") {
    const code = target.dataset.code;
    const order = state.orders.find((o) => o.orderCode === code);
    if (order && order.payment === "bank") {
      order.customerReportedPaid = false;
      order.isPaid = false;
      await db.from("orders").update({ customer_reported_paid: false, is_paid: false }).eq("order_code", code);
      render();
    }
  }
});

document.body.addEventListener("input", (event) => {
  const target = event.target;
  const action = target.dataset.action;
  const cursor = target.selectionStart || target.value.length;
  if (action === "search") { state.search = target.value; renderAndRestore(action, cursor); }
  if (action === "min-price") { state.min = target.value.replace(/\D/g, ""); renderAndRestore(action, cursor); }
  if (action === "max-price") { state.max = target.value.replace(/\D/g, ""); renderAndRestore(action, cursor); }
  if (action === "admin-customer-search") {
    state.adminCustomerSearch = target.value;
    renderAndRestore(action, cursor);
  }
});

document.body.addEventListener("change", async (event) => {
  const target = event.target;
  if (target.dataset.action === "sort") { state.sort = target.value; render(); }
  if (target.name === "payment") { state.payment = target.value; render(); }

  if (target.dataset.action === "admin-status") {
    const order = state.orders.find((o) => o.orderCode === target.dataset.code);
    if (order) {
      order.status = target.value;
      if (order.payment === "bank" && ["baking", "shipping", "completed"].includes(target.value)) {
        order.isPaid = true;
      }
      await db.from("orders").update({ status: order.status, is_paid: order.isPaid }).eq("order_code", target.dataset.code);
      render();
    }
  }

  if (target.dataset.action === "select-checkout-address" && state.currentUser) {
    const addr = getUserAddresses(state.currentUser).find((a) => a.id === target.value);
    const form = document.querySelector('[data-form="checkout"]');
    if (addr && form) {
      form.name.value = addr.recipientName;
      form.phone.value = addr.phone;
      form.address.value = addr.detail;
    }
  }
});

document.body.addEventListener("submit", async (event) => {
  const form = event.target.closest("form");
  if (!form) return;
  event.preventDefault();
  if (!validateForm(form)) return;

  const formType = form.dataset.form;
  const message = form.querySelector(".form-message");

  // Xử lý Đăng ký
  if (formType === "register") {
    const email = form.email.value.trim().toLowerCase();
    const password = form.password.value;
    if (password.length < 6) {
      message.innerHTML = `<span class="error">Mật khẩu phải có ít nhất 6 ký tự.</span>`;
      return;
    }
    if (state.users.some((u) => u.email === email)) {
      message.innerHTML = `<span class="error">Email này đã được đăng ký.</span>`;
      return;
    }
    const newUser = {
      id: "user_" + Date.now(),
      name: form.name.value.trim(),
      email,
      phone: form.phone.value.trim(),
      address: form.address.value.trim(),
      addresses: [{
        id: "addr_init",
        label: "Mặc định",
        recipientName: form.name.value.trim(),
        phone: form.phone.value.trim(),
        detail: form.address.value.trim(),
        isDefault: true,
      }],
      password,
      role: "customer",
      locked: false,
    };

    const { error } = await db.from("users").insert([newUser]);
    if (error) {
      message.innerHTML = `<span class="error">Lỗi lưu tài khoản: ${error.message}</span>`;
      return;
    }

    state.users.push(newUser);
    state.currentUser = newUser;
    saveJSON(STORAGE_KEYS.CURRENT_USER, newUser);
    state.authNotice = "";
    const next = state.redirectAfterLogin || "account";
    state.redirectAfterLogin = null;
    location.hash = next;
  }

  // Xử lý Đăng nhập
  if (formType === "login") {
    const email = form.email.value.trim().toLowerCase();
    const password = form.password.value;
    await syncFromDatabase();
    const found = state.users.find((u) => u.email === email && u.password === password);
    if (!found) {
      message.innerHTML = `<span class="error">Email hoặc mật khẩu không chính xác.</span>`;
      return;
    }
    if (found.locked) {
      message.innerHTML = `<span class="error">Tài khoản của bạn đã bị khóa. Vui lòng liên hệ LEOF Cakes.</span>`;
      return;
    }
    state.currentUser = found;
    saveJSON(STORAGE_KEYS.CURRENT_USER, found);
    state.authNotice = "";
    const defaultDest = found.role === "admin" ? "admin" : "account";
    const next = found.role === "admin" ? "admin" : (state.redirectAfterLogin || defaultDest);
    state.redirectAfterLogin = null;
    location.hash = next;
  }

  // Cập nhật Hồ sơ cá nhân
  if (formType === "profile" && state.currentUser) {
    state.currentUser.name = form.name.value.trim();
    state.currentUser.phone = form.phone.value.trim();
    state.currentUser.address = form.address.value.trim();
    const idx = state.users.findIndex((u) => u.id === state.currentUser.id);
    if (idx !== -1) state.users[idx] = state.currentUser;
    saveJSON(STORAGE_KEYS.CURRENT_USER, state.currentUser);

    await db.from("users").update({
      name: state.currentUser.name,
      phone: state.currentUser.phone,
      address: state.currentUser.address,
    }).eq("id", state.currentUser.id);

    updateUserUI();
    message.innerHTML = `<span style="color: #49784f">Đã cập nhật thông tin tài khoản lên hệ thống.</span>`;
  }

  // Đổi mật khẩu
  if (formType === "change-password" && state.currentUser) {
    const oldPassword = form.oldPassword.value;
    const newPassword = form.newPassword.value;
    const confirmPassword = form.confirmPassword.value;

    if (oldPassword !== state.currentUser.password) {
      form.oldPassword.classList.add("invalid");
      message.innerHTML = `<span class="error">Mật khẩu hiện tại không chính xác.</span>`;
      return;
    }
    if (newPassword.length < 6) {
      form.newPassword.classList.add("invalid");
      message.innerHTML = `<span class="error">Mật khẩu mới phải có ít nhất 6 ký tự.</span>`;
      return;
    }
    if (newPassword === oldPassword) {
      form.newPassword.classList.add("invalid");
      message.innerHTML = `<span class="error">Mật khẩu mới không được trùng với mật khẩu cũ.</span>`;
      return;
    }
    if (newPassword !== confirmPassword) {
      form.confirmPassword.classList.add("invalid");
      message.innerHTML = `<span class="error">Xác nhận mật khẩu mới không khớp.</span>`;
      return;
    }

    state.currentUser.password = newPassword;
    const idx = state.users.findIndex((u) => u.id === state.currentUser.id);
    if (idx !== -1) state.users[idx] = state.currentUser;
    saveJSON(STORAGE_KEYS.CURRENT_USER, state.currentUser);

    await db.from("users").update({ password: newPassword }).eq("id", state.currentUser.id);

    form.reset();
    message.innerHTML = `<span style="color: #49784f">Đổi mật khẩu thành công!</span>`;
  }

  if (formType === "contact") {
    message.innerHTML = `<span style="color: #49784f">Cảm ơn bạn! Tin nhắn đã được gửi đến LEOF Cakes.</span>`;
    form.reset();
  }

  if (formType === "add-address" && state.currentUser) {
    const addresses = getUserAddresses(state.currentUser);
    const makeDefault = form.isDefault.checked || addresses.length === 0;
    if (makeDefault) {
      addresses.forEach((a) => { a.isDefault = false; });
    }
    addresses.push({
      id: "addr_" + Date.now(),
      label: form.label.value.trim(),
      recipientName: form.recipientName.value.trim(),
      phone: form.phone.value.trim(),
      detail: form.detail.value.trim(),
      isDefault: makeDefault,
    });
    await syncUserAddresses(state.currentUser);
    render();
  }
});

drawer.addEventListener("click", (event) => {
  if (event.target === drawer) closeCart();
});

window.addEventListener("hashchange", () => {
  syncFromDatabase();
  setRoute(location.hash.replace("#", "") || "home");
});

setRoute(location.hash.replace("#", "") || "home");
syncFromDatabase();

setInterval(() => {
  if (state.route === "home") {
    state.slide = (state.slide + 1) % 3;
    const titles = ["Nghệ Thuật Từ Bếp Bánh", "Đặt Bánh Sinh Nhật", "Tinh Tế Cho Mỗi Dịp"];
    document.querySelectorAll(".hero-slide").forEach((el, i) => {
      el.classList.toggle("active", i === state.slide);
    });
    document.querySelectorAll(".hero-dots button").forEach((el, i) => {
      el.classList.toggle("active", i === state.slide);
    });
    const heroHeading = document.querySelector(".hero-content h1");
    if (heroHeading) heroHeading.textContent = titles[state.slide];
  }
}, 4800);

// const ASSET_DIR = "./public/assets";
// const IMAGE = `${ASSET_DIR}/placeholder.jpg`;
// const STORE_MAP_IFRAME = `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d245.3805665712036!2d106.38151477828065!3d10.254400445006182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310aa8ef8102cfd5%3A0xd1713e6814055539!2zNzkzSitRSFgsIE5ndXnhu4VuIEh14buHLCBQaMO6IEtoxrDGoW5nLCBWxKluaCBMb25nLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1782476423737!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>`;

// const BANK_CONFIG = {
//   bankId: "BIDV",
//   bankName: "BIDV",
//   accountNo: "7211224826",
//   accountName: "HUYNH MINH THUC",
// };

// function productImage(product) {
//   return product?.image || `${ASSET_DIR}/${product.id}.jpg`;
// }

// // Tự động thử lần lượt: .jpg -> .jpeg -> .png -> placeholder.jpg
// function handleImgError(img, id) {
//   const step = img.dataset.step || "jpg";
//   if (step === "jpg") {
//     img.dataset.step = "jpeg";
//     img.src = `${ASSET_DIR}/${id}.jpeg`;
//   } else if (step === "jpeg") {
//     img.dataset.step = "png";
//     img.src = `${ASSET_DIR}/${id}.png`;
//   } else {
//     img.onerror = null;
//     img.src = IMAGE;
//   }
// }

// const products = [
//   { id: "croissantbophap", name: "Croissant Bơ Pháp", category: "Bánh mì & Viennoiserie", weight: "80g", price: 55000, rating: 5, reviews: 211, tags: ["Nổi bật"], quick: ["Bán chạy nhất"] },
//   { id: "MacaronHongCanhSen", name: "Bánh Macaron Hồng Cánh Sen", category: "Bánh nhỏ & Pastry", weight: "30g/cái", price: 85000, rating: 5, reviews: 124, tags: ["Nổi bật", "Mới"], quick: ["Mới nhất"] },
//   { id: "opera", name: "Opera Cake Cổ Điển", category: "Bánh nguyên cái", weight: "500g (6-8 phần)", price: 320000, rating: 5, reviews: 89, tags: ["Nổi bật"], quick: ["Bán chạy nhất"] },
//   { id: "TartChanhLeoTuoi", name: "Tart Chanh Leo Tươi", category: "Tart & Quiche", weight: "150g", price: 145000, rating: 5, reviews: 67, tags: ["Nổi bật"], quick: ["Mới nhất"] },
//   { id: "Mousse", name: "Bánh mousse", category: "Bánh nguyên cái", weight: "700g", price: 275000, rating: 5, reviews: 56, tags: ["Theo mùa", "Mới"], quick: ["Đang giảm"] },
//   { id: "TiramisuMongNgotNhe", name: "Tiramisu Mọng Ngọt Nhẹ", category: "Bánh nhỏ & Pastry", weight: "120g", price: 99000, rating: 5, reviews: 77, tags: ["Theo mùa"], quick: ["Đang giảm"] },
//   { id: "BanhMiBoToi", name: "Bánh Mì Bơ Tỏi", category: "Bánh mì & Viennoiserie", weight: "180g", price: 69000, rating: 4, reviews: 43, tags: ["Mới"], quick: ["Mới nhất"] },
//   { id: "QuicheNamPhoMai", name: "Quiche Nấm Phô Mai", category: "Tart & Quiche", weight: "180g", price: 125000, rating: 5, reviews: 34, tags: ["Theo mùa"], quick: ["Bán chạy nhất"] },
// ];

// const articles = [
//   { id: "autumn", category: "Theo mùa", title: "Bộ sưu tập bánh Thu 2026 đã ra mắt", excerpt: "Khám phá hương vị mùa thu với những chiếc bánh hạt dẻ, việt quất và caramel muối tinh tế từ bộ sưu tập mới nhất.", body: "Bộ sưu tập Thu 2026 tập trung vào lớp kem nhẹ, phần đế giòn và vị ngọt thanh. Mỗi chiếc bánh được hoàn thiện thủ công để giữ cảm giác sang trọng nhưng gần gũi.", image: IMAGE },
//   { id: "birthday", category: "Khuyến mãi", title: "Ưu đãi sinh nhật LEOF Cakes tháng 7", excerpt: "Giảm 20% tất cả đơn hàng bánh sinh nhật trong suốt tháng 7/2026.", body: "Khách hàng đặt bánh sinh nhật trong tháng 7 sẽ được tư vấn mẫu miễn phí và ưu đãi cho đơn hàng đặt trước 48 giờ.", image: IMAGE },
//   { id: "workshop", category: "Sự kiện", title: "Workshop Làm Bánh Pháp tháng 8", excerpt: "Tham gia cùng chúng tôi trong buổi workshop độc quyền với Master Baker từ Paris, Pháp.", body: "Workshop gồm phần giới thiệu nguyên liệu, kỹ thuật đánh kem, tạo hình và trang trí món bánh cá nhân.", image: IMAGE },
//   { id: "voucher", category: "Voucher", title: "Voucher cuối tuần cho đơn hàng online", excerpt: "Nhận voucher giao hàng cho các đơn bánh đặt vào thứ bảy và chủ nhật.", body: "Voucher được áp dụng tự động trong giỏ hàng cho các đơn đạt giá trị tối thiểu theo chương trình.", image: IMAGE },
//   { id: "preserve", category: "Bảo quản bánh", title: "Cách giữ bánh tươi ngon sau khi nhận", excerpt: "Một vài lưu ý nhỏ giúp bánh giữ đúng kết cấu và hương vị trong ngày đặc biệt.", body: "Hãy bảo quản bánh trong ngăn mát, lấy ra trước khi dùng 10-15 phút và tránh ánh nắng trực tiếp.", image: IMAGE },
// ];

// const categories = ["Tất cả", "Bánh nhỏ & Pastry", "Bánh nguyên cái", "Tart & Quiche", "Bánh mì & Viennoiserie"];
// const quickFilters = ["Tất cả", "Bán chạy nhất", "Mới nhất", "Đang giảm"];

// // Đọc dữ liệu lưu trữ từ localStorage
// const STORAGE_KEYS = {
//   USERS: "leof_users",
//   CURRENT_USER: "leof_current_user",
//   ORDERS: "leof_orders",
// };

// const DEFAULT_ADMIN = {
//   id: "admin_01",
//   name: "Quản Lý LEOF Cakes",
//   email: "admin@leofcakes.vn",
//   phone: "0901234567",
//   address: "466C1 Nguyễn Huệ, Phú Khương, Vĩnh Long",
//   password: "admin123",
//   role: "admin",
// };

// function initUsers() {
//   const users = loadJSON(STORAGE_KEYS.USERS, []);
//   if (!users.some((u) => u.email === DEFAULT_ADMIN.email)) {
//     users.unshift(DEFAULT_ADMIN);
//     saveJSON(STORAGE_KEYS.USERS, users);
//   }
//   return users;
// }

// function loadJSON(key, fallback) {
//   try {
//     const raw = localStorage.getItem(key);
//     return raw ? JSON.parse(raw) : fallback;
//   } catch {
//     return fallback;
//   }
// }

// function saveJSON(key, value) {
//   localStorage.setItem(key, JSON.stringify(value));
// }

// const state = {
//   route: "home",
//   slide: 0,
//   category: "Tất cả",
//   quick: "Tất cả",
//   search: "",
//   min: "",
//   max: "",
//   sort: "default",
//   wishlist: new Set(),
//   cart: new Map(),
//   newsCategory: "Tất cả",
//   newsLoading: false,
//   payment: "cod",
//   detailQty: 1,
//   users: initUsers(),
//   currentUser: loadJSON(STORAGE_KEYS.CURRENT_USER, null),
//   orders: loadJSON(STORAGE_KEYS.ORDERS, []),
//   authMode: "login", // "login" | "register"
//   authNotice: "",
//   redirectAfterLogin: null,
//   accountTab: "orders", // "orders" | "profile"
//   adminTab: "orders", // "orders" | "products"
//   adminCustomerSearch: "",
//   lastOrderCode: "",
//   pendingBankOrder: null,
// };

// const app = document.querySelector("#app");
// const drawer = document.querySelector("#cartDrawer");

// function formatPrice(value) {
//   return new Intl.NumberFormat("vi-VN").format(value) + " đ";
// }

// function updateUserUI() {
//   const dot = document.querySelector("#userDot");
//   const trigger = document.querySelector("#userTrigger");
//   if (dot) dot.classList.toggle("show", Boolean(state.currentUser));
//   if (trigger) {
//     trigger.title = state.currentUser ? `Tài khoản: ${state.currentUser.name}` : "Đăng nhập / Đăng ký";
//   }
// }

// function setRoute(route) {
//   let targetRoute = route || "home";

//   if (targetRoute !== "checkout" && state.pendingBankOrder) {
//     state.pendingBankOrder = null;
//   }

//   if ((targetRoute === "checkout" || targetRoute === "account" || targetRoute === "admin") && !state.currentUser) {
//     state.redirectAfterLogin = targetRoute;
//     state.authNotice = targetRoute === "checkout"
//       ? "Vui lòng đăng nhập hoặc đăng ký tài khoản trước khi tiến hành thanh toán."
//       : "Vui lòng đăng nhập để tiếp tục.";
//     targetRoute = "auth";
//     history.replaceState(null, "", "#auth");
//   }

//   if (targetRoute === "admin" && state.currentUser?.role !== "admin") {
//     targetRoute = "account";
//     history.replaceState(null, "", "#account");
//   }

//   state.route = targetRoute;
//   const activeRoute = state.route.startsWith("product/") ? "shop" : state.route;
//   document.querySelectorAll(".main-nav a").forEach((link) => link.classList.toggle("active", link.dataset.route === activeRoute));
//   render();
//   window.scrollTo({ top: 0, behavior: "smooth" });
// }

// function productLabels(product) {
//   return product.tags.map((tag) => `<span class="label ${tag === "Mới" ? "new" : tag === "Theo mùa" ? "season" : ""}">${tag}</span>`).join("");
// }

// function productCard(product) {
//   const loved = state.wishlist.has(product.id);
//   const stars = "★".repeat(product.rating) + "☆".repeat(5 - product.rating);
//   return `
//     <article class="product-card">
//       <a class="product-image product-link" href="#product/${product.id}" aria-label="Xem chi tiết ${product.name}">
//         <img src="${productImage(product)}" onerror="handleImgError(this, '${product.id}')" alt="${product.name}" />
//         <div class="labels">${productLabels(product)}</div>
//       </a>
//       <div class="product-body">
//         <h3><a class="product-title-link" href="#product/${product.id}">${product.name}</a></h3>
//         <div class="weight">${product.weight}</div>
//         <div class="rating-row">
//           <span class="stars">${stars} <span class="muted">(${product.reviews})</span></span>
//           <button class="heart ${loved ? "active" : ""}" data-action="toggle-wish" data-id="${product.id}" aria-label="Yêu thích ${product.name}">
//             <svg viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"></path></svg>
//           </button>
//         </div>
//         <div class="price-row">
//           <strong class="price">${formatPrice(product.price)}</strong>
//           <button class="bag-button" data-action="add-cart" data-id="${product.id}" aria-label="Thêm ${product.name} vào giỏ">
//             <svg viewBox="0 0 24 24"><path d="M6 8h12l-1 12H7L6 8Z"></path><path d="M9 8a3 3 0 0 1 6 0"></path></svg>
//           </button>
//         </div>
//       </div>
//     </article>
//   `;
// }

// function renderProductDetail(id) {
//   const product = products.find((item) => item.id === id) || products[0];
//   const loved = state.wishlist.has(product.id);
//   const related = products.filter((item) => item.id !== product.id && item.category === product.category).concat(products.filter((item) => item.id !== product.id)).slice(0, 3);
//   const sold = product.reviews * 4 + 24;
//   return `
//     <section class="product-detail">
//       <nav class="breadcrumbs" aria-label="Đường dẫn">
//         <a href="#home">Trang chủ</a><span>›</span><a href="#shop">Sản phẩm</a><span>›</span><span>${product.name}</span>
//       </nav>
//       <div class="detail-layout">
//         <div class="detail-media">
//           <img src="${productImage(product)}" onerror="handleImgError(this, '${product.id}')" alt="${product.name}" />
//         </div>
//         <div class="detail-info">
//           <div class="detail-tags">${product.tags.map((tag) => `<span class="detail-tag">${tag === "Nổi bật" ? "✦ " : "✨ "}${tag}</span>`).join("")}</div>
//           <h1>${product.name}</h1>
//           <p class="detail-weight">${product.weight}</p>
//           <div class="detail-rating"><span class="stars">★★★★★</span><strong>4.8</strong><span>(${product.reviews} đánh giá)</span><span>·</span><span>${sold} đã bán</span></div>
//           <div class="detail-price">${formatPrice(product.price)}</div>
//           <div class="flavor-box">
//             <strong>Hương vị nổi bật</strong>
//             <ul>
//               <li>Ngọt thanh, hậu vị nhẹ và cân bằng</li>
//               <li>Kết cấu mềm mịn, lớp bánh thơm bơ</li>
//               <li>Hoàn thiện thủ công mỗi ngày tại LEOF Cakes</li>
//             </ul>
//           </div>
//           <div class="detail-qty-row">
//             <span>Số lượng:</span>
//             <div class="qty detail-qty">
//               <button data-action="detail-minus">−</button>
//               <span>${state.detailQty}</span>
//               <button data-action="detail-plus">+</button>
//             </div>
//           </div>
//           <div class="detail-actions">
//             <button class="primary detail-add" data-action="detail-add-cart" data-id="${product.id}">
//               <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 8h12l-1 12H7L6 8Z"></path><path d="M9 8a3 3 0 0 1 6 0"></path></svg>
//               Thêm vào giỏ
//             </button>
//             <button class="heart detail-heart ${loved ? "active" : ""}" data-action="toggle-wish" data-id="${product.id}" aria-label="Yêu thích ${product.name}">
//               <svg viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"></path></svg>
//             </button>
//           </div>
//           <button class="outline-button full" data-action="detail-buy-now" data-id="${product.id}">Mua ngay</button>
//           <div class="detail-copy">
//             <h2>Mô tả</h2>
//             <p>${product.name} được làm thủ công với nguyên liệu tuyển chọn, giữ vị ngọt thanh và hương thơm đặc trưng cho từng dịp thưởng thức.</p>
//             <h2>Thành phần</h2>
//             <p>Bột mì, bơ Président, trứng, sữa tươi, đường bột và hương liệu tự nhiên theo từng dòng bánh.</p>
//           </div>
//         </div>
//       </div>
//       <section class="reviews-section">
//         <h2>Đánh giá từ khách hàng</h2>
//         <div class="review-summary"><strong>4.8</strong><span class="stars">★★★★★</span><span>3 đánh giá</span></div>
//         <form class="review-form">
//           <h3>Viết đánh giá</h3>
//           <label>Chấm sao <span class="stars big-stars">★★★★★</span></label>
//           <textarea placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."></textarea>
//           <button class="primary" type="button">Gửi đánh giá</button>
//         </form>
//         <div class="review-list">
//           ${[
//             ["Nguyễn Thị Lan", "10/6/2026", "Bánh tuyệt vời! Lớp kem mịn, hương thơm nhẹ, cả nhà đều khen ngợi."],
//             ["Trần Văn Minh", "8/6/2026", "Đúng chuẩn vị Pháp, không quá ngọt và đóng gói rất cẩn thận."],
//             ["Phạm Thu Hà", "5/6/2026", "Rất ngon và đẹp. Giao hàng nhanh. Sẽ tiếp tục ủng hộ LEOF Cakes!"],
//           ].map(([name, date, text]) => `<article class="review-item"><div><strong>${name}</strong><span class="stars">★★★★★</span></div><time>${date}</time><p>${text}</p></article>`).join("")}
//         </div>
//       </section>
//       <section class="related-products">
//         <h2>Sản phẩm liên quan</h2>
//         <div class="products-grid">${related.map(productCard).join("")}</div>
//       </section>
//     </section>
//     ${footer()}
//   `;
// }

// function sectionTitle(eyebrow, title, sub = "") {
//   return `
//     <div class="section-title">
//       <div class="eyebrow">${eyebrow}</div>
//       <h2>${title}</h2>
//       <span class="gold-line"></span>
//       ${sub ? `<p>${sub}</p>` : ""}
//     </div>
//   `;
// }

// function benefitIcon(type) {
//   const icons = {
//     cake: '<path d="M4 11h16v9H4z"></path><path d="M4 15h16"></path><path d="M8 11V8"></path><path d="M12 11V7"></path><path d="M16 11V8"></path><path d="M8 8c0-1 1-1.4 1-2.2S8.3 4.5 8 4"></path><path d="M12 7c0-1 1-1.4 1-2.2S12.3 3.5 12 3"></path><path d="M16 8c0-1 1-1.4 1-2.2S16.3 4.5 16 4"></path>',
//     truck: '<path d="M3 7h11v10H3z"></path><path d="M14 11h4l3 3v3h-7z"></path><circle cx="7" cy="18" r="2"></circle><circle cx="17" cy="18" r="2"></circle>',
//     sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"></path><path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"></path>',
//     gift: '<path d="M4 10h16v11H4z"></path><path d="M4 14h16"></path><path d="M12 10v11"></path><path d="M12 10H8.5A2.5 2.5 0 1 1 12 6.5z"></path><path d="M12 10h3.5A2.5 2.5 0 1 0 12 6.5z"></path>',
//   };
//   return `<span class="benefit-icon"><svg viewBox="0 0 24 24" aria-hidden="true">${icons[type]}</svg></span>`;
// }

// function renderHome() {
//   const featured = products.slice(0, 4);
//   const seasonal = products.filter((p) => p.tags.includes("Theo mùa")).slice(0, 4);
//   return `
//     <section class="hero">
//       ${["Nghệ Thuật Từ Bếp Bánh", "Đặt Bánh Sinh Nhật", "Tinh Tế Cho Mỗi Dịp"].map((title, index) => `
//         <div class="hero-slide ${index === state.slide ? "active" : ""}">
//           <img src="${IMAGE}" alt="${title}" />
//         </div>
//       `).join("")}
//       <div class="hero-content">
//         <span class="hero-kicker">LEOF CAKES</span>
//         <h1>${["Nghệ Thuật Từ Bếp Bánh", "Đặt Bánh Sinh Nhật", "Tinh Tế Cho Mỗi Dịp"][state.slide]}</h1>
//         <p>Mỗi chiếc bánh - một tác phẩm tinh tế được tạo nên bởi tình yêu và kỹ thuật Pháp thuần tuý.</p>
//         <a href="#shop" class="primary">Khám phá ngay →</a>
//       </div>
//       <div class="hero-dots">${[0, 1, 2].map((i) => `<button class="${i === state.slide ? "active" : ""}" data-action="slide" data-slide="${i}" aria-label="Slide ${i + 1}"></button>`).join("")}</div>
//       <button class="hero-arrow prev" data-action="prev-slide" aria-label="Slide trước đó">‹</button>
//       <button class="hero-arrow next" data-action="next-slide" aria-label="Slide kế tiếp">›</button>
//     </section>
//     <section class="benefits">
//       <div>${benefitIcon("cake")}<strong>Bánh tươi mỗi ngày</strong><p>Làm mới trong ngày</p></div>
//       <div>${benefitIcon("truck")}<strong>Giao hàng tận nơi</strong><p>Nhanh trong nội thành</p></div>
//       <div>${benefitIcon("sparkle")}<strong>Nguyên liệu cao cấp</strong><p>Tuyển chọn kỹ lưỡng</p></div>
//       <div>${benefitIcon("gift")}<strong>Thiết kế riêng</strong><p>Cho mọi dịp đặc biệt</p></div>
//     </section>
//     <section class="section">
//       ${sectionTitle("Tuyển chọn tinh tế", "Sản phẩm nổi bật", "Những chiếc bánh được yêu thích nhất, làm nên thương hiệu LEOF Cakes.")}
//       <div class="products-grid">${featured.map(productCard).join("")}</div>
//       <div class="center" style="margin-top: 48px"><a class="outline-button" href="#shop">Xem tất cả sản phẩm →</a></div>
//     </section>
//     <section class="quote-band"><div><p>"Baking is love made edible."</p><small>LEOF Cakes - Est. 2018</small></div></section>
//     <section class="section">
//       ${sectionTitle("Hương vị mùa này", "Sản phẩm theo mùa", "Những sáng tạo mới, được hoàn thiện với nguyên liệu theo mùa.")}
//       <div class="products-grid">${seasonal.map(productCard).join("")}</div>
//     </section>
//     <section class="section story">
//       <div>
//         <span class="eyebrow">Câu chuyện của chúng tôi</span>
//         <h2>Nghệ Thuật Làm Bánh Từ Tâm</h2>
//         <span class="gold-line" style="margin-left: 0"></span>
//         <p>Khởi nguồn từ niềm đam mê với nền ẩm thực Pháp, LEOF Cakes mang những chiếc bánh đạt tiêu chuẩn patisserie Âu đến với người Việt.</p>
//         <p>Từng chiếc bánh là sự kết hợp giữa kỹ thuật truyền thống và sáng tạo đương đại.</p>
//         <a class="outline-button" href="#about">Tìm hiểu thêm →</a>
//       </div>
//       <div class="video-card"><img src="${IMAGE}" alt="Video giới thiệu" /><span class="play">▷</span></div>
//     </section>
//     <section class="section">
//       ${sectionTitle("Tin tức & sự kiện", "Câu chuyện mới nhất")}
//       <div class="news-grid">${articles.slice(0, 3).map(articleCard).join("")}</div>
//     </section>
//     ${footer()}
//   `;
// }

// function filteredProducts() {
//   return products
//     .filter((p) => state.category === "Tất cả" || p.category === state.category)
//     .filter((p) => state.quick === "Tất cả" || p.quick.includes(state.quick) || p.tags.includes(state.quick.replace("Mới nhất", "Mới")))
//     .filter((p) => !state.search || p.name.toLowerCase().includes(state.search.toLowerCase()))
//     .filter((p) => !state.min || p.price >= Number(state.min))
//     .filter((p) => !state.max || p.price <= Number(state.max))
//     .sort((a, b) => {
//       if (state.sort === "price-asc") return a.price - b.price;
//       if (state.sort === "price-desc") return b.price - a.price;
//       if (state.sort === "name") return a.name.localeCompare(b.name, "vi");
//       return 0;
//     });
// }

// function renderShop() {
//   const list = filteredProducts();
//   return `
//     <section class="page-hero">
//       <span class="eyebrow">Thực đơn của chúng tôi</span>
//       <h1>Các Loại Bánh</h1>
//       <span class="gold-line"></span>
//       <p>Khám phá bộ sưu tập bánh ngọt đa dạng được làm thủ công mỗi ngày.</p>
//     </section>
//     <section class="shop-layout">
//       <aside class="shop-sidebar">
//         <input class="search-box" data-action="search" value="${state.search}" placeholder="Tìm kiếm bánh..." />
//         <div class="filter-group">
//           <h3>Danh mục</h3>
//           ${categories.map((cat) => `<button class="filter-button ${state.category === cat ? "active" : ""}" data-action="category" data-value="${cat}">${cat}</button>`).join("")}
//         </div>
//         <div class="filter-group">
//           <h3>Khoảng giá</h3>
//           <div class="price-fields">
//             <input data-action="min-price" value="${state.min}" inputmode="numeric" placeholder="Từ (đ)" />
//             <input data-action="max-price" value="${state.max}" inputmode="numeric" placeholder="Đến (đ)" />
//           </div>
//         </div>
//         <div class="filter-group">
//           <h3>Lọc nhanh</h3>
//           ${quickFilters.map((q) => `<button class="filter-button ${state.quick === q ? "active" : ""}" data-action="quick" data-value="${q}">${q}</button>`).join("")}
//         </div>
//       </aside>
//       <div>
//         <div class="shop-toolbar">
//           <p>Hiển thị ${list.length} sản phẩm</p>
//           <select class="sort-select" data-action="sort">
//             <option value="default" ${state.sort === "default" ? "selected" : ""}>Mặc định</option>
//             <option value="price-asc" ${state.sort === "price-asc" ? "selected" : ""}>Giá tăng dần</option>
//             <option value="price-desc" ${state.sort === "price-desc" ? "selected" : ""}>Giá giảm dần</option>
//             <option value="name" ${state.sort === "name" ? "selected" : ""}>Tên A-Z</option>
//           </select>
//         </div>
//         ${list.length ? `<div class="products-grid">${list.map(productCard).join("")}</div>` : emptyState("Không tìm thấy sản phẩm phù hợp.", "Xóa bộ lọc")}
//       </div>
//     </section>
//     ${footer()}
//   `;
// }

// function emptyState(message, cta) {
//   return `
//     <div class="empty-state">
//       <div>
//         <svg viewBox="0 0 24 24"><path d="M12 21s-7-4.4-9.3-9A5.6 5.6 0 0 1 12 5.5 5.6 5.6 0 0 1 21.3 12C19 16.6 12 21 12 21Z"></path></svg>
//         <p>${message}</p>
//         <button class="primary" data-action="clear-filters">${cta}</button>
//       </div>
//     </div>
//   `;
// }

// function renderWishlist() {
//   const list = products.filter((p) => state.wishlist.has(p.id));
//   return `
//     <section class="page-hero">
//       <span class="eyebrow">Bộ sưu tập riêng</span>
//       <h1>Yêu Thích Của Tôi</h1>
//       <span class="gold-line"></span>
//     </section>
//     <section class="section">
//       ${list.length ? `<div class="products-grid">${list.map(productCard).join("")}</div>` : emptyState("Chưa có sản phẩm yêu thích.", "Khám phá sản phẩm")}
//     </section>
//   `;
// }

// function renderAbout() {
//   return `
//     <section class="about-hero"><div><span class="eyebrow">Về chúng tôi</span><h1>LEOF Cakes</h1></div></section>
//     <section class="section story">
//       <div>
//         <span class="eyebrow">Câu chuyện của chúng tôi</span>
//         <h2>Từ Tình Yêu Đến Nghệ Thuật</h2>
//         <span class="gold-line" style="margin-left: 0"></span>
//         <p>LEOF Cakes được sinh ra từ mong muốn mang phong cách tiệm bánh Âu chính hiệu đến giữa lòng Việt Nam. Chúng tôi chọn nguyên liệu kỹ, làm bánh thủ công và giữ từng chi tiết ở mức tinh tế.</p>
//         <p>Mỗi chiếc bánh là một món quà nhỏ dành cho khoảnh khắc đáng nhớ.</p>
//       </div>
//       <div class="video-card"><img src="${IMAGE}" alt="Không gian cửa hàng" /></div>
//     </section>
//     <section class="section">
//       ${sectionTitle("Không gian cửa hàng", "Nơi Bánh Được Hoàn Thiện")}
//       <div class="gallery-grid">
//         <img src="${IMAGE}" alt="Không gian cửa hàng" />
//         <img src="${IMAGE}" alt="Bánh trưng bày" />
//         <img src="${IMAGE}" alt="Bếp bánh" />
//         <img src="${IMAGE}" alt="Chi tiết bánh" />
//         <img src="${IMAGE}" alt="Quầy bánh" />
//       </div>
//     </section>
//     ${footer()}
//   `;
// }

// function renderContact() {
//   return `
//     <section class="contact">
//       <div>
//         <span class="eyebrow">Liên hệ</span>
//         <h1>Nói Chuyện<br /> Với Chúng Tôi</h1>
//         <span class="gold-line" style="margin-left: 0"></span>
//         <div class="contact-list">
//           ${contactItem("pin", "Địa chỉ", "466C1 Nguyễn Huệ, Phú Khương, Vĩnh Long")}
//           ${contactItem("phone", "Điện thoại", "0901 234 567")}
//           ${contactItem("mail", "Email", "hello@leofcakes.vn")}
//         </div>
//         <div class="map-placeholder">${STORE_MAP_IFRAME}</div>
//       </div>
//       <form class="contact-form" data-form="contact" novalidate>
//         <h2>Gửi tin nhắn</h2>
//         <div class="form-grid" style="margin-top: 34px">
//           <label>Họ và tên *<input class="field" name="name" placeholder="Nguyễn Văn A" /></label>
//           <label>Email *<input class="field" name="email" placeholder="email@example.com" /></label>
//           <label>Số điện thoại<input class="field" name="phone" placeholder="0901234567" /></label>
//           <label>Nội dung *<textarea name="message" placeholder="Nội dung tin nhắn của bạn..."></textarea></label>
//           <div class="form-message"></div>
//           <button class="primary full" type="submit">✈ Gửi tin nhắn</button>
//         </div>
//       </form>
//     </section>
//   `;
// }

// function contactItem(icon, title, text) {
//   const paths = {
//     pin: '<path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z"></path><circle cx="12" cy="10" r="2.5"></circle>',
//     phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 3 5.2 2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.7c.1.9.3 1.7.6 2.5a2 2 0 0 1-.4 2.1L8 11a16 16 0 0 0 5 5l1.7-2.2a2 2 0 0 1 2.1-.4c.8.3 1.6.5 2.5.6A2 2 0 0 1 22 16.9Z"></path>',
//     mail: '<path d="M4 4h16v16H4z"></path><path d="m4 7 8 6 8-6"></path>',
//   };
//   return `<div class="contact-item"><span class="contact-icon"><svg viewBox="0 0 24 24">${paths[icon]}</svg></span><div><strong>${title}</strong><span>${text}</span></div></div>`;
// }

// function articleCard(article) {
//   return `
//     <article class="article-card">
//       <img src="${article.image}" alt="${article.title}" />
//       <div class="news-copy">
//         <span class="tag">${article.category}</span>
//         <h3>${article.title}</h3>
//         <p>${article.excerpt}</p>
//         <button class="read-more" data-action="article" data-id="${article.id}">Đọc thêm →</button>
//       </div>
//     </article>
//   `;
// }

// function renderNews() {
//   const tabs = ["Tất cả", "Khuyến mãi", "Voucher", "Sự kiện", "Bảo quản bánh", "Theo mùa"];
//   const list = state.newsCategory === "Tất cả" ? articles : articles.filter((a) => a.category === state.newsCategory);
//   const first = list[0] || articles[0];
//   return `
//     <section class="page-hero">
//       <span class="eyebrow">Tin tức & sự kiện</span>
//       <h1>Tin Tức & Sự Kiện</h1>
//       <span class="gold-line"></span>
//       <p>Những câu chuyện, khuyến mãi và sự kiện mới nhất từ LEOF Cakes.</p>
//     </section>
//     <section class="section">
//       <div class="news-tabs">${tabs.map((tab) => `<button class="pill ${state.newsCategory === tab ? "active" : ""}" data-action="news-tab" data-value="${tab}">${tab}</button>`).join("")}</div>
//       ${state.newsLoading ? `<div class="skeleton-grid"><div class="skeleton"></div><div class="skeleton"></div><div class="skeleton"></div></div>` : `
//         <article class="news-feature">
//           <img src="${first.image}" alt="${first.title}" />
//           <div class="news-copy">
//             <span class="tag">${first.category}</span>
//             <h2>${first.title}</h2>
//             <p>${first.excerpt}</p>
//             <button class="read-more" data-action="article" data-id="${first.id}">Đọc thêm →</button>
//           </div>
//         </article>
//         <div class="news-grid">${list.slice(1).map(articleCard).join("")}</div>
//       `}
//     </section>
//     ${footer()}
//   `;
// }

// function renderArticle(id) {
//   const article = articles.find((item) => item.id === id) || articles[0];
//   return `
//     <article class="wide-section">
//       <img src="${IMAGE}" alt="${article.title}" style="width: 100%; max-height: 420px; object-fit: cover; border-radius: 8px" />
//       <div style="max-width: 880px; margin: 42px auto 0">
//         <span class="tag">${article.category}</span>
//         <h1 style="font-family: var(--serif); font-size: 56px; font-weight: 500; margin: 12px 0">${article.title}</h1>
//         <p style="color: var(--muted)">Cập nhật 26/06/2026 · LEOF Cakes</p>
//         <p style="font-size: 19px; line-height: 1.9">${article.body}</p>
//         <p style="font-size: 19px; line-height: 1.9">Bạn có thể đặt trước hoặc ghé cửa hàng để được tư vấn hương vị phù hợp cho từng dịp.</p>
//       </div>
//     </article>
//     ${footer()}
//   `;
// }

// // ==========================================
// // TRANG ĐĂNG NHẬP / ĐĂNG KÝ (#auth)
// // ==========================================
// function renderAuth() {
//   const isLogin = state.authMode === "login";
//   return `
//     <section class="auth-section">
//       <div class="auth-card">
//         <div class="auth-tabs">
//           <button class="auth-tab ${isLogin ? "active" : ""}" data-action="auth-tab" data-mode="login">Đăng nhập</button>
//           <button class="auth-tab ${!isLogin ? "active" : ""}" data-action="auth-tab" data-mode="register">Đăng ký</button>
//         </div>
//         ${state.authNotice ? `<div class="auth-notice">${state.authNotice}</div>` : ""}
//         ${isLogin ? `
//           <form class="form-grid" data-form="login" novalidate>
//             <label>Email *<input class="field" name="email" type="email" placeholder="email@example.com" /></label>
//             <label>Mật khẩu *<input class="field" name="password" type="password" placeholder="Nhập mật khẩu" /></label>
//             <div class="form-message"></div>
//             <button class="primary full" type="submit">Đăng nhập</button>
//           </form>
//         ` : `
//           <form class="form-grid" data-form="register" novalidate>
//             <label>Họ và tên *<input class="field" name="name" placeholder="Nguyễn Văn A" /></label>
//             <label>Email *<input class="field" name="email" type="email" placeholder="email@example.com" /></label>
//             <label>Số điện thoại *<input class="field" name="phone" placeholder="0901234567" /></label>
//             <label>Địa chỉ mặc định *<input class="field" name="address" placeholder="Số nhà, đường, phường/xã..." /></label>
//             <label>Mật khẩu *<input class="field" name="password" type="password" placeholder="Tối thiểu 6 ký tự" /></label>
//             <div class="form-message"></div>
//             <button class="primary full" type="submit">Tạo tài khoản</button>
//           </form>
//         `}
//       </div>
//     </section>
//     ${footer()}
//   `;
// }

// // ==========================================
// // TRANG TÀI KHOẢN & THEO DÕI ĐƠN HÀNG (#account)
// // ==========================================
// function getOrderStatusInfo(status) {
//   const map = {
//     pending: { label: "Chờ xác nhận", cls: "status-pending", step: 1 },
//     cancel_requested: { label: "Chờ duyệt hủy", cls: "status-cancel-req", step: 1 },
//     baking: { label: "Đang làm bánh", cls: "status-baking", step: 2 },
//     shipping: { label: "Đang giao hàng", cls: "status-shipping", step: 3 },
//     completed: { label: "Hoàn thành", cls: "status-completed", step: 4 },
//     cancelled: { label: "Đã hủy", cls: "status-cancelled", step: 0 },
//   };
//   return map[status] || map.pending;
// }

// function getUserAddresses(user) {
//   if (!user) return [];
//   if (!Array.isArray(user.addresses)) {
//     user.addresses = user.address
//       ? [{
//           id: "addr_init",
//           label: "Mặc định",
//           recipientName: user.name,
//           phone: user.phone || "",
//           detail: user.address,
//           isDefault: true,
//         }]
//       : [];
//   }
//   return user.addresses;
// }

// function syncUserAddresses(user) {
//   const defaultAddr = user.addresses.find((a) => a.isDefault) || user.addresses[0];
//   if (defaultAddr) {
//     defaultAddr.isDefault = true;
//     user.address = defaultAddr.detail;
//     if (defaultAddr.phone) user.phone = defaultAddr.phone;
//   } else {
//     user.address = "";
//   }
//   const idx = state.users.findIndex((u) => u.id === user.id);
//   if (idx !== -1) state.users[idx] = user;
//   saveJSON(STORAGE_KEYS.USERS, state.users);
//   saveJSON(STORAGE_KEYS.CURRENT_USER, user);
// }

// function renderAccount() {
//   const user = state.currentUser;
//   if (!user) return renderAuth();

//   const myOrders = state.orders
//     .filter((order) => order.userId === user.id)
//     .sort((a, b) => b.createdTimestamp - a.createdTimestamp);
//   const addresses = getUserAddresses(user);

//   return `
//     <section class="page-hero">
//       <span class="eyebrow">Khách hàng thành viên</span>
//       <h1>Tài Khoản Của Tôi</h1>
//       <span class="gold-line"></span>
//     </section>
//     <section class="account-layout">
//       <!-- CỘT MENU BÊN TRÁI -->
//       <aside class="account-sidebar">
//         <div class="account-user-box">
//           <strong>${user.name}</strong>
//           <span>${user.email}</span>
//         </div>
//         <button class="filter-button ${state.accountTab === "orders" ? "active" : ""}" data-action="account-tab" data-tab="orders">Đơn hàng của tôi (${myOrders.length})</button>
//         <button class="filter-button ${state.accountTab === "profile" ? "active" : ""}" data-action="account-tab" data-tab="profile">Thông tin cá nhân</button>
//         <button class="filter-button ${state.accountTab === "addresses" ? "active" : ""}" data-action="account-tab" data-tab="addresses">Sổ địa chỉ (${addresses.length})</button>
//         <button class="filter-button ${state.accountTab === "password" ? "active" : ""}" data-action="account-tab" data-tab="password">Đổi mật khẩu</button>
//         <a class="filter-button" href="#wishlist" style="text-decoration:none">Danh sách yêu thích (${state.wishlist.size})</a>
//         <button class="filter-button" data-action="logout" style="color: var(--danger); margin-top: 12px">Đăng xuất</button>
//       </aside>

//       <!-- NỘI DUNG BÊN PHẢI -->
//       <div>
//         ${state.accountTab === "orders" ? `
//           <h2 style="font-family: var(--serif); font-size: 36px; margin-top: 0">Theo Dõi Tiến Độ Đơn Hàng</h2>
//           ${!myOrders.length ? `
//             <div class="account-card" style="text-align:center; padding: 60px 24px">
//               <p style="color: var(--muted)">Bạn chưa có đơn hàng nào.</p>
//               <a class="primary" href="#shop">Đặt bánh ngay</a>
//             </div>
//           ` : myOrders.map((order) => {
//             const st = getOrderStatusInfo(order.status);
//             return `
//               <article class="order-card">
//                 <div class="order-head">
//                   <div>
//                     <strong style="font-size: 18px">Mã đơn: ${order.orderCode}</strong><br />
//                     <small style="color: var(--muted)">Ngày đặt: ${order.createdAt} · ${order.payment === "cod"
//                                                                                         ? "Thanh toán COD"
//                                                                                         : `Chuyển khoản ngân hàng ${
//                                                                                             order.isPaid
//                                                                                               ? '<span class="status-badge status-completed" style="padding:2px 8px; font-size:11px; margin-left:6px">Đã nhận tiền</span>'
//                                                                                               : order.customerReportedPaid
//                                                                                                 ? '<span class="status-badge status-pending" style="padding:2px 8px; font-size:11px; margin-left:6px">Chờ đối chiếu CK</span>'
//                                                                                                 : ""
//                                                                                           }`
//                                                                                       }</small>
//                   </div>
//                   <span class="status-badge ${st.cls}">${st.label}</span>
//                 </div>

//                 ${order.status !== "cancelled" ? `
//                   <div class="order-tracker">
//                     <div class="tracker-step ${st.step >= 1 ? "done" : ""}"><span class="tracker-dot">1</span>Đã tiếp nhận</div>
//                     <div class="tracker-step ${st.step >= 2 ? "done" : ""}"><span class="tracker-dot">2</span>Bếp đang làm</div>
//                     <div class="tracker-step ${st.step >= 3 ? "done" : ""}"><span class="tracker-dot">3</span>Đang giao bánh</div>
//                     <div class="tracker-step ${st.step >= 4 ? "done" : ""}"><span class="tracker-dot">4</span>Đã giao hàng</div>
//                   </div>
//                 ` : ""}

//                 <div class="order-items-mini">
//                   ${order.items.map((item) => `
//                     <div class="order-item-row">
//                       <span><strong>${item.name}</strong> × ${item.qty}</span>
//                       <span>${formatPrice(item.price * item.qty)}</span>
//                     </div>
//                   `).join("")}
//                 </div>

//                 <div style="font-size: 14px; color: var(--muted); margin-top: 10px">
//                   Giao đến: <strong>${order.customer.name}</strong> (${order.customer.phone}) — ${order.customer.address}
//                 </div>

//                 <div class="order-foot">
//                   <div>Tổng cộng: <strong class="price">${formatPrice(order.total)}</strong></div>
//                   <div style="display:flex; align-items:center; gap:10px">
//                     ${order.status === "pending" ? `<button class="btn-danger-outline" data-action="cancel-order" data-code="${order.orderCode}">Yêu cầu hủy đơn</button>` : ""}
//                     ${order.status === "cancel_requested" ? `<span style="font-size:13px; color:#b44b4b; font-weight:600">Đang chờ Admin xác nhận hủy...</span>` : ""}
//                     ${(order.status === "completed" || order.status === "cancelled") ? `<button class="btn-keep-outline" data-action="reorder" data-code="${order.orderCode}">↻ Đặt lại đơn</button>` : ""}
//                   </div>
//                 </div>
//               </article>
//             `;
//           }).join("")}

//         ` : state.accountTab === "profile" ? `
//           <div class="account-card">
//             <h2 style="font-family: var(--serif); font-size: 36px; margin-top: 0">Hồ Sơ Cá Nhân</h2>
//             <form class="form-grid" data-form="profile" novalidate>
//               <label>Họ và tên *<input class="field" name="name" value="${user.name}" /></label>
//               <label>Email (Không thể thay đổi)<input class="field" value="${user.email}" disabled style="background: var(--paper-2)" /></label>
//               <label>Số điện thoại *<input class="field" name="phone" value="${user.phone || ""}" /></label>
//               <label>Địa chỉ giao hàng mặc định *<input class="field" name="address" value="${user.address || ""}" /></label>
//               <div class="form-message"></div>
//               <button class="primary" type="submit" style="width: fit-content">Lưu thay đổi</button>
//             </form>
//           </div>

//         ` : state.accountTab === "addresses" ? `
//           <div class="account-card" style="margin-bottom: 24px">
//             <h2 style="font-family: var(--serif); font-size: 36px; margin-top: 0">Sổ Địa Chỉ Giao Hàng</h2>
//             ${!addresses.length ? `<p style="color: var(--muted)">Bạn chưa lưu địa chỉ giao hàng nào.</p>` : `
//               <div class="address-list">
//                 ${addresses.map((addr) => `
//                   <div class="address-card ${addr.isDefault ? "default" : ""}">
//                     <div>
//                       <div style="display:flex; align-items:center; gap:10px; margin-bottom:6px">
//                         <strong>${addr.label}</strong>
//                         ${addr.isDefault ? `<span class="address-badge">Mặc định</span>` : ""}
//                       </div>
//                       <div style="font-size:15px"><strong>${addr.recipientName}</strong> · ${addr.phone}</div>
//                       <div style="color: var(--muted); font-size:14px; margin-top:4px">${addr.detail}</div>
//                     </div>
//                     <div style="display:flex; flex-wrap:wrap; gap:8px">
//                       ${!addr.isDefault ? `<button class="btn-keep-outline" data-action="set-default-address" data-id="${addr.id}">Đặt mặc định</button>` : ""}
//                       <button class="btn-danger-outline" data-action="delete-address" data-id="${addr.id}">Xóa</button>
//                     </div>
//                   </div>
//                 `).join("")}
//               </div>
//             `}
//           </div>

//           <div class="account-card">
//             <h3 style="font-family: var(--serif); font-size: 28px; margin-top: 0">Thêm Địa Chỉ Mới</h3>
//             <form class="form-grid" data-form="add-address" novalidate>
//               <div class="two-col">
//                 <label>Tên gợi nhớ *<input class="field" name="label" placeholder="Ví dụ: Nhà riêng, Công ty, Tặng bạn..." /></label>
//                 <label>Tên người nhận *<input class="field" name="recipientName" value="${user.name}" /></label>
//               </div>
//               <label>Số điện thoại người nhận *<input class="field" name="phone" value="${user.phone || ""}" placeholder="0901234567" /></label>
//               <label>Địa chỉ chi tiết *<input class="field" name="detail" placeholder="Số nhà, đường, phường/xã, quận/huyện..." /></label>
//               <label style="display:flex; align-items:center; gap:10px; font-weight:500; cursor:pointer">
//                 <input type="checkbox" name="isDefault" style="width:18px; height:18px" /> Đặt làm địa chỉ giao hàng mặc định
//               </label>
//               <div class="form-message"></div>
//               <button class="primary" type="submit" style="width: fit-content">+ Lưu địa chỉ</button>
//             </form>
//           </div>

//         ` : `
//           <div class="account-card">
//             <h2 style="font-family: var(--serif); font-size: 36px; margin-top: 0">Đổi Mật Khẩu</h2>
//             <form class="form-grid" data-form="change-password" novalidate>
//               <label>Mật khẩu hiện tại *<input class="field" name="oldPassword" type="password" placeholder="Nhập mật khẩu đang dùng" /></label>
//               <label>Mật khẩu mới *<input class="field" name="newPassword" type="password" placeholder="Tối thiểu 6 ký tự" /></label>
//               <label>Xác nhận mật khẩu mới *<input class="field" name="confirmPassword" type="password" placeholder="Nhập lại mật khẩu mới" /></label>
//               <div class="form-message"></div>
//               <button class="primary" type="submit" style="width: fit-content">Cập nhật mật khẩu</button>
//             </form>
//           </div>
//         `}
//       </div>
//     </section>
//     ${footer()}
//   `;
// }

// function renderAdmin() {
//   const user = state.currentUser;
//   if (!user || user.role !== "admin") return renderAuth();

//   const allOrders = [...state.orders].sort((a, b) => b.createdTimestamp - a.createdTimestamp);
//   const completedRevenue = allOrders
//     .filter((o) => o.status !== "cancelled")
//     .reduce((sum, o) => sum + o.total, 0);
//   const pendingCount = allOrders.filter((o) => o.status === "pending").length;

//   const allCustomers = state.users.filter((u) => u.role !== "admin");
//   const keyword = state.adminCustomerSearch.trim().toLowerCase();
//   const filteredCustomers = allCustomers.filter(
//     (c) =>
//       !keyword ||
//       c.name.toLowerCase().includes(keyword) ||
//       c.email.toLowerCase().includes(keyword) ||
//       (c.phone && c.phone.includes(keyword))
//   );

//   return `
//     <section class="page-hero">
//       <span class="eyebrow">Hệ thống quản trị</span>
//       <h1>Quản Lý Cửa Hàng</h1>
//       <span class="gold-line"></span>
//     </section>

//     <section class="account-layout">
//       <aside class="account-sidebar">
//         <div class="account-user-box">
//           <strong>${user.name}</strong>
//           <span>Quyền: Quản trị viên (Admin)</span>
//         </div>
//         <button class="filter-button ${state.adminTab === "orders" ? "active" : ""}" data-action="admin-tab" data-tab="orders">Quản lý đơn hàng (${allOrders.length})</button>
//         <button class="filter-button ${state.adminTab === "customers" ? "active" : ""}" data-action="admin-tab" data-tab="customers">Quản lý khách hàng (${allCustomers.length})</button>
//         <button class="filter-button ${state.adminTab === "products" ? "active" : ""}" data-action="admin-tab" data-tab="products">Danh sách sản phẩm (${products.length})</button>
//         <button class="filter-button" data-action="logout" style="color: var(--danger); margin-top: 12px">Đăng xuất</button>
//       </aside>

//       <div>
//         <div class="admin-stats">
//           <div class="stat-card"><span>Tổng đơn hàng</span><strong>${allOrders.length}</strong></div>
//           <div class="stat-card"><span>Chờ xác nhận</span><strong>${pendingCount}</strong></div>
//           <div class="stat-card"><span>Doanh thu dự kiến</span><strong>${formatPrice(completedRevenue)}</strong></div>
//           <div class="stat-card"><span>Khách hàng</span><strong>${allCustomers.length}</strong></div>
//         </div>

//         ${state.adminTab === "orders" ? `
//           <h2 style="font-family: var(--serif); font-size: 36px; margin-top: 0">Danh Sách Đơn Đặt Hàng</h2>
//           ${!allOrders.length ? `
//             <div class="account-card" style="text-align:center; padding: 50px 20px">
//               <p style="color: var(--muted)">Chưa có đơn hàng nào từ khách hàng.</p>
//             </div>
//           ` : allOrders.map((order) => {
//             const st = getOrderStatusInfo(order.status);
//             return `
//               <article class="order-card">
//                 <div class="order-head">
//                   <div>
//                     <strong style="font-size: 18px">Mã đơn: ${order.orderCode}</strong><br />
//                     <small style="color: var(--muted)">Khách hàng: <strong>${order.customer.name}</strong> · ${order.customer.phone} · Đặt lúc ${order.createdAt}</small>
//                   </div>
//                   <div style="display:flex; align-items:center; gap: 10px">
//                     <span class="status-badge ${st.cls}">${st.label}</span>
//                     <select class="admin-select" data-action="admin-status" data-code="${order.orderCode}">
//                       <option value="pending" ${order.status === "pending" ? "selected" : ""}>Chờ xác nhận</option>
//                       <option value="cancel_requested" ${order.status === "cancel_requested" ? "selected" : ""}>Chờ duyệt hủy</option>
//                       <option value="baking" ${order.status === "baking" ? "selected" : ""}>Đang làm bánh</option>
//                       <option value="shipping" ${order.status === "shipping" ? "selected" : ""}>Đang giao hàng</option>
//                       <option value="completed" ${order.status === "completed" ? "selected" : ""}>Hoàn thành</option>
//                       <option value="cancelled" ${order.status === "cancelled" ? "selected" : ""}>Đã hủy</option>
//                     </select>
//                   </div>
//                 </div>

//                 ${order.status === "cancel_requested" ? `
//                   <div class="cancel-request-banner">
//                     <span>⚠️ Khách hàng đã gửi yêu cầu hủy đơn hàng này.</span>
//                     <div style="display:flex; gap:8px">
//                       <button class="btn-danger-outline" data-action="approve-cancel" data-code="${order.orderCode}">Xác nhận hủy</button>
//                       <button class="btn-keep-outline" data-action="reject-cancel" data-code="${order.orderCode}">Từ chối (Giữ đơn)</button>
//                     </div>
//                   </div>
//                 ` : ""}

//                 ${order.payment === "bank" && !order.isPaid && order.status !== "cancelled" ? `
//                   <div class="bank-verify-banner">
//                     <div>
//                       <strong>${order.customerReportedPaid ? "💳 Khách đã báo chuyển khoản" : "⏳ Chờ khách chuyển khoản"}</strong><br />
//                       <small>Đối chiếu BIDV: <strong>${formatPrice(order.total)}</strong> · Nội dung: <strong>${order.orderCode}</strong></small>
//                     </div>
//                     <div style="display:flex; gap:8px">
//                       <button class="btn-keep-outline" data-action="confirm-payment-received" data-code="${order.orderCode}">✓ Xác nhận đã nhận tiền</button>
//                       <button class="btn-danger-outline" data-action="reject-payment-received" data-code="${order.orderCode}">Chưa nhận được</button>
//                     </div>
//                   </div>
//                 ` : ""}

//                 <div class="order-items-mini">
//                   ${order.items.map((item) => `
//                     <div class="order-item-row">
//                       <span><strong>${item.name}</strong> × ${item.qty}</span>
//                       <span>${formatPrice(item.price * item.qty)}</span>
//                     </div>
//                   `).join("")}
//                 </div>

//                 <div style="font-size: 14px; color: var(--muted); margin-top: 8px">
//                   Địa chỉ giao: ${order.customer.address} ${order.customer.note ? `· Ghi chú: <em>"${order.customer.note}"</em>` : ""}
//                 </div>

//                 <div class="order-foot">
//                   <span>Hình thức: <strong>${order.payment === "cod"
//                                               ? "Thanh toán COD"
//                                               : `Chuyển khoản ngân hàng ${
//                                                   order.isPaid
//                                                     ? '<span class="status-badge status-completed" style="padding:2px 8px; font-size:11px; margin-left:6px">Đã nhận tiền</span>'
//                                                     : order.customerReportedPaid
//                                                       ? '<span class="status-badge status-pending" style="padding:2px 8px; font-size:11px; margin-left:6px">Chờ đối chiếu CK</span>'
//                                                       : ""
//                                                 }`
//                                             }</strong></span>
//                   <div>Tổng tiền: <strong class="price">${formatPrice(order.total)}</strong></div>
//                 </div>
//               </article>
//             `;
//           }).join("")}

//         ` : state.adminTab === "customers" ? `
//           <div style="display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; gap:16px; margin-bottom:24px">
//             <h2 style="font-family: var(--serif); font-size: 36px; margin: 0">Danh Sách Khách Hàng</h2>
//             <input class="search-box" style="width: min(320px, 100%); margin: 0" data-action="admin-customer-search" value="${state.adminCustomerSearch}" placeholder="Tìm tên, email hoặc SĐT..." />
//           </div>

//           ${!filteredCustomers.length ? `
//             <div class="account-card" style="text-align:center; padding: 50px 20px">
//               <p style="color: var(--muted)">Không tìm thấy tài khoản khách hàng nào.</p>
//             </div>
//           ` : `
//             <div class="admin-table-wrap">
//               <table class="admin-table">
//                 <thead>
//                   <tr>
//                     <th>Khách hàng</th>
//                     <th>Liên hệ & Địa chỉ</th>
//                     <th>Đơn hợp lệ</th>
//                     <th>Tổng chi tiêu</th>
//                     <th>Trạng thái</th>
//                     <th>Thao tác</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   ${filteredCustomers.map((c) => {
//                     const validOrders = state.orders.filter((o) => o.userId === c.id && o.status !== "cancelled");
//                     const totalSpent = validOrders.reduce((sum, o) => sum + o.total, 0);
//                     return `
//                       <tr>
//                         <td>
//                           <strong>${c.name}</strong><br />
//                           <small style="color: var(--muted)">${c.email}</small>
//                         </td>
//                         <td>
//                           <span>${c.phone || "Chưa có SĐT"}</span><br />
//                           <small style="color: var(--muted)">${c.address || "Chưa có địa chỉ"}</small>
//                         </td>
//                         <td><strong>${validOrders.length}</strong> đơn</td>
//                         <td><strong class="price" style="font-size: 18px">${formatPrice(totalSpent)}</strong></td>
//                         <td>
//                           <span class="status-badge ${c.locked ? "status-cancelled" : "status-completed"}">
//                             ${c.locked ? "Đã khóa" : "Hoạt động"}
//                           </span>
//                         </td>
//                         <td>
//                           <button class="${c.locked ? "btn-keep-outline" : "btn-danger-outline"}" data-action="toggle-lock-user" data-id="${c.id}">
//                             ${c.locked ? "Mở khóa" : "Khóa tài khoản"}
//                           </button>
//                         </td>
//                       </tr>
//                     `;
//                   }).join("")}
//                 </tbody>
//               </table>
//             </div>
//           `}

//         ` : `
//           <h2 style="font-family: var(--serif); font-size: 36px; margin-top: 0">Danh Mục Bánh Hiện Có</h2>
//           <div class="admin-table-wrap">
//             <table class="admin-table">
//               <thead>
//                 <tr>
//                   <th>Tên bánh</th>
//                   <th>Danh mục</th>
//                   <th>Khối lượng</th>
//                   <th>Đơn giá</th>
//                   <th>Nhãn</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 ${products.map((p) => `
//                   <tr>
//                     <td><strong>${p.name}</strong></td>
//                     <td>${p.category}</td>
//                     <td>${p.weight}</td>
//                     <td>${formatPrice(p.price)}</td>
//                     <td>${p.tags.join(", ")}</td>
//                   </tr>
//                 `).join("")}
//               </tbody>
//             </table>
//           </div>
//         `}
//       </div>
//     </section>
//     ${footer()}
//   `;
// }

// // ==========================================
// // TRANG THANH TOÁN (#checkout)
// // ==========================================
// function finalizeOrder(orderData) {
//   state.orders.push(orderData);
//   saveJSON(STORAGE_KEYS.ORDERS, state.orders);
//   state.lastOrderCode = orderData.orderCode;
//   state.pendingBankOrder = null;
//   state.cart.clear();
//   state.accountTab = "orders";
//   location.hash = "checkout-complete";
// }

// function renderCheckout() {
//   const user = state.currentUser;
//   if (!user) return renderAuth();

//   // Nếu đang có đơn chờ quét mã QR chuyển khoản
//   if (state.pendingBankOrder) {
//     const order = state.pendingBankOrder;
//     const qrUrl = `https://img.vietqr.io/image/${BANK_CONFIG.bankId}-${BANK_CONFIG.accountNo}-compact2.png?amount=${order.total}&addInfo=${encodeURIComponent(order.orderCode)}&accountName=${encodeURIComponent(BANK_CONFIG.accountName)}`;

//     return `
//       <section class="checkout">
//         <div class="qr-payment-box">
//           <span class="eyebrow">Thanh toán trực tuyến</span>
//           <h1 style="font-family: var(--serif); font-size: 40px; margin: 10px 0">Quét Mã QR Chuyển Khoản</h1>
//           <p style="color: var(--muted); margin-bottom: 28px">
//             Sử dụng ứng dụng ngân hàng hoặc ví điện tử hỗ trợ VietQR để quét mã. Sau khi chuyển khoản thành công, vui lòng bấm <strong>"Tôi đã chuyển khoản"</strong> bên dưới để hoàn tất đơn hàng.
//           </p>

//           <div class="qr-grid">
//             <div class="qr-image-wrap">
//               <img src="${qrUrl}" alt="Mã QR thanh toán ${order.orderCode}" />
//             </div>

//             <div class="qr-details">
//               <div class="qr-row">
//                 <span>Ngân hàng</span>
//                 <strong>${BANK_CONFIG.bankName}</strong>
//               </div>
//               <div class="qr-row">
//                 <span>Chủ tài khoản</span>
//                 <strong>${BANK_CONFIG.accountName}</strong>
//               </div>
//               <div class="qr-row">
//                 <span>Số tài khoản</span>
//                 <div>
//                   <strong>${BANK_CONFIG.accountNo}</strong>
//                   <button type="button" class="copy-btn" data-action="copy-text" data-text="${BANK_CONFIG.accountNo}">Sao chép</button>
//                 </div>
//               </div>
//               <div class="qr-row">
//                 <span>Số tiền</span>
//                 <strong class="price" style="font-size: 22px">${formatPrice(order.total)}</strong>
//               </div>
//               <div class="qr-row">
//                 <span>Nội dung CK</span>
//                 <div>
//                   <strong style="color: var(--gold-dark)">${order.orderCode}</strong>
//                   <button type="button" class="copy-btn" data-action="copy-text" data-text="${order.orderCode}">Sao chép</button>
//                 </div>
//               </div>

//               <div class="qr-status-box">
//                 <span>Sau khi chuyển khoản thành công, vui lòng bấm nút xác nhận bên dưới để cửa hàng kiểm tra giao dịch.</span>
//               </div>

//               <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-top: 18px">
//                 <button type="button" class="primary" style="flex:1" data-action="confirm-bank-paid">✓ Tôi đã chuyển khoản</button>
//                 <button type="button" class="btn-danger-outline" data-action="cancel-bank-qr">Hủy thanh toán</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     `;
//   }

//   const items = cartItems();
//   const subtotal = items.reduce((sum, item) => sum + item.product.price * item.qty, 0);
//   return `
//     <section class="checkout">
//       <h1>Thanh toán</h1>
//       <div class="checkout-layout">
//         <form class="checkout-card" data-form="checkout" novalidate>
//           <div class="form-grid">
//             <h2>Thông tin giao hàng</h2>
//             ${getUserAddresses(user).length ? `
//               <label>Chọn nhanh từ sổ địa chỉ đã lưu
//                 <select class="sort-select" style="width:100%" data-action="select-checkout-address">
//                   ${getUserAddresses(user).map((addr) => `
//                     <option value="${addr.id}" ${addr.isDefault ? "selected" : ""}>
//                       [${addr.label}] ${addr.recipientName} (${addr.phone}) - ${addr.detail}
//                     </option>
//                   `).join("")}
//                 </select>
//               </label>
//             ` : ""}
//             <label>Họ và tên *<input class="field" name="name" value="${user.name || ""}" /></label>
//             <div class="two-col">
//               <label>Số điện thoại *<input class="field" name="phone" value="${user.phone || ""}" /></label>
//               <label>Email *<input class="field" name="email" value="${user.email || ""}" /></label>
//             </div>
//             <label>Địa chỉ giao hàng *<input class="field" name="address" value="${user.address || ""}" placeholder="Ví dụ: 466C1 Nguyễn Huệ, Phú Khương, Vĩnh Long" /></label>
//             <label>Ghi chú đơn hàng<textarea name="note" placeholder="Lưu ý riêng cho đơn hàng của bạn"></textarea></label>
//             <h2>Phương thức thanh toán</h2>
//             <div class="payment-options">
//               <label class="payment-option ${state.payment === "cod" ? "active" : ""}"><input type="radio" name="payment" value="cod" ${state.payment === "cod" ? "checked" : ""} /> <span><strong>Thanh toán khi nhận hàng (COD)</strong><br /><small>Thanh toán bằng tiền mặt khi nhận bánh.</small></span></label>
//               <label class="payment-option ${state.payment === "bank" ? "active" : ""}"><input type="radio" name="payment" value="bank" ${state.payment === "bank" ? "checked" : ""} /> <span><strong>Chuyển khoản ngân hàng (VietQR)</strong><br /><small>Quét mã QR bằng ứng dụng ngân hàng để thanh toán.</small></span></label>
//             </div>
//             <div class="form-message"></div>
//           </div>
//         </form>
//         <aside class="order-summary">
//           <h2>Đơn hàng của bạn</h2>
//           ${items.length ? items.map(({ product, qty }) => `<div class="summary-item"><img src="${productImage(product)}" onerror="handleImgError(this, '${product.id}')" alt="${product.name}" /><div><strong>${product.name}</strong><br />x${qty}</div><span>${formatPrice(product.price * qty)}</span></div>`).join("") : `<p>Giỏ hàng đang trống.</p>`}
//           <div class="summary-row"><span>Tạm tính</span><span>${formatPrice(subtotal)}</span></div>
//           <div class="summary-row"><span>Giao hàng</span><span>Liên hệ báo phí</span></div>
//           <div class="summary-row summary-total"><span>Tổng cộng</span><strong>${formatPrice(subtotal)}</strong></div>
//           <button class="primary full" data-action="place-order">✓ Đặt hàng</button>
//           <p class="terms">Bằng cách đặt hàng, bạn đồng ý với điều khoản của chúng tôi.</p>
//         </aside>
//       </div>
//     </section>
//   `;
// }

// // ==========================================
// // TRANG ĐẶT HÀNG THÀNH CÔNG (#checkout-complete)
// // ==========================================
// function renderCheckoutComplete() {
//   return `
//     <section class="wide-section">
//       <div class="success-box">
//         <div class="success-icon">✓</div>
//         <span class="eyebrow">Cảm ơn bạn đã đặt bánh</span>
//         <h1 style="font-family: var(--serif); font-size: 46px; font-weight: 500; margin: 14px 0">Đặt Hàng Thành Công!</h1>
//         <p style="color: var(--muted); line-height: 1.7">
//           Đơn hàng ${state.lastOrderCode ? `<strong>${state.lastOrderCode}</strong>` : "của bạn"} đã được lưu vào hệ thống. Bếp bánh LEOF Cakes sẽ liên hệ xác nhận trong ít phút.
//         </p>
//         <div style="display: flex; flex-wrap: wrap; gap: 14px; justify-content: center; margin-top: 32px">
//           <a class="primary" href="#account">Theo dõi tiến độ đơn hàng</a>
//           <a class="outline-button" href="#shop">Tiếp tục mua sắm</a>
//         </div>
//       </div>
//     </section>
//     ${footer()}
//   `;
// }

// function footer() {
//   return `
//     <footer class="wide-section" style="background: var(--rose); padding-top: 70px; padding-bottom: 34px">
//         <div class="footer-grid">
//         <div>
//           <a class="brand" href="#home"><span>LEOF</span><small>CAKES</small></a>
//           <p style="color: var(--muted); line-height: 1.8">Mỗi chiếc bánh là một tác phẩm nghệ thuật được tạo nên bởi tình yêu và sự tỉ mỉ - phong cách tiệm bánh Âu chính hiệu giữa lòng Việt Nam.</p>
//           <div style="display: flex; gap: 14px; margin-top: 26px"><span class="round-icon">f</span><span class="round-icon">◎</span><span class="round-icon">▶</span></div>
//         </div>
//         <div><h3>Điều hướng</h3><p><a href="#home">Trang chủ</a></p><p><a href="#shop">Các loại bánh</a></p><p><a href="#about">Giới thiệu</a></p><p><a href="#news">Tin tức & Khuyến mãi</a></p><p><a href="#account">Theo dõi đơn hàng</a></p><p><a href="#wishlist">Danh sách yêu thích</a></p><p><a href="#contact">Liên hệ</a></p></div>
//         <div><h3>Liên hệ</h3><p>📍 466C1 Nguyễn Huệ, Phú Khương, Vĩnh Long</p><p>📞 0901 234 567</p><p>✉ hello@leofcakes.vn</p><h3>Giờ mở cửa:</h3><p>Thứ 2 - Thứ 6: 8:00 - 20:00</p><p>Thứ 7 - Chủ nhật: 8:00 - 22:00</p></div>
//         <div class="map-placeholder" style="margin-top: 0">${STORE_MAP_IFRAME}</div>
//       </div>
//       <div style="border-top: 1px solid var(--line); margin-top: 48px; padding-top: 24px; display: flex; justify-content: space-between; color: var(--muted); font-size: 13px"><span>© 2026 LEOF Cakes. Tất cả quyền được bảo lưu.</span><span>Chính sách bảo mật · Điều khoản sử dụng · Chính sách đổi trả</span></div>
//     </footer>
//   `;
// }

// function cartItems() {
//   return [...state.cart.entries()].map(([id, qty]) => ({ product: products.find((p) => p.id === id), qty })).filter((item) => item.product);
// }

// function cartCount() {
//   return cartItems().reduce((sum, item) => sum + item.qty, 0);
// }

// function updateCartUI() {
//   const count = cartCount();
//   const badge = document.querySelector("#cartBadge");
//   badge.textContent = count;
//   badge.classList.toggle("show", count > 0);
//   document.querySelector("#drawerCount").textContent = count;
//   const items = cartItems();
//   const drawerItems = document.querySelector("#drawerItems");
//   if (!items.length) {
//     drawerItems.innerHTML = `<div class="drawer-empty"><div><p>Giỏ hàng của bạn đang trống.</p><button class="primary" data-action="close-cart">Khám phá sản phẩm</button></div></div>`;
//   } else {
//     drawerItems.innerHTML = items.map(({ product, qty }) => `
//       <div class="cart-line">
//         <img src="${productImage(product)}" onerror="handleImgError(this, '${product.id}')" alt="${product.name}" />
//         <div>
//           <strong>${product.name}</strong><br />
//           <span class="price">${formatPrice(product.price)}</span>
//           <div class="qty">
//             <button data-action="cart-minus" data-id="${product.id}">−</button>
//             <span style="display:grid;place-items:center">${qty}</span>
//             <button data-action="cart-plus" data-id="${product.id}">+</button>
//           </div>
//         </div>
//         <button class="remove" data-action="cart-remove" data-id="${product.id}">×</button>
//       </div>
//     `).join("");
//   }
//   document.querySelector("#drawerSubtotal").textContent = formatPrice(items.reduce((sum, item) => sum + item.product.price * item.qty, 0));
// }

// function render404() {
//   return `
//     <section class="not-found">
//       <div>
//         <h1>404</h1>
//         <p>Page Not Found</p>
//         <div class="warning-box"><strong>Admin Note</strong><br />Trang bạn tìm kiếm không tồn tại.</div>
//         <a class="outline-button" href="#home">Về trang chủ</a>
//       </div>
//     </section>
//   `;
// }

// function render() {
//   if (state.route.startsWith("product/")) app.innerHTML = renderProductDetail(state.route.split("/")[1]);
//   else if (state.route.startsWith("article/")) app.innerHTML = renderArticle(state.route.split("/")[1]);
//   else if (state.route === "home") app.innerHTML = renderHome();
//   else if (state.route === "shop") app.innerHTML = renderShop();
//   else if (state.route === "wishlist") app.innerHTML = renderWishlist();
//   else if (state.route === "about") app.innerHTML = renderAbout();
//   else if (state.route === "contact") app.innerHTML = renderContact();
//   else if (state.route === "news") app.innerHTML = renderNews();
//   else if (state.route === "auth") app.innerHTML = renderAuth();
//   else if (state.route === "account") app.innerHTML = renderAccount();
//   else if (state.route === "admin") app.innerHTML = renderAdmin();
//   else if (state.route === "checkout") app.innerHTML = renderCheckout();
//   else if (state.route === "checkout-complete") app.innerHTML = renderCheckoutComplete();
//   else app.innerHTML = render404();
//   updateCartUI();
//   updateUserUI();
// }

// function renderAndRestore(action, cursor) {
//   render();
//   const field = document.querySelector(`[data-action="${action}"]`);
//   if (field) {
//     field.focus();
//     const position = Math.min(cursor, field.value.length);
//     field.setSelectionRange(position, position);
//   }
// }

// function openCart() {
//   drawer.classList.add("open");
//   drawer.setAttribute("aria-hidden", "false");
// }

// function closeCart() {
//   drawer.classList.remove("open");
//   drawer.setAttribute("aria-hidden", "true");
// }

// function validateForm(form) {
//   let ok = true;
//   const message = form.querySelector(".form-message");
//   form.querySelectorAll(".invalid").forEach((el) => el.classList.remove("invalid"));
//   form.querySelectorAll("[name]").forEach((field) => {
//     const required = field.closest("label")?.textContent.includes("*");
//     if (required && !field.value.trim()) {
//       field.classList.add("invalid");
//       ok = false;
//     }
//     if (field.name === "email" && field.value && !field.value.includes("@")) {
//       field.classList.add("invalid");
//       ok = false;
//     }
//   });
//   if (message) message.innerHTML = ok ? "" : `<span class="error">Vui lòng kiểm tra các trường bắt buộc.</span>`;
//   return ok;
// }

// document.body.addEventListener("click", (event) => {
//   const target = event.target.closest("[data-action]");
//   if (!target) return;
//   const action = target.dataset.action;
//   const id = target.dataset.id;

//   if (action === "go-shop") location.hash = "shop";
//   if (action === "go-account") {
//   if (!state.currentUser) location.hash = "auth";
//   else location.hash = state.currentUser.role === "admin" ? "admin" : "account";
//   }
//   if (action === "admin-tab") {
//     state.adminTab = target.dataset.tab;
//     render();
//   }
//   if (action === "open-cart") openCart();
//   if (action === "close-cart") closeCart();
//   if (action === "slide") { state.slide = Number(target.dataset.slide); render(); }
//   if (action === "prev-slide") { state.slide = (state.slide - 1 + 3) % 3; render(); }
//   if (action === "next-slide") { state.slide = (state.slide + 1) % 3; render(); }
//   if (action === "toggle-wish") { state.wishlist.has(id) ? state.wishlist.delete(id) : state.wishlist.add(id); render(); }
//   if (action === "add-cart") { state.cart.set(id, (state.cart.get(id) || 0) + 1); updateCartUI(); }
//   if (action === "cart-plus") { state.cart.set(id, (state.cart.get(id) || 0) + 1); updateCartUI(); }
//   if (action === "cart-minus") {
//     const next = (state.cart.get(id) || 0) - 1;
//     next > 0 ? state.cart.set(id, next) : state.cart.delete(id);
//     updateCartUI();
//   }
//   if (action === "cart-remove") { state.cart.delete(id); updateCartUI(); }
//   if (action === "detail-minus") { state.detailQty = Math.max(1, state.detailQty - 1); render(); }
//   if (action === "detail-plus") { state.detailQty += 1; render(); }
//   if (action === "detail-add-cart") {
//     state.cart.set(id, (state.cart.get(id) || 0) + state.detailQty);
//     updateCartUI();
//   }
//   if (action === "detail-buy-now") {
//     state.cart.set(id, (state.cart.get(id) || 0) + state.detailQty);
//     closeCart();
//     location.hash = "checkout";
//   }
//   if (action === "checkout") { closeCart(); location.hash = "checkout"; }
//   if (action === "view-cart") { closeCart(); location.hash = "shop"; }
//   if (action === "category") { state.category = target.dataset.value; render(); }
//   if (action === "quick") { state.quick = target.dataset.value; render(); }
//   if (action === "clear-filters") { state.category = "Tất cả"; state.quick = "Tất cả"; state.search = ""; state.min = ""; state.max = ""; state.sort = "default"; location.hash = "shop"; render(); }
//   if (action === "news-tab") {
//     state.newsCategory = target.dataset.value;
//     state.newsLoading = true;
//     render();
//     setTimeout(() => { state.newsLoading = false; render(); }, 520);
//   }
//   if (action === "article") location.hash = `article/${id}`;

//   // Chuyển tab Đăng nhập / Đăng ký
//   if (action === "auth-tab") {
//     state.authMode = target.dataset.mode;
//     render();
//   }

//   if (action === "account-tab") {
//     state.accountTab = target.dataset.tab;
//     render();
//   }

//   if (action === "logout") {
//     state.currentUser = null;
//     localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
//     location.hash = "home";
//   }

//   if (action === "reorder") {
//     const code = target.dataset.code;
//     const order = state.orders.find((o) => o.orderCode === code);
//     if (order) {
//       let addedCount = 0;
//       order.items.forEach((item) => {
//         const exists = products.some((p) => p.id === item.id);
//         if (exists) {
//           state.cart.set(item.id, (state.cart.get(item.id) || 0) + item.qty);
//           addedCount += item.qty;
//         }
//       });
//       if (addedCount > 0) {
//         updateCartUI();
//         openCart();
//       }
//     }
//   }

//   if (action === "cancel-order") {
//     const code = target.dataset.code;
//     const order = state.orders.find((o) => o.orderCode === code);
//     if (order && order.status === "pending") {
//       order.status = "cancel_requested";
//       saveJSON(STORAGE_KEYS.ORDERS, state.orders);
//       render();
//     }
//   }

//   if (action === "approve-cancel") {
//     const code = target.dataset.code;
//     const order = state.orders.find((o) => o.orderCode === code);
//     if (order && order.status === "cancel_requested") {
//       order.status = "cancelled";
//       saveJSON(STORAGE_KEYS.ORDERS, state.orders);
//       render();
//     }
//   }

//   if (action === "reject-cancel") {
//     const code = target.dataset.code;
//     const order = state.orders.find((o) => o.orderCode === code);
//     if (order && order.status === "cancel_requested") {
//       order.status = "pending";
//       saveJSON(STORAGE_KEYS.ORDERS, state.orders);
//       render();
//     }
//   }

//   if (action === "place-order") {
//     const latestUser = state.users.find((u) => u.id === state.currentUser?.id);
//     if (latestUser?.locked) {
//       alert("Tài khoản của bạn đã bị khóa, không thể đặt hàng.");
//       state.currentUser = null;
//       localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
//       location.hash = "auth";
//       return;
//     }

//     const form = document.querySelector('[data-form="checkout"]');
//     if (form && validateForm(form) && cartCount() && state.currentUser) {
//       const items = cartItems().map(({ product, qty }) => ({
//         id: product.id,
//         name: product.name,
//         price: product.price,
//         qty,
//       }));
//       const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
//       const now = new Date();
//       const orderCode = `LEOF-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${String(state.orders.length + 1).padStart(3, "0")}`;

//       const newOrder = {
//         orderCode,
//         userId: state.currentUser.id,
//         customer: {
//           name: form.name.value.trim(),
//           phone: form.phone.value.trim(),
//           email: form.email.value.trim(),
//           address: form.address.value.trim(),
//           note: form.note.value.trim(),
//         },
//         items,
//         total,
//         payment: state.payment,
//         isPaid: false,
//         status: "pending",
//         createdAt: now.toLocaleString("vi-VN"),
//         createdTimestamp: now.getTime(),
//       };

//       if (state.payment === "bank") {
//         // Mở màn hình QR và chờ khách xác nhận đã chuyển khoản
//         state.pendingBankOrder = newOrder;
//         render();
//         window.scrollTo({ top: 0, behavior: "smooth" });
//       } else {
//         // Thanh toán COD hoàn tất ngay
//         finalizeOrder(newOrder);
//       }
//     }
//   }

//   if (action === "confirm-bank-paid" && state.pendingBankOrder) {
//     state.pendingBankOrder.customerReportedPaid = true;
//     finalizeOrder(state.pendingBankOrder);
//   }

//   if (action === "cancel-bank-qr") {
//     state.pendingBankOrder = null;
//     render();
//   }

//   // Sao chép số tài khoản / nội dung chuyển khoản
//   if (action === "copy-text") {
//     navigator.clipboard?.writeText(target.dataset.text);
//     const oldText = target.textContent;
//     target.textContent = "Đã chép";
//     setTimeout(() => { target.textContent = oldText; }, 1500);
//   }

//   if (action === "set-default-address" && state.currentUser) {
//     const addresses = getUserAddresses(state.currentUser);
//     addresses.forEach((a) => { a.isDefault = a.id === id; });
//     syncUserAddresses(state.currentUser);
//     render();
//   }

//   if (action === "delete-address" && state.currentUser) {
//     const addresses = getUserAddresses(state.currentUser);
//     state.currentUser.addresses = addresses.filter((a) => a.id !== id);
//     syncUserAddresses(state.currentUser);
//     render();
//   }

//   if (action === "toggle-lock-user") {
//     const targetUser = state.users.find((u) => u.id === id && u.role !== "admin");
//     if (targetUser) {
//       targetUser.locked = !targetUser.locked;
//       saveJSON(STORAGE_KEYS.USERS, state.users);
//       render();
//     }
//   }

//   if (action === "confirm-payment-received") {
//     const code = target.dataset.code;
//     const order = state.orders.find((o) => o.orderCode === code);
//     if (order && order.payment === "bank") {
//       order.isPaid = true;
//       if (order.status === "pending") {
//         order.status = "baking";
//       }
//       saveJSON(STORAGE_KEYS.ORDERS, state.orders);
//       render();
//     }
//   }

//   if (action === "reject-payment-received") {
//     const code = target.dataset.code;
//     const order = state.orders.find((o) => o.orderCode === code);
//     if (order && order.payment === "bank") {
//       order.customerReportedPaid = false;
//       order.isPaid = false;
//       saveJSON(STORAGE_KEYS.ORDERS, state.orders);
//       render();
//     }
//   }
// });

// document.body.addEventListener("input", (event) => {
//   const target = event.target;
//   const action = target.dataset.action;
//   const cursor = target.selectionStart || target.value.length;
//   if (action === "search") { state.search = target.value; renderAndRestore(action, cursor); }
//   if (action === "min-price") { state.min = target.value.replace(/\D/g, ""); renderAndRestore(action, cursor); }
//   if (action === "max-price") { state.max = target.value.replace(/\D/g, ""); renderAndRestore(action, cursor); }
//   if (action === "admin-customer-search") {
//     state.adminCustomerSearch = target.value;
//     renderAndRestore(action, cursor);
//   }
// });

// document.body.addEventListener("change", (event) => {
//   const target = event.target;
//   if (target.dataset.action === "sort") { state.sort = target.value; render(); }
//   if (target.name === "payment") { state.payment = target.value; render(); }

//   if (target.dataset.action === "admin-status") {
//     const order = state.orders.find((o) => o.orderCode === target.dataset.code);
//     if (order) {
//       order.status = target.value;
//       if (order.payment === "bank" && ["baking", "shipping", "completed"].includes(target.value)) {
//         order.isPaid = true;
//       }
//       saveJSON(STORAGE_KEYS.ORDERS, state.orders);
//       render();
//     }
//   }

//   if (target.dataset.action === "select-checkout-address" && state.currentUser) {
//     const addr = getUserAddresses(state.currentUser).find((a) => a.id === target.value);
//     const form = document.querySelector('[data-form="checkout"]');
//     if (addr && form) {
//       form.name.value = addr.recipientName;
//       form.phone.value = addr.phone;
//       form.address.value = addr.detail;
//     }
//   }
// });

// document.body.addEventListener("submit", (event) => {
//   const form = event.target.closest("form");
//   if (!form) return;
//   event.preventDefault();
//   if (!validateForm(form)) return;

//   const formType = form.dataset.form;
//   const message = form.querySelector(".form-message");

//   // Xử lý Đăng ký
//   if (formType === "register") {
//     const email = form.email.value.trim().toLowerCase();
//     const password = form.password.value;
//     if (password.length < 6) {
//       message.innerHTML = `<span class="error">Mật khẩu phải có ít nhất 6 ký tự.</span>`;
//       return;
//     }
//     if (state.users.some((u) => u.email === email)) {
//       message.innerHTML = `<span class="error">Email này đã được đăng ký.</span>`;
//       return;
//     }
//     const newUser = {
//       id: "user_" + Date.now(),
//       name: form.name.value.trim(),
//       email,
//       phone: form.phone.value.trim(),
//       address: form.address.value.trim(),
//       password,
//       role: "customer",
//     };
//     state.users.push(newUser);
//     saveJSON(STORAGE_KEYS.USERS, state.users);
//     state.currentUser = newUser;
//     saveJSON(STORAGE_KEYS.CURRENT_USER, newUser);
//     state.authNotice = "";
//     const next = state.redirectAfterLogin || "account";
//     state.redirectAfterLogin = null;
//     location.hash = next;
//   }

//   if (formType === "login") {
//     const email = form.email.value.trim().toLowerCase();
//     const password = form.password.value;
//     const found = state.users.find((u) => u.email === email && u.password === password);
//     if (!found) {
//       message.innerHTML = `<span class="error">Email hoặc mật khẩu không chính xác.</span>`;
//       return;
//     }
//     if (found.locked) {
//       message.innerHTML = `<span class="error">Tài khoản của bạn đã bị khóa. Vui lòng liên hệ LEOF Cakes.</span>`;
//       return;
//     }
//     state.currentUser = found;
//     saveJSON(STORAGE_KEYS.CURRENT_USER, found);
//     state.authNotice = "";
//     const defaultDest = found.role === "admin" ? "admin" : "account";
//     const next = found.role === "admin" ? "admin" : (state.redirectAfterLogin || defaultDest);
//     state.redirectAfterLogin = null;
//     location.hash = next;
//   }

//   if (formType === "profile" && state.currentUser) {
//     state.currentUser.name = form.name.value.trim();
//     state.currentUser.phone = form.phone.value.trim();
//     state.currentUser.address = form.address.value.trim();
//     const idx = state.users.findIndex((u) => u.id === state.currentUser.id);
//     if (idx !== -1) state.users[idx] = state.currentUser;
//     saveJSON(STORAGE_KEYS.USERS, state.users);
//     saveJSON(STORAGE_KEYS.CURRENT_USER, state.currentUser);
//     updateUserUI();
//     message.innerHTML = `<span style="color: #49784f">Đã cập nhật thông tin tài khoản.</span>`;
//   }

//   if (formType === "change-password" && state.currentUser) {
//     const oldPassword = form.oldPassword.value;
//     const newPassword = form.newPassword.value;
//     const confirmPassword = form.confirmPassword.value;

//     if (oldPassword !== state.currentUser.password) {
//       form.oldPassword.classList.add("invalid");
//       message.innerHTML = `<span class="error">Mật khẩu hiện tại không chính xác.</span>`;
//       return;
//     }
//     if (newPassword.length < 6) {
//       form.newPassword.classList.add("invalid");
//       message.innerHTML = `<span class="error">Mật khẩu mới phải có ít nhất 6 ký tự.</span>`;
//       return;
//     }
//     if (newPassword === oldPassword) {
//       form.newPassword.classList.add("invalid");
//       message.innerHTML = `<span class="error">Mật khẩu mới không được trùng với mật khẩu cũ.</span>`;
//       return;
//     }
//     if (newPassword !== confirmPassword) {
//       form.confirmPassword.classList.add("invalid");
//       message.innerHTML = `<span class="error">Xác nhận mật khẩu mới không khớp.</span>`;
//       return;
//     }

//     state.currentUser.password = newPassword;
//     const idx = state.users.findIndex((u) => u.id === state.currentUser.id);
//     if (idx !== -1) state.users[idx] = state.currentUser;
//     saveJSON(STORAGE_KEYS.USERS, state.users);
//     saveJSON(STORAGE_KEYS.CURRENT_USER, state.currentUser);

//     form.reset();
//     message.innerHTML = `<span style="color: #49784f">Đổi mật khẩu thành công!</span>`;
//   }

//   if (formType === "contact") {
//     message.innerHTML = `<span style="color: #49784f">Cảm ơn bạn! Tin nhắn đã được gửi đến LEOF Cakes.</span>`;
//     form.reset();
//   }

//   if (formType === "add-address" && state.currentUser) {
//     const addresses = getUserAddresses(state.currentUser);
//     const makeDefault = form.isDefault.checked || addresses.length === 0;
//     if (makeDefault) {
//       addresses.forEach((a) => { a.isDefault = false; });
//     }
//     addresses.push({
//       id: "addr_" + Date.now(),
//       label: form.label.value.trim(),
//       recipientName: form.recipientName.value.trim(),
//       phone: form.phone.value.trim(),
//       detail: form.detail.value.trim(),
//       isDefault: makeDefault,
//     });
//     syncUserAddresses(state.currentUser);
//     render();
//   }
// });

// drawer.addEventListener("click", (event) => {
//   if (event.target === drawer) closeCart();
// });

// window.addEventListener("hashchange", () => setRoute(location.hash.replace("#", "") || "home"));
// setRoute(location.hash.replace("#", "") || "home");
// setInterval(() => {
//   if (state.route === "home") {
//     state.slide = (state.slide + 1) % 3;
//     render();
//   }
// }, 4800);

