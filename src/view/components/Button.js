//----- imports ----------------------------------------------------------------

import '../stylesheets/button.css';


//----- module code block ------------------------------------------------------

function Button(props){

  return (
    <div className='button' onClick={props.onClick}>{props.text}</div>
  );
}


//----- export code block ------------------------------------------------------

export default Button;
