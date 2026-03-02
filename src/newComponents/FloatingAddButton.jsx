export default function FloatingAddButton() {
    return (
        <div className="fixed bottom-6 right-6 z-40">
            <button className="w-14 h-14 rounded-full bg-surface-dark border border-primary flex items-center justify-center hover:scale-105 transition-transform">
                <span className="material-icons-round text-primary text-3xl">
                    add
                </span>
            </button>
        </div>
    );
}