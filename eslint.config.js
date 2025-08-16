import js from "@eslint/js";
import { globalIgnores } from "eslint/config";
import eslintPluginImport from "eslint-plugin-import";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import eslintPluginReact from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import globals from "globals";
import tseslint from "typescript-eslint";

// eslint-disable-next-line import/no-default-export
export default tseslint.config([
  globalIgnores(["dist"]),
  {
    ignores: ["vite-env.d.ts"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      eslintPluginPrettierRecommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
      eslintPluginImport.flatConfigs.react,
      eslintPluginReact.configs.flat.all,
      eslintPluginUnicorn.configs.all,
    ],
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
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
      "@typescript-eslint/no-explicit-any": "off",
      "import/no-default-export": "error",
      "prettier/prettier": "error",
      "react/forbid-component-props": [
        "error",
        {
          forbid: [
            {
              propName: "className",
              allowedFor: ["Link"],
            },
          ],
        },
      ],
      "react/jsx-filename-extension": ["warn", { extensions: [".tsx"] }],
      "react/jsx-indent": "off",
      "react/jsx-indent-props": "off",
      "react/jsx-no-bind": "off",
      "react/jsx-no-literals": "off",
      "react/jsx-one-expression-per-line": "off",
      "react/prefer-read-only-props": "off",
      "react/react-in-jsx-scope": "off",
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "unicorn/filename-case": [
        "error",
        {
          cases: {
            kebabCase: true,
          },
        },
      ],
      "unicorn/no-keyword-prefix": "off",
    },
  },
]);
