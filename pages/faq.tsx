import { Typography, Container } from '@material-ui/core';
import type { GetStaticProps } from 'next';

import { FaqCard } from '../components/FaqCard';
import { getFaq } from '../lib/getFaq';
import type { FaqModel } from '../models/Faq';

type FaqProps = {
  faqs: FaqModel[];
};

const FaqPage = ({ faqs }: FaqProps) => {
  return (
    <Container maxWidth="md">
      <Typography
        variant="h5"
        style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}
      >
        Frequent Asked Questions
      </Typography>
      {faqs.map((faq) => (
        <FaqCard faq={faq} key={faq.question} />
      ))}
    </Container>
  );
};
export default FaqPage;

export const getStaticProps: GetStaticProps = async () => {
  const faqs = await getFaq();

  return { props: { faqs } };
};
