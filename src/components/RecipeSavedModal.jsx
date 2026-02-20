import "../styles/RecipeSavedModal.css";

export default function RecipeSavedModal({
    recipeTitle,
    onAddDetails,
    onClose
}) {
    return (
        <div className="rsm-overlay">
            <div className="rsm-backdrop" onClick={onClose}></div>

            <div className="rsm-modal">
                <div className="rsm-icon">
                    <span className="material-symbols-outlined">check</span>
                </div>

                <h2>New memory saved.</h2>

                <p className="rsm-title">{recipeTitle}</p>

                <p className="rsm-subtext">
                    Would you like to add cooking steps or a photo now?
                </p>

                <div className="rsm-buttons">
                    <button className="rsm-primary" onClick={onAddDetails}>
                        Add Details
                    </button>

                    <button className="rsm-secondary" onClick={onClose}>
                        Maybe Later
                    </button>
                </div>
            </div>
        </div>
    );
}