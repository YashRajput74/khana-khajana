import { createContext, useContext, useState } from "react";

const RecipesContext = createContext();

export function RecipesProvider({ children }) {
    const [recipes, setRecipes] = useState([]);
    const [favorites, setFavorites] = useState([]);

    return (
        <RecipesContext.Provider value={{
            recipes,
            setRecipes,
            favorites,
            setFavorites
        }}>
            {children}
        </RecipesContext.Provider>
    );
}

export function useRecipes() {
    return useContext(RecipesContext);
}
