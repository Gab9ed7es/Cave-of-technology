let divProductos = document.getElementById('divProductos')
localStorage.setItem('carrito', JSON.stringify([]))

productos.forEach(producto => {
    divProductos.innerHTML += producto.devolverDatos()
})

productos.forEach(producto => {
    document.getElementById(`boton${producto.id}`).addEventListener('click', () => {
        arrayCarrito.push(producto)
        localStorage.setItem('carrito', JSON.stringify(arrayCarrito))
    })
})