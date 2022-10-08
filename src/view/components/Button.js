//----- imports ----------------------------------------------------------------

import '../stylesheets/button.css';


//----- module code block ------------------------------------------------------

function Button(props){

  return (
    <button onClick={props.onClick}>{props.text}</button>
  );
}


//----- export code block ------------------------------------------------------

export default Button;
