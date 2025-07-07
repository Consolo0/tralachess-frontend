import { useAppContext } from "../../../context/Context";
import "./MovesList.css";

const MovesList = () => {
  const {appState} = useAppContext();
  const movesList = appState.movesList;
  return <div className="moves-list">
    {movesList.map((move, i) =>(
      <div key={i} data-number={Math.floor((i/2)+1)}>{move}</div>
      ))
    }
  </div>
}

export default MovesList;