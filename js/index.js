let inputDir={x:0,y:0};
const foodSound= new Audio('food.mp3');
const gameOverSound= new Audio('gameover.wav');
const moveSound= new Audio('move.mp3');
const musicSound= new Audio('music.mp3');
let score=0;
let speed=5;
let lastPaintTime=0;
let snakeArr=[
    {
        x:13,
        y:15

    }
]
food =  {
    x:6,
    y:7

}


function main(ctime){
    window.requestAnimationFrame(main);

    if((ctime-lastPaintTime)/1000<1/speed){
        return;
    }
    lastPaintTime=ctime;
   
    gameEngine();
}
function isCollide(snake){
    // if u bump into yourself 
    for (let index=1; index<snakeArr.length; index++){
        //const element =array[index];

        if(snake[index].x  === snake[0].x && snake[index].y  === snake[0].y){
            return true;
        }
    }
    // if you bump into the wall 
        if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0){
            return true;
        }
        return false;
    }
    


function gameEngine(){

    //part1 updating the snake and arraya and Food
if(isCollide(snakeArr)){
    gameOverSound.play();
    musicSound.pause();
    inputDir={x:0,y:0};
    alert("Game Over . Press any  key to play again! ");
    snakeArr=[{
        x:13,
        y:15}];
       musicSound.play();
        score=0;

}
// if snake haven eaten the food, increament the score the regenerate the food 
if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){
    foodSound.play();
    score+=1;
    if(score>highScoreval){
        highScoreval=score;
        localStorage.setItem("highscore",JSON.stringify(highScoreval));
        highscoreBox.innerHTML="HighScore: "+highScoreval;
    }
    scoreBox.innerHTML="score: "+score; 
    snakeArr.unshift({x:snakeArr[0].x +inputDir.x, y:snakeArr[0].y+ inputDir.y});
    let a=2;
    let b=16;

    food={x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())}
}

//moving the snake

 for (let i= snakeArr.length-2; i>=0;i--){
 
     snakeArr[i+1]= {...snakeArr[i]};
 }

snakeArr[0].x+=inputDir.x;
snakeArr[0].y+=inputDir.y;




//part2 displayig the food and snake
    // display the snake
board.innerHTML="";
 snakeArr.forEach((e, index)=>{
     snakeElement=document.createElement('div');
     snakeElement.style.gridRowStart=e.y;
     snakeElement.style.gridColumnStart=e.x;
     snakeElement.classList.add('snake');

     if(index===0){
         snakeElement.classList.add('head');
     }else{
        snakeElement.classList.add('snake');
     }
     board.appendChild(snakeElement);
     


 })
 // display the food of the snake
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
     board.appendChild(foodElement);


}







//main logic 
musicSound.play();
let highScore=localStorage.getItem("highscore");
if(highScore==null){
    highScoreval=0;
    localStorage.setItem("highscore",JSON.stringify(highScoreval));

}else{
    highScoreval=JSON.parse(highScore);
    
    highscoreBox.innerHTML="HighScore: "+highScore;
}


window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1} //start the game
    moveSound.play();
    switch (e.key){



        case"ArrowUp":
        console.log("ArrowUp")
        inputDir.x= 0;
        inputDir.y= -1;
        break;



        case"ArrowDown":
        console.log("ArrowDown")
        inputDir.x= 0;
        inputDir.y= 1;
        break;




        case"ArrowLeft":
        console.log("ArrowLeft")
        inputDir.x= -1;
        inputDir.y=0 ;
        break;




        case"ArrowRight":
        console.log("ArrowRight")
        inputDir.x=1 ;
        inputDir.y= 0;
        break;




        default:
            break;
    }

});

