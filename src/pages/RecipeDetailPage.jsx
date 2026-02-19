import "../styles/RecipeDetailPage.css";
import { useParams, useNavigate } from "react-router-dom";
import { useRecipes } from "../context/RecipesContext";

export default function RecipeDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { recipes, setRecipes, favorites, setFavorites } = useRecipes();

    const recipe = recipes[id];

    if (!recipe) {
        return (
            <div className="rd-page">
                <p>Recipe not found.</p>
                <button onClick={() => navigate(-1)}>Go Back</button>
            </div>
        );
    }

    const lastCookedText = recipe.lastCookedAt
        ? `Last cooked ${Math.floor((new Date() - new Date(recipe.lastCookedAt)) / (1000 * 60 * 60 * 24))} days ago`
        : "Never cooked";

    const handleMarkAsCooked = () => {
        const updated = { ...recipe, lastCookedAt: new Date().toISOString() };
        setRecipes(prev => ({ ...prev, [id]: updated }));
    };

    const toggleFavorite = () => {
        const updated = { ...recipe, isFavorite: !recipe.isFavorite };
        setRecipes(prev => ({ ...prev, [id]: updated }));

        if (!recipe.isFavorite) setFavorites([...favorites, id]);
        else setFavorites(favorites.filter(fid => fid !== id));
    };

    return (
        <div className="rd-page">

            {/* HEADER */}
            <header className="rd-header">
                <button className="rd-back" onClick={() => navigate(-1)}>
                    <span className="material-symbols-outlined">arrow_back</span>
                    <span>Back</span>
                </button>

                <button className="rd-edit" onClick={toggleFavorite}>
                    {recipe.isFavorite ? "★ Favorite" : "☆ Favorite"}
                </button>
            </header>

            <main className="rd-main">

                {/* TITLE */}
                <div className="rd-title-section">
                    <h1>{recipe.title}</h1>

                    <div className="rd-meta">
                        <span className="material-symbols-outlined">history</span>
                        <span>{lastCookedText}</span>
                        <div className="rd-dot" />
                        <span>Added on {new Date(recipe.addedAt).toLocaleDateString()}</span>
                    </div>
                </div>

                {/* IMAGE */}
                {recipe.image && (
                    <div className="rd-image-wrapper">
                        <img src={recipe.image} alt={recipe.title} />
                    </div>
                )}

                {/* TAGS */}
                <div className="rd-tags">
                    {recipe.tags?.map((tag, i) => (
                        <div key={i} className="rd-tag">
                            <span className="material-symbols-outlined">
                                {tag === "Spicy" ? "local_fire_department" : tag === "Quick" ? "timer" : "soup_kitchen"}
                            </span>
                            {tag}
                        </div>
                    ))}
                </div>

                {/* STEPS */}
                <div className="rd-steps">
                    <div className="rd-steps-header">
                        <h2>Cooking Steps</h2>
                        <span>{recipe.steps?.length || 0} steps</span>
                    </div>

                    {recipe.steps?.map((step, index) => (
                        <div key={index} className="rd-step">
                            <div className="rd-step-number">{index + 1}</div>
                            <p>{step}</p>
                        </div>
                    ))}
                </div>

                {/* MARK AS COOKED */}
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

                {/* SHARE */}
                <div className="rd-share">
                    <button className="rd-share-btn">
                        Share on WhatsApp
                    </button>
                </div>

            </main>
        </div>
    );
}
