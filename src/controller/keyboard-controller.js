import keyboard from '../services/keyboard.js';
import state from '../state/state.js';


function updateControls(){
  const gameInProgress = (state.gameStatus === 'started');
  if (gameInProgress){
    keyboard.enable();
  } else {
    keyboard.disable();
  }
}

function updateBroadcastingStatus(){
  const isBroadcasting = (!state.animationInProgress);
  keyboard.setIsBroadcasting(isBroadcasting);
}


state.onPropChange('gameStatus', updateControls);
state.onPropChange('animationInProgress', updateBroadcastingStatus);

updateBroadcastingStatus();
