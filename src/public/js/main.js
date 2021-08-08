/*
 *
 * Alert message
 *
 */

document.addEventListener('DOMContentLoaded', function () {
  let alert = document.getElementById('message')
  let message = JSON.parse(alert.getAttribute('data'))
  if (Object.keys(message).length !== 0) {
    const position = screen.width < 768 ? 'center' : 'bottom-end'
    if (message.success) swal('success', message.success[0], position)
    if (message.info) swal('info', message.info[0], position)
    if (message.errors) swal('error', message.errors[0], position)
  }
  alert.setAttribute('data', '')
})

function badForm(message, position = screen.width < 768 ? 'center' : 'bottom-end') {
  this.swal('warning', message, position)
}

function swal(type, msg, position) {
  Swal.fire({
    position: position,
    icon: type,
    title: msg,
    showConfirmButton: false,
    timer: 5000,
  })
}

/*
 *
 * Validate Login
 *
 */

function validateEmail(event) {
  const email = document.getElementById('email').value
  if (!/^[^\s@]+@[^\s@]+.[^\s@]+$/.test(email)) {
    event.preventDefault()
    badForm('El correo ingresado no es válido')
    return false
  }
}

/*
 *
 * Validate Login
 *
 */

/*
 *
 * Validate Register
 *
 */

function validateRegister(event) {
  const email = document.getElementById('email').value
  if (!/^[^\s@]+@[^\s@]+.[^\s@]+$/.test(email)) {
    event.preventDefault()
    badForm('El correo ingresado no es válido')
    return false
  }

  const password = document.getElementById('pswd').value
  if (password.length < 8) {
    event.preventDefault()
    badForm('La contraseña debe tener mínimo 8 dígitos.')
    return false
  }

  if (checkType(password) !== '2') {
    event.preventDefault()
    badForm('La contraseña debe contener al menos una letra mayúscula.')
    return false
  }

  const password2 = document.getElementById('pswd2').value
  if (password !== password2) {
    event.preventDefault()
    badForm('Las contraseñas no coinciden.')
    return false
  }
}
