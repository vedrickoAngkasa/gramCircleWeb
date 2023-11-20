import Image from 'next/image';
import { Button } from '../ui/button';
import { hero } from '@/data/hero';
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
// import { LoginModal } from '@/components/modal/login';
import { useState, useRef, useEffect, MouseEvent } from 'react';

export const HeroImage = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  return (
    <section className="h-screen relative z-0">
      <div className="absolute top-0 left-0 right-0 bottom-0">
        <Image
          src="/images/hero-5.png"
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>
      <div className="absolute top-0 left-0 right-0 bottom-0 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* <div className="bg-green-00 mb-10 mt-16"><AutoBot /></div> */}
        <div className="bg-blac text-white p-4 flex flex-col justify-end mb-10">
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-3 lg:mb-4 text-shadow-black">
            {hero.heading}
          </h1>
          <p className="text-base lg:text-lg mb-5 lg:mb-8 text-shadow-black">{hero.subHeading}</p>
          <div className="flex justify-start mt-4">
            <Button onClick={() => setShowModal(true)} >Get Started</Button>
            <Button >Book Demo</Button>
          </div>
        </div>
      </div>
      {/* <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-30 flex flex-col h-screen mb-10">
        <div className="flex-grow bg-red-500">
          <AutoBot />
        </div>
        <div className="text-white text-left lg:w-2/5 w-9/10 ml-10 mr-10 lg:mr-0 bg-black bg-opacity-0 mb-10 lg:mb-48">
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-3 lg:mb-4 text-shadow-black">
            {hero.heading}
          </h1>
          <p className="text-base lg:text-lg mb-5 lg:mb-8 text-shadow-black">{hero.subHeading}</p>
          <div className="flex justify-start mt-4">
            <Button
              caption="Create Bot"
              onClick={() => setShowModal(true)}
              //   onClick={() => {
              //     const tid = '097IjxrhdUjJeolmlM0g';
              //     const bid = 'vhN5AlioQzgX4yNTq6NM';
              //     const uid = 'oDB2O2HImmW7e5sp0NqImlp3yuu1';

              //     router.push(`/bot?userId=${uid}&botId=${bid}&teamId=${tid}`);
              //   }}
            />
            <Button caption="Book Demo" style="grey" />
          </div>
        </div>
      </div> */}
      {showModal && (<div>login</div>
        // <LoginModal showModal={showModal} onClose={() => setShowModal(false)}>
        //   <p></p>
        // </LoginModal>
      )}
    </section>
  );
};
