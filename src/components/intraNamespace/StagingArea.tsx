import { Typography } from "@sprinklrjs/spaceweb/typography";
import ChevronDown from "@sprinklrjs/spaceweb/icon/components/chevron-down";
import { IconButton, Button } from "@sprinklrjs/spaceweb/button";
import { Box } from "@sprinklrjs/spaceweb/box";
import { RepresentativeInput } from "./RepresentativeInput";
import { useCallback } from "react";

export const StagingArea = ({
  stages,
  activeStageIndex,
  onAction,
}: {
  stages: any;
  activeStageIndex: number;
  onAction: (action: any) => void;
}) => {
  console.log("render....Staging Area");
  const currentStageData = stages[activeStageIndex];

  const handleRepresentativeChange = useCallback(
    (value: string) => {
      onAction({
        type: "UPDATE_REPRESENTATIVE_IN_ACTIVE_STAGE",
        payload: value,
      });
    },
    [onAction],
  );

  return (
    <Box className="w-full flex  flex-col gap-4 items-center h-full overflow-auto spr-ui-06  spr-border-03 border p-4">
      <Box className="w-full flex justify-between">
        <Button
          size="sm"
          aria-label="Remove current stage"
          disabled={stages.length < 1}
          onClick={() => {
            onAction({
              type: "REMOVE_STAGE",
            });
          }}
        >
          Remove
        </Button>
        {stages.length ? (
          <Box className="flex justify-center items-center ">
            <IconButton
              size="sm"
              aria-label="down"
              onClick={() => {
                onAction({
                  type: "PREVIOUS_STAGE",
                });
              }}
              disabled={activeStageIndex === 0}
            >
              <ChevronDown className="transform rotate-90" />
            </IconButton>
            <Typography className="text-14">
              Stage Number : {activeStageIndex + 1}/{stages.length}
            </Typography>
            <IconButton
              aria-label="down"
              size="sm"
              onClick={() => {
                onAction({
                  type: "NEXT_STAGE",
                });
              }}
              disabled={activeStageIndex === stages.length - 1}
            >
              <ChevronDown className="transform -rotate-90" />
            </IconButton>
          </Box>
        ) : (
          <Typography
            variant="body-14"
            className="flex justify-center items-center"
          >
            Please Complete Some Stage
          </Typography>
        )}

        <Button
          size="xs"
          aria-label="Add another stage"
          onClick={() => {
            onAction({
              type: "ADD_STAGE",
            });
          }}
          disabled={stages.length === 0}
        >
          Add
        </Button>
      </Box>

      {currentStageData ? (
        <Box className="flex flex-col gap-3 w-full">
          <RepresentativeInput
            initialValue={currentStageData.representative}
            onInputChange={handleRepresentativeChange}
            key={activeStageIndex}
          />
          <Typography
            variant="body-16"
            weight="semibold"
            className="spr-text-02"
          >
            Selected Labels:
          </Typography>
          <Box>
            {stages[activeStageIndex].selections.map(
              (item: any, index: number) => (
                <Typography
                  $as="div"
                  key={index}
                  variant="body-16"
                  className="pb-1"
                >
                  {item}
                </Typography>
              ),
            )}
          </Box>
        </Box>
      ) : null}
    </Box>
  );
};
