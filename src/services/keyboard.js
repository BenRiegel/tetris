//----- imports ----------------------------------------------------------------

import Emitter from '../lib/emitter.js';
import { gameKeyCodes } from '../config/keys.js';


//----- module code block ------------------------------------------------------

let emitter = new Emitter();
let isBroadcasting;

function keyPressHandler(evt){
  evt.preventDefault();
  if (isBroadcasting){
    const isGameKey = gameKeyCodes.includes(evt.keyCode);
    if (isGameKey){
      emitter.broadcast(evt.keyCode);
    }
  }
}

const keyboard = {
  setIsBroadcasting: function(value){
    isBroadcasting = value;
  },
  enable: function(){
    document.addEventListener('keydown', keyPressHandler);
  },
  disable: function(){
    document.removeEventListener('keydown', keyPressHandler);
  },
  addListener: emitter.addListener,
}


//----- export code block ------------------------------------------------------

export default keyboard;
