import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Generated Prisma client — never lint generated code
    "src/generated/**",
    // Legacy vanilla JS — pre-CRM shop scripts
    "public/js/**",
  ]),
  // Legacy shop pages — pre-CRM code, strict TS rules not applicable
  {
    files: [
      "app/(shop)/**",
      "app/carrito/**",
      "app/checkout/**",
      "app/compra/**",
      "app/contacto/**",
      "app/empresa/**",
      "app/productos/**",
      "app/usuario/**",
      "prisma/seed.ts",
    ],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
]);

export default eslintConfig;
