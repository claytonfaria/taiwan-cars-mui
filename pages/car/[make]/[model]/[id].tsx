/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Button, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { getBlurhash } from 'next-blurhash';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { BlurhashCanvas } from 'react-blurhash';

import { getAllCars } from '../../../../lib/getAllCars';
import type { CarModel } from '../../../../models/Car';
import Car from '../../../../models/Car';
import dbConnect from '../../../../utils/dbConnect';
import { getAsString } from '../../../../utils/getAsString';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    margin: 'auto',
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

type CarDetailsProps = {
  car: CarModel;
  imgHash: string;
};

export default function CarDetails({ car, imgHash }: CarDetailsProps) {
  const classes = useStyles();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{`${car.make} ${car.model}`}</title>
      </Head>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={() => {
          router.back();
        }}
      >
        Back
      </Button>
      <Paper className={classes.paper} elevation={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={5}>
            <div style={{ position: 'relative' }}>
              <BlurhashCanvas
                // Your generated Blurhash string
                hash={imgHash}
                // getBlurhash **always** returns 32×32 dimensions
                width={32}
                height={32}
                punch={1}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  width: '100%',
                  height: '100%',
                }}
              />
              <Image
                alt="complex"
                height={368}
                width={491}
                src={car.photourl}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={7} container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography variant="h5">
                  {`${car.make} ${car?.model}`}
                </Typography>
                <Typography gutterBottom variant="h4">
                  TWD{car.price}
                </Typography>
                <Typography gutterBottom variant="body2" color="textSecondary">
                  Year: {car.year}
                </Typography>
                <Typography gutterBottom variant="body2" color="textSecondary">
                  KMs: {car.kilometers}
                </Typography>
                <Typography gutterBottom variant="body2" color="textSecondary">
                  Fuel Type: {car.fueltype}
                </Typography>
                <Typography gutterBottom variant="body1" color="textSecondary">
                  Details: {car.details}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await getAllCars();
  const paths = response.map((car) => ({
    params: {
      id: car.id.toString(),
      make: car.make.replace(/\s/g, ''),
      model: car.model.replace(/\s/g, ''),
    },
  }));
  return { fallback: false, paths };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  await dbConnect();

  const car = (await Car.findOne({
    id: getAsString(params?.id),
  }).lean()) as CarModel;

  delete car._id;
  const imgHash = await getBlurhash(car.photourl);

  return {
    props: { car, imgHash },
    revalidate: 1000,
  };
};
