import { ImagesearchRoller } from "@mui/icons-material";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.scss";

const illustrations = [
  {
    path: "/illustrations/programming.svg",
    description: "Python Training",
  },
  {
    path: "/illustrations/team.svg",
    description: "Project-Based Learning",
  },
  {
    path: "/illustrations/coauthoring.svg",
    description: "Co-authoring with us",
  },
];

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
      <section className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Teach Computer Science in your District
            </h1>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
              Implement equitable CS programs in your district, with dedicated
              support.
            </p>
          </div>
        </div>
        <div className="mx-auto py-4 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24 flex justify-between">
          <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-aDark hover:bg-aPrimary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <Link href="/contact">Work with Us</Link>
            </button>
          </div>
          <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none ">
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-aDark hover:bg-aPrimary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <Link href="/about">Learn More</Link>
            </button>
          </div>
        </div>
      </section>
      <section>
        <div>
          <div className="bg-white">
            <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
              <div className="space-y-12">
                <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
                  <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                    We give your teachers CS superpowers
                  </h2>
                  <p className="text-xl text-gray-500">
                    Implement equitable CS programs in your district, with
                    dedicated support. No CS degrees required.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div>
          <div className="bg-white">
            <div className="mx-auto py-6 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
              <div className="space-y-12">
                <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
                  <h5 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                    We train your teachers
                  </h5>
                  <p className="text-xl text-gray-500">
                    You don&apos;t need a CS degree to teach the basics.
                    We&apos;ll train your teachers, so they have the skills they
                    need.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white">
            <div className="mx-auto py-6 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
              <div className="space-y-12">
                <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
                  <h5 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                    Credentials for students
                  </h5>
                  <p className="text-xl text-gray-500">
                    Strengthen your high school&apos;s diploma by preparing
                    students for high-paying software engineering jobs.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white">
            <div className="mx-auto py-6 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
              <div className="space-y-12">
                <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
                  <h5 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                    Equity Oriented
                  </h5>
                  <p className="text-xl text-gray-500">
                    We are committed to doing whatever it takes to empower your
                    students. Everyone deserves a chance to code, regardless of
                    race, gender, or status.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section>
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
      </section> */}
      <section>
        <div className="bg-white">
          <div className="max-w-7xl mx-auto py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-24">
            <div className="space-y-12">
              <div className="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                  Want to lead the way in code literacy?
                </h2>
                <p className="text-xl text-gray-500">
                  We are currently looking for districts and schools who are
                  excited about:
                </p>
              </div>
              <ul
                role="list"
                className="mx-auto space-y-16 sm:grid sm:grid-cols-2 sm:gap-16 sm:space-y-0 lg:grid-cols-3 lg:max-w-5xl"
              >
                {illustrations.map((illustration) => (
                  <li key={illustration.description}>
                    <div className="space-y-6">
                      <img
                        className="mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56"
                        src={illustration.path}
                        alt={illustration.description}
                      />
                      <div className="space-y-2">
                        <div className="text-lg leading-6 font-medium space-y-1">
                          <h3>{illustration.description}</h3>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <h6></h6>
        <p></p>
        <div className="mx-auto py-4 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24 flex justify-center">
          <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
            <button className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-aDark hover:bg-aPrimary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <Link href="/contact">Want to know more?</Link>
            </button>
          </div>
        </div>
      </section>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;
