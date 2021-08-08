function showModal(e, data) {
  let index = e.target.getAttribute('index')
  if (data !== 'undefined') index = data
  const modal_container = document.getElementById(`modal_container_${index}`)
  modal_container.classList.add('show')
}

function closeModal(e, data) {
  let index2 = e.target.getAttribute('index')
  if (data !== 'undefined') index2 = data
  const modal_container = document.getElementById(`modal_container_${index2}`)
  modal_container.classList.remove('show')
}
