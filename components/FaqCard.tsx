import type { Theme } from '@material-ui/core';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  createStyles,
  makeStyles,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import type { FaqModel } from '../models/Faq';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  })
);

type FaqCardProps = {
  faq: FaqModel;
};

export const FaqCard = ({ faq }: FaqCardProps) => {
  const classes = useStyles();
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>{faq.question}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{faq.answer}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};
