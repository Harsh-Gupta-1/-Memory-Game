let startTime = 0;
let currentTime;
let timer = null;
let seconds =0;
let minutes =0;
let mover=0;
let counts =0;
function makeVisible(){
    start = document.querySelector(".start");
    main = document.querySelector(".main");
    start.classList.add("invisible");
    main.classList.remove("invisible");
    startTime = Date.now();
    timer = setInterval(update,1000);
    randomiseArray(fruits);
}

function update(){
    currentTime = Date.now() - startTime;
    seconds = (Math.floor(currentTime/1000))%60;
    minutes = (Math.floor(currentTime/(1000*60)))%60;
    let time = document.getElementById("timer");
    seconds = String(seconds).padStart(2,0);
    minutes = String(minutes).padStart(2,0);
    time.textContent = `Time: ${minutes}:${seconds} `;
}

let fruits = ["🍉","🍌","🍒","🍇","🥑","🥝","🍎","🍊","🍉","🍌","🍒","🍇","🥑","🥝","🍎","🍊"];
let box = [];

function randomiseArray(array){
for(let i=array.length-1;i>0;i--){
    let j = Math.floor(Math.random()*(i+1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}
}

let activatedBoxes =[];
let flag = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];


for(let i=0;i<fruits.length;i++){
    
    let currentBox = document.getElementById(`box${i+1}`);
    currentBox.addEventListener("click",function myFunction(event){
        if(flag[i]==0){
        event.target.style.backgroundColor = "white";
        event.target.textContent = fruits[i];
        flag[i]=1;
        setTimeout(function allotValues(){
            if(activatedBoxes.length==0){
                activatedBoxes.push(i);
            }
            else{
                if(fruits[i]!= fruits[activatedBoxes[0]]){
                    currentBox.style.backgroundColor = "#ffb900";
                    currentBox.textContent = "?";
                    let prevBox = document.getElementById(`box${activatedBoxes[0]+1}`);
                    prevBox.style.backgroundColor = "#ffb900";
                    prevBox.textContent = "?";
                    flag[i] =0;
                    flag[activatedBoxes[0]] =0;
                }
                else{
                    flag[i] = 1;
                    flag[activatedBoxes[0]] =1;
                    counts++;
                }
                activatedBoxes =[];
                mover++;
            
            }
            let move = document.getElementById("moves");
            move.textContent = `Moves: ${mover}`;

            if(counts == 8){
                document.querySelector(".main").classList.add("invisible");
                clearInterval(timer);
                endBox.classList.remove("invisible");
                endBox.lastElementChild.previousElementSibling.textContent =`Time taken:${minutes}:${seconds}`;
                endBox.firstElementChild.nextElementSibling.textContent =`Moves taken:${mover}`;
            }
        },500)
    }});
}
let move = document.getElementById("moves");
move.textContent = `Moves: ${mover}`;

function stopGame(){
    clearInterval(timer);
    let mainBox = document.querySelector(".main");
    mainBox.classList.add("invisible");
    let startBox = document.querySelector(".start");
    startBox.classList.remove("invisible");
    let movers = document.getElementById("moves");
    movers.textContent = "Moves: 0";
    let timers = document.getElementById("timer");
    timers.textContent = "Time: 00:00";
    mover =0;
    counts =0;
    for(let i=0;i<16;i++){
        if(flag[i]==1){
        let currentBox = document.getElementById(`box${i+1}`);
        currentBox.style.backgroundColor = "#ffb900";
        currentBox.textContent = "?";
        flag[i] =0;
        }
    }
}

let endBox = document.querySelector(".end");

function playAgain(){
    clearInterval(timer);
    document.querySelector(".start").classList.remove("invisible");
    document.querySelector(".end").classList.add("invisible");
    let movers = document.getElementById("moves");
    movers.textContent = "Moves: 0";
    let timers = document.getElementById("timer");
    timers.textContent = "Time: 00:00";
    mover =0;
    counts =0;
    endBox.lastElementChild.previousElementSibling.textContent =`Time taken:00:00`;
    endBox.firstElementChild.nextElementSibling.textContent =`Moves taken:0`;
    randomiseArray(fruits);
    for(let i=0;i<16;i++){
        if(flag[i]==1){
        let currentBox = document.getElementById(`box${i+1}`);
        currentBox.style.backgroundColor = "#ffb900";
        currentBox.textContent = "?";
        flag[i] =0;
        }
}
}
