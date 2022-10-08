//----- imports ----------------------------------------------------------------

import { gameKeys } from '../config/keys.js';
import keyboard from '../services/keyboard.js';
import timer from '../services/timer.js';
import animator from '../services/animator.js';
import status from '../state/status.js';
import pieceIsActive from '../state/piece-is-active.js';
import level from '../state/level.js';
import * as actions from './state-controller.js';


//----- module code block ------------------------------------------------------

function updateTimer(){
  timer.update(status.value, pieceIsActive.value, level.value);
}
status.subscribe(updateTimer);
pieceIsActive.subscribe(updateTimer);

status.subscribe(keyboard.updateControls);
pieceIsActive.subscribe(keyboard.updateEmitter);

status.subscribe(animator.update);

keyboard.addListener(gameKeys.MOVE_DOWN, actions.movePieceDown);
keyboard.addListener(gameKeys.MOVE_RIGHT, actions.movePieceRight);
keyboard.addListener(gameKeys.MOVE_LEFT, actions.movePieceLeft);
keyboard.addListener(gameKeys.FLIP_RIGHT, actions.flipPieceRight);
keyboard.addListener(gameKeys.FLIP_LEFT, actions.flipPieceLeft);
keyboard.addListener(gameKeys.DROP, actions.drop);

timer.addListener('timerTick', actions.timerTick);
