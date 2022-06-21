import Image from "next/image";
import Link from "next/link";
import React from "react";

const About = () => {
  return (
    <div>
      <h1>About Accelerant</h1>
      <section>
        <h2>Our Story</h2>
        <div>
          <Image src="/joshua.jpeg" width={100} height={100} />
          <div>
            <p>
              The seed for Accelerant was planted when our founder talked with
              educators across the country and realized that millions of
              children have no access to foundational computer science courses.
              As a self-taught developer, he knew that learning to code was
              really difficult - especially when done outside of a well-planned
              pedagogical system. Accelerant was born out of a desire to give
              equitable access to computer science education to everyone.
            </p>
          </div>
        </div>
      </section>
      <section>
        <div>
          <Image src="/team/joshua.jpeg" width={100} height={100} />
          <p>Joshua Anderson</p>
        </div>
        <div>
          <Image src="/team/pronoy.png" width={100} height={100}></Image>
          <p>Pronoy Datta</p>
        </div>
        <div>
          <Image src="/team/josie.png" width={100} height={100} />
          <p>Josie Hatley</p>
        </div>
      </section>
      <section>
        <h3>Partners</h3>
        <div>
          <Image src="/partners/ebrps.png" width={200} height={100} />
        </div>
        <div>
          <Image src="/partners/cmu.png" width={200} height={100}></Image>
        </div>
        <div>
          <Image src="/partners/bigBuddy.png" width={200} height={100} />
        </div>
        <div>
          <button>success stories</button>
          <button>
            <Link href="/contact">contact us</Link>
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
