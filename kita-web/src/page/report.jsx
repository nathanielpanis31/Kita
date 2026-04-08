import Button from "../components/button.jsx";

function Dashboard() {
  return (
    <div className="dashboard">
      
      {/* Default primary button */}
      <Button onClick={() => alert("Primary clicked!")}>
        Primary
      </Button>

      {/* Secondary button */}
      <Button variant="secondary" onClick={() => alert("Secondary clicked!")}>
        Secondary
      </Button>

      {/* Big button with page-specific style */}
      <Button className="big-button" onClick={() => alert("Big clicked!")}>
        Big Primary
      </Button>

    </div>
  );
}

export default Dashboard;