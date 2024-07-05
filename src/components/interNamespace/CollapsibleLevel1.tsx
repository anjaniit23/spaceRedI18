import { Box } from "@sprinklrjs/spaceweb/box";
import { IconButton } from "@sprinklrjs/spaceweb/button";
import { Collapse } from "@sprinklrjs/spaceweb/transitions/collapse";
import { Typography } from "@sprinklrjs/spaceweb/typography";
import ChevronDownIcon from "@sprinklrjs/spaceweb/icon/components/chevron-down";
import { chevronStyles } from "@sprinklrjs/spaceweb/helpers/commonStyles";
import { BaseButton } from "@sprinklrjs/spaceweb/base-button";
import { SentenceGroups } from "./SentenceGroups";

export const CollapsibleLevel1 = ({
  header,
  content,
  id,
  active,
  onGroupClick,
}: {
  header: string;
  content: string[];
  id: number;
  active: boolean;
  onGroupClick: () => void;
}) => (
  <Box className="w-full flex flex-col">
    <BaseButton
      $as="div"
      onClick={onGroupClick}
      className="w-full flex justify-between items-center rounded-8 pl-4 spr-tag mx-0.75"
    >
      <Box className="flex items-center w-full">
        <Typography variant="display-20" className="text-16">
          {header}
        </Typography>
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
        <SentenceGroups result={content} />
      </Box>
    </Collapse>
  </Box>
);
