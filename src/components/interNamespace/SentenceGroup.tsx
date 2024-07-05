import { Box } from "@sprinklrjs/spaceweb/box";
import { IconButton } from "@sprinklrjs/spaceweb/button";
import { Collapse } from "@sprinklrjs/spaceweb/transitions/collapse";
import { Typography } from "@sprinklrjs/spaceweb/typography";
import ChevronDownIcon from "@sprinklrjs/spaceweb/icon/components/chevron-down";
import { BaseButton } from "@sprinklrjs/spaceweb/base-button";
import { chevronStyles } from "@sprinklrjs/spaceweb/helpers/commonStyles";

import { SimilarityScoreTag } from "../tags/SimilarityScoreTag";

export const SentenceGroup = ({
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
}) => {
  return (
    <Box className="w-full flex flex-col">
      <BaseButton
        $as="div"
        onClick={onGroupClick}
        className="w-full flex justify-between items-center rounded-8 pl-6 spr-tag mx-2"
      >
        <Box className="flex items-center w-full">
          <Typography variant="display-20" className="text-16 pr-2">
            {header}
          </Typography>
          <SimilarityScoreTag score={score} />
        </Box>

        <IconButton shape="round" aria-label="Click to see labels">
          <ChevronDownIcon
            className={[chevronStyles, "spr-icon-01 h-3 w-3"]}
            $isOpen={active}
          />
        </IconButton>
      </BaseButton>
      <Collapse key={id} visible={active} duration={30}>
        <Box className="p-2">
          <Typography className="text-14">
            {content.map((item, index) => (
              <Box className="pl-6" key={index}>
                {item}
              </Box>
            ))}
          </Typography>
        </Box>
      </Collapse>
    </Box>
  );
};
