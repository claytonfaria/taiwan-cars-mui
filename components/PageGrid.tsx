/* eslint-disable no-negated-condition */
import { Grid } from '@material-ui/core';
import deepEqual from 'fast-deep-equal';
import { useRouter } from 'next/router';
import type { ParsedUrlQuery } from 'querystring';
import { stringify } from 'querystring';
import { useState } from 'react';
import useSWR from 'swr';

import type { CarModel } from '../models/Car';
import { CarCard } from './CarCard';
import { CarPagination } from './CarPagination';
import { GridSkeleton } from './GridSkeleton';

type PageGridProps = {
  initialData: {
    cars: CarModel[];
    totalPages: number;
  };
  pageNumber: number;
  queryParams: ParsedUrlQuery;
};
type NewCars = {
  data?: {
    cars: CarModel[];
    totalPages: number;
  };
};

export function PageGrid({
  initialData,
  pageNumber,
  queryParams,
}: PageGridProps) {
  const { query } = useRouter();
  const [serverQuery] = useState(query);

  const { data: newCars }: NewCars = useSWR(
    `/api/cars?${stringify(queryParams)}&page=${pageNumber}`,
    {
      dedupingInterval: 600_000, // 10 minutes
      revalidateOnMount: true,
      initialData: deepEqual(query, serverQuery)
        ? { totalPages: initialData.totalPages, cars: initialData.cars }
        : undefined,
    }
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <CarPagination totalPages={newCars?.totalPages} />
      </Grid>

      {!newCars ? (
        <GridSkeleton />
      ) : (
        (newCars?.cars ?? []).map((car) => (
          <Grid key={car.id} item xs={12} sm={6}>
            <CarCard car={car} />
          </Grid>
        ))
      )}
    </Grid>
  );
}
