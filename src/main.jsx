import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { RecipesProvider } from "./context/RecipesContext";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <RecipesProvider>
            <App />
        </RecipesProvider>
    </BrowserRouter>
);