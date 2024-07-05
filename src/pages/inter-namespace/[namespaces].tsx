import { Box } from "@sprinklrjs/spaceweb/box";
import { SentenceGroupCollapisble } from "@/components/interNamespace/SentenceGroupCollapisble";
import { interNamespaceGroupGenerator } from "@/utils/interNamespaceChecker";
import fs from "fs";
import { calculateJSONSize } from "@/utils/files/size";
import { Typography } from "@sprinklrjs/spaceweb/typography";

interface NamespaceGroupsProps {
  namespace: string;
  namespaces: string[];
  groups: any[];
  fullSize: number;
  partialSize: number;
  n: number;
  pwd: string;
}

function NamespaceGroups({
  namespace,
  namespaces,
  groups,
  fullSize,
  partialSize,
  n,
}: NamespaceGroupsProps): JSX.Element {
  return (
    <Box className="flex flex-col w-full h-screen ">
      <Typography
        variant="h1"
        className="text-center justify-center spr-overlay py-3"
      >
        Common groups for {namespace} in {namespaces.join(", ")}
      </Typography>

      <Box
        className=" text-16 flex flex-row justify-around items-center w-full"
        style={{ height: "70px" }}
      >
        <Box>
          From this namespace {n} labels can be removed On removing below labels
          we can go from {(fullSize / 1024).toFixed(2)} KB to{" "}
          {((fullSize - partialSize) / 1024).toFixed(2)} KB
        </Box>
      </Box>

      <SentenceGroupCollapisble result={groups} />
    </Box>
  );
}

export async function getServerSideProps({
  params,
}: {
  params: { namespaces: string };
}) {
  const namespaces = params.namespaces.split("+").map((e) => `${e}.json`);
  const namespace = namespaces.pop();
  const groups = await interNamespaceGroupGenerator(namespace, namespaces);

  const pwd = process.cwd();
  const path = `${pwd}/i18n/en_US/${namespace}`;
  const fileContent = fs.readFileSync(path, "utf8");
  const fileSize = Buffer.byteLength(fileContent, "utf8");
  const partialObj: { [key: string]: string } = {};
  groups.forEach((item: any) => {
    partialObj[item[0]] = item[0];
  });

  const labels = groups.map((item) => item[0]);
  const n = labels.length;
  const partialSize = calculateJSONSize(partialObj);

  return {
    props: {
      namespace,
      namespaces,
      groups,
      fullSize: fileSize,
      partialSize,
      n,
    },
  };
}

export default NamespaceGroups;
