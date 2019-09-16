
if (document.getElementById('page-header')) {
	var swiper = {

	    touchStartX: 0,
	    touchEndX: 0,
	    minSwipePixels: 30,
	    detectionZone: undefined,
	    swiperCallback: function() {},

	    init: function (detectionZone, callback) {
	        swiper.swiperCallback = callback
	        detectionZone.addEventListener('touchstart', function (event) {
	            swiper.touchStartX = event.changedTouches[0].screenX;
	        }, false);
	        detectionZone.addEventListener('touchend', function (event) {
	            swiper.touchEndX = event.changedTouches[0].screenX;
	            swiper.handleSwipeGesture();
	        }, false);
	    },

	    handleSwipeGesture: function () {
	        var direction,
	            moved
	        if (swiper.touchEndX <= swiper.touchStartX) {
	            moved = swiper.touchStartX - swiper.touchEndX
	            direction = "left"
	        }
	        if (swiper.touchEndX >= swiper.touchStartX) {
	            moved = swiper.touchEndX - swiper.touchStartX
	            direction = "right"
	        }
	        if (moved > swiper.minSwipePixels && direction !== "undefined") {
	            swiper.swipe(direction, moved)
	        }
	    },

	    swipe: function (direction, movedPixels) {
	        var ret = {}
	        ret.direction = direction
	        ret.movedPixels = movedPixels
	        swiper.swiperCallback(ret)
	    }
	}


	var gestureZone = document.getElementById('page-header');
	swiper.init(gestureZone, function(e) {
	   // console.log(e)
	    if (e.direction == 'left') {
				quandamove(1);
	    } else if (e.direction == 'right') {
				quandamove(-1);
	    }
	})

}
//var animationHue = 227;
//var stepHue = 80;
//
//function assignHue() {
//	animationHue = animationHue + stepHue;
//	document.body.style.setProperty('--cover-h', animationHue);//set
//}



const qandaSlideDuration = 10000;


function playvideo(mediaElement) {
	if(mediaElement.duration > 0){ //wont play if setting playbackrate on iOS if duration is NaN
		mediaElement.playbackRate = mediaElement.duration / ((qandaSlideDuration + 1000) / 1000); // +1s for the blending
		mediaElement.currentTime = 0; //AbortError: The operation was aborted. is expected in Firefox<70 . https://bugzilla.mozilla.org/show_bug.cgi?id=1507193
	}
	//console.log(mediaElement.playbackRate);
	 mediaElement.play();
}

jQuery(document).ready(function($) { // too early for video on ios anyway :/
	//var mediaElement = document.querySelector('.movie video');
	//console.log(mediaElement.duration);
	//mediaElement.playbackRate = .5;
	//mediaElement.play();
	playvideo(document.querySelector('.movie .current')); 
});


function quandamove(distance) {
		console.log('quandamove', distance);
		//assignHue()
		
		
    
		quandaautonext.clear();
		$( ".qanda-parent" ).each(function( index ) {
		//	$('video').trigger('pause');
			for (i=0; i<Math.abs(distance);i++) {
				if(distance > 0) {
					if ( $(this).find('.current').is(':last-child') ) {
						$(this).find('.current').removeClass('current');
						$(this).children().first().addClass('current');
					} else {
							$(this).find('.current').removeClass('current').next().addClass('current');
					}
				} else {
					if ( $(this).find('.current').is(':first-child') ) {
						$(this).find('.current').removeClass('current');
						$(this).children().last().addClass('current');
					} else {
							$(this).find('.current').removeClass('current').prev().addClass('current');
					}
				}
			}
		});
    playvideo(document.querySelector('.movie .current'));
		quandaautonextinit();
};




var quandaautonext;
quandaautonextinit();
watchfocus();
function watchfocus() { // to stop animation when tab or browser is not in focus

	// browser and tab has focus?
	window.addEventListener("blur", function(event){
	//console.log('blur');
	  quandaautonext.clear();
		$('video').trigger('pause');
	}, false);

	window.addEventListener("focus", function(event){
		//console.log('focus');
		quandaautonextinit();
     playvideo(document.querySelector('.movie .current'));
	}, false);


//
//	// tab has focus?
//  var hidden = "hidden";
//  // Standards:
//  if (hidden in document)
//    document.addEventListener("visibilitychange", onchange);
//  else if ((hidden = "mozHidden") in document)
//    document.addEventListener("mozvisibilitychange", onchange);
//  else if ((hidden = "webkitHidden") in document)
//    document.addEventListener("webkitvisibilitychange", onchange);
//  else if ((hidden = "msHidden") in document)
//    document.addEventListener("msvisibilitychange", onchange);
//  // IE 9 and lower:
//  else if ("onfocusin" in document)
//    document.onfocusin = document.onfocusout = onchange;
//  // All others:
//  else
//    window.onpageshow = window.onpagehide
//    = window.onfocus = window.onblur = onchange;
//
//
//  function onchange (evt) {
//    var v = "visible", h = "hidden",
//        evtMap = {
//          focus:v, focusin:v, pageshow:v, blur:h, focusout:h, pagehide:h
//        };
//    evt = evt || window.event;
//    if (evt.type in evtMap) {
//			//   document.body.className = evtMap[evt.type];
//      if (evtMap[evt.type] == v) {
//				quandaautonextinit();
//	      //console.log('go')
//      } else {
//	    	quandaautonext.clear();
//	      //console.log('halt')
//      }
//		} else {
//    	//  document.body.className = this[hidden] ? "hidden" : "visible";
//      if (this[hidden] == true) {
//	    	quandaautonext.clear();
// 				$('video').trigger('pause');
//	      console.log('halt');
//      } else {
//				quandaautonextinit();
// 				$('video.current').trigger('play');
//	      console.log('go');
//      }
//  	}
//  }
//
//
//
//  // set the initial state (but only if browser supports the Page Visibility API)
//
//  if( document[hidden] !== undefined ) {
//    onchange({type: document[hidden] ? "blur" : "focus"});
//	}

};



function quandaautonextinit() {
//	console.log('quandaautonextinit');
	quandaautonext=window.rInterval(function(){quandamove(1);},qandaSlideDuration);
}



//function qandaRandomStart(){
//	$('#qanda__list .current').removeClass('current');
//	let arrEligible = new Array;
//	let probTotal = 0;
//	$('#qanda__list').children().each(function(){
//			probTotal += $(this).data('probability');
//	});
//
//	while(!arrEligible.length) {
//		$('#qanda__list').children().each(function(){
//				prob = $(this).data('probability') / probTotal;
//				r = Math.random();
//				if(prob > r) {
//					arrEligible.push($(this));
//				}
//		});
//	};
//	$(arrEligible[Math.floor(Math.random(arrEligible.length))]).addClass('current');
//}
//
$(document).keydown(function(e) {
		switch(e.which) {
				case 37: // left
				e.preventDefault(); // prevent the default action (scroll / move caret)
				quandamove(-1)
				break;

	//			case 38: // up
	//			break;

				case 39: // right
				e.preventDefault(); // prevent the default action (scroll / move caret)
				quandamove(1);
				break;

	 //		 case 40: // down
	 //		 break;

				default: return; // exit this handler for other keys
		}
});


$('#qanda__nav .qanda__nav-dot-item').click(function (e) {
    var current = $('#qanda__nav .current').index();
    var index = $(this).index();
    var distance = index - current;
  //  for (i=0; i<Math.abs(distance);i++) {
	//		quandamove(distance/Math.abs(distance));
  //  }
  	quandamove(distance);
});

//window.onresize = function() { //fixing mobile viewport height
//    document.body.height = window.innerHeight;
//}
//
//window.onresize(); // called to initially set the height.
//

//* DOCUMENT READY	*/
jQuery(document).ready(function($) {
	if($('#qanda__list').length) {
	//	qandaRandomStart();
	};
}); //on ready


