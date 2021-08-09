document.addEventListener('DOMContentLoaded', function () {
  console.log(
    '%cDesing by 🦙 ',
    '-webkit-text-stroke: .5px black;font-weight:bold;color:#3471f0;font-size:35px'
  )

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
