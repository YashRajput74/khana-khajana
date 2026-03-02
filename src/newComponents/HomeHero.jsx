export default function HomeHero() {
    return (
        <section className="flex flex-col items-center text-center mb-10">

            <button className="w-24 h-24 rounded-full bg-surface-dark border border-gray-800 flex items-center justify-center shadow-xl hover:scale-105 transition-transform">
                <span className="material-icons-round text-5xl text-primary">
                    mic
                </span>
            </button>

            <h1 className="text-2xl font-bold mt-6">
                Your Kitchen AI
            </h1>

            <p className="text-text-secondary-dark text-sm mt-2">
                Tap to add a dish or ask "What should I cook?"
            </p>

        </section>
    );
}