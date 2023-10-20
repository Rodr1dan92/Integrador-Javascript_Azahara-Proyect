
// Selectores del DOM

const cartInfo = document.querySelector(".cart-product");
const lineaProd = document.querySelector(".linea-producto");
const containerProducts = document.querySelector("#products-container");
const cardProduct = document.querySelector(".card-cosmetic");
const valorTotal = document.querySelector(".total-pagar");
const totalesCart = document.querySelector(".cart-total");
const numbrerCartIcon = document.getElementById("contador-productos");
const cartProducts = document.querySelector(".container-cart-products");

// Agregar producto al Local Storage de la web

let addToCartLoclStorage = (producto) => {
  let LclStorage = JSON.parse(localStorage.getItem("cosmeticos"));
  let cantProdTotal = 0;
  if (!LclStorage || LclStorage.length === 0) {
    const newProduct = addProductLocStorage(producto);
    localStorage.setItem("cosmeticos", JSON.stringify([newProduct]));
    cantProdTotal = 1;
  } else {
    const indiceProducto = LclStorage.findIndex(
      (cosmetico) => cosmetico.id === producto.id
    );
    const newLclStorage = LclStorage;
    if (indiceProducto === -1) {
      const newProduct = addProductLocStorage(producto);
      newLclStorage.push(newProduct);
      cantProdTotal = 1;
    } else {
      newLclStorage[indiceProducto].cantidad++;
      cantProdTotal = newLclStorage[indiceProducto].cantidad;
    }
    localStorage.setItem("cosmeticos", JSON.stringify(newLclStorage));
  }
  updateCartNumb();
  UpProdToCart();
  updateTotalsCart();
};

//Actualiza cantidad en el Local Storage
const addProductLocStorage = (producto) => {
  const nuevoProducto = producto;
  nuevoProducto.cantidad = 1;
  return nuevoProducto;
};

//Disminuye cantidad del Producto en el carrito
const decreaseProductCart = (producto) => {
  let LocStorage = JSON.parse(localStorage.getItem("cosmeticos"));
  let cantProdTotal = 0;
  const indexProd = LocStorage.findIndex(
    (articulo) => articulo.id === producto.id
  );
  let newLocStorage = LocStorage;
  newLocStorage[indexProd].cantidad--;
  cantProdTotal = newLocStorage[indexProd].cantidad;
  if (cantProdTotal === 0) {
    newLocStorage.splice(indexProd, 1);
  }
  localStorage.setItem("cosmeticos", JSON.stringify(newLocStorage));
  updateCartNumb();
  UpProdToCart();
  updateTotalsCart();
};

//Actualiza el numero del logo del carrito
const updateCartNumb = () => {
  let suma = 0;
  const LclStorage = JSON.parse(localStorage.getItem("cosmeticos"));
  if (LclStorage && LclStorage.length > 0) {
    suma = LclStorage.reduce((ac, curr) => ac + curr.cantidad, 0);
    return (numbrerCartIcon.innerText = suma);
  }
  numbrerCartIcon.innerText = 0;
};

//Lógica de totales del carrito
const totalFootCart = () => {
  const totalCart = document.createElement("div");
  totalCart.classList.add("cart-total");
  totalCart.innerHTML = `
  <section id="totales">
  <p>Total unidades: <span id="cantidad">0</span></p>
  <p>Total precio: $<span id="precio">0</span></p>
  <button id="buyButton">Comprar</button>
  <button id="clearButton">Limpiar</button>
  </section>
  `;

  cartProducts.appendChild(totalCart);
  document.getElementById("clearButton").addEventListener("click", () => {
    cartProducts.innerHTML = "";
    limpiarCarrito();
  });
  document.getElementById("buyButton").addEventListener("click", () => {
    Swal.fire({
      title: 'Gracias por tu compra! 😃💓',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })
  })
};

//Elimina productos del carrito
const limpiarCarrito = () => {
  localStorage.removeItem("cosmeticos");
  carritoVacio();
  updateCartNumb();
  notificationClear();
};

updateCartNumb();

//Mensaje de carrito vacío
const carritoVacio = () => {
  cartProducts.innerHTML = `
    <h3>Agrega un Producto</h3>
  `;
};


//Generar lineas de productos en el modal del carrito
const UpProdToCart = () => {
  cartProducts.innerHTML = "";

  const productsInStorage = JSON.parse(localStorage.getItem("cosmeticos"));
  if (productsInStorage && productsInStorage.length > 0) {
    productsInStorage.forEach((product) => {
      const newProduct = document.createElement("div");
      newProduct.classList.add("cart-product");
      newProduct.innerHTML = `
      <div class="info-cart-product">
      <div class="cantPCart">
        <button>+</button>
        <span class="cantidad-producto-carrito">${product.cantidad}</span>
        <button>-</button>
      </div>
      <div class="nomb-precio">
      <p class="titulo-producto-carrito">${product.nombre}</p>
      <span class="precio-producto-carrito">${
        product.precio * product.cantidad
      }</span>
      </div>
    </div>
    `;

      cartProducts.append(newProduct);

      newProduct
        .getElementsByTagName("button")[0]
        .addEventListener("click", () => {
          addToCartLoclStorage(product);
        });
      newProduct
        .getElementsByTagName("button")[1]
        .addEventListener("click", () => {
          addToCartLoclStorage(product);
        });
      newProduct
        .getElementsByTagName("button")[1]
        .addEventListener("click", () => {
          decreaseProductCart(product);
        });
    });
  } else {
    carritoVacio();
  }
  if (productsInStorage && productsInStorage.length !== 0) {
    totalFootCart();
    updateTotalsCart();
  }
};

// Actualiza el total de precio y unidades de la página del carrito
function updateTotalsCart() {
  const productos = JSON.parse(localStorage.getItem("cosmeticos"));
  const cantNumber = document.getElementById("cantidad");
  const priceNumber = document.getElementById("precio");
  let suma = 0;
  let precio = 0;
  if (productos && productos.length > 0) {
    productos.forEach((prod) => {
      suma += prod.cantidad;
      precio += prod.precio * prod.cantidad;
    });
    cantNumber.innerText = suma;
    priceNumber.innerText = precio;
  }
}

//Notificación de Carrito Vacío

const notificationClear = () => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    iconColor: 'white',
    customClass: {
      popup: 'colored-toast'
    },
    showConfirmButton: false,
    timer: 1200,
    timerProgressBar: true
  })
  Toast.fire({
    icon: 'info',
    title: 'Carrito Vacío'
  })
}

export {
  //Selectores
  cartInfo,
  lineaProd,
  containerProducts,
  cardProduct,
  valorTotal,
  totalesCart,
  numbrerCartIcon,
  cartProducts,

  //Funciones
  addToCartLoclStorage,
  addProductLocStorage,
  decreaseProductCart,
  updateCartNumb,
  totalFootCart,
  limpiarCarrito,
  carritoVacio,
  UpProdToCart,
  updateTotalsCart,
  notificationClear
};
