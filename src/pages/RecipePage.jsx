import BottomNav from "../components/BottomNav";
import { APP_NAME } from "../config/appconfig";
import "../styles/RecipePage.css";
import { useRecipes } from "../context/RecipesContext";
import { useNavigate } from "react-router-dom";

function getTimeAgo(dateString) {
    const diffMs = new Date() - new Date(dateString);
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? "s" : ""} ago`;
    return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? "s" : ""} ago`;
}

export default function RecipesPage() {
    const {
        recipes,
        recipesArray,
        toggleFavorite,
        user
    } = useRecipes();

    const navigate = useNavigate();

    const sortedRecipes = [...recipesArray].sort(
        (a, b) => new Date(b.addedAt) - new Date(a.addedAt)
    );

    return (
        <div className="rv-page">

            {/* HEADER */}
            <header className="rv-header">
                <div className="rv-header-left">
                    <span className="material-symbols-outlined rv-logo">
                        local_dining
                    </span>
                    <h2>{APP_NAME}</h2>
                </div>

                <div className="rv-header-right">
                    <button className="rv-icon-btn">
                        <span className="material-symbols-outlined">notifications</span>
                    </button>
                    <button className="rv-icon-btn">
                        <span className="material-symbols-outlined">settings</span>
                    </button>
                    <div className="rv-avatar">
                        <img src={user.avatar} alt={user.name} />
                    </div>
                </div>
            </header>

            <main className="rv-main">
                <h1>Your Recipes</h1>
                <p className="rv-subtitle">Rediscover your culinary journey.</p>

                {/* SEARCH */}
                <div className="rv-search">
                    <span className="material-symbols-outlined">search</span>
                    <input placeholder="Search dishes or tags..." />
                    <button>
                        <span className="material-symbols-outlined">tune</span>
                    </button>
                </div>

                {/* FILTER */}
                <div className="rv-filter">
                    <button>All</button>
                    <button className="rv-filter-active">Recent</button>
                    <button>Favorites</button>
                </div>

                {/* CARDS */}
                <div className="rv-cards">
                    {sortedRecipes.map((item) => {
                        const recipeId = Object.keys(recipes).find(
                            key => recipes[key] === item
                        );

                        return (
                            <article key={recipeId} className="rv-card">

                                <div
                                    className="rv-card-left"
                                    onClick={() => navigate(`/recipes/${recipeId}`)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <div className="rv-card-img">
                                        {item.image ? (
                                            <img src={item.image} alt={item.title} />
                                        ) : (
                                            <span className="material-symbols-outlined text-gray-400 dark:text-gray-600 text-2xl">
                                                restaurant
                                            </span>
                                        )}
                                    </div>
                                    <div className="rv-card-text">
                                        <h3>{item.title}</h3>
                                        <div className="rv-card-meta">
                                            <span className="material-symbols-outlined">history</span>
                                            <span>{getTimeAgo(item.lastCookedAt)}</span>
                                            <span className="rv-dot"></span>
                                            <span className="rv-tag">{item.category}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="rv-card-actions">
                                    <button onClick={() => toggleFavorite(recipeId)}>
                                        <span className="material-symbols-outlined">
                                            {item.isFavorite ? "star" : "star_outline"}
                                        </span>
                                    </button>
                                    <button>
                                        <span className="material-symbols-outlined">
                                            more_vert
                                        </span>
                                    </button>
                                </div>
                            </article>
                        )
                    })}
                </div>
            </main>

            {/* FLOATING BUTTON */}
            <button className="rv-fab">
                <span className="material-symbols-outlined">add</span>
            </button>

            <BottomNav />
        </div>
    );
}
