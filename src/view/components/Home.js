//----- imports ----------------------------------------------------------------

import { useRef } from 'react';
import { useOnRenderAsync } from '../../lib/hooks.js';
import { animateFade } from '../../services/animator.js';
import '../stylesheets/home.css';


//----- module code block ------------------------------------------------------

function Home(props){

  const onRender = useOnRenderAsync();
  const containerDiv = useRef();

//  onRender(async function(){//
//    await animateFade(containerDiv.current, 0, 1, 500);
  //});

  return (
    <div className='home' ref={containerDiv}>
      <div className='title'>Tetris</div>
      <div className='button-container'>
        <div className='button' onClick={props.onStartClick}>Start Game</div>
        <div className='button' onClick={props.onInstructionsClick}> Instructions </div>
        <div className='button' onClick={props.onScoresClick}>High Scores</div>
      </div>
    </div>
  );
}


//----- export code block ------------------------------------------------------

export default Home;
