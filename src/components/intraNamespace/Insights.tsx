import { calculateJSONSize, formatSize } from "@/utils/files/size";
import { Box } from "@sprinklrjs/spaceweb/box";
import { Typography } from "@sprinklrjs/spaceweb/typography";
import { memo, useMemo } from "react";

const makeObject = (labels: string[]): Record<string, string> => {
  const obj: Record<string, string> = {};
  labels.forEach((item) => {
    obj[item] = item;
  });
  return obj;
};

const calculateInsights = (groups: any) => {
  const allLabels = groups.flatMap((group: any) => group[1]);
  const uniqueRepresentatives = groups.map((group: any) => group[0]);

  const redundancy = (
    ((allLabels.length - uniqueRepresentatives.length) / allLabels.length) *
    100
  ).toFixed(2);

  const maxSizeReduction =
    calculateJSONSize(makeObject(allLabels)) -
    calculateJSONSize(makeObject(uniqueRepresentatives));

  return { redundancy, maxSizeReduction };
};

const Insights = ({
  groups,
  threshold,
}: {
  groups: any;
  threshold: number;
}) => {
  const { redundancy, maxSizeReduction } = useMemo(
    () => calculateInsights(groups),
    [groups],
  );

  return (
    <Box className="p-4 spr-ui-06 border spr-border-03 flex flex-col gap-2">
      <Typography variant="body-16" weight="bold">
        Insights for {threshold} cutoff
      </Typography>
      <Typography variant="body-16" className="spr-text-02">
        1. {redundancy}% redundant labels
      </Typography>
      <Typography variant="body-16" className="spr-text-02">
        2. Size can be reduced by ~{formatSize(maxSizeReduction)}
      </Typography>
    </Box>
  );
};

const MemoisedInsights = memo(Insights);

export { MemoisedInsights as Insights };
