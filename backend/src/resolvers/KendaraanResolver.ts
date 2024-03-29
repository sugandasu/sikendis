import axios from "axios";
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
import { MAX_TABLE_LIMIT } from "../constants";
import { PeminjamanOperasional } from "../entities/PeminjamanOperasional";
import { isOperator } from "../middlewares/isOperator";
import { Kendaraan, TipeKendaraan, TipeRoda } from "./../entities/Kendaraan";
import { PenggunaRutin } from "./../entities/PenggunaRutin";
import { isAuth } from "./../middlewares/isAuth";
import { uploadFile } from "./../utils/UploadFile";
import { KendaraanImport } from "./inputs/KendaraanImport";
import { KendaraanInput } from "./inputs/KendaraanInput";
import { KendaraanPaginateInput } from "./inputs/KendaraanPaginateInput";
import { KendaraanImportResponse } from "./responses/KendaraanImportResponse";
import { KendaraanPaginated } from "./responses/KendaraanPaginated";
import { KendaraanResponse } from "./responses/KendaraanResponse";
import {
  StatusKendaraanField,
  TipeStatusKendaraan,
} from "./responses/StatusKendaraanField";
import { kendaraanValidation } from "./validations/kendaraanValidation";

@Resolver(Kendaraan)
export class KendaraanResolver {
  @FieldResolver(() => String, { nullable: true })
  nomorRegister(@Root() root: Kendaraan) {
    return root.nomorRegister ? root.nomorRegister : "";
  }

  @FieldResolver(() => String, { nullable: true })
  ukuranCc(@Root() root: Kendaraan) {
    return root.ukuranCc ? root.ukuranCc : "";
  }

  @FieldResolver(() => String, { nullable: true })
  bahan(@Root() root: Kendaraan) {
    return root.bahan ? root.bahan : "";
  }

  @FieldResolver(() => String, { nullable: true })
  nomorPolisi(@Root() root: Kendaraan) {
    return root.nomorPolisi ? root.nomorPolisi : "";
  }

  @FieldResolver(() => String, { nullable: true })
  nomorBpkb(@Root() root: Kendaraan) {
    return root.nomorBpkb ? root.nomorBpkb : "";
  }

  @FieldResolver(() => String, { nullable: true })
  asalUsul(@Root() root: Kendaraan) {
    return root.asalUsul ? root.asalUsul : "";
  }

  @FieldResolver(() => String, { nullable: true })
  warna(@Root() root: Kendaraan) {
    return root.warna ? root.warna : "";
  }

  @FieldResolver(() => String, { nullable: true })
  bahanBakar(@Root() root: Kendaraan) {
    return root.bahanBakar ? root.bahanBakar : "";
  }

  @FieldResolver(() => String, { nullable: true })
  harga(@Root() root: Kendaraan) {
    return root.harga ? root.harga : "";
  }

  @FieldResolver(() => String, { nullable: true })
  keterangan(@Root() root: Kendaraan) {
    return root.keterangan ? root.keterangan : "";
  }

  @FieldResolver(() => String, { nullable: true })
  fotoUrl(@Root() root: Kendaraan) {
    return root.foto ? process.env.BACKEND_URL + "/static/" + root.foto : null;
  }

  @FieldResolver(() => StatusKendaraanField, { nullable: true })
  async statusPenggunaan(@Root() root: Kendaraan) {
    if (root.tipeKendaraan === TipeKendaraan.RUTIN) {
      const penggunaRutinLast = await PenggunaRutin.findOne({
        where: { kendaraanId: root.id },
        order: { tanggalBap: "DESC" },
      });

      return {
        status: penggunaRutinLast
          ? TipeStatusKendaraan.DIPAKAI
          : TipeStatusKendaraan.BEBAS,
        penggunaRutinLast,
      };
    }

    if (root.tipeKendaraan === TipeKendaraan.OPERASIONAL) {
      const peminjamanOperasionalLast = await PeminjamanOperasional.findOne({
        where: { kendaraanId: root.id },
        order: { tanggalSelesai: "DESC" },
      });

      if (peminjamanOperasionalLast) {
        const tanggalMulai = new Date(peminjamanOperasionalLast.tanggalMulai);
        const tanggalSelesai = new Date(
          peminjamanOperasionalLast.tanggalSelesai
        );

        const currentDate = new Date();

        let status = TipeStatusKendaraan.BEBAS;
        if (currentDate > tanggalMulai && currentDate <= tanggalSelesai) {
          status = TipeStatusKendaraan.DIPAKAI;
        }

        return {
          status,
          peminjamanOperasionalLast,
        };
      }
    }

    return { status: TipeStatusKendaraan.BEBAS };
  }

  @FieldResolver(() => String, { nullable: true })
  async statusPajak(@Root() root: Kendaraan) {
    const response = await axios
      .get("http://123.231.246.164:7272/api/samapi/kend?", {
        params: {
          rangka: root.nomorRangka,
          u: "121n",
          p: "S4ms4t",
        },
      })
      .then((response) => {
        if (response.data) {
          const terakhir = Date.parse(response.data["MASALAKU TERAKHIR"]);
          const dateTerakhir = new Date(terakhir);
          const dateNow = new Date();

          if (dateNow < dateTerakhir) {
            return `Pajak kendaraan berakhir pada tanggal ${dateTerakhir.getFullYear()}-${
              dateTerakhir.getMonth() + 1
            }-${dateTerakhir.getDate()}`;
          }
          return `Pajak kendaraan telah berakhir pada ${dateTerakhir.getFullYear()}-${
            dateTerakhir.getMonth() + 1
          }-${dateTerakhir.getDate()}`;
        }
        return "Pajak telah kadaluarsa";
      })
      .catch((err) => {
        if (err.response.status === 404) {
          return "Data kendaraan tidak terdaftar";
        }
        return "Integrasi gagal";
      });

    return response;
  }

  @Mutation(() => KendaraanResponse)
  @UseMiddleware(isOperator)
  async createKendaraan(
    @Arg("payload") payload: KendaraanInput,
    @Arg("foto", () => GraphQLUpload, { nullable: true }) foto: FileUpload
  ): Promise<KendaraanResponse> {
    const errors = await kendaraanValidation(payload);
    if (errors) {
      return { errors };
    }

    if (foto) {
      const { createReadStream, filename } = foto;
      if (filename) {
        const upload = await uploadFile({
          createReadStream,
          filename: payload.foto ? payload.foto : null,
        });

        if (!upload) {
          return {
            errors: [{ field: "foto", message: "Foto gagal disimpan" }],
          };
        }
      }
    }

    const kendaraan = await Kendaraan.create({ ...payload }).save();
    return { kendaraan };
  }

  @Query(() => KendaraanPaginated)
  @UseMiddleware(isAuth)
  async kendaraans(
    @Arg("options") options: KendaraanPaginateInput
  ): Promise<KendaraanPaginated> {
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
      FROM kendaraan
      ${options.filter?.columns ? `WHERE ${whereColumnQuery}` : ``}
      `,
        params
      );

      const total = await getConnection().query(
        `
      SELECT COUNT(kendaraan.id) as total
      FROM kendaraan
      ${options.filter?.columns ? `WHERE ${whereColumnQuery}` : ``}
      `,
        params
      );

      return { data, total: total[0].total, ...options };
    }

    params.push(realLimit);
    params.push(offset);

    const data = await getConnection().query(
      `
      SELECT *
      FROM kendaraan
      ${options.filter?.columns ? `WHERE ${whereColumnQuery}` : ``}
      LIMIT $${params.length - 1}
      OFFSET $${params.length}
      `,
      params
    );

    const total = await getConnection().query(
      `
      SELECT COUNT(kendaraan.id) as total
      FROM kendaraan
      ${options.filter?.columns ? `WHERE ${whereColumnQuery}` : ``}
      `,
      params.slice(0, params.length - 2)
    );

    return { data, total: total[0].total, ...options };
  }

  @Query(() => Kendaraan, { nullable: true })
  @UseMiddleware(isAuth)
  kendaraan(@Arg("id", () => Int) id: number): Promise<Kendaraan | undefined> {
    return Kendaraan.findOne({ id });
  }

  @Mutation(() => KendaraanResponse)
  @UseMiddleware(isOperator)
  async updateKendaraan(
    @Arg("id", () => Int) id: number,
    @Arg("payload") payload: KendaraanInput,
    @Arg("foto", () => GraphQLUpload, { nullable: true }) foto: FileUpload
  ): Promise<KendaraanResponse> {
    const errors = await kendaraanValidation(payload, id);
    if (errors) {
      return { errors };
    }

    const kendaraan = Kendaraan.findOne({ id });
    if (!kendaraan) {
      return {
        errors: [
          {
            field: "id",
            message: "Kendaraan tidak ditemukan",
          },
        ],
      };
    }

    if (foto) {
      const { createReadStream, filename } = foto;
      if (filename) {
        const upload = await uploadFile({
          createReadStream,
          filename: payload.foto ? payload.foto : null,
        });

        if (!upload) {
          return {
            errors: [{ field: "foto", message: "Foto gagal disimpan" }],
          };
        }
      }
    }

    const result = await getConnection()
      .createQueryBuilder()
      .update(Kendaraan)
      .set({ ...payload })
      .where("id = :id", {
        id,
      })
      .returning("*")
      .execute();

    return { kendaraan: result.raw[0] };
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isOperator)
  async deleteKendaraan(@Arg("id", () => Int) id: number): Promise<Boolean> {
    try {
      const kendaraan = await Kendaraan.findOne({ id });
      await Kendaraan.delete({ id });
      if (kendaraan?.foto)
        unlinkSync(`${__dirname}/../../uploads/${kendaraan.foto}`);
      return true;
    } catch (error) {
      return false;
    }
  }

  @Mutation(() => KendaraanImportResponse)
  @UseMiddleware(isOperator)
  async importKendaraan(
    @Arg("payload") payload: KendaraanImport,
    @Arg("fileImport", () => GraphQLUpload, { nullable: true })
    fileImport: FileUpload
  ): Promise<KendaraanImportResponse> {
    if (!(<any>Object).values(TipeRoda).includes(payload.tipeRoda)) {
      return {
        errors: [{ field: "tipeRoda", message: "Tipe roda tidak valid" }],
      };
    }

    let rowCountEnd = 0;
    if (fileImport) {
      const { createReadStream, filename } = fileImport;

      if (filename) {
        createReadStream()
          .pipe(csv.parse({ delimiter: ";", headers: true }))
          .on("error", (error: any) => console.error(error))
          .on("data", async (row: any) => {
            const newRow = {
              tipeKendaraan: payload.tipeKendaraan,
              tipeRoda: payload.tipeRoda,
            } as any;
            for (const column in row) {
              newRow[column] = null;
              if (row[column].trim().length > 0) {
                newRow[column] = row[column];
              }
            }

            try {
              const errors = await kendaraanValidation(newRow);
              if (!errors) {
                await Kendaraan.create({
                  ...(newRow as KendaraanInput),
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
