import { formatSize } from "@/utils/files/size";
import { Tag, Intent } from "@sprinklrjs/spaceweb/tag";

const MAX_SIZE = 50 * 1024;
const MIN_SIZE = 2 * 1024;
const ACCEPTABLE_MAX_SIZE = 20 * 1024;
const ACCEPTABLE_MIN_SIZE = 5 * 1024;

const getIntent = (size: number) => {
  let intent: Intent;
  if (size > MAX_SIZE || size < MIN_SIZE) intent = "error";
  else if (size > ACCEPTABLE_MIN_SIZE && size < ACCEPTABLE_MAX_SIZE)
    intent = "success";
  else intent = "warning";

  return intent;
};

export const FileSizeTag = ({ size }: { size: number }): JSX.Element => {
  return (
    <Tag size="sm" intent={getIntent(size)} closeable={false}>
      {formatSize(size)}
    </Tag>
  );
};
