import { useAppContext } from "../../context/Context";
import { ChangeStatus } from "../../reducer/actions/move";
import { useAuth0 } from "@auth0/auth0-react";
import "./PopUp.css";
import PromotionBox from "./PromotionBox/PromotionBox";
import MatchEndingPopUp from "./MatchEndingPopUp/MatchEndingPopUp";
import axios from "axios";


export const PopUp = ({match_id, auth0_id}) => {
  const { appState, dispatch } = useAppContext();
  const { getAccessTokenSilently } = useAuth0();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  if (appState.status !== "promotion" &&
     appState.status !== 'b' && 
     appState.status !== 'w'
    && appState.status !== 'draw')
    return null;

  const OnClosePopUp = async () => {
    //lo obtendriamos del backend lo de aca abajo (se lo dariamos)
    const token = await getAccessTokenSilently();
    const responseStatus = await axios.patch(`${backendUrl}/matches/update-status-directly`, {
      match_id,
      status: "ongoing",
    }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('Pop up cambio de status respuesta', responseStatus);
    dispatch(ChangeStatus("ongoing"));
  }

  return (
    <div className='popup'>
      <PromotionBox OnClosePopUp={OnClosePopUp} match_id={match_id} auth0_id={auth0_id}/>
      <MatchEndingPopUp />
    </div>
  );
}


export default PopUp;