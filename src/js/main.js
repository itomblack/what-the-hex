$( document ).ready(function() { 


//define variables
var hexCode = "#000000";
var hexR = "00";
var hexG = "00";
var hexB = "00";
var hslH = "360";
var hslS = "100";
var hslL = "100";
var counter1 = 60;

var storeAnswers = [];


//randomly create hex code
getRandom();
updatePageHex();

//show hex code on home page

$('#timer-1').text(counter1.toString());

//after timer show end game screen
var timer = setInterval(function() {
    counter1--;
    if(counter1 < 0) {
        clearInterval(timer);
        //calculate scores
        $('#game-over').addClass('now-over');
        //add to game over screen

        //show game over screen
    } else {
      $('#timer-1').text(counter1.toString());
    }
}, 1000);


// get initial values
getHue();
getSat();
getLight();
setColBack( hslH, hslS, hslL );

//allow user to select HSL
$('#slider-hue').change( function() {
    getHue();
    setSatBack( hslH );
    setLightBack( hslH );
    setColBack( hslH, hslS, hslL );
});

$('#slider-sat').change( function() {
    getSat();
    setColBack( hslH, hslS, hslL );
});

$('#slider-light').change( function() {
    getLight();
    setColBack( hslH, hslS, hslL );
});


$('#btn-next-hex').click( function() {
  //save current value
  var something = "test";
  storeAnswers.push( {'Q':hexCode, 'A': something} )

  console.log(storeAnswers);


  //show new one
  getRandom();
  updatePageHex();
})

//functions to change background sat & hue cols
function getHue() { hslH = $('#slider-hue').val(); }
function getSat() { hslS = $('#slider-sat').val(); }
function getLight() { hslL = $('#slider-light').val(); }

function setSatBack( hue ) {
  var satBack = 'linear-gradient(to right, hsla(207, 0%, 50%, 1), hsla(' + hue + ', 100%, 50%, 1))'
  $('#slider-sat-wrap').css('background', satBack);
}

function setLightBack( hue ) {
  var lightBack = 'linear-gradient(to right, hsla(0, 0%, 0%, 1), hsla(' + hue + ', 100%, 50%, 1), hsla(360, 100%, 100%, 1))';
  $('#slider-light-wrap').css('background', lightBack);
}

function setColBack( hue, sat, light ) {
  $('#color-wrap').css('background', 'hsla(' + hue + ', ' + sat + '%, ' + light + '%, 1)');
}

//assign random hex code
function getRandom() {
  hexCode = '#' + (function co(lor){   return (lor +=
    [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'][Math.floor(Math.random()*16)])
    && (lor.length == 6) ?  lor : co(lor); })('');
}

// update hex code on page
function updatePageHex() {
  $('#hex-code').text(hexCode);
}

//when ready get final HSL values

//convert HSL to hex

//define score












}); // end document ready