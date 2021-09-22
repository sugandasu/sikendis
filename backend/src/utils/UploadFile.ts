import { createWriteStream } from "fs";
import { ReadStream } from "fs-capacitor";

interface FileUpload {
  createReadStream(): ReadStream;
  filename: string | null;
}

export const uploadFile = ({
  createReadStream,
  filename,
}: FileUpload): Promise<Boolean> => {
  return new Promise((resolve, reject) =>
    createReadStream()
      .pipe(
        createWriteStream(`${__dirname}/../../uploads/${filename}`, {
          autoClose: true,
        })
      )
      .on("finish", () => resolve(true))
      .on("error", () => reject(false))
  );
};
