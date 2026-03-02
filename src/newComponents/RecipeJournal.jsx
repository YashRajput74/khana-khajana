export default function RecipeJournal() {
    return (
        <section>
            <div className="bg-surface-dark rounded-3xl p-8 border border-gray-800">

                <h3 className="text-lg font-semibold mb-6">
                    Cook's Journal
                </h3>

                <div className="space-y-4">

                    <div className="bg-gray-800 p-4 rounded-xl">
                        <p className="italic">
                            "Extra cream makes it better."
                        </p>
                    </div>

                </div>

                <button className="mt-6 text-sm text-primary">
                    + Add a note
                </button>

            </div>
        </section>
    );
}