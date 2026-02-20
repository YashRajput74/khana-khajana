import "../styles/EditRecipePage.css";

export default function EditRecipePage() {
    return (
        <div className="er-page">

            {/* HEADER */}
            <header className="er-header">
                <button className="er-cancel">
                    <span className="material-symbols-outlined">
                        arrow_back
                    </span>
                    Cancel
                </button>

                <h1>Edit Recipe Memory</h1>

                <button className="er-save">
                    Save Changes
                </button>
            </header>

            <main className="er-main">

                {/* DISH NAME */}
                <section className="er-section">
                    <label>Dish Name</label>
                    <input
                        type="text"
                        defaultValue="Spicy Basil Chicken"
                        placeholder="e.g. Grandma's Sunday Stew"
                    />
                </section>

                <hr />

                {/* PHOTO SECTION */}
                <section className="er-section">
                    <div className="er-photo-wrapper">

                        <div className="er-photo">
                            <img
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFNYCbb_RTsjmRLlvF-uos7UIBp5xHSpCKI0eJ9AhS_Ab_REAXt66ZAZjR7lj5SuxeeLUuI156x2lQ7WFoNo9MNusj5F5zWaT6TpgE6IZKDYxa2qbubu4o95CCnSBDvqVlWOyOWGg_wDZ0itOOWdRVNZs3IMal7EHXb39JJS63M2pmfLCgf6HRUH7fKC9rzllC_S3CwtVmItoAqAJfM9GuXy1iksQW0_M-EIwwPtJE-NB75go4fi-oThlJqce8rp1jjiRx0BSL1A"
                                alt="Recipe"
                            />
                            <div className="er-photo-overlay">
                                <button>
                                    <span className="material-symbols-outlined">
                                        edit
                                    </span>
                                </button>
                            </div>
                        </div>

                        <div className="er-photo-info">
                            <h3>Update Photo</h3>
                            <p>
                                Choose a photo that brings back the memory of this meal.
                            </p>

                            <div className="er-photo-actions">
                                <button className="er-btn-outline">
                                    <span className="material-symbols-outlined">
                                        cloud_upload
                                    </span>
                                    Upload New
                                </button>

                                <button className="er-btn-danger">
                                    <span className="material-symbols-outlined">
                                        delete
                                    </span>
                                    Remove
                                </button>
                            </div>
                        </div>

                    </div>
                </section>

                <hr />

                {/* TAGS */}
                <section className="er-section">
                    <div className="er-tags-header">
                        <label>Tags & Categories</label>
                        <button className="er-add-tag">
                            <span className="material-symbols-outlined">add</span>
                            Add Tag
                        </button>
                    </div>

                    <div className="er-tags">
                        {["Spicy", "Quick", "Healthy"].map((tag, i) => (
                            <div key={i} className="er-tag">
                                {tag}
                                <button>
                                    <span className="material-symbols-outlined">
                                        close
                                    </span>
                                </button>
                            </div>
                        ))}

                        <button className="er-tag-add">
                            + Select more
                        </button>
                    </div>
                </section>

                <hr />

                {/* STEPS */}
                <section className="er-section">
                    <label>Cooking Steps</label>
                    <div className="er-textarea-wrapper">
                        <textarea
                            rows="12"
                            defaultValue={`1. Prepare the Marinade...

2. Prep Vegetables...

3. Cook Chicken...

4. Finish & Serve...`}
                        />
                        <span className="er-markdown">
                            Markdown supported
                        </span>
                    </div>
                </section>

                {/* DELETE */}
                <section className="er-delete">
                    <button>
                        <span className="material-symbols-outlined">
                            delete_forever
                        </span>
                        Delete Memory
                    </button>
                </section>

            </main>
        </div>
    );
}
