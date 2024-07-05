import fs from "fs";
import path from "path";

import { getGroups } from "../groups/getGroups.js";

import { generateKey } from "../generateKey.js";
import { getNamespacesFileNames } from "../namespaces.js";
import { safeStringify } from "../files/safeStringify.js";
import { readFromFile } from "../files/io.js";

const createGroupsFile = (groupsList, path) => {
  const fileContent = groupsList.reduce((acc, groups) => {
    const key = generateKey();
    return {
      ...acc,
      [key]: groups,
    };
  }, {});

  console.log(`writing groups to ${path}`);
  fs.writeFileSync(path, safeStringify(fileContent));
};

export const generateGroupsFile = async (filename, cutoff) => {
  const pwd = process.cwd();
  const groupsFilePath = `${pwd}/groups/${cutoff}/${filename}`;

  try {
    await fs.promises.access(groupsFilePath, fs.constants.F_OK);
    console.log("already have groups");
    return readFromFile(groupsFilePath);
  } catch (cachedFileNotFoundError) {
    console.log("creating sorry");
    if (cachedFileNotFoundError.code === "ENOENT") {
      try {
        const groupsFileDirectoryPath = path.dirname(groupsFilePath);
        await fs.promises.mkdir(groupsFileDirectoryPath, { recursive: true });

        const groups = await getGroups(filename, cutoff);
        createGroupsFile(groups, groupsFilePath);
        return readFromFile(groupsFilePath);
      } catch (err) {
        throw err;
      }
    }
  }
};

export async function generateGroupsFiles(cutoff = 0.75) {
  console.log(`Generating Groups with ${cutoff}....`);
  try {
    const files = await getNamespacesFileNames();
    console.log("Namespace files read complete. Started on groups generation");
    const promises = files.map((file) => generateGroupsFile(file, cutoff));
    await Promise.all(promises);
    console.log("Groups are generated successfully!");
  } catch (e) {
    throw e;
  }
}
