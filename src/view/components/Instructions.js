//----- imports ----------------------------------------------------------------

import Key from './Key.js';
import Button from './Button.js';
import '../stylesheets/instructions.css';


//----- module code block ------------------------------------------------------

function Instructions(props){

  return (
    <div className='instructions'>
      <h1>Instructions</h1>
      <p>Try to increase score by filling lines and dropping blocks. Clear ten
         lines and the speed increases.</p>
      <p>Keys and their respective actions:</p>
      <div className='key-container'>
        <Key keyText='←' text='Move piece left' />
        <Key keyText='→' text='Move piece right' />
        <Key keyText='↓' text='Move piece down' />
        <Key keyText='X' text='Flip piece right' />
        <Key keyText='Z' text='Flip piece left' />
        <Key keyText='space' text='Drop piece' />
      </div>
      <Button onClick={props.onClick} text='Got it'/>
    </div>
  );
}


//----- export code block ------------------------------------------------------

export default Instructions;
