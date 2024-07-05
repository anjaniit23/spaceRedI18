import * as React from "react";
import { Box } from "@sprinklrjs/spaceweb/box";
import { List, ListItem } from "@sprinklrjs/spaceweb/list";
import { CollapsibleLevel1 } from "./CollapsibleLevel1";

export const SentenceGroupCollapisble = ({ result }: { result: any }) => {
  const [groupsState, setGroupsState] = React.useState<Record<number, boolean>>(
    {},
  );
  const handleGroupClick = (index: number) => {
    setGroupsState((previousGroupsState) => ({
      ...previousGroupsState,
      [index]: !previousGroupsState[index],
    }));
  };

  return (
    <Box className="w-full h-full flex-auto overflow-auto">
      <List className=" rounded-8 w-full ">
        {result.map((item: any, index: number) => {
          return (
            <ListItem key={index}>
              <CollapsibleLevel1
                header={item[0]}
                content={item[1]}
                id={index}
                active={!!groupsState[index]}
                onGroupClick={() => handleGroupClick(index)}
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};
