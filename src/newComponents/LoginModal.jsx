export default function LoginModal({ onGoogleLogin, onEmailLogin }) {
    return (
        <div className="min-h-screen bg-background-dark text-white font-sans flex flex-col">

            {/* Header */}
            <header className="w-full pt-8 pb-4 flex justify-center items-center">
                <div className="flex items-center gap-2 opacity-90 hover:opacity-100 transition-opacity cursor-pointer">
                    <span className="material-symbols-outlined text-primary text-2xl">
                        restaurant_menu
                    </span>
                    <span className="text-primary font-bold uppercase text-sm tracking-tight">
                        Khana Khazana
                    </span>
                </div>
            </header>

            {/* Main */}
            <main className="flex-grow flex items-center justify-center px-6 py-10">
                <div className="w-full max-w-md bg-surface-dark border border-white/5 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden">

                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>

                    <div className="text-center mb-10">
                        <h1 className="text-3xl md:text-4xl font-bold mb-3">
                            Welcome back
                        </h1>
                        <p className="text-text-secondary-dark text-sm tracking-wide font-light">
                            Continue your culinary journey.
                        </p>
                    </div>

                    <div className="flex flex-col gap-5">

                        {/* Google Login */}
                        <button
                            onClick={onGoogleLogin}
                            className="w-full h-12 bg-white hover:bg-gray-100 text-black font-semibold rounded-xl flex items-center justify-center gap-3 transition-colors"
                        >
                            Continue with Google
                        </button>

                        {/* Divider */}
                        <div className="relative flex py-2 items-center">
                            <div className="flex-grow border-t border-white/10"></div>
                            <span className="mx-4 text-text-secondary-dark/50 text-xs">
                                OR
                            </span>
                            <div className="flex-grow border-t border-white/10"></div>
                        </div>

                        {/* Email Form */}
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const email = e.target.email.value;
                                onEmailLogin(email);
                            }}
                            className="flex flex-col gap-4"
                        >
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <span className="material-symbols-outlined text-text-secondary-dark group-focus-within:text-primary transition-colors text-xl">
                                        mail
                                    </span>
                                </div>

                                <input
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="Continue with Email"
                                    className="w-full bg-background-dark/50 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-text-secondary-dark focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm hover:border-white/20"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full h-12 border border-white/20 hover:border-primary hover:text-primary rounded-xl transition-all duration-300"
                            >
                                Continue with Email
                            </button>
                        </form>
                    </div>

                    <div className="mt-8 text-center">
                        <button className="text-sm text-text-secondary-dark hover:text-primary transition-colors">
                            New here? <span className="text-primary font-medium">Start a memory</span>
                        </button>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-6 text-center text-xs text-text-secondary-dark/30">
                © Khana Khazana AI Assistant
            </footer>
        </div>
    );
}