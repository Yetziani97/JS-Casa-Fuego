const productos = [
    {
        id:1,
        nombre: "Hamburguesa",
        precio: 250,
    },
    {
        id:2,
        nombre: "Tacos",
        precio:200,
    },
    {
        id:3,
        nombre: "Rib Eye",
        precio:400,
    },
    {
        id:4,
        nombre: "Alitas",
        precio:350,
    },
    {
        id:5,
        nombre: "Costillas",
        precio:500,
    }
]

const carrito = JSON.parse(localStorage.getItem("carrito")) ?? []

const verProducto = ({id,nombre,precio,img,stock}) =>{
    const containerTarjetas = document.querySelector("#containerTarjetas")
    const tarjeta = document.createElement("div")
    tarjeta.className = "tarjeta"
    tarjeta.innerHTML = `
                        <img src="${img}" alt="">
                        <div class="contenido">
                            <h2>${nombre}</h2>
                            <span><b>Precio:</b> $ ${precio}</span>
                        </div>
                        <form id="formCarrito${id}">
                        <input name="id" type="hidden" value="${id}">
                        <input name="cantidad" type="number" value="1" min="1" max="${stock}">
                        <button type="submit">Agregar al carrito</button>
                        </form>
                        
    `
    containerTarjetas.append(tarjeta)
}

const agregarCarrito = (id) =>{
    const formCarrito = document.querySelector("#formCarrito" + id)
    formCarrito.addEventListener("submit",(e)=>{
        e.preventDefault()
        const cantidad = e.target.children["cantidad"].value
        carrito.push({
            id,
            cantidad,
        })
        localStorage.setItem("carrito",JSON.stringify(carrito))
    })
}
const verProductos = () =>{

    productos.forEach(producto =>{
        if(producto.stock !=0){
            verProducto(producto)
            agregarCarrito(producto.id)
        }
        
    })
}

verProductos()