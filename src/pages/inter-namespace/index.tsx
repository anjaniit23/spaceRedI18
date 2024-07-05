import { InterNamespaceSection } from "@/components/interNamespace/InterNamespaceSection";
import PageLayout from "@/components/layout/PageLayout";
import { getNamespacesFileNames } from "@/utils/namespaces";
import { Box } from "@sprinklrjs/spaceweb/box";

export default function InterFuncn({ files }: { files: string[] }) {
  return (
    <>
      <PageLayout>
        <Box className="h-full w-full flex flex-col justify-center items-center ">
          <Box className="w-full flex justify-center">
            <InterNamespaceSection files={files} />
          </Box>
        </Box>
      </PageLayout>
    </>
  );
}

export async function getStaticProps() {
  const files = await getNamespacesFileNames();

  return {
    props: {
      files,
    },
  };
}
