import { NextApiRequest, NextApiResponse } from "next";

import { findSimilarGroup } from "@/utils/groups/findSimilarGroup";
import { Groups } from "@/types";

async function findGroups(req: NextApiRequest, res: NextApiResponse<Groups>) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { inputSentence, namespaces } = req.body;

  try {
    const result = await findSimilarGroup(
      inputSentence,
      namespaces.map((ns: string) => `${ns}.json`),
    );
    res.status(200).json(result);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

export default findGroups;
