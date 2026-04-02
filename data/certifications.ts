import { Certification } from '../types.ts';

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'mc_email_specialist',
    name: 'Marketing Cloud Email Specialist',
    description: 'Prepare for the Salesforce Marketing Cloud Email Specialist certification exam.',
    icon: 'fa-certificate',
    color: '#0F79AF',
    gradient: 'from-blue-500 to-cyan-500',
    domains: [
      { id: 'email_design', name: 'Email Design & Content', weight: 20 },
      { id: 'deliverability', name: 'Deliverability', weight: 16 },
      { id: 'data_management', name: 'Data Management', weight: 22 },
      { id: 'subscriber_mgmt', name: 'Subscriber Management', weight: 14 },
      { id: 'automation', name: 'Automation', weight: 18 },
      { id: 'tracking_reporting', name: 'Tracking & Reporting', weight: 10 },
    ],
    passingScore: 65,
    examQuestionCount: 60,
    examTimeLimitMinutes: 105,
  },
];
