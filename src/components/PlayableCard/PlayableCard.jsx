import React from "react";
import "./PlayableCard.css";

const PlayableCard = ({prompt = "HOVER ME", title = "CYBER\nCARD", subtitle = "INTERACTIVE"}) => {
  return (
    <div className="container noselect">
      <div className="canvas">
        {[...Array(9)].map((_, i) => (
          <div key={i} className={`tracker tr-${i + 1}`}></div>
        ))}
        <div id="card">
          <div className="card-content">
            <div className="card-glare"></div>
            <div className="cyber-lines">
              <span></span><span></span><span></span><span></span>
            </div>
            <p id="title">{title}</p>
            <p className="prompt">{prompt}</p>
            <div className="glowing-elements">
              <div className="glow-1"></div>
              <div className="glow-2"></div>
              <div className="glow-3"></div>
            </div>
            <div className="subtitle">
              <span className="card-highlight">{subtitle}</span>
            </div>
            <div className="card-particles">
              {[...Array(6)].map((_, i) => (
                <span key={i}></span>
              ))}
            </div>
            <div className="corner-elements">
              {[...Array(4)].map((_, i) => (
                <span key={i}></span>
              ))}
            </div>
            <div className="scan-line"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayableCard;