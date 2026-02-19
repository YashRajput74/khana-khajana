    import BottomNav from "../components/BottomNav";
    import { APP_NAME } from "../config/appconfig";
    import "../styles/RecipePage.css";

    const recipes = [
        {
            title: "Lemon Herb Roasted Chicken",
            time: "Last cooked 3 days ago",
            tag: "Dinner",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuABIPd9DDP0PAtzshAn9ZvWoQxKlqee4Vi1sr1kNFq_p1QPYg81Ru2SVpOsggLLw4j-8GPtAKfbNTr6siGxWtzGxUkLInEWczaFcHJDPyyC0OFWnf1RFN8kQuoA8Me4kcFDemUuKBkiwjADHMLJc2RKnfknIH1gAJBImPHYjR-90KiRcOdrfeidgy663NprX3EiFCMP_cv_P-eg0WbLTXyz3ki_B_iKq31Lj2rY_sPfSx0uLteecGa9rUk5_jo1fZnQBU2bdkUIUQ",
        },
        {
            title: "Spicy Lentil Soup",
            time: "Last cooked 2 weeks ago",
            tag: "Lunch",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-p0nMtqAW7vJoEQcItCWWpL_NHIpN8n9QZIsRBfYEHB-nRYSPIgPvCAfwQjr0lO93fmYRddywxvM3tl8CZ5jkMtBTa7J1HhOp3VO7-9nxpW5nwkYP6OJ9QQP76rAN7poB5e6CjJ4bap4MXDMK29_YHMj2kxbM0SPtc1DII4vG8HYWYF8BmygvV62QvG7bZ75Qv-cDbuNPt3i3X_7jPbuYQLr5rZZw9V5V8zSK4teP-e-06vrhMYH74j5X0iduZl_pabgGqHlJxA",
        },
        {
            title: "Creamy Basil Pesto Pasta",
            time: "Last cooked 1 month ago",
            tag: "Quick Meal",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBnLIfvtSpybvT_x_JsfW3Og_lqM0BWPSlrMNTBQM9pLPktFdD7eQEhhn7z4oQ0sWjx9Lx32yEq2IGTnwkI5MyVZ5qCs-0N8DQ0M_648RXJh97wW_S-AR9VdKxHRpjUt3FY5BlBbCCHvMNrt8PO4cId6HjV1gTPJjmZyMVHApRI8WnImoZw8hgiT4Ye1OuvglyWn2n3kaCs2qCdCMZGpJSIzjj8BZvEsDQv2rdyFA5XV2O3eOqThk07VO9A1dqrvbzzf04_IieaAg",
        },
        {
            title: "Avocado & Egg Toast",
            time: "Last cooked 2 months ago",
            tag: "Breakfast",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSgXy-Obr7s4R9GvFwy6fc9flr9iuJcBhIyBxI8fw2SZd3SAZNNAT1XU3tEoJe2S8EdUAJBp0vIzV_J3x83QqSbP_uetQemUZep7qNFGduzgiJVmbhF1TESBk9lEscxXeIjZVwOYxWplczaAbA4HN3I3TwAUhMGBLoHgp8CvJ8HdLhPVzn1jOBhj95wFsoxD5Q6pXEVLItp49k25LpZr2tj5BJLCpXFV3etQHtqalVXacWeyQHlSDBn_z6Zgr69U-T9HLBoboxmg",
        },
    ];

    export default function RecipesPage() {
        return (
            <div className="rv-page">

                {/* HEADER */}
                <header className="rv-header">
                    <div className="rv-header-left">
                        <span className="material-symbols-outlined rv-logo">
                            local_dining
                        </span>
                        <h2>{APP_NAME}</h2>
                    </div>

                    <div className="rv-header-right">
                        <button className="rv-icon-btn">
                            <span className="material-symbols-outlined">notifications</span>
                        </button>
                        <button className="rv-icon-btn">
                            <span className="material-symbols-outlined">settings</span>
                        </button>
                        <div className="rv-avatar">
                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4RsUGc3UjOcyHUqT6yKzsHCFcTyDpPo3xvT4ZqImDLJhMmx-oq_25Z1xDTdvFwgkTBQn2Ndy2LuTR5p24TGQ69IcDAcXtNQ2NSh5Ku-XrEvgGlEDsziwgrjpwHjGt8VWSWCf2ZUNe4QWW1JpqOcZFzlzxhF_wxS5LfTnf0bS9Bw_1uulDUveMO9TkNKN7dAXPT8vvqFCpXNM4poLUmw6UyRuuWs0W6QRkp4TzO2l0BFhVSuRAbWzGLo1L9ogwx5rJbXNERdqYIQ" alt="user" />
                        </div>
                    </div>
                </header>

                <main className="rv-main">
                    <h1>Your Recipes</h1>
                    <p className="rv-subtitle">Rediscover your culinary journey.</p>

                    {/* SEARCH */}
                    <div className="rv-search">
                        <span className="material-symbols-outlined">search</span>
                        <input placeholder="Search dishes or tags..." />
                        <button>
                            <span className="material-symbols-outlined">tune</span>
                        </button>
                    </div>

                    {/* FILTER */}
                    <div className="rv-filter">
                        <button>All</button>
                        <button className="rv-filter-active">Recent</button>
                        <button>Favorites</button>
                    </div>

                    {/* CARDS */}
                    <div className="rv-cards">
                        {recipes.map((item, index) => (
                            <article key={index} className="rv-card">
                                <div className="rv-card-left">
                                    <div className="rv-card-img">
                                        <img src={item.image} alt={item.title} />
                                    </div>
                                    <div className="rv-card-text">
                                        <h3>{item.title}</h3>
                                        <div className="rv-card-meta">
                                            <span className="material-symbols-outlined">history</span>
                                            <span>{item.time}</span>
                                            <span className="rv-dot"></span>
                                            <span className="rv-tag">{item.tag}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="rv-card-actions">
                                    <button>
                                        <span className="material-symbols-outlined">
                                            star
                                        </span>
                                    </button>
                                    <button>
                                        <span className="material-symbols-outlined">
                                            more_vert
                                        </span>
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                </main>

                {/* FLOATING BUTTON */}
                <button className="rv-fab">
                    <span className="material-symbols-outlined">add</span>
                </button>

                <BottomNav />

            </div>
        );
    }
