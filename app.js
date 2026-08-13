const bcrypt = require("bcryptjs");
require("dotenv").config();

const db = require("./config/db");
const express = require("express");
const path = require("path");
const session = require("express-session");
const authMiddleware = require("./middleware/authMiddleware");
const loggerMiddleware = require("./middleware/loggerMiddleware");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(loggerMiddleware);

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.get("/", async (req, res) => {

    try {

        const result = await db.query(
            "SELECT * FROM products ORDER BY id LIMIT 3"
        );

        res.render("home", {
            products: result.rows
        });

    } catch (error) {

        console.error(error);
        res.status(500).send("Gagal mengambil produk");

    }

});

app.get("/produk", (req, res) => {
    res.render("products");
});

app.get("/produk/:id", async (req, res) => {

    try {

        const result = await db.query(
            "SELECT * FROM products WHERE id = $1",
            [req.params.id]
        );

        const product = result.rows[0];

        if (!product) {
            return res.render("detail", {
                product: null
            });
        }

        res.render("detail", {
            product
        });

    } catch (error) {

        console.error(error);

        res.status(500).send("Gagal mengambil data produk");

    }

});

app.get("/tanya-ai", (req, res) => {

    res.render("ai");

});

app.get("/api/products", async (req, res) => {

    try {

        const result = await db.query(
            "SELECT * FROM products ORDER BY id"
        );

        res.json(result.rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            status: "error",
            message: "Gagal mengambil produk"
        });

    }

});

app.get("/api/products/:id", async (req, res) => {

    try {

        const result = await db.query(
            "SELECT * FROM products WHERE id = $1",
            [req.params.id]
        );

        if (result.rows.length === 0) {

            return res.status(404).json({
                status: "error",
                message: "Produk tidak ditemukan"
            });

        }

        res.json(result.rows[0]);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            status: "error",
            message: "Gagal mengambil produk"
        });

    }

});

app.post("/api/products", authMiddleware, async (req, res) => {

    try {

        const { name, category, price, stock } = req.body;

        const result = await db.query(
            `INSERT INTO products (name, category, price, stock)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [
                name,
                category,
                Number(price),
                Number(stock)
            ]
        );

        res.status(201).json({
            status: "success",
            data: result.rows[0]
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            status: "error",
            message: "Gagal menambahkan produk"
        });

    }

});

app.put("/api/products/:id", authMiddleware, async (req, res) => {

    try {

        const { name, category, price, stock } = req.body;

        const result = await db.query(
            `UPDATE products
             SET name = $1,
                 category = $2,
                 price = $3,
                 stock = $4
             WHERE id = $5
             RETURNING *`,
            [
                name,
                category,
                Number(price),
                Number(stock),
                req.params.id
            ]
        );

        if (result.rows.length === 0) {

            return res.status(404).json({
                status: "error",
                message: "Produk tidak ditemukan"
            });

        }

        res.json({
            status: "success",
            data: result.rows[0]
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            status: "error",
            message: "Gagal mengubah produk"
        });

    }

});

app.delete("/api/products/:id", authMiddleware, async (req, res) => {

    try {

        const result = await db.query(
            "DELETE FROM products WHERE id = $1 RETURNING *",
            [req.params.id]
        );

        if (result.rows.length === 0) {

            return res.status(404).json({
                status: "error",
                message: "Produk tidak ditemukan"
            });

        }

        res.json({
            status: "success",
            message: "Produk berhasil dihapus",
            data: result.rows[0]
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            status: "error",
            message: "Gagal menghapus produk"
        });

    }

});

app.post("/api/chat", (req, res) => {

    const { message } = req.body;

    if (!message || !message.trim()) {
        return res.status(400).json({
            status: "error",
            message: "Pertanyaan wajib diisi"
        });
    }

    const question = message.toLowerCase();

    let reply;

    if (
        question.includes("jam buka") ||
        question.includes("buka")
    ) {
        reply = "Toko Sembako Ariesta buka setiap hari pukul 08.00 - 21.00 WIB.";
    }

    else if (
        question.includes("ongkir") ||
        question.includes("antar") ||
        question.includes("delivery")
    ) {
        reply = "Tersedia layanan antar. Ongkir menyesuaikan jarak pengantaran.";
    }

    else if (
        question.includes("bayar") ||
        question.includes("pembayaran")
    ) {
        reply = "Kami menerima pembayaran tunai dan transfer.";
    }

    else if (
        question.includes("stok") ||
        question.includes("tersedia")
    ) {
        reply = "Untuk mengecek stok produk, silakan lihat halaman Produk.";
    }

    else {
        reply = "Maaf, saya belum memahami pertanyaan tersebut. Silakan tanyakan tentang jam buka, ongkir, pembayaran, atau stok.";
    }

    res.json({
        status: "success",
        data: {
            reply
        }
    });

});

app.post("/api/login", async (req, res) => {

    const result = await db.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
    );

    if (result.rows.length === 0) {

        return res.status(401).json({
            status: "error",
            message: "Username atau password salah"
        });

    }

    const user = result.rows[0];

    const passwordMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!passwordMatch) {

        return res.status(401).json({
            status: "error",
            message: "Username atau password salah"
        });

    }

    req.session.user = {
        id: user.id,
        username: user.username
    };

    res.json({
        status: "success",
        message: "Login berhasil"
    });

});

app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/api/logout", (req, res) => {

    req.session.destroy(() => {

        res.json({
            status: "success",
            message: "Logout berhasil"
        });

    });

});

app.get("/dashboard", authMiddleware, (req, res) => {
    res.render("dashboard");
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});

