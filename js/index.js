//to-do alarm, control styling, cycle indicator,

//circle text
$('#upper').circleType({radius: 120});
$('#lower').circleType({radius: -100});

//initialize variables
var work = 25; //default work times in seconds
var brk=5; //default break time in seconds
var remaining=work*60;
var cycle="work";
var state="paused";
var workWork = new Audio('https://www.myinstants.com/media/sounds/wc3-peon-says-work-work-only-.mp3');
var workComplete = new Audio('http://www.thanatosrealms.com/war2/sounds/orcs/basic-orc-voices/work-complete.wav')
//refresh controls display
var updateControls = function() {
  $('.break>.v').text(brk+':00');
  $('.work>.v').text(work+':00');
  $('#count').text(work);
}
//cycles length manipulation
$('.control').on('click', function(){
  if($(this).hasClass('w+')) work++;
  else if ($(this).hasClass('w-')&& work>1) work--;
  else if ($(this).hasClass('b+')) brk++;
  else if ($(this).hasClass('b-')&& brk>1) brk--;
  else return false;
  
  updateControls();
  remaining = work*60;
});

//start/stop/reset buttons
$('#red').on('click', function(){
  $('.pointer').css("animation-play-state" , "paused");
  $('#pointer').removeClass('pointer').animate({'nothing':null}, 1, function () {
    $(this).addClass('pointer');    
  });
  state="paused";
  updateControls();
  remaining = work*60;
});
$('#green').on('click', function(){
  $('.pointer').css("animation-play-state" , "running");
  state="running";
  ticking();
});
$('#black').on('click', function(){
  $('.pointer').css("animation-play-state" , "paused");
  state="paused";
});
//swap cycles
function swap(){
  if(cycle === "work"){
    cycle = "break";
    $('.pointer, .point').css("background-color", "#228b22");
    remaining = brk*60;
    ticking();
    workComplete.play();
  }
  else{
    cycle = "work";
    $('.pointer, .point').css("background-color", "#b22222");
    remaining = work*60
    ticking();
    workWork.play();
  }
}

//state check
function checkState(interval){
  if(state==="running"){
    return true;
  }
  else{
    clearInterval(interval);
  }
}

//clock start
function ticking(){ 
  $('#count').html(Math.floor(remaining/60));
  //countdown
  if(countdown) return false; 
  else{
    var countdown= setInterval(function(){
      //check state
      checkState(countdown);
      if(remaining > 1){
        console.log(remaining);
        remaining -=1;
        $('#count').html(Math.floor(remaining/60));
      }
      else{
        clearInterval(countdown);
        countdown=null;
        //call cycle swap function
        swap();
      }
    }, 1000) //countdown end
  }
}