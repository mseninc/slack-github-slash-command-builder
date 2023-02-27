module.exports = {
  extends: [
    "next/core-web-vitals",
    "plugin:import/recommended",
    "plugin:import/warnings",
    "prettier",
    "plugin:storybook/recommended",
  ],
  rules: {
    "react/jsx-key": "warn",
    "import/order": [
      "warn",
      {
        alphabetize: {
          order: "asc",
        },
      },
    ],
  },
};
