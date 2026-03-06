import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { supabase } from "../lib/supabase";

const RecipesContext = createContext();

export function RecipesProvider({ children }) {
    const [authLoaded, setAuthLoaded] = useState(false);
    const [recipes, setRecipes] = useState({});
    const [user, setUser] = useState();
    const [preferences, setPreferences] = useState(() => ({
        diet: localStorage.getItem("dietPreference"),
        cuisines: JSON.parse(localStorage.getItem("cuisinePreferences") || "[]"),
        tastes: JSON.parse(localStorage.getItem("tastePreferences") || "[]")
    }));
    const [suggestions, setSuggestions] = useState([]);
    const { diet, cuisines, tastes } = preferences;
    const setDietPreference = (diet) => {
        localStorage.setItem("dietPreference", diet);

        setPreferences(prev => ({
            ...prev,
            diet
        }));
    };

    const setCuisinePreferences = (cuisines) => {
        localStorage.setItem("cuisinePreferences", JSON.stringify(cuisines))
        setPreferences(prev => ({
            ...prev,
            cuisines
        }));
    };

    const setTastePreferences = (tastes) => {
        localStorage.setItem("tastePreferences", JSON.stringify(tastes))
        setPreferences(prev => ({
            ...prev,
            tastes
        }));
    };

    const fetchSuggestions = async (query, excludedIds = []) => {

        const res = await fetchWithAuth(
            `${import.meta.env.VITE_API_URL}/api/ai/suggest`,
            {
                method: "POST",
                body: JSON.stringify({
                    query,
                    excludedIds,
                    diet,
                    cuisines,
                    tastes
                })
            }
        );

        if (!res.ok) return null;

        const data = await res.json();

        // AI suggestions
        if (data.type === "suggestions") {

            const ids = data.suggestions.map(s => s.id);

            const matchedRecipes = recipesArray.filter(r =>
                ids.includes(r.id)
            );

            setSuggestions(matchedRecipes);
        }

        // AI requested recipe creation
        if (data.type === "create_recipe") {

            const newId = await addRecipe(data.title);

            return {
                type: "create_recipe",
                recipeId: newId
            };
        }

        return data;
    };

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
                        isSafeRepeat: r.is_safe_repeat,
                        steps: r.steps || []
                    };
                });

                setRecipes(normalized);
            } catch (err) {
                console.error("Failed to load recipes:", err);
            }
        }

        loadRecipes();
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
                ...(token && { Authorization: `Bearer ${token}` }),
                ...options.headers
            }
        });
    };

    const logout = async () => {
        await supabase.auth.signOut();

        localStorage.removeItem("dietPreference");

        setUser(null);
        setRecipes({});
        setPreferences({
            diet: null,
            cuisines: [],
            tastes: []
        });
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
                isSafeRepeat: data.is_safe_repeat,
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

        } catch (err) {
            console.error("Delete recipe failed:", err);
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
            if (updates.isSafeRepeat !== undefined) mappedUpdates.is_safe_repeat = updates.isSafeRepeat;
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
                isSafeRepeat: data.is_safe_repeat,
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

    const safeRepeats = useMemo(() => {
        return recipesArray.filter(r => r.isSafeRepeat)
    }, [recipesArray])

    const toggleSafeRepeat = async (id) => {
        const current = recipes[id]

        await updateRecipe(id, {
            isSafeRepeat: !current.isSafeRepeat
        })
    }

    const value = useMemo(() => ({
        authLoaded,
        recipes,
        recipesArray,
        user,
        favorites,
        recentlyCooked,
        totalSaved,
        suggestions,
        safeRepeats,
        toggleSafeRepeat,
        toggleFavorite,
        markAsCooked,
        deleteRecipe,
        addRecipe,
        updateRecipe,
        login,
        signup,
        logout,
        loginWithGoogle,
        preferences,
        diet,
        cuisines,
        tastes,
        setDietPreference,
        setCuisinePreferences,
        setTastePreferences,
        fetchSuggestions,
        setSuggestions
    }), [
        authLoaded,
        recipes,
        recipesArray,
        user,
        favorites,
        recentlyCooked,
        totalSaved,
        preferences,
        suggestions,
        safeRepeats
    ]);
    return (
        <RecipesContext.Provider
            value={value}
        >
            {children}
        </RecipesContext.Provider>
    );
}

export function useRecipes() {
    return useContext(RecipesContext);
}
