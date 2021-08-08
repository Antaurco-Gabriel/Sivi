document.addEventListener('DOMContentLoaded', () => {
  let alert = document.querySelector('.alert')
  if (
    alert.classList.contains('info') ||
    alert.classList.contains('success') ||
    alert.classList.contains('error') ||
    alert.classList.contains('warning')
  ) {
    alert.classList.add('alert--show')
    alert.classList.remove('alert--hide')
    alert.classList.add('showAlert')

    setTimeout(() => {
      alert.classList.remove('alert--show')
      alert.classList.add('alert--hide')
    }, 10000)

    let closeButton = document.querySelector('.alert__close-btn')

    closeButton.addEventListener('click', () => {
      alert.classList.remove('alert--show')
      alert.classList.add('alert--hide')
    })
  }
})
