import HomeHeader from "../newComponents/HomeHeader";
import HomeHero from "../newComponents/HomeHero";
import HomeTabs from "../newComponents/HomeTabs";
import FloatingAddButton from "../newComponents/FloatingAddButton";
import DishCard from "../newComponents/DishCard";

export default function HomePage() {
    return (
        <div className="bg-background-dark text-white min-h-screen flex flex-col items-center relative">

            <HomeHeader />

            <div className="h-16 w-full" />

            <div className="flex-grow w-full max-w-6xl px-4 mt-8">

                <HomeHero />
                <HomeTabs />

                <h2 className="text-lg font-semibold mb-6">
                    Unorganised Ideas
                </h2>

                <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">

                    <DishCard title="Paneer Butter Masala" />
                    <DishCard title="Aloo Gobi Dry" />
                    <DishCard title="Hyderabadi Veg Biryani" />
                    <DishCard title="Samosa Chaat" />
                    <DishCard title="Dal Makhani" />
                    <DishCard title="Malai Kofta" />
                    <DishCard title="Palak Paneer" />

                </div>

            </div>

            <FloatingAddButton />
        </div>
    );
}