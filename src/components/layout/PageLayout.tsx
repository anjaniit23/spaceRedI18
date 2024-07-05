import { Box } from "@sprinklrjs/spaceweb/box";
import { Header } from "@/components/Header";

export default function PageLayout({ children }: { children: any }) {
  return (
    <Box className="flex flex-col h-full w-full">
      <Header />
      <Box className="w-full h-full flex flex-col flex-grow items-center overflow-hidden">
        {children}
      </Box>
    </Box>
  );
}
