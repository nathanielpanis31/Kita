import { useEffect } from 'react';
import './Toast.css';

function Toast({ message, type = 'info', onClose, duration = 4000 }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [onClose, duration]);

    return (
        <div className={`toast-container toast-${type}`}>
            <div className="toast-icon">
                {type === 'warning' ? '⚠️' : 'ℹ️'}
            </div>
            <div className="toast-content">
                <p>{message}</p>
            </div>
            <button className="toast-close" onClick={onClose}>✕</button>
        </div>
    );
}

export default Toast;
