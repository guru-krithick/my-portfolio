
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"], // Enable dark mode via the 'class' strategy
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        sm: "640px",    // For small devices (phones)
        md: "768px",    // For medium devices (tablets)
        lg: "1024px",   // For large devices (laptops/desktops)
        xl: "1280px",   // For extra large devices
        "2xl": "1400px", // Custom 2xl breakpoint
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-poppins)', 'sans-serif'],  // Update this to use --font-poppins
        playfair: ['var(--font-playfair)', 'serif'],  // Update this for Playfair if needed
        ephesis: ['var(--font-ephesis)', 'sans-serif'],  // If you're using this custom font
      },
      colors: {
        /* Custom Colors */
        'rich_black': {
          DEFAULT: '#04080f',
          100: '#010203',
          200: '#020306',
          300: '#03050a',
          400: '#03070d',
          500: '#04080f',
          600: '#19325d',
          700: '#2d5bab',
          800: '#648ed6',
          900: '#b2c6ea',
        },
        'glaucous': {
          DEFAULT: '#507dbc',
          500: '#507dbc',
        },
        'powder_blue': {
          DEFAULT: '#a1c6ea',
          500: '#a1c6ea',
        },
        'columbia_blue': {
          DEFAULT: '#bbd1ea',
          500: '#bbd1ea',
        },
        'platinum': {
          DEFAULT: '#dae3e5',
          500: '#dae3e5',
        },
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
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
};
