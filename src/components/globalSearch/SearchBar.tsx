import React, { useState } from "react";
import { Select, Option } from "@sprinklrjs/spaceweb/select";
import { Button } from "@sprinklrjs/spaceweb/button";
import { Input } from "@sprinklrjs/spaceweb/input";
import { Box } from "@sprinklrjs/spaceweb/box";
import { SearchResults } from "./SearchResults";

export const SearchBar = ({ options }: { options: Option[] }): JSX.Element => {
  const [inputText, setInputText] = useState<string>("");
  const [result, setResult] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState<Option[]>([]);
  const handleInputChange = (e: any) => {
    setInputText(e.target.value);
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await fetch("/api/find-similar-groups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputSentence: inputText,
          namespaces: value.map(({ label }) => label),
        }),
      });

      const resultData = await response.json();
      setResult(resultData);
      setLoading(false);
    } catch (error) {
      setResult({ message: "An error occurred" });
    }
  };

  return (
    <Box className="w-full h-full flex flex-col">
      <form onSubmit={handleFormSubmit}>
        <Box className="flex gap-3 m-2">
          <Select
            options={options}
            backspaceRemoves
            multi
            value={value}
            size="md"
            required
            type="select"
            placeholder="Select Namespace"
            onChange={(params: any) => setValue(params.value)}
          />
          <Input
            size="md"
            value={inputText}
            onChange={handleInputChange}
            debounceInterval={200}
            style="w-3/4"
            animate
            placeholder="Enter a sentence"
          />
          <Button
            type="submit"
            disabled={!(value.length > 0 && inputText)}
            isLoading={loading}
            aria-label="Find Similar Groups"
          >
            Find
          </Button>
        </Box>
      </form>

      {result ? <SearchResults result={result} /> : null}
    </Box>
  );
};
