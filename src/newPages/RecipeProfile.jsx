import "./RecipeProfile.css";
import { useRecipes } from "../context/RecipesContext";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function RecipeProfile() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const isEditing = searchParams.get("edit") === "true";
    const {
        recipes,
        toggleFavorite,
        markAsCooked,
        updateRecipe,
        deleteRecipe,
        toggleSafeRepeat
    } = useRecipes();

    const [form, setForm] = useState({
        title: "",
        description: "",
        category: "",
        cookingTime: "",
        tags: [],
        steps: [],
        ingredients: []
    });
    const [newTag, setNewTag] = useState("");
    const recipe = recipes[id];
    const isNewRecipe = isEditing && recipe?.title === "New Recipe";
    useEffect(() => {
        if (recipe) {
            setForm({
                title: recipe.title || "",
                description: recipe.description || "",
                category: recipe.category || "",
                cookingTime: recipe.cookingTime || "",
                tags: recipe.tags || [],
                steps: recipe.steps || [],
                ingredients: recipe.ingredients || []
            });
        }
    }, [recipe]);
    if (!recipe) {
        return (
            <div className="recipe-page">
                <p>Loading recipe...</p>
            </div>
        );
    }

    const steps = recipe.steps || [];
    const shareRecipe = () => {
        const url = `${window.location.origin}/recipes/${id}`;

        const whatsappUrl =
            `https://wa.me/?text=${encodeURIComponent(
                `Check out this recipe: ${recipe.title} 🍲 ${url}`
            )}`;

        window.open(whatsappUrl, "_blank");
    };

    const addTag = (tag) => {
        if (!tag.trim()) return;

        setForm(prev => ({
            ...prev,
            tags: [...prev.tags, tag.trim()]
        }));
    };

    const removeTag = (index) => {
        setForm(prev => ({
            ...prev,
            tags: prev.tags.filter((_, i) => i !== index)
        }));
    };

    const handleSave = async () => {

        await updateRecipe(id, {
            title: form.title,
            category: form.category,
            cookingTime: form.cookingTime,
            steps: form.steps,
            tags: form.tags
        });

        navigate(`/recipes/${id}`);
    };

    const addIngredient = () => {
        setForm(prev => ({
            ...prev,
            ingredients: [
                ...prev.ingredients,
                { qty: "", name: "" }
            ]
        }));
    };

    const addStep = () => {
        setForm(prev => ({
            ...prev,
            steps: [...prev.steps, ""]
        }));
    };
    return (
        <div className="recipe-page">

            <header className="recipe-page-header">

                <div className="recipe-page-header-left">

                    <button
                        className="recipe-page-back"
                        onClick={async () => {

                            if (isNewRecipe) {
                                await deleteRecipe(id);
                                navigate("/");
                                return;
                            }

                            navigate("/");
                        }}
                    >
                        <span className="material-symbols-outlined">
                            arrow_back
                        </span>
                    </button>

                    <span className="recipe-page-label">
                        Recipe Profile
                    </span>

                </div>

                <div className="recipe-page-actions">

                    <button
                        onClick={() => toggleFavorite(id)}
                    >
                        <span className="material-symbols-outlined">
                            {recipe.isFavorite ? "favorite" : "heart_minus"}
                        </span>
                    </button>

                    <button onClick={() => toggleSafeRepeat(id)}>
                        <span className="material-symbols-outlined">
                            {recipe.isSafeRepeat ? "verified" : "verified_off"}
                        </span>
                    </button>

                    <button>
                        <span className="material-symbols-outlined" onClick={shareRecipe}>
                            share
                        </span>
                    </button>

                </div>

            </header>


            <main className="recipe-page-main">
                <section className="recipe-page-hero">

                    <div className="recipe-page-image">

                        <img
                            src={recipe.image ? recipe.image : "/dummy_image.png"}
                            alt={recipe.title}
                        />

                    </div>

                    <div className="recipe-page-info">

                        <div className="recipe-page-badges">

                            {recipe.isSafeRepeat && (
                                <span className="recipe-page-repeat">
                                    Repeat-Safe
                                </span>
                            )}
                            {recipe.isFavorite && (
                                <span className="recipe-page-repeat">
                                    Favorite
                                </span>
                            )}
                            {recipe.lastCookedAt && (
                                <span className="recipe-page-history">
                                    Last cooked{" "}
                                    {new Date(recipe.lastCookedAt).toLocaleDateString()}
                                </span>
                            )}

                        </div>

                        {isEditing ? (
                            <input
                                className="recipe-edit-title"
                                value={form.title}
                                onChange={(e) =>
                                    setForm(prev => ({ ...prev, title: e.target.value }))
                                }
                            />
                        ) : (
                            <h1>{recipe.title}</h1>
                        )}

                        <p className="recipe-page-desc">
                            {recipe.description || "A delicious homemade dish."}
                        </p>

                        <div className="recipe-page-buttons">

                            {isEditing ? (
                                <>
                                    <button className="recipe-page-save" onClick={handleSave}>
                                        Save
                                    </button>

                                    <button
                                        className="recipe-page-cancel"
                                        onClick={async () => {

                                            if (isNewRecipe) {
                                                await deleteRecipe(id);
                                                navigate("/");
                                                return;
                                            }

                                            navigate(`/`);
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        className="recipe-page-cook"
                                        onClick={() => markAsCooked(id)}
                                    >
                                        Cook Now
                                    </button>

                                    <button
                                        className="recipe-page-edit"
                                        onClick={() => navigate(`/recipes/${id}?edit=true`)}
                                    >
                                        Edit
                                    </button>
                                </>
                            )}

                        </div>

                    </div>

                </section>

                <div className="recipe-page-grid">
                    <div className="recipe-page-left">
                        <section className="recipe-page-tags">

                            <h3>Tags</h3>

                            <div className="recipe-page-tags-container">

                                {(isEditing ? form.tags : recipe.tags || []).map((tag, index) => (

                                    <span key={index} className="recipe-page-tag">

                                        {tag}

                                        {isEditing && (
                                            <button
                                                className="recipe-page-tag-remove"
                                                onClick={() => removeTag(index)}
                                            >
                                                ×
                                            </button>
                                        )}

                                    </span>

                                ))}

                            </div>

                            {isEditing && (
                                <div className="recipe-page-tag-input">

                                    <input
                                        value={newTag}
                                        placeholder="Add tag..."
                                        onChange={(e) => setNewTag(e.target.value)}
                                    />

                                    <button
                                        onClick={() => {
                                            addTag(newTag);
                                            setNewTag("");
                                        }}
                                    >
                                        Add
                                    </button>

                                </div>
                            )}

                        </section>
                    </div>
                    <div className="recipe-page-right">

                        <section>

                            <h3>Preparation Steps</h3>
                            {isEditing && form.steps.length === 0 && (
                                <p>Start adding preparation steps.</p>
                            )}
                            {(isEditing ? form.steps : steps).map((s, index) => (

                                <div
                                    className="recipe-page-step"
                                    key={index}
                                >

                                    <div className="recipe-page-step-num">
                                        {index + 1}
                                    </div>

                                    <div className="recipe-page-flexing">

                                        {isEditing ? (
                                            <input
                                                value={s || ""}
                                                onChange={(e) => {
                                                    const updated = [...form.steps];
                                                    updated[index] = e.target.value;
                                                    setForm(prev => ({ ...prev, steps: updated }));
                                                }}
                                            />
                                        ) : (
                                            <>
                                                <h4 className="recipe-page-steper">{s}</h4>
                                            </>
                                        )}
                                    </div>

                                </div>

                            ))}
                            {isEditing && (
                                <button onClick={addStep}>
                                    Add Step
                                </button>
                            )}

                        </section>

                    </div>

                </div>

            </main>

        </div>
    );
}