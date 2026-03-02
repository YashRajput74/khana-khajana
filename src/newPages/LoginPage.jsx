import { useRecipes } from "../context/RecipesContext";
import LoginModal from "../newComponents/LoginModal";

export default function LoginPage() {
    const { loginWithGoogle } = useRecipes();

    const handleEmailLogin = (email) => {
        console.log("Email entered:", email);
        // Later we’ll connect this properly
    };

    return (
        <LoginModal
            onGoogleLogin={loginWithGoogle}
            onEmailLogin={handleEmailLogin}
        />
    );
}