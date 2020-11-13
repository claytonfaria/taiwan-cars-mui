import { Link, makeStyles } from '@material-ui/core';
import type { PaginationRenderItemParams } from '@material-ui/lab';
import { Pagination, PaginationItem } from '@material-ui/lab';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import type { ParsedUrlQuery } from 'querystring';
import { forwardRef } from 'react';

const useStyles = makeStyles(() => ({
  root: {
    paddingBottom: '1rem',
    paddingTop: '1.5rem',
  },
  ul: {
    justifyContent: 'center',
  },
}));

type CarPaginationProps = {
  totalPages?: number;
};

export function CarPagination({ totalPages }: CarPaginationProps) {
  const { query } = useRouter();
  const classes = useStyles();

  return (
    <Pagination
      classes={{
        root: classes.root,
        ul: classes.ul,
      }}
      color="primary"
      page={Number(query.page ?? '1')}
      count={totalPages ?? 1}
      renderItem={(item) => (
        <PaginationItem
          component={PaginationLink}
          query={query}
          item={item}
          {...item}
        />
      )}
    />
  );
}

type PaginationLinkProps = {
  item: PaginationRenderItemParams;
  query: ParsedUrlQuery;
};

const PaginationLink = forwardRef<HTMLAnchorElement, PaginationLinkProps>(
  ({ item, query, ...props }, ref) => (
    <NextLink
      passHref
      scroll={false}
      href={{
        pathname: '/',
        query: { ...query, page: item.page },
      }}
      shallow
    >
      <Link ref={ref} {...props} />
    </NextLink>
  )
);
