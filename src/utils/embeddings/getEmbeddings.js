import fs, { promises } from "fs";

import { readFromFile } from "../files/io.js";
import { createEmbeddingsFile } from './generateEmbeddings.js';

export const getEmbeddings = async (fileName) => {
  try {
    const pwd = process.cwd();
    const embeddingsFilePath = `${pwd}/embeddings/${fileName}`;
    await promises.access(embeddingsFilePath, fs.constants.F_OK);
    return readFromFile(embeddingsFilePath);
  } catch (err) {
    console.log(`Cached embeddings for ${fileName} not found.`);
    return createEmbeddingsFile(fileName);
  }
};
