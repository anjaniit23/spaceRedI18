import { Tag } from "@sprinklrjs/spaceweb/tag";

const MAX_COUNT = 300;
const MIN_COUNT = 5;
const ACCEPTABLE_MAX_COUNT = 200;
const ACCEPTABLE_MIN_COUNT = 10;

const getIntent = (count: number) => {
  if (count > MAX_COUNT || count < MIN_COUNT) return "error";
  else if (count > ACCEPTABLE_MIN_COUNT && count < ACCEPTABLE_MAX_COUNT)
    return "success";
  else return "warning";
};

export const LabelCountTag = ({ count }: { count: number }): JSX.Element => {
  return (
    <Tag size="sm" intent={getIntent(count)} closeable={false}>
      {count} labels
    </Tag>
  );
};
