import "./RecipeProfile.css";
import { useRecipes } from "../context/RecipesContext";
import { useParams, useNavigate } from "react-router-dom";

export default function RecipeProfile() {

    const { id } = useParams();
    const navigate = useNavigate();

    const {
        recipes,
        toggleFavorite,
        markAsCooked
    } = useRecipes();

    const recipe = recipes[id];

    if (!recipe) {
        return (
            <div className="recipe-page">
                <p>Recipe not found</p>
            </div>
        );
    }

    const ingredients = recipe.ingredients || [];
    const steps = recipe.steps || [];

    return (
        <div className="recipe-page">

            {/* HEADER */}

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

                {/* HERO */}

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

                        <h1>{recipe.title}</h1>

                        <p className="recipe-page-desc">
                            {recipe.description || "A delicious homemade dish."}
                        </p>

                        <div className="recipe-page-buttons">

                            <button
                                className="recipe-page-cook"
                                onClick={() => markAsCooked(id)}
                            >
                                Cook Now
                            </button>

                            <button className="recipe-page-edit">
                                Edit
                            </button>

                        </div>

                    </div>

                </section>


                {/* GRID */}

                <div className="recipe-page-grid">

                    {/* LEFT */}

                    <div className="recipe-page-left">

                        {/* STATS */}

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


                        {/* INGREDIENTS */}

                        <section className="recipe-page-ingredients">

                            <div className="recipe-page-ing-header">
                                <h3>Ingredients</h3>
                                <span>Serves {recipe.servings || 2}</span>
                            </div>

                            <ul>

                                {ingredients.map((i, index) => (
                                    <li key={index}>
                                        <span className="qty">
                                            {i.qty}
                                        </span>
                                        {" "}
                                        {i.name}
                                    </li>
                                ))}

                            </ul>

                        </section>

                    </div>


                    {/* RIGHT */}

                    <div className="recipe-page-right">

                        {/* STEPS */}

                        <section>

                            <h3>Preparation Steps</h3>

                            {steps.map((s, index) => (

                                <div
                                    className="recipe-page-step"
                                    key={index}
                                >

                                    <div className="recipe-page-step-num">
                                        {index + 1}
                                    </div>

                                    <div>

                                        <h4>
                                            {s.title}
                                        </h4>

                                        <p>
                                            {s.text}
                                        </p>

                                    </div>

                                </div>

                            ))}

                        </section>


                        {/* JOURNAL */}

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