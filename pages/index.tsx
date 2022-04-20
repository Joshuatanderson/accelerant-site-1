import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Accelerant</title>
        <meta
          name="Accelerant"
          content="Computer science support for school districts and teachers"
        />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;
