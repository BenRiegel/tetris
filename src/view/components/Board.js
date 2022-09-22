import BoardRow from './BoardRow';
import '../stylesheets/board.css';


export default function Board(){

  let board = new Array(20).fill(0);
  return (
    <div className='board'>
      {
        board.map( (row,i) => {
          return (
            <BoardRow key={i} index={i}/>
          );
        })
      }
    </div>
  );
}
