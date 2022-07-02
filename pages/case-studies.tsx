import React from "react";

const caseStudies = () => {
  return (
    <div>
      <section>
        <div className="mx-auto py-4 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
          <div className="space-y-12">
            <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Projects
              </h1>
              <h2 className="text-2xl font-extrabold tracking-tight sm:text-2xl">
                Ongoing Projects
              </h2>
              <p className="text-xl text-gray-500">(pictures coming soon)</p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="mx-auto py-4 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
          <div className="space-y-12">
            <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
              <h2 className="text-2xl font-extrabold tracking-tight sm:text-2xl">
                Big Buddy Program Python Class
              </h2>
              <p className="text-xl text-gray-500">
                We are partnering with the Big Buddy Program to teach Python to
                a group of highschool students. This program is a part of the
                Mayor&apos;s Youth Workforce Experience program.
              </p>
              <p className="text-xl text-gray-500">
                Students are learning Python from the ground up through
                project-based learning, and had a chance to earn a Industry
                Based Certification at the end of the program.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="mx-auto py-4 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
          <div className="space-y-12">
            <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-3xl">
                Past accomplishments
              </h2>

              <h3 className="text-2xl font-extrabold tracking-tight sm:text-2xl">
                Python Certification for LA
              </h3>
              <p className="text-xl text-gray-500">
                We had the privilege of partnering with the LA Department of
                Corrections to help get a Python Industry Based Certification
                approved by the LA Workforce Commission.
              </p>
              <p className="text-xl text-gray-500 font-bold">
                This helps schools in the state be able to:
              </p>

              <ul className="list-disc py-4 px-4">
                <li className="text-xl text-gray-500">
                  More easily access funding for Python training.
                </li>
                <li className="text-xl text-gray-500">
                  Win support for expanding efforts to train students in
                  computer science.
                </li>
                <li className="text-xl text-gray-500">
                  Help students earn industry-recognized credentials while in
                  school.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="mx-auto py-4 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
          <div className="space-y-12">
            <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
              <h3 className="text-2xl font-extrabold tracking-tight sm:text-2xl">
                EBR Schools CompTIA Training
              </h3>
              <p className="text-xl text-gray-500">
                We are working in partnership with East Baton Rouge Schools to
                help teach CompTIA to a group of students over the summer.
              </p>
              <p className="text-xl text-gray-500">
                Students had the opportunity to earn a CompTIA certificate at
                the end of the program.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default caseStudies;
