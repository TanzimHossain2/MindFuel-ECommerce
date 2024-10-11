import type { UserConfig } from "@commitlint/types";

const config: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "body-leading-blank": [2, "always"], // enforce a blank line between subject and body
    "footer-leading-blank": [2, "always"], // enforce a blank line between body and footer
    "header-max-length": [2, "always", 100], // enforce a maximum header length of 100 characters
    "body-empty": [2, "never"], // enforce to write a body
    "subject-empty": [2, "never"], // enforce a non-empty subject
    "subject-full-stop": [2, "never", "."], // enforce no trailing period in subject
    "type-empty": [2, "never"], // enforce a non-empty type
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "test",
        "security",
        "cleanup",
        "build",
        "ci",
        "config",
        "merge",
        "deploy",
        "init",
        "remove",
        "add",
        "minor",
        "major",
        "breaking",
      ],
    ],
  },
};

export default config;
