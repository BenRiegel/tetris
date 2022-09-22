export default function Animator(){

  let isPaused = false;
  let resolveF;
  let animationFunct;
  let targetDuration;
  let totalRunTime;
  let prevTimeStamp;

  function unpause(){
    isPaused = false;
    if (resolveF){
      prevTimeStamp = new Date().getTime();
      cycle();
    }
  }

  function pause(){
    isPaused = true;
  }

  function cycle(){
    requestAnimationFrame( function(){
      const currentTimeStamp = new Date().getTime();
      const deltaTime = currentTimeStamp - prevTimeStamp;
      prevTimeStamp = currentTimeStamp;
      totalRunTime += deltaTime;
      const totalProgress = Math.min(totalRunTime / targetDuration, 1);
      animationFunct(totalProgress);
      if (totalProgress < 1){
        if (!isPaused){
          cycle();
        }
      } else {
        resolveF();
        resolveF = null;
      }
    } );
  }

  function go(animationF, duration){
    animationFunct = animationF;
    targetDuration = duration;
    totalRunTime = 0;
    return new Promise( (resolve, reject) =>{
      resolveF = resolve;
      prevTimeStamp = new Date().getTime();
      cycle();
    });
  }

  return { pause, unpause, go };
}
