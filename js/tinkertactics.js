"use strict";

class Piece {
    constructor(color){
        this.color = color;
    }
}

class Cell{
    constructor(color){
        this.color = color;
        this.piece = null;
    }
}

class Board {
    constructor(r, c){
        let matrix = [];
        for (let i = 0; i < r; i++){
            let row = [];
            for (let j = 0; j < c; j++){
                let newCell = new Cell((i+j) % 2 === 0 ? 'light' : 'dark');
                row.push(newCell);
            }
            matrix.push(row);
        }
        this.matrix = matrix;
    }

    getCell(r, c){
        return this.matrix[r][c]
    }
}

class TTView {
    constructor(parentDiv, board){
        this.parentDiv = parentDiv;
        this.board = board;
    }

    drawBoard(){
        let matrix = this.board.matrix;
        let boardDiv = document.createElement('board');
        for (let i = 0; i < matrix.length; i++){
            let rowDiv = document.createElement('div');
            rowDiv.classList.add('row');
            for (let j = 0; j < matrix[i].length; j++){
                let thisCell = matrix[i][j];
                let cellDiv = document.createElement('div');
                cellDiv.setAttribute('id', 'cell' + i + '-' + j);
                cellDiv.classList.add('cell');
                cellDiv.classList.add(thisCell.color);
                if (thisCell.piece){
                    let piece = document.createElement('div');
                    piece.classList.add('piece');
                    piece.classList.add(thisCell.piece.color);
                    cellDiv.appendChild(piece);
                }
                rowDiv.appendChild(cellDiv);
            }
            boardDiv.appendChild(rowDiv);
        }
        this.parentDiv.appendChild(boardDiv);
    }
}

class TTGame {
    constructor(){
        this.myBoard = new Board(3, 4);
        this.view = new TTView(document.getElementById('container'), this.myBoard);
    }

    newGame(){
        let redPiece = new Piece('red');
        let bluePiece = new Piece('blue');
        this.myBoard.getCell(0,0).piece = redPiece;
        this.myBoard.getCell(0,1).piece = bluePiece;
        this.myBoard.getCell(0,2).piece = bluePiece;
        this.myBoard.getCell(0,3).piece = redPiece;
        this.view.drawBoard();
    }
}

var game = new TTGame();
game.newGame();