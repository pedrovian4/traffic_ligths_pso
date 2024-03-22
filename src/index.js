const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");



// Define o tamanho  do canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// Desenha as ruas 
function drawRoads() {
    const roadWidth = 900;
    const backgroundColor = "green";
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(centerX - roadWidth / 2, centerY - roadWidth / 2, roadWidth, roadWidth);

    const lineWidth = 70;
    const lineColor = "#888888";
    ctx.fillStyle = lineColor;
    ctx.fillRect(centerX - roadWidth / 2, centerY - lineWidth / 2, roadWidth, lineWidth);
    ctx.fillRect(centerX - lineWidth / 2, centerY - roadWidth / 2, lineWidth, roadWidth);

    // Draw dashed lines
    ctx.strokeStyle = "yellow";
    ctx.lineWidth = 5;
    ctx.setLineDash([40, 40]);
    ctx.lineDashOffset = 20;
    ctx.beginPath();
    ctx.moveTo(centerX - roadWidth / 2, centerY);
    ctx.lineTo(centerX + roadWidth / 2, centerY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(centerX, centerY - roadWidth / 2)
    ctx.lineTo(centerX, centerY + roadWidth);

    ctx.moveTo(centerX + 7, centerY - roadWidth / 2)
    ctx.lineTo(centerX + 7, centerY + roadWidth);
    ctx.stroke();
}


// Desenha sinal de transito
function drawTrafficLight(color) {
    const trafficLightWidth = 50;
    const trafficLightHeight = 90;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const trafficLightX = centerX - trafficLightWidth / 2;
    const trafficLightY = centerY - trafficLightHeight / 2;
    const lightRadius = 10;
    ctx.beginPath();
    ctx.rect(trafficLightX, trafficLightY, trafficLightWidth, trafficLightHeight);
    ctx.fillStyle = "#333333";
    ctx.fill();

    const lightOffsetX = trafficLightX + trafficLightWidth / 2;
    const lightOffsetY = trafficLightY + 20;

    // Red light
    ctx.beginPath();
    ctx.arc(lightOffsetX, lightOffsetY, lightRadius, 0, Math.PI * 2);
    ctx.fillStyle = color === "red" ? "red" : "darkred";
    ctx.fill();

    // Yellow light
    ctx.beginPath();
    ctx.arc(lightOffsetX, lightOffsetY + 30, lightRadius, 0, Math.PI * 2);
    ctx.fillStyle = color === "yellow" ? "yellow" : "darkgray";
    ctx.fill();

    // Green light
    ctx.beginPath();
    ctx.arc(lightOffsetX, lightOffsetY + 60, lightRadius, 0, Math.PI * 2);
    ctx.fillStyle = color === "green" ? "green" : "darkgreen";
    ctx.fill();
}


// Cor inicial do sinal
let currentColor = "green";


// Posições  dos carros
let positions = [-100, -150, -200]
//quantidade de carros a ser gerado
let cars = [{ position: -100 }, { position: -150 }, { position: -200 }]; 
//desenha os carros na pista 
function drawHorizontalCars(cars) {
    const backgroundColor = "blue";
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    for (let i = 0; i < cars.length; i++) {
        const carX = cars[i].position;
        if (carX > -900 && carX < 900) { 
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(centerX + carX, centerY + 10, 20, 20);
            ctx.fillRect(centerX + carX, centerY - 30, 20, 20);
        }else{
            cars[i].position = positions[i];
        }
    }
}


function moveHoriZontalCars() {
    for (let i = 0; i < cars.length; i++) {
        if(cars[i].position > 20){
            cars[i].position+=3
        }
        if (currentColor == 'red'){
            cars[i].position += 5 * Math.random()%4 + 4;
            console.log(cars[i].position); 
        }
    }
}

let upCars = [{position:-70}]
let upCarsPosicoes = [-70];
function moveUpCars(){
    
    for (let i = 0 ; i < upCars.length; i++){
        if(currentColor == "green"){
            upCars[i].position +=100*Math.random()%5; 
        }
    }

}



function drawUpcars(){
    const backgroundColor = "blue";
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const moveUp = centerY;
    for (let i =  0; i<upCars.length; i++){        
        
        if (canvas.height > moveUp + upCars[i].position){
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(centerX +10, moveUp + upCars[i].position, 20, 20);
        }else{
            ctx.fillRect(centerX +10, moveUp + upCarsPosicoes[i], 20, 20);
            upCars[i].position =  upCarsPosicoes[i];
        }

    }
}



let downCars = [{position:-30}]
let downCount = 0;
function drawDownCars(){
    const backgroundColor = "blue";
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const moveDown = centerY+60 + downCount
    for (let i =  0; i<downCars.length; i++){        
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(centerX -20, moveDown , 20, 20);
    }
}




function drawVerticalCars(){
    drawUpcars();
    drawDownCars();
}

function drawCars(){
    drawHorizontalCars(cars);
    drawVerticalCars();
}

function moveVerticalCars(){
    moveUpCars();

}

function moveCars (){
    moveHoriZontalCars();
    moveVerticalCars();
}


let i = 0;
setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawRoads();
    drawTrafficLight(currentColor);
    drawCars();
    moveCars();
   }, 30);

setInterval(() => {
    if (currentColor === "green") {
        currentColor = "yellow";
        setTimeout(() => {
            currentColor = "red";
        }, 4000);
    } else if (currentColor === "yellow") {
        currentColor = "red";
    } else {
        currentColor = "green";
    }
}, 35020);