
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
            Domsky Solutions may participate in affiliate programs offered by software companies covered on this site.
          </p>
          <p>
            If you click a clearly identified compensated link and make a purchase or sign up, Domsky Solutions may receive a commission at no additional cost to you.
          </p>

          <SectionDivider />

          <H2>WHICH LINKS ARE AFFILIATE LINKS</H2>
          <p>
            Compensated links are identified, and an affiliate disclosure appears before the first compensated link in relevant content. Official source links used as evidence remain direct and non-affiliate.
          </p>

          <SectionDivider />

          <H2>OUR COMMITMENT TO HONESTY</H2>
          <p>
            Commercial relationships do not determine an editorial conclusion. Reviews state their evidence limits, intended use case and material drawbacks so readers can assess the recommendation.
          </p>
          <p>
            A product is not presented as personally tested unless a dated, reviewable testing record supports that statement. Missing test details are treated as not documented.
          </p>

          <SectionDivider />

          <H2>FTC DISCLOSURE</H2>
          <p>
            In accordance with the Federal Trade Commission guidelines we disclose that domskysolutions.com may receive compensation for links to products and services.
          </p>

          <SectionDivider />

          <H2>QUESTIONS</H2>
          <p>
            If you have questions about affiliate relationships please contact:<br />
            <a href="mailto:domskysolutions@gmail.com" className="text-brand-cyan hover:underline">domskysolutions@gmail.com</a>
          </p>
        </div>
      </div>
    </div>
  );
};

