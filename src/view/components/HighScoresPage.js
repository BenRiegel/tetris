//----- imports ----------------------------------------------------------------

import HighScores from './HighScores.js';
import Button from './Button.js';
import '../stylesheets/high-scores.css';


//----- module code block ------------------------------------------------------

function HighScoresPage(props){
  return (
    <div className='high-scores'>
      <h1>High Scores</h1>
      <HighScores/>
      <Button onClick={props.onClick} text='OK' />
    </div>
  );
}


//----- export code block ------------------------------------------------------

export default HighScoresPage;
