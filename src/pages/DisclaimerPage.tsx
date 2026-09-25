
import React from 'react';
import { H2, SectionDivider } from '../components/ui';

export const DisclaimerPage = () => {
  return (
    <div className="bg-brand-bg min-h-screen text-gray-300 font-sans pb-24">
      <div className="max-w-[680px] mx-auto px-6 pt-32">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-mono text-white leading-tight mb-4">
            Affiliate Disclaimer
          </h1>
          <p className="text-gray-400 font-mono text-sm">Last updated: April 2026</p>
        </div>

        <div className="prose prose-invert max-w-none text-[17px] leading-[1.8] space-y-6">
          <H2>AFFILIATE RELATIONSHIPS</H2>
          <p>
            domskysolutions.com is a participant in affiliate programs, including programs offered by the tools and software I review.
          </p>
          <p>
            This means that when you click certain links on my website and make a purchase or sign up for a service, I may receive a commission at no additional cost to you.
          </p>

          <SectionDivider />

          <H2>WHICH LINKS ARE AFFILIATE LINKS</H2>
          <p>
            I do not mark every affiliate link individually. You should assume that any link to a product or service on this website could be an affiliate link.
          </p>

          <SectionDivider />

          <H2>MY COMMITMENT TO HONESTY</H2>
          <p>
            Affiliate relationships never influence my reviews, ratings, or recommendations. I only recommend products and services I have personally tested and genuinely believe will be useful to my readers.
          </p>
          <p>
            I have declined affiliate arrangements with tools I do not believe in, and I publish honest negative reviews of tools even when I have affiliate relationships with them.
          </p>

          <SectionDivider />

          <H2>FTC DISCLOSURE</H2>
          <p>
            In accordance with the Federal Trade Commission guidelines, I disclose that domskysolutions.com may receive compensation for links to products and services.
          </p>

          <SectionDivider />

          <H2>QUESTIONS</H2>
          <p>
            If you have questions about my affiliate relationships, please contact me at:<br />
            <a href="mailto:team@domskysolutions.com" className="text-brand-cyan hover:underline">team@domskysolutions.com</a>
          </p>
        </div>
      </div>
    </div>
  );
};

