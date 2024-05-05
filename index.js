const express = require("express");
const app = express();
const port = 3000;

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

app.use(express.json());

app.get("/books", async (req, res) => {
  //read all book table
  try {
    const books = await prisma.book.findMany();
    res.send(books);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

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

// // Endpoint untuk mengakses buku berdasarkan idnya
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

// // Endpoint untuk menghapus buku berdasarkan judulnya
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
