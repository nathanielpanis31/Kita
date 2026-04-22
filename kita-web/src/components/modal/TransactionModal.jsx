import "./TransactionModal.css"
import { useState } from "react"
import axios from "axios"


function TransactionModal({ onClose, onTransactionAdded }) {

    const [label, setLabel] = useState('')
    const [amount, setAmount] = useState('')
    const [type, setType] = useState('expense')
    const [category, setCategory] = useState('')
    const [date, setDate] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/api/add', { label, amount, type, category, date })
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

                    <div>
                        <label>LABEL</label><br />
                        <input type="text" placeholder="e.g. Jollibee" onChange={(e) => setLabel(e.target.value)} required />
                    </div>

                    <div>
                        <label>AMOUNT</label><br />
                        <input type="number" placeholder="e.g. 500" onChange={(e) => setAmount(e.target.value)} required />
                    </div>

                    <div>
                        <label>TYPE</label><br />
                        <select onChange={(e) => setType(e.target.value)}>
                            <option value="expense">Expense</option>
                            <option value="income">Income</option>
                        </select>
                    </div>

                    <div>
                        <label>CATEGORY</label><br />
                        <input type="text" placeholder="e.g. Food" onChange={(e) => setCategory(e.target.value)} required />
                    </div>

                    <div>
                        <label>DATE</label><br />
                        <input type="date" onChange={(e) => setDate(e.target.value)} required />
                    </div>

                </div>

                <div className="modal-buttons">
                    <button type="button" className="modal-cancel" onClick={onClose}>Cancel</button>
                    <button type="submit" className="modal-submit">Add</button>
                </div>
                </form>

            </div>
        </div>
    )
}

export default TransactionModal