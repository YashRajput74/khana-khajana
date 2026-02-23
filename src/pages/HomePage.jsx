import "../styles/HomePage.css";
import { APP_NAME } from "../config/appconfig";
import BottomNav from "../components/BottomNav";
import { useRecipes } from "../context/RecipesContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import RecipeSavedModal from "../components/RecipeSavedModal";
import RecipeDetailsModal from "../components/RecipeDetailsModal";
import ProfileModal from "../components/ProfileModal";
import AISuggestModal from "../components/AISuggestModal";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const defaultAvatar = "https://lh3.googleusercontent.com/aida-public/AB6AXuADBoucU7wCKnOfXrC3UYZHGLEJo-waF7NaNvPO-EPu1tq1zGzO6uT7NDzW8P1HWLoFvDEQW35vAZw0DoEnJekloQQW0iPf2GQ-LVXApe_pfvZbPPcgViKJu6EqPe9QcC6Q3Ea5nxUoQDmiy4tcZVkGuOVPeJghJl-xnFjW7cLO3QpuwCDYTgBypJ9EpWIn9Nz3bxJmmCHwAb7wrbJWWdq75QGzkxg1WNKZK704emNTHDNYhI3LzTcXBuWwvLZ-dyvOwozYdo33gw";

export default function HomePage() {
    const {
        user,
        planner,
        recipes,
        recentlyCooked,
        totalSaved,
        addRecipe,
        suggestMeal,
        addToPlanner
    } = useRecipes();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [newRecipeTitle, setNewRecipeTitle] = useState("");
    const [createdRecipeId, setCreatedRecipeId] = useState(null);
    const [detailsModalId, setDetailsModalId] = useState(null);
    const [aiQuery, setAiQuery] = useState("");
    const [aiSuggestion, setAiSuggestion] = useState(null);
    const [isAiModalOpen, setIsAiModalOpen] = useState(false);
    const [isLoadingAI, setIsLoadingAI] = useState(false);
    const [excludedIds, setExcludedIds] = useState([]);
    const [showProfile, setShowProfile] = useState(false);

    const handleSuggest = async () => {

        if (!aiQuery.trim()) return;

        setIsLoadingAI(true);

        const result = await suggestMeal(aiQuery, excludedIds);

        setIsLoadingAI(false);

        if (result) {
            setAiSuggestion(result);
            setIsAiModalOpen(true);

            setExcludedIds(prev => [...prev, result.recipeId]);
        }
    };

    const filledDays = (planner || []).reduce((acc, item, index) => {
        if (item.recipeId && recipes[item.recipeId]) {
            const recipe = recipes[item.recipeId];
            acc[index] = {
                image: recipe.image || null,
                label: recipe.title
            };
        }
        return acc;
    }, {});

    const hour = new Date().getHours();
    let greeting = "Good Evening";

    if (hour < 12) greeting = "Good Morning";
    else if (hour < 18) greeting = "Good Afternoon";

    return (
        <div className="mp-page">

            <header className="mp-header">
                <div className="mp-logo">
                    <span className="material-symbols-outlined rv-logo">
                        local_dining
                    </span>
                    <span className="mp-logo-text">{APP_NAME}</span>
                </div>

                <div className="mp-header-right">
                    <div className="mp-saved-box">
                        <span className="material-symbols-outlined">inventory_2</span>
                        You've saved {totalSaved} dishes so far.
                    </div>

                    <button className="mp-profile-btn" onClick={() => setShowProfile(true)}>
                        <img src={user?.avatar || defaultAvatar} />
                    </button>
                </div>
            </header>

            <main className="mp-main">

                <div className="mp-intro">
                    <h1>{greeting}</h1>
                    <p>Cook is asking again? Let’s decide in 10 seconds.</p>
                </div>

                <div className="mp-ai-card">
                    <div className="mp-ai-bg-top"></div>
                    <div className="mp-ai-bg-bottom"></div>

                    <div className="mp-ai-content">
                        <div className="mp-ai-badge">
                            <span className="material-symbols-outlined">colors_spark</span>
                            AI Assistant
                        </div>

                        <h2>What should we cook today?</h2>

                        <div className="mp-search-box">
                            <input
                                placeholder="Something quick and spicy..."
                                value={aiQuery}
                                onChange={(e) => setAiQuery(e.target.value)}
                            />
                            <button onClick={handleSuggest} disabled={isLoadingAI}>
                                <span className="material-symbols-outlined">
                                    auto_fix_high
                                </span>
                                {isLoadingAI ? "Thinking..." : "Suggest a Dish"}
                            </button>
                        </div>
                    </div>
                </div>

                <section className="mp-quick-add">
                    <h3>Quick Add Recipe</h3>
                    <div className="mp-quick-box">
                        <span className="material-symbols-outlined">add_circle</span>
                        <input
                            placeholder="Paste a URL or type a recipe name..."
                            value={newRecipeTitle}
                            onChange={(e) => setNewRecipeTitle(e.target.value)}
                        />
                        <button
                            onClick={async () => {
                                if (!newRecipeTitle.trim()) return;
                                if (!user) {
                                    openAuthModal();
                                    return;
                                }
                                const newId = await addRecipe(newRecipeTitle);

                                if (newId) {
                                    setCreatedRecipeId(newId);
                                    setShowModal(true);
                                    setNewRecipeTitle("");
                                }
                            }}
                        >
                            Save
                        </button>
                    </div>
                </section>

                <div className="mp-grid">

                    <div className="mp-recent">
                        <div className="mp-section-header">
                            <h3>Recently Cooked</h3>
                            <button onClick={() => navigate("/recipes?filter=Recent")}>
                                View All
                            </button>
                        </div>

                        {recentlyCooked.slice(0, 3).map((item) => (
                            <div
                                key={item.id}
                                className="mp-recent-card"
                                onClick={() => navigate(`/recipes/${item.id}`)}
                                style={{ cursor: "pointer" }}
                            >
                                <div>
                                    <h4>{item.title}</h4>
                                    <p>Last cooked: {new Date(item.lastCookedAt).toLocaleDateString()}</p>
                                </div>
                                {/* <span className="material-symbols-outlined">refresh</span> */}
                            </div>
                        ))}
                    </div>

                    <div className="mp-week">
                        <div className="mp-section-header">
                            <h3>This Week</h3>
                            <button onClick={() => navigate("/planner")}>
                                Full Planner
                            </button>
                        </div>

                        <div className="mp-week-grid">
                            {daysOfWeek.map((day, i) => (
                                <div key={i} className="mp-day">
                                    <span className={i === 1 ? "mp-day-active" : ""}>
                                        {day}
                                    </span>

                                    <div className={`mp-day-box ${filledDays[i] ? "mp-day-filled" : ""}`} onClick={() =>
                                        navigate(`/recipes?selectDate=${planner[i]?.date}`)
                                    }
                                        style={{ cursor: "pointer" }}>
                                        {filledDays[i] ? (
                                            <>
                                                <img src={filledDays[i].image} alt="" />
                                                {filledDays[i].label && (
                                                    <span className="mp-day-label">{filledDays[i].label}</span>
                                                )}
                                            </>
                                        ) : (
                                            <span className="material-symbols-outlined">add</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </main>

            {showModal && (
                <RecipeSavedModal
                    recipeTitle={newRecipeTitle}
                    onAddDetails={() => {
                        setShowModal(false);
                        setDetailsModalId(createdRecipeId);
                    }}
                    onClose={() => {
                        setShowModal(false);
                        setNewRecipeTitle("");
                    }}
                />
            )}

            {detailsModalId && (
                <RecipeDetailsModal
                    recipeId={detailsModalId}
                    onClose={() => setDetailsModalId(null)}
                />
            )}
            <AISuggestModal
                isOpen={isAiModalOpen}
                suggestion={aiSuggestion}
                onClose={() => {
                    setIsAiModalOpen(false);
                    setExcludedIds([]);
                }}
                onAssignToday={() => {
                    const today = new Date().toISOString().split("T")[0];

                    if (aiSuggestion?.recipeId) {
                        addToPlanner(today, aiSuggestion.recipeId);
                    }

                    setIsAiModalOpen(false);
                }}
                onTryAgain={() => handleSuggest(aiQuery)}
            />
            {showProfile && (
                <ProfileModal onClose={() => setShowProfile(false)} />
            )}
            <BottomNav />

        </div>
    );
};