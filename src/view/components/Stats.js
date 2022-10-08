//----- imports ----------------------------------------------------------------

import { default as scoreStore } from '../../state/score.js';
import { default as levelStore } from '../../state/level.js';
import { default as linesStore } from '../../state/lines.js';
import { useStore } from '../../lib/hooks.js';
import '../stylesheets/stats.css';


//----- module code block ------------------------------------------------------

function Stats(){
  const score = useStore(scoreStore);
  const level = useStore(levelStore);
  const lines = useStore(linesStore);
  return (
    <div className='score'>
      <div className='score-element'>
        <div className='score-name'>Score</div>
        <div className='score-value'>{score}</div>
      </div>
      <div className='score-element'>
        <div className='score-name'>Level</div>
        <div className='score-value'>{level}</div>
      </div>
      <div className='score-element'>
        <div className='score-name'>Lines</div>
        <div className='score-value'>{lines}</div>
      </div>
    </div>
  );
}


//----- export code block ------------------------------------------------------

export default Stats;
