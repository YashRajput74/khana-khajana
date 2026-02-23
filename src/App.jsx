import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import HomePage from "./pages/HomePage";
import RecipePage from "./pages/RecipePage";
import PlannerPage from "./pages/PlannerPage";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import LoginPage from "./pages/LoginPage";
import { RecipesProvider, useRecipes } from "./context/RecipesContext";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

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
    const { user, authLoaded } = useRecipes();

    if (!authLoaded) return null;

    return (
        <Routes>
            <Route
                path="/login"
                element={
                    user ? <Navigate to="/" replace /> : <LoginPage />
                }
            />

            <Route
                path="/"
                element={
                    user ? <HomePage /> : <Navigate to="/login" replace />
                }
            />
            <Route
                path="/recipes"
                element={
                    user ? <RecipePage /> : <Navigate to="/login" replace />
                }
            />
            <Route
                path="/planner"
                element={
                    user ? <PlannerPage /> : <Navigate to="/login" replace />
                }
            />
            <Route
                path="/recipes/:id"
                element={
                    user ? <RecipeDetailPage /> : <Navigate to="/login" replace />
                }
            />
            
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