import { PremiumQuestion } from '../types.ts';

// Placeholder questions — replace with real cert prep content
export const PREMIUM_QUESTIONS: PremiumQuestion[] = [
  {
    certId: 'mc_email_specialist',
    domainId: 'email_design',
    text: 'Which content block type allows you to add dynamic, personalized content based on subscriber attributes?',
    options: [
      'Static content block',
      'Dynamic content block',
      'HTML content block',
      'Image content block',
    ],
    correct: 1,
    explanation: 'Dynamic content blocks allow you to display different content to different subscribers based on their attributes, enabling personalized email experiences.',
  },
  {
    certId: 'mc_email_specialist',
    domainId: 'deliverability',
    text: 'What is the primary purpose of Sender Authentication Package (SAP) in Marketing Cloud?',
    options: [
      'To encrypt email content',
      'To authenticate your sending domain and improve deliverability',
      'To manage subscriber lists',
      'To create automated journeys',
    ],
    correct: 1,
    explanation: 'SAP authenticates your sending domain through SPF, DKIM, and custom return paths, which improves email deliverability and sender reputation.',
  },
  {
    certId: 'mc_email_specialist',
    domainId: 'data_management',
    text: 'What is the difference between a Data Extension and a List in Marketing Cloud?',
    options: [
      'They are identical in functionality',
      'Data Extensions are more flexible and support custom fields, while Lists use a fixed schema',
      'Lists support more data types than Data Extensions',
      'Data Extensions cannot be used for sending emails',
    ],
    correct: 1,
    explanation: 'Data Extensions provide a flexible relational database structure with custom fields and data types, while Lists use a fixed schema with predefined attributes. Data Extensions are the recommended approach for most use cases.',
  },
  {
    certId: 'mc_email_specialist',
    domainId: 'subscriber_mgmt',
    text: 'When a subscriber clicks "Unsubscribe" in an email, what status are they set to by default?',
    options: [
      'Active',
      'Bounced',
      'Unsubscribed',
      'Held',
    ],
    correct: 2,
    explanation: 'When a subscriber unsubscribes, their status is set to "Unsubscribed" which prevents them from receiving future commercial emails while maintaining their data in the system.',
  },
  {
    certId: 'mc_email_specialist',
    domainId: 'automation',
    text: 'Which Automation Studio activity is used to import data from an external file into a Data Extension?',
    options: [
      'SQL Query Activity',
      'File Transfer Activity',
      'Import File Activity',
      'Data Extract Activity',
    ],
    correct: 2,
    explanation: 'The Import File Activity imports data from a file (CSV, TSV, etc.) into a Data Extension. File Transfer Activity moves files between locations, while Data Extract exports data out.',
  },
  {
    certId: 'mc_email_specialist',
    domainId: 'tracking_reporting',
    text: 'Which metric measures the percentage of delivered emails that were opened by recipients?',
    options: [
      'Click-through rate',
      'Bounce rate',
      'Open rate',
      'Conversion rate',
    ],
    correct: 2,
    explanation: 'Open rate is calculated as (unique opens / delivered emails) x 100. It measures how many recipients opened the email relative to how many successfully received it.',
  },
];
