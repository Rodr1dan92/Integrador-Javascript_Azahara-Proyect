const formulario = document.querySelector(".formulario");
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const email = document.getElementById("email");
const whatsapp = document.getElementById("whatsapp");
const textArea = document.getElementById("messageArea");
const suscripcion = document.getElementById("suscripcion");

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  validaCampos();
  InvalidSuscribe();
});

const validaCampos = () => {
  //capturar los valores ingresados por input
  const nombreValor = nombre.value.trim();
  const emailValor = email.value.trim();
  const apellidoValor = apellido.value.trim();
  const whatsappValor = whatsapp.value.trim();
  const mensajeValor = textArea.value.trim();

  //Campo nombre

  if (!nombreValor) {
    validarVacio(nombre, "Campo vacío");
  } else if (!validaTexto(nombreValor)) {
    validarVacio(nombre, "Sólo letras y espacios");
  } else {
    validarOk(nombre);
  }

  //Campo apellido

  if (!apellidoValor) {
    validarVacio(apellido, "Campo vacío");
  } else if (!validaTexto(apellidoValor)) {
    validarVacio(apellido, "Sólo letras y espacios");
  } else {
    validarOk(apellido);
  }

  //Campo email

  if (!emailValor) {
    validarVacio(email, "Campo vacío");
  } else if (!validaEmail(emailValor)) {
    validarVacio(email, "El e-mail no es válido");
  } else {
    validarOk(email);
  }

  //Campo whatsapp

  if (!whatsappValor) {
    validarVacio(whatsapp, "Campo vacío");
  } else if (!validaWsp(whatsappValor)) {
    validarVacio(whatsapp, "Ingresa un numero válido");
  } else {
    validarOk(whatsapp);
  }

  //Campo textArea

  if (!mensajeValor) {
    validarVacio(textArea, "Campo vacío");
  } else {
    validarOk(textArea);
  }
};

const validarVacio = (input, msje) => {
  const formControl = input.parentElement;
  const aviso = formControl.querySelector("p");
  aviso.innerText = msje;

  formControl.classList.add("form-empty-field");
};

const validarOk = (input) => {
  const formControl = input.parentElement;
  formControl.classList.add("form-valid-field");
};

const InvalidSuscribe = () => {
  const nameInput =
    formulario.childNodes[1].childNodes[1].classList.contains(
      "form-valid-field"
    );
  const lastNameInput =
    formulario.childNodes[1].childNodes[3].classList.contains(
      "form-valid-field"
    );
  const emailInput =
    formulario.childNodes[3].classList.contains("form-valid-field");
  const whatsappInput =
    formulario.childNodes[5].classList.contains("form-valid-field");

  if (!nameInput || !lastNameInput || !emailInput || !whatsappInput) {
    const mensajeSubmit = suscripcion.parentElement.querySelector("p");
    mensajeSubmit.className = "showErrorMsj";
  }
  successAlert();
};

//Alerta Success
const successAlert = () => {
  suscripcion.addEventListener("click", () => {
    Swal.fire({
      title: "Gracias!",
      text: "Ya enviamos tu consulta, te responderemos lo más pronto posible. Que tengas un gran día!",
      icon: "success",
      confirmButtonText: "Enviado",
    });
  });
};

// Validaciones con Expresiones Regulares
const validaTexto = (whatsapp) => {
  return /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(whatsapp);
};

const validaEmail = (email) => {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
};

const validaWsp = (whatsapp) => {
  return /^\d{9,13}$/.test(whatsapp);
};
