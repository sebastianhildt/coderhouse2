const products = [];

function Product(name, category, price) {
    this.name = name;
    this.category = category;
    this.price = price;
}

function saveProductsToLocalStorage() {
    const productsJSON = JSON.stringify(products);
    localStorage.setItem('products', productsJSON);
}

function loadProductsFromLocalStorage() {
    const productsJSON = localStorage.getItem('products');
    if (productsJSON) {
        products.push(...JSON.parse(productsJSON));
    }
}

function updateProductList() {
    const productListContainer = document.getElementById('productList');
    productListContainer.innerHTML = '';

    products.forEach(product => {
        const listItem = document.createElement('li');
        listItem.textContent = `${product.name} - ${product.category} - $${product.price.toFixed(2)}`;
        productListContainer.appendChild(listItem);
    });
}

function handleAddProduct() {
    const name = prompt('Ingrese el nombre del producto:');
    const category = prompt('Ingrese la categoría del producto:');
    const price = parseFloat(prompt('Ingrese el precio del producto:'));

    const newProduct = new Product(name, category, price);
    products.push(newProduct);

    saveProductsToLocalStorage();
    updateProductList();

    alert('Producto agregado con éxito.');
}

function handleFindCheapestProduct() {
    if (products.length === 0) {
        alert('No hay productos para buscar.');
        return;
    }

    const cheapestProduct = products.reduce((minProduct, currentProduct) => {
        return currentProduct.price < minProduct.price ? currentProduct : minProduct;
    }, products[0]);

    alert(`El producto más barato es: ${JSON.stringify(cheapestProduct, null, 2)}`);
}

function handleFilterProductsByCategory() {
    const categoryToFilter = prompt('Ingrese la categoría para filtrar los productos:');
    const filteredProducts = products.filter(product => product.category === categoryToFilter);

    if (filteredProducts.length === 0) {
        alert(`No hay productos en la categoría ${categoryToFilter}.`);
        return;
    }

    alert(`Productos en la categoría ${categoryToFilter}: ${JSON.stringify(filteredProducts, null, 2)}`);
}

document.addEventListener('DOMContentLoaded', () => {
    loadProductsFromLocalStorage();
    updateProductList();
});

document.getElementById('addProductButton').addEventListener('click', handleAddProduct);
document.getElementById('findCheapestProductButton').addEventListener('click', handleFindCheapestProduct);
document.getElementById('filterProductsByCategoryButton').addEventListener('click', handleFilterProductsByCategory);
