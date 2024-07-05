import fs from "fs/promises";
import { readFromFile } from './files/io.js';

export async function getNamespacesFileNames() {
  try {
    const pwd = process.cwd();
    const directoryPath = `${pwd}/i18n/en_US`;
    const fileNames = await fs.readdir(directoryPath);
    return fileNames;
  } catch (err) {
    throw err;
  }
};


export async function getNamespaceFileContent(fileName) {
  const pwd = process.cwd();
  const namespaceFilePath = `${pwd}/i18n/en_US/${fileName}`;
  try {
    const namespaceFileContent = await readFromFile(namespaceFilePath);
    const labels = Object.keys(namespaceFileContent);
    return labels;
  } catch (error) {
    throw error;
  }
} 