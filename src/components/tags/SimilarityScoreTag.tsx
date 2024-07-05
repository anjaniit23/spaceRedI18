import { Tag } from "@sprinklrjs/spaceweb/tag";

export const SimilarityScoreTag = ({
  score,
}: {
  score: number;
}): JSX.Element => {
  const truncatedScore = Number(score.toFixed(2));
  return (
    <Tag
      intent={
        truncatedScore > 0.85
          ? "error"
          : truncatedScore > 0.6
            ? "warning"
            : "success"
      }
      closeable={false}
      size="sm"
    >
      {" "}
      {truncatedScore * 100}%
    </Tag>
  );
};
