import { useState } from "react";
import "./TasteProfile.css";
import { APP_NAME } from "../config/appconfig";

export default function TasteProfile({ onFinish, onSkip }) {

    const options = [
        { name: "Chinese", icon: "ramen_dining" },
        { name: "Italian", icon: "local_pizza" },
        { name: "Mexican", icon: "tapas" },
        { name: "Spicy", icon: "local_fire_department" },
        { name: "Continental", icon: "restaurant" },
        { name: "Desserts", icon: "icecream" },
        { name: "North Indian", icon: "rice_bowl" },
        { name: "Seafood", icon: "set_meal" },
        { name: "Healthy", icon: "spa" },
        { name: "Street Food", icon: "fastfood" },
        { name: "Thai", icon: "soup_kitchen" },
        { name: "Bakery", icon: "bakery_dining" },
        { name: "Breakfast", icon: "egg_alt" },
        { name: "Vegan", icon: "eco" }
    ];

    const [selected, setSelected] = useState([]);

    const toggle = (name) => {
        if (selected.includes(name)) {
            setSelected(selected.filter(x => x !== name));
        } else {
            setSelected([...selected, name]);
        }
    };

    const handleFinish = () => {
        if (onFinish) onFinish(selected);
    };

    return (
        <div className="kk-taste">

            {/* HEADER */}

            <header className="kk-taste-header">

                <div className="kk-taste-logo">
                    {APP_NAME}
                </div>
            </header>


            {/* TITLE */}

            <div className="kk-taste-title">

                <div className="kk-taste-icon-circle">
                    <span className="material-symbols-outlined">
                        restaurant_menu
                    </span>
                </div>

                <h1>
                    What else excites your palate?
                </h1>

                <p>
                    Tell us your cravings. We'll fine-tune the AI
                    to suggest exactly what you're in the mood for.
                </p>

            </div>


            {/* OPTIONS */}

            <div className="kk-taste-options">

                {options.map(opt => (

                    <button
                        key={opt.name}
                        onClick={() => toggle(opt.name)}
                        className={`kk-taste-pill ${selected.includes(opt.name)
                                ? "kk-taste-pill-active"
                                : ""
                            }`}
                    >

                        <span className="material-symbols-outlined">
                            {opt.icon}
                        </span>

                        {opt.name}

                    </button>

                ))}

            </div>


            {/* FOOTER */}

            <div className="kk-taste-footer">

                <button
                    className="kk-taste-build"
                    onClick={handleFinish}
                >
                    Build my Kitchen AI

                    <span className="material-symbols-outlined">
                        arrow_forward
                    </span>

                </button>

                <button
                    className="kk-taste-skip"
                    onClick={onSkip}
                >
                    Skip for now
                </button>

            </div>

        </div>
    );
}