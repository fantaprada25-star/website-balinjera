import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "prettier",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import-x/recommended",
    "plugin:import-x/typescript"
  ),
  {
    settings: {
      react: {
        version: "detect",
      },
      "import-x/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json",
        },
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
    rules: {
      // React Hooks rules
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // Import/Export rules with import-x
      "import-x/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      "import-x/no-unresolved": "error",
      "import-x/no-duplicates": "error",
      "import-x/no-unused-modules": "warn",

      // General rules
      "no-console": "warn",
      "no-debugger": "error",
      "no-duplicate-imports": "error",
      "prefer-const": "error",
      "no-var": "error",
      "react/no-unescaped-entities": "off",

      // Accessibility rules
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/anchor-has-content": "error",
      "jsx-a11y/anchor-is-valid": "error",
      "jsx-a11y/click-events-have-key-events": "warn",
      "jsx-a11y/no-static-element-interactions": "warn",
    },
  },
  {
    ignores: [
      // dependencies
      "node_modules/",
      ".pnp",
      ".pnp.*",

      // testing
      "coverage/",

      // next.js
      ".next/",
      "out/",

      // production
      "build/",
      "dist/",

      // misc
      ".DS_Store",
      "*.pem",

      // debug
      "npm-debug.log*",
      "yarn-debug.log*",
      "yarn-error.log*",
      ".pnpm-debug.log*",

      // local env files
      ".env*",
      "!.env.example",

      // vercel
      ".vercel",

      // typescript
      "*.tsbuildinfo",
      "next-env.d.ts",

      // package managers
      "pnpm-lock.yaml",
      "yarn.lock",
      "package-lock.json",
    ],
  },
];

export default eslintConfig;
