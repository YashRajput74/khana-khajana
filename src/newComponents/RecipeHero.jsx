export default function RecipeHero({ recipe }) {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-gray-800">
                {recipe.image ? (
                    <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-700" />
                )}
            </div>

            <div className="flex flex-col justify-center">

                <h1 className="text-4xl font-bold mb-4">
                    {recipe.title}
                </h1>

                <p className="text-text-secondary-dark mb-8">
                    {recipe.category || "Homemade favorite"}
                </p>

                <div className="flex gap-4">
                    <button className="flex-1 bg-primary text-black font-bold py-4 rounded-2xl">
                        Cook Now
                    </button>

                    <button className="px-6 py-4 border border-gray-700 rounded-2xl">
                        Edit
                    </button>
                </div>

            </div>

        </section>
    );
}