import * as React from "react";

import { Loader } from "@sprinklrjs/spaceweb/loader";
import { Box } from "@sprinklrjs/spaceweb/box";

import PageLayout from "@/components/layout/PageLayout";
import { NamespacesList } from "@/components/namespaces/NamespacesList";

import type { FileInfo } from "@/types";

export default function Namespaces() {
  const [files, setFiles] = React.useState<Array<FileInfo>>([]);
  const [loading, setLoading] = React.useState(true);

  //Filter operation should be here...

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/get-namespaces");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const filesInfo = await response.json();
        setFiles(filesInfo);
        setLoading(false);
      } catch (error) {}
    };

    fetchData();
  }, []);

  return (
    <PageLayout>
      {loading ? (
        <Box className="w-full h-full items-center flex justify-center">
          <Loader size={12} />
        </Box>
      ) : (
        <NamespacesList files={files} />
      )}
    </PageLayout>
  );
}
