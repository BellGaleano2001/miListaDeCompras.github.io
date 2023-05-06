window.onload = todoList();

function todoList() {
    let productos = document.querySelector(".productos");
    var formulario = document.querySelector(".formulario");
    var agregar = document.querySelector(".formulario_agregar");

    formulario.addEventListener("submit", agregarProducto);


    function agregarProducto(evento) {
        evento.preventDefault();  //paralizar el resultado del formulario  
        
        let producto = document.createElement("li");
        producto.className = "producto";
        producto.append(crearNombreProducto());
        producto.append(crearBotonBorrarProducto());
        productos.prepend(producto);
        producto.addEventListener("click", gestionarProductos);
        guardarProductos();
        agregar.value = null;
    }

    function crearNombreProducto(nombre) {
        var nombreProducto = document.createElement("span");
        nombreProducto.className = "producto_nombre";
        nombreProducto.textContent = nombre ? nombre : agregar.value;
        return nombreProducto;
    }

    function crearBotonBorrarProducto() {
        let botonBorrar = document.createElement("span");
        botonBorrar.className = "producto_borrar";
        botonBorrar.textContent = "x";
        return botonBorrar;
    }

    function gestionarProductos(evento) {
        if (evento.target.className === "producto_borrar" ) {
            borrarProducto(evento.currentTarget);
        }  else {
            actualizarProducto(evento.currentTarget);
        }
    }
   function borrarProducto(producto) {
    if (confirm("¿Borrar " + producto.querySelector(".producto_nombre").textContent + "?")){
        productos.removeChild(producto);
        
    }
    guardarProductos();
   }

   function actualizarProducto(producto) {
    producto.classList.toggle("producto--agregado"); // toggle permite alterar entre dos acciones
    guardarProductos();
   } 

   function guardarProductos () {
       let productosGuardados = [];
       let cantidadProductos = document.querySelectorAll(".producto");
       cantidadProductos.forEach(function(producto) {
        productosGuardados.unshift({
            nombre: producto.querySelector(".producto_nombre").textContent,
            completado: producto.classList.contains(".producto--agregado"),
        });
       });
       localStorage.setItem('productos', JSON.stringify(productosGuardados));
   };
  //esto lo hacemos para que al actualizar pagina no perdamos lo que hemos guardado.

//   function cargarProductos() {
//       let productosGuardados = JSON.parse(localStorage.getItem("productos"));
//          productosGuardados.forEach(function(elemento){
//         let producto = document.createElement("li");
//         producto.className = "producto";

//         if(elemento.completado) {
//             producto.className += " producto--agregado";
//         }

//         producto.append(crearNombreProducto(elemento.nombre));
//         producto.append(crearBotonBorrarProducto());
//         productos.prepend(producto);
//         producto.addEventListener("click", gestionarProductos);

//       });

//   };

  
}