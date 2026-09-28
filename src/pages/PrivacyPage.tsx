
import React from 'react';
import { Link } from 'react-router-dom';
import { H2, SectionDivider } from '../components/ui';

export const PrivacyPage = () => {
  return (
    <div className="bg-brand-bg min-h-screen text-gray-300 font-sans pb-24">
      <div className="max-w-[680px] mx-auto px-6 pt-32">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-mono text-white leading-tight mb-4">
            PRIVACY POLICY
          </h1>
          <p className="text-gray-400 font-mono text-sm">Last updated: 27 September 2026</p>
        </div>

        <div className="prose prose-invert max-w-none text-[17px] leading-[1.8] space-y-6">
          <H2>INTRODUCTION</H2>
          <p>
            Domsky Solutions operates domskysolutions.com. This Privacy Policy explains how information is collected and used when you visit the website.
          </p>
          <p>
            By using domskysolutions.com you agree to the collection and use of information in accordance with this policy.
          </p>

          <SectionDivider />

          <H2>INFORMATION WE COLLECT</H2>
          <p>
            <strong className="text-white">Email address</strong><br />
            When you subscribe to our newsletter we collect your email address. This is used solely to send you The Weekly Edge newsletter and related communications from Domsky Solutions. We never sell your email address to third parties.
          </p>
          <p>
            <strong className="text-white">Usage data</strong><br />
            We may collect anonymous information about how you use our website including pages visited, time spent on pages, and referring URLs. This data is used to improve our content and user experience.
          </p>
          <p>
            <strong className="text-white">Analytics and browser storage</strong><br />
            Google Analytics currently loads when a page loads. It can receive page, device, browser and referral information and may use browser identifiers according to its configuration and your browser settings. The Lean Stack Finder separately stores quiz progress in your browser. The site does not currently provide an analytics consent control.
          </p>

          <SectionDivider />

          <H2>LEAN STACK FINDER</H2>
          <p>The quiz saves answers and progress in your browser so you can resume after a refresh. It does not save your name or email address in local storage. Restarting the quiz clears its saved answers.</p>
          <p>If you choose to unlock your complete result, the server validates your email and structured quiz answers, recalculates the result, and sends your email, optional first name, structured answers and server-generated result summary to the dedicated Kit form. Optional free-text answers stay in your browser. The complete result opens on this website; the site does not claim that an identical report was emailed.</p>
          <p>Marketing consent is a separate optional checkbox. The server adds the address to the newsletter form only when that consent is selected. The form must not be connected to a promotional sequence unless that separate marketing consent is present.</p>
          <p>The quiz dispatches a local browser event containing only an event name and, where relevant, a question number. It does not include names, email addresses, answers or free text. The current site has no adapter that forwards these quiz events to Google Analytics.</p>
          <SectionDivider />
          <H2>HOW WE USE YOUR INFORMATION</H2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Send our weekly newsletter to subscribers</li>
            <li>Analyze website traffic and improve content</li>
            <li>Monitor and prevent fraudulent activity</li>
            <li>Comply with legal obligations</li>
          </ul>

          <SectionDivider />

          <H2>EMAIL MARKETING</H2>
          <p>
            We use ConvertKit to manage our email list and send newsletters. When you subscribe your email address is stored securely by ConvertKit. You can unsubscribe at any time by clicking the unsubscribe link in any email we send.
          </p>
          <p>
            ConvertKit's privacy policy is available at:<br />
            <a href="https://convertkit.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-cyan hover:underline">convertkit.com/privacy</a>
          </p>

          <SectionDivider />

          <H2>AFFILIATE LINKS</H2>
          <p>
            domskysolutions.com participates in affiliate programs. This means we may earn a commission when you click certain links and make a purchase or sign up for a service. This comes at no extra cost to you.
          </p>
          <p>
            Compensated links are disclosed before they appear. Commercial relationships do not determine editorial conclusions.
          </p>

          <SectionDivider />

          <H2>THIRD PARTY SERVICES</H2>
          <p>
            Our website may contain links to third party websites. We are not responsible for the privacy practices of those sites and encourage you to review their privacy policies.
          </p>
          <p>We may use the following third party services:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>ConvertKit — email marketing platform</li>
            <li>Vercel — website hosting</li>
            <li>Cloudflare — domain and DNS management</li>
            <li>Google Analytics — website analytics; its script currently loads on each page visit</li>
          </ul>

          <SectionDivider />

          <H2>DATA RETENTION</H2>
          <p>
            We retain your email address for as long as you remain subscribed to our newsletter. You may request deletion of your data at any time by contacting us at <a href="mailto:domskysolutions@gmail.com" className="text-brand-cyan hover:underline">domskysolutions@gmail.com</a>.
          </p>

          <SectionDivider />

          <H2>YOUR RIGHTS</H2>
          <p>Depending on your location you may have the right to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Withdraw consent for email marketing</li>
            <li>Lodge a complaint with your local data protection authority</li>
          </ul>
          <p>
            To exercise any of these rights contact us at:<br />
            <a href="mailto:domskysolutions@gmail.com" className="text-brand-cyan hover:underline">domskysolutions@gmail.com</a>
          </p>

          <SectionDivider />

          <H2>GDPR — EUROPEAN USERS</H2>
          <p>
            If you are located in the European Economic Area the legal basis for processing your email address is your consent given when you subscribed to our newsletter.
          </p>
          <p>
            You have the right to withdraw consent at any time by unsubscribing from our newsletter or contacting us directly.
          </p>

          <SectionDivider />

          <H2>CHILDREN'S PRIVACY</H2>
          <p>
            Our website is not directed at children under the age of 16. We do not knowingly collect personal information from children. If you believe your child has provided us with personal information please contact us.
          </p>

          <SectionDivider />

          <H2>CHANGES TO THIS POLICY</H2>
          <p>
            We may update this Privacy Policy from time to time. We will notify subscribers of significant changes via email. The date at the top of this page shows when it was last updated.
          </p>

          <SectionDivider />

          <H2>CONTACT US</H2>
          <p>If you have questions about this Privacy Policy please contact us:</p>
          <p>
            Email: <a href="mailto:domskysolutions@gmail.com" className="text-brand-cyan hover:underline">domskysolutions@gmail.com</a><br />
            Website: <Link to="/" className="text-brand-cyan hover:underline">domskysolutions.com</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

