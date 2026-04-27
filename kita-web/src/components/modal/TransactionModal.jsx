import "./TransactionModal.css"
import { useState } from "react"
import api from '../../api/axios' 


function TransactionModal({ onClose, onTransactionAdded, transactionToEdit }) {

    const [label, setLabel] = useState(transactionToEdit ? transactionToEdit.label : '')
    const [amount, setAmount] = useState(transactionToEdit ? transactionToEdit.amount : '')
    const [type, setType] = useState(transactionToEdit ? transactionToEdit.type : 'expense')
    const [category, setCategory] = useState(transactionToEdit ? transactionToEdit.category : '')
    const [date, setDate] = useState(transactionToEdit ? new Date(transactionToEdit.date).toISOString().split('T')[0] : '')

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if (transactionToEdit) {
            // Edit mode
            api.put(`/edit/${transactionToEdit._id}`, { label, amount, type, category, date })
            .then(result => {
                console.log(result)
                onTransactionAdded()
                onClose()
            })
            .catch(err => console.log(err))
        } else {
            // Add mode
            api.post('/add', { label, amount, type, category, date })
            .then(result => {
                console.log(result)
                onTransactionAdded()
                onClose()
            })
            .catch(err => console.log(err))
        }
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>{transactionToEdit ? 'Edit Transaction' : 'Add Transaction'}</h2>

                <form onSubmit={handleSubmit}>
                <div className="modal-inputs">

                    {/* TYPE BUTTONS */}
                    <div className="type-buttons">
                        <button
                            type="button"
                            className={`type-btn expense-btn ${type === 'expense' ? 'active-expense' : ''}`}
                            onClick={() => setType('expense')}
                        >
                            ↓ Expense
                        </button>
                        <button
                            type="button"
                            className={`type-btn income-btn ${type === 'income' ? 'active-income' : ''}`}
                            onClick={() => setType('income')}
                        >
                            ↑ Income
                        </button>
                    </div>

                    <div>
                        <label>DESCRIPTION</label><br />
                        <input
                            type="text"
                            value={label}
                            placeholder="e.g. Lunch at Jollibee"
                            onChange={(e) => setLabel(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label>AMOUNT (₱)</label><br />
                        <input
                            type="number"
                            value={amount}
                            placeholder="0.00"
                            step="0.01"
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label>CATEGORY</label><br />
                        <input 
                            type="text" 
                            value={category}
                            placeholder="e.g. Food" 
                            onChange={(e) => setCategory(e.target.value)} 
                            required 
                        />
                    </div>

                    <div>
                        <label>DATE</label><br />
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>

                </div>

                <div className="modal-buttons">
                    <button type="button" className="modal-cancel" onClick={onClose}>Cancel</button>
                    <button type="submit" className="modal-submit">
                        {transactionToEdit ? 'Save Changes' : 'Save Transaction'}
                    </button>
                </div>
                </form>

            </div>
        </div>
    )
}

export default TransactionModal