import { Arg, Query, Resolver, UseMiddleware } from "type-graphql";
import { getConnection } from "typeorm";
import { Simda } from "./../entities/Simda";
import { isAuth } from "./../middlewares/isAuth";
import { SimdaPaginate } from "./inputs/SimdaPaginate";
import { SimdaPaginated } from "./responses/SimdaPaginated";

@Resolver(Simda)
export class SimdaResolver {
  @Query(() => SimdaPaginated)
  @UseMiddleware(isAuth)
  async kendaraans(
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
