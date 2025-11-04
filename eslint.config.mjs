import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript","plugin:react/recommended", "plugin:@typescript-eslint/recommended"],
    rules: {
     "react/no-unescaped-entities": "off",
  "@next/next/no-page-custom-font": "off",
  "@typescript-eslint/no-explicit-any": "off",
  "@typescript-eslint/no-unused-vars": "off",
  "@typescript-eslint/no-wrapper-object-types": "off",
  "react-hooks/exhaustive-deps": "off",
  "@next/next/no-img-element": "off",
  "react/jsx-no-comment-textnodes": "off",
  "eslint-comments/no-unused-disable": "off",
  "react-hooks/rules-of-hooks": "off",
  "react/react-in-jsx-scope": "off",
  "react/prop-types": "off",
  "react/jsx-no-target-blank": "off"

    },
  }),
];

export default eslintConfig;
