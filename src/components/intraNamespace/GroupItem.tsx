import * as React from "react";

import { Box } from "@sprinklrjs/spaceweb/box";
import { IconButton } from "@sprinklrjs/spaceweb/button";
import { Collapse } from "@sprinklrjs/spaceweb/transitions/collapse";
import { Typography } from "@sprinklrjs/spaceweb/typography";
import ChevronDownIcon from "@sprinklrjs/spaceweb/icon/components/chevron-down";
import { chevronStyles } from "@sprinklrjs/spaceweb/helpers/commonStyles";
import { Checkbox } from "@sprinklrjs/spaceweb/checkbox";
import { StatefulTooltip } from "@sprinklrjs/spaceweb/tooltip";
import { getCheckboxOverrides } from "./overrides";
import { SimilarLabelCountTag } from "../tags/SimilarLabelCountTag";
import { LabelsSelectionState } from "@/types";

const hasHtmlTags = (label: string): boolean => {
  const pattern = /<[^<>]+>.*?<\/[^<>]+>|<[^<>]+\/>/g;
  return pattern.test(label);
};

const hasMoreThanOneVariable = (label: string): boolean => {
  const Pattern = /\{\{.*?\}\}/g;
  const matches = label.match(Pattern);
  return !!(matches && matches.length > 1);
};

const GroupItem = ({
  groupHeader,
  groupRepresentative,
  active,
  labelSelectionState, // strikethrough
  onAction,
  handleGroupClick,
  index,
}: {
  groupHeader: string;
  groupRepresentative: string;
  active: boolean;
  onAction: (action: any) => void;
  labelSelectionState: LabelsSelectionState;

  index: number;
  handleGroupClick: any;
}) => {
  const onCheckboxChange = React.useCallback(
    (labelCurrState: any) => (event: any) => {
      const checked = event.target.checked;
      onAction({
        type: "UPDATE_LABEL_SELECTIONS",
        payload: { ...labelCurrState, checked },
      });
    },
    [onAction],
  );

  return (
    <>
      <Box
        className="w-full flex items-center"
        onClick={() => handleGroupClick(index)}
      >
        <Box className="flex justify-between items-center rounded-8 p-2 spr-tag w-full">
          <Box className="flex items-center gap-2">
            <Typography variant="display-20" className="text-16">
              {groupHeader}
            </Typography>
            <SimilarLabelCountTag count={labelSelectionState?.length} />
            <Typography variant="body-12" $as="span">
              ({groupRepresentative})
            </Typography>
          </Box>

          <IconButton size="xxs" shape="round" aria-label="Click to see labels">
            <ChevronDownIcon
              className={[chevronStyles, "spr-icon-01"]}
              $isOpen={active}
            />
          </IconButton>
        </Box>
      </Box>

      <Collapse visible={active} duration={30}>
        <Box className="p-2">
          <Typography className="text-20">
            {labelSelectionState?.map(
              ({ label, checked, isActiveInCurrentStage, stageIndex }: any) => {
                const isChecked = checked && !isActiveInCurrentStage;
                // to compute disabled state of checkbox other than stage part.
                const flag1 = hasMoreThanOneVariable(label);
                const flag2 = hasHtmlTags(label);
                const disabled = flag1 || flag2;

                const checkBoxEl = (
                  <Checkbox
                    checked={checked && isActiveInCurrentStage}
                    onChange={onCheckboxChange({
                      label,
                      checked,
                      isActiveInCurrentStage,
                      stageIndex,
                    })}
                    disabled={flag1 || flag2}
                    overrides={getCheckboxOverrides(isChecked, disabled)}
                  >
                    {label}
                  </Checkbox>
                );

                return (
                  <Box className="flex items-center" key={label}>
                    {disabled || isChecked ? (
                      <StatefulTooltip
                        triggerType="hover"
                        content={
                          isChecked
                            ? `Label is used in stage ${stageIndex + 1}`
                            : flag1
                              ? "more than one interpolated label is there"
                              : flag2
                                ? "html tag is there"
                                : ""
                        }
                      >
                        <Box>{checkBoxEl}</Box>
                      </StatefulTooltip>
                    ) : (
                      checkBoxEl
                    )}
                  </Box>
                );
              },
            )}
          </Typography>
        </Box>
      </Collapse>
    </>
  );
};

const MemoizedGroup = React.memo(GroupItem);

export { MemoizedGroup as GroupItem };
