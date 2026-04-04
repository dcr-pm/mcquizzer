// Questions 1-75 (first batch)
import { PremiumQuestion } from '../types.ts';

export const PREMIUM_QUESTIONS_BATCH1: PremiumQuestion[] = [
  // Q1 - DoNotTrack attribute
  {
    text: 'Pinnacle Fitness has a segment of subscribers who have opted out of behavioral profiling under their privacy policy. The marketing team still wants to send emails to these subscribers but must stop recording their opens and clicks. Which subscriber-level attribute should the admin configure?',
    options: [
      'Set the ListUnsubscribe attribute to True for those subscribers',
      'Enable the DoNotTrack attribute on the subscriber record',
      'Remove the subscribers from all tracking data extensions manually',
    ],
    correct: 1,
    explanation: 'The DoNotTrack attribute, when set to True on a subscriber record, tells Marketing Cloud to suppress open and click tracking for that individual. The subscriber still receives emails, but no engagement data is collected, satisfying privacy requirements without removing them from sends.',
    certId: 'mc_email_specialist',
    domainId: 'subscriber_mgmt',
  },
  // Q2 - APIs for real-time subscriber updates
  {
    text: 'TechNova Solutions runs a customer portal where users update their email preferences in real time. The product team needs these changes to immediately reflect in Marketing Cloud so the next triggered send uses current data. Which approach best supports this requirement?',
    options: [
      'Schedule a nightly file import via Automation Studio',
      'Use the Marketing Cloud REST or SOAP API to update subscriber attributes in real time',
      'Have the portal team send a daily CSV over SFTP for batch processing',
    ],
    correct: 1,
    explanation: 'The Marketing Cloud APIs (REST and SOAP) allow external systems to create, update, and retrieve subscriber records in real time. This ensures that preference changes made on a portal are immediately available for the next send, unlike batch methods that introduce delays.',
    certId: 'mc_email_specialist',
    domainId: 'data_management',
  },
  // Q3 - Approval Workflow
  {
    text: 'Meridian Healthcare requires that all patient-facing emails pass through a legal review before they can be sent. The email team wants a built-in mechanism where a designated reviewer can approve or reject emails directly within the platform. Which feature should they enable?',
    options: [
      'A/B Testing with a manual winner selection step',
      'Approvals in Email Studio, assigning a reviewer to the workflow',
      'Send Throttling configured to hold emails until manually released',
    ],
    correct: 1,
    explanation: 'The Approvals feature in Email Studio lets organizations define a proofing workflow where designated reviewers must approve an email before it can be sent. This is ideal for regulated industries like healthcare where legal or compliance sign-off is mandatory.',
    certId: 'mc_email_specialist',
    domainId: 'email_design',
  },
  // Q4 - Publication Lists for communication preferences
  {
    text: 'Coastal Brewing sends three types of emails: weekly promotions, event invitations, and new product announcements. They store subscriber data in data extensions and want customers to choose which types of communication they receive. What should the email specialist set up?',
    options: [
      'Three separate All Subscribers lists with different business units',
      'Publication Lists for each communication type, linked to subscriber preferences',
      'Suppression lists that exclude subscribers from unwanted categories',
    ],
    correct: 1,
    explanation: 'Publication Lists allow subscribers to opt in or out of specific communication themes while remaining active in the system. When combined with data extensions, they provide granular preference management so subscribers receive only the content categories they choose.',
    certId: 'mc_email_specialist',
    domainId: 'subscriber_mgmt',
  },
  // Q5 - Schedule report and email file
  {
    text: 'Atlas Financial needs their marketing director to receive a daily summary of all email sends from the previous day, delivered to their inbox each morning at 8 AM. Which Email Studio reporting feature meets this need?',
    options: [
      'Create a tracking extract and manually download it each morning',
      'Use the Schedule Report feature to generate and email the report daily',
      'Build a SQL query in Automation Studio that writes results to a shared data extension',
    ],
    correct: 1,
    explanation: 'The Schedule Report feature lets you configure recurring reports and have them automatically emailed to specified recipients. This is the most straightforward way to deliver a daily send summary without any manual intervention or custom automation.',
    certId: 'mc_email_specialist',
    domainId: 'tracking_reporting',
  },
  // Q6 - Preview and Test with subscriber data
  {
    text: 'Summit Education built an enrollment confirmation email using AMPscript to dynamically pull course names and start dates from a data extension. Before sending, the developer wants to verify the personalization renders correctly for specific subscriber records. Which tool should they use?',
    options: [
      'Send a live test email to an internal distribution list',
      'Use Preview and Test in Content Builder, selecting specific subscriber records from the data extension',
      'Review the raw AMPscript code in the HTML editor for syntax errors',
    ],
    correct: 1,
    explanation: 'Preview and Test allows you to select individual subscriber records and render the email exactly as that subscriber would see it, including all AMPscript personalization. This catches data-driven rendering issues before a live send without actually sending the email.',
    certId: 'mc_email_specialist',
    domainId: 'email_design',
  },
  // Q7 - Verification Activity
  {
    text: 'Velocity Auto runs a nightly automation that imports dealership inventory data, queries it for promotional targeting, and sends an email. Occasionally the import file is empty or missing rows, which causes the email to go out with broken personalization. What should the admin add to the automation?',
    options: [
      'A Wait Activity set to 30 minutes between the import and the send',
      'A Verification Activity after the import to check row count before proceeding',
      'A second import step that re-downloads the file as a backup',
    ],
    correct: 1,
    explanation: 'A Verification Activity acts as a checkpoint in Automation Studio. It can validate that a data extension meets minimum row count thresholds before the automation continues. If the check fails, the automation stops and sends an alert, preventing emails with missing or broken data.',
    certId: 'mc_email_specialist',
    domainId: 'automation',
  },
  // Q8 - Email Overlay View
  {
    text: 'Bloom Botanicals sent a product launch email containing multiple links to different product pages, a blog post, and social media profiles. The marketing manager wants to quickly see which links got the most clicks, displayed visually on the email itself. Which reporting view should they use?',
    options: [
      'The Click Tracking data view queried via SQL',
      'Email Overlay View in tracking, which highlights click data on the rendered email',
      'A custom Datorama dashboard filtered to link-level metrics',
    ],
    correct: 1,
    explanation: 'Email Overlay View renders the sent email with click metrics visually overlaid on each link. This gives marketers an intuitive, at-a-glance understanding of which areas of the email attracted the most engagement without needing to interpret tabular data.',
    certId: 'mc_email_specialist',
    domainId: 'tracking_reporting',
  },
  // Q9 - Collecting emails at offline events
  {
    text: 'Redwood Hospitality is sponsoring a food and wine festival and wants to grow their email subscriber base by capturing attendee information at their booth. Which approach is most effective for building their Marketing Cloud audience from this offline event?',
    options: [
      'Collect email addresses on sign-up sheets or tablets at the event and import them into Marketing Cloud',
      'Post their subscription link on a social media ad after the event ends',
      'Add all festival attendees to the All Subscribers list without consent',
    ],
    correct: 0,
    explanation: 'Collecting email addresses directly at offline events via sign-up sheets, tablets, or QR codes linked to a form is the most effective way to capture interested subscribers in person. The data can then be imported into Marketing Cloud with proper consent documentation.',
    certId: 'mc_email_specialist',
    domainId: 'subscriber_mgmt',
  },
  // Q10 - Different steps in automation for sequential sends
  {
    text: 'Quantum Analytics needs to send two emails in sequence as part of a product launch: first a teaser email, then a full announcement 24 hours later. Both emails should go to the same audience. How should this be configured in Automation Studio?',
    options: [
      'Place both send activities in the same automation step so they fire simultaneously',
      'Create separate steps in the automation with a Wait Activity between them for sequential execution',
      'Build two independent automations that run on overlapping schedules',
    ],
    correct: 1,
    explanation: 'Automation Studio processes steps sequentially. By placing each email send in a separate step with a Wait Activity between them, you ensure the teaser goes out first and the announcement follows after the specified delay. Activities within the same step run in parallel, not sequentially.',
    certId: 'mc_email_specialist',
    domainId: 'automation',
  },
  // Q11 - Journey Builder + Engagement Split for birthday coupon
  {
    text: 'Pinnacle Fitness wants to send a birthday coupon email to members and then follow up three days later. Members who opened the coupon email should receive a reminder to redeem it, while those who did not open should get a different subject line. Which combination of tools achieves this?',
    options: [
      'Automation Studio with two scheduled sends and a SQL-based filter',
      'Journey Builder with an Engagement Split that evaluates open activity after a Wait period',
      'A triggered send with a dynamic content block based on open status',
    ],
    correct: 1,
    explanation: 'Journey Builder combined with an Engagement Split is the right approach. The journey sends the initial coupon, waits three days, then uses an Engagement Split to route subscribers who opened the email down one path and non-openers down another. This enables different follow-up messaging based on real engagement.',
    certId: 'mc_email_specialist',
    domainId: 'automation',
  },
  // Q12 - Manage Files in File Transfer for encrypted import
  {
    text: 'Atlas Financial receives an encrypted CSV file from a partner bank each week containing customer records. The file lands on the Marketing Cloud SFTP and needs to be decrypted before it can be imported into a data extension. Where in Automation Studio should the team manage this file handling?',
    options: [
      'Use the Import Activity with built-in decryption settings',
      'Use the File Transfer Activity with the Manage File option to decrypt the file before import',
      'Write a SQL Query Activity to parse the encrypted file directly',
    ],
    correct: 1,
    explanation: 'The File Transfer Activity in Automation Studio includes a Manage File option that can decrypt PGP-encrypted files on the SFTP. This step should be placed before the Import Activity in the automation so the file is decrypted and ready for a standard data extension import.',
    certId: 'mc_email_specialist',
    domainId: 'data_management',
  },
  // Q13 - SAP with Private Domain and Dedicated IP
  {
    text: 'Coastal Brewing is planning a large-scale email program sending over 500,000 emails per month. They want full control over their sender reputation and to ensure their domain appears in the "from" address and authentication headers. Which combination should the admin configure?',
    options: [
      'Sender Authentication Package (SAP) with a private domain and dedicated IP address',
      'A shared IP pool with a generic sender profile and default authentication',
      'SPF records only, using Marketing Cloud default sending domain',
    ],
    correct: 0,
    explanation: 'A Sender Authentication Package (SAP) bundles a private sending domain, dedicated IP address, and custom authentication (SPF/DKIM) together. This gives high-volume senders full control over their reputation, branded links, and deliverability, which is critical at 500K+ monthly sends.',
    certId: 'mc_email_specialist',
    domainId: 'deliverability',
  },
  // Q14 - "Download now" as best CTA
  {
    text: 'TechNova Solutions is designing an email to promote a free whitepaper download. The team is debating what text to use on the call-to-action button. Which option follows email design best practices for driving conversions?',
    options: [
      'Click Here',
      'Download Now',
      'Learn More About Our Various Whitepaper Offerings and Resources',
    ],
    correct: 1,
    explanation: '"Download Now" is a clear, action-oriented CTA that tells the subscriber exactly what will happen when they click. Best practices recommend short, specific action verbs over vague phrases like "Click Here" or overly long descriptions that dilute the message.',
    certId: 'mc_email_specialist',
    domainId: 'email_design',
  },
  // Q15 - Segmented lists to reduce unsubscribes
  {
    text: 'Meridian Healthcare has seen a spike in unsubscribes after increasing their email frequency to daily sends across all subscribers. The marketing team suspects over-messaging is the cause. What strategy should they implement to reduce unsubscribes while maintaining engagement?',
    options: [
      'Reduce all email sends to once per month regardless of subscriber interest',
      'Segment their audience and send targeted content based on subscriber preferences and engagement',
      'Remove the unsubscribe link to prevent opt-outs',
    ],
    correct: 1,
    explanation: 'Segmenting the audience ensures that subscribers only receive content relevant to their interests and at a frequency they are comfortable with. This targeted approach reduces fatigue-driven unsubscribes while keeping engaged subscribers active. Removing unsubscribe links violates CAN-SPAM regulations.',
    certId: 'mc_email_specialist',
    domainId: 'subscriber_mgmt',
  },
  // Q16 - Import metadata tag index for searchable stock art
  {
    text: 'Redwood Hospitality has uploaded hundreds of property photos into Content Builder. The marketing team is struggling to find specific images when building emails. How should the admin organize these assets for easy search and discovery?',
    options: [
      'Rename every file with a unique numeric ID and maintain a spreadsheet externally',
      'Add descriptive metadata tags during import so images are searchable by keyword in Content Builder',
      'Store all images in a single folder and scroll through thumbnails to find them',
    ],
    correct: 1,
    explanation: 'Content Builder supports metadata tagging on imported assets. By adding descriptive tags like property name, location, and image type during upload, the team can quickly search and filter images by keyword. This is far more scalable than external tracking or manual browsing.',
    certId: 'mc_email_specialist',
    domainId: 'email_design',
  },
  // Q17 - Reference Content Block for seasonal content
  {
    text: 'Summit Education uses a promotional banner that appears in dozens of emails across multiple campaigns. The banner content changes every season. The team wants to update the banner once and have every email reflect the change automatically. Which Content Builder feature should they use?',
    options: [
      'Copy and paste the updated banner HTML into each email individually',
      'Use a Reference Content Block so all emails pull from a single shared source',
      'Create a new template each season and rebuild all emails from scratch',
    ],
    correct: 1,
    explanation: 'A Reference Content Block is embedded by reference rather than copied. When you update the source block, every email that references it automatically displays the updated content. This is ideal for shared elements like seasonal banners that change frequently and appear across many emails.',
    certId: 'mc_email_specialist',
    domainId: 'email_design',
  },
  // Q18 - Incorrect Sending Relationship causing send failure
  {
    text: 'Bloom Botanicals configured a new email for their loyalty program and attempted a Guided Send, but the send failed immediately with an error about the sending configuration. The email content and audience are correct. Which misconfiguration is the most likely cause?',
    options: [
      'The email subject line exceeds the character limit',
      'The Send Classification has an incorrect or mismatched Sender Profile and Delivery Profile',
      'The data extension has too many rows for a single send',
    ],
    correct: 1,
    explanation: 'A Send Classification bundles the Sender Profile, Delivery Profile, and CAN-SPAM settings. If any of these components are misconfigured, missing, or mismatched, the send will fail before it even begins processing. This is one of the most common causes of immediate send failures in Email Studio.',
    certId: 'mc_email_specialist',
    domainId: 'deliverability',
  },
  // Q19 - Transactional Send Journey for password reset
  {
    text: 'Quantum Analytics needs to send password reset emails triggered by their web application. These emails must go out regardless of subscriber status, including to unsubscribed users, since they are operational in nature. Which sending method should the team use?',
    options: [
      'A standard Guided Send with the commercial send classification',
      'A Transactional Send Journey configured for non-commercial operational messages',
      'A Journey Builder multi-step journey with an entry event',
    ],
    correct: 1,
    explanation: 'Transactional Send Journeys are designed for operational messages like password resets, order confirmations, and security alerts. They bypass commercial unsubscribe rules because these messages are required for the user experience, not marketing. This ensures delivery to all subscribers regardless of opt-in status.',
    certId: 'mc_email_specialist',
    domainId: 'automation',
  },
  // Q20 - Query data using specific date range
  {
    text: 'Velocity Auto discovered that a pricing error appeared in emails sent between March 1 and March 5. The team needs to identify all subscribers who received the incorrect pricing during that window. What is the best approach in Marketing Cloud?',
    options: [
      'Manually review each send log entry from the tracking tab one by one',
      'Write a SQL Query Activity against the Send Log or data views, filtering by the specific date range',
      'Re-send the corrected email to the entire subscriber list',
    ],
    correct: 1,
    explanation: 'A SQL Query Activity can filter the Send Log data extension or system data views (like _Sent) by date range to extract exactly which subscribers received sends during the affected window. This is the most precise and scalable way to identify impacted recipients for follow-up communication.',
    certId: 'mc_email_specialist',
    domainId: 'tracking_reporting',
  },
  // Q21 - Bounced contacts from previous sends
  {
    text: 'Pinnacle Fitness imported 50,000 subscribers into a data extension and sent a campaign, but only 47,000 were delivered. The team confirmed no exclusions or suppression lists were applied. What is the most likely reason for the missing 3,000 subscribers?',
    options: [
      'The email content was too large and timed out for some subscribers',
      'Those contacts had previously bounced and were automatically excluded by the platform',
      'The data extension reached its maximum row capacity during the send',
    ],
    correct: 1,
    explanation: 'Marketing Cloud automatically suppresses subscribers whose email addresses have previously hard bounced. These contacts are held at the platform level and excluded from future sends even if they appear in the sending data extension. This protects sender reputation by preventing repeated delivery attempts to invalid addresses.',
    certId: 'mc_email_specialist',
    domainId: 'deliverability',
  },
  // Q22 - Test sends not in Send Log
  {
    text: 'Atlas Financial configured a Send Log data extension to track every email sent for audit purposes. After running several test sends through Preview and Test, the compliance team noticed those test sends do not appear in the Send Log. Why is this happening?',
    options: [
      'The Send Log data extension has reached its storage limit',
      'Test sends are not recorded in the Send Log DE by design; only production sends are logged',
      'The Send Log must be manually refreshed after each test send',
    ],
    correct: 1,
    explanation: 'By design, test sends performed through Preview and Test or the test send function are not written to the Send Log data extension. Only actual production sends populate the Send Log. The team should use production sends to a small internal list if they need audit records of test communications.',
    certId: 'mc_email_specialist',
    domainId: 'tracking_reporting',
  },
  // Q23 - Exit criteria in Journey Builder
  {
    text: 'Coastal Brewing has a welcome journey with multiple decision splits checking whether a subscriber has made a purchase. If a subscriber purchases at any point in the journey, they should immediately leave and enter a post-purchase journey instead. How can the team simplify this logic?',
    options: [
      'Add a Decision Split before every single activity in the journey',
      'Configure Exit Criteria on the journey that removes subscribers when they meet the purchase condition',
      'Use an Engagement Split after each email to check purchase status',
    ],
    correct: 1,
    explanation: 'Exit Criteria in Journey Builder continuously evaluate subscribers against a defined condition throughout the entire journey. When a subscriber meets the criteria (e.g., makes a purchase), they are automatically removed from the journey at any point, eliminating the need for repetitive decision splits.',
    certId: 'mc_email_specialist',
    domainId: 'automation',
  },
  // Q24 - Personalization string for business unit ID in links
  {
    text: 'TechNova Solutions operates multiple business units in Marketing Cloud. Their email developer needs to dynamically insert the sending business unit\'s MID (Member ID) into a tracking link so the landing page knows which BU the click originated from. Which approach is correct?',
    options: [
      'Hard-code each business unit ID into separate email templates',
      'Use a SQL query at send time to look up the business unit ID',
      'Insert a personalization string that resolves to the business unit MID at send time',
    ],
    correct: 2,
    explanation: 'Marketing Cloud provides system personalization strings that dynamically resolve at send time, including the MemberID for the sending business unit. Embedding this in a link parameter avoids hard-coding and ensures the correct BU identifier is always appended, regardless of which BU triggers the send.',
    certId: 'mc_email_specialist',
    domainId: 'email_design',
  },
  // Q25 - Primary Key for unique email
  {
    text: 'Bloom Botanicals is creating a data extension to store newsletter subscribers. Each subscriber should appear only once, identified by their email address. What must the developer configure on the EmailAddress field to enforce uniqueness?',
    options: [
      'Set the field type to Phone and enable validation',
      'Mark the EmailAddress field as the Primary Key of the data extension',
      'Create a SQL query that deduplicates records after each import',
    ],
    correct: 1,
    explanation: 'Setting a field as the Primary Key on a data extension enforces uniqueness at the database level. Any attempt to insert a duplicate value for that field will either update the existing row or be rejected, depending on the import settings. This is the standard way to prevent duplicate subscribers.',
    certId: 'mc_email_specialist',
    domainId: 'data_management',
  },
  // Q26 - Is Testable for test send DE
  {
    text: 'Redwood Hospitality wants to designate a specific data extension of internal QA testers that the email team can quickly select when performing test sends in Content Builder. Which data extension property must be enabled?',
    options: [
      'Mark the data extension as "Is Sendable"',
      'Enable the "Is Testable" property on the data extension',
      'Set the data extension retention policy to "Delete after 30 days"',
    ],
    correct: 1,
    explanation: 'The "Is Testable" property on a data extension makes it available in the test send interface within Content Builder. When enabled, the DE appears in the list of available test audiences, allowing the team to quickly send proofs to their QA testers without searching for the DE manually.',
    certId: 'mc_email_specialist',
    domainId: 'data_management',
  },
  // Q27 - Multi-Step journey for testing Einstein vs static
  {
    text: 'Summit Education wants to compare the performance of Einstein product recommendations against manually curated course suggestions in their emails. They need to test both approaches on different audience segments simultaneously. Which Journey Builder configuration supports this?',
    options: [
      'Send both versions in a single email using dynamic content rules',
      'Use a Multi-Step Journey with a Random Split to route contacts to an Einstein path and a static content path',
      'Create two separate automations in Automation Studio and compare results manually',
    ],
    correct: 1,
    explanation: 'A Multi-Step Journey with a Random Split divides the audience into test groups. One path can include Einstein recommendations while the other uses static curated content. Both paths run simultaneously in the same journey, enabling a fair, controlled comparison of performance metrics.',
    certId: 'mc_email_specialist',
    domainId: 'automation',
  },
  // Q28 - Email and Journey Overview Dashboard in Datorama
  {
    text: 'Meridian Healthcare needs a pre-built reporting dashboard that shows overall email performance metrics across all campaigns and journeys in a single view. Their analyst does not want to build custom SQL queries. Which reporting option should they use?',
    options: [
      'Export tracking data to a spreadsheet and create pivot tables manually',
      'Use the Email and Journey Overview Dashboard in Datorama Reports for Marketing Cloud',
      'Build individual tracking reports for each campaign and compare them side by side',
    ],
    correct: 1,
    explanation: 'Datorama Reports for Marketing Cloud includes pre-built dashboards like the Email Overview and Journey Overview that aggregate performance metrics across campaigns. These require no SQL or custom configuration and provide a consolidated view of key email KPIs like opens, clicks, bounces, and unsubscribes.',
    certId: 'mc_email_specialist',
    domainId: 'tracking_reporting',
  },
  // Q29 - List Detective preventing sends
  {
    text: 'Quantum Analytics imported a batch of leads from a trade show and attempted to send a follow-up email, but noticed several addresses were automatically excluded at send time. The excluded addresses include domains like "test.com" and "example.com." Which platform feature caused this?',
    options: [
      'The spam filter blocked emails containing certain keywords',
      'List Detective automatically flagged and suppressed known invalid or risky email domains',
      'The data extension import rejected rows with invalid formatting',
    ],
    correct: 1,
    explanation: 'List Detective is a built-in Marketing Cloud feature that automatically identifies and suppresses email addresses with known invalid, disposable, or role-based domains (like test.com, example.com, or mailinator.com). It runs at send time to protect sender reputation and deliverability.',
    certId: 'mc_email_specialist',
    domainId: 'deliverability',
  },
  // Q30 - Delivery Profile for specific IP and subdomain
  {
    text: 'Velocity Auto has both a marketing email program and a transactional email program. They want marketing emails to send from a shared IP pool with a "marketing.velocityauto.com" subdomain and transactional emails to use a dedicated IP with "mail.velocityauto.com." How should this be configured?',
    options: [
      'Create two separate Delivery Profiles, each specifying the appropriate IP allocation and subdomain',
      'Use a single Delivery Profile and switch the settings manually before each send',
      'Configure the IP and subdomain at the business unit level and use separate BUs',
    ],
    correct: 0,
    explanation: 'A Delivery Profile defines which IP address or pool and which sending subdomain an email uses. By creating two Delivery Profiles -- one for marketing and one for transactional -- each program can use its own IP allocation and subdomain without manual switching or separate business units.',
    certId: 'mc_email_specialist',
    domainId: 'deliverability',
  },
  // Q31 - Automation Studio + Journey Builder for congrats + follow-up
  {
    text: 'Atlas Financial wants to send a congratulations email when a customer\'s mortgage application is approved, followed by a drip series of onboarding tips over the next 30 days. The approval data comes from a nightly file import. Which combination of tools best supports this workflow?',
    options: [
      'Two separate Guided Sends scheduled at different intervals',
      'Automation Studio to import the data and inject contacts into a Journey Builder journey that handles the drip series',
      'A single Automation Studio automation with multiple email send activities and wait steps',
    ],
    correct: 1,
    explanation: 'Automation Studio handles the nightly data import and can fire an event that injects approved applicants into a Journey Builder journey. Journey Builder then manages the drip series with wait activities, engagement splits, and multiple email sends over 30 days. This combines the strengths of both tools.',
    certId: 'mc_email_specialist',
    domainId: 'automation',
  },
  // Q32 - Update Email Now for template changes
  {
    text: 'Bloom Botanicals recently updated their master email template to include a new brand logo and footer. However, emails that were previously created from the old template still show the old logo. What must the email team do to apply the template change to existing emails?',
    options: [
      'Delete the old emails and recreate them from the updated template',
      'Click "Update Email Now" on each email to pull in the latest template changes',
      'The changes will automatically propagate to all existing emails overnight',
    ],
    correct: 1,
    explanation: '"Update Email Now" is a feature in Content Builder that refreshes an email with the latest version of its parent template. Template changes do not automatically propagate to existing emails. Each email must be explicitly updated to pull in the new template content.',
    certId: 'mc_email_specialist',
    domainId: 'email_design',
  },
  // Q33 - Einstein STO Activity
  {
    text: 'Redwood Hospitality sends a weekly promotional email to their loyalty members. They want each subscriber to receive the email at the time of day they are most likely to engage, based on historical open patterns. Which Einstein feature should the team add to their journey?',
    options: [
      'Einstein Content Selection to personalize the subject line',
      'Einstein Send Time Optimization (STO) Activity to deliver at each subscriber\'s optimal engagement window',
      'Einstein Engagement Scoring to rank subscribers before sending',
    ],
    correct: 1,
    explanation: 'Einstein Send Time Optimization (STO) analyzes each subscriber\'s historical engagement patterns and determines the optimal time window for delivery. When added as an activity in Journey Builder, it holds and releases each email at the predicted best time for that individual subscriber.',
    certId: 'mc_email_specialist',
    domainId: 'automation',
  },
  // Q34 - List-Unsubscribe header causing RMM unsubscribes
  {
    text: 'Pinnacle Fitness noticed a sudden increase in unsubscribes, but many of those subscribers say they never clicked the unsubscribe link in the email body. The admin sees these unsubscribes are categorized as "List Unsubscribe" in tracking. What is causing this?',
    options: [
      'A bot is clicking all links in the email including the unsubscribe link',
      'The List-Unsubscribe header allows email clients like Gmail to show a native unsubscribe button, which subscribers are using',
      'The suppression list is automatically unsubscribing inactive subscribers',
    ],
    correct: 1,
    explanation: 'The List-Unsubscribe header is a standard email header that enables email clients (like Gmail, Yahoo, and Apple Mail) to display a native unsubscribe button at the top of the message. When subscribers click that client-level button, it triggers an unsubscribe recorded as "List Unsubscribe" in tracking, separate from the in-body link.',
    certId: 'mc_email_specialist',
    domainId: 'deliverability',
  },
  // Q35 - API Event Entry Source for third-party forms
  {
    text: 'TechNova Solutions has a third-party webinar platform that captures registrations. When someone registers, the platform should immediately inject that contact into a Marketing Cloud journey to receive confirmation and reminder emails. Which journey entry source should the team configure?',
    options: [
      'A scheduled automation that checks for new registrations every hour',
      'An API Event entry source that the webinar platform calls to inject contacts into the journey in real time',
      'A file drop entry source that monitors the SFTP for new registration files',
    ],
    correct: 1,
    explanation: 'An API Event entry source allows external systems to fire a REST API call that injects a contact directly into a running journey in real time. This is the best option for third-party integrations where immediate journey entry is required upon an external action like a form submission.',
    certId: 'mc_email_specialist',
    domainId: 'automation',
  },
  // Q36 - Dashboard in Datorama for custom reports
  {
    text: 'Coastal Brewing\'s CMO wants a single custom reporting view that combines email engagement metrics with revenue data from their e-commerce platform. The data needs to be visualized with charts and filters. Which Marketing Cloud reporting solution supports this?',
    options: [
      'The standard Email Studio tracking tab with export to CSV',
      'A custom dashboard in Datorama Reports with connected data sources and visualizations',
      'A Send Log data extension queried with SQL and exported manually',
    ],
    correct: 1,
    explanation: 'Datorama Reports for Marketing Cloud supports custom dashboards that can combine Marketing Cloud engagement data with external data sources. It provides drag-and-drop visualization tools, filters, and the ability to connect multiple data streams into a unified reporting view.',
    certId: 'mc_email_specialist',
    domainId: 'tracking_reporting',
  },
  // Q37 - Verification Activity as guardrail for audience count
  {
    text: 'Meridian Healthcare runs a weekly automation that sends appointment reminders. Last week, a data error caused the audience data extension to contain only 5 records instead of the usual 10,000. The team wants to automatically halt the automation if the audience falls below a minimum threshold. What should they add?',
    options: [
      'A Decision Split in Journey Builder that checks audience size',
      'A Verification Activity that validates the data extension row count meets a minimum before proceeding',
      'A Filter Activity that removes records below a quality threshold',
    ],
    correct: 1,
    explanation: 'A Verification Activity in Automation Studio can be configured to check whether a data extension meets a minimum row count. If the count falls below the defined threshold, the automation stops and an error notification is sent, preventing erroneous sends to an incomplete audience.',
    certId: 'mc_email_specialist',
    domainId: 'automation',
  },
  // Q38 - Einstein Content Selection
  {
    text: 'Summit Education sends a monthly newsletter featuring multiple course promotions. They want the email to automatically display the course offer each subscriber is most likely to engage with, based on their past behavior. Which Einstein feature should they implement?',
    options: [
      'Einstein Send Time Optimization to time the delivery',
      'Einstein Content Selection to dynamically choose the highest-performing content for each subscriber',
      'Einstein Engagement Scoring to rank subscribers by likelihood to engage',
    ],
    correct: 1,
    explanation: 'Einstein Content Selection uses machine learning to evaluate each subscriber\'s engagement history and automatically selects the content asset (from a pool of options) that the individual is most likely to interact with. It personalizes content at the individual level without manual segmentation.',
    certId: 'mc_email_specialist',
    domainId: 'email_design',
  },
  // Q39 - Based on Subscriber Preview List for team proofing
  {
    text: 'Velocity Auto\'s marketing team of eight people all need to review how a personalized email renders for different subscriber profiles before launch. The lead wants everyone to see the same set of preview records. Which Content Builder feature supports this?',
    options: [
      'Send a test email to each team member\'s personal inbox',
      'Use the "Based on Subscriber Preview List" option to share a defined set of subscriber records for the team to preview',
      'Export the email as a PDF and circulate it via Slack',
    ],
    correct: 1,
    explanation: 'The "Based on Subscriber Preview List" feature in Content Builder allows a team to define a shared set of subscriber records for previewing. Each team member can view the email rendered with the same subscriber data, ensuring consistent proofing and review across the team.',
    certId: 'mc_email_specialist',
    domainId: 'email_design',
  },
  // Q40 - Contacts Analytics for cross-channel population changes
  {
    text: 'Atlas Financial wants to monitor how their overall contact population is changing across email, SMS, and push channels over time. They need to see trends in subscriber growth, churn, and channel overlap. Which Marketing Cloud analytics feature provides this view?',
    options: [
      'Email Studio tracking reports filtered by channel',
      'Contact Analytics in Contact Builder, which shows population trends across channels',
      'A custom SQL query against the _Subscribers data view',
    ],
    correct: 1,
    explanation: 'Contact Analytics in Contact Builder provides a cross-channel view of contact population changes over time. It visualizes subscriber growth, churn, and overlap across email, mobile push, and SMS channels in a single dashboard, giving marketers a holistic view of their audience health.',
    certId: 'mc_email_specialist',
    domainId: 'tracking_reporting',
  },
  // Q41 - Use for triggered send checkbox on DE
  {
    text: 'Bloom Botanicals is setting up a triggered send email that fires when a new subscriber is added to a data extension via the API. The developer configured the email and triggered send definition, but receives an error that the data extension cannot be used. What property is likely missing?',
    options: [
      'The "Is Testable" checkbox is not enabled on the data extension',
      'The "Used for Triggered Send" checkbox is not enabled on the data extension',
      'The data extension is missing a date field for scheduling',
    ],
    correct: 1,
    explanation: 'When a data extension is used as the source for a triggered send, the "Used for Triggered Send" (or "Is Triggered Send" in some UI versions) checkbox must be enabled during creation. This property cannot be changed after creation, so the DE may need to be recreated with this option selected.',
    certId: 'mc_email_specialist',
    domainId: 'data_management',
  },
  // Q42 - File Drop with filename pattern
  {
    text: 'Quantum Analytics receives data files from various third-party sources at unpredictable times throughout the day. Each file follows a naming convention like "leads_YYYYMMDD.csv." The team wants the automation to kick off automatically whenever a matching file lands on the SFTP. Which starting source should they use?',
    options: [
      'Schedule the automation to run every hour and check for new files',
      'Use a File Drop starting source with a filename pattern matching "leads_*.csv"',
      'Have the third party call the Marketing Cloud API to trigger the automation',
    ],
    correct: 1,
    explanation: 'The File Drop starting source in Automation Studio monitors the SFTP Enhanced directory for files matching a specified naming pattern. When a file matching the pattern (like "leads_*.csv") is detected, the automation triggers automatically. This is ideal for variable-cadence file deliveries.',
    certId: 'mc_email_specialist',
    domainId: 'automation',
  },
  // Q43 - Frequency Split for holiday
  {
    text: 'Redwood Hospitality is entering the holiday season and plans to increase email frequency significantly. The marketing manager is concerned that bombarding less-engaged subscribers could drive unsubscribes. Which Journey Builder activity helps manage this risk?',
    options: [
      'An Engagement Split based on open rates from the current journey only',
      'A Frequency Split that evaluates how many emails a subscriber has already received and routes high-frequency contacts to a lighter touch path',
      'A Random Split that sends 50% of the audience down a reduced-frequency path',
    ],
    correct: 1,
    explanation: 'A Frequency Split in Journey Builder evaluates how many commercial emails a subscriber has received within a defined period. Subscribers who have already received a high volume can be routed to a different path with fewer or no additional sends, preventing fatigue-driven unsubscribes during peak seasons.',
    certId: 'mc_email_specialist',
    domainId: 'automation',
  },
  // Q44 - Import subscriber data as first automation step
  {
    text: 'Pinnacle Fitness is building their first automation in Automation Studio. They have a CSV file of new gym members on the SFTP that needs to be loaded into a data extension before any further processing. What should be the first activity in the automation?',
    options: [
      'A SQL Query Activity to transform the data before it arrives',
      'An Import Activity that loads the CSV file from the SFTP into the target data extension',
      'An Email Send Activity to welcome the new members immediately',
    ],
    correct: 1,
    explanation: 'The Import Activity should be the first step because the subscriber data needs to be in a data extension before any queries, filters, or sends can act on it. Without importing the data first, subsequent activities would have no records to process.',
    certId: 'mc_email_specialist',
    domainId: 'automation',
  },
  // Q45 - CloudPages for social channel collection
  {
    text: 'Coastal Brewing wants to run a social media campaign on Instagram where followers can tap a link in their bio to sign up for the brewery\'s email newsletter. The sign-up form needs to be hosted and connected to Marketing Cloud. Which tool should the team use?',
    options: [
      'Build a standalone HTML page and embed an API call to Marketing Cloud',
      'Use CloudPages to create a landing page with a Smart Capture form that writes directly to a Marketing Cloud data extension',
      'Post the Marketing Cloud subscription center URL directly on Instagram',
    ],
    correct: 1,
    explanation: 'CloudPages provides hosted landing pages with Smart Capture forms that write subscriber data directly into Marketing Cloud data extensions. This is the native, no-code-required way to collect subscriber information from social channels and immediately make it available for email sends.',
    certId: 'mc_email_specialist',
    domainId: 'subscriber_mgmt',
  },
  // Q46 - Data Designer for sendable DE from multiple tables
  {
    text: 'TechNova Solutions has customer data split across three data extensions: Contacts, Purchases, and Preferences. The marketing team needs to create a single sendable audience combining attributes from all three tables. Which Contact Builder tool should the developer use to model these relationships?',
    options: [
      'Write a SQL query that joins all three tables into a flat data extension',
      'Use Data Designer in Contact Builder to define relationships between the data extensions and create a linked, sendable data model',
      'Manually merge the data extensions into one large CSV and re-import',
    ],
    correct: 1,
    explanation: 'Data Designer in Contact Builder allows you to visually define relationships between data extensions, creating a unified data model. By linking Contacts, Purchases, and Preferences through shared keys, you can build a sendable audience that draws attributes from all three sources without flattening the data into a single table.',
    certId: 'mc_email_specialist',
    domainId: 'data_management',
  },
  // Q47 - Not Sent Tracking Extract
  {
    text: 'Velocity Auto sent a service recall email to 100,000 vehicle owners but found that 2,000 were not included in the final send. The compliance team needs a detailed list of those excluded subscribers and the reason each was skipped. Which reporting feature should the admin use?',
    options: [
      'Review the bounce report in the Email Studio tracking tab',
      'Run a Not Sent tracking extract to get a list of subscribers excluded from the send and the exclusion reasons',
      'Compare the sending data extension against the _Sent data view using a SQL query',
    ],
    correct: 1,
    explanation: 'The Not Sent tracking extract provides a detailed list of subscribers who were excluded from a send along with the specific reason (e.g., bounced, unsubscribed, List Detective exclusion). This is the most direct way to audit why specific contacts did not receive an email.',
    certId: 'mc_email_specialist',
    domainId: 'tracking_reporting',
  },
  // Q48 - Nested tags for content hierarchy
  {
    text: 'Atlas Financial has hundreds of content blocks in Content Builder organized across multiple campaigns, brands, and regions. The content team wants a hierarchical tagging system where they can filter assets by campaign, then by brand, then by region. Which Content Builder capability supports this?',
    options: [
      'Create deeply nested folder structures with strict naming conventions',
      'Use nested tags in Content Builder to build a multi-level classification hierarchy for content assets',
      'Maintain an external spreadsheet that maps content block IDs to categories',
    ],
    correct: 1,
    explanation: 'Content Builder supports nested tags that allow you to create a hierarchical taxonomy for content assets. Tags can be organized in parent-child relationships (e.g., Campaign > Brand > Region), enabling teams to filter and search assets across multiple levels of categorization.',
    certId: 'mc_email_specialist',
    domainId: 'email_design',
  },
  // Q49 - Schedule automation to refresh filter daily
  {
    text: 'Meridian Healthcare uses a filter activity to segment patients who have an upcoming appointment in the next 7 days. The appointment data changes daily as new bookings come in. How should the team ensure the filtered audience is always current?',
    options: [
      'Manually run the filter activity each morning before the send',
      'Schedule an automation that runs the filter activity daily to refresh the filtered data extension',
      'Set the filter to auto-refresh by enabling real-time evaluation on the data extension',
    ],
    correct: 1,
    explanation: 'Filter activities in Automation Studio do not auto-refresh. To keep the filtered audience current with daily appointment changes, the team should schedule an automation that runs the filter activity on a recurring daily schedule, repopulating the target data extension with up-to-date results each time.',
    certId: 'mc_email_specialist',
    domainId: 'data_management',
  },
  // Q50 - Increase font size over 16pt for accessibility
  {
    text: 'Summit Education is auditing their emails for accessibility compliance. A consultant flagged that their body text is set at 10px, making it difficult for visually impaired subscribers to read. What is the recommended minimum font size for accessible email body text?',
    options: [
      '8px or larger, which is the web standard minimum',
      '14px to 16px or larger, following email accessibility best practices',
      '24px or larger to ensure maximum readability on all devices',
    ],
    correct: 1,
    explanation: 'Email accessibility best practices recommend body text of at least 14px to 16px for comfortable readability. This size works well across desktop and mobile clients and helps visually impaired subscribers read content without zooming. Anything below 14px is generally considered too small for accessible email.',
    certId: 'mc_email_specialist',
    domainId: 'email_design',
  },
  // Q51 - Send Preview for checking rendering
  {
    text: 'Bloom Botanicals designed a rich HTML email with custom fonts and a complex layout. Before sending to their full audience, the designer wants to see how the email renders across Gmail, Outlook, Apple Mail, and Yahoo. Which feature should they use?',
    options: [
      'Send test emails to personal accounts on each email client and check manually',
      'Use the Send Preview feature in Content Builder to simulate rendering across multiple email clients',
      'Review the email in the Content Builder WYSIWYG editor, which accurately represents all email clients',
    ],
    correct: 1,
    explanation: 'Send Preview (powered by Litmus integration in some accounts) allows you to see how an email renders across dozens of email clients and devices without sending test emails. This saves time and catches rendering issues in clients like Outlook that often display HTML differently than expected.',
    certId: 'mc_email_specialist',
    domainId: 'email_design',
  },
  // Q52 - Journey Builder for CRM record update on click
  {
    text: 'Quantum Analytics wants to update a contact\'s CRM record in Salesforce when that person clicks a specific link in a marketing email. The update should happen automatically without manual intervention. Which Marketing Cloud tool should the team use?',
    options: [
      'An Automation Studio workflow triggered by a tracking data extract',
      'A Journey Builder journey with an Update Contact activity that fires after a link click engagement event',
      'A manual report export followed by a Salesforce data import',
    ],
    correct: 1,
    explanation: 'Journey Builder can detect engagement events like email clicks and trigger downstream activities. An Update Contact activity can write data back to Salesforce CRM records. By combining a click-based engagement event with an Update Contact activity, the CRM update happens automatically when the link is clicked.',
    certId: 'mc_email_specialist',
    domainId: 'automation',
  },
  // Q53 - Multilingual Content Blocks
  {
    text: 'Redwood Hospitality operates hotels in six countries and needs to send a single promotional email campaign that renders in the subscriber\'s preferred language. Managing six separate emails is becoming unsustainable. Which Content Builder feature streamlines this?',
    options: [
      'Dynamic Content blocks with a rule for each language variant',
      'Multilingual Content Blocks that manage all language versions within a single content block and auto-select based on a locale attribute',
      'Six separate emails organized in language-specific folders',
    ],
    correct: 1,
    explanation: 'Multilingual Content Blocks allow you to manage multiple language versions of the same content within a single block. At send time, the platform automatically selects the correct language version based on the subscriber\'s locale or language attribute, dramatically simplifying management of multi-language campaigns.',
    certId: 'mc_email_specialist',
    domainId: 'email_design',
  },
  // Q54 - Exclusion SQL in separate step before audience SQL
  {
    text: 'Velocity Auto runs a weekly automation that first queries for all customers in a target segment, then excludes customers who purchased in the last 30 days. The email developer placed both queries in the same automation step, but the exclusion is not working correctly. What should they change?',
    options: [
      'Combine both queries into a single SQL statement with a NOT IN clause',
      'Move the exclusion SQL query into a separate step that runs before the audience query step',
      'Add a Verification Activity between the two queries in the same step',
    ],
    correct: 1,
    explanation: 'Activities within the same Automation Studio step run in parallel, not sequentially. If the exclusion query and the audience query are in the same step, the exclusion may not finish before the audience query reads the data. Moving the exclusion to a prior step ensures it completes first.',
    certId: 'mc_email_specialist',
    domainId: 'data_management',
  },
  // Q55 - Nightly automation with filter activity for fresh data
  {
    text: 'Atlas Financial sends a daily email to customers whose account balance exceeds a certain threshold. The balance data is updated nightly by an external system writing to a data extension. How should the team ensure the email always targets the most recent data?',
    options: [
      'Use a static list that the admin manually updates each morning',
      'Run a nightly automation with a filter activity that refreshes the audience data extension after the balance data lands',
      'Configure the email to query the data extension at the moment of send using inline AMPscript',
    ],
    correct: 1,
    explanation: 'A nightly automation with a filter activity ensures the audience data extension is repopulated with fresh results after the external system updates the balance data. Scheduling the automation to run after the data load guarantees the filter operates on the latest records.',
    certId: 'mc_email_specialist',
    domainId: 'data_management',
  },
  // Q56 - Contrasting colors for accessibility
  {
    text: 'Pinnacle Fitness is redesigning their email templates for better accessibility. Their current design uses light gray text on a white background, which has received complaints from subscribers with low vision. What design change should they prioritize?',
    options: [
      'Switch to an all-image email so the text is embedded in graphics',
      'Use high-contrast color combinations, such as dark text on a light background, meeting WCAG contrast ratios',
      'Reduce the amount of text to minimize the accessibility issue',
    ],
    correct: 1,
    explanation: 'WCAG (Web Content Accessibility Guidelines) require a minimum contrast ratio between text and background colors. Using high-contrast combinations like dark text on a light background ensures readability for subscribers with low vision or color blindness. All-image emails actually worsen accessibility because screen readers cannot parse them.',
    certId: 'mc_email_specialist',
    domainId: 'email_design',
  },
  // Q58 - Subject/Preheader Validation for prefix prevention
  {
    text: 'Coastal Brewing has a policy that no email subject line should begin with the word "TEST" or any internal code prefix before going to production. The team wants the platform to automatically flag emails that violate this rule before they are sent. Which feature supports this?',
    options: [
      'A custom AMPscript function that checks the subject line at render time',
      'Subject Line and Preheader Validation rules that flag or block sends with restricted text patterns',
      'An Approval Workflow where the reviewer manually checks every subject line',
    ],
    correct: 1,
    explanation: 'Marketing Cloud supports validation rules for subject lines and preheaders that can flag or block emails containing restricted text patterns. This automated guardrail catches mistakes like internal test prefixes before they reach production audiences without relying on manual review.',
    certId: 'mc_email_specialist',
    domainId: 'email_design',
  },
  // Q59 - Journey Builder for iterative drip testing
  {
    text: 'TechNova Solutions wants to run an iterative drip campaign where they test different onboarding email sequences. Each quarter, the team adjusts the messaging and wait times to optimize conversion rates. Which tool provides the flexibility to version, test, and iterate on these multi-step sequences?',
    options: [
      'Automation Studio with multiple send activities and static schedules',
      'Journey Builder, which supports versioning, A/B path testing, and easy modification of multi-step drip sequences',
      'Guided Sends scheduled at fixed intervals with manual tracking',
    ],
    correct: 1,
    explanation: 'Journey Builder is purpose-built for multi-step drip campaigns with built-in versioning, path testing, and wait activities. Teams can create new versions of a journey each quarter, test variations with path splits, and adjust timing without rebuilding from scratch.',
    certId: 'mc_email_specialist',
    domainId: 'automation',
  },
  // Q60 - Content Detective for spam flags
  {
    text: 'Bloom Botanicals drafted a promotional email for a flash sale. Before sending, the email developer wants to check whether any words or phrases in the email content might trigger spam filters. Which built-in tool should they use?',
    options: [
      'Send a test email and check if it lands in the spam folder',
      'Run Content Detective in Content Builder to scan for spam-trigger words and phrases',
      'Review the email against a third-party spam word checklist manually',
    ],
    correct: 1,
    explanation: 'Content Detective is a built-in Content Builder tool that scans email content for words, phrases, and patterns commonly associated with spam filtering. It flags potential issues before the send so the team can revise the content and reduce the risk of inbox placement problems.',
    certId: 'mc_email_specialist',
    domainId: 'deliverability',
  },
  // Q61 - Scale back sending for specific ISPs
  {
    text: 'Meridian Healthcare notices that their emails to Yahoo and AOL domains are increasingly landing in the spam folder, while Gmail and Outlook delivery remains strong. A deliverability consultant recommends temporarily adjusting their sending approach for the problematic domains. What action should the team take?',
    options: [
      'Stop sending to all Yahoo and AOL subscribers permanently',
      'Scale back sending volume to Yahoo and AOL domains gradually, focusing on engaged subscribers to rebuild reputation with those ISPs',
      'Switch to a new IP address dedicated exclusively to Yahoo and AOL sends',
    ],
    correct: 1,
    explanation: 'When specific ISPs show deliverability issues, the recommended approach is to scale back volume to those domains and focus on sending only to highly engaged subscribers. This mimics an IP warming strategy for those ISPs, gradually rebuilding trust and reputation rather than abandoning the audience entirely.',
    certId: 'mc_email_specialist',
    domainId: 'deliverability',
  },
  // Q62 - Verification Activity for file drop empty file
  {
    text: 'Summit Education has a file drop automation that triggers when a partner uploads student enrollment data to the SFTP. Occasionally, the partner accidentally uploads an empty file, which causes the automation to process zero records and send a blank email. How should the admin prevent this?',
    options: [
      'Add a Wait Activity after the file drop to give the partner time to fix the file',
      'Add a Verification Activity after the import step to halt the automation if the data extension has zero rows',
      'Configure the file drop to only accept files larger than 1 MB',
    ],
    correct: 1,
    explanation: 'A Verification Activity placed after the import step checks the imported data extension for a minimum row count. If the file was empty and zero rows were imported, the verification fails and stops the automation, preventing downstream activities like email sends from executing on bad data.',
    certId: 'mc_email_specialist',
    domainId: 'automation',
  },
  // Q63 - Data Filter for quick record count
  {
    text: 'Quantum Analytics has a large data extension with millions of records and needs to quickly see how many subscribers match a specific criteria (e.g., last purchase within 90 days) without writing SQL. Which Marketing Cloud feature provides a fast, visual way to get this count?',
    options: [
      'Export the entire data extension to Excel and apply a filter',
      'Use a Data Filter in Email Studio to define the criteria and preview the matching record count',
      'Create a Journey Builder entry event and check the estimated audience size',
    ],
    correct: 1,
    explanation: 'Data Filters provide a point-and-click interface for defining segmentation criteria against a data extension. After setting up the filter, you can preview the count of matching records without writing any SQL. This is the quickest no-code way to get a record count for specific criteria.',
    certId: 'mc_email_specialist',
    domainId: 'data_management',
  },
  // Q64 - Automation to populate Entry Source DE for multiple daily runs
  {
    text: 'Redwood Hospitality runs a journey that needs fresh contacts injected multiple times per day as reservations come in. The entry source is a data extension. How should the team ensure the journey receives updated contacts on each run?',
    options: [
      'Manually add contacts to the entry source DE before each injection',
      'Schedule an automation that repopulates the entry source data extension on a recurring schedule throughout the day, with the journey set to evaluate new entries',
      'Configure the journey to re-evaluate the same static audience multiple times',
    ],
    correct: 1,
    explanation: 'By scheduling an Automation Studio automation to run multiple times per day, the entry source data extension is refreshed with new reservation contacts before each journey evaluation. The journey picks up net-new entries on each scheduled evaluation, ensuring timely injection throughout the day.',
    certId: 'mc_email_specialist',
    domainId: 'automation',
  },
  // Q65 - Web Conversion in Path Optimizer
  {
    text: 'Velocity Auto is testing two different email variations in a journey using Path Optimizer. Instead of measuring just opens and clicks, they want the winning path to be determined by which variation drives more website purchases. Which Path Optimizer metric should they select?',
    options: [
      'Open Rate as the optimization metric',
      'Web Conversion as the optimization metric to track downstream website purchases',
      'Click-to-Open Rate as the optimization metric',
    ],
    correct: 1,
    explanation: 'Path Optimizer supports multiple optimization metrics including Web Conversion, which tracks whether subscribers who went down a particular path completed a conversion event on the website. This lets the optimizer select the winning path based on actual business outcomes rather than just email engagement.',
    certId: 'mc_email_specialist',
    domainId: 'tracking_reporting',
  },
  // Q66 - Filter activity to populate shared DEs for child BUs
  {
    text: 'Atlas Financial has a parent business unit with a master subscriber data extension. Three child business units each need a filtered subset of that data based on region. The admin wants to automate this distribution daily. What approach should they use?',
    options: [
      'Manually export and re-import the data into each child BU daily',
      'Use filter activities in an automation to populate shared data extensions accessible to each child business unit',
      'Give each child BU direct query access to the parent BU data extension',
    ],
    correct: 1,
    explanation: 'Filter activities can segment a parent-level data extension into regional subsets and write the results to shared data extensions. Each child business unit can then access its shared DE for sends. Scheduling this in a daily automation keeps the regional data fresh without manual intervention.',
    certId: 'mc_email_specialist',
    domainId: 'data_management',
  },
  // Q67 - Double opt-in for valid email addresses
  {
    text: 'Pinnacle Fitness is seeing a high bounce rate from their online sign-up form because people are entering fake or mistyped email addresses. The deliverability consultant recommended a strategy to ensure only valid, engaged addresses enter the system. What should the team implement?',
    options: [
      'Use a CAPTCHA on the sign-up form to block bots',
      'Implement a double opt-in process that requires new subscribers to confirm their email address by clicking a verification link',
      'Restrict the form to only accept addresses from major ISPs like Gmail and Outlook',
    ],
    correct: 1,
    explanation: 'Double opt-in (also called confirmed opt-in) sends a verification email to the submitted address and only adds the subscriber after they click a confirmation link. This confirms the address is real, reachable, and owned by the person who submitted it, dramatically reducing bounces from fake or mistyped addresses.',
    certId: 'mc_email_specialist',
    domainId: 'deliverability',
  },
  // Q68 - Analytics Dashboard for journey cross-channel
  {
    text: 'Coastal Brewing runs a multi-channel journey that includes email, SMS, and push notifications. The marketing director wants a single dashboard that shows performance across all three channels for that journey. Which reporting tool should they use?',
    options: [
      'Individual channel tracking reports combined into a spreadsheet',
      'The Journey Analytics Dashboard, which provides cross-channel performance metrics for a specific journey',
      'A SQL query against the _Sent and _Open data views',
    ],
    correct: 1,
    explanation: 'The Journey Analytics Dashboard provides a unified view of journey performance across all channels (email, SMS, push) in a single interface. It shows entry counts, channel-specific engagement, goal completion, and path performance without requiring manual data aggregation.',
    certId: 'mc_email_specialist',
    domainId: 'tracking_reporting',
  },
  // Q69 - SQL Query + Filter Definition + Journey Entry Source
  {
    text: 'TechNova Solutions needs to build a targeted audience for a re-engagement journey. The process involves: (1) querying inactive subscribers from data views, (2) applying additional business rules to narrow the segment, and (3) injecting the final audience into a journey. Which three components should the team use in order?',
    options: [
      'Import Activity, Data Filter, Triggered Send',
      'SQL Query Activity to pull inactive subscribers, a Filter Definition to apply business rules, and a Journey Entry Source data extension to inject them into the journey',
      'CloudPages form, Publication List, Guided Send',
    ],
    correct: 1,
    explanation: 'This workflow uses a SQL Query Activity to extract inactive subscribers from data views, a Filter Definition to layer on additional segmentation criteria, and a data extension configured as a Journey Entry Source to inject the final audience into Journey Builder. Each component handles a distinct stage of the pipeline.',
    certId: 'mc_email_specialist',
    domainId: 'data_management',
  },
  // Q70 - Einstein Copy Insights for subject line analysis
  {
    text: 'Bloom Botanicals wants to understand what linguistic elements (urgency, curiosity, discount mentions) in their past subject lines correlated with higher open rates. Which Einstein feature analyzes historical subject line performance?',
    options: [
      'Einstein Send Time Optimization, which recommends the best time to send',
      'Einstein Copy Insights, which analyzes subject line language patterns and their correlation with engagement',
      'Einstein Engagement Scoring, which predicts subscriber likelihood to engage',
    ],
    correct: 1,
    explanation: 'Einstein Copy Insights analyzes the language, tone, and structure of your historical subject lines and correlates them with open rate performance. It identifies which linguistic elements (like urgency words, questions, or emoji usage) tend to drive higher engagement for your specific audience.',
    certId: 'mc_email_specialist',
    domainId: 'tracking_reporting',
  },
  // Q71 - Interactive Email Form for post-purchase feedback
  {
    text: 'Redwood Hospitality wants guests to rate their stay directly within a post-checkout email without leaving their inbox. The guest should be able to select a star rating and submit a short comment. Which Content Builder feature enables this in-email interaction?',
    options: [
      'A hyperlink to an external survey tool like SurveyMonkey',
      'An Interactive Email Form block that captures the rating and comment input directly within the email',
      'A dynamic content block that shows different content based on past feedback',
    ],
    correct: 1,
    explanation: 'Interactive Email Forms allow subscribers to input data (text fields, radio buttons, dropdowns) directly within the email and submit it without navigating to an external page. Supported email clients render the form natively, while others can fall back to a web link.',
    certId: 'mc_email_specialist',
    domainId: 'email_design',
  },
  // Q72 - Einstein Engagement Frequency
  {
    text: 'Summit Education is unsure how many emails per week they should send to their student audience. Some students seem to disengage after two emails, while others engage with five or more. Which Einstein feature helps determine the optimal sending frequency for each subscriber?',
    options: [
      'Einstein Send Time Optimization, which determines the best time of day to send',
      'Einstein Engagement Frequency, which analyzes each subscriber\'s engagement to recommend the ideal number of emails per time period',
      'Einstein Content Selection, which picks the best content for each subscriber',
    ],
    correct: 1,
    explanation: 'Einstein Engagement Frequency evaluates each subscriber\'s historical engagement patterns to recommend the optimal number of emails they should receive in a given time period. It helps marketers avoid both under-messaging (missed opportunities) and over-messaging (subscriber fatigue) on an individual level.',
    certId: 'mc_email_specialist',
    domainId: 'tracking_reporting',
  },
  // Q73 - Send canceled when approval withdrawn
  {
    text: 'Quantum Analytics has Approvals enabled and a reviewer initially approved an email send scheduled for tomorrow morning. Later that evening, the reviewer realized an error in the legal disclaimer and withdrew the approval. What happens to the scheduled send?',
    options: [
      'The email sends as originally scheduled since it was already approved once',
      'The scheduled send is automatically canceled when the approval is withdrawn',
      'The email moves to a draft state but remains on the schedule',
    ],
    correct: 1,
    explanation: 'When an approval is withdrawn in the Email Studio approval workflow, any associated scheduled send is automatically canceled. The email cannot proceed to send without a valid, active approval. The team must correct the issue, re-submit for approval, and reschedule the send.',
    certId: 'mc_email_specialist',
    domainId: 'email_design',
  },
  // Q74 - Goals in Journey Builder
  {
    text: 'Meridian Healthcare has a patient onboarding journey that sends educational emails over 60 days. The journey\'s success metric is whether the patient completes their first appointment. Additionally, patients who complete the appointment should stop receiving onboarding emails. Which Journey Builder feature achieves both measurement and exit?',
    options: [
      'An Exit Criteria set to remove subscribers who complete the appointment, with a separate tracking report for measurement',
      'A Goal configured to track appointment completion as the success metric, with the option to eject contacts from the journey upon reaching the goal',
      'A Decision Split at each step checking whether the appointment was completed',
    ],
    correct: 1,
    explanation: 'Journey Builder Goals let you define a measurable success condition and optionally eject subscribers who meet it. By setting the goal to "appointment completed," the journey tracks its success rate and automatically removes patients who no longer need onboarding content, in one configuration.',
    certId: 'mc_email_specialist',
    domainId: 'automation',
  },
  // Q75 - Sending volume > 250k/month as dedicated IP differentiator (Q75)
  {
    text: 'Velocity Auto is evaluating whether to use a shared IP pool or a dedicated IP address for their email program. Their monthly sending volume is approximately 400,000 emails. Which factor most strongly supports choosing a dedicated IP?',
    options: [
      'They want to save money by sharing infrastructure with other senders',
      'Their monthly sending volume exceeds 250,000, giving them enough volume to build and maintain a consistent reputation on a dedicated IP',
      'They only send emails once per quarter and want to avoid IP warming',
    ],
    correct: 1,
    explanation: 'A dedicated IP is recommended for senders with monthly volumes above approximately 250,000 emails. At this volume, the sender generates enough consistent traffic to build and maintain a stable IP reputation. Lower-volume senders benefit from shared pools where multiple senders collectively maintain the IP reputation.',
    certId: 'mc_email_specialist',
    domainId: 'deliverability',
  },
  // Q76 - Data filter for low-code segmentation (from Q76)
  {
    text: 'Atlas Financial has a team of marketing coordinators who need to create audience segments from data extensions but do not know SQL. They need a visual, drag-and-drop approach to define criteria like "age > 30 AND state = Ontario." Which tool should the admin recommend?',
    options: [
      'Write SQL queries in Automation Studio and share the results',
      'Use Data Filters, which provide a point-and-click interface for building segmentation criteria without code',
      'Export the data extension to Excel and filter it there',
    ],
    correct: 1,
    explanation: 'Data Filters offer a no-code, visual interface for defining segmentation rules against data extensions. Users can combine multiple criteria with AND/OR logic using dropdown menus and form fields, making it accessible to team members who do not have SQL skills.',
    certId: 'mc_email_specialist',
    domainId: 'data_management',
  },
  // Q79 - Web Studio for capturing social channel user data (from Q79)
  {
    text: 'Bloom Botanicals wants to create a mobile-optimized microsite where social media followers can browse seasonal collections and sign up for email updates. The team needs the site hosted within Marketing Cloud. Which feature should they use?',
    options: [
      'Build an email with embedded web content and send it as a landing page',
      'Use CloudPages in Web Studio to create and host a mobile-friendly microsite connected to Marketing Cloud data',
      'Link to an externally hosted WordPress site with a Marketing Cloud API integration',
    ],
    correct: 1,
    explanation: 'CloudPages within Web Studio lets you create, host, and publish mobile-responsive landing pages and microsites directly within Marketing Cloud. These pages can include Smart Capture forms that write subscriber data into data extensions, making it easy to collect information from social media traffic.',
    certId: 'mc_email_specialist',
    domainId: 'subscriber_mgmt',
  },
  // Q80 - Copy filtered DE with additional criteria (from Q80)
  {
    text: 'Redwood Hospitality already has a filtered data extension of loyalty members who stayed in the past 6 months. Now they need a further-refined segment: loyalty members who stayed in the past 6 months AND have a preference for spa services. Rather than rebuilding the filter from scratch, what is the most efficient approach?',
    options: [
      'Write a SQL query that duplicates the original filter logic and adds the spa preference condition',
      'Copy the existing filtered data extension and add the spa preference criteria as an additional filter condition',
      'Manually review the existing filtered DE and remove non-spa contacts by hand',
    ],
    correct: 1,
    explanation: 'Marketing Cloud allows you to copy an existing filtered data extension and modify the copy with additional criteria. This preserves the original filter logic while layering on new conditions like the spa preference, saving time compared to rebuilding the entire filter from scratch.',
    certId: 'mc_email_specialist',
    domainId: 'data_management',
  },
];
