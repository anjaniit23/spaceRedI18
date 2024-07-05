import React, { useState, useMemo, useCallback } from "react";
import { List, ListItem } from "@sprinklrjs/spaceweb/list";
import { GroupItem } from "./GroupItem";
import { Box } from "@sprinklrjs/spaceweb/box";
import { Group, LabelsSelectionState } from "@/types";

type Stage = { selections: any; representative: string };

export const GroupsList = ({
  groups,
  activeStageIndex,
  stages,
  onAction,
}: {
  groups: Group[];
  activeStageIndex: number;
  stages: Stage[];
  onAction: (action: any) => void;
}) => {
  const allGroups = useMemo(() => {
    const [miscellaneousGroup, otherGroups] = groups.reduce(
      ([misc, others]: [misc: any, others: any], group: any) => {
        if (group[1].length === 1) {
          misc.push(group[1][0]);
        } else {
          others.push(group);
        }
        return [misc, others];
      },
      [[], []],
    );
    if (miscellaneousGroup.length > 0) {
      return [...otherGroups, ["Miscellaneous", miscellaneousGroup]];
    }
    return otherGroups;
  }, [groups]);

  const allLabelsStateMap: Array<LabelsSelectionState> = useMemo(() => {
    return allGroups.map((group: Group) => {
      return group[1].map((label: string) => {
        let isChecked = false;
        let isActiveInCurrentStage = false;
        let stageIndex = -1;

        stages.forEach((stage, index) => {
          if (stage.selections.some((item: any) => item === label)) {
            isChecked = true;
            if (index === activeStageIndex) {
              isActiveInCurrentStage = true;
            }
            stageIndex = index;
          }
        });

        return {
          label,
          checked: isChecked,
          isActiveInCurrentStage,
          stageIndex,
        };
      });
    });
  }, [allGroups, stages, activeStageIndex]);

  const [expandedGroupsMap, setExpandedGroupsMap] = useState<
    Record<string, boolean>
  >({});

  const handleGroupClick = useCallback((index: number) => {
    setExpandedGroupsMap((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  }, []);

  return (
    <Box className="flex flex-col gap-2 w-full spr-ui-06 overflow-hidden">
      <List className="spr-ui-06 overflow-auto border-0">
        {allGroups.map((groups: any, index: number) => {
          const [groupRepresentative] = groups;
          const groupHeader =
            groupRepresentative === "Miscellaneous"
              ? "Miscellaneous"
              : `Group - ${index + 1}`;

          return (
            <ListItem key={groupRepresentative} className="spr-ui-06 w-full">
              <GroupItem
                groupHeader={groupHeader}
                groupRepresentative={groupRepresentative}
                labelSelectionState={allLabelsStateMap[index]}
                active={!!expandedGroupsMap[index]} //expanded state
                onAction={onAction}
                index={index}
                handleGroupClick={handleGroupClick}
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};
