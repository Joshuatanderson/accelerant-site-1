import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
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
      <section>
        <div className={styles.hero}>
          <div className={styles.heroText}>
            <h1>Teach Computer Science in your District</h1>
            <h2>
              Implement equitable CS programs in your district, with dedicated
              support.
            </h2>
          </div>
          <div>
            <button>
              <Link href="/contact">Work with us</Link>
            </button>

            <button>
              <Link href="/about">Learn more</Link>
            </button>
          </div>
        </div>
      </section>
      <section>
        <div>
          <h3>We give your teachers CS superpowers</h3>
          <h4>
            Implement equitable CS programs in your district, with dedicated
            support. No CS degrees required.
          </h4>
        </div>
        <div>
          <button>
            <Link href="/contact">Work with us</Link>
          </button>
        </div>
      </section>
      <section>
        <div>
          <h5>We train your teachers</h5>
          <p>
            You don&apos;t need a CS degree to teach the basics. We&apos;ll
            train your teachers, so they have the skills they need.
          </p>
        </div>
        <div>
          <h5>Credentials for students</h5>
          <p>
            Strengthen your high school&apos;s diploma by preparing students for
            high-paying software engineering jobs.
          </p>
        </div>
        <div>
          <h5>Equity Oriented</h5>
          <p>
            We are committed to doing whatever it takies to empower your
            students. Everyone deserves a chance to code, regardless of race,
            gender, or status.
          </p>
        </div>
      </section>
      <section>
        <div>
          <h6>How did it start?</h6>
          <p>
            I founded Accelerant because I firmly believe that every student
            deserves equitable access to foundational computer science
            education. Code literacy is the new literacy. I&apos;d be honored to
            help your district empower your students through equitable access to
            computer science education, through teacher training, project based
            learning, and a co-authored program that suits your district&apos;s
            needs. Every school district is unique, and your road to teaching
            computer science may look different from your neighbor. I want to
            help you on that journey.
          </p>
          <button>
            <Link href="/about">Learn more about Accelerant</Link>
          </button>
        </div>
        <div>
          <Image src="/team/joshua.jpeg" width={100} height={100}></Image>
          <div></div>
          Joshua Anderson, founder of Accelerant
        </div>
      </section>
      <section>
        <h6>Want to lead the way in code literacy?</h6>
        <p>
          We are currently looking for districts and schools who are excited
          about:
        </p>
        <div>
          <Image
            src="/illustrations/programming.svg"
            width={100}
            height={100}
          ></Image>
          Python Training
        </div>
        <div>
          <Image src="/illustrations/team.svg" width={100} height={100}></Image>
          Project-Based Learning
        </div>
        <div>
          <Image
            src="/illustrations/coauthoring.svg"
            width={100}
            height={100}
          ></Image>
          Co-authoring with us
        </div>
        <div>
          <button>
            <Link href="/contact">Want to know more?</Link>
          </button>
        </div>
      </section>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;
