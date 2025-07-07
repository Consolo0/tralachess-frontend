import "./MainPage.css";
import Board from "../../components/Board/Board.jsx";
import VerticalNavbar from "../../components/VerticalNavbar/VerticalNavbar.jsx";
import AppContext from "../../context/Context.js";
import reducer from "../../reducer/reducer.js";
import GetInitialBoardPosition from "../../helpers/GetInitialBoardPosition.js";
import { useReducer } from "react";
import Control from "../../components/Control/Control.jsx";
import MovesList from "../../components/Control/bits/MovesList.jsx";
import { MatchInfo } from "../../components/MatchInfo/MatchInfo.jsx";
import PlayableCard from "../../components/PlayableCard/PlayableCard.jsx";

function MainPage({initialState, match_id, auth0_id}){
  const [appState, dispatch] = useReducer(reducer, initialState);

  const providerState = {
    appState,
    dispatch
  }

  return(
    <AppContext.Provider value={providerState}>
      <VerticalNavbar/>

      <div className="main-page">
        <div style={{ gridArea: "matchinfo" }}>
          <MatchInfo />
        </div>
        <div style={{ gridArea: "board" }}>
          <Board match_id={match_id} auth0_id={auth0_id}/>
        </div>
        <div style={{ gridArea: "control" }}>
          <Control>
            <MovesList />
          </Control>
        </div>
        <div style={{ gridArea: "deck" }}>
          <div  className="cards-deck">
            <div className="card-row">
              <PlayableCard
                prompt="Activar"
                title="Doble Movimiento"
                subtitle="2 movimientos en un turno"
              />
              <PlayableCard
                prompt="Activar"
                title="Inmortal 1 turno"
                subtitle="Una pieza no puede ser destruida"
              />
            </div>
            <div className="card-row">
              <PlayableCard
                prompt="Activar"
                title="Teletransportar"
                subtitle="Intercambia la posición de 2 piezas"
              />
              <PlayableCard
                prompt="Activar"
                title="Ataque a Distancia"
                subtitle="Una pieza puede atacar sin moverse"
              />
            </div>
          </div>  
        </div>      
      </div>      
    </AppContext.Provider>
  );
}

export default MainPage;