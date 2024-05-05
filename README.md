# Library APP

Pada sesi ini kita akan membahas topik tentang Basis Data, Database, Object-Relational Mapping (ORM), serta penggunaannya bersama Rest API. Kita akan belajar mengenai konsep-konsep ini dan bagaimana mengimplementasikannya dalam proyek JavaScript kita.

## Materi

### Pengenalan Basis Data SQL Menggunakan Excel

- Memahami konsep basis data dengan menggunakan perangkat yang sudah familiar, yaitu Excel.
- Mengenalkan jenis-jenis data dalam basis data.

### Membuat Tabel Buku

- Belajar cara menambahkan tabel buku ke dalam basis data.
- Praktek menentukan struktur tabel dan menambahkan data.

### Pengenalan NeonDB

- Mengenalkan NeonDB sebagai Database.
- Belajar cara kerja dan keunggulan menggunakan NeonDB.

### Pengenalan Prisma

- Memperkenalkan Prisma sebagai sebuah ORM.
- Belajar cara mengintegrasikan Prisma ke dalam proyek JavaScript.

### Implementasi Database dalam CRUD Terakhir

- Mengimplementasikan pengetahuan database yang telah dipelajari ke dalam aplikasi CRUD.
- Menerapkan operasi Create, Read, Update, dan Delete pada database melalui ORM.

### Pengantar Respons HTTP

- Memahami konsep dan struktur respons HTTP.
- Belajar cara mengirim dan menerima data melalui HTTP dalam format yang tepat.

## Endpoint API

API ini menyediakan beberapa endpoint berikut:

- `GET /books`: Mendapatkan semua data buku.
- `POST /books/menambah`: Menambahkan data buku baru.
- `GET /book/:id`: Mendapatkan data buku berdasarkan ID.
- `DELETE /book/:id`: Menghapus data buku berdasarkan ID.

## Penjelasan Kode

Kode ini menggunakan Node.js dan Express.js untuk menyediakan API, dan Prisma sebagai ORM untuk interaksi dengan database. Setiap endpoint memanfaatkan async/await untuk penanganan proses asinkronus.

# README.md untuk API Manajemen Buku

### 1. Mendapatkan Semua Buku

**Endpoint**: `GET /books`

- **Code** :

```js
app.get("/books", async (req, res) => {
  //read all book table
  try {
    const books = await prisma.book.findMany();
    res.send(books);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});
```

- **Deskripsi**: Endpoint ini digunakan untuk mengambil semua data buku yang tersimpan dalam database.
- **Return**: Mengembalikan array yang berisi objek buku jika berhasil. Jika terjadi kesalahan server, akan mengembalikan pesan "Internal Server Error" dengan status kode 500.

### 2. Menambahkan Buku Baru

**Endpoint**: `POST /books/menambah`

- **Code** :

```js
app.post("/books/menambah", async (req, res) => {
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
});
```

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
app.get("/book/:id", async (req, res) => {
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
});
```

- **Deskripsi**: Endpoint ini digunakan untuk mengambil data buku berdasarkan ID yang diberikan.
- **Parameter URL**:
  - `id`: ID dari buku yang ingin diakses.
- **Return**: Mengembalikan objek buku yang sesuai dengan ID yang diminta. Jika buku tidak ditemukan, akan mengembalikan pesan "Buku tidak ditemukan" dengan status kode 404. Jika terjadi kesalahan server, akan mengembalikan pesan "Terjadi kesalahan server" dengan status kode 500.

### 4. Menghapus Buku Berdasarkan ID

**Endpoint**: `DELETE /book/:id`

- **Code** :

```js
app.delete("/book/:id", async (req, res) => {
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
});
```

- **Deskripsi**: Endpoint ini digunakan untuk menghapus buku dari database berdasarkan ID yang diberikan.
- **Parameter URL**:
  - `id`: ID dari buku yang ingin dihapus.
- **Return**: Mengembalikan pesan "Buku berhasil dihapus" jika proses penghapusan berhasil. Jika buku tidak ditemukan, akan mengembalikan pesan "Buku tidak ditemukan" dengan status kode 404. Jika terjadi kesalahan server, akan mengembalikan pesan "Terjadi kesalahan server" dengan status kode 500.

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
