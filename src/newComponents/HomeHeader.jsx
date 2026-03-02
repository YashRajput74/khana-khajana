export default function HomeHeader() {
    return (
        <header className="w-full max-w-6xl px-4 py-4 flex justify-between items-center fixed top-0 left-0 right-0 z-30 bg-background-dark/80 backdrop-blur-sm">

            <span className="text-xl font-bold text-primary">
                Khana Khazana
            </span>

            <button>
                <div className="w-8 h-8 rounded-full bg-gray-600 border border-gray-500" />
            </button>

        </header>
    );
}