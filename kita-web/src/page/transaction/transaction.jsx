import Button from "../../components/buttons/button.jsx";
import "./transaction.css";

function Transaction() {
  return(

    <div className="transaction-page">
      
      <div className="transaction-heading">
        <div className="left-heading">
          <h1>Transactions</h1>
          <p>Good Day!</p>
        </div>

        <div className="right-heading">
          <Button className="primary"> + Add Transaction</Button>
        </div>  
      </div>

        <div className="transaction-body">
          <div className="transaction-history">
            <div className="history-header">
            <Button className="all"> All</Button>
            <Button className="all" id="income"> Income</Button>
            <Button className="all" id="expense"> Expense</Button>
            </div><hr />

        <div className="transaction">
          <div className="transaction-inputs">
            <div className="label-amount">
              <div className="transact-label">
                <p className="label">jollibee</p>
                <p className="date">April 2026</p>
              </div>
              <p className="amount">₱500.00</p>
            </div>
          </div>
        </div>
          </div>
        </div>

    </div>

  )
}
export default Transaction