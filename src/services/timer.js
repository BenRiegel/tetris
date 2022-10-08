//----- imports ----------------------------------------------------------------

import Emitter from '../lib/emitter.js';


//----- module code block ------------------------------------------------------

const TIMER_INTERVAL_MAX = 750;
const TIMER_INTERVAL_MIN = 350;
const TIMER_INTERVAL_DELTA = 50;

function getDuration(level){
  let duration = TIMER_INTERVAL_MAX - TIMER_INTERVAL_DELTA * level;
  return Math.max(duration, TIMER_INTERVAL_MIN);
}

const timer = (function(){

  let emitter = new Emitter();
  let interval = null;

  function onTick(){
    if (interval){
      emitter.broadcast('timerTick');
    }
  }

  function start(duration){
    if (interval === null){
      interval = setInterval(onTick, duration);
    }
  }

  function stop(){
    clearInterval(interval);
    interval = null;
  }

  return {
    addListener: function(eventName, listener){
      emitter.addListener(eventName, listener);
    },
    update(gameStatus, pieceIsActive, level){
      const gameInProgress = (gameStatus === 'started');
      const isEnabled = (gameInProgress && pieceIsActive);
      if (isEnabled){
        const duration = getDuration(level);
        start(duration);
      } else {
        stop();
      }
    }
  };

})();


//----- export code block ------------------------------------------------------

export default timer;
