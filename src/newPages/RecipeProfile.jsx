import "./RecipeProfile.css";

export default function RecipeProfile() {

    const ingredients = [
        { qty: "500g", name: "Paneer cubes" },
        { qty: "4 tbsp", name: "Butter" },
        { qty: "2 cups", name: "Tomato Puree" },
        { qty: "1/2 cup", name: "Heavy Cream" },
        { qty: "1 tsp", name: "Garam Masala" },
        { qty: "2 tbsp", name: "Cashew Paste" }
    ]

    const steps = [
        {
            title: "Prepare the base",
            text: "Heat butter in a pan. Add whole spices (bay leaf, cloves, cinnamon). Sauté onions until translucent, then add ginger-garlic paste. Cook until the raw smell disappears."
        },
        {
            title: "Simmer the gravy",
            text: "Pour in the tomato puree and cashew paste. Add red chili powder, turmeric, and salt. Cover and cook on low heat for 15 minutes until the butter separates from the masala."
        },
        {
            title: "Add richness",
            text: "Add the paneer cubes and warm water if needed to adjust consistency. Crush dried fenugreek leaves (kasuri methi) between palms and sprinkle over."
        },
        {
            title: "Finish and Serve",
            text: "Turn off the heat. Stir in the heavy cream and garam masala. Garnish with a swirl of cream and serve hot with Naan or Jeera Rice."
        }
    ]

    return (
        <div className="recipe-page">

            {/* HEADER */}

            <header className="recipe-page-header">

                <div className="recipe-page-header-left">

                    <button className="recipe-page-back">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>

                    <span className="recipe-page-label">
                        Recipe Profile
                    </span>

                </div>

                <div className="recipe-page-actions">

                    <button>
                        <span className="material-symbols-outlined">favorite</span>
                    </button>

                    <button>
                        <span className="material-symbols-outlined">share</span>
                    </button>

                </div>

            </header>


            <main className="recipe-page-main">

                {/* HERO */}

                <section className="recipe-page-hero">

                    <div className="recipe-page-image">

                        <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAe0iVWSKEZ-GE2ewFL-maWJ8TPyqeQAH2Mzm7OOnhsBXtqJnW4Eu_Dr9GF_DHKHwN1sQY7R4h3-ian5ZjBNzAJL9wIu0UxNg0ov09EALn5V-FzKT8AOP-c4b2IpsrrQrx5bxiu1mmZLDoU5cyb125QvnV0hCloFbujX_YJd-t-3T-8U7HBjtnxKAYL0JeIL0DfslOBTKYmnhIZxzYvLRi1Iuyo7CXJNSdOuXXaQfzJo_mvUFJ-FyZLIhQM4vWOqZz1MpFfpS5Zn9k"
                            alt="Paneer Butter Masala"
                        />

                    </div>


                    <div className="recipe-page-info">

                        <div className="recipe-page-badges">

                            <span className="recipe-page-repeat">
                                Repeat-Safe
                            </span>

                            <span className="recipe-page-history">
                                Last cooked 14 days ago
                            </span>

                        </div>

                        <h1>Paneer Butter Masala</h1>

                        <p className="recipe-page-desc">
                            A rich, creamy tomato gravy with cottage cheese. Made 12 times.
                        </p>

                        <div className="recipe-page-buttons">

                            <button className="recipe-page-cook">
                                Cook Now
                            </button>

                            <button className="recipe-page-edit">
                                Edit
                            </button>

                        </div>

                    </div>

                </section>


                {/* GRID */}

                <div className="recipe-page-grid">

                    {/* LEFT */}

                    <div className="recipe-page-left">

                        {/* STATS */}

                        <section>

                            <h3>Quick Stats</h3>

                            <div className="recipe-page-stats">

                                <div>
                                    <span>Prep</span>
                                    <strong>30m</strong>
                                </div>

                                <div>
                                    <span>Cook</span>
                                    <strong>20m</strong>
                                </div>

                                <div className="full">
                                    <span>Calories</span>
                                    <strong>450</strong>
                                </div>

                            </div>

                        </section>


                        {/* INGREDIENTS */}

                        <section className="recipe-page-ingredients">

                            <div className="recipe-page-ing-header">
                                <h3>Ingredients</h3>
                                <span>Serves 4</span>
                            </div>

                            <ul>

                                {ingredients.map((i, index) => (
                                    <li key={index}>
                                        <span className="qty">{i.qty}</span> {i.name}
                                    </li>
                                ))}

                            </ul>

                        </section>

                    </div>


                    {/* RIGHT */}

                    <div className="recipe-page-right">

                        {/* STEPS */}

                        <section>

                            <h3>Preparation Steps</h3>

                            {steps.map((s, index) => (
                                <div className="recipe-page-step" key={index}>

                                    <div className="recipe-page-step-num">
                                        {index + 1}
                                    </div>

                                    <div>

                                        <h4>{s.title}</h4>

                                        <p>{s.text}</p>

                                    </div>

                                </div>
                            ))}

                        </section>


                        {/* JOURNAL */}

                        <section className="recipe-page-journal">

                            <h3>Cook's Journal</h3>

                            <div className="recipe-page-note">
                                <p>"Extra cream makes it better. Don't skimp on the butter initially."</p>
                                <span>— Added Oct 24</span>
                            </div>

                            <div className="recipe-page-note">
                                <p>"Substituted cashew paste with almond flour, worked surprisingly well."</p>
                                <span>— Added Sep 12</span>
                            </div>

                            <div className="recipe-page-note">
                                <p>"Next time try smoked paprika for deeper flavor."</p>
                                <span>— Added Aug 03</span>
                            </div>

                        </section>

                    </div>

                </div>

            </main>

        </div>
    );
}