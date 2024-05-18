# intermediate-js
Repository ini dirancang untuk memandu kelas intermediateJS batch-0. Setiap branch mewakili meet yang berbeda dengan topik dan konsep yang sesuai rancangan awal kurikulum.

## Branches

### Meet 1: Pengenalan Node.js , Git dengan Github Desktop dan Rest API
Branch: `meet-1`
- **Pengenalan Node.js** : Sejarah, tujuan, dan alasan dibuatnya Node.js.
- **Aplikasi Node.js sederhana** : Pengenalan framework dan modul Node.js.
- **Git dasar** : Penggunaan `.gitignore` dan GitHub Desktop.
- **Pengenalan REST API dan Insomnia** : Penggunaan dasar Insomnia.
- **Pengenalan pekerjaan di bidang teknologi**.

### Meet 2: Studi Kasus: Express, Rest API, CRUD tanpa database
Branch: `meet-2`
- **Setup Awal** : Menginstal Express.js, Menjalankan aplikasi Express.js pertama
- **Library-App** : Membangun aplikasi sederhana untuk mengelola buku, Mendefinisikan model data, Menangani permintaan HTTP (GET, POST, PUT, DELETE), Menerapkan CRUD (Create, Read, Update, Delete) tanpa database
- **Express Intro** : Konsep dasar Express.js, Menangani rute dan permintaan, Middleware dan error handling
- **REST API & CRUD no DB (http method)** : Memahami prinsip-prinsip REST API, Menerapkan CRUD tanpa database menggunakan metode HTTP

### Meet 3: Basis Data, Database, ORM, Rest API + ORM
Branch: `meet-3`
- **Pengenalan Database SQL dengan Excel** : Memahami konsep dasar database SQL melalui aplikasi seperti Excel. Ini membantu dalam memahami struktur tabel dan relasi antar data sebelum beralih ke sistem manajemen database yang sesungguhnya.
- **Mengenal Tipe Data dalam Database** : Mempelajari berbagai tipe data yang digunakan dalam database, seperti INTEGER, VARCHAR, BOOLEAN, dan lainnya, yang penting untuk menyimpan data dengan tepat.
- **Menambahkan Tabel Buku** : Langkah praktis dalam membuat tabel untuk manajemen buku dalam database, yang melibatkan mendefinisikan skema tabel dan jenis data untuk setiap kolom.
- **Pengenalan NeonDB** : NeonDB adalah contoh sistem manajemen database yang mungkin dibahas untuk memberikan gambaran tentang bagaimana database bisa diakses dan dimanipulasi secara online.
- **Pengenalan Prisma** : Prisma adalah sebuah Object-Relational Mapping (ORM) tool yang memudahkan interaksi dengan database melalui kode yang lebih dekat dengan bahasa pemrograman daripada perintah SQL mentah.
- **Implementasi Database dalam CRUD Terakhir** : Mengintegrasi pengetahuan database yang telah dikumpulkan ke dalam operasi CRUD yang sebelumnya hanya dilakukan tanpa penyimpanan data yang persisten.
- **Pengantar HTTP Response** : Memahami berbagai jenis respons HTTP, seperti 200 OK untuk sukses, 404 Not Found untuk data yang tidak ditemukan, dan 500 Internal Server Error untuk kesalahan server.

### Meet 4: Validation, env + Auth + Jwt
Branch: `meet-4`
- **Sprate implement basic MVC file structure** : memahami konsep MVC dimulai dari memisahkan komponen aplikasi menjadi model, view, dan controller untuk mengikuti pola desain MVC (Model-View-Controller).
- **Add user table** : Menambahkan tabel user dalam database untuk mengelola informasi user, yang berisi property email, dan password
- **JSON Web Tokens (JWT) dan Hash** : Memahami konsep Enkripsi dan Hashing
- **Login Register** : Implementasi fitur Login dan Register sederhana menggunakan JWT
- **.env** : Memahami konsep file **`.env`** untuk mengatur variabel seperti kunci rahasia, alamat database, dan konfigurasi lainnya.
- **Data Validation** : Memahami memvalidasi data yang diterima dari pengguna sebelum memprosesnya.`


### Meet 4.5: One to Many, Middleware, Debugging 
Branch: `meet-4.5`
- **Debugging 5W + 1H** : Memahami dan menerapkan proses debugging serta mencari jawaban atas error yang di dapat dan belajar membaca error di terminal
- **Add Update Book** : Menambahkan Fitur Update buku berdasarkan id buku yang ingin di Update
- **Add relation between user with Book (one to many)** : Memahami konsep data relation dalam database sql dan implementasi one to many untuk table user dengan book diamana satu user dapat memiliki banyak buku.
- **Auth with http req header with bearer token JWT (middleware)** : Membangun fitur authentication dengan token login user dengan JWT dan mengimplementasikan mekanisme authentication dengan middleware
- **New App Flow** : Memahami flow dari app yang kita buat, bagaimana alur dari route, hingga sampai di function yang di eksekusi
