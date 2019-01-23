function fade(element, time = 1000, io = true, move = [false, 0, 0]) {
	var elementStyle = window.getComputedStyle(element); //element.style is not the same as the elements style in the style sheet so you need this
	element.style.opacity = elementStyle.getPropertyValue('opacity');
	element.style.marginTop = (elementStyle.getPropertyValue('margin-top').split('p')[0] - move[1]*10) + 'px';
	element.style.marginLeft = elementStyle.getPropertyValue('margin-left');

	var last = +new Date();
	var tick = function() {
		element.style.opacity = (+element.style.opacity + (io ? ((new Date() - last) / time) : -1*(new Date() - last) / time)).toFixed(2); //fadeIn if true : fadeOut if false
									// plus symbol infront converts it to a number from a string object, date - last gets time since the last time it was run 
									// when divided by time it gives a portion of how much it should change to complete the entire change by the end of the time
		if(move[0] == true) {
			if(move[1] != 0 && move[1] != undefined) {
				element.style.marginTop = (+element.style.marginTop.split('p')[0] + move[1]*10*(new Date() - last) / time) + 'px';
			}
			if(move[2] != 0 && move[2] != undefined) {
				element.style.marginLeft = (+element.style.marginLeft.split('p')[0] + move[2]*10*(new Date() - last) / time) + 'px';
			}
		}
		last = +new Date();
		if (io ? element.style.opacity <= 1 : element.style.opacity >= 0) { // fadeIn if true : fadeOut if false
			(window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
		}
	};
	tick(); // closure
}

function fadeIntervalO(element) {
	var elementStyle = window.getComputedStyle(element); //element.style is not the same as the elements style in the style sheet so you need this
	element.style.opacity = elementStyle.getPropertyValue('opacity');
	var interval = setInterval(function() {
		if(element.style.opacity <= 0.05) {
			clearInterval(interval);
		}
		element.style.opacity -= 0.05;
	}, 20);
}

function fadeIntervalI(element) {
	var op = 0.1;
	var interval = setInterval(function() {
		element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
		if(element.style.opacity >= 1) {
			clearInterval(interval);
		}
	}, 20);
}

// fadeIntervalO(document.querySelector('div'));

// element is what element you are wanting to either fade and/or move 
// time is how long the animation will go on for
// io is fadeIn (T) or fadeOut (F)
// move is [whether it will move, how far it will move in the amount of time in the y direction (pos is down), 
// how far it will move in the amount of time in the x direction(pos is right)] movement is speed in ~10*(move)pixels per (time)seconds