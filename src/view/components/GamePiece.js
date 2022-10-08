//----- imports ----------------------------------------------------------------

import { useStore } from '../../lib/hooks.js';
import pieceStore from '../../state/piece.js';
import { CELL_SIZE } from '../../config/config.js';
import Piece from './Piece.js';
import '../stylesheets/game-piece.css';


//----- module code block ------------------------------------------------------

function GamePiece(props){

  const piece = useStore(pieceStore);

  function getStyle(){
    const top = piece.coords.row * CELL_SIZE;
    const left = piece.coords.column * CELL_SIZE;
    return { transform: `translate(${left}px, ${top}px` };
  }

  if (piece){
    return (
      <div className='piece-container' style={ getStyle() }>
        <Piece cells={piece.cells}/>
      </div>
    );
  }

}


//----- export code block ------------------------------------------------------

export default GamePiece;




/*function usePiece(){
  const onMountDo = useOnMount();
  const [piece, setPiece] = useState(pieceStore.value);
  const coordsListener = useRef();
  const resolveF = useRef();
  function setCoordsListener(callback){
    coordsListener.current = callback;
  }
  function handlePieceChange(newPiece, oldPiece, isSetRow){
    if (isSetRow){
      //coordsListener.current(newPiece.coords);
    } else {
      return new Promise( (resolve, reject)=>{
        resolveF.current = resolve;
        setPiece(newPiece);
      });
    }
  }
  useEffect( ()=>{
    if (resolveF.current){
      resolveF.current();
      resolveF.current = null;
    }
  });
  onMountDo( ()=>{
    pieceStore.subscribe(handlePieceChange);
  });
  return [piece, setCoordsListener];
}*/

//  const [piece, onCoordsChangeDo] = usePiece();
/*useEffect( ()=>{
  if (piece){
    pieceContainer.current.style.transform = getTranslateStr(piece.coords);
  }
});*/

//function positionPiece(newCoords){
//  pieceContainer.current.style.transform = getTranslateStr(newCoords);
//  }

//  onCoordsChangeDo(positionPiece);
