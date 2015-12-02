"use strict";

class Piece {
    constructor(color, value){
        this.color = color;
        this.value = value;
        this.selected = false;
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
    constructor(parentDiv, board, controller){
        this.parentDiv = parentDiv;
        this.board = board;
        this.controller = controller;
    }

    initialize(){
        let matrix = this.board.matrix;
        let boardDiv = document.createElement('div');
        boardDiv.setAttribute('id', 'board');
        boardDiv.classList.add('unselectable');
        for (let i = 0; i < matrix.length; i++){
            let rowDiv = document.createElement('div');
            rowDiv.classList.add('row');
            for (let j = 0; j < matrix[i].length; j++){
                let thisCell = matrix[i][j];
                let cellDiv = document.createElement('div');
                cellDiv.setAttribute('id', 'cell-' + i + '-' + j);
                cellDiv.setAttribute('row', i);
                cellDiv.setAttribute('col', j);
                cellDiv.classList.add('cell');
                cellDiv.classList.add(thisCell.color);
                let that = this;
                cellDiv.addEventListener('click', function (e){
                    that.controller.handleCellClick(i, j);
                });
                rowDiv.appendChild(cellDiv);
            }
            boardDiv.appendChild(rowDiv);
        }
        this.parentDiv.appendChild(boardDiv);
    }

    update(){
        let matrix = this.board.matrix;
        let boardDiv = document.getElementById('board');
        for (let i = 0; i < matrix.length; i++){
            for (let j = 0; j < matrix[i].length; j++){
                let thisCell = matrix[i][j];
                let cellDiv = document.getElementById('cell-' + i + '-' + j);
                while(cellDiv.firstChild){
                    cellDiv.removeChild(cellDiv.firstChild);
                }
                if (thisCell.piece){
                    let pieceDiv = document.createElement('div');
                    pieceDiv.classList.add('piece');
                    pieceDiv.classList.add(thisCell.piece.color);
                    if(thisCell.piece.selected){
                        pieceDiv.classList.add('selected');
                    }
                    pieceDiv.innerHTML = thisCell.piece.value;
                    cellDiv.appendChild(pieceDiv);
                }
            }
        }
    }
}

class TTGame {
    constructor(){
        this.myBoard = new Board(3, 4);
        this.view = new TTView(document.getElementById('container'), this.myBoard, this);
        this.lastSelectedCell = null;
    }

    handleCellClick(r, c){
        let clickedCell = this.myBoard.getCell(r, c);
        // If there's no currently selected cell and clicked cell contains a piece
        if (! this.lastSelectedCell && clickedCell.piece){
            //Select the cell
            clickedCell.piece.selected = true;
            this.lastSelectedCell = clickedCell;
            this.view.update();
        }
        // If there IS a selected cell, and an empty cell has been clicked
        else if (this.lastSelectedCell && ! clickedCell.piece){
            // Move and deselect the piece
            clickedCell.piece = this.lastSelectedCell.piece;
            clickedCell.piece.selected = false;
            this.lastSelectedCell.piece = null;
            this.lastSelectedCell = null;
            this.processMove(clickedCell);
            this.view.update();
        }
        //Allow deselecting a selected piece
        else if (clickedCell === this.lastSelectedCell){
            this.lastSelectedCell = null;
            clickedCell.piece.selected = false;
            this.view.update();
        }
    }

    processMove(cell){
        cell.piece.value--;
    }

    newGame(){
        let redPiece = new Piece('red');
        let bluePiece = new Piece('blue');
        this.myBoard.getCell(0,0).piece = new Piece('red', 3);
        this.myBoard.getCell(0,1).piece = new Piece('blue', 4);
        this.myBoard.getCell(0,2).piece = new Piece('blue', 2);
        this.myBoard.getCell(0,3).piece = new Piece('red', 5);
        this.view.initialize();
        this.view.update();
    }
}

var game = new TTGame();
game.newGame();