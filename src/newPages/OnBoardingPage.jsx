import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OnBoardingPage() {
    const [preference, setPreference] = useState(null);
    const navigate = useNavigate();

    const handleContinue = async () => {
        if (!preference) return;

        // TODO: Save preference to backend
        console.log("Selected:", preference);

        navigate("/dashboard");
    };

    return (
        <div className="min-h-screen bg-background-dark text-white font-sans flex flex-col">

            {/* Header */}
            <header className="w-full pt-8 pb-4 flex justify-center items-center">
                <div className="flex items-center gap-2 opacity-90">
                    <span className="material-symbols-outlined text-primary text-2xl">
                        restaurant_menu
                    </span>
                    <span className="text-primary font-bold uppercase text-sm tracking-tight">
                        Khana Khazana
                    </span>
                </div>
            </header>

            <main className="flex-grow flex flex-col items-center justify-center px-6 py-10 gap-16">

                <h3 className="text-2xl md:text-3xl font-light text-center text-white/90">
                    First, what's your preference?
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">

                    {/* Veg */}
                    <div
                        onClick={() => setPreference("veg")}
                        className={`cursor-pointer rounded-2xl p-8 h-64 flex flex-col items-center justify-center border transition-all duration-300
              ${preference === "veg"
                                ? "border-green-500 bg-white/5"
                                : "border-white/10 hover:border-white/30"}
            `}
                    >
                        <div className="w-16 h-16 rounded-full bg-green-900/30 flex items-center justify-center mb-6 text-green-400">
                            <span className="material-symbols-outlined text-3xl">
                                eco
                            </span>
                        </div>
                        <h4 className="text-xl font-medium mb-2">
                            Pure Vegetarian
                        </h4>
                        <p className="text-text-secondary-dark text-sm text-center">
                            Plant-based delights tailored to your taste.
                        </p>
                    </div>

                    {/* Non Veg */}
                    <div
                        onClick={() => setPreference("non-veg")}
                        className={`cursor-pointer rounded-2xl p-8 h-64 flex flex-col items-center justify-center border transition-all duration-300
              ${preference === "non-veg"
                                ? "border-red-500 bg-white/5"
                                : "border-white/10 hover:border-white/30"}
            `}
                    >
                        <div className="w-16 h-16 rounded-full bg-red-900/30 flex items-center justify-center mb-6 text-red-400">
                            <span className="material-symbols-outlined text-3xl">
                                set_meal
                            </span>
                        </div>
                        <h4 className="text-xl font-medium mb-2">
                            Non-Vegetarian
                        </h4>
                        <p className="text-text-secondary-dark text-sm text-center">
                            Rich meat dishes and varied protein options.
                        </p>
                    </div>
                </div>

                <button
                    onClick={handleContinue}
                    disabled={!preference}
                    className="mt-12 px-10 py-3 rounded-full bg-primary hover:bg-primary-light text-black font-semibold text-sm transition-all duration-300 disabled:opacity-40"
                >
                    Continue →
                </button>

            </main>

            <footer className="py-6 text-center text-xs text-text-secondary-dark/50">
                © Khana Khazana AI Assistant
            </footer>
        </div>
    );
}