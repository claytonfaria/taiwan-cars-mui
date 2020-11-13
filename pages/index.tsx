/* eslint-disable import/no-extraneous-dependencies */
import { Grid } from '@material-ui/core';
import type { GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import { PageGrid } from '../components/PageGrid';
import { Search } from '../components/Search';
import { getPaginatedCars } from '../lib/getPaginatedCars';
import type { CarModel } from '../models/Car';
import { getAsString } from '../utils/getAsString';

type HomeProps = {
  initialData: {
    cars: CarModel[];
    totalPages: number;
  };
};
type NewCars = {
  data?: {
    cars: CarModel[];
    totalPages: number;
  };
};
export default function Home({ initialData }: HomeProps) {
  const { query } = useRouter();

  const queryParams = {
    ...(getValueStr(query?.make) && { make: query.make }),
    ...(getValueStr(query?.model) && { model: query.model }),
    ...(getValueStr(query?.minPrice) && { minPrice: query.minPrice }),
    ...(getValueStr(query?.maxPrice) && { maxPrice: query.maxPrice }),
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Search />
      </Grid>
      <Grid item xs={12} md={8}>
        <PageGrid
          initialData={initialData}
          queryParams={queryParams}
          pageNumber={Number(query.page ?? 1)}
        />
        <div style={{ display: 'none' }}>
          <PageGrid
            initialData={initialData}
            queryParams={queryParams}
            pageNumber={Number(query.page ?? 1) + 1}
          />
        </div>
      </Grid>
    </Grid>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const result = await getPaginatedCars();

  return { props: { initialData: result } };
};

function getValueStr(value?: string | string[]): string | undefined {
  const str = getAsString(value);
  return !str || str.toLowerCase() === 'all' ? undefined : str;
}
