//----- imports ----------------------------------------------------------------

import { useOnRenderAsync } from '../../lib/hooks.js';
import { animateFade } from '../../services/animator.js';
import Title from './Title.js';
import Button from './Button.js';
import '../stylesheets/home.css';


//----- module code block ------------------------------------------------------

function Home(props){

  const onRender = useOnRenderAsync();

  return (
    <div className='home'>
      <Title/>
      <div className='button-container'>
        <Button onClick={props.onStartClick} text='Start Game' />
        <Button onClick={props.onInstructionsClick} text='Instructions' />
        <Button onClick={props.onScoresClick} text='High Scores' />
      </div>
    </div>
  );
}


//----- export code block ------------------------------------------------------

export default Home;
