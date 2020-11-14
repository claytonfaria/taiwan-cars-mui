import type { ParsedUrlQuery } from 'querystring';

import type { CarModel } from '../models/Car';
import Car from '../models/Car';
import dbConnect from '../utils/dbConnect';
import { getValueNumber } from '../utils/getValueNumber';

export async function getPaginatedCars(query?: ParsedUrlQuery) {
  await dbConnect();
  const page = getValueNumber(query?.page) ?? 1;
  const rowsPerPage = getValueNumber(query?.rowsPerPage) ?? 4;
  const offset = (page - 1) * rowsPerPage;

  const queryParams = {
    ...(query?.make && { make: query?.make }),
    ...(query?.model && { model: query?.model }),
  };

  const cars = (await Car.where('price')
    .gte(getValueNumber(query?.minPrice) ?? 0)
    .lte(getValueNumber(query?.maxPrice) ?? 9_999_999)
    .where(queryParams)
    .lean()
    .limit(rowsPerPage)
    .skip(offset)) as CarModel[];

  const totalRows = await Car.where('price')
    .gte(getValueNumber(query?.minPrice) ?? 0)
    .lte(getValueNumber(query?.maxPrice) ?? 9_999_999)
    .where(queryParams)
    .lean()
    .countDocuments();
  return {
    totalPages: Math.ceil(totalRows / rowsPerPage),
    cars: cars?.map(({ _id, ...car }) => car),
  };
}
