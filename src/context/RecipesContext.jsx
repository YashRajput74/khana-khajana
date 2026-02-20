import { createContext, useContext, useState, useMemo } from "react";
import { mockRecipes, mockPlanner, mockUser } from "../data/mockData";

const RecipesContext = createContext();

export function RecipesProvider({ children }) {
    const [recipes, setRecipes] = useState(mockRecipes);
    const [planner, setPlanner] = useState(mockPlanner);
    const [user, setUser] = useState(mockUser);

    const addRecipe = (title) => {
        const newId = `rec_${Date.now()}`;

        const newRecipe = {
            title,
            image: null,
            category: "Uncategorized",
            tags: [],
            cookingTime: null,
            addedAt: new Date().toISOString(),
            lastCookedAt: null,
            isFavorite: false,
            steps: []
        };

        setRecipes(prev => ({
            ...prev,
            [newId]: newRecipe
        }));

        return newId;
    };
    const recipesArray = useMemo(() => {
        return Object.entries(recipes).map(([id, recipe]) => ({
            id,
            ...recipe
        }));
    }, [recipes]);

    const favorites = useMemo(() => {
        return recipesArray.filter(recipe => recipe.isFavorite);
    }, [recipesArray]);

    const recentlyCooked = useMemo(() => {
        return [...recipesArray]
            .filter(recipe => recipe.lastCookedAt)
            .sort((a, b) => new Date(b.lastCookedAt) - new Date(a.lastCookedAt));
    }, [recipesArray]);

    const totalSaved = recipesArray.length;

    const toggleFavorite = (id) => {
        setRecipes(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                isFavorite: !prev[id].isFavorite
            }
        }));
    };

    const markAsCooked = (id) => {
        setRecipes(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                lastCookedAt: new Date().toISOString()
            }
        }));
    };

    const deleteRecipe = (id) => {
        setRecipes(prev => {
            const updated = { ...prev };
            delete updated[id];
            return updated;
        });

        setPlanner(prev =>
            prev.map(day =>
                day.recipeId === id ? { ...day, recipeId: null } : day
            )
        );
    };

    const addToPlanner = (date, recipeId) => {
        setPlanner(prev =>
            prev.map(day =>
                day.date === date ? { ...day, recipeId } : day
            )
        );
    };

    const updateRecipe = (id, updates) => {
        setRecipes(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                ...updates
            }
        }));
    };

    return (
        <RecipesContext.Provider
            value={{
                recipes,
                recipesArray,
                planner,
                user,
                favorites,
                recentlyCooked,
                totalSaved,
                toggleFavorite,
                markAsCooked,
                deleteRecipe,
                addToPlanner,
                addRecipe,
                updateRecipe
            }}
        >
            {children}
        </RecipesContext.Provider>
    );
}

export function useRecipes() {
    return useContext(RecipesContext);
}
