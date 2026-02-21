import "../styles/AISuggestModal.css";

const AISuggestModal = ({
    isOpen,
    suggestion,
    onClose,
    onAssignToday,
    onTryAgain
}) => {
    if (!isOpen) return null;

    return (
        <div className="mp-modal-backdrop" onClick={onClose}>
            <div
                className="mp-modal-container"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="mp-modal-content">
                    <div className="mp-modal-header">
                        <span className="material-symbols-outlined mp-icon">
                            auto_awesome
                        </span>
                        <span className="mp-suggestion-label">
                            Suggested for You
                        </span>
                    </div>

                    <div className="mp-modal-body">
                        <div className="mp-modal-info">
                            <div className="mp-badge">
                                {suggestion?.badge || "AI Pick"}
                            </div>

                            <h2 className="mp-modal-title">
                                {suggestion?.title}
                            </h2>

                            <p className="mp-modal-description">
                                {suggestion?.description}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mp-modal-footer">
                    <div className="mp-action-buttons">
                        <button
                            className="mp-assign-button"
                            onClick={onAssignToday}
                        >
                            Assign to Today
                        </button>

                        <button
                            className="mp-try-button"
                            onClick={onTryAgain}
                        >
                            Try Something Else
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AISuggestModal;