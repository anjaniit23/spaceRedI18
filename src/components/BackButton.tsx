import { useRouter } from "next/navigation";

import { IconButton } from "@sprinklrjs/spaceweb/button";
import ChevronDown from "@sprinklrjs/spaceweb/icon/components/chevron-down";

export const BackButton = (): JSX.Element => {
  const router = useRouter();
  return (
    <IconButton
      size="sm"
      shape="square"
      onClick={() => router.push(`/`)}
      aria-label="back to home"
    >
      <ChevronDown className="transform rotate-90" />
    </IconButton>
  );
};
