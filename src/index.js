'use strict';
// import "style.css";

const changeTheme = function(element){
	const domElements = [...element.getElementsByClassName('theme')];
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

const moveToCarusel = function(elem,carusel){
		//console.log(elem);
		//console.log(carusel.getBoundingClientRect());
		elem.style.top = '0px';
		elem.style.transition = '2s';
		elem.style.width = '10vw';
		elem.style.height = '10vw';
		const marginsLeft = document.body.getBoundingClientRect().width / 100; 
		const newBoard = carusel.clientHeight / 35 + 'px';
		elem.style.setProperty('--bord', newBoard);
		elem.style.top = carusel.getBoundingClientRect().y + carusel.clientTop +'px';
		const newLeft = (!carusel.lastElementChild)? carusel.getBoundingClientRect().left + carusel.clientLeft : carusel.lastElementChild.getBoundingClientRect().right;
		elem.style.left = newLeft + marginsLeft + 'px';
		[...elem.querySelectorAll('[data-id]')].forEach((elem)=>{
			elem.removeAttribute('data-id');
			console.log(elem);
		});
		elem.addEventListener('transitionend',() => {
			elem.style.transition = '';
			elem.style.position = 'relative';
			elem.style.setProperty('--durations', '0s');
			elem.style.setProperty('animationDelay', '0s');	
			carusel.appendChild(elem);
			elem.style.top = '';
			elem.style.left = ''
			elem.style.marginLeft = marginsLeft + 'px';
			playBoard.gameCounter++;
			board.onclick = '';

			new playBoard();
			console.log(elem, elem.getBoundingClientRect())});

	}

const playBoard = new function(){

	const createCircle = function(domElement){
		cells.splice(cells.indexOf(domElement.dataset.id), 1);
		
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
		console.log(domElement.dataset.id);
		cells.splice(cells.indexOf(domElement.dataset.id), 1);
		
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

	const carusel = document.getElementById('carusel');

	const win = function(){
		
		for(let i=1; i<8; i+=3){
			if ((document.body.querySelector('[data-id="'+i+'"]').firstElementChild !== null)&&
				(document.body.querySelector('[data-id="'+(i+1)+'"]').firstElementChild !== null)&&
				(document.body.querySelector('[data-id="'+(i+2)+'"]').firstElementChild !== null)&&
				(document.body.querySelector('[data-id="'+i+'"]').firstElementChild.className ===
				document.body.querySelector('[data-id="'+(i+1)+'"]').firstElementChild.className)&&
				(document.body.querySelector('[data-id="'+i+'"]').firstElementChild.className ===
				document.body.querySelector('[data-id="'+(i+2)+'"]').firstElementChild.className)){
					return (document.body.querySelector('[data-id="'+(i+1)+'"]').firstElementChild.className);
			}
		}
		
		for(let i=1; i<4; i++){
			if ((document.body.querySelector('[data-id="'+i+'"]').firstElementChild !== null)&&
				(document.body.querySelector('[data-id="'+(i+3)+'"]').firstElementChild !== null)&&
				(document.body.querySelector('[data-id="'+(i+6)+'"]').firstElementChild !== null)&&
				(document.body.querySelector('[data-id="'+i+'"]').firstElementChild.className ===
				document.body.querySelector('[data-id="'+(i+3)+'"]').firstElementChild.className)&&
				(document.body.querySelector('[data-id="'+i+'"]').firstElementChild.className ===
				document.body.querySelector('[data-id="'+(i+6)+'"]').firstElementChild.className)){
					return (document.body.querySelector('[data-id="'+(i+3)+'"]').firstElementChild.className);
			}
		}
		
		if ((document.body.querySelector('[data-id="1"]').firstElementChild !== null)&&
			(document.body.querySelector('[data-id="5"]').firstElementChild !== null)&&
			(document.body.querySelector('[data-id="9"]').firstElementChild !== null)&&
			(document.body.querySelector('[data-id="1"]').firstElementChild.className ===
			document.body.querySelector('[data-id="5"]').firstElementChild.className)&&
			(document.body.querySelector('[data-id="5"]').firstElementChild.className ===
			document.body.querySelector('[data-id="9"]').firstElementChild.className)){
				return (document.body.querySelector('[data-id="5"]').firstElementChild.className);	
		}

		if ((document.body.querySelector('[data-id="3"]').firstElementChild !== null)&&
			(document.body.querySelector('[data-id="5"]').firstElementChild !== null)&&
			(document.body.querySelector('[data-id="7"]').firstElementChild !== null)&&
			(document.body.querySelector('[data-id="3"]').firstElementChild.className ===
			document.body.querySelector('[data-id="5"]').firstElementChild.className)&&
			(document.body.querySelector('[data-id="5"]').firstElementChild.className ===
			document.body.querySelector('[data-id="7"]').firstElementChild.className)) {
				return (document.body.querySelector('[data-id="5"]').firstElementChild.className);
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
		cells.length = 0;
		moveToCarusel(document.getElementById(gameCounter),carusel);
		gameCounter++;
		const wins = document.createElement('div');
		wins.className = "winner";
		const txt = document.createElement('h2');
		//txt.className = "show";
		txt.appendChild(document.createTextNode(`Congradulations ${whoWin}`));
		wins.appendChild(txt);
		board.firstElementChild.appendChild(wins);
		return true;
	}


	let gameCounter = 0;
	let playerTag;
	const cells = [];

	const board = document.getElementById('board');



	function render() {
		
		const randomPaint = function(){
			if (cells.length !== 0){
				const numberCell = cells[Math.trunc(Math.random()*cells.length)];
				paint(document.body.querySelector('[data-id="'+numberCell+'"]'));
			}
		}

		const paint = new function(){
			let bool = false;
			return function(elem){

				board.onclick = '';
				
				if (bool){
					createCross(elem);
					bool = !bool;
					
				}else{
					createCircle(elem);
					bool = !bool;
				}

				setTimeout(()=>{

					if(!winner(win())){
						if(cells.length===0){
							draw();
							moveToCarusel(document.getElementById(gameCounter),carusel);
						} else {
							if(bool){randomPaint()};
						}
					}

					setTimeout(() => {
						board.onclick = (event) => {

							if(cells.includes(event.target.dataset.id)){
								paint(event.target);
							}
						}
					},2000);
				},2000); 
			}
		}

		for(let i = 0; i<9; i++){
			cells[i] = i+1+'';
		}
		console.log('create cells');

		board.onclick = (event) => {

			if(cells.includes(event.target.dataset.id)){
				paint(event.target);
			}
		}

		board.firstElementChild.innerHTML = `
			<div class="board theme" id="${gameCounter}">
				${cells.map((elem,item)=>{
					return `<div class="el theme" data-id=${item + 1} ></div>`
				}).join('')}
			</div>`
			if (getComputedStyle(board).backgroundColor === 'rgb(0, 0, 0)'){
				changeTheme(board.firstElementChild);
			}
		}

	return render;

}



console.log(document.getElementsByClassName('show')[0]);
document.getElementsByClassName('show')[0].addEventListener('animationend', function() {
		console.log('Play')
         playBoard();
        });



//console.log(document.getElementById('board'));
//createCross(document.getElementById('board'));