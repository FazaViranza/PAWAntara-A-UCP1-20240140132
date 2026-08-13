const nameInput = document.getElementById("name");
const categoryInput = document.getElementById("category");
const priceInput = document.getElementById("price");
const stockInput = document.getElementById("stock");

const logoutBtn = document.getElementById("logoutBtn");
const form = document.getElementById("productForm");
const productList = document.getElementById("productList");

let editingId = null;


logoutBtn.addEventListener("click", async () => {

    await fetch("/api/logout", {
        method: "POST"
    });

    window.location.href = "/login";

});


async function loadProducts() {

    const response = await fetch("/api/products");

    const products = await response.json();

    productList.innerHTML = "";

    products.forEach(product => {

        productList.innerHTML += `

            <div>

                <h3>${product.name}</h3>

                <p>${product.category}</p>

                <p>Rp ${product.price}</p>

                <p>Stock : ${product.stock}</p>

                <button onclick="editProduct(${product.id})">
                    Edit
                </button>

                <button onclick="deleteProduct(${product.id})">
                    Delete
                </button>

            </div>

            <hr>

        `;

    });

}


form.addEventListener("submit", async (e) => {

    e.preventDefault();

    if (
        !nameInput.value.trim() ||
        !categoryInput.value.trim() ||
        !priceInput.value ||
        !stockInput.value
    ) {
        alert("Semua field produk wajib diisi");
        return;
    }

    if (
        Number(priceInput.value) < 0 ||
        Number(stockInput.value) < 0
    ) {
        alert("Harga dan stok tidak boleh negatif");
        return;
    }

    const body = {

        name: nameInput.value,

        category: categoryInput.value,

        price: priceInput.value,

        stock: stockInput.value

    };


    if (editingId) {

        await fetch(`/api/products/${editingId}`, {

            method: "PUT",

            credentials: "same-origin",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(body)

        });

        editingId = null;

    } else {

        await fetch("/api/products", {

            method: "POST",

            credentials: "same-origin",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(body)

        });

    }


    form.reset();

    loadProducts();

});


async function editProduct(id) {

    const response = await fetch(`/api/products/${id}`);

    const product = await response.json();

    nameInput.value = product.name;
    categoryInput.value = product.category;
    priceInput.value = product.price;
    stockInput.value = product.stock;

    editingId = id;

}


async function deleteProduct(id) {

    const confirmed = confirm("Yakin ingin menghapus produk ini?");

    if (!confirmed) {
        return;
    }

    await fetch(`/api/products/${id}`, {

        method: "DELETE",

        credentials: "same-origin"

    });

    loadProducts();

}


loadProducts();