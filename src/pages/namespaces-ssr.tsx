import * as React from "react";

// import { Loader } from "@sprinklrjs/spaceweb/loader";
// import { Box } from "@sprinklrjs/spaceweb/box";

import PageLayout from "@/components/layout/PageLayout";
import { NamespacesList } from "@/components/namespaces/NamespacesList";

import type { FileInfo } from "@/types";
import { GetStaticProps } from "next";

export default function Namespaces({
  namespaces,
  error,
}: {
  namespaces: FileInfo[];
  error?: boolean;
}) {
  // //Filter operations here
  // const [files, setFiles] = React.useState<Array<FileInfo>>(() => namespaces);

  return (
    <PageLayout>
      {error ? "Error" : <NamespacesList files={namespaces} />}
    </PageLayout>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  console.log(ctx);
  console.dir(ctx);
  let namespaces = [],
    error = false;

  const endpoint = "//localhost:3000/api/get-namespaces";

  const response = await fetch(endpoint);
  namespaces = await response.json();

  return {
    props: {
      namespaces,
      error,
    },
  };
};
