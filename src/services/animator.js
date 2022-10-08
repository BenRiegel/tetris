//----- imports ----------------------------------------------------------------

import { nextAnimationFrame } from '../lib/utils.js';


//----- module code block ------------------------------------------------------

const animator = (function(){

  let isPaused = false;
  let callback;
  let resolveF;
  let duration;
  let timeRemaining;

  async function cycle(){
    while (!isPaused && timeRemaining > 0){
      const prevTimeStamp = new Date().getTime();
      await nextAnimationFrame();
      const currentTimeStamp = new Date().getTime();
      const deltaTime = currentTimeStamp - prevTimeStamp;
      timeRemaining = Math.max(timeRemaining - deltaTime, 0);
      const totalProgress = 1 - (timeRemaining / duration);
      callback(totalProgress);
    }
    if (timeRemaining === 0){
      resolveF();
    }
  }

  function pause(){
    isPaused = true;
  }

  function unpause(){
    isPaused = false;
    cycle();
  }

  return {
    go: function(animationF, animationDuration){
      callback = animationF;
      duration = animationDuration;
      timeRemaining = animationDuration;
      return new Promise( (resolve, reject) =>{
        resolveF = resolve;
        cycle();
      });
    },
    update: function(gameStatus){
      switch (gameStatus){
        case 'paused':
          pause();
          break;
        case 'started':
          unpause();
          break;
        default:
          break;
      }
    }
  };
})();


//----- export code block ------------------------------------------------------

export default animator;

export function animateFade(element, startOpacity, endOpacity, duration){
  const deltaOpacity = endOpacity - startOpacity;
  function fade(progress){
    const opacity = startOpacity + (progress * deltaOpacity);
    element.style.opacity = `${opacity}`;
  }
  return animator.go(fade, duration);
}
