function confirmDelete(message,name,href){
  Swal.fire({
    title: message,
    text: name,
    showCancelButton: true,
    confirmButtonText: 'Confirmar',
  }).then((result) => {
    if (result.isConfirmed) {
      return (window.location = href);
    }
  })
}

function badForm(message){
  Swal.fire({
    position: 'center',
    icon: 'error',
    title: message,
    showConfirmButton: false,
    timer: 3500
  })
}

function confirmReturn(message,name,href){
  Swal.fire({
    title: message,
    text: name,
    showCancelButton: true,
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      return (window.location = href);
    }
  })
}