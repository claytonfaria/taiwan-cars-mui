import { arrayGroupBy } from '../utils/arrayGroupBy';
import { getAllCars } from './getAllCars';

export const getMakes = async (): Promise<Make[]> => {
  const cars = await getAllCars();

  const allMakesArray = cars.map((car) => car.make);

  const makesAndCount: { make: string; count: number }[] = [];

  allMakesArray.forEach((x) =>
    makesAndCount.push({
      make: x,
      count: 1,
    })
  );

  const groupedMakes = arrayGroupBy(makesAndCount, 'make');

  return groupedMakes.map((make) => ({
    make: make[0].make as string,
    count: (make as string).length,
  }));
};

export type Make = {
  make: string;
  count: number;
};
