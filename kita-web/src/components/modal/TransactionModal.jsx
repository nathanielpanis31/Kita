import "./TransactionModal.css"
import { useState } from "react"
import api from '../../api/axios' 
import { useToast } from "../toast/ToastContext"

function TransactionModal({ onClose, onTransactionAdded, transactionToEdit }) {
    const { addToast } = useToast()
    const [label, setLabel] = useState(transactionToEdit ? transactionToEdit.label : '')
    const [amount, setAmount] = useState(transactionToEdit ? transactionToEdit.amount : '')
    const [type, setType] = useState(transactionToEdit ? transactionToEdit.type : 'expense')
    const [category, setCategory] = useState(transactionToEdit ? transactionToEdit.category : '')
    const [date, setDate] = useState(transactionToEdit ? new Date(transactionToEdit.date).toISOString().split('T')[0] : '')
    const [error, setError] = useState('')

    const checkBudget = async (cat, amt, tDate) => {
        try {
            const dateObj = new Date(tDate);
            const m = dateObj.getMonth() + 1;
            const y = dateObj.getFullYear();

            // Fetch budgets and transactions for comparison
            const [budgetsRes, transactionsRes] = await Promise.all([
                api.get(`/budget/get?month=${m}&year=${y}`),
                api.get('/get')
            ]);

            const budgets = budgetsRes.data;
            const transactions = transactionsRes.data;

            const categoryBudget = budgets.find(b => b.category.toLowerCase() === cat.toLowerCase());
            
            if (categoryBudget) {
                const spent = transactions
                    .filter(t => {
                        const d = new Date(t.date);
                        return t.category.toLowerCase() === cat.toLowerCase() &&
                               t.type === 'expense' &&
                               d.getMonth() + 1 === m &&
                               d.getFullYear() === y &&
                               (!transactionToEdit || t._id !== transactionToEdit._id); // exclude current if editing
                    })
                    .reduce((total, t) => total + Number(t.amount), 0);

                if (spent + Number(amt) > categoryBudget.budgetLimit) {
                    addToast(`Warning: You have exceeded your budget for ${cat}!`, 'warning');
                }
            }
        } catch (err) {
            console.error("Budget check failed", err);
        }
    };

    const validate = () => {
        if (!label.trim() || !amount || !category.trim() || !date) {
            return "All fields are required";
        }
        if (Number(amount) <= 0) {
            return "Amount must be greater than zero";
        }
        if (new Date(date) > new Date()) {
            return "Transaction date cannot be in the future";
        }
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }
        
        const payload = { label, amount: Number(amount), type, category, date };

        try {
            if (transactionToEdit) {
                await api.put(`/edit/${transactionToEdit._id}`, payload);
            } else {
                await api.post('/add', payload);
            }

            if (type === 'expense') {
                checkBudget(category, amount, date);
            }

            onTransactionAdded();
            onClose();
        } catch (err) {
            setError(err.response?.data?.error || "Failed to save transaction");
        }
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>{transactionToEdit ? 'Edit Transaction' : 'Add Transaction'}</h2>
                
                {error && <p className="error-message" style={{ color: 'var(--red)', fontSize: '12px', marginBottom: '10px' }}>{error}</p>}

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