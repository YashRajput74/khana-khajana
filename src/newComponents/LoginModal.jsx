export default function LoginModal({ onGoogleLogin, onEmailLogin }) {
    return (
        <div className="min-h-screen bg-background-dark text-white font-sans antialiased flex flex-col relative selection:bg-primary selection:text-black">

            {/* Header */}
            <header className="w-full pt-8 pb-4 flex justify-center items-center">
                <div className="flex items-center gap-2 opacity-90 hover:opacity-100 transition-opacity cursor-pointer">
                    <span className="material-symbols-outlined text-primary text-2xl">
                        restaurant_menu
                    </span>

                    <span className="text-sm font-bold tracking-tight text-primary uppercase">
                        Khana Khazana
                    </span>
                </div>
            </header>

            {/* Main */}
            <main className="flex-1 flex items-center justify-center px-6">
                <div className="w-full max-w-md">
                    <div className="bg-surface-dark border border-white/5 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden">

                        {/* Glow */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>

                        {/* Title */}
                        <div className="text-center mb-10">
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
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
                                className="w-full h-12 bg-white hover:bg-gray-100 text-black font-semibold rounded-xl flex items-center justify-center gap-3 transition-colors duration-200"
                            >

                                {/* Google Icon */}
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>

                                Continue with Google
                            </button>

                            {/* Divider */}
                            <div className="relative flex py-2 items-center">
                                <div className="flex-grow border-t border-white/10"></div>

                                <span className="flex-shrink-0 mx-4 text-text-secondary-dark/50 text-xs">
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

                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                            <span className="material-symbols-outlined text-text-secondary-dark text-[20px] leading-none">
                                                mail
                                            </span>
                                        </div>

                                    </div>

                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        placeholder="Continue with Email"
                                        className="w-full h-12 bg-background-dark/50 border border-white/10 rounded-xl pl-11 pr-4 text-white placeholder-text-secondary-dark focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm hover:border-white/20"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full h-12 bg-transparent border border-white/20 hover:border-primary hover:text-primary text-white font-medium rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
                                >
                                    Continue with Email
                                </button>

                            </form>
                        </div>

                        {/* Signup */}
                        <div className="mt-8 text-center">
                            <button className="text-sm text-text-secondary-dark hover:text-primary transition-colors duration-200">
                                New here?{" "}
                                <span className="text-primary hover:text-primary-light font-medium">
                                    Start a memory
                                </span>
                            </button>
                        </div>

                    </div>
                </div>



            </main>

            {/* Footer */}
            <footer className="w-full py-6 text-center text-xs text-text-secondary-dark/30">
                © Khana Khazana AI Assistant
            </footer>

        </div>
    );
}