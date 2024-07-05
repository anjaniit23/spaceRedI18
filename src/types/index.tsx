export type ErrorResponse = { message: string; error?: string };

export type FileInfo = {
  fileName: string;
  entriesCount: number;
  name: string;
  fileSize: number;
};

export type Stage = {
  representative: string;
  selections: Array<string>;
};

export type Group = [string, Array<string>];

export type LabelsSelectionState = Array<{
  label: string;
  checked: boolean;
  isActiveInCurrentStage: boolean;
  stageIndex: number;
}>;
