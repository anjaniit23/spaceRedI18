import { Input } from "@sprinklrjs/spaceweb/input";
import { FormControl } from "@sprinklrjs/spaceweb/form-control";

import { ChangeEvent, memo, useCallback, useState } from "react";

const RepresentativeInput = ({
  onInputChange,
  initialValue = "",
}: {
  initialValue?: string;
  onInputChange: any;
}) => {
  const [input, setInput] = useState(() => initialValue);

  const onChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setInput(value);
    },
    [],
  );

  const debouncedOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onInputChange(event.target.value);
    },
    [onInputChange],
  );

  return (
    <FormControl label="Representative">
      <Input
        size="md"
        variant="default"
        value={input}
        placeholder="Representative for selected labels"
        onChange={onChangeHandler}
        debounceInterval={300}
        animate
        debouncedOnChange={debouncedOnChange}
      />
    </FormControl>
  );
};
RepresentativeInput.displayName = "RepresentativeInput";
const MemoisedInput = memo(RepresentativeInput);

export { MemoisedInput as RepresentativeInput };
