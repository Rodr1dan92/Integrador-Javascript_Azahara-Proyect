const alertaBienvenida = document.querySelector("#btn-inicio");

alertaBienvenida.addEventListener("click", () => {
     Swal.fire({
    title: 'Como estás!',
    text: 'Estás en el lugar indicado chiquita',
    icon: 'success',
    confirmButtonText: 'Entrar'
  })
})
