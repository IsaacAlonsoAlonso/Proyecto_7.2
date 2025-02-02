const lista = document.getElementById('lista')
const input = document.getElementById('input');
const btn = document.getElementById('btn');

//funcion obtener productos
function obtenerProductos(){
     
    fetch('http://localhost:3000/productos')
.then((response)=> response.json())
.then(data =>{
    mostarProductos(data)
})

}




//añadir un producto

btn.addEventListener('click', () => {
    if(input.value != ""){
        fetch('http://localhost:3000/productos',{
    method:'POST',
    body: JSON.stringify({
        nombre:`${input.value}`,
        comprado:'no'
    })
})
    }
});

//eliminar producto

function eliminarProducto(id){
    fetch(`http://localhost:3000/productos/${id}`,{
    method:'Delete',
    
    }).then(res=>{obtenerProductos()})
    
    
    
}

        


//modificar producto
function comprarProducto(pid,pnombre){
    fetch(`http://localhost:3000/productos/${pid}`,{
        method:'PUT',
        body: JSON.stringify({
            id: `${pid}`,
            nombre:`${pnombre}` ,
            comprado:'si'
        })
    }).then(res=>{obtenerProductos()})
}

//funcion para mostrar una lista de productos

function mostarProductos(productos){
    lista.innerHTML=''
if (productos.length === 0) {
    lista.innerHTML = `<p>No hay productos en la lista</p>`;
    return;
  }
    for (const producto of productos) {
    const prod = document.createElement('div');
    prod.innerHTML=`<div class='cajaproducto'><p>- ${producto.nombre} <br> comprado:${producto.comprado}</p> 
    <button id="comprar" onclick="comprarProducto('${producto.id}','${producto.nombre}')">comprar</button> 
    <button onclick="eliminarProducto('${producto.id}')">eliminar</button></div>`;
    lista.appendChild(prod);
    
  }


}
obtenerProductos()