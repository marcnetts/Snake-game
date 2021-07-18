let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let grid = 16;
let snake, pressedDirection, tempo, direction, food, resetGame = 0, gameStopped = 0;

gameover_image = new Image();
gameover_image.src = 'gameover.png';

document.addEventListener('keydown', update);

function setRandomPoint() {
    let doesMatchSnake = 1;
    let aux;

    while (doesMatchSnake == 1) {
        doesMatchSnake = 0;
        aux = {
            x:Math.floor(Math.random() * (grid - 1) + 1) * box,
            y:Math.floor(Math.random() * (grid - 1) + 1) * box
        };
        for (i = 0; i < snake.length; i++) {
            if (aux.x == snake[i].x && aux.y == snake[i].y)
            {
                console.log("ponto seria gerado em posicao " + i + " da cobrinha (" + aux.x + ", " + aux.y + ")")
                doesMatchSnake = 1;
            }
        }
    }

    return aux;
}

function criarBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, grid * box, grid * box);
}

function criarCobra(){
    for(i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function criarFood(){
    context.fillStyle = 'green';
    context.fillRect(snake[0].x, snake[0].y, box, box);
    context.fillStyle = 'red';
    context.fillRect(food.x, food.y, box, box);
}

function update(event){
    //teclas 37, 38, 39, 40
    if (pressedDirection == 0) {
        if(event.keyCode == 37 && direction != 'right') {
            direction = 'left';
            pressedDirection = 1;
        }
        if(event.keyCode == 38 && direction != 'down') {
            direction = 'up';
            pressedDirection = 1;
        }
        if(event.keyCode == 39 && direction != 'left') {
            direction = 'right';
            pressedDirection = 1;
        }
        if(event.keyCode == 40 && direction != 'up') {
            direction = 'down';
            pressedDirection = 1;
        }
    }
}

function iniciarJogo(){
    //screen loop
    if(snake[0].x > (grid - 1) * box)
        snake[0].x = 0;
    if(snake[0].x < 0)
        snake[0].x = (grid - 1) * box;
    if(snake[0].y > (grid - 1) * box)
        snake[0].y = 0;
    if(snake[0].y < 0)
        snake[0].y = (grid - 1) * box;

    criarBG();
    criarCobra();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == 'right') snakeX += box;
    if(direction == 'left') snakeX -= box;
    if(direction == 'up') snakeY -= box;
    if(direction == 'down') snakeY += box;
    pressedDirection = 0;

    criarFood();
    if(snake[0].x == food.x && snake[0].y == food.y) {
        food = setRandomPoint();
        criarFood();
        if (tempo > 80) //max speed
            tempo -= 20;
    }
    else
        snake.pop();
    
    for (let i = 1; i < snake.length; i++) {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            //clearInterval(jogo);
            gameStopped = 1;
            context.drawImage(gameover_image, 0, 0);
            //alert("Game Over :(");
        }
    }

    snake.unshift({x: snakeX, y: snakeY});

    if(resetGame)
    {
        clearTimeout(loop);
        setupGame();
    }
    else if (!gameStopped)
        setTimeout(loop, tempo);
}

function loop(){ //permite limpar as variáveis de iniciarJogo()
    iniciarJogo();
}

function setupGame(){
    snake = [];
    pressedDirection = 0;
    tempo = 200;
    snake[0] = {
        x: 8 * box,
        y: 8 * box
    }
    direction = "right";
    food = setRandomPoint();
    resetGame = 0;
    gameStopped = 0;
    loop();
}

function newGame(){
    if (gameStopped == 1)
        setupGame();
    else
        resetGame = 1;
}

setupGame();
//let jogo = setInterval(iniciarJogo, 300);
