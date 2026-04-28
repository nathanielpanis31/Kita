import "./ConfirmModal.css"

function ConfirmModal({ title, message, onConfirm, onCancel, confirmText = "Confirm", cancelText = "Cancel", type = "danger" }) {
    return (
        <div className="confirm-modal-overlay">
            <div className="confirm-modal">
                <div className="confirm-modal-icon">
                    {type === 'danger' ? '!' : '?'}
                </div>
                <h2>{title}</h2>
                <p>{message}</p>
                <div className="confirm-modal-buttons">
                    <button className="confirm-modal-cancel" onClick={onCancel}>
                        {cancelText}
                    </button>
                    <button 
                        className={`confirm-modal-confirm ${type === 'danger' ? 'btn-danger' : 'btn-primary'}`} 
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal