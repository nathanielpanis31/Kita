// components/cards/card.jsx
import "./cards.css";

function Card({ title, children, className, variant = "default" }) {
  return (
    <div className={`card card-${variant} ${className || ""}`}>
      {title && (
        <div className="card-header">
          <h3>{title}</h3>
        </div>
      )}
      <div className="card-body">
        {children}
        
      </div>
    </div>
  );
}

export default Card;
