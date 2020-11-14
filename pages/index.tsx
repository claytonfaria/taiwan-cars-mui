/* eslint-disable import/no-extraneous-dependencies */
import { Grid } from '@material-ui/core';
import { motion } from 'framer-motion';
import type { GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import { PageGrid } from '../components/PageGrid';
import { Search } from '../components/Search';
import { getPaginatedCars } from '../lib/getPaginatedCars';
import type { CarModel } from '../models/Car';
import { getAsString } from '../utils/getAsString';
import { getSelectStr } from '../utils/getSelectStr';
import { pageTransitionAnimation } from '../utils/pageTransitionAnimation';

type HomeProps = {
  initialData: {
    cars: CarModel[];
    totalPages: number;
  };
};

export default function Home({ initialData }: HomeProps) {
  const { query } = useRouter();

  const queryParams = {
    ...(getSelectStr(query?.make) && { make: query.make }),
    ...(getSelectStr(query?.model) && { model: query.model }),
    ...(getSelectStr(query?.minPrice) && {
      minPrice: query.minPrice,
    }),
    ...(getSelectStr(query?.maxPrice) && {
      maxPrice: query.maxPrice,
    }),
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Search />
      </Grid>
      <Grid item xs={12} md={8}>
        <motion.div
          key={getAsString(query.page)}
          initial="pageInitial"
          animate="pageAnimate"
          variants={pageTransitionAnimation}
        >
          <PageGrid
            initialData={initialData}
            queryParams={queryParams}
            pageNumber={Number(query.page ?? 1)}
          />
        </motion.div>
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
