import { useCallback, useState } from "react";

import { Stage } from "@/types";

type State = {
  stages: Stage[];
  codemod: string;
  isValid: boolean;
  activeStageIndex: number;
};

const isValidRepresentative = ({
  selections: labels,
  representative,
}: Stage): boolean => {
  const labelPattern = /\{\{(.*?)\}\}/;
  const repMatch = representative.match(labelPattern);

  if (!repMatch) return true;

  for (const label of labels) {
    const labelMatch = label.match(labelPattern);

    if (labelMatch) {
      if (repMatch[1] !== labelMatch[1]) {
        return false;
      }
    }
  }
  return true;
};

const checkStateValidity = (stages: Stage[]): boolean => {
  const isValid = stages.every((stage) => {
    const hasInterpolated = stage.selections.some((label: string) =>
      /\{\{.*?\}\}/.test(label),
    );

    if (
      stage.representative &&
      stage.selections.length &&
      (!hasInterpolated || (hasInterpolated && isValidRepresentative(stage)))
    ) {
      return true;
    }

    return false;
  });

  return isValid && stages.length !== 0;
};

export const useIntraNamespaceStage = () => {
  const [state, setState] = useState<State>(() => ({
    stages: [],
    activeStageIndex: 0,
    codemod: "",
    isValid: false,
  }));

  const onAction = useCallback((action: any) => {
    switch (action.type) {
      case "NEXT_STAGE": {
        setState((prevState) => {
          if (prevState.activeStageIndex < prevState.stages.length - 1) {
            return {
              ...prevState,
              activeStageIndex: prevState.activeStageIndex + 1,
            };
          }
          return prevState;
        });
        break;
      }
      case "PREVIOUS_STAGE": {
        setState((prevState) => {
          if (prevState.activeStageIndex > 0) {
            return {
              ...prevState,
              activeStageIndex: prevState.activeStageIndex - 1,
            };
          }
          return prevState;
        });
        break;
      }
      case "ADD_STAGE": {
        setState((prevState) => {
          const activeStage = prevState.stages[prevState.activeStageIndex];
          const { selections: selectedLabels, representative } = activeStage;
          const hasInterpolatedVariable = selectedLabels.some((label: string) =>
            /\{\{.*?\}\}/.test(label),
          );

          if (hasInterpolatedVariable && !isValidRepresentative(activeStage)) {
            alert(
              "Representative is invalid: if a label contains {{ss}}, the representative must also contain {{ss}} with the same content.",
            );
            return prevState;
          }

          // valid representative....
          if (!representative.trim()) {
            alert("Representative cannot be empty.");
            return prevState;
          }

          const finalStages = [
            ...prevState.stages,
            { selections: [], representative: "" },
          ];

          return {
            ...prevState,
            isValid: checkStateValidity(finalStages),
            stages: finalStages,
            activeStageIndex: finalStages.length - 1,
          };
        });
        break;
      }
      case "REMOVE_STAGE": {
        setState((prevState) => {
          const totalStages = prevState.stages.length;
          const newStages = prevState.stages.filter(
            (_: any, index: number) => index !== prevState.activeStageIndex,
          );
          const isLastActiveStage =
            totalStages === prevState.activeStageIndex + 1;

          return {
            ...prevState,
            isValid: checkStateValidity(newStages),
            codemod: "",
            stages: newStages,
            activeStageIndex: isLastActiveStage
              ? Math.max(0, prevState.activeStageIndex - 1)
              : prevState.activeStageIndex,
          };
        });
        break;
      }
      case "SET_CODEMOD": {
        setState((prevState) => ({
          ...prevState,
          codemod: action.payload,
        }));
        break;
      }
      case "UPDATE_LABEL_SELECTIONS": {
        const { label, checked, stageIndex } = action.payload;

        setState((prevState) => {
          let activeStageIndex = prevState.activeStageIndex;
          let newStages = [...prevState.stages];

          // Initialize stages if empty
          if (newStages.length === 0) {
            newStages = [{ representative: "", selections: [] }];
            activeStageIndex = 0;
          }

          const currentSelections = newStages[activeStageIndex].selections;

          if (checked) {
            // Add the label to the current stage
            currentSelections.push(label);

            if (stageIndex !== -1 && stageIndex !== activeStageIndex) {
              // Remove the label from the previous stage
              newStages[stageIndex].selections = newStages[
                stageIndex
              ].selections.filter((item: string) => item !== label);

              // If the previous stage becomes empty, remove it
              if (newStages[stageIndex].selections.length === 0) {
                newStages.splice(stageIndex, 1);

                // Adjust activeStageIndex if necessary
                if (stageIndex <= activeStageIndex) {
                  activeStageIndex = Math.max(0, activeStageIndex - 1);
                }
              }
            }
          } else {
            // Remove the label from the current stage if unchecked
            newStages[activeStageIndex].selections = currentSelections.filter(
              (item: string) => item !== label,
            );
          }

          return {
            ...prevState,
            stages: newStages,
            activeStageIndex,
            isValid: checkStateValidity(newStages),
          };
        });
        break;
      }
      case "UPDATE_REPRESENTATIVE_IN_ACTIVE_STAGE": {
        setState((prevState) => {
          const updatedStages = prevState.stages.map((stage, index) => {
            if (index === prevState.activeStageIndex) {
              stage.representative = action.payload;
            }
            return stage;
          });

          return {
            ...prevState,
            isValid: checkStateValidity(updatedStages),
            stages: updatedStages,
          };
        });
        break;
      }
      default:
        return;
    }
  }, []);

  return {
    state,
    onAction,
  };
};
