let animate = (function(){

  let startTimeStamp;

  function cycle(animationF, duration, resolveF){
    requestAnimationFrame( function(){
      const currentTimeStamp = new Date().getTime();
      const currentRunTime = currentTimeStamp - startTimeStamp;
      if (currentRunTime < duration){
        const totalProgress = currentRunTime / duration;
        animationF(totalProgress);
        cycle(animationF, duration, resolveF);
      } else {
        resolveF();
      }
    } );
  }

  return function(element, duration, style, startValue, endValue, units=''){

    const deltaValue = endValue - startValue;

    function animationF(progress){
      const currentValue = startValue + progress * deltaValue;
      element.style[style] = `${currentValue}${units}`;
    }

    return new Promise( (resolve, reject) =>{
      startTimeStamp = new Date().getTime();
      cycle(animationF, duration, resolve);
    } );
  }

})();


export default animate;

export async function animateFadeIn(element, duration){
  return animate(element, duration, 'opacity', 0, 1);
}

export async function animateFadeOut(element, duration){
  return animate(element, duration, 'opacity', 1, 0);
}
