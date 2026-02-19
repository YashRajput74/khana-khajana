import "../styles/PlannerPage.css";
import BottomNav from "../components/BottomNav";
import { APP_NAME } from "../config/appconfig";
import { useRecipes } from "../context/RecipesContext";
import { useNavigate } from "react-router-dom";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function PlannerPage() {
    const { planner, recipes, user } = useRecipes();
    const navigate = useNavigate();

    const plannerData = planner.map((item, index) => {
        const recipe = item.recipeId ? recipes[item.recipeId] : null;

        return {
            day: daysOfWeek[index],
            date: new Date(item.date).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
            }),
            meal: recipe
                ? {
                    id: item.recipeId,
                    title: recipe.title,
                    info: recipe.cookingTime
                        ? `${recipe.cookingTime} min • ${recipe.tags?.[0] || ""}`
                        : "",
                    image: recipe.image || null,
                    icon: "restaurant",
                }
                : null,
        };
    });

    return (
        <div className="pp-page">
            {/* HEADER */}
            <header className="pp-header">
                <div className="pp-logo">
                    <div className="pp-logo-icon">
                        <span className="material-symbols-outlined">local_dining</span>
                    </div>
                    <span>{APP_NAME}</span>
                </div>

                <div className="pp-avatar">
                    <img src={user.avatar} alt={user.name} />
                </div>
            </header>

            <main className="pp-main">
                {/* Title */}
                <div className="pp-top">
                    <h1>Weekly Planner</h1>
                    <div className="pp-week-nav">
                        <button>
                            <span className="material-symbols-outlined">chevron_left</span>
                        </button>
                        <span>{plannerData[0].date} – {plannerData[plannerData.length - 1].date}</span>
                        <button>
                            <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                    </div>
                </div>

                {/* Days */}
                <div className="pp-days">
                    {plannerData.map((item, index) => (
                        <div key={index} className="pp-day-card">
                            <div className="pp-day-info">
                                <span className="pp-day-name">{item.day}</span>
                                <span className="pp-day-date">{item.date}</span>
                            </div>

                            {item.meal ? (
                                <div className="pp-meal">
                                    <div
                                        className="pp-meal-left"
                                        onClick={() => navigate(`/recipes/${item.meal.id}`)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        {item.meal.image ? (
                                            <img src={item.meal.image} alt={item.meal.title} />
                                        ) : (
                                            <div className="pp-meal-icon">
                                                <span className="material-symbols-outlined text-gray-400 dark:text-gray-600 text-2xl">
                                                    {item.meal.icon}
                                                </span>
                                            </div>
                                        )}
                                        <div>
                                            <h3>{item.meal.title}</h3>
                                            <p>{item.meal.info}</p>
                                        </div>
                                    </div>

                                    <button className="pp-edit-btn">
                                        <span className="material-symbols-outlined">edit</span>
                                    </button>
                                </div>
                            ) : (
                                <div
                                    className="pp-empty"
                                    onClick={() => navigate("/recipes")}
                                    style={{ cursor: "pointer" }}
                                >
                                    <span className="material-symbols-outlined">add</span>
                                    <span>Add dish</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </main>

            <BottomNav />
        </div>
    );
}
