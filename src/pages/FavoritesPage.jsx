import "../styles/FavoritesPage.css";
import BottomNav from "../components/BottomNav";
import { APP_NAME } from "../config/appconfig";
import { mockRecipes, mockUser } from "../data/mockData";

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

const favoritesData = Object.values(mockRecipes)
    .filter(recipe => recipe.isFavorite)
    .sort((a, b) => new Date(b.lastCookedAt) - new Date(a.lastCookedAt));

export default function FavoritesPage() {
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
                        style={{ backgroundImage: `url(${mockUser.avatar})` }}
                    ></div>
                </div>
            </header>

            <main className="fp-main">
                <h1>Favorites</h1>
                <p className="fp-subtitle">Your most loved and reliable dishes.</p>

                <div className="fp-list">
                    {favoritesData.map((recipe, index) => (
                        <div key={index} className="fp-card">

                            <div className="fp-card-text">
                                <h3>{recipe.title}</h3>
                                <div className="fp-meta">
                                    <span className="material-symbols-outlined">schedule</span>
                                    <span>{formatLastCooked(recipe.lastCookedAt)}</span>
                                </div>
                            </div>

                            <div className="fp-card-right">
                                <button className="fp-star">
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
                    ))}
                </div>
            </main>

            <BottomNav />
        </div>
    );
}
