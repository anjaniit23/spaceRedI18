import fs from "fs";
import { safeStringify } from "./safeStringify.js";

export const readFromFile = (path) => {
  try {
    const fileContent = fs.readFileSync(path, "utf8");
    return JSON.parse(fileContent);
  } catch (error) {
    throw error;
  }
};

export const writeToFile = (path, content) => {
  const stringifiedContent = safeStringify(content);
  fs.writeFileSync(path, stringifiedContent);
};
