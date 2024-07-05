import { safeStringify } from "./safeStringify";

export function formatSize(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(2));
  return `${formattedSize} ${sizes[i]}`;
}

// give object as input and get json size
export const calculateJSONSize = (obj) => {
  const jsonString = JSON.stringify(obj);
  const size = Buffer.byteLength(jsonString, "utf8");
  return size;
};
