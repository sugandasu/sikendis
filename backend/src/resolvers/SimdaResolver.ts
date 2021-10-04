import {
  Arg,
  FieldResolver,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { Simda } from "./../entities/Simda";
import { isAuth } from "./../middlewares/isAuth";
import { SimdaPaginate } from "./inputs/SimdaPaginate";
import { SimdaPaginated } from "./responses/SimdaPaginated";
import * as fs from "fs";
import * as path from "path";
import * as csv from "fast-csv";

const importDataSimda = () => {
  fs.createReadStream(
    path.resolve(__dirname, "assets", "../../../uploads/simda.csv")
  )
    .pipe(csv.parse({ delimiter: ";", headers: false }))
    .on("error", (error) => console.error(error))
    .on("data", async (row) => {
      console.log(row[12] as string);
      const simda = await Simda.create({
        kdBidang: row[0] as string,
        kdUnit: row[1] as string,
        kdSubunit: row[2] as string,
        kdUpb: row[3] as string,
        nmUpb: row[4] as string,
        noRegister: row[5] as string,
        merk: row[6] as string,
        type: row[7] as string,
        cc: row[8] as string,
        bahan: row[9] as string,
        tglPerolehan: row[10] as string,
        nomorPabrik: row[11] as string,
        nomorRangka: row[12] as string,
        nomorMesin: row[13] as string,
        nomorBpkb: row[14] as string,
        asalUsul: row[15] as string,
        harga: row[16] as string,
        keterangan: row[17] as string,
        tahun: row[18] as string,
        noSp2d: row[19] as string,
        tglPembukuan: row[20] as string,
        kdAset1: row[21] as string,
        kdAset2: row[22] as string,
        kdAset3: row[23] as string,
        kdAset4: row[24] as string,
        kdAset5: row[25] as string,
        nmAset5: row[26] as string,
        kondisi: row[27] as string,
        uraian: row[28] as string,
      }).save();
    })
    .on("end", (rowCount: number) => console.log(`Parsed ${rowCount} rows`));
};

@Resolver(Simda)
export class SimdaResolver {
  @Query(() => SimdaPaginated)
  @UseMiddleware(isAuth)
  async simdas(
    @Arg("options") options: SimdaPaginate
  ): Promise<SimdaPaginated> {
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
      FROM simda
      ${options.filter?.columns ? `WHERE ${whereColumnQuery}` : ``}
      LIMIT $1
      OFFSET $2
      `,
      params
    );

    const { total } = await getConnection()
      .getRepository(Simda)
      .createQueryBuilder()
      .select("COUNT(id)", "total")
      .getRawOne();

    return { data, total, ...options };
  }
}
