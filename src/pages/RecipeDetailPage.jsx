import "../styles/RecipeDetailPage.css";
import { useParams, useNavigate } from "react-router-dom";
import { useRecipes } from "../context/RecipesContext";
import { useEffect, useState } from "react";

export default function RecipeDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const {
        recipes,
        toggleFavorite,
        updateRecipe
    } = useRecipes();
    const [isEditing, setIsEditing] = useState(false);
    const [draft, setDraft] = useState(null);
    const recipe = recipes[id];
    const [newTag, setNewTag] = useState("");

    useEffect(() => {
        if (!isEditing) return;

        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = "";
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [isEditing]);
    if (!recipe) {
        return (
            <div className="rd-page">
                <p>Recipe not found.</p>
                <button onClick={() => navigate(-1)}>Go Back</button>
            </div>
        );
    }
    const lastCookedText = recipe.lastCookedAt
        ? (() => {
            const diffDays = Math.floor(
                (new Date() - new Date(recipe.lastCookedAt)) /
                (1000 * 60 * 60 * 24)
            );

            if (diffDays === 0) return "Cooked today";
            if (diffDays === 1) return "Cooked yesterday";
            return `Cooked ${diffDays} days ago`;
        })()
        : "Never cooked";

    const handleMarkAsCooked = async () => {
        await updateRecipe(id, {
            lastCookedAt: new Date().toISOString()
        });
    };

    const handleToggleFavorite = async () => {
        await toggleFavorite(id);
    };
    const handleShareWhatsApp = () => {
        const baseUrl = window.location.origin;
        const recipeUrl = `${baseUrl}/recipes/${id}`;

        const message = `
🍽 *${recipe.title}*

${recipe.tags?.length ? `🏷 Tags: ${recipe.tags.join(", ")}` : ""}

📝 Steps:
${recipe.steps?.map((s, i) => `${i + 1}. ${s}`).join("\n")}

🔗 View full recipe:
${recipeUrl}
    `.trim();

        const encodedMessage = encodeURIComponent(message);

        const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;

        window.open(whatsappUrl, "_blank");
    };
    return (
        <div className={`rd-page ${isEditing ? "editing" : ""}`}>

            {/* HEADER */}
            <header className="rd-header">
                <button className="rd-back" onClick={() => navigate(-1)}>
                    <span className="material-symbols-outlined">arrow_back</span>
                    <span>Back</span>
                </button>

                <div className="rd-header-actions">
                    {!isEditing ? (
                        <>
                            <button
                                className="rd-favorite"
                                onClick={handleToggleFavorite}
                            >
                                {recipe.isFavorite ? "★ Favorite" : "☆ Favorite"}
                            </button>

                            <button
                                className="rd-edit"
                                onClick={() => {
                                    setDraft({
                                        title: recipe.title,
                                        image: recipe.image || "",
                                        tags: recipe.tags || [],
                                        steps: recipe.steps?.join("\n") || ""
                                    });
                                    setIsEditing(true);
                                }}
                            >
                                Edit
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                className="rd-cancel"
                                onClick={() => {
                                    const originalSteps = recipe.steps?.join("\n") || "";
                                    const originalTags = JSON.stringify(recipe.tags || []);

                                    if (
                                        draft.title !== recipe.title ||
                                        draft.image !== (recipe.image || "") ||
                                        draft.steps !== originalSteps ||
                                        JSON.stringify(draft.tags) !== originalTags
                                    ) {

                                        const confirmLeave = window.confirm("Discard unsaved changes?");
                                        if (!confirmLeave) return;
                                    }

                                    setIsEditing(false);
                                    setDraft(null);
                                }}
                            >
                                Cancel
                            </button>

                            <button
                                className="rd-save"
                                onClick={async () => {
                                    await updateRecipe(id, {
                                        title: draft.title,
                                        image: draft.image,
                                        tags: draft.tags,
                                        steps: draft.steps
                                            .split("\n")
                                            .map(s => s.trim())
                                            .filter(Boolean)
                                    });

                                    setIsEditing(false);
                                    setDraft(null);
                                }}
                            >
                                Save
                            </button>
                        </>
                    )}
                </div>
            </header>

            <main className="rd-main">

                {/* TITLE */}
                <div className="rd-title-section">
                    {isEditing ? (
                        <input
                            className="rd-title-input"
                            value={draft.title}
                            onChange={(e) =>
                                setDraft(prev => ({ ...prev, title: e.target.value }))
                            }
                        />
                    ) : (
                        <h1>{recipe.title}</h1>
                    )}

                    <div className="rd-meta">
                        <span className="material-symbols-outlined">history</span>
                        <span>{lastCookedText}</span>
                        <div className="rd-dot" />
                        <span>Added on {new Date(recipe.addedAt).toLocaleDateString()}</span>
                    </div>
                </div>

                {/* IMAGE */}
                {/* IMAGE */}
                <div className="rd-image-wrapper">
                    {isEditing ? (
                        <>
                            {draft.image && (
                                <img src={draft.image} alt="Preview" />
                            )}

                            <input
                                className="rd-image-input"
                                placeholder="Paste image URL..."
                                value={draft.image}
                                onChange={(e) =>
                                    setDraft(prev => ({ ...prev, image: e.target.value }))
                                }
                            />

                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (!file) return;

                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        setDraft(prev => ({
                                            ...prev,
                                            image: reader.result
                                        }));
                                    };
                                    reader.readAsDataURL(file);
                                }}
                            />
                        </>
                    ) : (
                        recipe.image && (
                            <img src={recipe.image} alt={recipe.title} />
                        )
                    )}
                </div>

                {/* TAGS */}
                {/* TAGS */}
                <div className="rd-tags">
                    {isEditing ? (
                        <>
                            {draft.tags.map((tag, i) => (
                                <div key={i} className="rd-tag editable">
                                    {tag}
                                    <button
                                        onClick={() =>
                                            setDraft(prev => ({
                                                ...prev,
                                                tags: prev.tags.filter((_, idx) => idx !== i)
                                            }))
                                        }
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}

                            <input
                                className="rd-tag-input"
                                placeholder="Add tag..."
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && newTag.trim()) {
                                        setDraft(prev => ({
                                            ...prev,
                                            tags: [...prev.tags, newTag.trim()]
                                        }));
                                        setNewTag("");
                                    }
                                }}
                            />
                        </>
                    ) : (
                        recipe.tags?.map((tag, i) => (
                            <div key={i} className="rd-tag">
                                {tag}
                            </div>
                        ))
                    )}
                </div>

                {/* STEPS */}
                <div className="rd-steps">
                    <div className="rd-steps-header">
                        <h2>Cooking Steps</h2>
                        <span>{recipe.steps?.length || 0} steps</span>
                    </div>

                    {isEditing ? (
                        <textarea
                            className="rd-steps-textarea"
                            rows={10}
                            value={draft.steps}
                            onChange={(e) =>
                                setDraft(prev => ({ ...prev, steps: e.target.value }))
                            }
                        />
                    ) : (
                        recipe.steps?.map((step, index) => (
                            <div key={index} className="rd-step">
                                <div className="rd-step-number">{index + 1}</div>
                                <p>{step}</p>
                            </div>
                        ))
                    )}
                </div>

                {/* MARK AS COOKED */}
                {!isEditing && (
                    <div className="rd-mark-card">
                        <div>
                            <h3>Cooked this recently?</h3>
                            <p>Keep your memory timeline updated.</p>
                        </div>

                        <button className="rd-mark-btn" onClick={handleMarkAsCooked}>
                            <span className="material-symbols-outlined">check_circle</span>
                            Mark as Cooked Today
                        </button>
                    </div>
                )}

                {/* SHARE */}
                {!isEditing && (
                    <div className="rd-share">
                        <button
                            className="rd-share-btn"
                            onClick={handleShareWhatsApp}
                        >
                            Share on WhatsApp
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}
