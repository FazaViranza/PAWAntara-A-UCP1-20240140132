# Toko Sembako Ariesta

## Identitas Mahasiswa

- **Nama:** Nofila Faza Viranza
- **NIM:** 20240140132

---

## Deskripsi Project

Toko Sembako Ariesta adalah aplikasi web berbasis Node.js dan Express.js yang digunakan untuk menampilkan dan mengelola data produk toko sembako.

Aplikasi memiliki fitur untuk pengguna umum dan admin. Pengguna dapat melihat daftar produk, melihat detail produk, serta menggunakan fitur Tanya AI. Admin dapat melakukan login dan mengelola data produk melalui dashboard.

Data produk dan akun admin disimpan menggunakan database PostgreSQL.

### Fitur Utama

- Halaman Beranda
- Daftar Produk
- Detail Produk
- Login Admin
- Session Authentication
- Dashboard Admin
- Tambah Produk
- Edit Produk
- Hapus Produk
- Tanya AI
- Logger Middleware
- Validasi Input
- Password Hashing menggunakan bcrypt
- PostgreSQL Database
- Responsive UI untuk desktop dan mobile

---

# Teknologi yang Digunakan

- **Node.js**
- **Express.js**
- **EJS**
- **PostgreSQL**
- **Express Session**
- **bcryptjs**
- **JavaScript**
- **HTML**
- **CSS**
- **Fetch API**

---

# Cara Menjalankan Project

## 1. Clone Repository

```bash
git clone <URL_REPOSITORY>
```

## 2. Masuk ke Folder Project

```bash
cd PAWAntara-A-UCP1-20240140132
```

## 3. Install Dependencies

```bash
npm install
```

## 4. Konfigurasi Environment

Buat file `.env` di root project.

Contoh:

```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=ariesta_db
DB_PASSWORD=your_password
DB_PORT=5432
SESSION_SECRET=your_session_secret
```

> File `.env` tidak diikutsertakan ke repository.

## 5. Menyiapkan PostgreSQL

Pastikan PostgreSQL sudah berjalan.

Buat database dan tabel yang dibutuhkan oleh aplikasi.

Aplikasi menggunakan tabel:

```text
users
products
```

Konfigurasi koneksi database terdapat pada:

```text
config/db.js
```

## 6. Menjalankan Project

Jalankan menggunakan nodemon:

```bash
npm run dev
```

Atau menggunakan Node.js secara langsung:

```bash
node app.js
```

## 7. Membuka Website

Setelah server berjalan, buka:

```text
http://localhost:3000
```

---

# Halaman Website

## 1. Beranda

**Endpoint:**

```text
/
```

Halaman Beranda merupakan halaman utama Toko Sembako Ariesta.

Halaman ini menampilkan:

- Nama toko
- Navigation bar
- Informasi toko
- Produk unggulan

Produk ditampilkan menggunakan card agar informasi dapat dilihat dengan mudah.

### Screenshot

<img width="1918" height="1041" alt="image" src="https://github.com/user-attachments/assets/16bb3451-5ec4-4556-a578-36e744516be6" />


---

## 2. Daftar Produk

**Endpoint:**

```text
/produk
```

Halaman Produk menampilkan seluruh produk yang tersedia di toko.

Setiap produk memiliki informasi:

- Nama produk
- Kategori
- Harga
- Stok
- Tombol detail produk

Data produk diambil secara dinamis dari API:

```text
GET /api/products
```

### Screenshot

<img width="1919" height="1037" alt="image" src="https://github.com/user-attachments/assets/22f15d49-7e40-44b9-9391-e019c9bec936" />


---

## 3. Detail Produk

**Endpoint:**

```text
/produk/:id
```

Halaman Detail Produk menampilkan informasi produk berdasarkan ID.

Informasi yang ditampilkan meliputi:

- Kategori
- Nama produk
- Deskripsi
- Harga
- Status stok
- Jumlah stok

Tersedia tombol untuk kembali ke halaman daftar produk.

### Screenshot

<img width="1919" height="1038" alt="image" src="https://github.com/user-attachments/assets/21e9074d-877d-432c-9c42-72fba83d808f" />


---

## 4. Tanya AI

**Endpoint:**

```text
/tanya-ai
```

Halaman Tanya AI digunakan untuk memberikan pertanyaan mengenai informasi toko.

Pertanyaan dikirim ke backend menggunakan:

```text
POST /api/chat
```

Fitur Tanya AI dapat memberikan jawaban mengenai:

- Jam buka toko
- Layanan antar / ongkir
- Metode pembayaran
- Informasi stok

Balasan diproses oleh backend menggunakan logika keyword matching dan bukan menggunakan API AI eksternal.

### Screenshot

<img width="1917" height="1040" alt="image" src="https://github.com/user-attachments/assets/f42e3781-d1c2-432e-ac10-1e825a351b74" />

---

## 5. Login Admin

**Endpoint:**

```text
/login
```

Halaman Login digunakan oleh admin untuk melakukan autentikasi sebelum mengakses dashboard.

Login menggunakan:

- Username
- Password

Password admin disimpan dalam database dalam bentuk hash menggunakan bcrypt.

Jika login berhasil, session akan dibuat dan admin diarahkan ke dashboard.

Jika user mencoba mengakses dashboard tanpa login, user akan diarahkan kembali ke halaman login dengan peringatan bahwa login diperlukan.

### Screenshot

<img width="1919" height="1039" alt="image" src="https://github.com/user-attachments/assets/ba6c27cd-29a0-422c-aae5-88771be7a937" />


---

## 6. Dashboard Admin

**Endpoint:**

```text
/dashboard
```

Dashboard Admin digunakan untuk mengelola inventory produk.

Admin dapat:

- Menambahkan produk
- Mengedit produk
- Mengubah harga
- Mengubah stok
- Menghapus produk
- Melihat seluruh produk
- Logout

Dashboard hanya dapat diakses setelah admin berhasil login.

### Screenshot Dashboard

<img width="1919" height="1042" alt="image" src="https://github.com/user-attachments/assets/08d9e013-befd-4caa-adec-cf0ecbc8ff72" />


### Edit Produk

Saat admin memilih tombol **Edit**, form berubah menjadi mode edit.

Admin dapat melakukan perubahan terhadap:

- Nama produk
- Kategori
- Harga
- Stok

Tersedia tombol:

```text
Simpan Perubahan
Batal
```

### Screenshot Edit Produk

<img width="1919" height="1038" alt="image" src="https://github.com/user-attachments/assets/58351625-ad23-4acc-b415-6281d11573f8" />

---

# API Endpoints

## Product API

| Method | Endpoint | Deskripsi | Authentication |
|---|---|---|---|
| GET | `/api/products` | Mengambil seluruh produk | Tidak |
| GET | `/api/products/:id` | Mengambil produk berdasarkan ID | Tidak |
| POST | `/api/products` | Menambahkan produk baru | Ya |
| PUT | `/api/products/:id` | Mengubah produk | Ya |
| DELETE | `/api/products/:id` | Menghapus produk | Ya |

---

## GET `/api/products`

Mengambil seluruh data produk dari PostgreSQL.

Contoh:

```text
GET /api/products
```

Response:

```json
[
    {
        "id": 1,
        "name": "Beras Premium 5kg",
        "category": "Beras",
        "price": 75000,
        "stock": 20
    }
]
```

---

## GET `/api/products/:id`

Mengambil data satu produk berdasarkan ID.

Contoh:

```text
GET /api/products/1
```

---

## POST `/api/products`

Digunakan untuk menambahkan produk baru.

Endpoint ini membutuhkan authentication admin.

Contoh request:

```json
{
    "name": "Beras Premium 5kg",
    "category": "Beras",
    "price": 75000,
    "stock": 20
}
```

---

## PUT `/api/products/:id`

Digunakan untuk mengubah data produk.

Endpoint ini membutuhkan authentication admin.

Contoh:

```text
PUT /api/products/1
```

Request:

```json
{
    "name": "Beras Premium 5kg",
    "category": "Beras",
    "price": 80000,
    "stock": 25
}
```

---

## DELETE `/api/products/:id`

Digunakan untuk menghapus produk berdasarkan ID.

Endpoint ini membutuhkan authentication admin.

Contoh:

```text
DELETE /api/products/1
```

---

# Authentication API

| Method | Endpoint | Deskripsi |
|---|---|---|
| POST | `/api/login` | Login admin |
| POST | `/api/logout` | Logout admin |

---

## POST `/api/login`

Digunakan untuk melakukan login admin.

Contoh request:

```json
{
    "username": "admin",
    "password": "admin123"
}
```

Jika berhasil, server membuat session login.

Password diverifikasi menggunakan bcrypt.

---

## POST `/api/logout`

Digunakan untuk menghapus session login admin.

Contoh:

```text
POST /api/logout
```

Setelah logout, dashboard tidak dapat diakses kembali sebelum login ulang.

---

# Tanya AI API

## POST `/api/chat`

Digunakan untuk mengirim pertanyaan ke backend Tanya AI.

Contoh request:

```json
{
    "message": "Jam buka toko jam berapa?"
}
```

Contoh response:

```json
{
    "status": "success",
    "data": {
        "reply": "Toko Sembako Ariesta buka setiap hari pukul 08.00 - 21.00 WIB."
    }
}
```

Response diproses di backend menggunakan keyword matching.

Tidak menggunakan API AI eksternal seperti OpenAI, Gemini, atau Anthropic.

---

# UI dan Desain

Aplikasi menggunakan desain sederhana dengan tema toko sembako.

Warna utama menggunakan kombinasi:

- Cokelat
- Cream
- Putih

Tujuan desain adalah membuat informasi produk mudah dibaca dan navigasi mudah digunakan.

---

## Navigation Bar

Navigation bar digunakan sebagai navigasi utama website.

Menu:

- Beranda
- Produk
- Tanya AI

Pada desktop, menu ditampilkan secara horizontal.

Pada perangkat mobile, navigation bar berubah menjadi hamburger menu.

---

## Beranda

Beranda menampilkan informasi utama toko dan produk unggulan.

Produk ditampilkan menggunakan card dengan layout grid.

---

## Daftar Produk

Halaman Produk menggunakan card untuk menampilkan setiap produk secara terstruktur.

Informasi produk meliputi:

- Nama
- Kategori
- Harga
- Stok
- Detail

---

## Detail Produk

Detail produk menggunakan card yang lebih besar.

Informasi produk disusun secara terstruktur agar harga dan stok mudah dilihat.

Terdapat tombol:

```text
← Kembali ke Produk
```

untuk kembali ke halaman daftar produk.

---

## Login

Halaman login menyediakan form untuk:

- Username
- Password

Terdapat validasi input sebelum request dikirim.

Jika login gagal, sistem menampilkan pesan kesalahan.

Jika user mencoba masuk langsung ke dashboard tanpa login, sistem mengarahkan user ke halaman login dan menampilkan peringatan.

---

## Dashboard Admin

Dashboard menggunakan layout admin panel.

Admin dapat melakukan operasi CRUD terhadap produk.

### Tambah Produk

Form digunakan untuk memasukkan:

- Nama produk
- Kategori
- Harga
- Stok

### Edit Produk

Ketika tombol Edit dipilih, form akan berubah menjadi mode Edit Produk.

Tombol berubah menjadi:

```text
Simpan Perubahan
```

dan tersedia tombol:

```text
Batal
```

### Hapus Produk

Admin dapat menghapus produk menggunakan tombol Hapus.

Sistem meminta konfirmasi sebelum menghapus data.

---

## Tanya AI

Tanya AI menggunakan tampilan berbasis chat.

Pengguna dapat memasukkan pertanyaan dan mendapatkan balasan dari server secara dinamis.

Komunikasi dilakukan menggunakan Fetch API dan `async/await`.

---

# Responsive Design

Website dibuat responsive agar dapat digunakan pada desktop maupun perangkat mobile.

Pada desktop:

- Navigation tampil horizontal
- Product card menggunakan beberapa kolom
- Dashboard menggunakan layout yang lebih lebar

Pada mobile:

- Navigation berubah menjadi hamburger menu
- Product card menjadi satu kolom
- Form menyesuaikan ukuran layar
- Dashboard menyesuaikan layout
- Tombol dan input menggunakan lebar yang sesuai dengan layar

---

# Authentication & Security

Aplikasi menggunakan beberapa mekanisme authentication dan security.

### Session

Login admin menggunakan `express-session`.

Session digunakan untuk menentukan apakah user telah login.

### Password Hashing

Password admin disimpan menggunakan hash bcrypt dan tidak disimpan sebagai plain text.

### Authentication Middleware

Dashboard dilindungi menggunakan authentication middleware.

User yang belum login tidak dapat mengakses:

```text
/dashboard
```

Endpoint CRUD produk juga dilindungi authentication middleware.

Request tanpa session login akan ditolak dengan response:

```text
401 Unauthorized
```

---

# Middleware

Aplikasi memiliki beberapa middleware.

## Authentication Middleware

Digunakan untuk melindungi dashboard dan endpoint CRUD produk.

## Logger Middleware

Digunakan untuk mencatat request yang masuk ke server.

Contoh log:

```text
[2026-08-14T01:01:13.143Z] POST /api/login
```

Logger membantu proses monitoring dan debugging aplikasi.

---

# Validasi Input

Validasi input dilakukan pada frontend sebelum request dikirim.

Validasi diterapkan pada:

- Form login
- Form produk
- Form Tanya AI

Contoh:

- Username tidak boleh kosong
- Password tidak boleh kosong
- Nama produk tidak boleh kosong
- Kategori tidak boleh kosong
- Harga tidak boleh kosong
- Stok tidak boleh kosong
- Pertanyaan Tanya AI tidak boleh kosong

---

# Database

Project menggunakan PostgreSQL sebagai database utama.

Database menyimpan data:

```text
users
products
```

## Tabel Users

Digunakan untuk menyimpan data akun admin.

## Tabel Products

Digunakan untuk menyimpan data produk toko.

Data produk yang ditampilkan pada website berasal dari PostgreSQL sehingga perubahan data melalui dashboard dapat langsung terlihat pada halaman publik.

---

# Fetch API

Komunikasi antara frontend dan backend menggunakan Fetch API.

Fetch API digunakan untuk:

- Login
- Logout
- Mengambil produk
- Menambah produk
- Mengubah produk
- Menghapus produk
- Mengirim pertanyaan Tanya AI

Request asynchronous menggunakan:

```javascript
async / await
```

---

# Struktur Project

```text
PAWAntara-A-UCP1-20240140132/
│
├── config/
│   └── db.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── loggerMiddleware.js
│
├── public/
│   ├── css/
│   │   └── style.css
│   │
│   └── js/
│       ├── dashboard.js
│       ├── login.js
│       ├── products.js
│       ├── ai.js
│       └── script.js
│
├── views/
│   ├── partials/
│   │   ├── navbar.ejs
│   │   └── footer.ejs
│   │
│   ├── home.ejs
│   ├── products.ejs
│   ├── detail.ejs
│   ├── login.ejs
│   ├── dashboard.ejs
│   └── ai.ejs
│
├── screenshots/
│   ├── home.png
│   ├── products.png
│   ├── detail.png
│   ├── ai.png
│   ├── login.png
│   ├── dashboard.png
│   └── dashboard-edit.png
│
├── app.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

---

# Kesimpulan

Toko Sembako Ariesta merupakan aplikasi web yang mengimplementasikan konsep frontend dan backend menggunakan Node.js dan Express.js.

Aplikasi telah menggunakan REST API, Fetch API, authentication, session, bcrypt, PostgreSQL, middleware, CRUD, dan responsive UI.

Pengguna dapat melihat produk dan menggunakan fitur Tanya AI, sedangkan admin dapat melakukan pengelolaan inventory melalui dashboard.

Data produk tersimpan pada PostgreSQL sehingga perubahan yang dilakukan oleh admin dapat langsung digunakan oleh halaman publik.

Bismillah paw dapet a

---
