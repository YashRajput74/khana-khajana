import "../styles/DeleteRecipeModal.css";

export default function DeleteRecipeModal({
    recipeTitle,
    onCancel,
    onConfirm
}) {
    return (
        <div className="delete_overlay" onClick={onCancel}>
            <div
                className="delete_modal"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="delete_topAccent"></div>

                <div className="delete_content">
                    <div className="delete_icon">
                        <span className="material-symbols-outlined">
                            delete_forever
                        </span>
                    </div>

                    <div className="delete_text">
                        <h2>Delete this recipe?</h2>
                        <p>
                            This will remove <strong>{recipeTitle}</strong> and all its
                            cooking history from your library. This action cannot be undone.
                        </p>
                    </div>

                    <div className="delete_actions">
                        <button
                            className="delete_cancel"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>

                        <button
                            className="delete_confirm"
                            onClick={onConfirm}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}