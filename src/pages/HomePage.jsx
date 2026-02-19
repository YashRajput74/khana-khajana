import "../styles/HomePage.css";
import { APP_NAME } from "../config/appconfig";
import BottomNav from "../components/BottomNav";
import { mockRecipes, mockPlanner, mockUser } from "../data/mockData";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const filledDays = mockPlanner.reduce((acc, item, index) => {
    if (item.recipeId) {
        const recipe = mockRecipes[item.recipeId];
        acc[index] = {
            image: recipe?.image || null,
            label: recipe?.title || "Unknown Recipe",
        };
    }
    return acc;
}, {});

const recentlyCooked = Object.values(mockRecipes)
    .filter(recipe => recipe.lastCookedAt)
    .sort((a, b) => new Date(b.lastCookedAt) - new Date(a.lastCookedAt))
    .slice(0, 3);

export default function HomePage() {
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
                        You've saved 14 dishes so far.
                    </div>

                    <button className="mp-profile-btn">
                        <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIlOrpchfBuUZifLzjj72wZn-oH0lht3FCGx_rdps_n8wK9CQWGd6NBUOszn1rSmgxjI3qRVI54NcyEG8619qBpz3YOOai7vwk-gWMghYPdnaBZnMxRO8sFii9cZIQh1KO5vo6v7ft-SycjMDGutk0Iy6s4lnYiPffso2dmYvWeKFaFgHnW09IwYftdc3p8OgoBuQI2rPhUsNHaYjd6mrraV5qeQCpvwco6mPqRHv75SB0HOBxJQpw3UkM0cG5Fpt9hYB3YVJZVQ"
                            alt="profile"
                        />
                    </button>
                </div>
            </header>

            <main className="mp-main">

                <div className="mp-intro">
                    <h1>Good Evening</h1>
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
                            <input placeholder="Something quick and spicy..." />
                            <button>
                                <span className="material-symbols-outlined">
                                    auto_fix_high
                                </span>
                                Suggest a Dish
                            </button>
                        </div>
                    </div>
                </div>

                <section className="mp-quick-add">
                    <h3>Quick Add Recipe</h3>
                    <div className="mp-quick-box">
                        <span className="material-symbols-outlined">add_circle</span>
                        <input placeholder="Paste a URL or type a recipe name..." />
                        <button>Save</button>
                    </div>
                </section>

                <div className="mp-grid">

                    <div className="mp-recent">
                        <div className="mp-section-header">
                            <h3>Recently Cooked</h3>
                            <button>View All</button>
                        </div>

                        {recentlyCooked.map((item, index) => (
                            <div key={index} className="mp-recent-card">
                                <div>
                                    <h4>{item.title}</h4>
                                    <p>Last cooked: {new Date(item.lastCookedAt).toLocaleDateString()}</p>
                                </div>
                                <span className="material-symbols-outlined">refresh</span>
                            </div>
                        ))}
                    </div>

                    <div className="mp-week">
                        <div className="mp-section-header">
                            <h3>This Week</h3>
                            <button>Full Planner</button>
                        </div>

                        <div className="mp-week-grid">
                            {daysOfWeek.map((day, i) => (
                                <div key={i} className="mp-day">
                                    <span className={i === 1 ? "mp-day-active" : ""}>
                                        {day}
                                    </span>

                                    <div className={`mp-day-box ${filledDays[i] ? "mp-day-filled" : ""}`}>
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

            <BottomNav />

        </div>
    );
};