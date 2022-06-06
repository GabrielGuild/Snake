//gamestate here we have the inital game before data 
let highscores = {
    highscore: [50000,40000,30000,20000,10000,9000,8000,7000,6000,
        5000,4000,3000,2000,1000,900,800,700,600,500,200],
highscoreNames: ['computer','computer','computer','computer','computer','computer','computer',
           'computer','computer','computer','computer','computer','computer','computer',
           'computer','computer','computer','computer','computer','computer',],
}
let gameState = {
    //below i call all the variables 
    xAxis: 31, //these control the size of the board for easy sizing 
    yAxis: 30,
    multiplyer: 1.2,
    timesrun: 0,
    score: 0,
    speed: 0,
    gameInterval: 0,
    apple: 0,
    indexSize: 0,
    playerName: '',
    gamestart: false,
    firstRun: true,
    end: false,
    
    //these are the arrays i use for snake and keeping track of high scores and the board coordinates themselves 
    tile: [] ,
    highscores: [50000,40000,30000,20000,10000,9000,8000,7000,6000,
                 5000,4000,3000,2000,1000,900,800,700,600,500,200],
    highscoreNames: ['computer','computer','computer','computer','computer','computer','computer',
                    'computer','computer','computer','computer','computer','computer','computer',
                    'computer','computer','computer','computer','computer','computer',],
     snake: [],
    nextDirection: [0,1],

    //below creates a playspace to hold the created div for the game 
    // i also create the layout for the score div and manage stored data if the player enters a name
    render(){
        this.indexSize = 0
        this.gamestart = true;
        let board = document.querySelector('#board')
        board.innerHTML = ''
        let playspace = document.createElement('div')
        playspace.className = 'playspace'
        board.appendChild(playspace);
        if (this.playerName.length = 0){
            this.playerName = 'Anonymous'
        }
        
        //declarations for the render function data 
        let coordinate = {
            coordinateX: 0,
            coordinateY: 0,
        }
        for(let y = 0; y < this.yAxis; y++){
            for(let x = 0; x < this.xAxis; x++){

                //creates the divs for the gameboard and assigns their x and y
                
                let square = document.createElement('div');
                square.className = "tile"
                square.dataset.tileNum = this.indexSize +1;
                square.dataset.x = x + 1;
                square.dataset.y = y + 1;
                this.indexSize++;
                playspace.appendChild(square);
                this.tile.push(coordinate);
                coordinate.coordinateX++;
            }
            coordinate.coordinateY++;
        }
        let Name = document.querySelector('.name').value;
        this.playerName = document.querySelector('.name').value
        let score = document.querySelector('.score');
        score.innerHTML = `${this.playerName}: `
    },
    menu(){
        //creates the menu for the first time before the the gameloop starts and sets the 
        //listener to the newly rendered play button
        let menuControls = document.querySelector('.menuControls')
        menuControls.innerHTML = ''
        let startText = ` `
        if(!this.gamestart){
            startText = `
            <input placeholder ='PlayerName'
            class = 'name' type = "text">
            <button type="button"  class = "play">Play</button>
            `
            }else if(this.gamestart){
                startText = `
                <button type = "button" class = "Reset">Reset</Reset>
                <button type = "button" class = "Menu">Menu</Reset>
                `
            }
        menuControls.innerHTML = startText;
        let startGame = document.querySelector(".play");

        //this is where the game first starts and ticks through the movement of the snake 
        startGame.addEventListener('click', function(event){

            //sets board and apple then runs a check for loss and ticks through the next itteration 
            gameState.render();
            gameState.getApple(gameState.indexSize);
            gameState.gameInterval = setInterval(function(){
            if(!gameState.firstRun){gameState.loseCheck();}
                if(gameState.end == true){
                    gameState.end =false;
                    return;
                    }
                gameState.tick();
             }, 100);
        });
    },

    tick(){
        //main game function moves snake and checks for loose condition 
        // or growth conditions
        //declares helper object to pass through
        let head = {
            x: 0,
            y: 0,
        }
        let body = {
            x: 0,
            y: 0,
        }
        let oldBody = {
            x: 0,
            y: 0,
        }
    let headindex = document.querySelector('.snake');
    let htmlApple = document.querySelector('.apple');

    // if(this.firstRun == false){this.loseCheck();}
        
      //checks for the first run
        if(this.firstRun){
            //the middle postion is calculated from the axsis sizes 
            head.x = Math.round(this.xAxis/2) /1;
            head.y = Math.round(this.yAxis/2) /1;
            this.snake.push(head);
            this.snake[0].y =head.y;
            //sets snake class on the calculated axsis index
            // document.querySelector(`[data-x="${head.x}"][data-y="${head.y}"]`).classList.add('snake');
            //sets false to run once 
            this.firstRun = false;
            return;}
            //main loop that handles the change of any body postioins 
            else {
                //records head postion before move 
                head.x = this.snake[0].x
                head.y = this.snake[0].y
                body.x = head.x
                body.y = head.y
                oldBody.x = head.x
                oldBody.y = head.y
                console.log ('the heads old postion is ', body);
                
                //sets old head postion to no color
                document.querySelector(`[data-x="${head.x}"][data-y="${head.y}"]`).classList.remove('snake');
                document.querySelector(`[data-x="${head.x}"][data-y="${head.y}"]`).classList.remove('snakehead');
                
                //increments head to the new postion 
                head.y = this.snake[0].y + this.nextDirection[1];
                head.x = this.snake[0].x + this.nextDirection[0];
                //then increments the reperesented postions stored in snake
                this.snake[0].y = this.snake[0].y + this.nextDirection[1];
                this.snake[0].x  = this.snake[0].x + this.nextDirection[0];
                // changes color of new head postion and checks if there is a apple there
               document.querySelector(`[data-x="${head.x}"][data-y="${head.y}"]`).classList.add('snake');
               document.querySelector(`[data-x="${head.x}"][data-y="${head.y}"]`).classList.add('snakehead');


            }
            // the for loop needs to take the old head postion and move the next body tile to it
            // record old tile postion and move the new body to that 
            
               let lastTileOldPostion = {
                    x: 0,
                    y: 0,
                }
               let currentTileOldPostion = {
                    x: 0,
                    y: 0,
                }
                this.snake.reverse();
                oldBody.x = this.snake[0].x
                oldBody.y = this.snake[0].y
                this.snake.reverse();
                lastTileOldPostion.x = body.x;
                lastTileOldPostion.y =  body.y;
                currentTileOldPostion.x = body.x
                currentTileOldPostion.y = body.y
                //main movement transition takes the tile coordinate in snake saves the old tile 
                //sets it equal to the new tile postion and so on 
            if(this.snake.length > 0){
                for(let i = 1; i < this.snake.length; i++){

                    document.querySelector(`[data-x="${currentTileOldPostion.x}"][data-y="${currentTileOldPostion.y}"]`).classList.remove('snake');

                    currentTileOldPostion.x = this.snake[i].x 
                    currentTileOldPostion.y = this.snake[i].y 

                    document.querySelector(`[data-x="${currentTileOldPostion.x}"][data-y="${currentTileOldPostion.y}"]`).classList.remove('snake');
                    
                    document.querySelector(`[data-x="${lastTileOldPostion.x}"][data-y="${lastTileOldPostion.y}"]`).classList.remove('snake');

                    this.snake[i].x = lastTileOldPostion.x
                    this.snake[i].y = lastTileOldPostion.y


                        lastTileOldPostion.x = currentTileOldPostion.x
                        lastTileOldPostion.y = currentTileOldPostion.y
                    
                    //turns the tile color off to move to new tile 
                        // document.querySelector(`[data-x="${lastTileOldPostion.x}"][data-y="${lastTileOldPostion.y}"]`).classList.add('snake');


                }
            }
            //checks if head index and apple index are the same 
            headindex = document.querySelector('.snakehead');
                if(headindex.dataset.tileNum == htmlApple.dataset.tileNum){
                    this.score +=  10 * this.multiplyer;
                    this.multiplyer += .2
                    let score = document.querySelector('.score');
                    score.innerHTML = `${this.playerName}:  ${this.score}`;
                    if(this.snake.length < 0){

                        this.snake.push(body);
                        this.snake.reverse();
                        //sets the new postion of the new tile
                        this.snake[0].x = this.snake[1].x
                        this.snake[0].y = this.snake[1].y
                        lastTileOldPostion.x = this.snake[1].x
                        lastTileOldPostion.y = this.snake[1].y
                        this.snake.reverse();
                        this.snake[0].x = body.x
                        this.snake[0].y = body.y

                        document.querySelector(`[data-x="${lastTileOldPostion.x}"][data-y="${lastTileOldPostion.y}"]`).classList.add('snake');

                     this.getApple(this.indexSize);
                    }else
                        this.snake.push(body);
                        this.snake.reverse();
                        //sets the new postion of the new tile
                        this.snake[0].x = lastTileOldPostion.x
                        this.snake[0].y = lastTileOldPostion.y
                        this.snake.reverse();
                        document.querySelector(`[data-x="${lastTileOldPostion.x}"][data-y="${lastTileOldPostion.y}"]`).classList.add('snake');

                     this.getApple(this.indexSize);

                    }
                    console.log('end snake is ', this.snake);
                    this.renderSnake();

 
    },
    //renders the new snake classes bosed on the new calculations 
    renderSnake(){
        for (let i = 0; i < this.snake.length; i++){
            document.querySelector(`[data-x="${this.snake[i].x}"][data-y="${this.snake[i].y}"]`).classList.add('snake');

        }
        
    },

    // gets the new orrientaion on the grid based on player input 
    getNextDirectionRight(){
        let newDirection  = [];
        let oldDirection = [];
        oldDirection[0] = this.nextDirection[0];
        oldDirection[1] = this.nextDirection[1];

        (oldDirection[0] === 0 && oldDirection[1] === 1) //down case
        ? (newDirection[0] = -1, newDirection[1] = 0):
        (oldDirection[0] === 1 && oldDirection[1] === 0) //right case
        ? (newDirection[0] = 0, newDirection[1] = 1):
        (oldDirection[0] === -1 && oldDirection[1] === 0) //left case
        ? (newDirection[0] = 0, newDirection[1] = -1):
        (oldDirection[0] === 0 && oldDirection[1] === -1) //up case
        ? (newDirection[0] = 1, newDirection[1] = 0):

        console.log('old direction x', oldDirection[0]);
        console.log('old direction y', oldDirection[1]);

        this.nextDirection.splice(0,  1, newDirection[0])
        this.nextDirection.splice(1,  1, newDirection[1])

    },
    
    getNextDirectionLeft(){
        
        let newDirection = [];
        let oldDirection = [];
        oldDirection[0] = this.nextDirection[0];
        oldDirection[1] = this.nextDirection[1];

        (oldDirection[0] === 0 && oldDirection[1] === 1) //down case
        ? (newDirection[0] = 1, newDirection[1] = 0):
        (oldDirection[0] === 1 && oldDirection[1] === 0) //right case
        ? (newDirection[0] = 0, newDirection[1] = -1):
        (oldDirection[0] === -1 && oldDirection[1] === 0) //left case
        ? (newDirection[0] = 0, newDirection[1] = 1):
        (oldDirection[0] === 0 && oldDirection[1] === -1) //up case
        ? (newDirection[0] = -1, newDirection[1] = 0):

        console.log('old direction x', oldDirection[0]);
        console.log('old direction y', oldDirection[1]);

        this.nextDirection.splice(0,  1, newDirection[0])
        this.nextDirection.splice(1,  1, newDirection[1])
    },
    // creates new apple location 
    getApple(tileNum){

        
        if(this.apple > 0){
            console.log('apple equals', this.apple)
          let oldApple = document.querySelector(`[data-tile-num="${this.apple}"]`);
          console.log('old apple tile is ', oldApple)
            oldApple.classList.remove('apple');
        }
        
        //first get apple
        
        this.apple = 0;
        this.apple = Math.floor(Math.random() * (tileNum) + 1)
        let newApple =this.apple;
        let htmlApple = document.querySelector(`[data-tile-num="${newApple}"]`);
        htmlApple.classList.toggle('apple');
    
    },
    // checks for a loss condition 
    loseCheck(){
        if(this.firstRun){
            return;
        }
        console.log(this.snake[0].x)
        if (this.snake[0].x >= this.xAxis + 1 || this.snake[0].y >= this.yAxis + 1){
            alert('GAME OVER', this.score);
            this.reset();
            return;
        }else if(this.snake[0].x === 0 || this.snake[0].y === 0){
            alert('GAME OVER', this.score);
            this.reset();
            return;
        }else {

            if(this.snake.length > 3){
        let snakeCheck = []
                for (let p = 0; p < this.snake.length; p++){
                    snakeCheck.push(this.snake[p])
                    snakeCheck[p].x = this.snake[p].x
                    snakeCheck[p].y = this.snake[p].y
                }
        for(let i = 0; i < this.snake.length; i++){
            
            for(let j = i+1; j < snakeCheck.length ; j++){
                if (this.snake[j].x === undefined){
                    continue;
                }
            if (this.snake[i].x === snakeCheck[j].x && this.snake[i].y === snakeCheck[j].y){
                alert('GAME OVER', this.score);
                this.reset();
                return;
            }
        }
            
            }
        }
    }
    },
    //resets the page if a loss condition is flagged 
    reset(){
        console.log('the reset is run here')
        this.recordScore();
        this.xAxis =31;//these control the size of the board for easy sizing 
        this.yAxis =30;
        this.gamestart =false;
        this.firstRun =true;
        this.appleTick =false;
        this.playerName ='';
        this.multiplyer =1.2;
        this.score =0;
        this.speed =0;
        //below is where tile data is stored and pushed too 
        this.tile =[] ;
        this.snake = [];
        this.nextDirection [0,1];
        this.apple = 0;
        // this.indexSize = 0;
        this.menu();
        let board = document.querySelector('#board');
            while (board.firstChild) {
                board.removeChild(board.firstChild);
            }
        clearInterval(this.gameInterval)
        this.end = true;

    },
    recordScore(){
        let highscores_deserialized = JSON.parse(localStorage.getItem("Highscores"));
        for (let s = 0;s < 20;s++){
            if (highscores_deserialized.highscore[s] > highscores.highscore[s]){
                highscores.highscore[s] = highscores_deserialized.highscore[s]
                highscores.highscoreNames[s] = highscores_deserialized.highscoreNames[s]
            }
        }
        for (let i = 0; i < highscores.highscore.length; i++)
        if(this.score > highscores.highscore[i]){
            highscores.highscore[i] = this.score
            highscores.highscoreNames[i] = this.playerName
            break;
        }
        let score = document.querySelector('.score');
        score.innerHTML = `${this.highscoreNames[0]} has the high score with ${this.highscores[0]}`
        //renders scoreboard
        for (let j = 1; j < 20; j++){
            let tab = document.createElement('div');
            tab.className = 'scoreTab'
            tab.innerHTML = `${highscores.highscoreNames[j]}: ${highscores.highscore[j]}`
            score.appendChild(tab);
        }
        let highscores_serialized =JSON.stringify(highscores)
        localStorage.setItem('Highscores',highscores_serialized)
    },

}



//start of the page and sets listener to it
gameState.menu();

let html = document.querySelector('html');
html.addEventListener('keydown', e => {

    if(e.key.toLowerCase() === "arrowright"){
        gameState.getNextDirectionRight();
        
    }else if(e.key.toLowerCase() === "arrowleft"){
        gameState.getNextDirectionLeft();
    }
});


