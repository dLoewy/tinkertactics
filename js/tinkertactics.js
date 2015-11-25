"use strict";

class Cell{
    constructor(color){
        this.color = color;
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
    
    makeDOM(){
        let matrix = this.matrix;
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
                //var piece = document.createElement('div');
                //piece.classList.add('piece');
                //cellDiv.appendChild(piece);
                rowDiv.appendChild(cellDiv);
            }
            boardDiv.appendChild(rowDiv);
        }
        return boardDiv;
    }
}

var myBoard = new Board(3, 4);
document.getElementById('container').appendChild(myBoard.makeDOM());