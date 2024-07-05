import { Typography } from "@sprinklrjs/spaceweb/typography";
import { getNamespacesFileNames } from "@/utils/namespaces";
import { SearchBar } from "@/components/globalSearch/SearchBar";
import PageLayout from "@/components/layout/PageLayout";
import type { Option } from "@sprinklrjs/spaceweb/select";

export default function SearchFuncn({
  options,
  pwd,
}: {
  options: Option[];
  pwd: string;
}) {
  return (
    <PageLayout pwd={pwd}>
      <Typography className="flex items-center h-10 border-solid spr-interactive-focus w-full justify-center text-24">
        Choose the required namespace for which you want similar groups and
        provide input:
      </Typography>
      <SearchBar options={options} />
    </PageLayout>
  );
}

export async function getStaticProps() {
  const fileNames = await getNamespacesFileNames();
  const pwd = process.cwd();
  return {
    props: {
      options: fileNames.map((fileName) => ({
        id: fileName,
        label: fileName.split(".json")[0],
      })),
      pwd,
    },
  };
}
