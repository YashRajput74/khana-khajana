import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { supabase } from "../lib/supabase";

const RecipesContext = createContext();

export function RecipesProvider({ children }) {
    const [authLoaded, setAuthLoaded] = useState(false);
    const [recipes, setRecipes] = useState({});
    const [planner, setPlanner] = useState([]);
    const [user, setUser] = useState();

    useEffect(() => {
        const getSession = async () => {
            const { data } = await supabase.auth.getSession();

            setUser(data.session?.user ?? null);
            setAuthLoaded(true);
        };

        getSession();

        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session?.user ?? null);
            }
        );

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    useEffect(() => {
        if (!user) return;
        async function loadRecipes() {
            try {
                const res = await fetchWithAuth(
                    `${import.meta.env.VITE_API_URL}/api/recipes`
                );

                if (!res.ok) throw new Error("Failed to load recipes");

                const data = await res.json();

                const normalized = {};

                data.forEach(r => {
                    normalized[r.id] = {
                        title: r.title,
                        image: r.image,
                        category: r.category,
                        tags: r.tags || [],
                        cookingTime: r.cooking_time,
                        addedAt: r.added_at,
                        lastCookedAt: r.last_cooked_at,
                        isFavorite: r.is_favorite,
                        steps: r.steps || []
                    };
                });

                setRecipes(normalized);
            } catch (err) {
                console.error("Failed to load recipes:", err);
            }
        }

        async function loadPlanner() {
            try {
                const res = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/api/planner`);
                const data = await res.json();

                const formatted = data.map(item => ({
                    date: item.date,
                    recipeId: item.recipe_id
                }));

                setPlanner(formatted);
            } catch (err) {
                console.error("Failed to load planner:", err);
            }
        }
        loadRecipes();
        loadPlanner();
    }, [user]);

    const loginWithGoogle = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: window.location.origin
            }
        });

        if (error) {
            console.error("Google login error:", error.message);
        }
    };

    const login = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            console.error("Login error:", error.message);
            return;
        }

        setUser(data.user);
    };

    const signup = async (email, password) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password
        });

        if (error) {
            console.error("Signup error:", error.message);
            return;
        }

        setUser(data.user);
    };

    const fetchWithAuth = async (url, options = {}) => {
        const { data } = await supabase.auth.getSession();
        const token = data.session?.access_token;

        return fetch(url, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                ...options.headers
            }
        });
    };

    const logout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setRecipes({});
        setPlanner([]);
    };

    const addRecipe = async (title) => {
        try {
            const res = await fetchWithAuth(
                `${import.meta.env.VITE_API_URL}/api/recipes`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ title })
                }
            );

            if (!res.ok) {
                throw new Error("Failed to create recipe");
            }

            const data = await res.json();

            const formatted = {
                title: data.title,
                image: data.image,
                category: data.category,
                tags: data.tags || [],
                cookingTime: data.cooking_time,
                addedAt: data.added_at,
                lastCookedAt: data.last_cooked_at,
                isFavorite: data.is_favorite,
                steps: data.steps || []
            };

            setRecipes(prev => ({
                ...prev,
                [data.id]: formatted
            }));

            return data.id;

        } catch (err) {
            console.error("Add recipe failed:", err);
            return null;
        }
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

    const toggleFavorite = async (id) => {
        const current = recipes[id];
        if (!current) return;

        await updateRecipe(id, {
            isFavorite: !current.isFavorite
        });
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

    const deleteRecipe = async (id) => {
        try {
            const res = await fetchWithAuth(
                `${import.meta.env.VITE_API_URL}/api/recipes/${id}`,
                {
                    method: "DELETE"
                }
            );

            if (!res.ok) {
                throw new Error("Failed to delete recipe");
            }

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

        } catch (err) {
            console.error("Delete recipe failed:", err);
        }
    };

    const addToPlanner = async (date, recipeId) => {
        try {
            const res = await fetchWithAuth(
                `${import.meta.env.VITE_API_URL}/api/planner/${date}`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ recipe_id: recipeId })
                }
            );

            if (!res.ok) {
                throw new Error("Failed to update planner");
            }

            setPlanner(prev => {
                const exists = prev.some(day => day.date === date);

                if (exists) {
                    return prev.map(day =>
                        day.date === date ? { ...day, recipeId } : day
                    );
                } else {
                    return [...prev, { date, recipeId }];
                }
            });

        } catch (err) {
            console.error("Planner update failed:", err);
        }
    };

    const updateRecipe = async (id, updates) => {
        try {
            const mappedUpdates = {};

            if (updates.image !== undefined) mappedUpdates.image = updates.image;
            if (updates.category !== undefined) mappedUpdates.category = updates.category;
            if (updates.tags !== undefined) mappedUpdates.tags = updates.tags;
            if (updates.cookingTime !== undefined) mappedUpdates.cooking_time = updates.cookingTime;
            if (updates.lastCookedAt !== undefined) mappedUpdates.last_cooked_at = updates.lastCookedAt;
            if (updates.isFavorite !== undefined) mappedUpdates.is_favorite = updates.isFavorite;
            if (updates.steps !== undefined) mappedUpdates.steps = updates.steps;
            if (updates.title !== undefined) mappedUpdates.title = updates.title;

            const res = await fetchWithAuth(
                `${import.meta.env.VITE_API_URL}/api/recipes/${id}`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(mappedUpdates)
                }
            );

            if (!res.ok) {
                throw new Error("Failed to update recipe");
            }

            const data = await res.json();

            const formatted = {
                title: data.title,
                image: data.image,
                category: data.category,
                tags: data.tags || [],
                cookingTime: data.cooking_time,
                addedAt: data.added_at,
                lastCookedAt: data.last_cooked_at,
                isFavorite: data.is_favorite,
                steps: data.steps || []
            };

            setRecipes(prev => ({
                ...prev,
                [id]: formatted
            }));

        } catch (err) {
            console.error("Update recipe failed:", err);
        }
    };

    const suggestMeal = async (query, excludedIds = []) => {
        const res = await fetchWithAuth(
            `${import.meta.env.VITE_API_URL}/api/ai/suggest`,
            {
                method: "POST",
                body: JSON.stringify({ query, excludedIds })
            }
        );

        if (!res.ok) return null;

        return await res.json();
    };

    return (
        <RecipesContext.Provider
            value={{
                authLoaded,
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
                updateRecipe,
                login,
                signup,
                logout,
                suggestMeal,
                loginWithGoogle
            }}
        >
            {children}
        </RecipesContext.Provider>
    );
}

export function useRecipes() {
    return useContext(RecipesContext);
}
