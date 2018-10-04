const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const squareSize = 25;
let x = canvas.width/2;
let y = canvas.height/2;
let horizontalChange = true;
let d = squareSize;
let pointX = 0;
let pointY = 0;
let userScore = 0;
let readyToChangeDirection = true;
let snakeSquares = [{x,y}];


const drawSnake = () => {
	let lastX = snakeSquares[0].x;
	let lastY = snakeSquares[0].y;
	let currX, currY;
	horizontalChange ? x += d : y += d ;
	snakeSquares[0].x =	x;
	snakeSquares[0].y =	y;
	ctx.beginPath();
	ctx.rect(snakeSquares[0].x, snakeSquares[0].y, squareSize, squareSize);
	ctx.fillStyle = "#FFF";
    ctx.fill();
	ctx.stroke();
	for(let i = 1; i < snakeSquares.length; i++){
		currX = snakeSquares[i].x;
		currY = snakeSquares[i].y;
		ctx.beginPath();
		ctx.rect(currX, currY, squareSize, squareSize);
		ctx.fillStyle = "#FFF";
	    ctx.fill();
		ctx.stroke();
		snakeSquares[i].x = lastX;
		snakeSquares[i].y = lastY;
		lastX = currX;
		lastY = currY;
	}
}

const checkCollision = () => {
	if (x >= canvas.width || y >= canvas.height) alert("Try again?");
	if (x === pointX && y === pointY) score();
}

const drawPoint = () => {
	ctx.beginPath();
	ctx.rect(pointX, pointY, squareSize, squareSize);
	ctx.fillStyle = "#F00";
    ctx.fill();
	ctx.stroke();
}

const score = () => {
	userScore++;
	snakeSquares.push(x, y);
	generatePointCoords();
}

const generatePointCoords = () => {
	//Still need to check if the generated point is not in an occupied position by the snake
	pointX = Math.floor((Math.random() * (canvas.width / squareSize))) * squareSize;
	pointY = Math.floor((Math.random() * (canvas.height / squareSize))) * squareSize;
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#FFF";
    ctx.fillText("Score: " + userScore, canvas.width - 60, 20);
}

//Main function to draw canvas
const draw = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawSnake();
	checkCollision();
	drawPoint();
	drawScore();
}

//Handler when the user changes the snake direction
const keyDownHandler = (e) => {
	//right => 39  left => 37
	if (e.keyCode === 37 || e.keyCode === 39 ){
		/*
			Possible directions 
			x	|	y   |	right	|	left
			---------------------------------
			+	|		|	+ y     |	- y
			-	|		|	- y     |	+ y
				|	+	|	- x		|	+ x
				|	-	|	+ x		|	- x

		*/
		if ((e.keyCode === 37 && horizontalChange) || (e.keyCode === 39 && !horizontalChange)){
			d = -d;
		}
		horizontalChange = !horizontalChange;	
	}
}

document.addEventListener("keydown", keyDownHandler, false);

generatePointCoords();
draw();
setInterval(draw, 500);