import React, { ReactNode } from 'react';

interface TestimonialSectionProps {
  id?: string;
  header: string;
  subheader: string;
  children: ReactNode;
}

const Section: React.FC<TestimonialSectionProps> = ({ id, header, subheader, children }) => {
  return (
    <div className="dark:bg-gray-900 flex justify-center items-center bg-white mt-10">
      <section
        id={id}
        className=" flex-col items-center lg:mx-120 justify-center mx-100 mb-10 mt-10 text-center w-full">
        <h2 className="mb-5 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          {header}
        </h2>
        <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400 w-3/5 mx-auto mb-10">
          {subheader}
        </p>
        {children}
      </section>
    </div>
  );
};

export default Section;
