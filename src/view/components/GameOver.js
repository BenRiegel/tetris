//----- imports ----------------------------------------------------------------

import { useRef } from 'react';
import { useOnRenderAsync } from '../../lib/hooks.js';
import { animateFade } from '../../services/animator.js';
import '../stylesheets/game-over.css';


//----- module code block ------------------------------------------------------

function GameOver(){

  const onRender = useOnRenderAsync();
  const containerDiv = useRef();

  onRender(async function(){
    await animateFade(containerDiv.current, 0, 1, 500);
  });

  return (
    <div className='game-over' ref={containerDiv}>
      Game Over
    </div>
  );
}


//----- export code block ------------------------------------------------------

export default GameOver;
