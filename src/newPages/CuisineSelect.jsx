import { useState } from "react";
import "./CuisineSelect.css";

export default function CuisineSelect({ onNext }) {

    const cuisines = [
        { name: "North Indian", icon: "flatware" },
        { name: "South Indian", icon: "rice_bowl" },
        { name: "Rajasthani", icon: "landscape" },
        { name: "Bengali", icon: "set_meal" },
        { name: "Gujarati", icon: "spa" },
        { name: "Maharashtrian", icon: "temple_hindu" },
        { name: "Mughlai", icon: "restaurant_menu" },
        { name: "Kashmiri", icon: "ac_unit" }
    ];

    const [selected, setSelected] = useState([]);

    const toggleCuisine = (name) => {
        if (selected.includes(name)) {
            setSelected(selected.filter(c => c !== name));
        } else {
            setSelected([...selected, name]);
        }
    };

    const handleNext = () => {
        console.log("Selected cuisines:", selected);
        if (onNext) onNext(selected);
    };

    return (
        <div className="kk-root">

            {/* HEADER */}

            <header className="kk-root-header">

                <div className="kk-root-logo">
                    Khana Khazana
                </div>

                {/* <div className="kk-root-progress">
                    <span></span>
                    <span className="kk-root-progress-active"></span>
                    <span></span>
                </div> */}

                <button className="kk-root-skip">
                    Skip
                </button>

            </header>


            {/* TITLE */}

            <div className="kk-root-title">

                <h1>Where do your cravings come from?</h1>

                <p>Select the culinary roots that feel like home.</p>

            </div>


            {/* GRID */}

            <div className="kk-root-grid">

                {cuisines.map((c) => (

                    <div
                        key={c.name}
                        className={`kk-root-card ${selected.includes(c.name) ? "kk-root-card-selected" : ""
                            }`}
                        onClick={() => toggleCuisine(c.name)}
                    >

                        <span className="material-symbols-outlined kk-root-icon">
                            {c.icon}
                        </span>

                        <h3>{c.name}</h3>

                    </div>

                ))}

            </div>


            {/* FOOTER */}

            <footer className="kk-root-footer">

                <button
                    className="kk-root-next"
                    onClick={handleNext}
                >
                    Next
                </button>

                <p>
                    You can always change this later in settings
                </p>

            </footer>

        </div>
    );
}