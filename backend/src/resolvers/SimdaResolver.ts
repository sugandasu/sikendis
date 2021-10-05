import { Arg, Query, Resolver, UseMiddleware } from "type-graphql";
import { getConnection } from "typeorm";
import { Simda, simdaColumns } from "./../entities/Simda";
import { isAuth } from "./../middlewares/isAuth";
import { SimdaPaginate } from "./inputs/SimdaPaginate";
import { SimdaPaginated } from "./responses/SimdaPaginated";

@Resolver(Simda)
export class SimdaResolver {
  @Query(() => SimdaPaginated)
  @UseMiddleware(isAuth)
  async simdas(
    @Arg("options") options: SimdaPaginate
  ): Promise<SimdaPaginated> {
    const realLimit = Math.min(50, options.limit);
    const offset = options.page * options.limit - options.limit;
    let params = [];

    let whereColumns = [];
    let whereColumnQuery = "";
    if (options.filter?.columns) {
      whereColumns = options.filter.columns.map((column) => {
        if (column.operation === "LIKE") {
          params.push(`%${column.value}%`);
        } else if (column.operation === "=") {
          params.push(column.value);
        }
        return `simda."${column.name}" ${column.operation} $${params.length}`;
      });
      whereColumnQuery = whereColumns.join(" AND ");
    }

    let whereAlls = [];
    let whereAllQuery = "";
    if (options.filter?.all) {
      whereAlls = simdaColumns.map((column) => {
        params.push(`%${options.filter?.all}%`);
        return `simda."${column}" LIKE $${params.length}`;
      });
      whereAllQuery = whereAlls.join(" OR ");
    }

    let query = "";
    if (whereColumnQuery || whereAllQuery) {
      query = " WHERE ";

      if (whereColumnQuery && whereAllQuery) {
        query += `(`;
      }

      if (whereColumnQuery) {
        query += `(${whereColumnQuery})`;
      }

      if (whereColumnQuery && whereAllQuery) {
        query += `) AND (`;
      }

      if (whereAllQuery) {
        query += whereAllQuery;
      }

      if (whereColumnQuery && whereAllQuery) {
        query += `)`;
      }
    }

    params.push(realLimit);
    params.push(offset);

    const data = await getConnection().query(
      `
      SELECT *
      FROM simda
      ${query ? query : ``}
      LIMIT $${params.length - 1}
      OFFSET $${params.length}
      `,
      params
    );

    const total = await getConnection().query(
      `
      SELECT COUNT(simda.id) as total
      FROM simda
      ${query ? query : ``}
      `,
      params.slice(0, params.length - 2)
    );

    return { data, total: total[0].total, ...options };
  }
}
