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
        markAsCooked, updateRecipe
    } = useRecipes();

    const recipe = recipes[id];

    const [form, setForm] = useState({
        title: recipe?.title || "",
        description: recipe?.description || "",
        category: recipe?.category || "",
        cookingTime: recipe?.cookingTime || "",
        tags: recipe?.tags || [],
        steps: recipe?.steps || [],
        ingredients: recipe?.ingredients || []
    });

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
                <p>Recipe not found</p>
            </div>
        );
    }

    const ingredients = recipe.ingredients || [];
    const steps = recipe.steps || [];
    const handleSave = async () => {

        await updateRecipe(id, {
            title: form.title,
            category: form.category,
            cookingTime: form.cookingTime,
            steps: form.steps,
            ingredients: form.ingredients,
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
            steps: [
                ...prev.steps,
                { title: "", text: "" }
            ]
        }));
    };
    return (
        <div className="recipe-page">

            <header className="recipe-page-header">

                <div className="recipe-page-header-left">

                    <button
                        className="recipe-page-back"
                        onClick={() => navigate(-1)}
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
                            {recipe.isFavorite ? "favorite" : "favorite_border"}
                        </span>
                    </button>

                    <button>
                        <span className="material-symbols-outlined">
                            share
                        </span>
                    </button>

                </div>

            </header>


            <main className="recipe-page-main">
                <section className="recipe-page-hero">

                    <div className="recipe-page-image">

                        <img
                            src={recipe.image}
                            alt={recipe.title}
                        />

                    </div>

                    <div className="recipe-page-info">

                        <div className="recipe-page-badges">

                            {recipe.isFavorite && (
                                <span className="recipe-page-repeat">
                                    Repeat-Safe
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
                                        onClick={() => navigate(`/recipes/${id}`)}
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

                        <section>

                            <h3>Quick Stats</h3>

                            <div className="recipe-page-stats">

                                <div>
                                    <span>Prep</span>
                                    <strong>{recipe.prepTime || "—"}</strong>
                                </div>

                                <div>
                                    <span>Cook</span>
                                    <strong>{recipe.cookingTime || "—"}</strong>
                                </div>

                                <div className="full">
                                    <span>Calories</span>
                                    <strong>{recipe.calories || "—"}</strong>
                                </div>

                            </div>

                        </section>
                        <section className="recipe-page-ingredients">

                            <div className="recipe-page-ing-header">
                                <h3>Ingredients</h3>
                                <span>Serves {recipe.servings || 2}</span>
                            </div>

                            <ul>

                                {(isEditing ? form.ingredients : ingredients).map((i, index) => (

                                    <li key={index}>

                                        {isEditing ? (
                                            <>
                                                <input
                                                    value={i.qty || ""}
                                                    placeholder="Qty"
                                                    onChange={(e) => {
                                                        const updated = [...form.ingredients];
                                                        updated[index].qty = e.target.value;

                                                        setForm(prev => ({
                                                            ...prev,
                                                            ingredients: updated
                                                        }));
                                                    }}
                                                />

                                                <input
                                                    value={i.name || ""}
                                                    placeholder="Ingredient"
                                                    onChange={(e) => {
                                                        const updated = [...form.ingredients];
                                                        updated[index].name = e.target.value;

                                                        setForm(prev => ({
                                                            ...prev,
                                                            ingredients: updated
                                                        }));
                                                    }}
                                                />
                                            </>
                                        ) : (
                                            <>
                                                <span className="qty">{i.qty}</span> {i.name}
                                            </>
                                        )}

                                    </li>

                                ))}

                            </ul>
                            {isEditing && (
                                <button onClick={addIngredient}>
                                    Add Ingredient
                                </button>
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

                                    <div>

                                        {isEditing ? (
                                            <input
                                                value={s.title || ""}
                                                placeholder="Step title"
                                                onChange={(e) => {
                                                    const updated = [...form.steps];
                                                    updated[index].title = e.target.value;

                                                    setForm(prev => ({
                                                        ...prev,
                                                        steps: updated
                                                    }));
                                                }}
                                            />
                                        ) : (
                                            <h4>{s.title}</h4>
                                        )}

                                        {isEditing ? (
                                            <textarea
                                                value={s.text}
                                                onChange={(e) => {
                                                    const updated = [...form.steps];
                                                    updated[index].text = e.target.value;
                                                    setForm(prev => ({ ...prev, steps: updated }));
                                                }}
                                            />
                                        ) : (
                                            <p>{s.text}</p>
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

                        <section className="recipe-page-journal">

                            <h3>Cook's Journal</h3>

                            {(recipe.notes || []).map((note, i) => (

                                <div
                                    className="recipe-page-note"
                                    key={i}
                                >

                                    <p>
                                        "{note.text}"
                                    </p>

                                    <span>
                                        — Added {new Date(note.date).toLocaleDateString()}
                                    </span>

                                </div>

                            ))}
                        </section>

                    </div>

                </div>

            </main>

        </div>
    );
}