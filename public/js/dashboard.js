const nameInput = document.getElementById("name");
const categoryInput = document.getElementById("category");
const priceInput = document.getElementById("price");
const stockInput = document.getElementById("stock");

const logoutBtn = document.getElementById("logoutBtn");
const form = document.getElementById("productForm");
const productList = document.getElementById("productList");

const formTitle = document.getElementById("formTitle");
const formDescription = document.getElementById("formDescription");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");

let editingId = null;


// =========================
// LOGOUT
// =========================

logoutBtn.addEventListener("click", async () => {

    await fetch("/api/logout", {
        method: "POST"
    });

    window.location.href = "/login";

});


// =========================
// LOAD PRODUCTS
// =========================

async function loadProducts() {

    const response = await fetch("/api/products");

    const products = await response.json();

    productList.innerHTML = "";

    if (products.length === 0) {

        productList.innerHTML = `
            <div class="empty-products">
                <h3>Belum ada produk</h3>
                <p>Tambahkan produk pertama kamu menggunakan form di atas.</p>
            </div>
        `;

        return;
    }


    products.forEach(product => {

        const formattedPrice = Number(product.price)
            .toLocaleString("id-ID");


        productList.innerHTML += `

            <article class="admin-product-card">

                <div class="admin-product-top">

                    <span class="admin-product-category">
                        ${product.category}
                    </span>

                    <span class="admin-product-id">
                        #${product.id}
                    </span>

                </div>


                <h3>
                    ${product.name}
                </h3>


                <div class="admin-product-price">
                    Rp ${formattedPrice}
                </div>


                <div class="admin-product-stock">

                    <span>
                        Stok
                    </span>

                    <strong>
                        ${product.stock}
                    </strong>

                </div>


                <div class="admin-product-actions">

                    <button
                        class="edit-btn"
                        onclick="editProduct(${product.id})">
                        Edit
                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteProduct(${product.id})">
                        Hapus
                    </button>

                </div>

            </article>

        `;

    });

}


// =========================
// FORM SUBMIT
// =========================

form.addEventListener("submit", async (e) => {

    e.preventDefault();


    if (
        !nameInput.value.trim() ||
        !categoryInput.value.trim() ||
        !priceInput.value ||
        !stockInput.value
    ) {

        alert("Semua field produk wajib diisi.");

        return;
    }


    if (
        Number(priceInput.value) < 0 ||
        Number(stockInput.value) < 0
    ) {

        alert("Harga dan stok tidak boleh negatif.");

        return;
    }


    const body = {

        name: nameInput.value.trim(),

        category: categoryInput.value.trim(),

        price: Number(priceInput.value),

        stock: Number(stockInput.value)

    };


    let response;


    // =========================
    // EDIT MODE
    // =========================

    if (editingId !== null) {

        response = await fetch(
            `/api/products/${editingId}`,
            {
                method: "PUT",

                credentials: "same-origin",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(body)
            }
        );


    // =========================
    // ADD MODE
    // =========================

    } else {

        response = await fetch(
            "/api/products",
            {
                method: "POST",

                credentials: "same-origin",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(body)
            }
        );

    }


    if (!response.ok) {

        const data = await response.json();

        alert(data.message || "Terjadi kesalahan.");

        return;
    }


    resetForm();

    await loadProducts();

});


// =========================
// EDIT PRODUCT
// =========================

async function editProduct(id) {

    const response = await fetch(
        `/api/products/${id}`
    );


    if (!response.ok) {

        alert("Gagal mengambil data produk.");

        return;
    }


    const product = await response.json();


    nameInput.value = product.name;

    categoryInput.value = product.category;

    priceInput.value = product.price;

    stockInput.value = product.stock;


    editingId = id;


    // Change form UI

    formTitle.textContent = "Edit Produk";

    formDescription.textContent =
        `Sedang mengedit ${product.name}.`;

    submitBtn.textContent = "Simpan Perubahan";

    cancelBtn.hidden = false;


    // Scroll to form

    document
        .querySelector(".dashboard-form-section")
        .scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

}


// =========================
// CANCEL EDIT
// =========================

cancelBtn.addEventListener("click", () => {

    resetForm();

});


// =========================
// RESET FORM
// =========================

function resetForm() {

    editingId = null;

    form.reset();

    formTitle.textContent = "Tambah Produk";

    formDescription.textContent =
        "Tambahkan produk baru ke dalam katalog toko.";

    submitBtn.textContent = "Tambah Produk";

    cancelBtn.hidden = true;

}


// =========================
// DELETE PRODUCT
// =========================

async function deleteProduct(id) {

    const confirmed = confirm(
        "Yakin ingin menghapus produk ini?"
    );


    if (!confirmed) {
        return;
    }


    const response = await fetch(
        `/api/products/${id}`,
        {
            method: "DELETE",
            credentials: "same-origin"
        }
    );


    if (!response.ok) {

        const data = await response.json();

        alert(data.message || "Gagal menghapus produk.");

        return;
    }


    await loadProducts();

}


// =========================
// INITIAL LOAD
// =========================

loadProducts();