export default function RecipeSteps({ recipe }) {
    return (
        <section>
            <h3 className="text-lg font-semibold mb-6">
                Preparation Steps
            </h3>

            <div className="space-y-6">
                {recipe.steps?.length ? (
                    recipe.steps.map((step, index) => (
                        <div key={index} className="flex gap-6">
                            <div className="w-8 h-8 rounded-full bg-primary text-black font-bold flex items-center justify-center text-sm">
                                {index + 1}
                            </div>

                            <p className="text-text-secondary-dark">
                                {step}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-text-secondary-dark">
                        No steps added.
                    </p>
                )}
            </div>
        </section>
    );
}