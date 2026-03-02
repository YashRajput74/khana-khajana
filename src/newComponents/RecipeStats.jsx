export default function RecipeStats({ recipe }) {
    return (
        <section>
            <h3 className="text-lg font-semibold mb-4">
                Quick Stats
            </h3>

            <div className="grid grid-cols-2 gap-4">

                <StatCard label="Prep" value="30m" />
                <StatCard label="Cook" value={recipe.cookingTime || "20m"} />
                <StatCard label="Calories" value="450" full />

            </div>
        </section>
    );
}

function StatCard({ label, value, full }) {
    return (
        <div
            className={`bg-surface-dark p-4 rounded-2xl border border-gray-800 text-center ${full ? "col-span-2" : ""
                }`}
        >
            <div className="text-xl font-bold">{value}</div>
            <div className="text-xs text-text-secondary-dark uppercase">
                {label}
            </div>
        </div>
    );
}