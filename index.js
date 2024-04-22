const express = require("express");
const app = express();
const port = 3000;

// Middleware untuk membaca body dari request
app.use(express.json());

let listBuku = [
  { judul: "Mari Ngoding", halaman: 100, author: "Dewa" },
  { judul: "Petualangan Sang Penjelajah", halaman: 250, author: "Naya" },
  { judul: "Kisah Kecil Si Pemberani", halaman: 150, author: "Budi" },
  { judul: "Misteri Pulau Tersembunyi", halaman: 200, author: "Citra" },
];

app.get("/books", (req, res) => {
  res.send(listBuku);
});

app.post("/books/menambah", (req, res) => {
  listBuku.push(req.body);
  res.send("Berhasil menambahkan data");
});

// Endpoint untuk mengakses buku berdasarkan judulnya
app.get("/books/:title", (req, res) => {
  const judul = req.params.title;
  const buku = listBuku.find((buku) => buku.judul === judul);
  if (buku) {
    res.send(buku);
  } else {
    res.status(404).send("Buku tidak ditemukan");
  }
});

// Endpoint untuk menghapus buku berdasarkan judulnya
app.delete("/books/:judul", (req, res) => {
  const judul = req.params.judul;
  const index = listBuku.findIndex((buku) => buku.judul === judul);
  if (index !== -1) {
    listBuku.splice(index, 1);
    res.send("Buku berhasil dihapus");
  } else {
    res.status(404).send("Buku tidak ditemukan");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
