import { useRecipes } from "../context/RecipesContext";
import "./ProfileDropdown.css";

export default function ProfileDropdown({ open, onClose }) {

    const { user, logout } = useRecipes();

    if (!open) return null;

    const handleLogout = async () => {
        await logout();
        window.location.href = "/";
    };

    return (
        <div className="profile-dropdown-wrapper">

            <div className="profile-dropdown">

                <div className="profile-header">
                    <div className="profile-avatar">
                        <span className="material-symbols-outlined">person</span>
                    </div>

                    <div className="profile-info">
                        <h3>{user?.user_metadata?.name || "User"}</h3>
                        <p>{user?.email}</p>
                    </div>
                </div>

                {/* <div className="profile-menu">

                    <button className="profile-menu-item">
                        <span className="material-symbols-outlined">cooking</span>
                        My Kitchen Preferences
                    </button>

                </div> */}

                <div className="profile-footer">

                    <button className="profile-logout" onClick={handleLogout}>
                        <span className="material-symbols-outlined">logout</span>
                        Log Out
                    </button>

                </div>

            </div>

        </div>
    );
}