import ThemeToggle from "./themeToggle";
import Provider from "./provider";

export default function Footer () {
    return (
        <footer className="bg-gray-800 py-4 mt-7">
            <div className="container mx-auto px-4">
                <p className="text-center tracking-wide text-gray-400 text-sm mb-3">
                    &copy; 2023 Chronicles. All rights reserved.
                </p>
                <p className="text-center tracking-wide text-gray-400 text-sm">
                    Created by Veekthor
                </p>
                <Provider>
                    <ThemeToggle />
                </Provider>
                </div>
        </footer>
    );
};
