import { useState } from "react";

export default function HomeTabs() {
    const [active, setActive] = useState("recent");

    const tabs = [
        { id: "recent", label: "Recently Made" },
        { id: "safe", label: "Safe Repeats" },
        { id: "forgotten", label: "Forgotten" },
    ];

    return (
        <nav className="flex justify-center gap-10 mb-8 border-b border-gray-800">

            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActive(tab.id)}
                    className={`pb-4 font-medium relative
            ${active === tab.id
                            ? "text-white"
                            : "text-text-secondary-dark"
                        }`}
                >
                    {tab.label}

                    {active === tab.id && (
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />
                    )}
                </button>
            ))}

        </nav>
    );
}