import Image from 'next/image';
import React, { useEffect, useState } from "react";

interface TestimonyProps {
    image: string;
    testimony: string;
    name: string;
    position: string;
    company: string;
    rating: number;
    summary: string[];
}

export const TestimonyCard: React.FC<TestimonyProps> = ({
    image,
    testimony,
    name,
    position,
    company,
    rating,
    summary,
}) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize(); // Initial check on component mount

        window.addEventListener("resize", handleResize); // Event listener for screen size changes

        return () => {
            window.removeEventListener("resize", handleResize); // Clean up the event listener on component unmount
        };
    }, []);

    if (isMobile) {
        return (
            <div className="dark:bg-gray-900 dark:text-white flex flex-col items-center bg-white">
                <div className="dark:bg-gray-900 dark:text-white w-30 h-30 rounded-full border-gray-300 border-2">
                    <Image
                        className="object-cover w-full h-full rounded-full"
                        src={image}
                        alt="profile picture"
                        width={80}
                        height={80}
                    />
                </div>
                <div className="flex items-center divide-x-2 divide-gray-300 dark:divide-gray-700 mt-3">
                    <cite className="pr-3 font-medium text-gray-900 dark:text-white">{name}</cite>
                    <cite className="pl-3 text-sm text-gray-500 dark:text-gray-400">{position} at {company}</cite>
                </div>
                <div className="flex items-center divide-x-2 divide-gray-300 dark:divide-gray-700 mt-3">
                    <div className="flex items-center text-yellow-300 pr-3">
                        {Array.from({ length: 5 }).map((_, index) => {
                            const starIndex = index + 1;
                            let fill = 'none';
                            if (starIndex <= Math.floor(rating)) {
                                fill = 'gold';
                            } else if (starIndex === Math.ceil(rating)) {
                                fill = `url(#half-star-${starIndex})`;
                            }

                            return (
                                <svg
                                    key={index}
                                    aria-hidden="true"
                                    className="w-7 h-7"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <defs>
                                        <linearGradient id={`half-star-${starIndex}`}>
                                            <stop offset="50%" stopColor="gold" stopOpacity="1" />
                                            <stop offset="50%" stopColor="transparent" stopOpacity="1" />
                                        </linearGradient>
                                    </defs>
                                    <path
                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                        fill={fill}
                                        stroke="darkgray"
                                        strokeWidth="1"
                                        strokeLinecap="butt"
                                        strokeLinejoin="miter"
                                    ></path>
                                </svg>
                            );
                        })}

                    </div>
                    {summary && summary.map((text, index) => (
                        <cite
                            key={index}
                            className="pl-3 pr-3 text-sm text-gray-500 dark:text-gray-400"
                        >
                            {text}
                        </cite>
                    ))}                </div>
                <blockquote className="text-left relative mt-3 mx-10">
                    <p className="text-lg text-gray-700 dark:text-white">&quot;{testimony}&quot;</p>
                </blockquote>
            </div>
        );
    }

    return (
        <div className="dark:bg-gray-900 dark:text-white hidden md:flex flex items-center bg-white">
            <div className="w-50 flex-none p-0.5 mr-10 rounded-full border border-blue-500">
                <Image
                    className="w-40 h-40 rounded-full "
                    src={image}
                    alt="profile picture"
                    width={80}
                    height={80}
                />
            </div>
            <div className="flex-grow">
                <div className="flex items-center divide-x-2 divide-gray-300 dark:divide-gray-700 mb-5">
                    <div className="flex items-center text-yellow-300 pr-3">

                        {Array.from({ length: 5 }).map((_, index) => {
                            const starIndex = index + 1;
                            let fill = 'none';
                            if (starIndex <= Math.floor(rating)) {
                                fill = 'gold';
                            } else if (starIndex === Math.ceil(rating)) {
                                fill = `url(#half-star-${starIndex})`;
                            }

                            return (
                                <svg
                                    key={index}
                                    aria-hidden="true"
                                    className="w-7 h-7"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <defs>
                                        <linearGradient id={`half-star-${starIndex}`}>
                                            <stop offset="50%" stopColor="gold" stopOpacity="1" />
                                            <stop offset="50%" stopColor="transparent" stopOpacity="1" />
                                        </linearGradient>
                                    </defs>
                                    <path
                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                        fill={fill}
                                        stroke="darkgray"
                                        strokeWidth="1"
                                        strokeLinecap="butt"
                                        strokeLinejoin="miter"
                                    ></path>
                                </svg>
                            );
                        })}
                    </div>
                    {summary && summary.map((text, index) => (
                        <cite
                            key={index}
                            className="pl-3 pr-3 text-sm text-gray-500 dark:text-gray-400"
                        >
                            {text}
                        </cite>
                    ))}
                </div>
                <blockquote className="text-left relative">
                    <p className="text-lg text-gray-700 dark:text-white">&quot;{testimony}&quot;</p>
                </blockquote>
                <div className="flex items-center divide-x-2 divide-gray-300 dark:divide-gray-700 mt-5">
                    <cite className="pr-3 font-medium text-gray-900 dark:text-white">{name}</cite>
                    <cite className="pl-3 text-sm text-gray-500 dark:text-gray-400">{position} at {company}</cite>
                </div>
            </div>
        </div>
    );
};


{/* <div className="md:hidden mb-3">
                    <Image
                        className="w-30 h-30 rounded-full border-gray-300 border-2"
                        src={image}
                        alt="profile picture"
                        width={80}
                        height={80}
                    />
                </div>

                <figcaption className="flex items-center space-x-3">
                    <div className="flex items-center divide-x-2 divide-gray-300 dark:divide-gray-700">
                        <cite className="pr-3 font-medium text-gray-900 dark:text-white">{name}</cite>
                        <cite className="pl-3 text-sm text-gray-500 dark:text-gray-400">{position} at {company}</cite>
                    </div>
                </figcaption> */}



// export const TestimonyCard: React.FC<TestimonyProps> = ({ image, testimony, name, position, company }) => {
//     return (
//         <div className="flex items-center ">
//             <div className="w-50 flex-none mr-5">
//                 <Image
//                     className="w-30 h-30 rounded-full border-gray-300 border-2"
//                     src={image}
//                     alt="profile picture"
//                     width={80}
//                     height={80}
//                 />
//             </div>
//             <div className="flex-grow">
//                 <figcaption className="flex items-center mb-6 space-x-3">
//                     <div className="flex items-center divide-x-2 divide-gray-300 dark:divide-gray-700">
//                         <div className="flex items-center text-yellow-300 pr-3">
//                             {Array.from({ length: 5 }).map((_, index) => (
//                                 <svg key={index} aria-hidden="true" className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>

//                             ))}
//                         </div>
//                         <cite className="pl-3 pr-3 text-sm text-gray-500 dark:text-gray-400">Efficient knowledge management</cite>
//                         <cite className="pl-3 text-sm text-gray-500 dark:text-gray-400">Instant answers</cite>
//                     </div>
//                 </figcaption>

//                 <blockquote className="text-left relative">
//                     <p className="text-lg text-gray-700 dark:text-white">&quot;{testimony}&quot;</p>
//                 </blockquote>
//                 <figcaption className="flex items-center mt-6 space-x-3">
//                     <div className="flex items-center divide-x-2 divide-gray-300 dark:divide-gray-700">
//                         <cite className="pr-3 font-medium text-gray-900 dark:text-white">{name}</cite>
//                         <cite className="pl-3 text-sm text-gray-500 dark:text-gray-400">{position} at {company}</cite>
//                     </div>
//                 </figcaption></div>
//         </div>
//     );
// };
