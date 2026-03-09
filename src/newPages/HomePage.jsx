import "./HomePage.css";
import { useRecipes } from "../context/RecipesContext";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APP_NAME } from "../config/appconfig";
import ProfileDropdown from "../components/ProfileDropDown";

const dishes = [
    {
        id: "paneer-butter-masala",
        title: "Paneer Butter Masala",
        desc: "Rich creamy gravy with soft paneer cubes.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAe0iVWSKEZ-GE2ewFL-maWJ8TPyqeQAH2Mzm7OOnhsBXtqJnW4Eu_Dr9GF_DHKHwN1sQY7R4h3-ian5ZjBNzAJL9wIu0UxNg0ov09EALn5V-FzKT8AOP-c4b2IpsrrQrx5bxiu1mmZLDoU5cyb125QvnV0hCloFbujX_YJd-t-3T-8U7HBjtnxKAYL0JeIL0DfslOBTKYmnhIZxzYvLRi1Iuyo7CXJNSdOuXXaQfzJo_mvUFJ-FyZLIhQM4vWOqZz1MpFfpS5Zn9k"
    },
    {
        id: "aloo-gobi",
        title: "Aloo Gobi Dry",
        desc: "Comfort food for lunch.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAc4vRS_qZTAqUUMyNMLjtUxetkQTaoGQCzV3V-OY1RPDSqJdxmwVXvILNss3e88R3_A4WVdyrw-uCYZsrFZCYkOR7DmCp6H0ssa3ey0niGIKKmDG8s8aTorpsima1No3LNwKzNmPGoVrq_n5AESS2IECLLQrZpMpYY7V8MkEvtGzSEWL19ozS_ND2GF4KafD5K8kD1GfVFn457KOH4QaSudy-8qcnR-1kGoOEjDS2xs18e0x3w4XdQOUvl9kEKGn2t2w78NqOxiYk"
    },
    {
        id: "hyderabadi-veg-biryani",
        title: "Hyderabadi Veg Biryani",
        desc: "Weekend Special",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPP217iCXKw29XABMLwjh-e79Y1MrSZD7E55fn7aNl4t5z7bTuZ848fRhLLbAPLh0PZ2o6IBaOfKWReY7dMPqzJT7TFOvlW2sCgaVWOO82EVdQKjAnnS5UN5cLVD1wtZq51sAhze5VRhIcTfDWIqWzEuk6sZr28rH5iSS1hiOlJRdtSXvSKJaj6I1Owb44mxLbf4d4MQxLVyt9qQnN28O2kAGlG1NJHNoUvdZC-rcEf7buCVZNa6Gfl9OYL-38ZvT9ODxz1h3Fu-c"
    },
    {
        id: "samosa-chaat",
        title: "Samosa Chaat",
        desc: "Evening snack idea.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDeNCo9Mo42TBAXn-1bA76K3Io1FJ3wAnzxg7S1cuZ_973AW_hG44tLaFRiQpZ4L6UJbPry4CnfMDIbi19gpRu7QNtmIQvA4oG2PLZmHH_I6TCLSGbUbnQZWtv00ZS0IcCEbzqxqqz4xa5WA_x3GMQuRbkxoYjoXiGa4mmueBne6w1B2DMj5FVF_9DZTotLuonGrgkqYTvAZEm4Tbw7W0gpe_l3WLLKinLbl7tg2q11HWOZZdGPiEoY0accU2-vXjeC4juyx-PUuPA"
    },
    {
        id: "dal-makhni",
        title: "Dal Makhani",
        desc: "Slow cooked black lentils.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAN1Tmkz2AbOQVkaeV8_bwDqOSNJ9glhqldxYVeGIf3jRGJzMwikdEO3IfKr4GCIWOYUTnspZzO7-Hd8sMg8zI57LCwRfHy66ss9lchGMCdThtNaow3QBnJtnLwmCmUpFKKjkWs1TM4MSN0rbLDHB-qWMcdh10VrevYiSBO0fYcOMMwOG8OZ4vL1s1cw6LBcqFE3aJHRwOcvdC0m9zufVbH2FCteuIhdYtQBABCo-6J_X6mBLSbwrmdRdzJtg4Hn5niA89127aL13A"
    },
    {
        id: "malai-kofta",
        title: "Malai Kofta",
        desc: "Festive dinner option.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpdi46YtNeFrgKsXy3TVGQfwdGCsCOI3aeotAOdDRYWKoW2LbwGktzlfjh0UlPg7KCn0dn6OCTq6ZjSjPJ9jUcbUo5DGxX0lZIklUrTj0tMvIT0ychOBN1aZzlkvokZsaNuQ0NRcXsIInpXL3jVZDobSsZgtX-J8z4XjcoaLbZ-BtrXU5eWb18U6cXwqtzHub6WfVn-cQqisMJwoEL1kiptxqxVr3yhMcNkChzkT1RqNGkfalq649BWcrqSMie1O2-eQZxXpEXcZM"
    },
    {
        id: "palak-paneer",
        title: "Palak Paneer",
        desc: "Healthy",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBisNL31wXja84sEXRrupJ-CQoscoECZGBeLtVFNG80wP-54SJjYIg7sPYdgd5MvZmJJy_8cQCk6sg1WkcU0hqwqKnd-SBNZFvD4gjQCKGTACQ3NwAHWRTPhAR6smNkNmd0evKT7ACbxBX_5ooVNH0t7LlEjpA1OhtKaOw1BxdYP6t8nR2NQHn8xnPALVnFtsj0YVMXtkDWVf3iqAbe0t0b-CttljuvdbwqGK7UYVTGZVjg0Ey60D57pzfy3YnVIvU7wARVzh7aLfE"
    }
];
export default function HomePage() {

    const {
        recipesArray,
        safeRepeats,
        suggestions,
        fetchSuggestions,
        addRecipe,
        user
    } = useRecipes();
    const navigate = useNavigate();

    const [isListening, setIsListening] = useState(false);
    const [aiQuery, setAiQuery] = useState("");
    const [isLoadingAI, setIsLoadingAI] = useState(false);
    const [activeTab, setActiveTab] = useState("ai");
    const [creatingRecipe, setCreatingRecipe] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const handleSuggest = async (query) => {
        const finalQuery = query || aiQuery;
        if (!finalQuery.trim()) return;

        setIsLoadingAI(true);

        const result = await fetchSuggestions(finalQuery, []);

        setIsLoadingAI(false);

        if (!result) return;

        if (result.type === "open_recipe") {
            navigate(`/recipes/${result.recipeId}`);
            return;
        }

        if (result.type === "create_recipe") {
            navigate(`/recipes/${result.recipeId}?edit=true`);
            return;
        }

        if (result.type === "message") {
            setAiQuery(result.text);
            return;
        }
    };
    let aiDishes = [];

    if (suggestions.length) {
        aiDishes = suggestions;
    } else if (recipesArray.length) {
        aiDishes = recipesArray;
    } else {
        aiDishes = dishes;
    }

    const startListening = () => {
        if (!user) {
            navigate("/login");
            return;
        }

        if (!("webkitSpeechRecognition" in window)) {
            alert("Speech recognition not supported in this browser.");
            return;
        }

        const recognition = new window.webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "en-IN";

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setAiQuery(transcript);
            handleSuggest(transcript);
        };

        recognition.start();
    };

    const forgotten = useMemo(() => {
        return recipesArray.filter(r => !r.lastCookedAt);
    }, [recipesArray]);

    let visibleDishes = [];

    if (activeTab === "ai") {
        visibleDishes = aiDishes;
    }

    if (activeTab === "safe") {
        visibleDishes = safeRepeats;
    }

    if (activeTab === "forgotten") {
        visibleDishes = forgotten;
    }

    return (

        <div className="kh-home">

            <header className="kh-home-header">

                <h1 className="kh-home-logo">
                    {APP_NAME}
                </h1>

                <img
                    className="kh-home-avatar"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmCD_ipAkdv8HKf-8F6aPCxkbc48anMUoTEIuCMo2bQVP4grzNLj6tJ6PzFp7m4JxpNW66CZatxEcsVi9ijg8TO1IKmTWr9F7Z9yxO1QTuU-nAHF7MH-eB2Youk1pPkgVqco3fVO9oR6thv9iJu4I8lLz-ZP0WtW-i76dE-4uUy1tEOvUKTakRo6-E1Kfrso4EawnaAT_P7kMSROYW6Z5D-22E1DkgPRAVSjGtkeyywTG8cabiAwTYPqduh5fX2zTHa0Nap0CI6-M"
                    alt="profile"
                    onClick={() => {
                        if (!user) {
                            navigate("/login");
                            return;
                        }

                        setShowProfileMenu(prev => !prev);
                    }}
                />

            </header>


            <section className="kh-home-hero">

                <button
                    className={`kh-home-mic ${isListening ? "listening" : ""}`}
                    onClick={startListening}
                >
                    <span className="material-icons-round">
                        mic
                    </span>
                </button>

                <h2>
                    User's Kitchen AI
                </h2>

                <p className="kh-home-listening">
                    {
                        isListening
                            ? "Listening..."
                            : aiQuery
                                ? `You asked: "${aiQuery}"`
                                : "Tap to ask 'Something spicy'"
                    }
                </p>

                <button
                    className="kh-home-edit"
                    onClick={() => handleSuggest()}
                    disabled={isLoadingAI}
                >

                    {isLoadingAI ? "Thinking..." : "Suggest Dish"}

                </button>

            </section>


            <nav className="kh-home-tabs">

                <span
                    className={activeTab === "ai" ? "active" : ""}
                    onClick={() => setActiveTab("ai")}
                >
                    Suggested By AI
                </span>

                <span
                    className={activeTab === "safe" ? "active" : ""}
                    onClick={() => setActiveTab("safe")}
                >
                    Safe Repeats
                </span>

                <span
                    className={activeTab === "forgotten" ? "active" : ""}
                    onClick={() => setActiveTab("forgotten")}
                >
                    Forgotten
                </span>

            </nav>


            <section className="kh-home-grid">

                {visibleDishes.length === 0 ? (

                    <div className="kh-home-empty">
                        Nothing here yet
                    </div>

                ) : (

                    visibleDishes.map((dish, i) => (

                        <div key={dish.id || i} className="kh-home-card" onClick={() => navigate(`/recipes/${dish.id}`)}>

                            <img src={dish.image} alt={dish.title} />

                            <div className="kh-home-overlay">
                                <h3>{dish.title}</h3>
                                <p>{dish?.tags?.join(", ")}</p>
                            </div>

                        </div>

                    ))

                )}

            </section>


            <button
                className="kh-home-add"
                disabled={creatingRecipe}
                onClick={async () => {

                    if (creatingRecipe) return;

                    if (!user) {
                        navigate("/login");
                        return;
                    }

                    setCreatingRecipe(true);

                    const newId = await addRecipe("New Recipe");

                    if (newId) {
                        navigate(`/recipes/${newId}?edit=true`);
                    }

                    setCreatingRecipe(false);
                }}
            >
                <span className="material-icons-round">
                    {creatingRecipe ? "hourglass_top" : "add"}
                </span>
            </button>
            <ProfileDropdown
                open={showProfileMenu}
                onClose={() => setShowProfileMenu(false)}
            />
        </div>
    );
}