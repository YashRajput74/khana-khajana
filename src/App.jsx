import { Routes, Route, Navigate } from "react-router-dom";
import { useRecipes } from "./context/RecipesContext";
import LoginPage from "./newPages/LoginPage";
import OnBoardingPage from "./newPages/OnBoardingPage";
import OnBoardingStepTwo from "./newPages/OnBoardingStepTwo";
import './App.css'
import OnBoardingStepThree from "./newPages/OnBoardingStepThree";

function ProtectedRoute({ children }) {
    const { user, authLoaded } = useRecipes();

    if (!authLoaded) return null;

    if (!user) return <Navigate to="/login" replace />;

    return children;
}

export default function App() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/stepp" element={<OnBoardingStepTwo />} />
            <Route path="/steppThree" element={<OnBoardingStepThree />} />

            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <OnBoardingPage />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}