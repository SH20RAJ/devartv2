import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
            typography: {
                DEFAULT: {
                    css: {
                        maxWidth: 'none',
                        color: 'hsl(var(--foreground))',
                        h1: {
                            color: 'hsl(var(--foreground))',
                            fontWeight: '700',
                            fontSize: '2.25rem',
                            lineHeight: '2.5rem',
                            marginTop: '2rem',
                            marginBottom: '1rem',
                        },
                        h2: {
                            color: 'hsl(var(--foreground))',
                            fontWeight: '600',
                            fontSize: '1.875rem',
                            lineHeight: '2.25rem',
                            marginTop: '1.75rem',
                            marginBottom: '0.875rem',
                        },
                        h3: {
                            color: 'hsl(var(--foreground))',
                            fontWeight: '600',
                            fontSize: '1.5rem',
                            lineHeight: '2rem',
                            marginTop: '1.5rem',
                            marginBottom: '0.75rem',
                        },
                        h4: {
                            color: 'hsl(var(--foreground))',
                            fontWeight: '600',
                            fontSize: '1.25rem',
                            lineHeight: '1.75rem',
                            marginTop: '1.25rem',
                            marginBottom: '0.625rem',
                        },
                        p: {
                            marginTop: '1rem',
                            marginBottom: '1rem',
                            lineHeight: '1.75',
                        },
                        a: {
                            color: 'hsl(var(--primary))',
                            textDecoration: 'underline',
                            fontWeight: '500',
                            '&:hover': {
                                color: 'hsl(var(--primary))',
                                opacity: '0.8',
                            },
                        },
                        code: {
                            color: 'hsl(var(--foreground))',
                            backgroundColor: 'hsl(var(--muted))',
                            padding: '0.25rem 0.375rem',
                            borderRadius: '0.375rem',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                        },
                        'code::before': {
                            content: '""',
                        },
                        'code::after': {
                            content: '""',
                        },
                        pre: {
                            backgroundColor: 'hsl(var(--muted))',
                            color: 'hsl(var(--foreground))',
                            padding: '1rem',
                            borderRadius: '0.5rem',
                            overflow: 'auto',
                            fontSize: '0.875rem',
                            lineHeight: '1.5',
                        },
                        'pre code': {
                            backgroundColor: 'transparent',
                            padding: '0',
                            borderRadius: '0',
                            fontSize: 'inherit',
                        },
                        blockquote: {
                            borderLeftWidth: '4px',
                            borderLeftColor: 'hsl(var(--primary))',
                            paddingLeft: '1rem',
                            fontStyle: 'italic',
                            color: 'hsl(var(--muted-foreground))',
                            marginTop: '1.5rem',
                            marginBottom: '1.5rem',
                        },
                        ul: {
                            listStyleType: 'disc',
                            paddingLeft: '1.5rem',
                            marginTop: '1rem',
                            marginBottom: '1rem',
                        },
                        ol: {
                            listStyleType: 'decimal',
                            paddingLeft: '1.5rem',
                            marginTop: '1rem',
                            marginBottom: '1rem',
                        },
                        li: {
                            marginTop: '0.5rem',
                            marginBottom: '0.5rem',
                        },
                        img: {
                            borderRadius: '0.5rem',
                            marginTop: '1.5rem',
                            marginBottom: '1.5rem',
                        },
                        table: {
                            width: '100%',
                            borderCollapse: 'collapse',
                            marginTop: '1.5rem',
                            marginBottom: '1.5rem',
                        },
                        th: {
                            backgroundColor: 'hsl(var(--muted))',
                            padding: '0.75rem',
                            textAlign: 'left',
                            fontWeight: '600',
                            borderBottom: '1px solid hsl(var(--border))',
                        },
                        td: {
                            padding: '0.75rem',
                            borderBottom: '1px solid hsl(var(--border))',
                        },
                        hr: {
                            borderColor: 'hsl(var(--border))',
                            marginTop: '2rem',
                            marginBottom: '2rem',
                        },
                    },
                },
            },
        },
    },
    plugins: [
        require("tailwindcss-animate"),
        require("@tailwindcss/typography"),
    ],
} satisfies Config;

export default config;