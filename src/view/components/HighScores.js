//----- imports ----------------------------------------------------------------

import { useRef } from 'react';
import { useOnRenderAsync } from '../../lib/hooks.js';
import { animateFade } from '../../services/animator.js';
import '../stylesheets/high-scores.css';


//----- module code block ------------------------------------------------------

function HighScores(props){

  const onRender = useOnRenderAsync();
  const containerDiv = useRef();


  return (
    <div className='high-scores' ref={containerDiv}>
      <div className='button' onClick={props.onClick}>OK</div>
    </div>
  );
}


//----- export code block ------------------------------------------------------

export default HighScores;
