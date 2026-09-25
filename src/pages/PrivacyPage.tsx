
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
          <p className="text-gray-400 font-mono text-sm">Last updated: 18 September 2026</p>
        </div>

        <div className="prose prose-invert max-w-none text-[17px] leading-[1.8] space-y-6">
          <H2>INTRODUCTION</H2>
          <p>
            I operate domskysolutions.com as Domsky Solutions. This Privacy Policy explains how I collect, use, and protect your personal information when you visit my website.
          </p>
          <p>
            By using domskysolutions.com you agree to the collection and use of information in accordance with this policy.
          </p>

          <SectionDivider />

          <H2>INFORMATION I COLLECT</H2>
          <p>
            <strong className="text-white">Email address</strong><br />
            When you subscribe to my newsletter I collect your email address. This is used solely to send you The Weekly Edge newsletter and related communications from Domsky Solutions. I never sell your email address to third parties.
          </p>
          <p>
            <strong className="text-white">Usage data</strong><br />
            I may collect anonymous information about how you use my website, including pages visited, time spent on pages, and referring URLs. This data is used to improve my content and the user experience.
          </p>
          <p>
            <strong className="text-white">Cookies</strong><br />
            My website uses cookies — small files stored on your device — to improve your browsing experience. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. If you do not accept cookies, some parts of the website may not function properly.
          </p>

          <SectionDivider />

          <H2>LEAN STACK FINDER</H2>
          <p>The quiz saves answers and progress in your browser so you can resume after a refresh. It does not save your name or email address in local storage. Restarting the quiz clears its saved answers.</p>
          <p>If you choose to unlock your complete result, I send your email, optional first name, structured quiz answers, result summary and consent record to Kit (formerly ConvertKit). These fields and tags help me send your results and relevant practical emails. Optional free-text answers stay in your browser. You can unsubscribe from emails at any time or request deletion using the contact details below.</p>
          <p>Quiz analytics events contain only an event name and, where relevant, a question number. They do not contain names, email addresses, answers or free text.</p>
          <SectionDivider />
          <H2>HOW I USE YOUR INFORMATION</H2>
          <p>I use the information I collect to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Send my weekly newsletter to subscribers</li>
            <li>Analyze website traffic and improve content</li>
            <li>Monitor and prevent fraudulent activity</li>
            <li>Comply with legal obligations</li>
          </ul>

          <SectionDivider />

          <H2>EMAIL MARKETING</H2>
          <p>
            I use ConvertKit to manage my email list and send newsletters. When you subscribe, your email address is stored securely by ConvertKit. You can unsubscribe at any time by clicking the unsubscribe link in any email I send.
          </p>
          <p>
            ConvertKit's privacy policy is available at:<br />
            <a href="https://convertkit.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-cyan hover:underline">convertkit.com/privacy</a>
          </p>

          <SectionDivider />

          <H2>AFFILIATE LINKS</H2>
          <p>
            domskysolutions.com participates in affiliate programs. This means I may earn a commission when you click certain links and make a purchase or sign up for a service. This comes at no extra cost to you.
          </p>
          <p>
            I only recommend products and services I genuinely believe in. Affiliate relationships never influence my reviews or ratings.
          </p>

          <SectionDivider />

          <H2>THIRD PARTY SERVICES</H2>
          <p>
            My website may contain links to third party websites. I am not responsible for the privacy practices of those sites and encourage you to review their privacy policies.
          </p>
          <p>I may use the following third party services:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>ConvertKit — email marketing platform</li>
            <li>Vercel — website hosting</li>
            <li>Cloudflare — domain and DNS management</li>
            <li>Google Analytics — website analytics (if enabled)</li>
          </ul>

          <SectionDivider />

          <H2>DATA RETENTION</H2>
          <p>
            I retain your email address for as long as you remain subscribed to my newsletter. You may request deletion of your data at any time by contacting me at <a href="mailto:team@domskysolutions.com" className="text-brand-cyan hover:underline">team@domskysolutions.com</a>.
          </p>

          <SectionDivider />

          <H2>YOUR RIGHTS</H2>
          <p>Depending on your location you may have the right to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access the personal data I hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Withdraw consent for email marketing</li>
            <li>Lodge a complaint with your local data protection authority</li>
          </ul>
          <p>
            To exercise any of these rights contact me at:<br />
            <a href="mailto:team@domskysolutions.com" className="text-brand-cyan hover:underline">team@domskysolutions.com</a>
          </p>

          <SectionDivider />

          <H2>GDPR — EUROPEAN USERS</H2>
          <p>
            If you are located in the European Economic Area, the legal basis for processing your email address is your consent given when you subscribed to my newsletter.
          </p>
          <p>
            You have the right to withdraw consent at any time by unsubscribing from my newsletter or contacting me directly.
          </p>

          <SectionDivider />

          <H2>CHILDREN'S PRIVACY</H2>
          <p>
            My website is not directed at children under the age of 16. I do not knowingly collect personal information from children. If you believe your child has provided me with personal information, please contact me.
          </p>

          <SectionDivider />

          <H2>CHANGES TO THIS POLICY</H2>
          <p>
            I may update this Privacy Policy from time to time. I will notify subscribers of significant changes via email. The date at the top of this page shows when it was last updated.
          </p>

          <SectionDivider />

          <H2>CONTACT ME</H2>
          <p>If you have questions about this Privacy Policy, please contact me:</p>
          <p>
            Email: <a href="mailto:team@domskysolutions.com" className="text-brand-cyan hover:underline">team@domskysolutions.com</a><br />
            Website: <Link to="/" className="text-brand-cyan hover:underline">domskysolutions.com</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

