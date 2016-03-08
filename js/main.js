$( document ).ready(function() { 


//define variables
var hexCode = "#000000";
var currentHSL = "";
var hslH = "360";
var hslS = "100";
var hslL = "100";
var counter1 = 30;

var Answers = [];
var allScores = [];
var finalScore = 0;

var endQuotes = [
  'You. Are. Awful.',
  'Well that was lame.',
  'Average Joe.',
  'Pretty good sonny Jim.',
  'Amazeballs!!'
];


//click button to go to start of game
$('#start-game').click( function() {
  $('#home-page').addClass('js-hide-home');
  runGame();
})

$('#restart-game').click( function() {
   location.reload();
})


//RUN GAME FUNCTION
var runGame = function() {
    //randomly create hex code
    getRandom();
    updatePageHex();

    //show hex code in div home page
    $('#timer-1').text(counter1.toString());

    //after timer show end game screen
    var timer = setInterval(function() {
        counter1--;
        if(counter1 < 0) {
            //end game
            endGame(timer);
        } else {
          $('#timer-1').text(counter1.toString());
          if ( counter1 < 4 ) {
            console.log('ending');
            $('#timer-wrap').addClass('js-warning')
          }
        }
    }, 1000);


    // get initial values
    getHue();
    getSat();
    getLight();
    setLightBack( hslH, hslL );
    setColBack( hslH, hslS, hslL );

    //allow user to select HSL
    $('#slider-hue').change( function() {
        getHue();
        setSatBack( hslH );
        setLightBack( hslH, hslL );
        setColBack( hslH, hslS, hslL );
    });

    $('#slider-sat').change( function() {
        getSat();
        setLightBack( hslH, hslS );
        setColBack( hslH, hslS, hslL );
    });

    $('#slider-light').change( function() {
        getLight();
        setColBack( hslH, hslS, hslL );
    });


    $('#btn-next-hex').click( function() {
      //save current value
      var answerRGB = hslToRgb( hslH/360, hslS/100, hslL/100 );
      var questionRGB = hexToRgb(hexCode);
      
      //add to answer array
      Answers.push( {'Q':questionRGB, 'A': answerRGB} )

      //show new hex
      getRandom();
      updatePageHex();
    })
};
//END RUN GAME



//functions to change background sat & hue cols
function getHue() { hslH = $('#slider-hue').val(); }
function getSat() { hslS = $('#slider-sat').val(); }
function getLight() { hslL = $('#slider-light').val(); }

function setSatBack( hue ) {
  var satBack = 'linear-gradient(to right, hsla(207, 0%, 50%, 1), hsla(' + hue + ', 100%, 50%, 1))'
  $('#slider-sat-wrap').css('background', satBack);
}

function setLightBack( hue, sat ) {
  var lightBack = 'linear-gradient(to right, hsla(0, 0%, 0%, 1), hsla(' + hue + ', ' + sat + '%, 50%, 1), hsla(360, 100%, 100%, 1))';
  $('#slider-light-wrap').css('background', lightBack);
}

function setColBack( hue, sat, light ) {
  currentHSL = 'hsla(' + hue + ', ' + sat + '%, ' + light + '%, 1)'
  
  $('#color-wrap').css('background', currentHSL);
}

//assign random hex code
function getRandom() {
  hexCode = '#' + (function co(lor){   return (lor +=
    [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'][Math.floor(Math.random()*16)])
    && (lor.length == 6) ?  lor : co(lor); })('');
}

// CHECK SCORE
function checkScore(i) {
  var QR = Answers[i].Q[0];
  var QG = Answers[i].Q[1];
  var QB = Answers[i].Q[2];
  var AR = Answers[i].A[0];
  var AG = Answers[i].A[1];
  var AB = Answers[i].A[2];

  var scoreR = 0;
  var scoreG = 0;
  var scoreB = 0;

  scoreR = Math.round(((255 - diff( QR, AR )) / 255 ) * 100);
  scoreG = Math.round(((255 - diff( QG, AG )) / 255 ) * 100);
  scoreG = Math.round(((255 - diff( QB, AB )) / 255 ) * 100);

  ScoreAll = Math.round(( scoreR +  scoreG +  scoreB ) / 3);

  return(ScoreAll);

}

function endGame(timer) {
  clearInterval(timer);
  //calculate scores
  for (i = 0; i < Answers.length; i++) {
    allScores.push( checkScore(i) );
  }
  //calculate average score
  for (i = 0; i < allScores.length; i++) {
    finalScore = finalScore + allScores[i];
  }
  finalScore = Math.round((finalScore / allScores.length));
  //if null, make zero
  if (!finalScore) { finalScore = 0};
  //add to game over screen
  $('#final-score').html(finalScore)
  //add quote
  if (finalScore < 20) {
      $('#final-quote').html(endQuotes[0])
  } else if (finalScore >= 20 && finalScore < 40) {
      $('#final-quote').html(endQuotes[1])
  } else if (finalScore >= 40 && finalScore < 60) {
      $('#final-quote').html(endQuotes[2])
  } else if (finalScore >= 60 && finalScore < 80) {
      $('#final-quote').html(endQuotes[3])
  }   else if (finalScore >= 80) {
    $('#final-quote').html(endQuotes[4])
  }
  
  //show game over screen
  $('#game-over').addClass('now-over');
}


//calculate difference between 2 numbers
function diff(a, b) { return Math.abs(a - b) }


// update hex code on page
function updatePageHex() {
  $('#hex-code').text(hexCode);
}

//when ready get final HSL values

//convert HSL to hex

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
**/
function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}


function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ] : null;
}

//define score












}); // end document ready