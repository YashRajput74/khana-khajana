import { useState } from "react";
import "./Onboarding.css";

export default function Onboarding({ onLogin }) {
    const [diet, setDiet] = useState("");

    const handleContinue = () => {
        if (!diet) {
            alert("Please select your preference");
            return;
        }

        console.log("Selected:", diet);
    };

    return (
        <div className="onboarding">

            {/* Header */}
            <header className="onb-header">
                <div className="onb-logo">
                    <span className="material-symbols-outlined logo-icon">
                        restaurant_menu
                    </span>
                    <span className="logo-text">Khana Khazana</span>
                </div>
            </header>

            {/* Main */}
            <main className="onb-main">

                {/* Login Card */}
                <section className="onb-login-section">
                    <button className="onb-login-card" onClick={onLogin}>

                        <h2>Welcome back</h2>

                        <p>
                            Log in to access your saved recipes and meal plans.
                        </p>
                    </button>
                </section>

                <div className="onb-divider"></div>

                {/* Preference */}
                <section className="onb-pref-section">

                    <h3 className="onb-title">
                        First time here, tell us what's your preference?
                    </h3>

                    <div className="onb-options">

                        {/* Veg */}
                        <div
                            className={`onb-card ${diet === "veg" ? "veg-active" : ""}`}
                            onClick={() => setDiet("veg")}
                        >
                            <div className="icon veg-icon">
                                <span className="material-symbols-outlined">
                                    eco
                                </span>
                            </div>

                            <h4>Pure Vegetarian</h4>

                            <p>
                                Plant-based delights tailored to your taste.
                            </p>

                            {diet === "veg" && (
                                <span className="check material-symbols-outlined">
                                    check
                                </span>
                            )}
                        </div>

                        {/* Non Veg */}
                        <div
                            className={`onb-card ${diet === "nonveg" ? "nonveg-active" : ""}`}
                            onClick={() => setDiet("nonveg")}
                        >
                            <div className="icon nonveg-icon">
                                <span className="material-symbols-outlined">
                                    set_meal
                                </span>
                            </div>

                            <h4>Non-Vegetarian</h4>

                            <p>
                                Rich meat dishes and varied protein options.
                            </p>

                            {diet === "nonveg" && (
                                <span className="check material-symbols-outlined">
                                    check
                                </span>
                            )}
                        </div>

                    </div>

                    <button className="onb-continue" onClick={handleContinue}>
                        Continue
                        <span className="material-symbols-outlined">
                            arrow_forward
                        </span>
                    </button>

                </section>

            </main>

            {/* Footer */}
            <footer className="onb-footer">
                © Khana Khazana AI Assistant
            </footer>

        </div>
    );
}