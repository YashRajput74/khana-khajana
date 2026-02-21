import { useState } from "react";
import { useRecipes } from "../context/RecipesContext";
import "../styles/AuthModal.css";

export default function AuthModal() {
    const {
        isAuthModalOpen,
        closeAuthModal,
        login,
        signup,
        logout,
        user
    } = useRecipes();
    const [isSignup, setIsSignup] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    if (!isAuthModalOpen) return null;
    if (user) {
        return (
            <div className="mpAuth_overlay" onClick={closeAuthModal}>
                <div
                    className="mpAuth_modal"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="mpAuth_header">
                        <h2 className="mpAuth_title">
                            Your Profile
                        </h2>
                    </div>

                    <div className="mpAuth_profileContent">
                        <p className="mpAuth_email">{user.email}</p>

                        <button
                            className="mpAuth_logoutBtn"
                            onClick={() => {
                                logout();
                                closeAuthModal();
                            }}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    const handleChange = (e) => {
        setFormData(prev => ({
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
        <div className="mpAuth_overlay" onClick={closeAuthModal}>
            <div
                className="mpAuth_modal"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="mpAuth_header">
                    <div className="mpAuth_icon">
                        <span className="material-symbols-outlined">
                            restaurant_menu
                        </span>
                    </div>

                    <h2 className="mpAuth_title">
                        Welcome to Mindful Plate
                    </h2>

                    <div className="mpAuth_toggle">
                        <button
                            className={!isSignup ? "mpAuth_toggleBtn mpAuth_active" : "mpAuth_toggleBtn"}
                            onClick={() => setIsSignup(false)}
                        >
                            Login
                        </button>

                        <button
                            className={isSignup ? "mpAuth_toggleBtn mpAuth_active" : "mpAuth_toggleBtn"}
                            onClick={() => setIsSignup(true)}
                        >
                            Sign Up
                        </button>
                    </div>
                </div>

                <form className="mpAuth_form" onSubmit={handleSubmit}>
                    {isSignup && (
                        <div className="mpAuth_field">
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

                    <div className="mpAuth_field">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="alex@example.com"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mpAuth_field">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <button className="mpAuth_submit">
                        {isSignup ? "Create Account" : "Login"}
                    </button>
                </form>

                <div className="mpAuth_divider">
                    <span>or</span>
                </div>

                <button className="mpAuth_googleBtn">
                    Continue with Google
                </button>
            </div>
        </div>
    );
}