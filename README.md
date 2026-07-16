# 📋 QLCTDT.DIAGRAM - Quản lý Chương trình Đào tạo

> Hệ thống quản lý tiến độ và cấu trúc phân hệ Chương trình Đào tạo, bao gồm sơ đồ cơ sở dữ liệu (DB Diagram) và dashboard theo dõi tiến độ công việc.

## 🚀 Công nghệ sử dụng

| Công nghệ        | Mô tả                                      |
|-------------------|---------------------------------------------|
| **HTML/CSS/JS**   | Giao diện frontend thuần (Vanilla)          |
| **Firebase Hosting** | Deploy và hosting ứng dụng web           |
| **Firebase**      | Backend-as-a-Service (Firestore Database)   |
| **Google Fonts**  | Inter & Outfit cho typography               |

## 📁 Cấu trúc dự án

```
QLCTDT.DIAGRAM/
├── public/                          # Thư mục hosting chính
│   ├── index.html                   # Trang chính - Dashboard quản lý tiến độ
│   ├── db_diagram.html              # Sơ đồ cơ sở dữ liệu (DB Diagram)
│   ├── firebase_config.js           # Cấu hình kết nối Firebase
│   └── sql_tables_schema.js         # Định nghĩa schema các bảng SQL
├── .firebaserc                      # Cấu hình project Firebase
├── firebase.json                    # Cấu hình Firebase Hosting
├── .gitignore                       # Danh sách file/thư mục bỏ qua khi commit
└── README.md                        # Tài liệu hướng dẫn dự án
```

## 🛠️ Cài đặt & Chạy dự án

### Yêu cầu

- [Node.js](https://nodejs.org/) (v14+)
- [Firebase CLI](https://firebase.google.com/docs/cli)

### Cài đặt Firebase CLI

```bash
npm install -g firebase-tools
```

### Đăng nhập Firebase

```bash
firebase login
```

### Chạy local (development)

```bash
firebase serve
```

Truy cập tại: `http://localhost:5000`

### Deploy lên Firebase Hosting

```bash
firebase deploy
```

## 🌐 Các trang chính

| Trang              | Đường dẫn           | Mô tả                                          |
|--------------------|----------------------|-------------------------------------------------|
| **Dashboard**      | `/index.html`        | Quản lý tiến độ & cấu trúc phân hệ CTDT        |
| **DB Diagram**     | `/db_diagram.html`   | Sơ đồ quan hệ các bảng trong cơ sở dữ liệu     |

## 👥 Thành viên

- **Trần Tấn Hiếu** - Developer

## 📄 License

Dự án này được phát triển nội bộ bởi ASC.

---

> **Firebase Project:** `work-progress-asc`  
> **Repository:** [GitHub - TranTanHieu0303/work-progress-asc](https://github.com/TranTanHieu0303/work-progress-asc)
