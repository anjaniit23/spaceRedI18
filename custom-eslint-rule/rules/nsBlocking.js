import fs from "fs";
import path from "path";

// Global variable for caching JSON data
let blockedNamespacesLabels = {};

function loadNamespaceData(ns) {
  if (!blockedNamespacesLabels[ns]) {
    const pwd = process.cwd();
    const filePath = path.resolve(pwd, `i18n/en_US/${ns}.json`);
    blockedNamespacesLabels[ns] = Object.keys(
      JSON.parse(fs.readFileSync(filePath, "utf8")),
    );
  }
  return blockedNamespacesLabels[ns];
}

export default {
  meta: {
    type: "problem",
    docs: {
      description:
        "We want to block a user from entering a new label in a namespace translation hook",
    },
    fixable: "code",
    schema: [
      {
        type: "array",
        items: {
          type: "string",
        },
        uniqueItems: true,
      },
    ],
  },
  create(context) {
    const options = context.options[0] || [];
    const labelsForNs = new Map();

    for (let i = 0; i < options.length; i++) {
      labelsForNs[options[i]] = loadNamespaceData(options[i]);
    }

    const blockedNamespaces =
      options.length > 0 ? options : ["common", "error"];
    return {
      CallExpression(node) {
        if (
          node.callee.type === "Identifier" ||
          node.callee.type === "MemberExpression"
        ) {
          let calleeName;
          if (node.callee.type === "Identifier") {
            calleeName = node.callee.name;
          } else {
            calleeName = node.callee.property.name;
          }
          for (const namespace of blockedNamespaces) {
            if (calleeName === `__${namespace}T`) {
              if (node.arguments[0].type === "Literal") {
                const label = node.arguments[0].value;
                const labels = labelsForNs[namespace];
                if (labels.indexOf(label) === -1) {
                  context.report({
                    node,
                    message:
                      "The label : [{{label}}] is not present in {{namespace}} namespace.",
                    data: {
                      label: label,
                      namespace: namespace,
                    },
                  });
                }
              }
            }
          }
        }
      },
    };
  },
};
