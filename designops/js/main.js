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

// Contar valores verdaderos

var valoreslocalStorage = Object.values(localStorage)
var valoresVerdaderos = valoreslocalStorage.filter(checkValue).length
var valoresTotales = localStorage.length

function checkValue(verdadero) {
    return  verdadero == "true";
}

// //Progress bar dynamically updates

var porcentajeDeAvance = ((valoresVerdaderos/valoresTotales)*100);
let i = 1;
function makeProgress(){
    if(i < porcentajeDeAvance){
		i = i + 1;
        $(".progress-bar").css("width", i + "%").text(i + "%");
    }
    // Wait for sometime before running this script again
    setTimeout("makeProgress()", 1);
}
makeProgress();

const start = () => {
  setTimeout(function() {
      confetti.start()
  }, 300); // 1000 is time that after 1 second start the confetti ( 1000 = 1 sec)
};
//  for stopping the confetti 
const stop = () => {
  setTimeout(function() {
      confetti.stop()
  }, 4300); // 5000 is time that after 5 second stop the confetti ( 5000 = 5 sec)
};
// after this here we are calling both the function so it works

// get box count
var count = 0;
var checked = 0;
function countBoxes() { 
  count = $("input[type='checkbox']").length;
}

countBoxes();
$(":checkbox").click(countBoxes);

// count checks

function countChecked() {
  checked = $("input:checked").length;
  
  var percentage = parseInt(((checked / count) * 100),10);
  $(".progress-bar").css("width", percentage + "%").text(percentage + "%");

  if(checked==count) {
    start();
    stop();
  }

}

countChecked();
$(":checkbox").click(countChecked);