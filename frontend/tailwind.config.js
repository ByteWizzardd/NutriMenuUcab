/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                ucab: {
                    primary: '#003366',    // UCAB Navy Blue
                    secondary: '#FFD700',  // UCAB Gold
                    accent: '#00A86B',     // Green for healthy options
                    danger: '#DC2626',     // Red for alerts
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
