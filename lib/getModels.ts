import Car from '../models/Car';
import { arrayGroupBy } from '../utils/arrayGroupBy';
import dbConnect from '../utils/dbConnect';

export const getModels = async (make?: string) => {
  await dbConnect();

  const cars = await Car.find({ make }).lean();

  const allModelsArray = cars.map((car) => car.model);

  const modelsAndCount: { model: string; count: number }[] = [];

  allModelsArray.forEach((x) =>
    modelsAndCount.push({
      model: x,
      count: 1,
    })
  );

  const groupedModels = arrayGroupBy(modelsAndCount, 'model');

  return groupedModels.map((model) => ({
    model: model[0].model as string,
    count: (model as string).length,
  }));
};

export type Model = {
  model: string;
  count: number;
};
