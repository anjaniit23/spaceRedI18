import * as React from "react";
import { Box } from "@sprinklrjs/spaceweb/box";
import { List, ListItem } from "@sprinklrjs/spaceweb/list";

import { SentenceGroup } from "./SentenceGroup";

export const SentenceGroups = ({ result }: { result: any }) => {
  const [activeGroups, setActiveGroups] = React.useState(
    Array(result?.length).fill(false),
  );
  const handleGroupClick = (index: number) => {
    setActiveGroups((prev) =>
      prev.map((active, i) => (i === index ? !active : active)),
    );
  };

  const items = result.map((item: any, index: number) => ({
    id: index,
    header: item.namespace,
    content: item.matchedGroup,
    score: item.highestScore,
  }));

  return (
    <Box className="spr-ui-06">
      <List className="border-2 rounded-8">
        {items?.map(
          ({
            header,
            content,
            id,
            score,
          }: {
            header: string;
            content: string[];
            id: number;
            score: number;
          }) => {
            return (
              <ListItem key={id} className="p-1">
                <SentenceGroup
                  header={header}
                  content={content}
                  id={id}
                  score={score}
                  active={activeGroups[id]}
                  onGroupClick={() => handleGroupClick(id)}
                />
              </ListItem>
            );
          },
        )}
      </List>
    </Box>
  );
};
