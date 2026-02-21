import "../styles/FavoritesPage.css";
import BottomNav from "../components/BottomNav";
import { APP_NAME } from "../config/appconfig";
import { useRecipes } from "../context/RecipesContext";
import { useNavigate } from "react-router-dom";

const defaultAvatar = "https://lh3.googleusercontent.com/aida-public/AB6AXuADBoucU7wCKnOfXrC3UYZHGLEJo-waF7NaNvPO-EPu1tq1zGzO6uT7NDzW8P1HWLoFvDEQW35vAZw0DoEnJekloQQW0iPf2GQ-LVXApe_pfvZbPPcgViKJu6EqPe9QcC6Q3Ea5nxUoQDmiy4tcZVkGuOVPeJghJl-xnFjW7cLO3QpuwCDYTgBypJ9EpWIn9Nz3bxJmmCHwAb7wrbJWWdq75QGzkxg1WNKZK704emNTHDNYhI3LzTcXBuWwvLZ-dyvOwozYdo33gw";

function formatLastCooked(lastCookedAt) {
    if (!lastCookedAt) return "Never cooked";

    const now = new Date();
    const cookedDate = new Date(lastCookedAt);
    const diffTime = now - cookedDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Last cooked today";
    if (diffDays === 1) return "Last cooked yesterday";
    if (diffDays < 7) return `Last cooked ${diffDays} days ago`;
    if (diffDays < 30) return `Last cooked ${Math.floor(diffDays / 7)} weeks ago`;
    return `Last cooked ${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? "s" : ""} ago`;
}

export default function FavoritesPage() {
    const { favorites, recipes, toggleFavorite, user } = useRecipes();
    const navigate = useNavigate();

    const sortedFavorites = [...favorites].sort(
        (a, b) => new Date(b.lastCookedAt) - new Date(a.lastCookedAt)
    );

    return (
        <div className="fp-page">

            <header className="fp-nav">
                <div className="fp-nav-left">
                    <span className="material-symbols-outlined fp-logo">local_dining</span>
                    <span>{APP_NAME}</span>
                </div>

                <div className="fp-nav-right">
                    <div className="fp-search">
                        <span className="material-symbols-outlined">search</span>
                        <input placeholder="Search recipes..." />
                    </div>

                    <div
                        className="fp-avatar"
                        style={{ backgroundImage: `url(${user?.avatar || defaultAvatar})` }}
                    ></div>
                </div>
            </header>

            <main className="fp-main">
                <h1>Favorites</h1>
                <p className="fp-subtitle">Your most loved and reliable dishes.</p>

                <div className="fp-list">
                    {sortedFavorites.map((recipe) => {
                        const recipeId = Object.keys(recipes).find(
                            key => recipes[key] === recipe
                        );

                        return (
                            <div key={recipeId} className="fp-card">


                                <div
                                    className="fp-card-text"
                                    onClick={() => navigate(`/recipes/${recipeId}`)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <h3>{recipe.title}</h3>
                                    <div className="fp-meta">
                                        <span className="material-symbols-outlined">schedule</span>
                                        <span>{formatLastCooked(recipe.lastCookedAt)}</span>
                                    </div>
                                </div>

                                <div className="fp-card-right">
                                    <button
                                        className="fp-star"
                                        onClick={() => toggleFavorite(recipeId)}
                                    >
                                        <span className="material-symbols-outlined">star</span>
                                    </button>

                                    {recipe.image ? (
                                        <div
                                            className="fp-image"
                                            style={{ backgroundImage: `url(${recipe.image})` }}
                                        ></div>
                                    ) : (
                                        <div className="fp-image fp-placeholder">
                                            <span className="material-symbols-outlined text-gray-400 dark:text-gray-600 text-2xl">
                                                restaurant
                                            </span>
                                        </div>
                                    )}
                                </div>

                            </div>
                        )
                    })}
                </div>
            </main>

            <BottomNav />
        </div>
    );
}
