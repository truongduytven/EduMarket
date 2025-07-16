# EduMarket - Nền tảng học tập trực tuyến

Dự án React xây dựng nền tảng thương mại điện tử cho khóa học trực tuyến, tích hợp Tailwind CSS để tuì biến giao diện và Ant Design để sử dụng các component UI hiện đại.

## 📦 Công nghệ sử dụng

* ⚛️ React
* 💨 Tailwind CSS
* 🧩 Ant Design
* 📦 Vite hoặc CRA (tuùy thuộc vào setup)
* 🚲 Context API (quản lý giỏ hàng, tìm kiếm, yêu thích...)

---

## ✨ Bắt đầu

### 1. Clone project

```bash
git clone https://github.com/truongduytven/edumarket.git
cd edumarket
```

### 2. Cài đặt dependencies

```bash
npm install

```
### 3. Build and run

## Chạy thử nghiệm

```bash
npm run dev
# hoặc
yarn dev
```

## Build production

```bash
npm run build
# hoặc
yarn build
```


### 4. Cấu trúc thư mục chính

```bash
src/
├── apis/               # Gọi API như getSuggestions,...
├── assets/             # Ảnh, video demo,...
├── components/         # Các component như Header, Tabs, FilterBar, ProductCard,...
├── contexts/           # Context API: cart, search
├── layouts/            # Layout chính: rootLayout
├── lib/                # Hàm utils như formatPrice
├── pages/              # Trang chính của app
├── types/              # TypeScript type
└── App.tsx             # Root component
```
##