import { Flashcard } from '../types.ts';

// Placeholder flashcards — replace with real cert prep content
export const FLASHCARDS: Flashcard[] = [
  {
    id: 'fc_001',
    certId: 'mc_email_specialist',
    domainId: 'email_design',
    front: 'What is AMPscript?',
    back: 'AMPscript is a proprietary scripting language in Marketing Cloud used to personalize email content, retrieve data from Data Extensions, and add dynamic logic to messages.',
  },
  {
    id: 'fc_002',
    certId: 'mc_email_specialist',
    domainId: 'deliverability',
    front: 'What does SPF stand for and what does it do?',
    back: 'Sender Policy Framework (SPF) is an email authentication method that specifies which mail servers are authorized to send email on behalf of your domain, helping prevent spoofing.',
  },
  {
    id: 'fc_003',
    certId: 'mc_email_specialist',
    domainId: 'data_management',
    front: 'What is a Sendable Data Extension?',
    back: 'A Sendable Data Extension is a Data Extension that has been configured with a subscriber relationship (linking a field to Subscriber Key and an email address field), allowing it to be used as the audience for email sends.',
  },
  {
    id: 'fc_004',
    certId: 'mc_email_specialist',
    domainId: 'subscriber_mgmt',
    front: 'What are the four subscriber statuses in Marketing Cloud?',
    back: 'Active — can receive emails. Bounced — email address has hard bounced. Held — temporarily suspended due to soft bounces. Unsubscribed — opted out of receiving emails.',
  },
  {
    id: 'fc_005',
    certId: 'mc_email_specialist',
    domainId: 'automation',
    front: 'What is the difference between a Triggered Send and a User-Initiated Send?',
    back: 'A Triggered Send is fired automatically by an API call or event (e.g., welcome email on signup). A User-Initiated Send is manually started by a marketer through the UI or scheduled in Automation Studio.',
  },
  {
    id: 'fc_006',
    certId: 'mc_email_specialist',
    domainId: 'tracking_reporting',
    front: 'What is a "unique open" vs. a "total open"?',
    back: 'A unique open counts only once per subscriber regardless of how many times they open the email. A total open counts every time any subscriber opens the email, including repeat opens.',
  },
];
