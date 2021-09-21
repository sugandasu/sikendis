import { v4 as uuidv4 } from "uuid";

const getNewFileName = (filename) => {
  const filenameSplit = filename.split(".");
  const afterDot = filenameSplit.slice(1, filenameSplit.length);
  const extension = afterDot.join(".");
  const newFileName = uuidv4() + "." + extension;
  return newFileName;
};

export default getNewFileName;
