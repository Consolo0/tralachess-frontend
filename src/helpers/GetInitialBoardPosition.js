export const GetInitialBoardPosition = () => {
  const positions = Array(8).fill("").map( () => Array(8).fill(""));
  
  const colorbyRow = {
    6: "w",
    7: "w",
    0: "b",
    1 : "b",
  };

  //aca tendriamos que mandar que color tiene el jugador 

  const elementByCol = {
    0 : "r",
    1 : "n",
    2 : "b",
    3 : "q",
    4 : "k",
    5 : "b",
    6 : "n",
    7 : "r",
  };

  const rows = [0, 1, 6, 7];

  for (let row of rows){
    for (let col = 0; col<8; col++){
      const color = colorbyRow[row];
      let piece = "";

      //pawn line of defense
      if (row === 1 || row == 6){
        piece = "p";
      }

      else{
        piece = elementByCol[col];
      }

      positions[row][col] = piece ? color+piece : "";
    }
  }

  return positions;
};

export default GetInitialBoardPosition;