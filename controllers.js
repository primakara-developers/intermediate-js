const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

async function getAllBooks(req, res) {
  //read all book table
  try {
    const books = await prisma.book.findMany();
    res.send(books);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
}

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

module.exports = {
  getAllBooks,
  createBook,
  getOneBookById,
  deleteBookById,
  register,
  login,
};
