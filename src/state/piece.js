import { starts, numPieces, pieces } from '../config/pieces.js'
import { boardDimensions } from '../config/config.js';


function createPieceCells(pieceSchema, pieceIndex){
  return pieceSchema.map( row => {
    return row.map( isCell => {
      if (isCell){
        return {hasContent:true, type:pieceIndex, state:'static'};
      } else {
        return {hasContent:false};
      }
    });
  });
}

function createPiece(pieceIndex){
  const isActive = true;
  const boardCoords = starts[pieceIndex];
  const pieceSchema = pieces[pieceIndex];
  const cells = createPieceCells(pieceSchema, pieceIndex);
  const animation = null;
  return { isActive, boardCoords, cells, animation };
}

function copyPiece(piece){
  let newPiece = Object.assign({}, piece);
  let newBoardCoords = Object.assign({}, piece.boardCoords);
  newPiece.boardCoords = newBoardCoords;
  return newPiece;
}


//----- export code block ------------------------------------------------------

export function createRandomPiece(){
  const pieceIndex = Math.floor(Math.random() * numPieces);
  const newPiece = createPiece(pieceIndex);
  return newPiece;
}

//shorted this
export function movePieceDown(prevPiece){
  let newPiece = copyPiece(prevPiece);
  let newRow = prevPiece.boardCoords.row + 1;
  let newColumn = prevPiece.boardCoords.column;
  newPiece.boardCoords = {row:newRow, column:newColumn};
  return newPiece;
}

export function movePieceRight(prevPiece){
  let newPiece = copyPiece(prevPiece);
  let newRow = prevPiece.boardCoords.row;
  let newColumn = prevPiece.boardCoords.column + 1;
  newPiece.boardCoords = {row:newRow, column:newColumn};
  return newPiece;
}

export function movePieceLeft(prevPiece){
  let newPiece = copyPiece(prevPiece);
  let newRow = prevPiece.boardCoords.row;
  let newColumn = prevPiece.boardCoords.column - 1;
  newPiece.boardCoords = {row:newRow, column:newColumn};
  return newPiece;
}

export function flipPieceLeft(prevPiece){
  let newPiece = copyPiece(prevPiece);
  let cells = newPiece.cells;
  let newCells = cells[0].map((val, index) => cells.map(row => row[row.length-1-index]));
  newPiece.cells = newCells;
  return newPiece;
}

export function flipPieceRight(prevPiece){
  let newPiece = copyPiece(prevPiece);
  let cells = newPiece.cells;
  let newCells = cells[0].map((val, index) => cells.map(row => row[index]).reverse());
  newPiece.cells = newCells;
  return newPiece;
}

export function dropPiece(prevPiece, dist){
  let newPiece = copyPiece(prevPiece);
  newPiece.animation = {type:'drop', dist};
  return newPiece;
}

function isInvalidColumn(num){
  return (num === -1 || num === boardDimensions.numColumns);
}

function isInvalidRow(num){
  return (num === -1 || num === boardDimensions.numRows);
}

function canMove(offset, piece, board){
  const { boardCoords } = piece;
  for (let i = 0; i < piece.cells.length; i++){
    let row = piece.cells[i];
    for (let j = 0; j < row.length; j++){
      let cell = row[j];
      if (cell.hasContent){
        let rowNum = boardCoords.row + i;
        let columnNum = boardCoords.column + j;
        let newRowNum = rowNum + offset.row;
        let newColumnNum = columnNum + offset.column;
        if ( isInvalidRow(newRowNum) ){
          return false;
        }
        if ( isInvalidColumn(newColumnNum) ){
          return false;
        }
        let newBoardCell = board.cells[newRowNum][newColumnNum];
        if (newBoardCell.hasContent){
          return false;
        }
      }
    }
  }
  return true;
}

export function calcDropDistance(piece, board){
  for (let i = 0; i < (boardDimensions.numRows+10); i++){
    let canDrop = canMove( {row:i, column:0}, piece, board);
    if (!canDrop){
      return (i-1);
    }
  }
}

export function canPlace(piece, board){
  return canMove( {row:0, column:0}, piece, board);
}

export function canMoveDown(piece, board){
  return canMove( {row:1, column:0}, piece, board);
}

export function canMoveRight(piece, board){
  return canMove( {row:0, column:1}, piece, board);
}

export function canMoveLeft(piece, board){
  return canMove( {row:0, column:-1}, piece, board);
}

export function canFlipRight(piece, board){
  let tempPiece = flipPieceRight(piece);
  return canPlace(tempPiece,board);
}

export function canFlipLeft(piece, board){
  let tempPiece = flipPieceLeft(piece);
  return canPlace(tempPiece,board);
}
