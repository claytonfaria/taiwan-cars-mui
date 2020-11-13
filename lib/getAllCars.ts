import type { CarModel } from '../models/Car';
import Car from '../models/Car';
import dbConnect from '../utils/dbConnect';

export const getAllCars = async (): Promise<CarModel[]> => {
  await dbConnect();

  const cars = await Car.find().lean();

  return cars.map(({ _id, ...car }) => car) as CarModel[];
};
