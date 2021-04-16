var mybutton = document.getElementById("myBtn");

	function topFunction() {
  	document.body.scrollTop = 0;
  	document.documentElement.scrollTop = 0;
  }

function myFunction() {
  var x = document.getElementById("myTopnav");
  var y = document.getElementById("sign");
  if (x.className === "topnav") {
    x.className += " responsive";

  } else {
    x.className = "topnav";

  }
}
function hideButton() {
  var x = document.getElementById("signin");
  var y = document.getElementById("popyp");
  if (x.className === "hideSigninButton") {
    x.innerHTML = "Logout";
    x.href = "/logout";
  }
  if(y.className === "hiddelogout"){
    x.innerHTML = "Signin";
    x.href = "/signup";
  }
  if(y.style.display == block){
    y.style.display = none
  }
  return 0;
}
