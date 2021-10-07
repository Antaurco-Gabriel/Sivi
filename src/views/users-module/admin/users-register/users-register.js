
function validateEmail(event) {
  const email = document.getElementById('email').value
  if (!/^[^\s@]+@[^\s@]+.[^\s@]+$/.test(email)) {
    event.preventDefault()
    badForm('El correo ingresado no es válido')
    return false
  }
}
