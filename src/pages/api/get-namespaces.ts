import fs from "fs";
import path from "path";

import type { NextApiRequest, NextApiResponse } from "next";
import type { ErrorResponse, FileInfo } from "@/types";

import { countKeys } from "@/utils/files/countKeys";

const buildFileStats = (
  filePath: string,
): Pick<FileInfo, "entriesCount" | "fileSize"> => {
  const fileContent = fs.readFileSync(filePath, "utf8");

  const jsonObject = JSON.parse(fileContent);
  const entriesCount = countKeys(jsonObject);

  return {
    entriesCount,
    fileSize: Buffer.byteLength(fileContent, "utf8"),
  };
};

async function getNamespaces(
  req: NextApiRequest,
  res: NextApiResponse<FileInfo[] | ErrorResponse>,
) {
  const pwd = process.cwd();
  const directoryPath = `${pwd}/i18n/en_US`;
  const { searchQuery } = req.body;
  const shouldSearch = !!searchQuery;

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).json({ message: "Unable to scan folder" });
    }

    const jsonFiles = files.filter((file) => path.extname(file) === ".json");
    const fileData = jsonFiles
      .reduce((responseArr, fileName) => {
        const namespaceName = fileName.split(".json")[0];
        const filePath = path.join(directoryPath, fileName);
        const fileStats = buildFileStats(filePath);

        const fileInfo = {
          fileName,
          name: namespaceName,
          ...fileStats,
        };

        if (shouldSearch) {
          if (namespaceName.includes(searchQuery)) {
            responseArr.push(fileInfo);
          }
        } else {
          responseArr.push(fileInfo);
        }

        return responseArr;
      }, [] as FileInfo[])
      .sort((a, b) => b.fileSize - a.fileSize);

    res.json(fileData);
  });
}

export default getNamespaces;
