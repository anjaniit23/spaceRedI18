import { Box } from "@sprinklrjs/spaceweb/box";

export function Footer({ pwd }: { pwd: string }) {
  return (
    <Box
      className="text-14 flex flex-row justify-around items-center spr-overlay m-0 w-full"
      style={{ height: "50px" }}
    >
      <Box className="px-2">Upload your locales namespaces json files in:</Box>
      <Box className="py-0 m-0 flex justify-end spr-link text-14">
        {pwd}/_i18next/en_US
      </Box>
    </Box>
  );
}
