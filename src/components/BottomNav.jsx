import { NavLink } from "react-router-dom";
import "./BottomNav.css";

export default function BottomNav() {
    return (
        <div className="mp-dock-wrapper">
            <nav className="mp-dock">

                <NavLink to="/" end className="mp-dock-item">
                    Home
                </NavLink>

                <NavLink to="/recipes" className="mp-dock-item">
                    Recipes
                </NavLink>

                <NavLink to="/planner" className="mp-dock-item">
                    Planner
                </NavLink>

            </nav>
        </div>
    );
}
