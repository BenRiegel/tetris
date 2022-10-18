//----- imports ----------------------------------------------------------------

import '../stylesheets/key.css';


//----- module code block ------------------------------------------------------

function Key(props){

  return (
    <div className='key'>
      <span className='key-text'>{props.keyText}</span>
      <span>{props.text}</span>
    </div>
  );
}


//----- export code block ------------------------------------------------------

export default Key;
