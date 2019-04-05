'use strict';
// import "style.css";

const changeTheme = function(){
	const domElements = [...document.getElementsByClassName('theme')];
		domElements.forEach((elem) => {
			if (elem.classList.contains("circle_black")){
				elem.classList.remove("circle_black");
				elem.classList.add("circle_white");
			}else if (elem.classList.contains("circle_white")){
				elem.classList.remove("circle_white");
				elem.classList.add("circle_black");
			}else if ((getComputedStyle(elem).backgroundColor === 'rgb(0, 0, 0)')||(getComputedStyle(elem).backgroundColor == '')){ 
				elem.style.color = 'black';
				elem.style.backgroundColor = 'white';
			}else{
				elem.style.color = 'white';
				elem.style.backgroundColor = 'black';
			}

			
			});
};


const randomPaint = function(){
	if (cells.length !== 0){
		const numberCell = cells[Math.trunc(Math.random()*cells.length)];
		paint(document.body.querySelector('[data-id="'+numberCell+'"]'));
	}
}

const createCircle = function(domElement){
	cells.splice(cells.indexOf(domElement.dataset.id), 1);
	domElement.onclick = '';
	const circle = document.createElement('div');
	circle.className = "circle";
	const circleHalf = document.createElement('div');
	circleHalf.className = "circle__half theme";
	const circleHalfRight = document.createElement('div');
	circleHalfRight.className = "circle__half circle__half--right theme";
	if ((getComputedStyle(domElement).backgroundColor === 'rgb(0, 0, 0)')||(getComputedStyle(domElement).backgroundColor == '')){ 
			circleHalf.classList.add('circle_white');
			circleHalfRight.classList.add('circle_white');
		}else{
			circleHalf.classList.add('circle_black');
			circleHalfRight.classList.add('circle_black');
		}
	circle.appendChild(circleHalf);
	circle.appendChild(circleHalfRight);
	domElement.appendChild(circle);
}

const createCross = function(domElement){
	cells.splice(cells.indexOf(domElement.dataset.id), 1);
	domElement.onclick = '';
	const cross = document.createElement('div');
	cross.className = "cross";
	const crossLeft = document.createElement('div');
	crossLeft.className = "cross_all cross-left theme";
	const crossRight = document.createElement('div');
	crossRight.className = "cross_all cross-right theme";
	if ((getComputedStyle(domElement).backgroundColor === 'rgb(0, 0, 0)')||(getComputedStyle(domElement).backgroundColor == '')){ 
		crossLeft.classList.add('cross_white')
		crossRight.classList.add('cross_white')
	}
	else{
		crossLeft.classList.add('cross_black');
		crossRight.classList.add('cross_black');
	}
	cross.appendChild(crossRight);
	cross.appendChild(crossLeft);
	domElement.appendChild(cross);
}

const win = function(){
	
	for(let i=1; i<7; i+=3){
		if ((document.body.querySelector('[data-id="'+i+'"]').firstChild !== null)&&
			(document.body.querySelector('[data-id="'+(i+1)+'"]').firstChild !== null)&&
			(document.body.querySelector('[data-id="'+(i+2)+'"]').firstChild !== null)&&
			(document.body.querySelector('[data-id="'+i+'"]').firstChild.className ===
			document.body.querySelector('[data-id="'+(i+1)+'"]').firstChild.className)&&
			(document.body.querySelector('[data-id="'+i+'"]').firstChild.className ===
			document.body.querySelector('[data-id="'+(i+2)+'"]').firstChild.className)){
				return (document.body.querySelector('[data-id="'+(i+1)+'"]').firstChild.className);
		}
	}
	
	for(let i=1; i<4; i++){
		if ((document.body.querySelector('[data-id="'+i+'"]').firstChild !== null)&&
			(document.body.querySelector('[data-id="'+(i+3)+'"]').firstChild !== null)&&
			(document.body.querySelector('[data-id="'+(i+6)+'"]').firstChild !== null)&&
			(document.body.querySelector('[data-id="'+i+'"]').firstChild.className ===
			document.body.querySelector('[data-id="'+(i+3)+'"]').firstChild.className)&&
			(document.body.querySelector('[data-id="'+i+'"]').firstChild.className ===
			document.body.querySelector('[data-id="'+(i+6)+'"]').firstChild.className)){
				return (document.body.querySelector('[data-id="'+(i+3)+'"]').firstChild.className);
		}
	}
	
	if ((document.body.querySelector('[data-id="1"]').firstChild !== null)&&
		(document.body.querySelector('[data-id="5"]').firstChild !== null)&&
		(document.body.querySelector('[data-id="9"]').firstChild !== null)&&
		(document.body.querySelector('[data-id="1"]').firstChild.className ===
		document.body.querySelector('[data-id="5"]').firstChild.className)&&
		(document.body.querySelector('[data-id="5"]').firstChild.className ===
		document.body.querySelector('[data-id="9"]').firstChild.className)){
			return (document.body.querySelector('[data-id="5"]').firstChild.className);	
	}

	if ((document.body.querySelector('[data-id="3"]').firstChild !== null)&&
		(document.body.querySelector('[data-id="5"]').firstChild !== null)&&
		(document.body.querySelector('[data-id="7"]').firstChild !== null)&&
		(document.body.querySelector('[data-id="3"]').firstChild.className ===
		document.body.querySelector('[data-id="5"]').firstChild.className)&&
		(document.body.querySelector('[data-id="5"]').firstChild.className ===
		document.body.querySelector('[data-id="7"]').firstChild.className)) {
			return (document.body.querySelector('[data-id="5"]').firstChild.className);
	}

	return undefined;
	}

const draw = function(){
	const draw = document.createElement('div');
	draw.className = "draw";
	document.body.appendChild(draw);
}

const winner = function(whoWin){
	if (whoWin === undefined){return false};
	const win = document.createElement('div');
	win.className = "winner";
	const txt = document.createElement('h2');
	txt.className = "show";
	txt.appendChild(document.createTextNode(`Congradulations ${whoWin}`));
	win.appendChild(txt);
	document.body.appendChild(win);
	return true;
}

let playerTag = 0;
const cells = [];
for(let i = 0; i<9; i++){
	cells[i] = i+1+'';
}

const paint = new function(){
	let bool = true;
	return function(elem){
		
		if (bool){
			createCross(elem);
			bool = !bool;
			
		}else{
			createCircle(elem);
			bool = !bool;
		}

		setTimeout(()=>{},2000)
		if(!winner(win())){

			if(cells.length===0){draw()}

			if(!bool){randomPaint()};
		}
	}
}

//console.log(document.getElementById('board'));
//createCross(document.getElementById('board'));