# Library APP

Pertemuan ini memfokuskan pada pemahaman dan implementasi konsep MVC, penggunaan JSON Web Tokens (JWT) untuk autentikasi, serta pengaturan konfigurasi melalui file `.env`. Selain itu, kita juga akan belajar tentang validasi data masukan dari pengguna, dan kita akan mulai memakai metode pemprograman berbasis MVC tipis tipis.

## Materi

### **Sprate implement basic MVC file structure**

- Memahami dan menerapkan struktur file MVC dasar.
- Memisahkan komponen aplikasi menjadi Model, View, dan Controller.

### **Add user table**

- Menambahkan tabel user dalam database.
- Tabel ini akan menyimpan informasi seperti email dan password pengguna.

### **JSON Web Tokens (JWT) dan Hash**

- Memahami konsep enkripsi dan hashing.
- Implementasi autentikasi menggunakan JWT.

### **Login Register**

- Membangun fitur login dan registrasi menggunakan JWT.
- Mengimplementasikan mekanisme penyimpanan password yang aman dengan hashing.

### **.env**

- Memahami penggunaan file `.env` untuk menyimpan dan mengelola konfigurasi rahasia.
- Contoh pengaturan yang bisa diinclude adalah kunci rahasia JWT, alamat database, dll.

### **Data Validation**

- Memahami pentingnya validasi data pengguna.
- Menerapkan validasi pada input yang diterima dari pengguna untuk mencegah masalah keamanan dan kesalahan data.

## Endpoint API

API ini menyediakan beberapa endpoint berikut:

- `GET /books`: Mendapatkan semua data buku.
- `POST /books/menambah`: Menambahkan data buku baru.
- `GET /book/:id`: Mendapatkan data buku berdasarkan ID.
- `DELETE /book/:id`: Menghapus data buku berdasarkan ID.
- `POST /register`: Register user ke data user.
- `POST /login`: Login user dan memeberi accessToken untuk mendapatkan access ke API.

## Penjelasan Kode

Kode ini menggunakan Node.js dan Express.js untuk menyediakan API, dan Prisma sebagai ORM untuk interaksi dengan database. Setiap endpoint memanfaatkan async/await untuk penanganan proses asinkronus.

# README.md untuk API Manajemen Buku

### 1. Mendapatkan Semua Buku `getAllBooks`

**Endpoint**: `GET /books`

- **Code** :

```js
async function getAllBooks(req, res) {
  //read all book table
  try {
    const books = await prisma.book.findMany();
    res.send(books);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
}
```

- **Alur Kode** :

  - Mencari semua entri buku dalam database.
  - Mengembalikan data buku yang ditemukan.

- **Deskripsi**: Endpoint ini digunakan untuk mengambil semua data buku yang tersimpan dalam database.
- **Return**: Mengembalikan array yang berisi objek buku jika berhasil. Jika terjadi kesalahan server, akan mengembalikan pesan "Internal Server Error" dengan status kode 500.

### 2. Menambahkan Buku Baru

**Endpoint**: `POST /books/menambah`

- **Code** :

```js
async function createBook(req, res) {
  const { judul, halaman, author } = req.body;

  try {
    const newBook = await prisma.book.create({
      data: {
        judul,
        halaman,
        author,
      },
    });

    res.status(201).send(newBook);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Gagal menambahkan books" });
  }
}
```

- **Alur Kode**
  - Menerima data buku (judul, halaman, dan author) dari body request.
  - Menyimpan buku baru ke dalam database.
  - Mengembalikan data buku yang baru dibuat.
- **Deskripsi**: Endpoint ini digunakan untuk menambahkan buku baru ke dalam database.
- **Body Request**:
  - `judul`: Judul dari buku yang ingin ditambahkan.
  - `halaman`: Jumlah halaman dari buku tersebut.
  - `author`: Penulis dari buku tersebut.
- **Return**: Mengembalikan objek buku yang baru dibuat dengan status kode 201 jika berhasil. Jika gagal, akan mengembalikan pesan "Gagal menambahkan buku" dengan status kode 500.

### 3. Mendapatkan Buku Berdasarkan ID

**Endpoint**: `GET /book/:id`

- **Code** :

```js
async function getOneBookById(req, res) {
  const bookId = parseInt(req.params.id);

  try {
    const book = await prisma.book.findUnique({
      where: {
        id: bookId,
      },
    });

    if (!book) {
      return res.status(404).send({ message: "Buku tidak ditemukan" });
    }

    res.send(book);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Terjadi kesalahan server" });
  }
}
```

- **Alur Kode** :
  - Mencari buku berdasarkan ID yang diberikan dalam parameter request.
  - Memeriksa apakah buku tersebut ditemukan.
  - Mengembalikan data buku jika ditemukan.
- **Deskripsi**: Endpoint ini digunakan untuk mengambil data buku berdasarkan ID yang diberikan.
- **Parameter URL**:
  - `id`: ID dari buku yang ingin diakses.
- **Return**: Mengembalikan objek buku yang sesuai dengan ID yang diminta. Jika buku tidak ditemukan, akan mengembalikan pesan "Buku tidak ditemukan" dengan status kode 404. Jika terjadi kesalahan server, akan mengembalikan pesan "Terjadi kesalahan server" dengan status kode 500.

### 4. Menghapus Buku Berdasarkan ID

**Endpoint**: `DELETE /book/:id`

- **Code** :

```js
async function deleteBookById(req, res) {
  const bookId = parseInt(req.params.id);

  try {
    const book = await prisma.book.findUnique({
      where: {
        id: bookId,
      },
    });

    if (!book) {
      return res.status(404).send({ message: "Buku tidak ditemukan" });
    }

    await prisma.book.delete({
      where: {
        id: bookId,
      },
    });

    res.send({ message: "Buku berhasil dihapus" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Terjadi kesalahan server" });
  }
}
```

- **Alur Kode** :
  - Mencari buku berdasarkan ID.
  - Memeriksa apakah buku tersebut ditemukan.
  - Menghapus buku dari database jika ditemukan.
  - Mengembalikan pesan sukses.
- **Deskripsi**: Endpoint ini digunakan untuk menghapus buku dari database berdasarkan ID yang diberikan.
- **Parameter URL**:
  - `id`: ID dari buku yang ingin dihapus.
- **Return**: Mengembalikan pesan "Buku berhasil dihapus" jika proses penghapusan berhasil. Jika buku tidak ditemukan, akan mengembalikan pesan "Buku tidak ditemukan" dengan status kode 404. Jika terjadi kesalahan server, akan mengembalikan pesan "Terjadi kesalahan server" dengan status kode 500.

### 5. Register

**Endpoint**: `POST /register`

- **Code** :

```js
async function register(req, res) {
  //validase email
  if (!req.body.email) {
    return res.status(400).send({ message: "email diperlukan" });
  }
  //validasi password
  if (!req.body.password) {
    return res.status(400).send({ message: "password diperlukan" });
  }
  //ambil email dan password dari body
  const { email, password } = req.body;
  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 5); // 10 adalah tingkat keamanan hashing
    //buat usernya tambahkan ke db
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    return res.status(201).send({ message: "User berhasil dibuat" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
}
```

- **Alur Kode** :
  - Melakukan validasi untuk memastikan bahwa email dan password telah diisi.
  - Meng-hash password yang diberikan menggunakan bcrypt.
  - Menyimpan pengguna baru dengan password yang sudah di-hash ke dalam database.
  - Mengembalikan pesan sukses jika pengguna berhasil dibuat.
- **Deskripsi**: Endpoint ini digunakan untuk untuk mendaftarkan pengguna baru.
- **Return**: Mengembalikan pesan "User berhasil dibuat" jika proses penghapusan berhasil dengan status kode 201. Jika user tidak membawa property req.body yang tepat maka akan mengembalikan "'nama property body' diperlukan" dengan status kode 400. Jika terjadi kesalahan server, akan mengembalikan pesan "Internal Server Error" dengan status kode 500.

### 6. Login

**Endpoint**: `POST /login`

- **Code** :

```js
async function login(req, res) {
  // Validasi email dan password
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: "Email dan password diperlukan" });
  }
  const { email, password } = req.body;
  try {
    // Cari user berdasarkan email
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // Jika user tidak ditemukan
    if (!user) {
      return res.status(404).send({ message: "Email atau password salah" });
    }
    // Bandingkan password yang di-hash dengan password yang dimasukkan
    const passwordMatch = await bcrypt.compare(password, user.password);
    // Jika password tidak cocok
    if (!passwordMatch) {
      return res.status(401).send({ message: "Email atau password salah" });
    }
    // Generate JWT
    const accessToken = jwt.sign({ userId: user.id }, "secretKey", {
      expiresIn: "1h",
    }); // Menggunakan secretKey untuk signing token, disarankan menggunakan secret yang kuat dan disimpan di lingkungan yang aman.
    // Kirim accessToken sebagai respons
    return res.status(200).send({ accessToken });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
}
```

- **Alur Kode** :
  - Validasi input untuk memastikan bahwa email dan password disediakan.
  - Mencari pengguna berdasarkan email.
  - Membandingkan password yang dimasukkan dengan hash yang tersimpan di database.
  - Jika validasi berhasil, meng-generate JWT untuk autentikasi sesi pengguna.
  - Mengembalikan token JWT jika berhasil.
- **Deskripsi**: Endpoint ini digunakan oleh pengguna untuk login dengan email dan password.
- **Return**: Mengembalikan Data accessToken jika proses login berhasil dengan status kode 200. Jika user tidak membawa property req.body yang tepat maka akan mengembalikan "'nama property body' diperlukan" dengan status kode 400.HTTP status 404 jika pengguna tidak ditemukan. Jika terjadi kesalahan server, akan mengembalikan pesan "Internal Server Error" dengan status kode 500.

## Setup Prisma

Untuk mengatur Prisma ORM, ikuti langkah-langkah berikut:

1. Inisialisasi Prisma:

```bash
npx prisma init
```

Perintah ini akan membuat folder `prisma` dan file `.env` di direktori project Kamu.

2. Konfigurasi `.env`:
   Isi file `.env` dengan `DATABASE_URL` dan `DIRECT_URL` yang sesuai untuk koneksi ke NeonDB.

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
DIRECT_URL="URL_KONEKSI_NEONDB_Kamu"
```

Gantilah `USER`, `PASSWORD`, `HOST`, `PORT`, dan `DATABASE` dengan kredensial database NeonDB Kamu.

3. Migrasi Database:

```bash
npx prisma migrate dev
```

4. Generate Prisma:

```bash
npx prisma generate
```

Perintah ini akan menerapkan skema database yang didefinisikan dalam file `prisma/schema.prisma` ke database Kamu.

## Menjalankan Server

Untuk menjalankan server, pastikan Kamu telah menginstal semua dependensi dengan `npm install`, lalu gunakan perintah:

```bash
npm run dev
```

Pastikan script `dev` telah ditambahkan ke bagian `scripts` dalam file `package.json` Kamu seperti berikut:

```json
"scripts": {
   "dev": "nodemon index.js"
}
```
