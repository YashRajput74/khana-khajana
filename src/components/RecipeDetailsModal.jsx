import { useState, useEffect } from "react";
import "../styles/RecipeDetailsModal.css";
import { useRecipes } from "../context/RecipesContext";

export default function RecipeDetailsModal({ recipeId, onClose }) {
    const { recipes, updateRecipe } = useRecipes();
    const recipe = recipes[recipeId];

    const [title, setTitle] = useState(recipe.title);
    const [steps, setSteps] = useState(recipe.steps.join("\n"));
    const [tags, setTags] = useState(recipe.tags || []);
    const [newTag, setNewTag] = useState("");

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose();
        };

        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    const handleAddTag = () => {
        const trimmed = newTag.trim();
        if (!trimmed) return;
        if (tags.includes(trimmed)) return;

        setTags([...tags, trimmed]);
        setNewTag("");
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    const handleSave = () => {
        if (!title.trim()) return;

        updateRecipe(recipeId, {
            title: title.trim(),
            tags,
            steps: steps.split("\n").filter(Boolean),
        });

        onClose();
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            updateRecipe(recipeId, { image: reader.result });
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="rdm-overlay">
            <div className="rdm-backdrop" onClick={onClose}></div>

            <div className="rdm-modal">
                {/* Header */}
                <div className="rdm-header">
                    <div>
                        <h2>Complete Your Memory</h2>
                        <p>Add the finishing touches to your recipe.</p>
                    </div>
                    <button onClick={onClose} className="rdm-icon-btn">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Body */}
                <div className="rdm-body">

                    {/* Recipe Name */}
                    <div className="rdm-field">
                        <label>Recipe Name</label>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Name your dish"
                        />
                    </div>

                    {/* Suggested Tags */}
                    <div className="rdm-field">
                        <label className="rdm-label-icon">
                            <span className="material-symbols-outlined">auto_awesome</span>
                            Suggested Tags
                        </label>

                        <div className="rdm-tags">
                            {tags.map((tag, index) => (
                                <div key={`${tag}-${index}`} className="rdm-tag">
                                    <span>{tag}</span>
                                    <button onClick={() => handleRemoveTag(tag)}>
                                        <span className="material-symbols-outlined">close</span>
                                    </button>
                                </div>
                            ))}

                            <button className="rdm-add-tag-btn" onClick={handleAddTag}>
                                <span className="material-symbols-outlined">add</span>
                                Add Tag
                            </button>
                        </div>

                        <div className="rdm-add-tag-input">
                            <input
                                placeholder="Add tag..."
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
                            />
                        </div>
                    </div>

                    {/* Two Column Layout */}
                    <div className="rdm-grid">

                        {/* Image Upload */}
                        <div className="rdm-field">
                            <label>Add a Photo</label>

                            <div className="rdm-image-upload">
                                <input
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={handleImageUpload}
                                    id="rdm-upload"
                                />

                                <label htmlFor="rdm-upload" className="rdm-image-upload">
                                    <div className="rdm-upload-icon">
                                        <span className="material-symbols-outlined">
                                            add_a_photo
                                        </span>
                                    </div>
                                    <p className="rdm-upload-title">
                                        Upload or drag & drop
                                    </p>
                                    <p className="rdm-upload-subtitle">
                                        PNG, JPG up to 5MB
                                    </p>
                                </label>

                            </div>
                        </div>

                        {/* Cooking Steps */}
                        <div className="rdm-field">
                            <label>Cooking Steps</label>

                            <div className="rdm-textarea-wrapper">
                                <textarea
                                    value={steps}
                                    onChange={(e) => setSteps(e.target.value)}
                                    placeholder={`1. Boil the water...
2. Add the noodles...`}
                                />

                                <button
                                    type="button"
                                    className="rdm-expand-btn"
                                >
                                    <span className="material-symbols-outlined">
                                        open_in_full
                                    </span>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Footer */}
                <div className="rdm-footer">
                    <button className="rdm-cancel" onClick={onClose}>
                        Cancel
                    </button>

                    <button className="rdm-save" onClick={handleSave}>
                        <span className="material-symbols-outlined">save</span>
                        Save Details
                    </button>
                </div>
            </div>
        </div>
    );
}