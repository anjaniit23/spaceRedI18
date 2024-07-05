import React, { useState, useMemo, useEffect, useRef } from "react";

import { calculateJSONSize, formatSize } from "@/utils/files/size";
import { useFetchGroups } from "./useFetchGroups";

import { Box } from "@sprinklrjs/spaceweb/box";
import { StagingArea } from "./StagingArea";
import { Button } from "@sprinklrjs/spaceweb/button";
import { Slider } from "@sprinklrjs/spaceweb/slider";

import { GroupsList } from "./GroupsList";
import { CodemodModal } from "./CodemodModal";
import { Insights } from "./Insights";

import { SLIDER_OVERRIDES } from "./overrides";

import { useIntraNamespaceStage } from "./useIntraNamespaceState";
import { Stage } from "@/types";
import { Loader } from "@sprinklrjs/spaceweb/loader";

export const IntraNamespaceTool = ({ namespace }: { namespace: string }) => {
  const [cutoff, setCutoff] = useState<number[]>([0.75]);
  const { groups, groupsLoading, fetchGroups } = useFetchGroups(namespace);

  useEffect(() => {
    fetchGroups(0.75);
  }, [fetchGroups]);
  const { state, onAction } = useIntraNamespaceStage();

  const reducedSize = useMemo(() => {
    const { labelsRemoved, labelsAdded } = state.stages.reduce(
      (
        acc: {
          labelsRemoved: Record<string, string>;
          labelsAdded: Record<string, string>;
        },
        stage: Stage,
      ) => {
        stage.selections.forEach((label) => {
          acc.labelsRemoved[label] = label;
        });
        if (stage.representative) {
          acc.labelsAdded[stage.representative] = stage.representative;
        }
        return acc;
      },
      { labelsRemoved: {}, labelsAdded: {} },
    );
    const _reducedSize =
      calculateJSONSize(labelsRemoved) - calculateJSONSize(labelsAdded);
    return formatSize(_reducedSize);
  }, [state.stages]);

  const generateCodemod = async (e: any) => {
    e.preventDefault();

    const replacements: Array<{ label: string; representative: string }> =
      state.stages
        .map((stage: Stage) =>
          stage.selections.map((label) => {
            return {
              label,
              representative: stage.representative,
            };
          }),
        )
        .flat();

    try {
      const response = await fetch("/api/get-codemod", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ replacements, namespace }),
      });

      const codemod = await response.json();
      onAction({
        type: "SET_CODEMOD",
        payload: codemod,
      });
    } catch (error) {
      console.error("Error generating codemod:", error);
    }
  };

  if (groupsLoading) {
    return (
      <Box className="flex flex-col h-full w-full items-center justify-center">
        <Loader size={15} />
      </Box>
    );
  }

  return (
    <Box className="flex flex-col h-full w-full overflow-hidden">
      <Box className="flex h-full w-full overflow-hidden">
        <Box className="flex flex-col w-3/4 spr-ui-06">
          <Box className="flex gap-2 py-2">
            <Box className="w-3/12">
              <Slider
                value={cutoff}
                step={0.05}
                min={0.5}
                max={0.95}
                marks
                onChange={({ value }: { value: number[] }) => setCutoff(value)}
                overrides={SLIDER_OVERRIDES}
              />
            </Box>
            <Button
              onClick={() => {
                fetchGroups(cutoff[0]);
              }}
              isLoading={groupsLoading}
            >
              Go
            </Button>
          </Box>

          <GroupsList
            key={cutoff[0]}
            groups={groups}
            activeStageIndex={state.activeStageIndex}
            stages={state.stages}
            onAction={onAction}
          />
        </Box>

        <Box className="flex flex-col w-1/4">
          <Insights groups={groups} threshold={cutoff[0]} />
          <StagingArea
            stages={state.stages}
            activeStageIndex={state.activeStageIndex}
            onAction={onAction}
          />
        </Box>
      </Box>

      <Box className="flex w-full items-center flex-row-reverse h-16 px-4 spr-overlay">
        <Button
          onClick={generateCodemod}
          disabled={!state.isValid}
          className="truncate"
        >
          Generate Codemod
        </Button>
        <Box className="flex w-full">
          <Box className="pr-2 text-18">{`Till now, Reduction of ${reducedSize}`}</Box>
        </Box>
      </Box>

      {state.codemod ? (
        <CodemodModal
          codemod={state.codemod}
          onClose={() => {
            onAction({
              type: "SET_CODEMOD",
              payload: null,
            });
          }}
        />
      ) : null}
    </Box>
  );
};
