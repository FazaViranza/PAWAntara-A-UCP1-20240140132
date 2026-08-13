const productList = document.getElementById("productList");

async function loadProducts() {

    const response = await fetch("/api/products");

    const products = await response.json();

    productList.innerHTML = "";

    products.forEach(product => {

        productList.innerHTML += `

            <article>

                <h2>${product.name}</h2>

                <p>Kategori: ${product.category}</p>

                <p>Harga: Rp ${product.price}</p>

                <p>Stok: ${product.stock}</p>

                <a href="/produk/${product.id}">
                    Lihat Detail →
                </a>

            </article>

        `;

    });

}

loadProducts();