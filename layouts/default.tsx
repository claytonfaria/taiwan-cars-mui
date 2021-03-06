import { Container } from '@material-ui/core';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { useRouter } from 'next/router';
import type { Dispatch, SetStateAction, ReactElement } from 'react';

import { NavBar } from '../components/NavBar';
import { pageTransitionAnimation } from '../utils/pageTransitionAnimation';

type LayoutProps = {
  children: ReactElement;
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
};

export default function Layout({
  children,
  darkMode,
  setDarkMode,
}: LayoutProps) {
  const siteTitle = 'Taiwan Cars';

  const router = useRouter();

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>{siteTitle}</title>
        <meta
          name="description"
          content="Taiwan Auto Car Dealer - ficticious"
        />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=dark&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-white-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Container maxWidth="lg">
        <motion.div
          key={router.route}
          initial="pageInitial"
          animate="pageAnimate"
          variants={pageTransitionAnimation}
        >
          {children}
        </motion.div>
      </Container>
    </>
  );
}
