import { Tag } from "@sprinklrjs/spaceweb/tag";

export const SimilarLabelCountTag = ({
  count,
}: {
  count: number;
}): JSX.Element => {
  return (
    <Tag intent="info" closeable={false} size="sm">
      {" "}
      {count} labels
    </Tag>
  );
};
