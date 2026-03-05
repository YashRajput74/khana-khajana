import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import HomePage from "./newPages/HomePage";
import WelcomeBack from "./newPages/WelcomeBack";
import Onboarding from "./newPages/Onboarding";
import RecipeProfile from "./newPages/RecipeProfile";
import { RecipesProvider, useRecipes } from "./context/RecipesContext";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import CuisineSelect from "./newPages/CuisineSelect";
import TasteProfile from "./newPages/TasteProfile";

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, [pathname]);

    return null;
}

function AppRoutes() {

    const { user, authLoaded, setDietPreference, setCuisinePreferences, setTastePreferences } = useRecipes();
    const navigate = useNavigate();

    if (!authLoaded) return null;

    return (
        <Routes>

            <Route
                path="/login"
                element={
                    user
                        ? <Navigate to="/" replace />
                        : <WelcomeBack />
                }
            />

            <Route
                path="/onboarding"
                element={
                    user
                        ? <Navigate to="/" replace />
                        : (
                            <Onboarding
                                onLogin={() => navigate("/login")}
                                onContinue={(diet) => {
                                    setDietPreference(diet);
                                    navigate("/onboarding/cuisine");
                                }}
                            />
                        )
                }
            />

            <Route
                path="/onboarding/cuisine"
                element={
                    <CuisineSelect
                        onNext={(cuisines) => {
                            setCuisinePreferences(cuisines);
                            navigate("/onboarding/taste");
                        }}
                        onSkip={() => navigate("/onboarding/taste")}
                    />
                }
            />

            <Route
                path="/onboarding/taste"
                element={
                    <TasteProfile
                        onFinish={(tastes) => {
                            setTastePreferences(tastes);
                            navigate("/");
                        }}
                        onSkip={() => navigate("/")}
                    />
                }
            />

            <Route path="/" element={<HomePage />} />

            {/* ADD THIS */}
            <Route path="/recipes/:id" element={<RecipeProfile />} />

        </Routes>
    );
}

export default function App() {
    return (
        <RecipesProvider>
            <Router>
                <ScrollToTop />
                <AppRoutes />
            </Router>
        </RecipesProvider>
    );
}