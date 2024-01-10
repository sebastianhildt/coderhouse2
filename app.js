// Array para almacenar objetos de productos
const products = [];

// Función constructora para crear objetos de producto
function Product(name, category, price) {
    this.name = name;
    this.category = category;
    this.price = price;
}

// Funciones de orden superior
function addProduct() {
    const name = prompt('Ingrese el nombre del producto:');
    const category = prompt('Ingrese la categoría del producto:');
    const price = parseFloat(prompt('Ingrese el precio del producto:'));
    
    const newProduct = new Product(name, category, price);
    products.push(newProduct);

    alert('Producto agregado con éxito.');
}

function findCheapestProduct() {
    if (products.length === 0) {
        alert('No hay productos para buscar.');
        return;
    }

    const cheapestProduct = products.reduce((minProduct, currentProduct) => {
        return currentProduct.price < minProduct.price ? currentProduct : minProduct;
    }, products[0]);

    alert(`El producto más barato es: ${JSON.stringify(cheapestProduct, null, 2)}`);
}

function filterProductsByCategory() {
    const categoryToFilter = prompt('Ingrese la categoría para filtrar los productos:');
    const filteredProducts = products.filter(product => product.category === categoryToFilter);

    if (filteredProducts.length === 0) {
        alert(`No hay productos en la categoría ${categoryToFilter}.`);
        return;
    }

    alert(`Productos en la categoría ${categoryToFilter}: ${JSON.stringify(filteredProducts, null, 2)}`);
}

// Ejemplo de uso
addProduct();
addProduct();
findCheapestProduct();
filterProductsByCategory();
