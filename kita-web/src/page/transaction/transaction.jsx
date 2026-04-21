import Button from "../../components/buttons/button.jsx";
import "./transaction.css";
import { useState } from "react";

function Transaction() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return(

    <div className="transaction-page">
      
      <div className="transaction-heading">
        <div className="left-heading">
          <h1>Transactions</h1>
          <p>Good Day!</p>
        </div>

        <div className="right-heading">
          <Button className="primary" onClick={() => setIsModalOpen(true)}> + Add Transaction</Button>
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

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modalBox">
              <h2 className="modalHeadings">Add Transaction</h2>

              <div className="modalButtons">
                <Button className="expenses">Expense</Button>
                <Button className="incomeTransaction">Income</Button>
              </div>

              <div className="addTransactionInput">
                <div className="addTransaction-description">
                  <label htmlFor="">DESCRIPTION</label>
                  <input type="text" placeholder="e.g. Lunch at Jollibee" />
                </div>

                <div className="addTransaction-amount">
                  <label htmlFor="">AMOUNT (₱)</label>
                  <input type="number"  placeholder="0.00"/>
                </div>

                <div className="addTransaction-category">
                  <label htmlFor="">CATEGORY</label>
                  <input type="text" placeholder="Select category"/>
                </div>

              </div>
            </div>
          </div>
        )}

    </div>

  )
}
export default Transaction