function checkPassword() {
  $pswd = document.getElementById('login-pswd').value
  $lengthValidator = document.getElementById('length')
  $upperCaseValidator = document.getElementById('upperCase')

  $upperCase = /^((?:.*[A-Z]){1})\S{0,}$/

  if ($pswd.length == 0) $lengthValidator.classList.remove('text-status--valid')
  else if ($pswd.length && $pswd.length >= 8)
    $lengthValidator.classList.add('text-status--valid')
  else $lengthValidator.classList.remove('text-status--valid')

  if ($pswd.length == 0) $upperCaseValidator.classList.remove('text-status--valid')
  else if ($upperCase.test($pswd)) $upperCaseValidator.classList.add('text-status--valid')
  else $upperCaseValidator.classList.remove('text-status--valid')
}
