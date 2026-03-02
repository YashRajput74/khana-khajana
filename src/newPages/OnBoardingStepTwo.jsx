import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CUISINES = [
    "North Indian",
    "South Indian",
    "Rajasthani",
    "Bengali",
    "Gujarati",
    "Maharashtrian",
    "Mughlai",
    "Kashmiri",
];

export default function OnBoardingStepTwo() {
    const [selected, setSelected] = useState([]);
    const navigate = useNavigate();

    const toggleCuisine = (cuisine) => {
        setSelected((prev) =>
            prev.includes(cuisine)
                ? prev.filter((c) => c !== cuisine)
                : [...prev, cuisine]
        );
    };

    const handleNext = async () => {
        if (selected.length === 0) return;

        console.log("Selected cuisines:", selected);

        // TODO: Save to backend
        navigate("/dashboard");
    };

    return (
        <div className="min-h-screen bg-background-dark text-white flex flex-col">

            {/* Header */}
            <header className="w-full px-6 py-8 flex justify-between items-center">
                <span className="text-xl font-bold text-primary">
                    Khana Khazana
                </span>

                <button
                    onClick={() => navigate("/dashboard")}
                    className="text-sm text-text-secondary-dark hover:text-primary transition-colors"
                >
                    Skip
                </button>
            </header>

            {/* Main */}
            <main className="flex-grow px-6 flex flex-col items-center justify-center">

                <div className="text-center mb-12 max-w-2xl">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        Where do your cravings come from?
                    </h1>
                    <p className="text-text-secondary-dark text-lg font-light">
                        Select the culinary roots that feel like home.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl">

                    {CUISINES.map((cuisine) => {
                        const isSelected = selected.includes(cuisine);

                        return (
                            <div
                                key={cuisine}
                                onClick={() => toggleCuisine(cuisine)}
                                className={`
                  cursor-pointer rounded-2xl p-6 h-40
                  flex items-center justify-center text-center
                  border transition-all duration-300
                  ${isSelected
                                        ? "border-primary bg-primary/10"
                                        : "border-white/10 hover:border-white/30"
                                    }
                `}
                            >
                                <h3 className="font-medium">{cuisine}</h3>
                            </div>
                        );
                    })}

                </div>
            </main>

            {/* Footer */}
            <footer className="px-6 py-8 flex flex-col items-center">
                <button
                    onClick={handleNext}
                    disabled={selected.length === 0}
                    className="w-full max-w-md bg-primary hover:bg-primary-light text-black font-semibold py-4 rounded-xl transition-all duration-300 disabled:opacity-40"
                >
                    Next
                </button>

                <p className="mt-4 text-xs text-text-secondary-dark/60">
                    You can always change this later in settings
                </p>
            </footer>
        </div>
    );
}