import BottomNav from "../components/BottomNav";
import { APP_NAME } from "../config/appconfig";
import "../styles/PlannerPage.css";

const weekData = [
    {
        day: "Mon",
        date: "12 Feb",
        meal: {
            title: "Rustic Veggie Stew",
            info: "25 min • Healthy",
            image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuCb9sxeDpujnlP9vgt7UVEIuEqnrFzKxvG-gANa8FjtNjPw0dWlRUoj5XJK8Vtgmu8kQ-ZMiCe54jpQ2GnKLssVhn3l5G0T1l64tswnN68xgfAg_SVCHrbVb9_D-NI39aWdGF96mnbmweEDb-QqL8e40_CWVnY3NBwXUEOSNzQFLAmnSRDKNA0FZfbEXmh9WjyPcYWO5vtUAcTFiV3rcqpOv50Y6eMhXpaQxM3D93NGtkPUk-cBa-ElKIH4DSaVUY6Nfk8UwWxQeA",
        },
    },
    {
        day: "Tue",
        date: "13 Feb",
    },
    {
        day: "Wed",
        date: "14 Feb",
        meal: {
            title: "Avocado Super Bowl",
            info: "15 min • Fresh",
            image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuB8Cbce5OpoVcyyutosQePLnLsmMcnT7RCfb6FHllho8_CK4M_KBa0GaKPeX__A7d9znE1-f-1SzoLTANWVtOUiWwW_l0Ip9SzxNuo6-7nRadUwhwTrLRoaOet6FyJtjZweoqYsh9wJIhv6wxbPZiVdG9UxlZuZdxHN1noldNTbOtaskbEiVTWUgi4AoeXvy52pYbmxNpqBthBVnWUlxXCIr_cseum6WPRt9ABPLVHSriCGU5GWO30MzFAGnMqoQB7fFLRX-h2Gqw",
        },
    },
    {
        day: "Thu",
        date: "15 Feb",
    },
    {
        day: "Fri",
        date: "16 Feb",
    },
    {
        day: "Sat",
        date: "17 Feb",
        meal: {
            title: "Homemade Pizza",
            info: "Fun cooking",
            icon: "local_pizza",
        },
    },
    {
        day: "Sun",
        date: "18 Feb",
    },
];

export default function PlannerPage() {
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
                    <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIlOrpchfBuUZifLzjj72wZn-oH0lht3FCGx_rdps_n8wK9CQWGd6NBUOszn1rSmgxjI3qRVI54NcyEG8619qBpz3YOOai7vwk-gWMghYPdnaBZnMxRO8sFii9cZIQh1KO5vo6v7ft-SycjMDGutk0Iy6s4lnYiPffso2dmYvWeKFaFgHnW09IwYftdc3p8OgoBuQI2rPhUsNHaYjd6mrraV5qeQCpvwco6mPqRHv75SB0HOBxJQpw3UkM0cG5Fpt9hYB3YVJZVQ"
                        alt="profile"
                    />
                </div>
            </header>

            <main className="pp-main">

                {/* Title */}
                <div className="pp-top">
                    <h1>Weekly Planner</h1>

                    <div className="pp-week-nav">
                        <button>
                            <span className="material-symbols-outlined">
                                chevron_left
                            </span>
                        </button>
                        <span>12–18 Feb</span>
                        <button>
                            <span className="material-symbols-outlined">
                                chevron_right
                            </span>
                        </button>
                    </div>
                </div>

                {/* Days */}
                <div className="pp-days">
                    {weekData.map((item, index) => (
                        <div key={index} className="pp-day-card">

                            <div className="pp-day-info">
                                <span className="pp-day-name">{item.day}</span>
                                <span className="pp-day-date">{item.date}</span>
                            </div>

                            {item.meal ? (
                                <div className="pp-meal">
                                    <div className="pp-meal-left">
                                        {item.meal.image ? (
                                            <img
                                                src={item.meal.image}
                                                alt={item.meal.title}
                                            />
                                        ) : (
                                            <div className="pp-meal-icon">
                                                <span className="material-symbols-outlined">
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
                                        <span className="material-symbols-outlined">
                                            edit
                                        </span>
                                    </button>
                                </div>
                            ) : (
                                <div className="pp-empty">
                                    <span className="material-symbols-outlined">
                                        add
                                    </span>
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
