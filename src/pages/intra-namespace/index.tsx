import { IntraNamespaceSection } from "@/components/intraNamespace/IntraNamespaceSection";
import { Box } from "@sprinklrjs/spaceweb/box";
import { Typography } from "@sprinklrjs/spaceweb/typography";
import PageLayout from "@/components/layout/PageLayout";

export default function IntraNamespace() {
  return (
    <PageLayout>
      <Box className="h-full flex flex-col justify-center items-center">
        <Box className="p-3">
          <Typography variant="display-24">
            Choose the required namespace for which you want similar groups :
          </Typography>
        </Box>
        <Box className="w-full flex justify-center">
          <IntraNamespaceSection />
        </Box>
      </Box>
    </PageLayout>
  );
}
