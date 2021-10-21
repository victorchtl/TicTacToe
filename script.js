const boardgame = document.querySelector('#gameboard');
const resetButton = document.querySelector('#reset-button');
const players1div = document.querySelector('#infosP1');
const players2div = document.querySelector('#infosP2');
let player1Win = 0;
let player2Win = 0;
let player1Marks = [];
let player2Marks = [];
let player1Score = 0;
let player2Score = 0;
let gameOn = true;
let canPlay = true;
const winConditions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];
let boardCells = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const player1ScoreDisplay = document.createElement('div');
player1ScoreDisplay.id = 'player1score';
player1ScoreDisplay.innerHTML = 'You : ' + player1Score;
players1div.appendChild(player1ScoreDisplay);

const player2ScoreDisplay = document.createElement('div');
player2ScoreDisplay.id = 'player2score';
player2ScoreDisplay.innerHTML = 'Victor : ' + player2Score;
players2div.appendChild(player2ScoreDisplay);



function fillGameBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.id = (i + 1);
        cell.style.backgroundColor = '#412da8';
        cell.style.borderRadius = '10px';
        boardgame.appendChild(cell);
    }
    document.querySelectorAll('.cell').forEach(cell => cell.addEventListener("click", cellClick));
}

function cellClick() {
    if (canPlay === true) {
        boardCells.splice(boardCells.indexOf(parseInt(this.id)), 1);
        console.log(this.id);
        console.log(boardCells);
        const mark = document.createElement('img');
        mark.src = 'images/tictactoe_cross.png'
        mark.className = 'cross';
        const markedCell = document.getElementById(parseInt(this.id));
        markedCell.appendChild(mark);
        player1Marks.push(parseInt(this.id));
        for (let winCondition of winConditions) {
            for (let i = 0; i < player1Marks.length; i++) {
                for (j = 0; j < winCondition.length; j++) {
                    if (winCondition[j] === player1Marks[i]) {
                        player1Win++;
                    }
                }
            }
            if (player1Win >= 3) {
                winDisplay();
                player1Score++;
                player1ScoreDisplay.innerHTML = 'You : ' + player1Score;
                player1Win = 0;
                player2Win = 0;
                removeElementsByClass('cross');
                removeElementsByClass('circle');
                player1Marks = [];
                player2Marks = [];
                boardCells = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                gameOn = false;
                break;
            } else {
                player1Win = 0;
            }
        }
        if (boardCells.length === 0) {
            drawDisplay();
            gameOn = false;
            player1Win = 0;
            player2Win = 0;
            removeElementsByClass('cross');
            removeElementsByClass('circle');
            player1Marks = [];
            player2Marks = [];
            boardCells = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        }
        if (gameOn === true) {
            canPlay = false;
            setTimeout(function () {
                const markAI = document.createElement('img');
                markAI.src = 'images/tictactoe_circle.png'
                markAI.className = 'circle';
                const randomboardCells = boardCells[Math.floor(Math.random() * boardCells.length)];
                boardCells.splice(boardCells.indexOf(parseInt(randomboardCells)), 1);
                const markedAICell = document.getElementById(parseInt(randomboardCells));
                markedAICell.appendChild(markAI);
                player2Marks.push(parseInt(randomboardCells));
                for (let winCondition of winConditions) {
                    for (let k = 0; k < player2Marks.length; k++) {
                        for (j = 0; j < winCondition.length; j++) {
                            if (winCondition[j] === player2Marks[k]) {
                                player2Win++;
                            }
                        }
                    }
                    if (player2Win >= 3) {
                        lostDisplay();
                        player2Score++;
                        player2ScoreDisplay.innerHTML = 'Victor : ' + player2Score;
                        player1Win = 0;
                        player2Win = 0;
                        removeElementsByClass('cross');
                        removeElementsByClass('circle');
                        player1Marks = [];
                        player2Marks = [];
                        boardCells = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                        break;
                    } else {
                        player2Win = 0;
                    }
                }
                canPlay = true;
            }, 500);

        } else {
            gameOn = true;
            canPlay = true;
        }
    }

}

function removeElementsByClass(className) {
    const elements = document.getElementsByClassName(className);
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}

resetButton.onclick = function () {
    player1Win = 0;
    player2Win = 0;
    player1Marks = [];
    player2Marks = [];
    player1Score = 0;
    player2Score = 0;
    player1ScoreDisplay.innerHTML = 'You : ' + player1Score;
    player2ScoreDisplay.innerHTML = 'Victor : ' + player2Score;
    boardCells = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    removeElementsByClass('cross');
    removeElementsByClass('circle');
}

function winDisplay() {
    canPlay = false;
    const winBackground = document.createElement('div');
    winBackground.className = 'winDisplayBackground'
    winBackground.style.backgroundColor = '#1f104f';
    winBackground.style.zIndex = 99;
    document.body.appendChild(winBackground);
    const winText = document.createElement('div');
    winText.className = 'winDisplayText';
    winText.innerHTML = 'You Win !';
    winText.style.fontSize = '100px';
    winText.style.fontWeight = '800';
    winText.style.color = '#e51952';
    winText.style.zIndex = 999;
    document.body.appendChild(winText);
    setTimeout(function () {
        removeElementsByClass('winDisplayBackground');
        removeElementsByClass('winDisplayText');
        canPlay = true;
    }, 2000);
}

function lostDisplay() {
    canPlay = false;
    const lostBackground = document.createElement('div');
    lostBackground.className = 'lostDisplayBackground'
    lostBackground.style.backgroundColor = '#1f104f';
    lostBackground.style.zIndex = 99;
    document.body.appendChild(lostBackground);
    const lostText = document.createElement('div');
    lostText.className = 'lostDisplayText';
    lostText.innerHTML = 'You Lose !';
    lostText.style.fontSize = '100px';
    lostText.style.fontWeight = '800';
    lostText.style.color = '#fed030';
    lostText.style.zIndex = 999;
    document.body.appendChild(lostText);
    setTimeout(function () {
        removeElementsByClass('lostDisplayBackground');
        removeElementsByClass('lostDisplayText');
        canPlay = true;
    }, 2000);
}

function drawDisplay() {
    canPlay = false;
    const drawBackground = document.createElement('div');
    drawBackground.className = 'drawDisplayBackground'
    drawBackground.style.backgroundColor = '#1f104f';
    drawBackground.style.zIndex = 99;
    document.body.appendChild(drawBackground);
    const drawText = document.createElement('div');
    drawText.className = 'drawDisplayText';
    drawText.innerHTML = 'Draw !';
    drawText.style.fontSize = '100px';
    drawText.style.fontWeight = '800';
    drawText.style.color = '#412da8';
    drawText.style.zIndex = 999;
    document.body.appendChild(drawText);
    setTimeout(function () {
        removeElementsByClass('drawDisplayBackground');
        removeElementsByClass('drawDisplayText');
        canPlay = true;
    }, 2000);
}



fillGameBoard();