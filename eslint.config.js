import js from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import eslintPluginReact from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import { globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    ignores: ["vite-env.d.ts"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      eslintPluginPrettierRecommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
      eslintPluginReact.configs.flat.all,
      eslintPluginUnicorn.configs.all,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "prettier/prettier": "error",
      "react/jsx-filename-extension": [1, { extensions: [".tsx"] }],
      "react/jsx-indent": "off",
      "react/jsx-no-literals": "off",
      "react/jsx-one-expression-per-line": "off",
      "react/react-in-jsx-scope": "off",
      "unicorn/filename-case": [
        "error",
        {
          cases: {
            pascalCase: true,
            camelCase: true,
          },
        },
      ],
    },
  },
]);
