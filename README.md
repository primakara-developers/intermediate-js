<!-- TOC start (generated with https://github.com/derlin/bitdowntoc) -->

- [Library APP](#library-app)
  - [Materi](#materi)
    - [Git reposit](#git-reposit)
    - [Deploy Vercel](#deploy-vercel)
    - [Image Upload](#image-upload)
  - [Endpoint API](#endpoint-api)
  - [Penjelasan Kode](#penjelasan-kode)
- [README.md untuk API Manajemen Buku](#readmemd-untuk-api-manajemen-buku) + [1. Mendapatkan Semua Buku `getAllBooks`](#1-mendapatkan-semua-buku-getallbooks) + [2. Menambahkan Buku Baru](#2-menambahkan-buku-baru) + [3. Mendapatkan Buku Berdasarkan ID](#3-mendapatkan-buku-berdasarkan-id) + [4. Menghapus Buku Berdasarkan ID](#4-menghapus-buku-berdasarkan-id) + [5. UpdateBookById](#5-updatebookbyid) + [6. Register](#6-register) + [7. Login](#7-login) + [8. Membuat Profil User](#8-membuat-profil-user) + [9. Mendapatkan Detail Profil User](#9-mendapatkan-detail-profil-user) + [10. Mengedit Detail Profil User](#10-mengedit-detail-profil-user) + [11. Mengedit Detail Profil User](#11-mengedit-detail-profil-user) + [Middleware Authentication](#middleware-authentication) + [Middleware Cloudinary](#middleware-cloudinary) - [Cloudinary Configuration](#cloudinary-configuration) - [Setup](#setup) - [Kode](#kode) - [Multer and Cloudinary Configuration](#multer-and-cloudinary-configuration) - [Setup](#setup-1) - [Kode](#kode-1) - [Usage](#usage)
  - [Setup Prisma](#setup-prisma)
  - [Menjalankan Server](#menjalankan-server)

<!-- TOC end -->

<!-- TOC --><a name="library-app"></a>

# Library APP

Di `meet-6` kita akan membahas mengenai deploy ke vercel dan beberapa git fitur yang bisa dipakai, namun semua hal itu tidak akan aku masukin ke readme nanti teman teman bisa baca lewat notenya saja

<!-- TOC --><a name="materi"></a>

## Materi

<!-- TOC --><a name="git-reposit"></a>

### Git reposit

    - readme
    - env.example and why

<!-- TOC --><a name="deploy-vercel"></a>

### Deploy Vercel

<!-- TOC --><a name="image-upload"></a>

### Image Upload

    - intro File upload
    - intro multer
    - intro cloudinary
    - update Create book & Update book

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
- `POST /profile`: Membuat profile atau data diri user yang telah login ke dalam app.
- `GET /profile`: Mendapatkan detail profile atau data diri user yang telah login ke dalam app.
- `PUT /profile`: Mengedit detail profile atau data diri user yang telah login ke dalam app.

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
        imageUrl: req.file.path,
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
  - Mengembalikan data buku yang baru dibuat dengan status code 201.
- **Deskripsi**: Endpoint ini digunakan untuk menambahkan buku baru ke dalam database.
- **Body Request**:
  - `judul`: Judul dari buku yang ingin ditambahkan.
  - `halaman`: Jumlah halaman dari buku tersebut.
  - `author`: Penulis dari buku tersebut.
  - `deskripsi`: Deskripsi dari buku tersebut.
  - `uploader`: Deskripsi dari buku tersebut.
  - `imageUrl`: Link image dari cloudinary,
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
      include: {
        likes: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!book) {
      return res.status(404).send({ message: "Buku tidak ditemukan" });
    }

    const totalLikes = book.likes.length;
    const likedBy = book.likes.map((like) => ({
      id: like.user.id,
      email: like.user.email,
    }));

    res.send({
      ...book,
      totalLikes,
      likedBy,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Terjadi kesalahan server" });
  }
}
```

- **Alur Kode** :

  - Fungsi ini pertama-tama mengekstrak `bookId` dari `req.params`.
  - Fungsi mencoba mencari buku dengan `bookId` yang diberikan. Jika buku tidak ditemukan, fungsi akan mengembalikan response dengan status 404 dan pesan error "Buku tidak ditemukan".
  - Jika buku ditemukan, fungsi akan menghitung total likes dan membuat array `likedBy` yang berisi informasi pengguna yang telah like buku ini.
  - Fungsi kemudian mengembalikan response dengan buku tersebut, total likes, dan array `likedBy`.
  - Jika terjadi error saat mencoba melakukan operasi ini, fungsi akan mengembalikan response dengan status 500 dan pesan error "Terjadi kesalahan server".

- **Deskripsi**: Endpoint ini digunakan untuk mengambil data buku berdasarkan ID yang diberikan.
- **Parameter URL**:
  - `id`: ID dari buku yang ingin diakses.
- **Return**:
  - Jika buku ditemukan, fungsi akan mengembalikan response dengan buku tersebut, total likes, dan array `likedBy`.
  - Jika buku tidak ditemukan, fungsi akan mengembalikan response dengan status 404 dan pesan error "Buku tidak ditemukan".
  - Jika terjadi error saat mencoba melakukan operasi ini, fungsi akan mengembalikan response dengan status 500 dan pesan error "Terjadi kesalahan server".

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
    return res.status(500).json({ error: "Terjadi kesalahan server" });
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

<!-- TOC --><a name="8-membuat-profil-user"></a>

### 8. Membuat Profil User

**Endpoint**: `POST /profile`

- **Headers** :
  - token
- **Code** :

```js
async function createUserProfile(req, res) {
  if (!req.body.nama) {
    return res.status(400).send({ message: "Name Diperlukan" });
  }
  if (!req.body.alamat) {
    return res.status(400).send({ message: "Alamat Diperlukan" });
  }
  if (!req.body.bio) {
    return res.status(400).send({ message: "Bio Diperlukan" });
  }
  const { nama, alamat, bio } = req.body;

  const { userId } = req.user;

  try {
    const newProfile = await prisma.profile.create({
      data: {
        nama,
        alamat,
        bio,
        userId,
      },
    });

    res.status(201).send(newProfile);
  } catch (error) {
    console.log("create Profile Error", error);
    res.status(500).send({ message: "Gagal menambahkan profile" });
  }
}
```

- **Alur Kode** :
  - Pertama-tama memeriksa apakah nama, alamat,dan bio ada dalam body request. Jika salah satu dari mereka tidak ada, fungsi akan mengembalikan response dengan status 400 dan pesan error yang sesuai.
  - Menyimpan profile user ke dalam database.
  - Mengembalikan data profile yang baru dibuat.
- **Deskripsi**: Endpoint ini digunakan untuk membuat profil user ke dalam database.
- **Return**: Mengembalikan objek profile yang baru dibuat dengan status kode 201 jika berhasil. Jika gagal, akan mengembalikan pesan "Gagal menambahkan profile" dengan status kode 500.

<!-- TOC --><a name="9-mendapatkan-detail-profil-user"></a>

### 9. Mendapatkan Detail Profil User

**Endpoint**: `GET /profile`

- **Headers** :
  - token
- **Code** :

```js
async function getUserProfile(req, res) {
  const { userId } = req.user;
  try {
    const profile = await prisma.profile.findUnique({
      where: {
        userId: userId,
      },
    });

    if (profile) {
      res.status(200).json(profile);
    } else {
      res.status(404).json({ message: "Gagal mendapatkan profile" });
    }
  } catch (error) {
    res.status(500).send({ message: "Terjadi kesalahan server" });
  }
}
```

- **Alur Kode** :
  - Mencari profil user di database berdasarkan userId dari token user yang telah di decrypt dari middleware.
  - Memeriksa apakah profil user tersebut ditemukan.
  - Mengembalikan data profil user jika ditemukan.
- **Deskripsi**: Endpoint ini digunakan untuk mengambil profil user berdasarkan userId user yang login.
- **Return**: Mengembalikan objek profil user yang sesuai dengan userId user yang login. Jika profil user tidak ditemukan, akan mengembalikan pesan "Gagal mendapatkan profile" dengan status kode 404. Jika terjadi kesalahan server, akan mengembalikan pesan "Terjadi kesalahan server" dengan status kode 500.

<!-- TOC --><a name="10-mengedit-detail-profil-user"></a>

### 10. Mengedit Detail Profil User

**Endpoint**: `PUT /profile`

- **Headers** :
  - token
- **Code** :

```js
async function updateUserProfile(req, res) {
  try {
    const userId = req.user.userId; // Mengambil userId dari token
    const { nama, alamat, bio } = req.body;

    // Validasi data masuk
    if (!nama || !alamat || !bio) {
      return res.status(400).json({ error: "Semua field harus diisi" });
    }

    // Update profil pengguna
    const updatedProfile = await prisma.profile.update({
      where: { userId: userId },
      data: {
        nama: nama,
        alamat: alamat,
        bio: bio,
      },
    });

    res.json(updatedProfile);
  } catch (error) {
    res.status(500).json({ error: "Terjadi kesalahan server" });
  }
}
```

- **Alur Kode** :
  - Memeriksa apakah semua field yang diperlukan ada.
  - Mengupdate profil user dari database jika ditemukan dan pengguna memiliki akses.
  - Mengembalikan data profil user yang telah di update.
- **Deskripsi**: Endpoint ini digunakan untuk mengedit profil user berdasarkan userId user yang login.
- **Return**: Mengembalikan objek profil user yang telah di update dengan userId user yang login. Jika terjadi kesalahan server, akan mengembalikan pesan "Terjadi kesalahan server" dengan status kode 500.

<!-- TOC --><a name="11-mengedit-detail-profil-user"></a>

### 11. Mengedit Detail Profil User

**Endpoint**: `POST /like/:bookId`

- **Headers** :
  - token
- **Code** :

```js
async function likeOrDislike(req, res) {
  const userId = req.user.userId;
  const bookId = parseInt(req.params.bookId);

  try {
    // Cek apakah buku dengan bookId ada
    const book = await prisma.book.findUnique({
      where: { id: bookId },
    });

    if (!book) {
      return res.status(404).json({ error: "Buku tidak ditemukan" });
    }

    // Cek apakah user sudah me-like buku ini
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_bookId: {
          userId: userId,
          bookId: bookId,
        },
      },
    });

    if (existingLike) {
      // Jika sudah di-like, lakukan dislike (hapus like)
      await prisma.like.delete({
        where: {
          userId_bookId: {
            userId: userId,
            bookId: bookId,
          },
        },
      });
      return res.status(200).json({ message: "Buku telah di-dislike" });
    } else {
      // Jika belum di-like, lakukan like
      await prisma.like.create({
        data: {
          user: {
            connect: { id: userId },
          },
          book: {
            connect: { id: bookId },
          },
        },
      });
      return res.status(200).json({ message: "Buku telah di-like" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
}
```

- **Alur Kode** :

  - Fungsi ini pertama-tama mengekstrak `userId` dari `req.user` dan `bookId` dari `req.params`.
  - Fungsi mencoba mencari buku dengan `bookId` yang diberikan. Jika buku tidak ditemukan, fungsi akan mengembalikan response dengan status 404 dan pesan error "Buku tidak ditemukan".
  - Fungsi kemudian mencoba mencari like yang sudah ada dari user ini untuk buku ini.
  - Jika like sudah ada, fungsi akan menghapus like tersebut dan mengembalikan response dengan status 200 dan pesan "Buku telah di-dislike".
  - Jika like belum ada, fungsi akan membuat like baru dan mengembalikan response dengan status 200 dan pesan "Buku telah di-like".
  - Jika terjadi error saat mencoba melakukan operasi ini, fungsi akan mengembalikan response dengan status 500 dan pesan error "Terjadi kesalahan pada server".

- **Deskripsi**: Endpoint ini digunakan untuk menyukai atau membatalkan menyukai buku berdasarkan parameter bookId.
- **Return**:
  - Jika buku tidak ditemukan, fungsi akan mengembalikan response dengan status 404 dan pesan error "Buku tidak ditemukan".
  - Jika like sudah ada dan berhasil dihapus, fungsi akan mengembalikan response dengan status 200 dan pesan "Buku telah di-dislike".
  - Jika like belum ada dan berhasil dibuat, fungsi akan mengembalikan response dengan status 200 dan pesan "Buku telah di-like".
  - Jika terjadi error saat mencoba melakukan operasi ini, fungsi akan mengembalikan response dengan status 500 dan pesan error "Terjadi kesalahan pada server".

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

<!-- TOC --><a name="middleware-cloudinary"></a>

### Middleware Cloudinary

<!-- TOC --><a name="cloudinary-configuration"></a>

#### Cloudinary Configuration

File `cloudinaryConfig.js` berisi konfigurasi untuk layanan Cloudinary, yang digunakan untuk mengunggah dan mengelola file media seperti gambar.

<!-- TOC --><a name="setup"></a>

#### Setup

1. Install package `cloudinary` dengan menjalankan `npm install cloudinary` atau `yarn add cloudinary`.
2. Buat file `.env` di root proyek dan tambahkan variabel berikut:
   - `CLOUDINARY_CLOUD_NAME`: Nama cloud Anda di Cloudinary.
   - `CLOUDINARY_API_KEY`: API key Anda di Cloudinary.
   - `CLOUDINARY_API_SECRET`: API secret Anda di Cloudinary.

<!-- TOC --><a name="kode"></a>

#### Kode

```javascript
// cloudinaryConfig.js
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;
```

<!-- TOC --><a name="multer-and-cloudinary-configuration"></a>

#### Multer and Cloudinary Configuration

File `multerConfig.js` berisi konfigurasi untuk layanan Multer dan Cloudinary, yang digunakan untuk mengunggah dan mengelola file media seperti gambar.

<!-- TOC --><a name="setup-1"></a>

#### Setup

1. Install package `multer` dan `multer-storage-cloudinary` dengan menjalankan `npm install multer multer-storage-cloudinary` atau `yarn add multer multer-storage-cloudinary`.
2. Pastikan Anda telah mengatur konfigurasi Cloudinary di file `cloudinaryConfig.js`.

<!-- TOC --><a name="kode-1"></a>

#### Kode

```javascript
// multerConfig.js
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinaryConfig");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "books", // Nama folder di Cloudinary
    allowed_formats: ["jpg", "png"],
  },
});

const parser = multer({ storage: storage });

module.exports = parser;
```

Dalam kode ini, kita mengimpor modul `multer`, `multer-storage-cloudinary`, dan konfigurasi `cloudinary` yang telah kita set sebelumnya.

Kemudian, kita membuat instance baru dari `CloudinaryStorage` dan mengkonfigurasinya dengan objek `cloudinary` dan parameter tambahan. Parameter ini mencakup `folder`, yang merupakan nama folder di mana file akan disimpan di `Cloudinary`, dan `allowed_formats`, yang merupakan array format file yang diperbolehkan.

Setelah itu, kita membuat `parser` dengan menggunakan `multer` dan konfigurasi `storage` yang telah kita buat. `parser` ini kemudian diekspor sehingga dapat digunakan di bagian lain dari aplikasi kita untuk mengunggah file.

<!-- TOC --><a name="usage"></a>

#### Usage

Teman teman bisa memakai middlware file upload clounarynya sebagai middleware dan jangan lupa di import juga

```js
route.post("/books/menambah", parser.single("image"), createBook);
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
