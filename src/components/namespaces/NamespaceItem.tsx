import * as React from "react";

import { Box } from "@sprinklrjs/spaceweb/box";
import { Typography } from "@sprinklrjs/spaceweb/typography";
import { IconButton } from "@sprinklrjs/spaceweb/button";
import OverviewIcon from "@sprinklrjs/spaceweb/icon/components/overview";

import { LabelCountTag } from "../tags/LabelCountTag";
import { FileSizeTag } from "../tags/FileSizeTag";

import { useRouter } from "next/router";

export const NamespaceItem = ({
  name,
  entries,
  size,
}: {
  name: string;
  entries: number;
  size: number;
}) => {
  const router = useRouter();
  return (
    <Box className="flex gap-2 items-center rounded-8 p-2 spr-tag">
      <IconButton
        size="xs"
        onClick={() => router.push(`./intra-namespace/${name}`)}
        shape="round"
        aria-label="See More Details"
      >
        <OverviewIcon />
      </IconButton>
      <Typography variant="display-20">{name}</Typography>
      <LabelCountTag count={entries} />
      <FileSizeTag size={size} />
    </Box>
  );
};
