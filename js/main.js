if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
}

z = 0;

var button = {
	init: function(div, pointingContainer, name, pageNumber) {
		this.div = div;
		this.container = pointingContainer;
		this.nameOf = name;
		this.pageNumber = pageNumber;
		this.eventListen();
	},
	eventListen: function() {
		var thisObject = this;
		this.div.addEventListener('click', function() {
			thisObject.hide(thisObject);
		});
	},
	hide: function(thisObject) {
		containers.forEach(function(element) {
			fade(element, 350, false);
			setTimeout(function() {
				if(innerWidth < 800) {
					document.body.style.height = '2000px';
				}
			}, 900);
			setTimeout(function() {
				element.style.display = 'none';
			}, 900);
		});
		fade(document.getElementById('loader-container'), 750, false);
		setTimeout(function() {
			document.getElementById('loader-container').style.display = 'none';
			fade(menu, 750, true);
			fade(social, 750, true);
			thisObject.switchPage();
		}, 950);
	},
	switchPage: function() {
		this.container.style.display = 'flex';
		if(innerWidth < 800) {
			document.body.style.height = '100%';
		}
		fade(this.container, 500, true, [true, -3, 0]);
		history.pushState({page: this.pageNumber}, "title "+this.pageNumber, '?'+this.nameOf);
		if(STATES[STATES.length - 1] !== this.nameOf) {
			STATES.push(this.nameOf);
		}
	}
}

//using the button object create objects for all the menu buttons
var STATES = [],
changeElements = document.querySelectorAll('.changer'),
containers = document.querySelectorAll('.container'),
names = ['home.html', 'work.html', 'about.html', 'faq.html', 'contact.html'],
menu = document.querySelector('#inner-container'),
social = document.querySelector('#footer');
elements = [];
for(var j = 0; j < changeElements.length; j++) {
	var page = Object.create(button);
	page.init(changeElements[j], containers[j], names[j], j+1, menu);
	elements.push(page);
}
onload = function() {
	checkURL(location.href.split('?')[1]);
	setLoader();
}
////////////////////////////////////////////////////////////////////////////////////////
var picture = {
	init: function(div) {
		this.div = div;
		this.picNum = div.classList[3];
		this.heightVh = ((window.getComputedStyle(this.div).getPropertyValue('height').split('p')[0] / innerHeight) * 100) + 'vh';
		this.widthVw = ((window.getComputedStyle(this.div).getPropertyValue('width').split('p')[0] / innerWidth) * 100) + 'vw';
		if(checkScreen1024()) {
			this.eventListen(this);
		}
	},
	maximize: function() {
		if(innerWidth > 1024) {
			var thisObj = this;
			fade(thisObj.div, 400, false);
			var thisObjInner = thisObj;
			setTimeout(function() {
				thisObj.div.childNodes[1].style.display = 'none';
				pics.forEach(function(element) {
					var el = element;
					if(element !== thisObj) {
						fade(element.div, 400, false);
						setTimeout(function(el) {
							element.div.style.display = 'none';
						}, 400);
					}
				});
				setTimeout(function(thisObj) {
					thisObjInner.div.style.display = 'none';
				}, 400);
				setTimeout(function(el) {
				document.getElementById('work-container').style.justifyContent = 'center';
				var width,
				style = thisObjInner.div.currentStyle || window.getComputedStyle(thisObjInner.div, false),
				bi = style.backgroundImage.slice(4, -1).replace(/"/g, "");
				var image = new Image();
				image.onload = function() {
					width = image.width;
					if(width > 1000) {
						width = Math.round(image.width * 0.4);
					} else {
						width = image.width;
					}
					thisObjInner.div.style.height = '76vh';
					thisObjInner.div.style.width = width + 'px';
				}
				image.src = bi;
			}, 400);
			setTimeout(function() {
				thisObj.div.style.display = 'flex';
				fade(thisObj.div, 400, true);
			}, 400);
			}, 400);
		}
	},
	minimize: function(thisObj) {
		fade(thisObj.div, 400,false);
		setTimeout(function(){
			thisObj.div.style.display = 'none';
			thisObj.div.style.backgroundImage = 'url("./css/img/' + thisObj.div.classList[0] + 1 +'.jpg")';
			thisObj.div.style.height = thisObj.heightVh;
			thisObj.div.style.width = thisObj.widthVw;
		},400);
		setTimeout(function() {
			pics.forEach(function(element) {
				if(element !== thisObj) {
					element.div.style.display = 'flex';
					setTimeout(function() {fade(element.div, 400, true)}, 400);
				}
			});
			setTimeout(function() {
				thisObj.div.style.display = 'flex';
				thisObj.div.childNodes[1].style.display = 'flex';
				fade(thisObj.div, 400, true);
			}, 50);
		}, 400);

		
		if(checkScreen1024()) {
			thisObj.eventListen(thisObj);
		}
	},
	eventListen: function(thisObj) {
		this.div.addEventListener('click', function temp() {
			thisObj.maximize();
			setBodyClicker(thisObj);
			this.removeEventListener('click', temp);
		}, false);
	}
}

//Create picture object for the work page using the picture object
pics = [];
DOMPics = document.querySelectorAll('.image');
DOMPics.forEach(function(element) {
	var page = Object.create(picture);
	page.init(element);
	pics.push(page);
});
//////////////////////////////////////////////////////////////////////////////////////////
//Create tag objects for the about page using the picture object
tags = [];
DOMTags = document.querySelectorAll('.tag');
DOMTagMeanings = document.querySelectorAll('.tagAnswers');
var tagObj = Object.create(picture);
tagObj.maximize = function() {
	thisObj = this;
	thisObj.DOMOb.forEach(function(element) {
		if(element.id == thisObj.nameOf) {
			element.style.display = 'inline';
			console.log('success', thisObj.nameOf);
		}
	});
}
tagObj.minimize = function(thisObj) {
	DOMTagMeanings.forEach(function(element) {
		element.style.display = 'none';
	});
	thisObj.eventListen(thisObj);
}
tagObj.init = function (div, name, DomOb) {
		this.div = div;
		this.nameOf = name;
		this.DOMOb = DomOb;
		this.eventListen(this);
	}

DOMTags.forEach(function(element) {
	var tempTag = Object.create(tagObj);
	var name = element.id;
	tempTag.init(element, name, DOMTagMeanings);
});
////////////////////////////////////////////////////////////////
//Create objects for faq buttons
var question = [];
var DOMQuestions = document.querySelectorAll('.question');
var DOMAnswers = document.querySelectorAll('.A');
DOMQuestions.forEach(function(element) {
	tempQ = Object.create(tagObj);
	var nameQ = element.id;
	tempQ.init(element, nameQ, DOMAnswers);
	question.push(tempQ);
});



//micellaneous functions
function adjust_textarea(h) {
    h.style.height = "20px";
    h.style.height = (h.scrollHeight)+"px";
}

function send(formSelector) {
	var formData = new FormData(document.querySelector(formSelector));
	var i = 0,
	errors = [],
	regexAlpha = /^[a-zA-Z0-9\-\s\@\.]+$/;
	if(formData == null || formData == undefined) {
		// display something went wrong
	} else {
		if(formData.get('name') == null || formData.get('name') == undefined || formData.get('name') == '' || !regexAlpha.test(formData.get('name'))) {
			errors.push(' name portion of the form is incorrect');
		} else {
			i++;
		}
		if(formData.get('email') == null || formData.get('email') == undefined || formData.get('email') == '' || !regexAlpha.test(formData.get('email'))) {
			errors.push(' email portion of the form is incorrect');
		} else {
			i++;
		}
		if(formData.get('subject') == null || formData.get('subject') == undefined || formData.get('subject') == '' || !regexAlpha.test(formData.get('subject'))) {
			errors.push(' subject portion of the form is incorrect');
		} else {
			i++;
		}
		 if(formData.get('description') == null || formData.get('description') == undefined || formData.get('description') == '' || !regexAlpha.test(formData.get('description'))) {
			errors.push(' description portion of the form is incorrect');
		} else {
			i++;
		}
		if(i == 4) {
			document.querySelector('form').style.display = 'none';
			document.querySelector('#form-replace').style.display = 'flex';
			emailjs.sendForm('gmail', 'intemp', formSelector)
			.then(function(response) {
		       console.log('SUCCESS!', response.status, response.text);
		    }, function(error) {
		       console.log('FAILED...', error);
		    });
		} else {
			var s = false;
			if(errors.length > 1) {s = true;}
			alert('ERROR OCCURED. The following error' + (s ? 's' : '') + ' occured:' + errors.toString());
		}
	}
}	

window.onpopstate = function(event) {
	STATES.pop();
	elements.forEach(function(element){
		if(STATES[STATES.length - 1] === element.nameOf) {
			containers.forEach(function(element) {element.style.display = 'none';});
			element.switchPage();
		}
	});
}

function checkScreen1024() {
	if(window.innerWidth > '1024') {
		return true;
	} else {
		return false;
	}
}

function setBodyClicker(element) {
	var i = 1;
	var image = new Image();
	image.src = './css/img/' + element.div.classList[0] + 2 +'.jpg';
	document.getElementById('container-one').addEventListener('click', function pictureEvent(e) {
		if(e.target === element.div) {
			fade(element.div, 500, false);
			i++;
			setTimeout(function(){
				element.div.style.backgroundImage = 'url("./css/img/' + element.div.classList[0] + i +'.jpg")';
				var image = new Image();
				var width,
				style = element.div.currentStyle || window.getComputedStyle(element.div, false),
				bi = style.backgroundImage.slice(4, -1).replace(/"/g, "");
				var image = new Image();
				image.onload = function() {
					width = image.width;
					if(width > 1000) {
						width = Math.round(image.width * 0.4);
					} else {
						width = image.width;
					}
					element.div.style.height = '76vh';
					element.div.style.width = width + 'px';
				}
				image.src = bi;
				if(i >= element.picNum) {
					i = 0;
				// 	image.src = './css/img/' + element.div.classList[0] + (i+1) +'.jpg';
				}
			}, 500);
			setTimeout(function(){
				fade(element.div, 500, true);
			}, 500);
		} else {
			document.getElementById('container-one').removeEventListener('click', pictureEvent, true);
			element.minimize(element);
		}
	}, true);
}

function setLoader() {
	let loader = document.getElementById('loader-inner');
	loader.style.left = ((innerWidth - window.getComputedStyle(loader).getPropertyValue('width').split('p')[0]) / 2) + 'px';
	document.getElementById('loader-container').style.display = 'flex';
}

function checkURL(nameURL) {
	pages = ['home.html', 'work.html', 'faq.html', 'about.html', 'contact.html'];
	var checked = false;
	if(pages.indexOf(nameURL) == -1) {
		checked = true;
	}
	if(nameURL == undefined || nameURL == null || checked == true) {
		nameURL = 'home.html';
	}
	elements.forEach(function(element) {
		if(element.nameOf === nameURL) {
			element.hide(element);
		}
	});
	
}

