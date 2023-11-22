import React, { useState, ReactNode } from 'react';
import Link from 'next/link';
import Privacy from '@/app/privacy';
import Terms from '@/app/terms';
import { ModalBox } from '@/components/modal';
import { GoogleIcon, FacebookIcon, TwitterIcon } from '@/app/icons';
import { Button } from '../ui/button';


export const Footer = () => {
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  if (showTerms) {
    return (
      <ModalBox
        header="Terms of Services"
        showModal={showTerms}
        onClose={() => setShowTerms(prev => !prev)}
        style={{
          width: '70%',
          height: '90vh',
          overflowY: 'auto',
          padding: '20px',
        }}>
        <Terms />
      </ModalBox>
    )
  }
  if (showPrivacy) {
    return (
      <ModalBox
        header="Privacy Policy"
        showModal={showPrivacy}
        onClose={() => setShowPrivacy(prev => !prev)}
        style={{
          width: '70%',
          height: '90vh',
          overflowY: 'auto',
          padding: '20px',
        }}>
        <Privacy />
      </ModalBox>
    )
  }
  return (
    <footer className="bg-blue text-white p-4 text-center fixed bottom-0 w-full">
      <div className="mx-auto max-w-7xl py-8 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <nav className="-mx-5 -my-2 flex flex-wrap justify-center order-2" aria-label="Footer">
          <div className="px-5">
            <a className="text-base text-white hover:text-red cursor-pointer" onClick={() => setShowTerms(prev => !prev)}>
              Terms of Service
            </a>
          </div>

          <div className="px-5">
            <a className="text-base text-white hover:text-red cursor-pointer" onClick={() => setShowPrivacy(prev => !prev)}>
              Privacy Policy
            </a>
          </div>
        </nav>
        <div className="mt-8 md:mb-8 flex justify-center space-x-2 md:order-3  ">
          <TwitterIcon size={25} hoverColor="red" fillColor="white" />
          <FacebookIcon size={25} hoverColor="red" fillColor="white" />
          <GoogleIcon size={25} hoverColor="red" fillColor="white" />
        </div>
        <div className="mt-8  md:order-1 md:mt-0 ">
          <p className="text-center text-base text-white">&copy; Gram Circle</p>
        </div>
      </div>
    </footer>
  );
};
