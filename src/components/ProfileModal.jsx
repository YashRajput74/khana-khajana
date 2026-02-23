import { useRecipes } from "../context/RecipesContext";
import "../styles/ProfileModal.css";

export default function ProfileModal({ onClose }) {
    const { user, logout } = useRecipes();

    if (!user) return null;

    return (
        <div className="mpAuth_overlay" onClick={onClose}>
            <div
                className="mpAuth_modal"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="mpAuth_profileContent">
                    <h3 className="mpAuth_title">Your Profile</h3>

                    <p className="mpAuth_email">{user.email}</p>

                    <button
                        className="mpAuth_logoutBtn"
                        onClick={() => {
                            logout();
                            onClose();
                        }}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}