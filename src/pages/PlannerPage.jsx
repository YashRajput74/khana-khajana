import "../styles/PlannerPage.css";
import BottomNav from "../components/BottomNav";
import { APP_NAME } from "../config/appconfig";
import { useRecipes } from "../context/RecipesContext";
import { useNavigate } from "react-router-dom";
import ProfileModal from "../components/ProfileModal";
import { useState } from "react";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const defaultAvatar = "https://lh3.googleusercontent.com/aida-public/AB6AXuADBoucU7wCKnOfXrC3UYZHGLEJo-waF7NaNvPO-EPu1tq1zGzO6uT7NDzW8P1HWLoFvDEQW35vAZw0DoEnJekloQQW0iPf2GQ-LVXApe_pfvZbPPcgViKJu6EqPe9QcC6Q3Ea5nxUoQDmiy4tcZVkGuOVPeJghJl-xnFjW7cLO3QpuwCDYTgBypJ9EpWIn9Nz3bxJmmCHwAb7wrbJWWdq75QGzkxg1WNKZK704emNTHDNYhI3LzTcXBuWwvLZ-dyvOwozYdo33gw";
function getStartOfWeek(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = (day === 0 ? -6 : 1) - day;
    d.setDate(d.getDate() + diff);
    d.setHours(0, 0, 0, 0);
    return d;
}

export default function PlannerPage() {
    const { planner, recipes, user } = useRecipes();
    const [showProfile, setShowProfile] = useState(false);
    const navigate = useNavigate();
    const [weekOffset, setWeekOffset] = useState(0);

    const today = new Date();
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const baseStartOfWeek = getStartOfWeek(today);

    const startOfWeek = new Date(baseStartOfWeek);
    startOfWeek.setDate(baseStartOfWeek.getDate() + weekOffset * 7);


    const plannerData = Array.from({ length: 7 }).map((_, index) => {
        const dateObj = new Date(startOfWeek);
        dateObj.setDate(startOfWeek.getDate() + index);

        const isoDate = dateObj.toISOString().split("T")[0];

        const plannerItem = planner.find(p => p.date === isoDate);
        const recipe = plannerItem?.recipeId
            ? recipes[plannerItem.recipeId]
            : null;

        const isPast = dateObj < todayStart;

        return {
            day: daysOfWeek[index],
            isoDate,
            isToday: dateObj.toDateString() === today.toDateString(),
            isPast,
            date: dateObj.toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
            }),
            meal: recipe
                ? {
                    id: plannerItem.recipeId,
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

                <div className="pp-avatar" onClick={() => setShowProfile(true)}
                    style={{ cursor: "pointer" }}>
                    <img src={user?.avatar || defaultAvatar} alt={user?.name} />
                </div>
            </header>

            <main className="pp-main">
                {/* Title */}
                <div className="pp-top">
                    <h1>Weekly Planner</h1>
                    <div className="pp-week-nav">
                        <button
                            onClick={() => {
                                if (weekOffset > 0) {
                                    setWeekOffset(prev => prev - 1);
                                }
                            }}
                            disabled={weekOffset === 0}
                        >
                            <span className="material-symbols-outlined">chevron_left</span>
                        </button>

                        <span>
                            {plannerData[0]?.date} – {plannerData[6]?.date}
                        </span>

                        <button
                            onClick={() => setWeekOffset(prev => prev + 1)}
                        >
                            <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                    </div>
                </div>

                {/* Days */}
                <div className="pp-days">
                    {plannerData.map((item, index) => {
                        return (
                            <div key={index} className={`pp-day-card ${item.isToday ? "pp-today" : ""}`}>
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

                                        <button
                                            className="pp-edit-btn"
                                            disabled={item.isPast}
                                            onClick={() => {
                                                if (!item.isPast) {
                                                    navigate(`/recipes?selectDate=${item.isoDate}`);
                                                }
                                            }}
                                        >
                                            <span className="material-symbols-outlined">edit</span>
                                        </button>
                                    </div>
                                ) : (
                                    <div
                                        className={`pp-empty ${item.isPast ? "pp-disabled" : ""}`}
                                        onClick={() => {
                                            if (!item.isPast) {
                                                navigate(`/recipes?selectDate=${item.isoDate}`);
                                            }
                                        }}
                                        style={{ cursor: item.isPast ? "not-allowed" : "pointer" }}
                                    >
                                        <span className="material-symbols-outlined">add</span>
                                        <span>Add dish</span>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </main>
            {showProfile && (
                <ProfileModal onClose={() => setShowProfile(false)} />
            )}
            <BottomNav />
        </div>
    );
}
