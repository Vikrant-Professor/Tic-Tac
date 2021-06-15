const statusDiv = document.querySelector(".status");
const resetDiv = document.querySelector(".reset");
const cellDivs = document.querySelectorAll(".game-cell");

//game variables
let gameIsLive = true;
let xIsNext = true;
let winner = null;

//functions
const handleWin = (letter) => {
    gameIsLive = false;
    winner = letter;
    if (winner==='x')
        statusDiv.innerHTML = `${winner} has won!!!`;
    else
        statusDiv.innerHTML = `<span>${winner} has won!!!</span>`;
    winner = null;
};

const checkGameStatus = () =>{
    const topLeft = cellDivs[0].classList[2];
    const topMiddle = cellDivs[1].classList[2];
    const topRight = cellDivs[2].classList[2];
    const middleLeft = cellDivs[3].classList[2];
    const middleMiddle = cellDivs[4].classList[2];
    const middleRight = cellDivs[5].classList[2];
    const bottomLeft = cellDivs[6].classList[2];
    const bottomMiddle = cellDivs[7].classList[2];
    const bottomRight = cellDivs[8].classList[2];

    //check winner
    if (topLeft && topLeft === topMiddle && topLeft === topRight)
    {
        handleWin(topLeft);        
        cellDivs[0].classList.add('won');
        cellDivs[1].classList.add('won');
        cellDivs[2].classList.add('won');
    }   
    else if(middleLeft && middleLeft === middleMiddle && middleLeft === middleRight)
    {
        handleWin(middleLeft);
        cellDivs[3].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[5].classList.add('won');
    }
    else if(bottomLeft && bottomLeft === bottomMiddle && bottomLeft === bottomRight)
    {
        handleWin(bottomLeft);
        cellDivs[6].classList.add('won');
        cellDivs[7].classList.add('won');
        cellDivs[8].classList.add('won');
    }
    else if(topLeft && topLeft === middleLeft && topLeft === bottomLeft)
    {
        handleWin(topLeft);
        cellDivs[0].classList.add('won');
        cellDivs[3].classList.add('won');
        cellDivs[6].classList.add('won');
    }
    else if(topMiddle && topMiddle === middleMiddle && topMiddle === bottomMiddle)
    {
        handleWin(topMiddle);
        cellDivs[1].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[7].classList.add('won');
    }
    else if(topRight && topRight === middleRight && topRight === bottomRight)
    {
        handleWin(topRight);
        cellDivs[2].classList.add('won');
        cellDivs[5].classList.add('won');
        cellDivs[8].classList.add('won');
    }
    else if(topLeft && topLeft === middleMiddle && topLeft === bottomRight)
    {
        handleWin(topLeft);
        cellDivs[0].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[8].classList.add('won');
    }
    else if(topRight && topRight === middleMiddle && topRight === bottomLeft)
    {
        handleWin(topRight);
        cellDivs[2].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[6].classList.add('won');
    }
    else if(topLeft && topRight && topMiddle && middleLeft && middleMiddle && middleRight && bottomLeft && bottomMiddle && bottomRight){
        gameIsLive = false;
        statusDiv.innerHTML = "Match Tied";
    }      
    else{
        xIsNext = !xIsNext;

        if(xIsNext)
            statusDiv.innerHTML = 'x is next';
        else
            statusDiv.innerHTML = '<span>o is next</span>';
    }
};

//event handlers
const handleReset = () =>{
    xIsNext = true;
    statusDiv.innerHTML = "x is next";
    winner = null;
    gameIsLive = true;
    for(const cellDiv of cellDivs)
    {
        cellDiv.classList.remove('x');
        cellDiv.classList.remove('o');
        cellDiv.classList.remove('won');
    }
};


const handleCellClick = (e) =>{    //this function tells us which cell we are clicking, mark 'x' or 'o' in game board and few more things
    const classList = e.target.classList;
    const location = classList[1];

    if(gameIsLive)
    {
        if(classList[2] === 'x' || classList[2]==='o') // if cel is already filled then return 
        {
            return ;
        }
        if (xIsNext){
            classList.add('x');
            checkGameStatus();
        }
        else {
            classList.add('o');
            checkGameStatus();
        }
    }
    
}

//event listeners
resetDiv.addEventListener("click",handleReset);

for (const cellDiv of cellDivs){
        cellDiv.addEventListener("click",handleCellClick);
}