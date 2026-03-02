export default function DishCard({ title }) {
    return (
        <div className="break-inside-avoid group relative rounded-2xl overflow-hidden cursor-pointer">

            <div className="h-60 bg-gray-700 rounded-2xl" />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 p-4 w-full">
                <h3 className="text-white font-bold text-lg">
                    {title}
                </h3>
            </div>

        </div>
    );
}