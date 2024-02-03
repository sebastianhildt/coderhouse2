const products = [];

function Product(id, name, category, price) {
    this.id = id;
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

async function fetchProductDetails(productId) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${productId}`);
        const productDetails = await response.json();
        return productDetails.title; 
    } catch (error) {
        console.error('Error al obtener detalles del producto:', error);
        return 'Detalles no disponibles';
    }
}

async function updateProductListWithDetails() {
    const productListContainer = document.getElementById('productList');
    productListContainer.innerHTML = '';

    for (const product of products) {
        const listItem = document.createElement('li');
        const additionalDetails = await fetchProductDetails(product.id);
        listItem.textContent = `${product.name} - ${product.category} - $${product.price.toFixed(2)} - ${additionalDetails}`;
        productListContainer.appendChild(listItem);
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

async function handleAddProduct() {
    const id = products.length + 1; 
    const name = prompt('Ingrese el nombre del producto:');
    const category = prompt('Ingrese la categoría del producto:');
    const price = parseFloat(prompt('Ingrese el precio del producto:'));

    const newProduct = new Product(id, name, category, price);
    products.push(newProduct);

    saveProductsToLocalStorage();
    await updateProductListWithDetails(); 

    showAlert('Éxito', 'Producto agregado con éxito.', 'success');
}

function handleFindCheapestProduct() {
    if (products.length === 0) {
        showAlert('Error', 'No hay productos para buscar.', 'error');
        return;
    }

    const cheapestProduct = products.reduce((minProduct, currentProduct) => {
        return currentProduct.price < minProduct.price ? currentProduct : minProduct;
    }, products[0]);

    showAlert('Información', `El producto más barato es: ${JSON.stringify(cheapestProduct, null, 2)}`, 'info');
}

function handleFilterProductsByCategory() {
    const categoryToFilter = prompt('Ingrese la categoría para filtrar los productos:');
    const filteredProducts = products.filter(product => product.category === categoryToFilter);

    if (filteredProducts.length === 0) {
        showAlert('Información', `No hay productos en la categoría ${categoryToFilter}.`, 'info');
        return;
    }

    showAlert('Información', `Productos en la categoría ${categoryToFilter}: ${JSON.stringify(filteredProducts, null, 2)}`, 'info');
}

function showAlert(title, message, icon) {
    Swal.fire({
        title: title,
        text: message,
        icon: icon,
        confirmButtonText: 'Ok'
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadProductsFromLocalStorage();
    await updateProductListWithDetails(); 
});

document.getElementById('addProductButton').addEventListener('click', handleAddProduct);
document.getElementById('findCheapestProductButton').addEventListener('click', handleFindCheapestProduct);
document.getElementById('filterProductsByCategoryButton').addEventListener('click', handleFilterProductsByCategory);
