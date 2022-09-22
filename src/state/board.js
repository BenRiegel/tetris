import { boardDimensions } from '../config/config.js';


function createNewRows(){
  let { numRows, numColumns } = boardDimensions;
  let rows = [];
  for (let i = 0; i < numRows; i++){
    let cell = {hasContent:false}
    let row = new Array(numColumns).fill(cell);  //dont' know if this will works
    rows.push(row);
  }
  return rows;
}


function isFull(row){
  return row.reduce( (isFull, cell)=>{
    return isFull && cell.hasContent;
  }, true);
}

function copyBoard(board){
  let newBoard = Object.assign({}, board);
  newBoard.cells = newBoard.cells.map( row => [...row] );
  return newBoard;
}

export function getFullRows(board){
  let fullRows = [];
  let rows = board.cells;
  rows.forEach( (row, i) =>{
    let rowIsFull = isFull(row);
    if (rowIsFull){
      fullRows.push(i);
    }
  });
  return fullRows;
}

export function resetBoard(board){
  let newBoard = createNewBoard();
  const filteredRows = board.cells.filter( row =>{
    const rowIsFull = isFull(row);
    return !rowIsFull;
  });
  const offset = boardDimensions.numRows - filteredRows.length;
  filteredRows.forEach( (row, index) => {
    newBoard.cells[index + offset] = [...row];
  });
  return newBoard;
}


export function assignClearingRows(board, fullRows){
  let newBoard = copyBoard(board);
  newBoard.animation = {
    type:'fadeOut',
    rows: fullRows
  }
  return newBoard;
}

function getFallRows(rowNum, fullRows){
  return fullRows.reduce( (numFullRows, fullRowIndex)=>{
    if (fullRowIndex > rowNum){
      return numFullRows + 1;
    } else {
      return numFullRows;
    }
  }, 0);
}

export function assignFallingRows(board){
  let fullRows = board.animation.rows;
  let newBoard = copyBoard(board);
  let fallRows = {};
  for (let i = 0; i < boardDimensions.numRows; i++){
    fallRows[i] = getFallRows(i, fullRows);
  }
  newBoard.animation = {
    type:'fall',
    rows: fallRows,
  }
  return newBoard;
}



export function createNewBoard(){
  let cells = createNewRows();
  return {
    cells,
    animation: null,
  }
}

export function land(board, piece){
  let newBoard = copyBoard(board);
  const { boardCoords } = piece;
  for (let i = 0; i < piece.cells.length; i++){
    let row = piece.cells[i];
    for (let j = 0; j < row.length; j++){
      let cell = row[j];
      if (cell.hasContent){
        let rowNum = boardCoords.row + i;
        if (piece.animation){
          rowNum += piece.animation.dist;
        }
        let columnNum = boardCoords.column + j;
        newBoard.cells[rowNum][columnNum] = cell;
      }
    }
  }
  return newBoard;
}
