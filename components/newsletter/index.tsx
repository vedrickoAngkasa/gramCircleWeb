import Section from '@/components/section';
import Image from 'next/image';
import { Button } from '../ui/button';

export default function NewsLetter() {


  return (
    <Section
      id="Newsletter"
      header={'Join Our Newsletter'}
      subheader={
        'Stay informed with the latest updates and news from getmorereviews.com. Subscribe to our newsletter!'
      }>
      <div className="flex items-center justify-center mb-10">
        <input
          className="w-1/3 px-4 py-4 rounded-lg border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-blue-500"
          type="email"
          placeholder="Enter your email"
          {...register('email', { required: 'Email can not be left empty' })}
        />
        <Button caption={'Subscribe'} className="px-12 mx-4" />
      </div>
    </Section>
  );
}
