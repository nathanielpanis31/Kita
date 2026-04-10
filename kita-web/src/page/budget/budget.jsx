import Button from "../../components/buttons/button.jsx";
import "./budget.css";

  function Budget() {
    return(

    <div className="budget-page">
      
      <div className="budget-heading">
        <div className="left-heading">
          <h1>Transactions</h1>
          <p>Good Day!</p>
        </div>

        <div className="right-heading">
          <Button className="primary"> + Add Transaction</Button>
        </div>  
      </div>

        <div className="budget-body">
          <div className="budget-history">
          </div>
        </div>

    </div>

  )
}
export default Budget