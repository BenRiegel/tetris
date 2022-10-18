import status from '../state/status.js';
import piece from '../state/piece.js';
import nextPiece from '../state/next-piece.js';
import pieceIsActive from '../state/piece-is-active.js';
import grid from '../state/grid.js';
import score from '../state/score.js';
import lines from '../state/lines.js';
import level from '../state/level.js';
import boardRows from '../state/board-rows.js';
import animator from '../services/animator.js';
import highScores from '../services/high-scores.js';
import { ROW_FALL_SPEED, DROP_PIECE_SPEED, CLEAR_DURATION } from '../config/config.js';
import { boardDimensions } from '../config/config.js';
import { wait } from '../lib/utils.js';


//----- module code block ------------------------------------------------------

async function gameOver(){
  for (let i = 0; i < boardDimensions.numRows; i++){
    const index = (boardDimensions.numRows - i - 1);
    await grid.fillRow(index);
    boardRows.createRows(grid.value);
    await wait(25);
  }
  status.update('game-over');
  highScores.update(score.value);
}

function dropPiece(deltaRow){
  const initRow = piece.value.coords.row;
  function doDrop(progress){
    const newRow = initRow + progress * deltaRow;
    piece.setRow(newRow);
  }
  const duration = DROP_PIECE_SPEED * deltaRow;
  return animator.go(doDrop, duration);
}

async function moveLinesDown(numClearedLines){
  const numLines = boardRows.value.length;
  const targetPositions = boardRows.value.map( (row, i) => {
    return (boardDimensions.numRows - numLines + i);
  });
  const initPositions = boardRows.value.map( row => {
    return row.position;
  });
  function doDrop(progress){
    const newRows = boardRows.value.map( (row, i) => {
      let newRow = structuredClone(row);
      let newPosition = initPositions[i] + progress * numClearedLines;
      newPosition = Math.min(newPosition, targetPositions[i]);
      newRow.position = newPosition;
      return newRow;
    });
    boardRows.update(newRows);
  }
  const duration = numClearedLines * ROW_FALL_SPEED;
  return animator.go(doDrop, duration);
}

function fadeFullRows(rows){
  function doFade(progress){
    boardRows.updateFullRows( fullRow => {
      const newFullRow = structuredClone(fullRow);
      newFullRow.clearedPercent = progress;
      return newFullRow;
    });
  }
  return animator.go(doFade, CLEAR_DURATION);
}

async function clearFullRows(){
  const fullRows = boardRows.getFullRows();
  const numFullRows = fullRows.length;
  if (numFullRows> 0){
    piece.update(null);
    await fadeFullRows(fullRows);
    grid.removeFullRows();
    boardRows.createRows(grid.value);
    await moveLinesDown(numFullRows);
    grid.updateFromRows(boardRows.value);
    score.scoreLinesCleared(numFullRows, level.value);
    lines.add(numFullRows);
    level.updateFromLines(lines.value);
  }
}

function landPiece(){
  grid.landPiece(piece.value);
  boardRows.createRows(grid.value);
}

function placeNextPiece(){
  const canPlaceNextPiece = grid.canPlacePiece(nextPiece.value);
  if (canPlaceNextPiece){
    piece.update(nextPiece.value);
    pieceIsActive.update(true);
    nextPiece.reset();
  } else {
    piece.update(null);
    gameOver();
  }
}

function movePiece(direction){
  const canMovePiece = grid.canMovePiece(direction, piece.value);
  if (canMovePiece){
    piece.move(direction);
  }
}

function flipPiece(direction){
  const canFlipPiece = grid.canFlipPiece(direction, piece.value);
  if (canFlipPiece){
    piece.flip(direction);
  }
}

function movePieceDown(){
  movePiece('down');
}

function movePieceRight(){
  movePiece('right');
}

function movePieceLeft(){
  movePiece('left');
}

function flipPieceRight(){
  flipPiece('right');
}

function flipPieceLeft(){
  flipPiece('left');
}

async function drop(){
  pieceIsActive.update(false);
  const dropDist = grid.calcDropDist(piece.value);
  if (dropDist > 0){
    await dropPiece(dropDist);
    score.scoreDrop(dropDist);
  }
  landPiece();
  await clearFullRows();
  placeNextPiece();
}

async function timerTick(){
  const canMovePieceDown = grid.canMovePiece('down', piece.value);
  if (canMovePieceDown){
    piece.move('down');
  } else {
    pieceIsActive.update('false');
    landPiece();
    await clearFullRows();
    placeNextPiece();
  }
}

function startGame(){
  status.update('started');
  placeNextPiece();
}

function pauseGame(){
  status.update('paused');
}

function restartGame(){
  status.update('started');
}

function startGameOver(){
  boardRows.reset();
  grid.reset();
  level.reset();
  lines.reset();
  nextPiece.reset();
  pieceIsActive.reset();
  piece.reset();
  score.reset();
  status.reset();
  highScores.reset();
}


//----- export code block ------------------------------------------------------

export {
  movePieceDown,
  movePieceRight,
  movePieceLeft,
  flipPieceRight,
  flipPieceLeft,
  drop,
  timerTick,
  startGame,
  pauseGame,
  restartGame,
  startGameOver,
}
