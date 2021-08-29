function navbar() {
  var x = document.getElementById("myTopnav");
  if (x.className === "header-block") {
    x.className += " responsive";
  } else {
    x.className = "header-block";
  }
}