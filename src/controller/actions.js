import { createRandomPiece, canMoveDown, movePieceDown, canPlace } from '../state/piece.js';
import { canMoveRight, movePieceRight, canMoveLeft, movePieceLeft } from '../state/piece.js';
import { canFlipRight, flipPieceRight, canFlipLeft, flipPieceLeft } from '../state/piece.js';
import { calcDropDistance, dropPiece } from '../state/piece.js';
import { land, getFullRows, assignClearingRows, assignFallingRows, resetBoard } from '../state/board.js';
import { calcScore } from '../state/score.js';
import state from '../state/state.js';
import { initStateValue } from '../state/state.js';
import { MOVE_DOWN, MOVE_RIGHT, MOVE_LEFT, FLIP_LEFT, FLIP_RIGHT, DROP } from '../config/keys.js';  //don't like this


function moveDown(piece, board){
  const canMovePieceDown = canMoveDown(piece, board);
  if (canMovePieceDown){
    piece = movePieceDown(piece);
    state.piece = piece;
  }
}

function moveRight(piece, board){
  const canMovePieceRight = canMoveRight(piece, board);
  if (canMovePieceRight){
    piece = movePieceRight(piece);
    state.piece = piece;
  }
}

function moveLeft(piece, board){
  const canMovePieceLeft = canMoveLeft(piece, board);
  if (canMovePieceLeft){
    piece = movePieceLeft(piece);
    state.piece = piece;
  }
}

function flipLeft(piece, board){
  const canFlipPieceLeft = canFlipLeft(piece, board);
  if (canFlipPieceLeft){
    piece = flipPieceLeft(piece);
    state.piece = piece;
  }
}

function flipRight(piece, board){
  const canFlipPieceRight = canFlipRight(piece, board);
  if (canFlipPieceRight){
    piece = flipPieceRight(piece);
    state.piece = piece;
  }
}

function updateStats(numLines){
  let newNumLines = state.lines + numLines;
  state.lines = newNumLines;
  state.level = Math.floor(newNumLines / 10);
}

async function landPiece(board, piece){
  board = land(board, piece);
  state.board = board;
  state.piece = null;
  const fullRows = getFullRows(board);
  if (fullRows.length > 0){
    state.animationInProgress = true;
    board = assignClearingRows(board, fullRows);
    await state.setPropValue('board', board);
    board = assignFallingRows(board);
    await state.setPropValue('board', board);
    board = resetBoard(board);
    state.board = board;
    const score = calcScore( {type:'lines-cleared', numLines:fullRows.length, level:state.level} );
    updateStats(fullRows.length);
    state.score = state.score + score;
    state.animationInProgress = false;
  }
  return board;
}

function placeNextPiece(board, nextPiece){
  const canPlacePiece = canPlace(nextPiece, board);
  if (canPlacePiece){
    state.piece = nextPiece;
    state.nextPiece = createRandomPiece();
  } else {
    state.gameStatus = 'game-over';
  }
}

async function drop(piece, board){
  const dropDistance = calcDropDistance(piece, board);
  if (dropDistance > 0){
    piece = dropPiece(piece, dropDistance);
    state.animationInProgress = true;
    await state.setPropValue('piece', piece);
    const score = calcScore( {type:'drop', dist:dropDistance} );
    state.score = state.score + score;
    state.animationInProgress = false;
  }
  board = await landPiece(board, piece);
  placeNextPiece(board, state.nextPiece);
}


//----- export code block ------------------------------------------------------

export function keyAction(key){
  switch (key){
    case MOVE_DOWN:
      moveDown(state.piece, state.board);
      break;
    case MOVE_RIGHT:
      moveRight(state.piece, state.board);
      break;
    case MOVE_LEFT:
      moveLeft(state.piece, state.board);
      break;
    case FLIP_LEFT:
      flipLeft(state.piece, state.board);
      break;
    case FLIP_RIGHT:
      flipRight(state.piece, state.board);
      break;
    case DROP:
      drop(state.piece, state.board);
    default:
      break;
  }
}

export async function timerAction(){
  let board = state.board;
  let piece = state.piece;
  const canMovePieceDown = canMoveDown(piece, board);
  if (canMovePieceDown){
    piece = movePieceDown(piece);
    state.piece = piece;
  } else {
    board = await landPiece(board, piece);
    placeNextPiece(board, state.nextPiece);
  }
}

export function startAction(){
  state.gameStatus = 'started';
  state.piece = state.nextPiece;
  state.nextPiece = createRandomPiece();
}

export function pauseAction(){
  state.gameStatus = 'paused';
}

export function restartAction(){
  state.gameStatus = 'started';
}

export function startOverAction(){
  state.setProps(initStateValue);
}
