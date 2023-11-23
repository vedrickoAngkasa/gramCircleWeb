"use client"
import Image from 'next/image'
import { HeroImage } from '@/components/hero';
import { FAQ } from '@/components/faq';
import NewsLetter from '@/components/newsletter';
import { Testimonies } from '@/components/testimonies';
import Section from '@/components/section';
import { Footer } from '@/components/footer';


export default function Home() {
  return (
    <div>
      <Section id="whatisit" header="POWER TO INFLUENCE" subheader={"Welcome to GramCircle, the innovative SaaS platform redefining influencer marketing. The Problem: Connecting brands with influencers is often complicated and time-consuming. Our Solution: A user-friendly platform where brands and influencers seamlessly collaborate."}>
        <p></p>
      </Section>
      <Testimonies />
      <NewsLetter />
      <Footer />
    </div >
  )
}
