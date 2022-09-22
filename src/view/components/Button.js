
import '../stylesheets/button.css';


export default function Board(props){

  return (
    <button onClick={props.onClick}>{props.text}</button>
  );
}
