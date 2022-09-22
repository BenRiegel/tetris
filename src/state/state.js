import State from '../lib/state.js';
import { createRandomPiece } from './piece.js';
import { createNewBoard } from './board.js';


const initStateValue = {
  gameStatus:'starting',
  board: createNewBoard(),
  piece: null,
  nextPiece: createRandomPiece(),
  score: 0,
  level: 0,
  lines: 0,
  animationInProgress: false,
}

const state = new State(initStateValue);


export default state;

export { initStateValue }
