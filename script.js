function CreatePlayer(name, symbol) {
    let score = 0;
    const getScore = () =>{
        return this.score;
    }
    const resetScore = () =>{
        this.score = 0;
    }
    const incScore = () =>{
        this.score++;
    }
    return{name, symbol, getScore, resetScore, incScore}
}

function CreateCord(x, y){
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
            if (board[i][0] ===  board[i][1] && board[i][1] === board[i][2]) {
                return board[i][0]
            }
        }
        return false
    }

    const checkColumn = () =>{
        for (let i = 0; i < board.length; i++) {
            if (board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
                return board[0][i]
            }
        }
        return false
    }
    const checkDiagonal = () =>{
        if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
            return board[0][0];
        }
        else if(board[2][0] === board[1][1] && board[1][1] === board[0][2]){
            return  board[1][1];
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

document.addEventListener("DOMContentLoaded", () =>{
    
});