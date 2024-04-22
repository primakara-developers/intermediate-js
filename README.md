# library-app

# Studi Kasus: Express, Rest API, CRUD no Database

Proyek ini adalah studi kasus yang melibatkan penggunaan Express.js untuk membangun REST API dan melakukan operasi CRUD tanpa database. Waktu yang diperlukan untuk menyelesaikan studi kasus ini adalah sekitar 2-3 jam.

## Materi

### Setup Awal

- Menginstal Express.js
- Menjalankan aplikasi Express.js pertama

### Library-App

- Membangun aplikasi sederhana untuk mengelola buku
- Mendefinisikan model data (ERD, Data Structure, Array Of Object)
- Menangani permintaan HTTP (GET, POST, PUT, DELETE)
- Menerapkan CRUD (Create, Read, Update, Delete) tanpa database

### Express Intro

- Konsep dasar Express.js
- Menangani rute (route) dan permintaan (req)

### REST API & CRUD no DB (http method)

- Memahami prinsip-prinsip REST API
- Menerapkan CRUD tanpa database menggunakan metode HTTP

# Express.js REST API - CRUD tanpa Database index.js exp

Proyek ini adalah aplikasi sederhana yang dibangun dengan Express.js untuk melakukan operasi CRUD (Create, Read, Update, Delete) pada array buku tanpa menggunakan database.

## Setup

1. Install dependencies dengan menjalankan `npm install` atau `yarn install`.
2. Jalankan aplikasi dengan `node index.js`.

## Endpoints

### GET /books

Mengembalikan daftar semua buku.

### POST /books/menambah

Menambahkan buku baru ke daftar. Body request harus berisi objek buku dengan properti `judul`, `halaman`, dan `author`.

### GET /books/:title

Mengembalikan buku berdasarkan judulnya. Jika buku tidak ditemukan, mengembalikan status 404 dan pesan "Buku tidak ditemukan".

### DELETE /books/:judul

Menghapus buku berdasarkan judulnya. Jika buku berhasil dihapus, mengembalikan pesan "Buku berhasil dihapus". Jika buku tidak ditemukan, mengembalikan status 404 dan pesan "Buku tidak ditemukan".

## Menjalankan Aplikasi

Aplikasi ini berjalan pada port 3000. Anda dapat mengaksesnya di `http://localhost:3000`.
