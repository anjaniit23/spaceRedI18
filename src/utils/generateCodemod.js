import { writeFileSync } from "fs";

const pwd = process.cwd();
const outputFilePath = `${pwd}/codemods/replaceLabels.js`;

export const generateCodemod = async (labelsToReplace, namespace) => {
  const fileContent = `

const labelsToReplace = ${JSON.stringify(labelsToReplace, null, 2)};

const namespace = "${namespace}";


const specialCharMap = {
  "&gt;": ">",
  "&quot;": '"',
  "&ldquo;": '"',
  "&#34;": '"',
  "&rdquo;": '"',
  "&apos;": "'",
  "&lsquo;": "'",
  "&#39;": "'",
  "&rsquo;": "'",
  "&#125;": "}",
};

const replaceSpecialChars = (text) => {
  return text.replace(
    /&gt;|&quot;|&ldquo;|&#34;|&rdquo;|&apos;|&lsquo;|&#39;|&rsquo;|&#125;/g,
    (match) => {
      return specialCharMap[match] || match;
    }
  );
};

const getRepresentative = (label) => {
  const item = labelsToReplace.find((item) => item.label === label);
  return item ? item.representative : null;
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const transformer = (fileInfo, api) => {
  let anychange = 0;
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  const combinedFind = root.find(j.Node).filter((path) => {
    const node = path.node;

    if (
      node.type === "CallExpression" &&
      node.callee.type === "Identifier" &&
      node.callee.name === \`__\${namespace}T\` &&
      node.arguments.length > 0 &&
      node.arguments[0].type === "Literal"
    ) {
      return true;
    }

    if (
      node.type === "JSXElement" &&
      node.openingElement.name.name ===
        \`\${capitalizeFirstLetter(namespace)}Trans\`
    ) {
      const children = node.children;
      return children.every((child) => child.type === "JSXText");
    }

    return false;
  });

  combinedFind.forEach((path) => {
    const node = path.node;

    if (
      node.type === "CallExpression" &&
      node.callee.type === "Identifier" &&
      node.callee.name === \`__\${namespace}T\` &&
      node.arguments.length > 0 &&
      node.arguments[0].type === "Literal"
    ) {
      const arg = node.arguments[0];
      if (typeof arg.value === "string") {
        const representative = getRepresentative(arg.value);
        if (representative) {
          anychange = 1;
          const regex = /{{.*?}}/; // Regular expression to detect {{...}}
          if (!regex.test(representative)) {
            if (node.arguments.length > 1) {
              node.arguments.splice(1, 1);
            }
          }
          console.log(
            "\x1b[36m%s\x1b[0m",
            \`#### In \${fileInfo.path} replacing [\${arg.value}] with [\${representative}] #####\`
          );
          arg.value = representative;
          arg.raw = \`\"\${representative}\"\`;
        }
      }
    }

    if (
      node.type === "JSXElement" &&
      node.openingElement.name.name ===
        \`\${capitalizeFirstLetter(namespace)}Trans\`
    ) {
      const children = node.children;
      if (children.every((child) => child.type === "JSXText")) {
        children.forEach((child) => {
          if (child.type === "JSXText") {
            const textInTransComp = child.value.trim();
            const actualLabelToCompare = replaceSpecialChars(textInTransComp);
            const representative = getRepresentative(actualLabelToCompare);

            if (representative) {
              anychange = 1;
              console.log(
                "\x1b[36m%s\x1b[0m",
                \`##### In \${fileInfo.path} replacing [\${child.value}] with [\${representative}] #####\`
              );
              child.value = representative;
            }
          }
        });
      }
    }
  });
  if (!anychange)
    console.log(
      "\x1b[36m%s\x1b[0m",
      \`##### No changes in \${fileInfo.path} #####\`
    );
  return root.toSource();
};

export default transformer;

`;

  writeFileSync(outputFilePath, fileContent, "utf8");
  return fileContent;
};
