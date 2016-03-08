$( document ).ready(function() { 


//define variables
var hexCode = "#000000";
var hexR = "00";
var hexG = "00";
var hexB = "00";
var hslH = "360";
var hslS = "100";
var hslL = "100";
var counter1 = 10;

//randomly create hex code
var hexCode = '#' + (function co(lor){   return (lor +=
  [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'][Math.floor(Math.random()*16)])
  && (lor.length == 6) ?  lor : co(lor); })('');

//show hex code on home page
// $('#hex-code').text(hexCode);
// $('#timer-1').text(counter1.toString());

//after timer, remove hex and show sliders
// var timer = setInterval(function() {
//     counter1--;
//     if(counter1 < 0) {
//         clearInterval(timer);
//         $('#q-page').toggleClass('display-none');
//         $('#a-page').toggleClass('display-none');
//     } else {
//       $('#timer-1').text(counter1.toString());
//     }
// }, 1000);


//allow user to select HSL
$('#slider-hue').change( function() {
  console.log($('#slider-hue').val());
});

$('#slider-sat').change( function() {
  console.log($('#slider-sat').val());
});

$('#slider-light').change( function() {
  console.log($('#slider-light').val());
});

//when ready get HSL values

//convert HSL to hex

//define score












}); // end document ready