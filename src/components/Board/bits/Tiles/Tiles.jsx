import './Tiles.css'
import GetCharacter from "../../../../helpers/GetCharacter.js";

const Tiles = ({tiles}) => {
  //llamamos files al className para evitar conflictos con el de Board
  //NO CAMBIAR
  return(
    <div className="files">
      {tiles.map(tile=><span key={tile}>{(GetCharacter(tile))}</span>)}
    </div>
  );
}

export default Tiles;