import Button from "../../components/buttons/button.jsx";

function Dashboard() {
  return (
    <div className="dashboard">
      
      {/* Default primary button */}
      <Button onClick>
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
      
      <Button variant="secondary">
        Primary
      </Button>
    </div>
  );
}

export default Dashboard;