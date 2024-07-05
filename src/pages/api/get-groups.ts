import { NextApiRequest, NextApiResponse } from "next";

import { generateGroupsFile as getGroupsUtil } from "@/utils/groups/generateGroups";

import { ErrorResponse, Group } from "@/types";

async function getGroups(
  req: NextApiRequest,
  res: NextApiResponse<Group[] | ErrorResponse>,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { namespace, cutoff } = req.body;
  try {
    const fileName = `${namespace}.json`;
    const result = await getGroupsUtil(fileName, cutoff);
    res.status(200).json(result as any);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

export default getGroups;
