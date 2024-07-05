import fs from "fs";

export const readFromFile = (path) => {
  try {
    const stringyfiedcachedData = fs.readFileSync(path, "utf8");
    const cache = JSON.parse(stringyfiedcachedData);
    return cache;
  } catch (error) {
    console.log("Reading file failed with error - ", error);
    return {};
  }
};
