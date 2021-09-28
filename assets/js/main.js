(function($) {

	"use strict";

	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

})(jQuery);

let boxes = document.getElementsByClassName('box').length;

function save() {	
  for(let i = 1; i <= boxes; i++){
	  var checkbox = document.getElementById(String(i));
    localStorage.setItem("checkbox" + String(i), checkbox.checked);	
  }
}

//for loading
for(let i = 1; i <= boxes; i++){
  if(localStorage.length > 0){
    var checked = JSON.parse(localStorage.getItem("checkbox" + String(i)));
    document.getElementById(String(i)).checked = checked;
  }
}
window.addEventListener('change', save);

document.addEventListener("DOMContentLoaded", function(){
	window.addEventListener('scroll', function() {
		if (window.scrollY > 10) {
		  document.getElementById('inicio').classList.remove('active');
		} else if (window.scrollY <= 10) {
		  document.getElementById('inicio').classList.add('active'); //Clase para dejar activa la sección Home on top
		} 
	});
  });
  