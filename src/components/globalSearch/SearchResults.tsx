import { useState } from "react";
import { Box } from "@sprinklrjs/spaceweb/box";
import { List, ListItem } from "@sprinklrjs/spaceweb/list";
import { SearchResultGroup } from "./SearchResultGroup";

export const SearchResults = ({ result }: { result: any }) => {
  const [groupsState, setGroupsState] = useState<Record<number, boolean>>({});
  const handleGroupClick = (index: number) => {
    setGroupsState((previousGroupsState) => ({
      ...previousGroupsState,
      [index]: !previousGroupsState[index],
    }));
  };

  return result?.length > 0 ? (
    <Box className="spr-ui-06 mt-2 px-3 overflow-auto flex-auto">
      <List>
        {result.map(
          (
            {
              namespace,
              matchedGroup,
              highestScore,
            }: {
              namespace: string;
              matchedGroup: string[];
              highestScore: number;
            },
            index: number,
          ) => (
            <ListItem key={index} className="p-1">
              <SearchResultGroup
                header={namespace}
                content={matchedGroup}
                score={highestScore}
                id={index}
                active={!!groupsState[index]}
                onGroupClick={() => handleGroupClick(index)}
              />
            </ListItem>
          ),
        )}
      </List>
    </Box>
  ) : (
    <Box className="spr-ui-06 w-full flex flex-grow justify-center items-center">
      No Results to show
    </Box>
  );
};
