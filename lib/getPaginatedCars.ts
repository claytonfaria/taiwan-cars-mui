import type { ParsedUrlQuery } from 'querystring';

import type { CarModel } from '../models/Car';
import Car from '../models/Car';
import dbConnect from '../utils/dbConnect';
import { getAsString } from '../utils/getAsString';

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

function getValueNumber(value?: string | string[]): number | undefined {
  const str = getValueStr(value);
  if (str === undefined) {
    return;
  }
  const number = Number.parseInt(str);
  return Number.isNaN(number) ? undefined : number;
}

function getValueStr(value?: string | string[]): string | undefined {
  const str = getAsString(value);
  return !str || str.toLowerCase() === 'all' ? undefined : str;
}
