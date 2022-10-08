//----- imports ----------------------------------------------------------------

import Store from '../lib/store.js';
import { create2dArray, doForEach } from '../lib/utils.js';
import { flipMatrixRight, flipMatrixLeft } from '../lib/utils.js';
import { boardDimensions } from '../config/config.js';
import { getRandomPieceIndex } from '../config/pieces-info.js';


//----- module code block ------------------------------------------------------

function isFull(row){
  return row.reduce( (isFull, cell)=>{
    return isFull && cell.hasContent;
  }, true);
}

//these don't really go here
function isInvalidColumn(num){
  return (num === -1 || num === boardDimensions.numColumns);
}
function isInvalidRow(num){
  return (num === -1 || num === boardDimensions.numRows);
}

function copyGrid(sourceRows){
  return sourceRows.map( row => {
    return row.map(cell => cell);
  })
}

function createEmptyGrid(dimensions){
  return create2dArray(dimensions, ()=>{
    return {hasContent:false};
  });
}

function createEmptyRow(){
  let row = [];
  for (let i = 0; i < boardDimensions.numColumns; i++){
    row.push( {hasContent:false} );
  }
  return row;
}


class GridStore extends Store {
  constructor(initValue){
    super(initValue);
  }
  canPositionAt(offset, piece){
    for (let i = 0; i < piece.cells.length; i++){
      let pieceRow = piece.cells[i];
      for (let j = 0; j < pieceRow.length; j++){
        let pieceCell = pieceRow[j];
        if (pieceCell.hasContent){
          let rowNum = piece.coords.row + i;
          let columnNum = piece.coords.column + j;
          let newRowNum = rowNum + offset.row;
          let newColumnNum = columnNum + offset.column;
          if ( isInvalidRow(newRowNum) ){
            return false;
          }
          if ( isInvalidColumn(newColumnNum) ){
            return false;
          }
          let newGridCell = this.value[newRowNum][newColumnNum];
          if (newGridCell.hasContent){
            return false;
          }
        }
      }
    }
    return true;
  }
  canPlacePiece(piece){
    return this.canPositionAt( {row:0, column:0}, piece);
  }
  canMovePiece(direction, piece){
    switch (direction){
      case 'down':
        return this.canPositionAt( {row:1, column:0}, piece);
        break;
      case 'right':
        return this.canPositionAt( {row:0, column:1}, piece);
        break;
      case 'left':
        return this.canPositionAt( {row:0, column:-1}, piece);
        break;
      default:
        break;
    }
  }
  canFlipPiece(direction, piece){
    let newCells;
    switch (direction){
      case 'right':
        newCells = flipMatrixRight(piece.cells);
        break;
      case 'left':
        newCells = flipMatrixLeft(piece.cells);
        break;
      default:
        break;
    }
    return this.canPositionAt( {row:0, column:0}, {cells:newCells, coords:piece.coords} );
  }
  calcDropDist(piece){
    for (let i = 0; i < (boardDimensions.numRows+1); i++){
      let canDrop = this.canPositionAt( {row:i, column:0}, piece);
      if (!canDrop){
        return (i-1);
      }
    }
  }
  landPiece(piece){
    let newGrid = copyGrid(this.value);
    doForEach(piece.cells, (cell, i, j) =>{
      if (cell.hasContent){
        const rowNum = piece.coords.row + i;
        const columnNum = piece.coords.column + j;
        newGrid[rowNum][columnNum] = cell;
      }
    });
    this.update(newGrid);
  }
  removeFullRows(){
    const newGrid = this.value.map( row =>{
      const rowIsFull = isFull(row);
      if (rowIsFull){
        return createEmptyRow();
      } else {
        return row;
      }
    });
    this.update(newGrid);
  }
  updateFromRows(rows){
    const newGrid = createEmptyGrid(boardDimensions);
    rows.forEach( row => {
      const cells = [...row.cells];
      newGrid[row.position] = cells;
    });
    this.update(newGrid);
  }
  fillRow(index){
    let newGrid = copyGrid(this.value);
    const row = this.value[index];
    let newRow = row.map( cell => {
      if (cell.hasContent){
        return cell;
      } else {
        return {hasContent:true, type:getRandomPieceIndex() }
      }
    });
    newGrid[index] = newRow;
    this.update(newGrid);
  }
}

const emptyGrid = createEmptyGrid(boardDimensions);

let gridStore = new GridStore(emptyGrid);


//----- export code block ------------------------------------------------------

export default gridStore;
