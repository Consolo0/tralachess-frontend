import { useAppContext } from "../../context/Context.js";
import PopUp from "../PopUp/PopUp.jsx";
import "./Board.css";
import Pieces from "./Pieces/Pieces.jsx";
import Ranks from "./bits/Ranks/Ranks.jsx";
import Tiles from "./bits/Tiles/Tiles.jsx";

function Board({match_id, auth0_id}) {

  const ranks = Array(8).fill().map((x, i) => 8-i);
  const tiles = Array(8).fill().map((x, i) => i+1);

  const {appState} = useAppContext();
  const positions = appState.positions[appState.positions.length-1];

  const getClassName = (i, j) => {
    let c = (i+j)%2!==0 ? 'dark-tile' : 'light-tile';
    if (appState.candidateMoves?.find(move => move[0]===i && move[1]===j)){
      if (positions[i][j]){
        c += ' attacking';
      }
      else{
        c+=' highlight'
      }
    }
    return c
  }

  return (
    <div className="board">
    
      <Ranks ranks={ranks}/>

      <div className="tiles">
        {ranks.map((rank, i) =>
          tiles.map((file, j)=>{

            return(
              <div 
              className={getClassName(i, j)} 
              key={file+'-'+rank}
              />
            )
          })
        )}
      </div>

      <Pieces match_id={match_id} auth0_id={auth0_id}/>

      <PopUp match_id={match_id} auth0_id={auth0_id}/>

      <Tiles tiles={tiles}/>
    </div>
  );
}

export default Board;
