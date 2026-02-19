export const mockRecipes = {
    'rec_003': {

        title: "Spicy Lentil Soup",

        image: "https://...",

        category: "Lunch",

        tags: ["Spicy", "Quick", "Vegan"],

        cookingTime: 30, // minutes

        addedAt: "2026-02-10T10:00:00.000Z",

        lastCookedAt: "2026-02-16T18:00:00.000Z",

        isFavorite: true,

        steps: [
            "Heat olive oil...",
            "Add garlic...",
            "Pour in tomatoes...",
            "Stir in spinach..."
        ]
    }
};

export const mockPlanner = [
    { date: "2026-02-12", recipeId: "rec_003" },
    { date: "2026-02-13", recipeId: null },
    { date: "2026-02-14", recipeId: "rec_001" },
    { date: "2026-02-15", recipeId: null },
    { date: "2026-02-16", recipeId: null },
    { date: "2026-02-17", recipeId: "rec_002" },
    { date: "2026-02-18", recipeId: null }
]

export const mockUser = {
    id: "user_001",
    name: "Demo User",
    avatar: "https://...",
};
