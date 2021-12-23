class Producto {
    constructor(id, nombre, marca, modelo, precio, stock) {
        this.id = id;
        this.nombre = nombre;
        this.marca = marca;
        this.modelo = modelo;
        this.precio  = precio;
        this.stock = stock
    }

    devolverDatos() {
        return `
        <div class="card" id="producto${this.id} "style="width: 18rem; margin:6px">
            <img src="./img/imagen${this.id}.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${this.nombre}</h5>
                <p class="card-text">${this.marca}</p>
                <p class="card-text">${this.modelo}</p>
                <p class="card-text">$${this.precio}</p>
                <p class="card-text">Stock${this.stock}</p>
                <button class="btn btn-dark" id="boton${this.id}">Agregar al carrito</button>
            </div>
        </div>
    
        `
    }
}

const producto1 = new Producto(1,"Notebook", "GIGABYTE", "G55", 243600, 17)
const producto2 = new Producto(2,"Silla Gamer", "RAIDMAX", "DK-922PK", 46800, 5)
const producto3 = new Producto(3,"Mouse", "EVGA", "TORQ X10", 6550, 24)
const producto4 = new Producto(4,"Tablet", "PCBOX", "T715M", 8150, 7)
const producto5 = new Producto(5,"PlayStation 5", "Sony", "Standar", 202999, 10)
const producto6 = new Producto(6,"Monitor Gamer", "ASUS", "VP228HE", 29880, 12)


let productos = [producto1, producto2, producto3, producto4, producto5, producto6]
let arrayCarrito = []