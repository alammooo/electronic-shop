module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      animation: {
        "pulse-s": "pulse-s 5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        "pulse-s": {
          "0%": { color: "black" },
          "40%": { color: "transparent" },
          "80%": { color: "transparent" },
          "100%": { color: "black" },
        },
      },
    },
  },
  plugins: [require("flowbite/plugin"), require("@tailwindcss/forms")],
}
