import { useState } from 'react';
import state from '../../state/state.js';
import { useOnMount } from '../../lib/hooks.js';
import '../stylesheets/stats.css';


export default function Stats(){

  const [score, setScore] = useState(state.score);
  const [level, setLevel] = useState(state.level);
  const [lines, setLines] = useState(state.lines);

  const onMountDo = useOnMount();

  onMountDo( ()=>{
    state.onPropChange('score', setScore);
    state.onPropChange('level', setLevel);
    state.onPropChange('lines', setLines);
  });

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
