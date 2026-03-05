import "./HomePage.css";

export default function HomePage() {

    const dishes = [
        {
            title: "Paneer Butter Masala",
            desc: "Rich creamy gravy with soft paneer cubes.",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAe0iVWSKEZ-GE2ewFL-maWJ8TPyqeQAH2Mzm7OOnhsBXtqJnW4Eu_Dr9GF_DHKHwN1sQY7R4h3-ian5ZjBNzAJL9wIu0UxNg0ov09EALn5V-FzKT8AOP-c4b2IpsrrQrx5bxiu1mmZLDoU5cyb125QvnV0hCloFbujX_YJd-t-3T-8U7HBjtnxKAYL0JeIL0DfslOBTKYmnhIZxzYvLRi1Iuyo7CXJNSdOuXXaQfzJo_mvUFJ-FyZLIhQM4vWOqZz1MpFfpS5Zn9k"
        },
        {
            title: "Aloo Gobi Dry",
            desc: "Comfort food for lunch.",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAc4vRS_qZTAqUUMyNMLjtUxetkQTaoGQCzV3V-OY1RPDSqJdxmwVXvILNss3e88R3_A4WVdyrw-uCYZsrFZCYkOR7DmCp6H0ssa3ey0niGIKKmDG8s8aTorpsima1No3LNwKzNmPGoVrq_n5AESS2IECLLQrZpMpYY7V8MkEvtGzSEWL19ozS_ND2GF4KafD5K8kD1GfVFn457KOH4QaSudy-8qcnR-1kGoOEjDS2xs18e0x3w4XdQOUvl9kEKGn2t2w78NqOxiYk"
        },
        {
            title: "Hyderabadi Veg Biryani",
            desc: "Weekend Special",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPP217iCXKw29XABMLwjh-e79Y1MrSZD7E55fn7aNl4t5z7bTuZ848fRhLLbAPLh0PZ2o6IBaOfKWReY7dMPqzJT7TFOvlW2sCgaVWOO82EVdQKjAnnS5UN5cLVD1wtZq51sAhze5VRhIcTfDWIqWzEuk6sZr28rH5iSS1hiOlJRdtSXvSKJaj6I1Owb44mxLbf4d4MQxLVyt9qQnN28O2kAGlG1NJHNoUvdZC-rcEf7buCVZNa6Gfl9OYL-38ZvT9ODxz1h3Fu-c"
        },
        {
            title: "Samosa Chaat",
            desc: "Evening snack idea.",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDeNCo9Mo42TBAXn-1bA76K3Io1FJ3wAnzxg7S1cuZ_973AW_hG44tLaFRiQpZ4L6UJbPry4CnfMDIbi19gpRu7QNtmIQvA4oG2PLZmHH_I6TCLSGbUbnQZWtv00ZS0IcCEbzqxqqz4xa5WA_x3GMQuRbkxoYjoXiGa4mmueBne6w1B2DMj5FVF_9DZTotLuonGrgkqYTvAZEm4Tbw7W0gpe_l3WLLKinLbl7tg2q11HWOZZdGPiEoY0accU2-vXjeC4juyx-PUuPA"
        },
        {
            title: "Dal Makhani",
            desc: "Slow cooked black lentils.",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAN1Tmkz2AbOQVkaeV8_bwDqOSNJ9glhqldxYVeGIf3jRGJzMwikdEO3IfKr4GCIWOYUTnspZzO7-Hd8sMg8zI57LCwRfHy66ss9lchGMCdThtNaow3QBnJtnLwmCmUpFKKjkWs1TM4MSN0rbLDHB-qWMcdh10VrevYiSBO0fYcOMMwOG8OZ4vL1s1cw6LBcqFE3aJHRwOcvdC0m9zufVbH2FCteuIhdYtQBABCo-6J_X6mBLSbwrmdRdzJtg4Hn5niA89127aL13A"
        },
        {
            title: "Malai Kofta",
            desc: "Festive dinner option.",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpdi46YtNeFrgKsXy3TVGQfwdGCsCOI3aeotAOdDRYWKoW2LbwGktzlfjh0UlPg7KCn0dn6OCTq6ZjSjPJ9jUcbUo5DGxX0lZIklUrTj0tMvIT0ychOBN1aZzlkvokZsaNuQ0NRcXsIInpXL3jVZDobSsZgtX-J8z4XjcoaLbZ-BtrXU5eWb18U6cXwqtzHub6WfVn-cQqisMJwoEL1kiptxqxVr3yhMcNkChzkT1RqNGkfalq649BWcrqSMie1O2-eQZxXpEXcZM"
        },
        {
            title: "Palak Paneer",
            desc: "Healthy",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBisNL31wXja84sEXRrupJ-CQoscoECZGBeLtVFNG80wP-54SJjYIg7sPYdgd5MvZmJJy_8cQCk6sg1WkcU0hqwqKnd-SBNZFvD4gjQCKGTACQ3NwAHWRTPhAR6smNkNmd0evKT7ACbxBX_5ooVNH0t7LlEjpA1OhtKaOw1BxdYP6t8nR2NQHn8xnPALVnFtsj0YVMXtkDWVf3iqAbe0t0b-CttljuvdbwqGK7UYVTGZVjg0Ey60D57pzfy3YnVIvU7wARVzh7aLfE"
        }
    ];

    return (
        <div className="kh-home">

            <header className="kh-home-header">
                <h1 className="kh-home-logo">Khana Khazana</h1>

                <img
                    className="kh-home-avatar"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmCD_ipAkdv8HKf-8F6aPCxkbc48anMUoTEIuCMo2bQVP4grzNLj6tJ6PzFp7m4JxpNW66CZatxEcsVi9ijg8TO1IKmTWr9F7Z9yxO1QTuU-nAHF7MH-eB2Youk1pPkgVqco3fVO9oR6thv9iJu4I8lLz-ZP0WtW-i76dE-4uUy1tEOvUKTakRo6-E1Kfrso4EawnaAT_P7kMSROYW6Z5D-22E1DkgPRAVSjGtkeyywTG8cabiAwTYPqduh5fX2zTHa0Nap0CI6-M"
                    alt="profile"
                />
            </header>

            <section className="kh-home-hero">

                <button className="kh-home-mic">
                    <span className="material-icons-round">mic</span>
                </button>

                <h2>Sandhya's Kitchen AI</h2>

                <p className="kh-home-listening">
                    Listening for your favorite dishes...
                </p>

                <p className="kh-home-hint">
                    Tap to add a dish or ask "What should I cook?"
                </p>

                <button className="kh-home-edit">
                    Edit Preferences
                </button>

            </section>

            <nav className="kh-home-tabs">
                <span className="active">Recently Made</span>
                <span>Safe Repeats</span>
                <span>Forgotten</span>
            </nav>

            <section className="kh-home-grid">

                {dishes.map((dish, i) => (

                    <div key={i} className="kh-home-card">

                        <img src={dish.img} alt={dish.title} />

                        <div className="kh-home-overlay">

                            <h3>{dish.title}</h3>

                            <p>{dish.desc}</p>

                        </div>

                    </div>

                ))}

            </section>

            <button className="kh-home-add">
                <span className="material-icons-round">add</span>
            </button>

        </div>
    );
}