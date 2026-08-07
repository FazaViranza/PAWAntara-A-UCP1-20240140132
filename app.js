const express = require("express");
const path = require("path");
const users = require("./data/users");
const products = require("./data/products");
const session = require("express-session");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
    secret: "ariesta-secret",
    resave: false,
    saveUninitialized: false
}));

app.get("/", (req, res) => {
    res.render("home", {
        products: products.slice(0, 3)
    });
});

app.get("/produk", (req, res) => {

    let filteredProducts = [...products];

    const { kategori, search } = req.query;

    if (kategori) {

        filteredProducts = filteredProducts.filter(product =>
            product.category.toLowerCase() === kategori.toLowerCase()
        );

    }

    if (search) {

        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(search.toLowerCase())
        );

    }

    res.render("products", {

        products: filteredProducts

    });

});

app.get("/produk/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const product = products.find(p => p.id === id);

    if (!product) {

        return res.render("detail", {

            product: null

        });

    }

    res.render("detail", {

        product

    });

});

app.get("/tanya-ai", (req, res) => {

    res.render("ai");

});

app.get("/api/products", (req, res) => {

    res.json(products);

});

app.post("/api/login", (req, res) => {

    const { username, password } = req.body;

    const user = users.find(u =>
        u.username === username &&
        u.password === password
    );

    if (!user) {

        return res.status(401).json({
            status: "error",
            message: "Username atau password salah"
        });

    }

    req.session.user = user;

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

app.get("/login", (req, res) => {
    res.render("login");
});