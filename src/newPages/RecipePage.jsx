import { useParams, useNavigate } from "react-router-dom";
import { useRecipes } from "../context/RecipesContext";

import RecipeHero from "../newComponents/RecipeHero";
import RecipeStats from "../newComponents/RecipeStats";
import RecipeIngredients from "../newComponents/RecipeIngredients";
import RecipeSteps from "../newComponents/RecipeSteps";
import RecipeJournal from "../newComponents/RecipeJournal";

export default function RecipePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { recipes } = useRecipes();

    const recipe = recipes[id];

    if (!recipe) {
        return (
            <div className="min-h-screen bg-background-dark text-white flex items-center justify-center">
                Recipe not found
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background-dark text-white">

            {/* Header */}
            <header className="w-full max-w-5xl mx-auto px-6 py-6 flex justify-between items-center">
                <button
                    onClick={() => navigate(-1)}
                    className="text-primary"
                >
                    ← Back
                </button>

                <div className="flex gap-4 text-primary">
                    ❤
                    ⤴
                </div>
            </header>

            <main className="w-full max-w-5xl mx-auto px-6 pb-20">

                <RecipeHero recipe={recipe} id={id} />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-12">

                    <div className="lg:col-span-4 space-y-8">
                        <RecipeStats recipe={recipe} />
                        <RecipeIngredients recipe={recipe} />
                    </div>

                    <div className="lg:col-span-8 space-y-10">
                        <RecipeSteps recipe={recipe} />
                        <RecipeJournal />
                    </div>

                </div>

            </main>
        </div>
    );
}