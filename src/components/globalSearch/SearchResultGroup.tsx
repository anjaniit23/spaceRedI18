import { Box } from "@sprinklrjs/spaceweb/box";
import { IconButton } from "@sprinklrjs/spaceweb/button";
import { Collapse } from "@sprinklrjs/spaceweb/transitions/collapse";
import { Typography } from "@sprinklrjs/spaceweb/typography";
import ChevronDownIcon from "@sprinklrjs/spaceweb/icon/components/chevron-down";
import { chevronStyles } from "@sprinklrjs/spaceweb/helpers/commonStyles";
import { BaseButton } from "@sprinklrjs/spaceweb/base-button";

import { SimilarityScoreTag } from "../tags/SimilarityScoreTag";

export const SearchResultGroup = ({
  header,
  content,
  id,
  score,
  active,
  onGroupClick,
}: {
  header: string;
  content: string[];
  id: number;
  score: number;
  active: boolean;
  onGroupClick: () => void;
}) => (
  <Box className="w-full flex flex-col">
    <BaseButton
      $as="div"
      onClick={onGroupClick}
      className="flex justify-between items-center rounded-6 py-1 px-2 spr-tag"
    >
      <Box className="flex items-center gap-2">
        <Typography variant="body-16" weight="semibold">
          {header}
        </Typography>
        <SimilarityScoreTag score={score} />
      </Box>

      <IconButton size="xxs" shape="round" aria-label="Click to see labels">
        <ChevronDownIcon
          className={[chevronStyles, "spr-icon-01"]}
          $isOpen={active}
        />
      </IconButton>
    </BaseButton>

    <Collapse
      key={id}
      visible={active}
      duration={80}
      className="flex flex-col gap-1 text-14 pl-4 pt-2"
    >
      {content.map((item, index) => (
        <Typography key={index}>{item}</Typography>
      ))}
    </Collapse>
  </Box>
);
