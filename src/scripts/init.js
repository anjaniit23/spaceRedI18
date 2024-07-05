import fs from "fs";
import { createEmbeddingsFiles } from "../utils/embeddings/generateEmbeddings.js";
import { generateGroupsFiles } from "../utils/groups/generateGroups.js";

(async function () {
  await createEmbeddingsFiles();

  const pwd = process.cwd();
  try {
    fs.rmSync(`${pwd}/groups`, { recursive: true });
    console.log("groups folder removed.");
  } catch (e) {
    fs.mkdirSync(`${pwd}/groups`);
    console.log("groups folder created.");
  }

  await generateGroupsFiles();
})();
