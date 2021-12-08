import * as csv from "fast-csv";
import { unlinkSync } from "fs";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import {
  Arg,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { Pengguna } from "../entities/Pengguna";
import { uploadFile } from "../utils/UploadFile";
import { MAX_TABLE_LIMIT } from "./../constants";
import { isAuth } from "./../middlewares/isAuth";
import { isOperator } from "./../middlewares/isOperator";
import { PenggunaInput } from "./inputs/PenggunaInput";
import { PenggunaPaginateInput } from "./inputs/PenggunaPaginateInput";
import { PenggunaImportResponse } from "./responses/PenggunaImportResponse";
import { PenggunaPaginated } from "./responses/PenggunaPaginated";
import { PenggunaResponse } from "./responses/PenggunaResponse";
import { penggunaValidation } from "./validations/penggunaValidation";

@Resolver(Pengguna)
export class PenggunaResolver {
  @FieldResolver(() => String, { nullable: true })
  fotoProfilUrl(@Root() root: Pengguna) {
    return root.fotoProfil
      ? process.env.BACKEND_URL + "/static/" + root.fotoProfil
      : null;
  }

  @Mutation(() => PenggunaResponse)
  @UseMiddleware(isOperator)
  async createPengguna(
    @Arg("payload") payload: PenggunaInput,
    @Arg("fotoProfil", () => GraphQLUpload, { nullable: true })
    fotoProfil: FileUpload
  ): Promise<PenggunaResponse> {
    const errors = await penggunaValidation(payload);
    if (errors) {
      return { errors };
    }

    if (fotoProfil) {
      try {
        const { createReadStream, filename } = fotoProfil;
        if (filename) {
          const upload = await uploadFile({
            createReadStream,
            filename: payload.fotoProfil ? payload.fotoProfil : null,
          });

          if (!upload) {
            return {
              errors: [
                {
                  field: "fotoProfil",
                  message: "Foto profil gagal diupload",
                },
              ],
            };
          }
        } else {
          payload.fotoProfil = null;
        }
      } catch (error) {
        return {
          errors: [
            {
              field: "fotoProfil",
              message: "Foto profil gagal diupload",
            },
          ],
        };
      }
    }

    const pengguna = await Pengguna.create({ ...payload }).save();
    return { pengguna };
  }

  @Query(() => PenggunaPaginated)
  @UseMiddleware(isAuth)
  async penggunas(
    @Arg("options") options: PenggunaPaginateInput
  ): Promise<PenggunaPaginated> {
    const realLimit = Math.min(MAX_TABLE_LIMIT, options.limit);
    const offset = options.page * options.limit - options.limit;
    let params: any = [];

    let whereColumns = [];
    let whereColumnQuery = "";
    if (options.filter) {
      if (options.filter.columns) {
        whereColumns = options.filter.columns.map((column) => {
          if (column.operation === "LIKE") {
            params.push(`%${column.value}%`);
          } else if (column.operation === "=") {
            params.push(column.value);
          }
          return `"${column.name}" ${column.operation} $${params.length}`;
        });
        whereColumnQuery = whereColumns.join(" AND ");
      }
    }

    if (realLimit === 0) {
      const data = await getConnection().query(
        `
      SELECT *
      FROM pengguna
      ${options.filter?.columns ? `WHERE ${whereColumnQuery}` : ``}
      `,
        params
      );
      const { total } = await getConnection()
        .getRepository(Pengguna)
        .createQueryBuilder()
        .select("COUNT(id)", "total")
        .getRawOne();

      return { data, total, ...options };
    }

    params.push(realLimit);
    params.push(offset);

    const data = await getConnection().query(
      `
      SELECT *
      FROM pengguna
      ${options.filter?.columns ? `WHERE ${whereColumnQuery}` : ``}
      LIMIT $${params.length - 1}
      OFFSET $${params.length}
      `,
      params
    );

    const { total } = await getConnection()
      .getRepository(Pengguna)
      .createQueryBuilder()
      .select("COUNT(id)", "total")
      .getRawOne();

    return { data, total, ...options };
  }

  @Query(() => Pengguna, { nullable: true })
  @UseMiddleware(isAuth)
  pengguna(@Arg("id", () => Int) id: number): Promise<Pengguna | undefined> {
    return Pengguna.findOne({ id });
  }

  @Mutation(() => PenggunaResponse)
  @UseMiddleware(isOperator)
  async updatePengguna(
    @Arg("id", () => Int) id: number,
    @Arg("payload") payload: PenggunaInput,
    @Arg("fotoProfil", () => GraphQLUpload, { nullable: true })
    fotoProfil: FileUpload
  ): Promise<PenggunaResponse> {
    const errors = await penggunaValidation(payload, id);
    if (errors) {
      return { errors };
    }

    const pengguna = await Pengguna.findOne({ id });
    if (!pengguna) {
      return {
        errors: [
          {
            field: "id",
            message: "Pengguna tidak ditemukan",
          },
        ],
      };
    }

    if (fotoProfil) {
      const { createReadStream, filename } = fotoProfil;

      if (filename) {
        const upload = await uploadFile({
          createReadStream,
          filename: payload.fotoProfil ? payload.fotoProfil : null,
        });

        if (upload) {
          if (pengguna.fotoProfil) {
            unlinkSync(`${__dirname}/../../uploads/${pengguna.fotoProfil}`);
          }
        } else {
          return {
            errors: [
              {
                field: "fotoProfil",
                message: "Foto profil gagal diupload",
              },
            ],
          };
        }
      }
    }

    const result = await getConnection()
      .createQueryBuilder()
      .update(Pengguna)
      .set({ ...payload })
      .where("id = :id", { id })
      .returning("*")
      .execute();

    return { pengguna: result.raw[0] };
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isOperator)
  async deletePengguna(@Arg("id", () => Int) id: number): Promise<Boolean> {
    try {
      const pengguna = await Pengguna.findOne({ id });
      await Pengguna.delete({ id });
      if (pengguna?.fotoProfil) {
        unlinkSync(`${__dirname}/../../uploads/${pengguna.fotoProfil}`);
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  @Mutation(() => PenggunaImportResponse)
  @UseMiddleware(isOperator)
  async importPengguna(
    @Arg("fileImport", () => GraphQLUpload, { nullable: true })
    fileImport: FileUpload
  ): Promise<PenggunaImportResponse> {
    let rowCountEnd = 0;
    if (fileImport) {
      const { createReadStream, filename } = fileImport;

      if (filename) {
        createReadStream()
          .pipe(csv.parse({ delimiter: ";", headers: true }))
          .on("error", (error: any) => console.error(error))
          .on("data", async (row: any) => {
            const newRow = {} as any;
            for (const column in row) {
              newRow[column] = null;
              if (row[column].trim().length > 0) {
                newRow[column] = row[column];
              }
            }

            try {
              const errors = await penggunaValidation(newRow);
              console.log(errors);
              if (!errors) {
                await Pengguna.create({
                  ...(newRow as PenggunaInput),
                }).save();
                rowCountEnd += 1;
              }
            } catch (error) {
              console.log(error);
            }
          });
      }
    }
    return { rowCount: rowCountEnd };
  }
}
