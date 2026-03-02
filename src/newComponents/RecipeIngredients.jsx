export default function RecipeIngredients({ recipe }) {
  return (
    <section>
      <h3 className="text-lg font-semibold mb-4">
        Ingredients
      </h3>

      <div className="bg-surface-dark rounded-3xl p-6 border border-gray-800">
        <ul className="space-y-3">
          {recipe.steps?.length
            ? recipe.steps.map((step, index) => (
                <li key={index} className="text-sm text-gray-200">
                  • Ingredient {index + 1}
                </li>
              ))
            : (
              <li className="text-text-secondary-dark text-sm">
                No ingredients added
              </li>
            )}
        </ul>
      </div>
    </section>
  );
}