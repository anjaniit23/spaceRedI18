import Link from "next/link";

import { Typography } from "@sprinklrjs/spaceweb/typography";
import { Box } from "@sprinklrjs/spaceweb/box";

//@Pranav to remove this styles and use atomic class
import styles from "../styles/card.module.css";

const CARDS_CONTENT = [
  {
    title: "Namespaces Information",
    description: "See available namespaces and their size",
    path: "/namespaces",
  },
  {
    title: "Intra-namespace checker",
    description:
      "See detail insights for a selected namespace and generate codemod",
    path: "/intra-namespace",
  },
  {
    title: "Global Search",
    description: "Search if a label is present in some group",
    path: "/search",
  },
  {
    title: "Internamespace-checker",
    description:
      "compare labels of selected namespace with labels of multiple namespaces",
    path: "/inter-namespace",
  },
];

export const Content = (): JSX.Element => {
  return (
    <Box className="flex items-center justify-around h-full w-full">
      {CARDS_CONTENT.map((card) => (
        <Link
          key={card.path}
          href={card.path}
          style={{ textDecoration: "none" }}
        >
          <Box
            className={["card m-4 p-4 nav-ui-01 cursor-pointer ", styles.card]}
          >
            <Box
              className={[
                "card-content flex flex-col justify-center items-center h-full w-full text-2xl",
                styles.cardContent,
              ]}
            >
              <Typography
                variant="body-16"
                weight="semibold"
                className="spr-text-01 text-20"
              >
                {card.title}
              </Typography>
              <Typography
                variant="body-16"
                className=" text-12 spr-text-02 mt-3"
              >
                {card.description}
              </Typography>
            </Box>
          </Box>
        </Link>
      ))}
    </Box>
  );
};
