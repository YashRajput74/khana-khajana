import { useState, useEffect } from "react";
import "../styles/AddRecipeModal.css";

export default function AddRecipeModal({ onSave, onClose }) {
    const [title, setTitle] = useState("");

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    const handleSubmit = () => {
        if (!title.trim()) return;
        onSave(title.trim());
        setTitle("");
    };

    return (
        <div className="arm-overlay">
            <div className="arm-backdrop" onClick={onClose}></div>

            <div className="arm-modal">
                <h2>Add New Recipe</h2>
                <p>Give your new dish a name to get started.</p>

                <input
                    autoFocus
                    placeholder="e.g. Spicy Basil Noodles"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                />

                <div className="arm-actions">
                    <button className="arm-cancel" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="arm-save" onClick={handleSubmit}>
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
}