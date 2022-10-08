//----- imports ----------------------------------------------------------------

import { useRef } from 'react';
import { useOnRenderAsync } from '../../lib/hooks.js';
import { animateFade } from '../../services/animator.js';
import '../stylesheets/instructions.css';


//----- module code block ------------------------------------------------------

function Instructions(props){

  const onRender = useOnRenderAsync();
  const containerDiv = useRef();

  
  return (
    <div className='instructions' ref={containerDiv}>
      <div className='button' onClick={props.onClick}>Done</div>
    </div>
  );
}


//----- export code block ------------------------------------------------------

export default Instructions;
