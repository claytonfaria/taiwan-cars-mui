/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
import {
  Button,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import type { SelectProps } from '@material-ui/core/Select/Select';
import type { Theme } from '@material-ui/core/styles';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Field, Form, Formik, useField, useFormikContext } from 'formik';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';

import type { Make } from '../lib/getMakes';
import type { Model } from '../lib/getModels';
import { getAsString } from '../utils/getAsString';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      margin: 'auto',
      maxWidth: 500,
      padding: theme.spacing(3),
      marginTop: theme.spacing(3),
    },
  })
);

export function Search() {
  const { data: makes } = useSWR<Make[]>(`/api/makes`, {
    dedupingInterval: 600_000,
  });

  const classes = useStyles();
  const router = useRouter();
  const prices = [500, 1000, 5000, 15_000, 25_000, 50_000, 250_000];

  const initialValues = {
    make: router.query.make ?? 'all',
    maxPrice: router.query.maxPrice ?? 'all',
    minPrice: router.query.minPrice ?? 'all',
    model: router.query.model ?? 'all',
  };

  const handleSubmit = (values: typeof initialValues) => {
    router.push(
      {
        pathname: '/',
        query: {
          ...values,
          page: 1,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <Paper className={classes.paper}>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="make-select">Make</InputLabel>
                  <Field
                    name="make"
                    as={Select}
                    labelId="make-select"
                    label="Make"
                  >
                    <MenuItem value="all">All Makes</MenuItem>
                    {makes?.map((make) => (
                      <MenuItem
                        key={make.make}
                        value={make.make}
                      >{`${make.make} (${make.count})`}</MenuItem>
                    ))}
                  </Field>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" fullWidth>
                  <ModelSelect name="model" make={getAsString(values.make)} />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="min-select">Min Price</InputLabel>
                  <Field
                    name="minPrice"
                    as={Select}
                    labelId="min-select"
                    label="Min Price"
                  >
                    <MenuItem value="all">No Min</MenuItem>
                    {prices.map((price) => (
                      <MenuItem key={price} value={price}>
                        {price}
                      </MenuItem>
                    ))}
                  </Field>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="max-select">Max Price</InputLabel>
                  <Field
                    name="maxPrice"
                    as={Select}
                    labelId="max-select"
                    label="Max Price"
                  >
                    <MenuItem value="all">No Max</MenuItem>
                    {prices.map((price, index) => (
                      <MenuItem key={index} value={price}>
                        {price}
                      </MenuItem>
                    ))}
                  </Field>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Paper>
  );
}

export type ModelSelectProps = {
  name: string;
  make?: string;
} & SelectProps;

export function ModelSelect({ make, ...props }: ModelSelectProps) {
  const { setFieldValue } = useFormikContext();
  const [field] = useField({
    name: props.name,
  });

  const { data: models } = useSWR<Model[]>(`/api/models?make=${make}`, {
    dedupingInterval: 600_000,
  });

  useEffect(() => {
    if (!models?.map((a) => a.model).includes(field.value)) {
      setFieldValue('model', 'all');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [make, models]);

  return (
    <>
      <InputLabel id="model-select">Model</InputLabel>
      <Select {...props} {...field} labelId="model-select" label="Model">
        <MenuItem value="all">All Models</MenuItem>
        {models?.map((model) => (
          <MenuItem
            key={model.model}
            value={model.model}
          >{`${model.model} (${model.count})`}</MenuItem>
        ))}
      </Select>
    </>
  );
}
