import "../styles/RecipeDetailPage.css";

export default function RecipeDetailPage() {
    return (
        <div className="rd-page">

            {/* HEADER */}
            <header className="rd-header">
                <button className="rd-back">
                    <span className="material-symbols-outlined">
                        arrow_back
                    </span>
                    <span>Back</span>
                </button>

                <button className="rd-edit">
                    Edit
                </button>
            </header>

            <main className="rd-main">

                {/* TITLE */}
                <div className="rd-title-section">
                    <h1>Spicy Lentil Soup</h1>

                    <div className="rd-meta">
                        <span className="material-symbols-outlined">history</span>
                        <span>Last cooked 3 days ago</span>
                        <div className="rd-dot" />
                        <span>Added on 10 Feb</span>
                    </div>
                </div>

                {/* IMAGE */}
                <div className="rd-image-wrapper">
                    <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-p0nMtqAW7vJoEQcItCWWpL_NHIpN8n9QZIsRBfYEHB-nRYSPIgPvCAfwQjr0lO93fmYRddywxvM3tl8CZ5jkMtBTa7J1HhOp3VO7-9nxpW5nwkYP6OJ9QQP76rAN7poB5e6CjJ4bap4MXDMK29_YHMj2kxbM0SPtc1DII4vG8HYWYF8BmygvV62QvG7bZ75Qv-cDbuNPt3i3X_7jPbuYQLr5rZZw9V5V8zSK4teP-e-06vrhMYH74j5X0iduZl_pabgGqHlJxA"
                        alt="Spicy Lentil Soup"
                    />
                </div>

                {/* TAGS */}
                <div className="rd-tags">
                    <div className="rd-tag">
                        <span className="material-symbols-outlined">local_fire_department</span>
                        Spicy
                    </div>
                    <div className="rd-tag">
                        <span className="material-symbols-outlined">timer</span>
                        Quick
                    </div>
                    <div className="rd-tag">
                        <span className="material-symbols-outlined">soup_kitchen</span>
                        Vegan
                    </div>
                </div>

                {/* STEPS */}
                <div className="rd-steps">
                    <div className="rd-steps-header">
                        <h2>Cooking Steps</h2>
                        <span>4 steps</span>
                    </div>

                    {[
                        "Heat olive oil in a large pot over medium heat. Sauté the chopped onions, carrots, and celery until softened, about 5-7 minutes.",
                        "Add garlic, cumin, curry powder, and thyme. Cook for about 1 minute until fragrant.",
                        "Pour in the diced tomatoes, lentils, and vegetable broth. Bring to a boil, then simmer for 25-30 minutes.",
                        "Stir in the spinach and cook until wilted. Season with salt, pepper, and lemon juice."
                    ].map((step, index) => (
                        <div key={index} className="rd-step">
                            <div className="rd-step-number">{index + 1}</div>
                            <p>{step}</p>
                        </div>
                    ))}
                </div>

                {/* MARK AS COOKED */}
                <div className="rd-mark-card">
                    <div>
                        <h3>Cooked this recently?</h3>
                        <p>Keep your memory timeline updated.</p>
                    </div>

                    <button className="rd-mark-btn">
                        <span className="material-symbols-outlined">
                            check_circle
                        </span>
                        Mark as Cooked Today
                    </button>
                </div>

                {/* SHARE */}
                <div className="rd-share">
                    <button className="rd-share-btn">
                       {/*  <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path></svg> */}
                        Share on WhatsApp
                    </button>
                </div>

            </main>

        </div>
    );
}
