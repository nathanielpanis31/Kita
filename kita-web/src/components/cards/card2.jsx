// components/cards/card.jsx
import "./cards.css";

function Card2({ title, children, className, variant = "default" }) {
  return (
    <div className={`card2 card2-${variant} ${className || ""}`}>
      {title && (
        <div className="card2-header">
          <h3>{title}</h3>
        </div>
      )}
      <hr/>
      <div className="card2-body">
        {children}
        
      </div>
    </div>
  );
}

export default Card2;
