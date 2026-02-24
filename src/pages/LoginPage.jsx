import { useState } from "react";
import { useRecipes } from "../context/RecipesContext";
import "../styles/LoginPage.css";

const LoginPage = () => {
    const {
        login,
        signup,
        logout,
        user,
        loginWithGoogle
    } = useRecipes();

    const [isSignup, setIsSignup] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSignup) {
            await signup(formData.email, formData.password);
        } else {
            await login(formData.email, formData.password);
        }

        setFormData({
            name: "",
            email: "",
            password: ""
        });
    };

    return (
        <div className="prp-login">

            <div className="prp-login__left">
                <div className="prp-login__overlay"></div>
                <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6eAr9hC4qmyrKlK6FiU7ugHxMirVL_ELA8ugdWYF_8NABrfCGTQ-t5cAZNjkDcA6nebYpfPv4WOqmcmIBUNYGaALKOjssxX_iJ2e_kcSV-5u59HuH5vcU9vn806Bs3io6my9h4krWK0j1HoDa5PLFsOvkylLgw9hOs7UQUHaPCNSbG-9s7n7EL2e9HoE-g8gmRsGH22qbMOLdlGLHdtbk-1uEs4KAj5j19x5LaPzUQEa31xdA9o-3WvGzaWlpTUtacEZOMWMDww"
                    alt="Kitchen"
                    className="prp-login__image"
                />

                <div className="prp-login__hero">
                    <div className="prp-login__icon">🍽</div>
                    <h2>Nourish your memories.</h2>
                    <p>
                        Plan meals that bring everyone together, one mindful plate at a time.
                    </p>
                </div>
            </div>

            <div className="prp-login__right">
                <div className="prp-login__card">

                    <div className="prp-login__header">
                        <h1>
                            {isSignup ? "Create your account" : "Welcome back"}
                        </h1>
                        <p>
                            {isSignup
                                ? "Join Mindful Plate to start your journey."
                                : "Log in to continue your journey."}
                        </p>
                    </div>

                    <div className="prp-login__switch">
                        <button
                            className={`prp-btn ${!isSignup ? "prp-btn--active" : ""}`}
                            onClick={() => setIsSignup(false)}
                        >
                            Login
                        </button>

                        <button
                            className={`prp-btn ${isSignup ? "prp-btn--active" : ""}`}
                            onClick={() => setIsSignup(true)}
                        >
                            Sign Up
                        </button>
                    </div>

                    <form className="prp-login__form" onSubmit={handleSubmit}>

                        {isSignup && (
                            <div className="prp-form-group">
                                <label>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Alex Chen"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                        )}

                        <div className="prp-form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="alex@example.com"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="prp-form-group">
                            <div className="prp-form-row">
                                <label>Password</label>
                            </div>
                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>

                        <button type="submit" className="prp-login__submit">
                            {isSignup ? "Create Account" : "Login"}
                        </button>
                    </form>

                    <div className="prp-divider">
                        <span>or continue with</span>
                    </div>

                    <button className="prp-google-btn" onClick={loginWithGoogle}>
                        Continue with Google
                    </button>

                    <p className="prp-login__footer">
                        {isSignup ? (
                            <>
                                Already have an account?{" "}
                                <a href="#" onClick={() => setIsSignup(false)}>
                                    Log in
                                </a>
                            </>
                        ) : (
                            <>
                                Don't have an account?{" "}
                                <a href="#" onClick={() => setIsSignup(true)}>
                                    Sign up
                                </a>
                            </>
                        )}
                    </p>

                </div>
            </div>
        </div>
    );
};

export default LoginPage;