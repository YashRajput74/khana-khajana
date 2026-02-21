import BottomNav from "../components/BottomNav";
import { APP_NAME } from "../config/appconfig";
import "../styles/RecipePage.css";
import { useRecipes } from "../context/RecipesContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useMemo } from "react";
import RecipeSavedModal from "../components/RecipeSavedModal";
import RecipeDetailsModal from "../components/RecipeDetailsModal";
import AddRecipeModal from "../components/AddRecipeModal";

function getTimeAgo(dateString) {
    const diffMs = new Date() - new Date(dateString);
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? "s" : ""} ago`;
    return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? "s" : ""} ago`;
}

const defaultAvatar= "https://lh3.googleusercontent.com/aida-public/AB6AXuADBoucU7wCKnOfXrC3UYZHGLEJo-waF7NaNvPO-EPu1tq1zGzO6uT7NDzW8P1HWLoFvDEQW35vAZw0DoEnJekloQQW0iPf2GQ-LVXApe_pfvZbPPcgViKJu6EqPe9QcC6Q3Ea5nxUoQDmiy4tcZVkGuOVPeJghJl-xnFjW7cLO3QpuwCDYTgBypJ9EpWIn9Nz3bxJmmCHwAb7wrbJWWdq75QGzkxg1WNKZK704emNTHDNYhI3LzTcXBuWwvLZ-dyvOwozYdo33gw";

export default function RecipesPage() {
    const {
        recipes,
        recipesArray,
        toggleFavorite,
        user,
        planner,
        addToPlanner
    } = useRecipes();

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const filterFromURL = searchParams.get("filter");
    const [activeFilter, setActiveFilter] = useState(filterFromURL || "All");
    const [searchTerm, setSearchTerm] = useState("");
    const selectedDate = searchParams.get("selectDate");
    const { addRecipe } = useRecipes();

    const [showSavedModal, setShowSavedModal] = useState(false);
    const [detailsModalId, setDetailsModalId] = useState(null);
    const [newRecipeTitle, setNewRecipeTitle] = useState("");
    const [createdRecipeId, setCreatedRecipeId] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);

    const handleAddToPlanner = (recipeId) => {
        const existingDay = planner.find(day => day.date === selectedDate);
        if (!existingDay) return;

        addToPlanner(selectedDate, recipeId);
        navigate("/planner");
    };
    const filteredRecipes = useMemo(() => {
        let filtered = [...recipesArray];

        if (activeFilter === "Favorites") {
            filtered = filtered.filter(recipe => recipe.isFavorite);
        } else if (activeFilter === "Recent") {
            filtered = filtered
                .filter(recipe => recipe.lastCookedAt)
                .sort((a, b) =>
                    new Date(b.lastCookedAt) -
                    new Date(a.lastCookedAt)
                );
        } else {
            filtered = filtered.sort((a, b) =>
                new Date(b.addedAt) -
                new Date(a.addedAt)
            );
        }

        // SEARCH
        if (searchTerm.trim()) {
            filtered = filtered.filter(recipe =>
                recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                recipe.tags.some(tag =>
                    tag.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }

        return filtered;
    }, [recipesArray, activeFilter, searchTerm]);

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
                        <img src={user?.avatar || defaultAvatar} alt={user?.name} />
                    </div>
                </div>
            </header>

            <main className="rv-main">
                <h1>Your Recipes</h1>
                <p className="rv-subtitle">Rediscover your culinary journey.</p>

                {/* SEARCH */}
                <div className="rv-search">
                    <span className="material-symbols-outlined">search</span>
                    <input
                        placeholder="Search dishes or tags..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button>
                        <span className="material-symbols-outlined">tune</span>
                    </button>
                </div>

                {/* FILTER */}
                <div className="rv-filter">
                    <button
                        className={activeFilter === "All" ? "rv-filter-active" : ""}
                        onClick={() => setActiveFilter("All")}
                    >
                        All
                    </button>

                    <button
                        className={activeFilter === "Recent" ? "rv-filter-active" : ""}
                        onClick={() => setActiveFilter("Recent")}
                    >
                        Recent
                    </button>

                    <button
                        className={activeFilter === "Favorites" ? "rv-filter-active" : ""}
                        onClick={() => setActiveFilter("Favorites")}
                    >
                        Favorites
                    </button>
                </div>

                {/* CARDS */}
                <div className="rv-cards">
                    {filteredRecipes.length === 0 ? (
                        <div className="rv-empty">
                            <p>No recipes found.</p>
                        </div>
                    ) : (
                        filteredRecipes.map((item) => (
                            <article key={item.id} className="rv-card">

                                <div
                                    className="rv-card-left"
                                    onClick={() => {
                                        if (selectedDate) {
                                            handleAddToPlanner(item.id);
                                        } else {
                                            navigate(`/recipes/${item.id}`);
                                        }
                                    }}
                                    style={{ cursor: "pointer" }}
                                >
                                    <div className="rv-card-img">
                                        {item.image ? (
                                            <img src={item.image} alt={item.title} />
                                        ) : (
                                            <span className="material-symbols-outlined">
                                                restaurant
                                            </span>
                                        )}
                                    </div>

                                    <div className="rv-card-text">
                                        <h3>{item.title}</h3>
                                        <div className="rv-card-meta">
                                            <span className="material-symbols-outlined">history</span>
                                            <span>
                                                {item.lastCookedAt
                                                    ? getTimeAgo(item.lastCookedAt)
                                                    : "Never cooked"}
                                            </span>
                                            <span className="rv-dot"></span>
                                            <span className="rv-tag">{item.category}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="rv-card-actions">
                                    <button
                                        className={`rv-fav-btn ${item.isFavorite ? "active" : ""}`}
                                        onClick={() => toggleFavorite(item.id)}
                                    >
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
                        ))
                    )}
                </div>
            </main>

            <button
                className="rv-fab"
                onClick={() => setShowAddModal(true)}
            >
                <span className="material-symbols-outlined">add</span>
            </button>

            {showAddModal && (
                <AddRecipeModal
                    onClose={() => setShowAddModal(false)}
                    onSave={async (title) => {
                        const newId = await addRecipe(title);
                        if (!newId) return;

                        setCreatedRecipeId(newId);
                        setNewRecipeTitle(title);
                        setShowAddModal(false);
                        setShowSavedModal(true);
                    }}
                />
            )}

            {showSavedModal && (
                <RecipeSavedModal
                    recipeTitle={newRecipeTitle}
                    onAddDetails={() => {
                        setShowSavedModal(false);
                        setDetailsModalId(createdRecipeId);
                    }}
                    onClose={() => setShowSavedModal(false)}
                />
            )}

            {detailsModalId && (
                <RecipeDetailsModal
                    recipeId={detailsModalId}
                    onClose={() => setDetailsModalId(null)}
                />
            )}

            <BottomNav />
        </div>
    );
}
