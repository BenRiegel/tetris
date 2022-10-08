//----- imports ----------------------------------------------------------------

import Emitter from '../lib/emitter.js';
import { gameKeyCodes } from '../config/keys.js';


//----- module code block ------------------------------------------------------

const keyboard = (function(){

  let emitter = new Emitter();
  let isBroadcasting;

  function keyPressHandler(evt){
    evt.preventDefault();
    if (isBroadcasting){
      const gameKeyWasPressed = gameKeyCodes.includes(evt.keyCode);
      if (gameKeyWasPressed){
        emitter.broadcast(evt.keyCode);
      }
    }
  }

  function enable(){
    document.addEventListener('keydown', keyPressHandler);
  }

  function disable(){
    document.removeEventListener('keydown', keyPressHandler);
  }

  return {
    addListener: function(eventName, listener){
      emitter.addListener(eventName, listener);
    },
    updateControls: function(gameStatus){
      if (gameStatus === 'started'){
        enable();
      } else {
        disable();
      }
    },
    updateEmitter: function(pieceIsActive){
      isBroadcasting = pieceIsActive;
    }
  };

})();


//----- export code block ------------------------------------------------------

export default keyboard;
