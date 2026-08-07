const express = require("express");
const path = require("path");
const products = require("./data/products");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

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

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});