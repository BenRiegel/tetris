//----- imports ----------------------------------------------------------------

import { useRef } from 'react';
import { useCounter, useOnRenderAsync } from '../../lib/hooks.js';
import { animateFadeOut } from '../../lib/animate.js';   ///<-- don't like this here
import '../stylesheets/count-down.css';
import state from '../../state/state.js';


//----- export code block ------------------------------------------------------

export default function CountDown(props){

  const [count, decrement] = useCounter(3);
  const onRender = useOnRenderAsync();
  const containerDiv = useRef();
  const countDiv = useRef();

  onRender(async function(){
    if (count > 0){
      await animateFadeOut(countDiv.current, 750);
      decrement();
    } else {
      await animateFadeOut(containerDiv.current, 500);
      props.onFinish();
    }
  });

  const countStr = (count > 0 ? `${count}` : '');

  return (
    <div className='countDown' ref={containerDiv}>
      <div className='count' ref={countDiv}>
        {countStr}
      </div>
    </div>
  );
}
