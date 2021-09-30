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
import { isAuth } from "./../middlewares/isAuth";
import { isOperator } from "./../middlewares/isOperator";
import { PenggunaInput } from "./inputs/PenggunaInput";
import { PenggunaPaginateInput } from "./inputs/PenggunaPaginateInput";
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
    { createReadStream, filename }: FileUpload
  ): Promise<PenggunaResponse> {
    const errors = await penggunaValidation(payload);
    if (errors) {
      return { errors };
    }

    if (filename) {
      const upload = await uploadFile({
        createReadStream,
        filename: payload.fotoProfil,
      });

      if (!upload) {
        return {
          errors: [
            { field: "fotoProfil", message: "Foto profil tidak boleh kosong" },
          ],
        };
      }
    } else {
      payload.fotoProfil = null;
    }

    const pengguna = await Pengguna.create({ ...payload }).save();
    return { pengguna };
  }

  @Query(() => PenggunaPaginated)
  @UseMiddleware(isAuth)
  async penggunas(
    @Arg("options") options: PenggunaPaginateInput
  ): Promise<PenggunaPaginated> {
    const realLimit = Math.min(10, options.limit);
    const offset = options.page * options.limit - options.limit;
    let params = [];
    params.push(realLimit);
    params.push(offset);

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

    const data = await getConnection().query(
      `
      SELECT *
      FROM pengguna
      ${options.filter?.columns ? `WHERE ${whereColumnQuery}` : ``}
      LIMIT $1
      OFFSET $2
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
          filename: payload.fotoProfil,
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
}
