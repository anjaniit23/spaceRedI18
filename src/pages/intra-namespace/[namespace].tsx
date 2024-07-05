import { memo } from "react";
import { Box } from "@sprinklrjs/spaceweb/box";
import fs from "fs";

import { formatSize } from "@/utils/files/size";

import { IntraNamespaceTool } from "@/components/intraNamespace/IntraNamespaceTool";
import { Typography } from "@sprinklrjs/spaceweb/typography";

function NamespaceGroups({
  namespace,
  fileSize,
}: {
  namespace: string;
  fileSize: number;
}) {
  return (
    <Box className="flex flex-col w-full h-full">
      <Typography
        variant="h1"
        className="text-center justify-center spr-overlay py-3"
      >
        Redundancy Check in {namespace} (size:{formatSize(fileSize)})
      </Typography>
      <IntraNamespaceTool namespace={namespace} />
    </Box>
  );
}

const MemoisedNameSpaceGroups = memo(NamespaceGroups);
export default MemoisedNameSpaceGroups;

export async function getServerSideProps({
  params,
}: {
  params: { namespace: string };
}) {
  const namespace = params.namespace;
  const pwd = process.cwd();
  const path = `${pwd}/i18n/en_US/${namespace}.json`;
  const fileContent = fs.readFileSync(path, "utf8");
  const fileSize = Buffer.byteLength(fileContent, "utf8");

  return {
    props: {
      namespace,
      fileSize,
    },
  };
}
