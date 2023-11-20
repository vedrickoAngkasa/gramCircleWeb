"use client"
// import Layout from '@/components/layout';
import { HeroImage } from '@/components/hero';
import { FAQ } from '@/components/faq';
import NewsLetter from '@/components/newsletter';
import { Testimonies } from '@/components/testimonies';
import Section from '@/components/section';
import { Footer } from '@/components/footer';
export default function Landing() {
    return (
        <>
            <div >
                {/* <HeroImage /> */}
                <Section id="whatisit" header="What is Get More Reviews" subheader={"Welcome to GetMoreReviews, where cutting-edge AI technology transforms product reviews into your secret weapon for e-commerce success. Our platform empowers you to effortlessly build a vector database of competitor product reviews, helping your customers write compelling reviews with just a few keywords"}>
                    <p></p>
                </Section>
                <Section id="boost" header="Boost Your Sales" subheader={"Increase your sales and conversion rates with authentic, user-generated reviews. Our AI-driven solution has helped countless e-commerce sellers supercharge their businesses."}>
                    <p></p>
                </Section>
                <Testimonies />
                {/* <NewsLetter /> */}
                <Footer />
            </div>
        </>
    );
}
