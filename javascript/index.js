import { cosmeticos } from "./productos.js";
import * as cartService from "./cartService.js"
import * as validaciones from "./validaciones.js"

// Asignación de Selectores HTML

const navbar = document.getElementById("nav");
const botonCart = document.querySelector("#cart-container");
const burgerMenu = document.getElementById("burguer-menu");
const cardContainerProd = document.getElementById("products-container");
const CategoriasLat = document.querySelectorAll(".cat");
const tituloDiv = document.getElementById("titulo-div");


//Eventos para botones del navbar
burgerMenu.addEventListener("click", () => {
  navbar.classList.toggle("ocultar");
  navbar.classList.toggle("responsive");
});

botonCart.addEventListener("click", () => {
  cartService.cartProducts.classList.toggle("ocultar-carrito");
});

// Crear card en el div del contenedor de productos
const crearTarjetasProductos = (productos) => {
  cardContainerProd.innerHTML = "";

  productos.forEach((producto) => {
    const nuevoProducto = document.createElement("div");
    nuevoProducto.classList = "card-cosmetic " + producto.categoría;
    nuevoProducto.innerHTML = `
    <div class="startDiv">
      <img src=${producto.foto}>
      <h3>${producto.nombre}</h3>
      <p>${producto.descripción}</p>
    </div>
    <div class="precioCard">
      <h5>$ ${producto.precio}</h5>
      <button class="agregarBtn" id="${producto.id}">Añadir al Carrito</button>
    </div>
    `;

    cardContainerProd.append(nuevoProducto);

    nuevoProducto.firstElementChild.firstElementChild;
    const objeto = {
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
    };
    nuevoProducto.addEventListener("click", () => cartService.addToCartLoclStorage(objeto));
    cartService.UpProdToCart(producto);
  });
};

crearTarjetasProductos(cosmeticos);

// Lógica de los Filtros por categoría en el aside del contenedor SHOP
CategoriasLat.forEach((boton) => {
  boton.addEventListener("click", (e) => {
    CategoriasLat.forEach((boton) => boton.classList.remove("active"));
    e.currentTarget.classList.add("active");

    if (e.currentTarget.id != "todos") {
      const productoCategoria = cosmeticos.find(
        (producto) => producto.categoría === e.currentTarget.id
      );
      tituloDiv.innerHTML = "Línea " + productoCategoria.categoría;
      const productosBoton = cosmeticos.filter(
        (producto) => producto.categoría === e.currentTarget.id
      );
      crearTarjetasProductos(productosBoton);
      cartService.updateTotalsCart();
    } else {
      tituloDiv.innerText = "Todos";
      crearTarjetasProductos(cosmeticos);
      cartService.updateTotalsCart();
    }
  });
});
