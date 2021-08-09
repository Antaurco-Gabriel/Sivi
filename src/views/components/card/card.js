function showemail(e, data) {
  const autor = e.target.getAttribute('autor')
  if (data !== 'undefined') console.log(data)
  else if (autor !== null) console.log(autor)
  else console.log('no hay atributo')
}

function goToLink(link) {
  return window.location.href = link;
}
