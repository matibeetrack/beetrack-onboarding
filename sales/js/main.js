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

let valoreslocalStorage = Object.values(localStorage)
let valoresVerdaderos = valoreslocalStorage.filter(checkValue).length
let valoresTotales = localStorage.length

function checkValue(verdadero) {
    return  verdadero == "true";
}

// //Progress bar dynamically updates

var porcentajeDeAvance = ((valoresVerdaderos/valoresTotales)*100);
var i = 1;
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
  console.log(count);
}

countBoxes();
$(":checkbox").click(countBoxes);

// count checks

function countChecked() {
  checked = $("input:checked").length;
  
  var percentage = parseInt(((checked / count) * 100),10);
  $(".progress-bar").css("width", percentage + "%").text(percentage + "%");

  if(checked==count) {
    start(); //start confetti
    playFile('../assets/sounds/success.mp3'); //play success sound
    stop(); //stop confetti
  }
}

countChecked();
$(":checkbox").click(countChecked);

//Sound success

const context = new window.AudioContext();

function playFile(filepath) {

  fetch(filepath)
    // Read it into memory as an arrayBuffer
    .then(response => response.arrayBuffer())
    // Turn it from mp3/aac/whatever into raw audio data
    .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
    .then(audioBuffer => {
      // Now we're ready to play!
      const soundSource = context.createBufferSource();
      soundSource.buffer = audioBuffer;
      soundSource.connect(context.destination);
      soundSource.start();
    });
}