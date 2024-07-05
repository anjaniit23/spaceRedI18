import globals from "globals";
import pluginJs from "@eslint/js";
import { nsplugin } from "./rules/nsPlugin.js";

export default [
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  {
    plugins: {
      nsBlocker: nsplugin,
    },
    rules: {
      semi: "error",
      "prefer-const": "error",
      "consistent-return": "error",
      "nsBlocker/block-namespace": ["error", ["common", "workflow", "unknown"]], //user can specify ns which he want to block
    },
  },
  {
    ignores: [
      "rules/**",
      ".git/**",
      "*.mjs",
      "/node_modules/",
      "/package-lock.json",
      "/package.json",
      "utils/**",
    ],
  },
];
