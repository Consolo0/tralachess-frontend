import "./HamburgerIcon.css";

function HamburgerIcon({isPressed}){
  return(
    <div className="hamburger" onClick={isPressed}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}

export default HamburgerIcon;