- [Library APP](#library-app)
  - [Materi](#materi)
    - [**Debugging 5W + 1H**](#debugging-5w-1h)
    - [**Add Update Book**](#add-update-book)
    - [**Add relation between user with Book (one to many)**](#add-relation-between-user-with-book-one-to-many)
    - [**Auth with http req header with bearer token JWT (middleware)**](#auth-with-http-req-header-with-bearer-token-jwt-middleware)
    - [**New App Flow**](#new-app-flow)
  - [Endpoint API](#endpoint-api)
  - [Penjelasan Kode](#penjelasan-kode)
- [README.md untuk API Manajemen Buku](#readmemd-untuk-api-manajemen-buku) + [1. Mendapatkan Semua Buku `getAllBooks`](#1-mendapatkan-semua-buku-getallbooks) + [2. Menambahkan Buku Baru](#2-menambahkan-buku-baru) + [3. Mendapatkan Buku Berdasarkan ID](#3-mendapatkan-buku-berdasarkan-id) + [4. Menghapus Buku Berdasarkan ID](#4-menghapus-buku-berdasarkan-id) + [5. UpdateBookById](#5-updatebookbyid) + [6. Register](#6-register) + [7. Login](#7-login) + [Middleware Authentication](#middleware-authentication)
  - [Setup Prisma](#setup-prisma)
  - [Menjalankan Server](#menjalankan-server)

<!-- TOC end -->

<!-- TOC --><a name="library-app"></a>

# Library APP

Pertemuan ini memfokuskan pada pemahaman dalam debugging, serta menerapkan route protector dengan memanfaatkan konsep middleware.

<!-- TOC --><a name="materi"></a>

## Materi

<!-- TOC --><a name="debugging-5w-1h"></a>

### **Debugging 5W + 1H**

- Memahami dan menerapkan proses debugging
- Memahami dan Mencari jawaban atas error yang di dapat
- Belajar membaca error di terminal

<!-- TOC --><a name="add-update-book"></a>

### **Add Update Book**

- Menambahkan Fitur Update buku berdasarkan id buku yang ingin di Update

<!-- TOC --><a name="add-relation-between-user-with-book-one-to-many"></a>

### **Add relation between user with Book (one to many)**

- Memahami konsep data relation dalam database sql.
- Implementasi one to many untuk table user dengan book diamana satu user dapat memiliki banyak buku.

<!-- TOC --><a name="auth-with-http-req-header-with-bearer-token-jwt-middleware"></a>

### **Auth with http req header with bearer token JWT (middleware)**

- Membangun fitur authentication dengan token login user dengan JWT
- Mengimplementasikan mekanisme authentication dengan middleware

<!-- TOC --><a name="new-app-flow"></a>

### **New App Flow**

- Memahami flow dari app yang kita buat, bagaimana alur dari route, hingga sampai di function yang di eksekusi

<!-- TOC --><a name="endpoint-api"></a>

## Endpoint API

API ini menyediakan beberapa endpoint berikut:

- `GET /books`: Mendapatkan semua data buku.
- `POST /books/menambah`: Menambahkan data buku baru.
- `PUT /book/:id/edit`: Mengedit Data data buku berdasarkan ID.
- `GET /book/:id`: Mendapatkan data buku berdasarkan ID.
- `DELETE /book/:id`: Menghapus data buku berdasarkan ID.
- `POST /register`: Register user ke data user.
- `POST /login`: Login user dan memeberi accessToken untuk mendapatkan access ke API.

<!-- TOC --><a name="penjelasan-kode"></a>

## Penjelasan Kode

Kode ini menggunakan Node.js dan Express.js untuk menyediakan API, dan Prisma sebagai ORM untuk interaksi dengan database. Setiap endpoint memanfaatkan async/await untuk penanganan proses asinkronus.

<!-- TOC --><a name="readmemd-untuk-api-manajemen-buku"></a>

# README.md untuk API Manajemen Buku

<!-- TOC --><a name="1-mendapatkan-semua-buku-getallbooks"></a>

### 1. Mendapatkan Semua Buku `getAllBooks`

**Endpoint**: `GET /books`

- **Headers** :

  - token

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

<!-- TOC --><a name="2-menambahkan-buku-baru"></a>

### 2. Menambahkan Buku Baru

**Endpoint**: `POST /books/menambah`

- **Headers** :
  - token
- **Code** :

```js
async function createBook(req, res) {
  if (!req.body.judul) {
    return res.status(400).send({ message: "Judul diperlukan" });
  }
  if (!req.body.halaman) {
    return res.status(400).send({ message: "Halaman diperlukan" });
  }
  if (!req.body.author) {
    return res.status(400).send({ message: "Author diperlukan" });
  }
  if (!req.body.deskripsi) {
    return res.status(400).send({ message: "Deskripsi diperlukan" });
  }
  if (!req.body.uploader) {
    return res.status(400).send({ message: "Uploader diperlukan" });
  }

  const { judul, halaman, author, deskripsi, uploader } = req.body;

  const { userId } = req.user;

  try {
    const newBook = await prisma.book.create({
      data: {
        judul: judul,
        halaman: Number(halaman),
        author,
        deskripsi,
        uploader,
        userId,
      },
    });

    res.status(201).send(newBook);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Gagal menambahkan books" });
  }
}
```

- **Alur Kode**
  - Pertama-tama memeriksa apakah judul, halaman, author, deskripsi, dan uploader ada dalam body request. Jika salah satu dari mereka tidak ada, fungsi akan mengembalikan response dengan status 400 dan pesan error yang sesuai.
  - Menyimpan buku baru ke dalam database.
  - Mengembalikan data buku yang baru dibuat.
- **Deskripsi**: Endpoint ini digunakan untuk menambahkan buku baru ke dalam database.
- **Body Request**:
  - `judul`: Judul dari buku yang ingin ditambahkan.
  - `halaman`: Jumlah halaman dari buku tersebut.
  - `author`: Penulis dari buku tersebut.
  - `deskripsi`: Deskripsi dari buku tersebut.
  - `uploader`: Deskripsi dari buku tersebut.
- **Return**: Mengembalikan objek buku yang baru dibuat dengan status kode 201 jika berhasil. Jika gagal, akan mengembalikan pesan "Gagal menambahkan buku" dengan status kode 500.

<!-- TOC --><a name="3-mendapatkan-buku-berdasarkan-id"></a>

### 3. Mendapatkan Buku Berdasarkan ID

**Endpoint**: `GET /book/:id`

- **Headers** :
  - token
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

<!-- TOC --><a name="4-menghapus-buku-berdasarkan-id"></a>

### 4. Menghapus Buku Berdasarkan ID

**Endpoint**: `DELETE /book/:id`

- **Headers** :
  - token
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

<!-- TOC --><a name="5-updatebookbyid"></a>

### 5. UpdateBookById

**Endpoint**: `PUT /book/:id/edit`

- **Headers** :
  - token
- **Code** :

```js
async function updateBookById(req, res) {
  // Validasi input dari req.body
  const { judul, halaman, author, deskripsi, uploader } = req.body;
  const { id } = req.params;

  const { userId } = req.user;

  // Cek apakah semua field ada
  if (!judul || !halaman || !author || !deskripsi || !uploader) {
    return res.status(400).json({ error: "Semua field harus diisi" });
  }

  try {
    // Cari buku berdasarkan id
    const book = await prisma.book.findUnique({
      where: { id: parseInt(id) },
    });

    // Jika buku tidak ditemukan
    if (!book) {
      return res.status(404).json({ error: "Buku tidak ditemukan" });
    }

    if (book.userId !== userId) {
      return res
        .status(403)
        .json({ error: "Anda tidak memiliki akses untuk mengupdate buku ini" });
    }

    // Update buku berdasarkan id
    const updatedBook = await prisma.book.update({
      where: { id: parseInt(id) },
      data: {
        judul,
        halaman: Number(halaman),
        author,
        deskripsi,
        uploader,
      },
    });

    // Kirim response status 200 dengan data buku yang sudah diupdate
    return res.status(200).json(updatedBook);
  } catch (error) {
    console.error("Error updating book:", error);
    return res
      .status(500)
      .json({ error: "Terjadi kesalahan saat mengupdate buku" });
  }
}
```

- **Alur Kode** :
  - Menerima input dari `req.body` dan `req.params`.
  - Memeriksa apakah semua field ada.
  - Mencari buku berdasarkan ID.
  - Memeriksa apakah buku tersebut ditemukan dan pengguna memiliki akses untuk mengupdate buku ini.
  - Mengupdate buku dari database jika ditemukan dan pengguna memiliki akses.
  - Mengembalikan buku yang sudah diupdate.
- **Deskripsi**: Endpoint ini digunakan untuk mengedit buku dari database berdasarkan ID yang diberikan.
- **Parameter URL**:
  - `id`: ID dari buku yang ingin di edit.
- **Return**:
  - Mengembalikan buku yang sudah diupdate dengan status kode 200 jika proses update berhasil.
  - Jika data yang diperlukan tidak ada dalam body request, akan mengembalikan pesan "Semua field harus diisi" dengan status kode 400.
  - Jika buku tidak ditemukan, akan mengembalikan pesan "Buku tidak ditemukan" dengan status kode 404.
  - Jika pengguna tidak memiliki akses untuk mengupdate buku, akan mengembalikan pesan "Anda tidak memiliki akses untuk mengupdate buku ini" dengan status kode 403.
  - Jika terjadi kesalahan saat mencoba mengupdate buku, akan mengembalikan pesan "Terjadi kesalahan saat mengupdate buku" dengan status kode 500.

<!-- TOC --><a name="6-register"></a>

### 6. Register

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

<!-- TOC --><a name="7-login"></a>

### 7. Login

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

<!-- TOC --><a name="middleware-authentication"></a>

### Middleware Authentication

Middleware ini digunakan untuk memverifikasi token JWT yang dikirimkan melalui header `token`. Jika token tidak ada atau tidak valid, request akan ditolak, bagian authentication middleware ini bisa di lihat dalam file routes.js.

- **Code** :

```js
route.use((req, res, next) => {
  const authHeader = req.headers["token"];
  const token = authHeader;

  if (token == null) {
    return res.status(401).json({ error: "Token tidak ada, akses ditolak" });
  }
  const verifryToken = jwt.verify(token, process.env.JWT_SECRET);
  if (!verifryToken) {
    return res.status(403).json({ error: "Token tidak valid" });
  } else {
    req.user = verifryToken;
    next();
  }
});
```

<!-- TOC --><a name="setup-prisma"></a>

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

<!-- TOC --><a name="menjalankan-server"></a>

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
