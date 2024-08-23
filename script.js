function CreatePlayer(name, symbol) {
    let score = 0;
    const getScore = () =>{
        return score;
    }
    const resetScore = () =>{
        score = 0;
    }
    const incScore = () =>{
        score++;
    }
    return{name, symbol, getScore, resetScore, incScore}
}

function CreateCord(x, y){
    x = Number(x)
    y = Number(y)
    return{x, y}
}

const game = (function(){
    let board =[
        [undefined, undefined, undefined],
        [undefined, undefined, undefined],
        [undefined, undefined, undefined]
    ]
    const checkRow = () =>{
        for (let i = 0; i < board.length; i++) {
            if (board[i][0] ===  board[i][1] && board[i][1] === board[i][2] && board[i][1] !== undefined) {
                return true
            }
        }
        return false
    }

    const checkColumn = () =>{
        for (let i = 0; i < board.length; i++) {
            if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[1][i] !== undefined) {
                return true
            }
        }
        return false
    }
    const checkDiagonal = () =>{
        if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[1][1] !== undefined) {
            return true;
        }
        else if(board[2][0] === board[1][1] && board[1][1] === board[0][2] && board[1][1] !== undefined){
            return  true;
        }

        return false
    }
    const editBoard = (symbol, cords) =>{
        if(board[cords.y][cords.x] !== undefined){
            return false
        }
        else{
            board[cords.y][cords.x] = symbol
            return true
        }
    }

    const resetBoard = () => {
        board =[
            [undefined, undefined, undefined],
            [undefined, undefined, undefined],
            [undefined, undefined, undefined]
        ]
    }
    return {
        resetBoard,
        editBoard,
        checkColumn,
        checkDiagonal,
        checkRow,
    }

})();

let players = [
    CreatePlayer("player1", "X"),
    CreatePlayer("player2", "O")
]

document.addEventListener("DOMContentLoaded", () =>{
    let rounds = 0;
    let blocks = document.querySelectorAll(".block");
    let score1 = document.getElementById("p1");
    let score2 = document.getElementById("p2");
    let resetBtn = document.getElementById("reset");
    let newGame = document.getElementById("new");
    let message = document.getElementById("message");
    blocks.forEach(block => {
        block.addEventListener("click",(event) => {
            let index = event.target.getAttribute("data-index").split('');
            let x = Number(index[0])
            let y = Number(index[1])
            let cord = CreateCord(x ,y);
            if(game.editBoard(players[rounds%2].symbol ,cord)){
                event.target.textContent = players[rounds%2].symbol;
                if (game.checkColumn() || game.checkDiagonal() || game.checkRow()) {
                    players[rounds%2].incScore();
                    score1.textContent = players[0].getScore();
                    score2.textContent = players[1].getScore();
                    //toggel the dialog on
                    message.textContent = players[rounds%2].name + " is the Winner !!"
                    //winner
                    return
                }
                if (rounds === 9) {
                    rounds = 0;
                    //tie
                }
                rounds++;
            }
        });
    });
    resetBtn.addEventListener("click", () =>{
        let score1 = document.getElementById("p1");
        let score2 = document.getElementById("p2");
        score1.textContent = score2.textContent = '0';
        game.resetBoard();
        resetBoard();
        players[0].resetScore();
        players[1].resetScore();
        message.textContent = '';
    });

    newGame.addEventListener("click", () => {
        resetBoard();
        game.resetBoard();
        rounds = 0;
        message.textContent = '';
    });
});

function resetBoard(){
    let blocks = document.querySelectorAll(".block");
    blocks.forEach(block => {
        block.textContent = '';
    });
}