//----- imports ----------------------------------------------------------------

import { useEffect, useRef, useState } from 'react';
import { animateFade } from '../../services/animator.js';
import '../stylesheets/count-down.css';


//----- module code block ------------------------------------------------------

function useCounter(initValue){
  const onIteration = useRef();
  const onComplete = useRef();
  const [count, setCount] = useState(initValue);
  function setOnIteration(callback){
    onIteration.current = callback;
  }
  function setOnComplete(callback){
    onComplete.current = callback;
  }
  function decrement(){
    setCount( prevCount => prevCount - 1 );
  }
  useEffect( ()=>{
    (async function(){
      if (onIteration.current){
        await onIteration.current(count);
      }
      if (count > 0){
        decrement();
      } else {
        if (onComplete.current){
          onComplete.current();
        }
      }
    }());
  }, [count]);
  return [count, setOnIteration, setOnComplete];
}

function CountDown(props){
  const [count, onIterationDo, onCompleteDo] = useCounter(3);
  const containerDiv = useRef();
  const countDiv = useRef();
  onIterationDo(function(newCount){
    if (newCount > 0){
      return animateFade(countDiv.current, 1, 0, 750);
    } else {
      return animateFade(containerDiv.current, 1, 0, 500);
    }
  });
  onCompleteDo(props.onFinish);
  function renderCount(){
    if (count > 0){
      return count;
    }
  }
  return (
    <div className='countDown' ref={containerDiv}>
      <div className='count' ref={countDiv}>
        { renderCount() }
      </div>
    </div>
  );
}


//----- export code block ------------------------------------------------------

export default CountDown;
