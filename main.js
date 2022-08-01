

class Carrito {
    constructor(id) {
    this.id = id
    this.productos = []
 }
    calcularTotal() {
        let total = 0
        for ( let i = 0; i < this.productos.length; i++) {
            total = total + this.productos[i].precio
        }
        return total
    }

}

function limpiarCarrito() {
    let divCarrito = document.querySelector("#carrito")
    divCarrito.innerHTML=""
}

function actualizarCarrito() {
    let divCarrito = document.querySelector("#carrito")
    carrito.productos.forEach(producto => {
        divCarrito.innerHTML += `<h3>${producto.nombre} $${producto.precio} \n</h3>`
    })
    divCarrito.innerHTML += `<h1>El total de tu compra es $${carrito.calcularTotal()}</h1>`
}

// manda el carrito al local storage
function renovarStorage() {
    localStorage.removeItem("carrito")
    localStorage.setItem("carrito",JSON.stringify(carrito))
}

//parse y carga carrito del local storage 
window.addEventListener("DOMContentLoaded", (e) => {
    let storage = JSON.parse(localStorage.getItem("carrito"))
    console.log(storage)

})

let productosJavascript = document.getElementById("productosJavascript")



fetch('stock.json')

    .then( (res) => res.json())
    .then( (stock) => {

        stock.forEach((producto) =>  {
    let columna = document.createElement("div")
    columna.className = "col-md-4 mt-3"
    columna.innerHTML = `
        <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="./assets/${producto.imagen}" alt="Card image cap">
        
            <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">$${producto.precio}.</p>
                <a href="#" class="btn btn-primary botonDeCompra" id="${producto.id}">agregar al carrito</a>
            </div>
        </div>
        `
        productosJavascript.appendChild(columna)
        })   
            
})


let carrito = new Carrito(1)


fetch('stock.json')
    .then( (res) => res.json())
    .then( (stock) => {
let botones = document.querySelectorAll(".botonDeCompra")
let arrayDeBotones = Array.from(botones)
arrayDeBotones.forEach(boton => {
    boton.addEventListener("click", (e) =>{
        let ProductoSeleccionado = stock.find(producto => producto.id == e.target.id)
        carrito.productos.push(ProductoSeleccionado)
        console.log(carrito)
        console.log(carrito.calcularTotal())
        limpiarCarrito()
        actualizarCarrito()
        renovarStorage()
        Toastify({
            text: `se ha agregado al carrito ${ProductoSeleccionado.nombre}`,
            duration: 2000
        }).showToast();
    })
 })
})

    
    
    

        
    




