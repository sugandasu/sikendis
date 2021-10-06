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
  return new Promise((resolve, reject) => {
    const pathName = `${__dirname}/../../uploads/${filename}`;
    createReadStream()
      .pipe(
        createWriteStream(pathName, {
          autoClose: true,
        })
      )
      .on("finish", () => resolve(true))
      .on("error", (err) => {
        console.log(err);
        reject(false);
      });
  });
};
