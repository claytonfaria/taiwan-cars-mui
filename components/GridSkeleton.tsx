import { Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

export function GridSkeleton() {
  return (
    <>
      <Grid item xs={12} sm={6}>
        <Skeleton variant="rect" width="100%">
          <div style={{ paddingTop: '120%' }} />
        </Skeleton>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Skeleton variant="rect" width="100%">
          <div style={{ paddingTop: '120%' }} />
        </Skeleton>
      </Grid>
    </>
  );
}
