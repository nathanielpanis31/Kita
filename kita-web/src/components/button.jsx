import "./Button.css"; // import the CSS for button styles

function Button({ children, onClick, className, variant = "primary" }) {
  return (
    <button
      className={`btn btn-${variant} ${className || ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;