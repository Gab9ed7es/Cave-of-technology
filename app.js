
let carritoDeCompras = []


const precioTotal = document.getElementById('precioTotal');

const selecTalles = document.getElementById('selecTalles')

$(()=>{
    $('#contenedor-productos').append("<img src='https://thumbs.gfycat.com/DearWellinformedDalmatian-size_restricted.gif'>")
    
    setTimeout(() => {
        mostrarProductos(stockProductos)
    },1000);

})


selecTalles.addEventListener('change',()=>{
    console.log(selecTalles.value)
    if(selecTalles.value == 'all'){
        mostrarProductos(stockProductos)
    }else{
            mostrarProductos(stockProductos.filter(elemento => elemento.talle == selecTalles.value))
        
    }
})



function mostrarProductos(array){

    $('#contenedor-productos').empty()
   


    array.forEach(productos => {
        $('#contenedor-productos').append(`
            <div class=producto>
                <div class="card">
                    <div class="card-image">
                        <img src='https://thumbs.gfycat.com/DearWellinformedDalmatian-size_restricted.gif' class="loader">
                        <img src=${productos.img} class="img-producto">
                        <span class="card-title">${productos.nombre}</span>
                        <a id="boton${productos.id}" class="btn-floating halfway-fab waves-effect waves-light blue"><i class="material-icons">add_shopping_cart</i></a>
                    </div>
                    <div class="card-content">
                        <p>${productos.desc}</p>
                        <p>Valor:${productos.valor}</p>
                        <p>$${productos.precio}</p>
                    </div>
                </div>
            </div>
        `)
        
        $('.img-producto').on('load', function () {
            $(this).hide()
            
            setTimeout(() => {
                $(this).show()
                $('.loader').hide()
            }, 1000);
        })


        let botonAgregar = document.getElementById(`boton${productos.id}`)

        botonAgregar.addEventListener('click', ()=>{
            agregarAlCarrito(productos.id)

            Toastify({
                text: "🤑Producto Agregado",
                className: "info",
                style: {
                  background: "green",
                }
              }).showToast();
        })

    });
}


function agregarAlCarrito(id) {
    let verificar = carritoDeCompras.find(elemento => elemento.id == id)
    if(verificar){
        verificar.cantidad = verificar.cantidad + 1
       $(`#cantidad${verificar.id}`).html(`<p id="cantidad${verificar.id}">Cantidad:${verificar.cantidad}</p>`) 
        actualizarCarrito()
    }else{
        let productoAgregar = stockProductos.find(producto => producto.id == id)

        carritoDeCompras.push(productoAgregar)
        
        mostrarCarrito(productoAgregar)
        actualizarCarrito()

    }
    
    localStorage.setItem('carrito', JSON.stringify(carritoDeCompras))
}



function mostrarCarrito( productoAgregar){
    $('#carrito-contenedor').append(`<div class="productoEnCarrito">
                                            <p>${productoAgregar.nombre}</p>
                                            <p>Precio:$${productoAgregar.precio}</p>
                                            <p id="cantidad${productoAgregar.id}">Cantidad:${productoAgregar.cantidad}</p>
                                            <button class="boton-eliminar" id='eliminar${productoAgregar.id}'><i class="fas fa-trash-alt"></i></button>
                                        </div>
        `) 

        let btnEliminar = document.getElementById(`eliminar${productoAgregar.id}`)

        btnEliminar.addEventListener('click', ()=>{
            if(productoAgregar.cantidad == 1){
                btnEliminar.parentElement.remove()
                carritoDeCompras = carritoDeCompras.filter(elemento => elemento.id != productoAgregar.id)
                actualizarCarrito()
                Toastify({
                    text: "💀Producto Eliminado",
                    className: "info",
                    style: {
                    background: "red",
                    }
                }).showToast();

                localStorage.setItem('carrito', JSON.stringify(carritoDeCompras))
            }else{
                productoAgregar.cantidad= productoAgregar.cantidad - 1
                document.getElementById(`cantidad${productoAgregar.id}`).innerHTML = `<p id="cantidad${productoAgregar.id}">Cantidad:${productoAgregar.cantidad}</p>`
                actualizarCarrito()
                localStorage.setItem('carrito', JSON.stringify(carritoDeCompras))
            }
            
        })
}


function recuperar(){
    let recuperar = JSON.parse(localStorage.getItem('carrito'))
    console.log(recuperar);

    if(recuperar){
       recuperar.forEach(objeto => {
           mostrarCarrito(objeto)
           carritoDeCompras.push(objeto)
           actualizarCarrito()
       }) 
    }
}


recuperar()


function  actualizarCarrito (){
   $('#contadorCarrito').text(carritoDeCompras.reduce((acc, el)=> acc + el.cantidad, 0))  
   precioTotal.innerText = carritoDeCompras.reduce((acc, el)=> acc + (el.precio * el.cantidad), 0 )
}


$('#ir').on('click', function () {
    $('html, body').animate({
        scrollTop: $('#contacto').offset().top
    }, 6000)
  })



$('#der').on('click', function () {
    $('.block').animate({"left": "+=50px"}, "slow")
})

$('#izq').on('click', function () {
    $('.block').animate({"left": "-=50px"}, "slow")
})   


$('#fin').on('click', function () {
    
    alert('Gracias por su compra')
    carritoDeCompras= [],
    localStorage.clear()
    actualizarCarrito()
    $('#carrito-contenedor').empty()
})