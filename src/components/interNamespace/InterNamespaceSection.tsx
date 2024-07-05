import { useState } from "react";
import Link from "next/link";
import { Select } from "@sprinklrjs/spaceweb/select";
import { Button } from "@sprinklrjs/spaceweb/button";
import { Box } from "@sprinklrjs/spaceweb/box";
import { Typography } from "@sprinklrjs/spaceweb/typography";

const SimilarButton = ({ value }: { value: any }) => {
  const namespaces = value
    ?.map(({ label }: { label: string }) => label)
    .join("+");

  return (
    <Link href={`/inter-namespace/${namespaces}`}>
      <Button size="md" animate>
        go
      </Button>
    </Link>
  );
};

export const InterNamespaceSection = ({ files }: { files: string[] }) => {
  const [value1, setValue1] = useState<any>([
    { label: "common", id: "common.json" },
    { label: "error", id: "error.json" },
    { label: "workflow", id: "worlflow.json" },
    { label: "spaceweb", id: "spaceweb.json" },
  ]);
  const [value2, setValue2] = useState<any>([]);

  const transformedFiles = files.map((file) => ({
    label: file.substring(0, file.length - 5),
    id: file,
  }));

  const filterOptions = (options: any, selectedValues: any) => {
    return options.filter(
      (option: any) =>
        !selectedValues.some((value: any) => value.id === option.id),
    );
  };

  const optionsForValue1 = filterOptions(transformedFiles, value2);
  const optionsForValue2 = filterOptions(transformedFiles, value1);

  return (
    <Box className="w-full flex flex-col items-center p-5">
      <Typography className="text-32">
        Choose namespaces in which you want to find similar label groups and for
        which
      </Typography>

      <Box className="flex gap-3 m-2 w-full pt-3">
        <Select
          intent="default"
          options={optionsForValue1}
          value={value1}
          size="md"
          required
          multi
          type="select"
          placeholder="Select Namespace"
          onChange={(params: any) => setValue1(params.value)}
        />
        <Select
          intent="default"
          options={optionsForValue2}
          value={value2}
          size="md"
          required
          type="select"
          placeholder="Select Namespace"
          onChange={(params: any) => setValue2(params.value)}
        />
        <SimilarButton value={value1?.concat(value2)} />
      </Box>
    </Box>
  );
};
