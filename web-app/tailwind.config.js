/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0F1115",
        mist: "#F5F7FA",
        slate: "#1F2937",
        accent: "#3B82F6"
      }
    }
  },
  plugins: []
};
