import timer from '../services/timer.js';
import state from '../state/state.js';


function getDuration(level){
  return 1000;
}

function updateTimerStatus(){
  const gameInProgress = (state.gameStatus === 'started');
  const isEnabled = (gameInProgress && !state.animationInProgress);
  if (isEnabled){
    const duration = getDuration(state.level);
    timer.start(duration);
  } else {
    timer.stop();
  }
}

state.onPropChange('gameStatus', updateTimerStatus);
state.onPropChange('animationInProgress', updateTimerStatus);
