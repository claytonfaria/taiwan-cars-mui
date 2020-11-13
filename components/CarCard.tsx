import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';

import type { CarModel } from '../models/Car';

type CarCardProps = {
  car: CarModel;
};

const useStyles = makeStyles(() => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  achorTag: {
    textDecoration: 'none',
  },
}));

export function CarCard({ car }: CarCardProps) {
  const classes = useStyles();

  return (
    <Link href={`/car/${car.make}/${car.model.replace(/\s/g, '')}/${car.id}`}>
      <a className={classes.achorTag}>
        <Card>
          <CardHeader
            title={`${car.make} ${car.model}`}
            subheader={`TWD ${car.price}`}
          />
          <CardMedia
            className={classes.media}
            image={car.photourl}
            title={`${car.make} ${car.model}`}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {car.details}
            </Typography>
          </CardContent>
        </Card>
      </a>
    </Link>
  );
}
