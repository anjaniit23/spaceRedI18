import { useCallback, useEffect, useState } from "react";
import { Group } from "@/types";

const getGroupsForCutoff = async (namespace: string, cutoff: number) => {
  try {
    const response = await fetch("/api/get-groups", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ namespace, cutoff }),
    });

    const resultData = await response.json();
    const _groups = Object.values(resultData);
    _groups.sort((a: any, b: any) => b[1].length - a[1].length);

    const t3 = performance.now();

    return _groups;
  } catch (error) {
    console.error("Error getting groups:", error);
    return [];
  }
};

export const useFetchGroups = (namespace: string) => {
  const [groups, setGroups] = useState<Array<Group>>([]);
  const [groupsLoading, setGroupsLoading] = useState<boolean>(true);

  const fetchGroups = useCallback(
    async (cutoff: number) => {
      setGroupsLoading(true);
      const groups = await getGroupsForCutoff(namespace, cutoff);

      setGroups(groups as Group[]);
      setGroupsLoading(false);
    },
    [namespace],
  );

  return {
    groups,
    groupsLoading,
    fetchGroups,
  };
};
