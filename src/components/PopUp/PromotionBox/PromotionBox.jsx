import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAppContext } from '../../../context/Context';
import { useAuth0 } from '@auth0/auth0-react';
import { UpdatePositionsOnly } from '../../../reducer/actions/move';
import './PromotionBox.css'

const GetPromotionSquare = async (match_id, auth0_id) => {
  const { getAccessTokenSilently } = useAuth0();
  const token = await getAccessTokenSilently();
  
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const promotionSquareResponse = await axios.get(`${backendUrl}/matches/get-promotion-box`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { match_id, auth0_id }
  });

  console.log('resultado del promotion box', promotionSquareResponse);

  if (promotionSquareResponse.status===200){
    console.log(promotionSquareResponse.data.result);
    return promotionSquareResponse.data.result;

  }else{
    console.log('Error con el promotionSquareResponse');
  }
}

export const PromotionBox = ({OnClosePopUp, match_id, auth0_id}) => {
  const options = ['q', 'r', 'b', 'n'];
  const [promotionSquare, setPromotionSquare] = useState(null); // [x, y]
  const {appState, dispatch} = useAppContext();

  useEffect(() => {
    if (appState.status === "promotion") {
      GetPromotionSquare(match_id, auth0_id).then((res) => {
        if (res) {
          setPromotionSquare(res); // guarda [x, y]
        }
      });
    }
  }, [appState.status]);

  if (appState.status !== "promotion" || promotionSquare === null) return null;

  const [x, y] = promotionSquare;

  const color = x === 0 ? 'w' : 'b';

  const getPromotionBoxPosition = () => {
    const style = {};

    style.top =  color === 'w' ? '-12.5%' : '112.5%';

    if (y <= 1)
      style.left = '0%';

    else if (y >= 6)
      style.right = '0%';

    else{
      style.left = `${12.5*y-20}%`
    }

    return style;
  }

  const OnClick = async (option, token) => {
    try{
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      console.log("hola estoy en OnClick");
      const newPositions = appState.positions[appState.positions.length-1].map(row => [...row]);
      console.log("Llegue en newPositions");
      newPositions[x][y] = `${color}${option}`;
      console.log('Pase la declaracion de la nueva pieza')

      const updateBoardResponse = await axios.patch(`${backendUrl}/matches/update-board-directly`, {
        match_id,
        newPosition: newPositions,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('Promotion box positions update response', updateBoardResponse);

      if (updateBoardResponse.status === 200){
        dispatch(UpdatePositionsOnly({newPositions}));
        OnClosePopUp();
      }else{
        console.log('Codigo de error en llamado a updateBoardResponse');
      }
    }catch(error){
      console.error("Error en OnClick (promoción):", error);
    }
  };

  return (
    <div className='popup-inner promotion-choices' style={getPromotionBoxPosition()}>
      {options.map((option) => 
      <div className= {`piece ${color}${option}`}
       key={option}
       onClick={()=>{OnClick(option, token)}}/>)}
    </div>
  );
}

export default PromotionBox;