import {
  AppBar,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from '@material-ui/core';
import type { Theme } from '@material-ui/core/styles';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Brightness4, Brightness7 } from '@material-ui/icons';
import NextLink from 'next/link';
import type { Dispatch, SetStateAction } from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuLink: {
      marginRight: theme.spacing(2),
      marginLeft: theme.spacing(2),
      fontWeight: 'bold',
      cursor: 'pointer',
      fontSize: '1rem',
      paddingTop: '1rem',
      paddingBottom: '1rem',
    },
    title: {
      flexGrow: 1,
      fontWeight: 'bolder',
    },
  })
);

type NavBarProps = {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
};

export function NavBar({ darkMode, setDarkMode }: NavBarProps) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6">
            Taiwan Cars
          </Typography>

          <IconButton
            aria-label="dark-mode toggle"
            color="inherit"
            onClick={() => {
              setDarkMode(!darkMode);
            }}
          >
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          <NextLink href="/" passHref>
            <Link className={classes.menuLink} color="inherit" underline="none">
              Home
            </Link>
          </NextLink>
          <NextLink href="/faq" passHref>
            <Link className={classes.menuLink} color="inherit" underline="none">
              FAQ
            </Link>
          </NextLink>
        </Toolbar>
      </AppBar>
    </div>
  );
}
