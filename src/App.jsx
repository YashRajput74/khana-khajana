import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import HomePage from "./pages/HomePage";
import RecipePage from "./pages/RecipePage";
import PlannerPage from "./pages/PlannerPage";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import FavoritesPage from "./pages/FavoritesPage";
import { RecipesProvider } from "./context/RecipesContext";

export default function App() {
    return (
    <RecipesProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/recipes" element={<RecipePage />} />
                    <Route path="/planner" element={<PlannerPage />} />
                    <Route path="/recipes/:id" element={<RecipeDetailPage />} />
                    <Route path="/favorites" element={<FavoritesPage />} />
                </Routes>
            </Router>
        </RecipesProvider>
    );
}
