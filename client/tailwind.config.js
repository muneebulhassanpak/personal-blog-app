/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        cos: ["Cousine", "monospace"],
        jak: ["Plus Jakarta Sans", "sans-serif"],
      },
      colors: {
        "pale-yellow": "#ffc017",
        "pale-pink": "#FFD1B9",
        "light-gray": "#F2F2F2",
        "light-orange": "#F29727",
        "light-yellow": "#FAE392",
        "dark-green": "#1A5D1A",
      },
      minHeight: {
        "main-section-width": "65vh",
      },
      minWidth: {
        "trending-card-width": "250px",
        "signin-modal-width": "300px",
      },
      maxWidth: {
        "general-card-width": "55%",
      },
    },
  },
  plugins: [],
};
