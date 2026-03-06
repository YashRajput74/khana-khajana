import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { RecipesProvider, useRecipes } from "./context/RecipesContext";
import "./App.css";
import HomePage from "./newPages/HomePage";
import WelcomeBack from "./newPages/WelcomeBack";
import Onboarding from "./newPages/Onboarding";
import RecipeProfile from "./newPages/RecipeProfile";
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

    const { user, authLoaded, diet, setDietPreference, setCuisinePreferences, setTastePreferences } = useRecipes();
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
                    user || diet
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
                    diet
                        ? (
                            <CuisineSelect
                                onNext={(cuisines) => {
                                    setCuisinePreferences(cuisines);
                                    navigate("/onboarding/taste");
                                }}
                                onSkip={() => navigate("/onboarding/taste")}
                            />
                        )
                        : <Navigate to="/onboarding" replace />
                }
            />

            <Route
                path="/onboarding/taste"
                element={
                    diet
                        ? (
                            <TasteProfile
                                onFinish={(tastes) => {
                                    setTastePreferences(tastes);
                                    navigate("/");
                                }}
                                onSkip={() => navigate("/")}
                            />
                        )
                        : <Navigate to="/onboarding" replace />
                }
            />

            <Route
                path="/"
                element={
                    user || diet
                        ? <HomePage />
                        : <Navigate to="/onboarding" replace />
                }
            />

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