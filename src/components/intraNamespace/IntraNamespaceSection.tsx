import * as React from "react";
import { useRouter } from "next/navigation";

import { AsyncSelect, Option } from "@sprinklrjs/spaceweb/asyncSelect";
import { Box } from "@sprinklrjs/spaceweb/box";
import { Button } from "@sprinklrjs/spaceweb/button";

const getNamespaces = (
  searchQuery: string,
  inputPage: number,
): Promise<{ options: Option[]; complete: boolean }> =>
  fetch("/api/get-namespaces?", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ searchQuery }),
  }).then(async (response) => ({
    options: await response.json(),
    complete: true,
  }));

export const IntraNamespaceSection = () => {
  const router = useRouter();

  const [value, setValue] = React.useState<Option[]>([]);

  return (
    <Box className="flex items-center justify-around w-3/4 text-11 gap-2">
      <AsyncSelect
        intent="default"
        loadOptions={getNamespaces}
        loadOnMount
        value={value}
        size="md"
        required
        type="select"
        placeholder="Select Namespace"
        labelKey="name"
        valueKey="name"
        onChange={(params: any) => {
          setValue(params.value);
        }}
      />
      <Button
        size="sm"
        animate
        disabled={!value.length}
        onClick={() => {
          router.push(`/intra-namespace/${value[0].name}`);
        }}
      >
        Search
      </Button>
    </Box>
  );
};
