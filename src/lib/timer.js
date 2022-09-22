import Emitter from '../lib/emitter.js';

export default function Timer(){

  let emitter = new Emitter();
  let interval = null;

  function onTick(){
    if (interval){
      emitter.broadcast();
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
    start,
    stop,
    addListener: emitter.addListener,
  };

}
