import { NextApiRequest, NextApiResponse } from "next";

import { generateCodemod } from "@/utils/generateCodemod";
import { ErrorResponse } from "@/types";

type Codemod = string;

async function getCodemod(
  req: NextApiRequest,
  res: NextApiResponse<Codemod | ErrorResponse>,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { replacements, namespace } = req.body;

  try {
    const result = await generateCodemod(replacements, namespace);
    res.status(200).json(result);
  } catch (error: any) {
    console.error("Error processing request:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

export default getCodemod;
