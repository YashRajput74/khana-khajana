import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TAGS = [
    "Chinese",
    "Italian",
    "Mexican",
    "Spicy",
    "Continental",
    "Desserts",
    "North Indian",
    "Seafood",
    "Healthy",
    "Street Food",
    "Thai",
    "Bakery",
    "Breakfast",
    "Vegan",
];

export default function OnBoardingStepThree() {
    const [selected, setSelected] = useState([]);
    const navigate = useNavigate();

    const toggleTag = (tag) => {
        setSelected((prev) =>
            prev.includes(tag)
                ? prev.filter((t) => t !== tag)
                : [...prev, tag]
        );
    };

    const handleSubmit = async () => {
        console.log("Final taste profile:", selected);

        // TODO: Save all onboarding data to backend
        navigate("/dashboard");
    };

    return (
        <div className="min-h-screen bg-background-dark text-white flex flex-col items-center justify-center relative overflow-hidden">

            {/* Header */}
            <header className="absolute top-0 w-full p-6 flex justify-between items-center">
                <span className="text-xl font-bold text-primary">
                    Khana Khazana
                </span>
                <span className="text-sm text-text-secondary-dark">
                    Step 3 of 3
                </span>
            </header>

            <main className="w-full max-w-4xl px-6 text-center">

                <div className="mb-10">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4">
                        What else excites your palate?
                    </h1>
                    <p className="text-text-secondary-dark text-lg max-w-lg mx-auto">
                        Tell us your cravings. We'll fine-tune the AI to suggest exactly what you're in the mood for.
                    </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">

                    {TAGS.map((tag) => {
                        const isSelected = selected.includes(tag);

                        return (
                            <button
                                key={tag}
                                onClick={() => toggleTag(tag)}
                                className={`
                  px-6 py-3 rounded-full border font-medium transition-all duration-300
                  ${isSelected
                                        ? "border-primary bg-primary/20 text-primary"
                                        : "border-white/10 text-gray-400 hover:border-primary/50 hover:text-white"
                                    }
                `}
                            >
                                {tag}
                                {isSelected && " ✓"}
                            </button>
                        );
                    })}

                </div>

                {/* Actions */}
                <div className="w-full max-w-sm mx-auto">
                    <button
                        onClick={handleSubmit}
                        disabled={selected.length === 0}
                        className="w-full py-4 bg-primary hover:bg-primary-dark text-black font-bold text-lg rounded-full transition-all duration-300 disabled:opacity-40"
                    >
                        Build my Kitchen AI →
                    </button>

                    <button
                        onClick={() => navigate("/dashboard")}
                        className="mt-4 text-sm text-text-secondary-dark hover:text-primary transition-colors"
                    >
                        Skip for now
                    </button>
                </div>

            </main>
        </div>
    );
}