import ThemeToggle from "./themeToggle";

export default function Footer () {
    const year = new Date().getFullYear();
    return (
        <footer className="bg-slate-800 py-4 mt-7">
            <div className="container mx-auto px-4">
                <p className="text-center tracking-wide text-gray-400 text-sm mb-3">
                    &copy; {year} Chronicles. All rights reserved.
                </p>
                <p className="text-center tracking-wide text-gray-400 text-sm">
                    Created by Veekthor
                </p>
                    <ThemeToggle />
                </div>
        </footer>
    );
};
