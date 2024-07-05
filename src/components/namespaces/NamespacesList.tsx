import React, { useState } from "react";

import { List, ListItem } from "@sprinklrjs/spaceweb/list";
import { Box } from "@sprinklrjs/spaceweb/box";
import { NamespaceItem } from "./NamespaceItem";
import { Select } from "@sprinklrjs/spaceweb/select";

import type { FileInfo } from "@/types";
import { Button } from "@sprinklrjs/spaceweb/button";

export const NamespacesList = ({ files }: { files: FileInfo[] }) => {
  const options = [
    { label: "Less than 10 labels", id: 1 },
    { label: "More than 10 labels", id: 2 },
    { label: "Less than 5KB", id: 3 },
    { label: "More than 100 KB", id: 4 },
  ];

  const [fileteredFiles, setFilteredFiles] = useState(files);
  const [value, setValue] = useState([]);

  const handleFiltering = () => {
    if (value.length === 0) {
      setFilteredFiles(files);
      return;
    }

    const filteredSet = new Set<FileInfo>();

    value.forEach((filterOption: any) => {
      switch (filterOption.id) {
        case 1:
          files
            .filter((file) => file.entriesCount < 10)
            .forEach((file) => filteredSet.add(file));
          break;
        case 2:
          files
            .filter((file) => file.entriesCount > 10)
            .forEach((file) => filteredSet.add(file));
          break;
        case 3:
          files
            .filter((file) => file.fileSize < 5 * 1024)
            .forEach((file) => filteredSet.add(file));
          break;
        case 4:
          files
            .filter((file) => file.fileSize > 100 * 1024)
            .forEach((file) => filteredSet.add(file));
          break;
        default:
          break;
      }
    });

    setFilteredFiles(Array.from(filteredSet));
  };

  return (
    <Box className="w-full h-full flex flex-col gap-2 overflow-hidden items-center">
      <Box className="flex gap-3 m-2 w-1/2 justify-center pt-3">
        <Select
          intent="default"
          options={options}
          value={value}
          size="md"
          required
          multi
          type="select"
          placeholder="Select Filter"
          onChange={(params: any) => setValue(params.value)}
        />
        <Button intent="default" size="sm" onClick={handleFiltering}>
          {" "}
          Filter{" "}
        </Button>
      </Box>

      <List
        className="bg-transparent rounded-8 w-full flex-grow overflow-auto border-0"
        virtual
      >
        {fileteredFiles.map((file: FileInfo) => {
          return (
            <ListItem key={file.name} className="bg-transparent w-full">
              <NamespaceItem
                name={file.name}
                entries={file.entriesCount}
                size={file.fileSize}
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};
