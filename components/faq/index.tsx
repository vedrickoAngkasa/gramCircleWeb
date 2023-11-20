import React, { useState } from 'react';
import Section from '@/components/section';
import SearchInput from '@/components/search';

import { FAQs } from '@/data/FAQs';

export const FAQ = () => {
  type FAQItem = {
    question: string;
    answer: string;
  };

  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);

  const handleQuestionClick = (index: number) => {
    setSelectedQuestion(prevIndex => (prevIndex === index ? null : index));
  };

  const handleSearch = (text: string) => {
    alert(text);
  };

  return (
    <Section id="FAQ" header={FAQs.header} subheader={FAQs.subheader}>
      {/* <SearchInput onSearch={handleSearch} /> */}
      <div className="dark:bg-gray-900 dark:text-white flex justify-center items-center">
        <div className="w-4/5 md:w-1/2">
          {FAQs.data.map((item: FAQItem, index: number) => (
            <div key={index} className="rounded-lg mb-1">
              <div
                className={`dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 flex rounded-lg justify-between items-center bg-gray-100 p-4 ${
                  selectedQuestion === index ? 'bg-gray-100' : 'bg-gray-100'
                }`}
                onClick={() => handleQuestionClick(index)}>
                <div className="text-left rounded-lg">
                  <span className="dark:text-gray-100 text-gray-700 font-medium">
                    {item.question}
                  </span>
                </div>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`w-4 h-4 transition-transform transform ${
                    selectedQuestion === index ? 'rotate-180' : ''
                  }`}>
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {selectedQuestion === index && (
                <div
                  className="bg-white px-4 pt-2 pb-4 py-6 text-left rounded-lg"
                  style={{ width: '100%' }}>
                  <span className="text-gray-600">{item.answer}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};
