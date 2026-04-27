import "./TransactionModal.css"
import { useState } from "react"
import api from '../../api/axios' 


function TransactionModal({ onClose, onTransactionAdded }) {

    const [label, setLabel] = useState('')
    const [amount, setAmount] = useState('')
    const [type, setType] = useState('expense')
    const [category, setCategory] = useState('')
    const [date, setDate] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        api.post('/add', { label, amount, type, category, date })
        .then(result => {
            console.log(result)
            onTransactionAdded()
            onClose()
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Add Transaction</h2>

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
                            placeholder="e.g. Lunch at Jollibee"
                            onChange={(e) => setLabel(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label>AMOUNT (₱)</label><br />
                        <input
                            type="number"
                            placeholder="0.00"
                            step="0.01"
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label>CATEGORY</label><br />
                        <input type="text" placeholder="e.g. Food" onChange={(e) => setCategory(e.target.value)} required />
                    </div>

                    <div>
                        <label>DATE</label><br />
                        <input
                            type="date"
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>

                </div>

                <div className="modal-buttons">
                    <button type="button" className="modal-cancel" onClick={onClose}>Cancel</button>
                    <button type="submit" className="modal-submit">Save Transaction</button>
                </div>
                </form>

            </div>
        </div>
    )
}

export default TransactionModal