function isValid(row, col, check, board) {
    for (var i = 0; i < 9; i++) {
        if (board[row][i] == check) {
            return false;
        }
        if (board[i][col] == check) {
            return false;
        }
        let x = Math.floor(row / 3) * 3;
        let y = Math.floor(col / 3) * 3;

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[x + i][y + j] === check) return false;
            }
        }
    }
    return true
}

function solveSudoku(board) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            var number = board[i][j].toString();
            if (number === ".") {
                for (var c = "1"; c < "10"; c++) {
                    if (isValid(i, j, c, board)) {
                        board[i][j] = c;
                        
                        let solvebool = solveSudoku(board);
                        if (solvebool !== false) {
                            return true;
                        } else {
                            board[i][j] = ".";
                        }
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function solve(board) {
    solveSudoku(board);
}

// solve(board);


function checkBoard(board) {
    for (let i = 0; i < 9; i++) {
        let row = new Set(),
            col = new Set(),
            box = new Set();

        for (let j = 0; j < 9; j++) {
            let _row = board[i][j];
            let _col = board[j][i];
            let _box = board[3 * Math.floor(i / 3) + Math.floor(j / 3)][3 * (i % 3) + (j % 3)]

            if (_row != '.') {
                if (row.has(_row)) return false;
                row.add(_row);
            }
            if (_col != '.') {
                if (col.has(_col)) return false;
                col.add(_col);
            }

            if (_box != '.') {
                if (box.has(_box)) return false;
                box.add(_box);
            }
        }
    }
    return true;
}


// Main Driver
submitBut.addEventListener("click", function solveS(e) {
    var onedcell = []
    cells.forEach(cell => {
        if (cell.value == "") {
            onedcell.push(".");
        } else {
            onedcell.push(cell.value)
        }
    });
    var board = [];
    while (onedcell.length) {
        board.push(onedcell.splice(0, 9));
    }
    console.log(checkBoard(board));
    if(checkBoard(board) == true) {
        solve(board);
        let answer = board.flat();

        cells.forEach((cell,index) => {
            cell.value = answer[index];
        });
    }
    else {
        alert("Check the board and enter a valid Sudoku.")
    }
})

clear.addEventListener("click", function clear(e) {
    var cells = document.querySelectorAll("input");
    cells.forEach(cell => {
        cell.value = '';
    });
})