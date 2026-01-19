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
                },
                gray: {
                    50: '#F9FAFB',
                    100: '#F3F4F6',
                    200: '#E5E7EB',
                    300: '#D1D5DB',
                    400: '#9CA3AF',
                    500: '#6B7280',
                    600: '#4B5563',
                    700: '#374151',
                    800: '#1F2937',
                    900: '#111827',
                }
            },
            fontFamily: {
                sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'Roboto', 'system-ui', 'sans-serif'],
            },
            boxShadow: {
                'soft': '0 1px 3px rgba(0, 0, 0, 0.02)',
                'soft-lg': '0 2px 8px rgba(0, 0, 0, 0.03)',
                'soft-hover': '0 4px 12px rgba(0, 0, 0, 0.05)',
            },
            borderRadius: {
                '2xl': '1rem',
                '3xl': '1.5rem',
            },
        },
    },
    plugins: [],
}
