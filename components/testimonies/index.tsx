import React, { useState, useEffect } from 'react';
import Section from '@/components/section';
import { TestimonyCard } from './card';
import { testimonies } from '@/data/testimonies';

export function Testimonies() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  const handlePrevClick = () => {
    setActiveIndex(prevIndex => (prevIndex === 0 ? testimonies.data.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setActiveIndex(prevIndex => (prevIndex === testimonies.data.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <Section id="Testimonials" header={testimonies.header} subheader={testimonies.subheader}>
      <div className="dark:bg-gray-900 dark:text-white flex items-center justify-center">
        <div className=" flex-none hidden md:block ml-60 " onClick={handlePrevClick}>
          <button className="mr-6  focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-10 h-10 text-blue-500">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        </div>
        <div className="flex-grow flex justify-center items-center flex-col">
          <div>
            {testimonies.data.map((testimonial, index) => (
              <figure
                key={index}
                className={`max-w-screen-md ${index === activeIndex ? '' : 'hidden'}`}>
                {/* <TestimonyCard key={index} image={testimonial.image} name={testimonial.name} testimony={testimonial.testimony} position={testimonial.position} company={testimonial.company} rating={testimonial.rating} summary={testimonial.summary} /> */}
                <TestimonyCard key={index} {...testimonial} />
              </figure>
            ))}
          </div>
          <div className="flex items-center mt-10">
            {testimonies.data.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full mx-1 focus:outline-none ${index === activeIndex ? 'bg-blue-500' : 'bg-blue-100'
                  }`}
                onClick={() => handleDotClick(index)}></button>
            ))}
          </div>
        </div>
        <div className="flex-none hidden md:block mr-60" onClick={handleNextClick}>
          <button className=" focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-10 h-10 text-blue-500">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </Section>
  );
}
