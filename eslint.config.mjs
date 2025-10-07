import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  {
    rules: {
      // Allow any type for work-in-progress 3D components
      "@typescript-eslint/no-explicit-any": "warn",
      // Allow unused vars in WIP components
      "@typescript-eslint/no-unused-vars": "warn",
      // Allow missing image optimization warnings
      "@next/next/no-img-element": "warn",
    },
  },
];

export default eslintConfig;
