import Link from "next/link";
import React from "react";

const Contact = () => {
  return (
    <div>
      <section>
        <div>
          <Link href="mailto:joshua@acceleranteducation.com">Mail</Link>
        </div>
        <div>
          <Link href="tel:+1-225-916-5480">Phone</Link>
        </div>
      </section>
      {/* TODO: add social media links */}
      {/* TODO: add contact form */}
    </div>
  );
};

export default Contact;
