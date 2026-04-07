import { LearningPath } from '../types.ts';

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: 'pinnacle_fitness',
    certId: 'mc_email_specialist',
    title: 'Pinnacle Fitness: From Setup to Send',
    company: 'Pinnacle Fitness',
    description: 'Follow a gym chain with 50,000 members as they implement Marketing Cloud end-to-end. Learn every exam domain through one connected story.',
    icon: 'fa-dumbbell',
    gradient: 'from-blue-500 to-cyan-500',
    chapters: [
      { title: 'Data Management', domainId: 'data_management', icon: 'fa-database' },
      { title: 'Email Design & Content', domainId: 'email_design', icon: 'fa-envelope' },
      { title: 'Automation Studio', domainId: 'automation', icon: 'fa-gears' },
      { title: 'Journey Builder', domainId: 'journey_builder', icon: 'fa-route' },
      { title: 'Analytics & Reporting', domainId: 'analytics', icon: 'fa-chart-simple' },
      { title: 'Subscriber Management', domainId: 'subscriber_mgmt', icon: 'fa-users-gear' },
    ],
    slides: [
      // ============================================================
      // CHAPTER 1: Data Management
      // ============================================================
      {
        type: 'context',
        title: 'The Challenge',
        content: 'Pinnacle Fitness has just migrated to Salesforce Marketing Cloud. They have 50,000 members spread across three regions (East, West, Central) and three membership tiers (Basic, Plus, Elite). Member data currently lives in a messy spreadsheet export from their old system, with duplicate records, inconsistent formatting, and no clear relationships between members, their visits, and their purchase history.\n\nThe marketing team wants to send targeted campaigns by region and tier, but first they need to get their data house in order. Your job is to architect the data model in Marketing Cloud that will power every campaign going forward.',
        domainId: 'data_management',
        chapter: 1,
      },
      {
        type: 'teach',
        title: 'Understanding Data Extensions',
        content: 'In Marketing Cloud, data is stored in Data Extensions (DEs), which function like database tables. Each DE has defined fields with specific data types (Text, Number, Date, Boolean, Email) and one or more fields designated as the Primary Key to enforce uniqueness.\n\nFor Pinnacle Fitness, you would not cram everything into a single DE. Instead, you create separate, purpose-built Data Extensions: a Members DE (with MemberID as the primary key, plus fields for name, email, tier, and region), a Visits DE (tracking gym check-ins per member), and a Purchases DE (tracking add-on purchases like personal training or smoothie bar orders).\n\nThis separation keeps data clean and maintainable. Sendable Data Extensions are DEs linked to a subscriber via an email address or Subscriber Key, which makes them available for sending. Every DE you plan to send to must be marked as sendable and must have its send relationship configured.',
        domainId: 'data_management',
        chapter: 1,
      },
      {
        type: 'question',
        title: 'Check Your Understanding',
        question: 'Pinnacle Fitness needs to store member profiles with tier, region, email, and join date so the marketing team can send campaigns directly from this data. What should they create?',
        options: [
          'A standard List with custom attributes for tier and region',
          'A sendable Data Extension with MemberID as the Primary Key and a defined send relationship',
          'A non-sendable Data Extension filtered by a Query Activity at send time',
          'A Contact record in Contact Builder with no supporting Data Extension',
        ],
        correct: 1,
        explanation: 'A sendable Data Extension is the correct choice because it provides structured, typed fields (like Date for join date), enforces uniqueness through a Primary Key, and can be used directly as a send audience. Standard Lists lack the relational flexibility needed, and a non-sendable DE cannot be used as a send source without additional steps.',
        domainId: 'data_management',
        chapter: 1,
      },
      {
        type: 'teach',
        title: 'Importing Data and Writing SQL Queries',
        content: 'Getting data into Marketing Cloud typically happens through Import Activities in Automation Studio. Pinnacle Fitness can schedule a nightly file drop from their membership system to an SFTP location, then use an Import Activity to load that file into the Members Data Extension. Import Activities let you choose whether to add new records, update existing ones, or overwrite the entire DE.\n\nOnce data is in place, SQL Query Activities let you combine and segment it. Marketing Cloud uses a subset of T-SQL syntax. For example, to build a send list of Elite members in the East region who have visited in the last 30 days, you would write a SELECT joining the Members DE to the Visits DE on MemberID, filter by Tier, Region, and visit date, and output the results to a new sendable DE.\n\nSQL Query Activities run inside Automations, so Pinnacle can schedule the full pipeline: import fresh data, run queries to build segments, then trigger sends, all without manual intervention.',
        domainId: 'data_management',
        chapter: 1,
      },
      {
        type: 'question',
        title: 'Check Your Understanding',
        question: 'Pinnacle Fitness wants to automatically send a weekly email to Plus and Elite members who visited the gym at least twice in the past 7 days. The member data and visit data live in separate Data Extensions. Which approach correctly builds this audience?',
        options: [
          'Use a Filter Activity on the Members DE to check the Tier field, then manually cross-reference visits',
          'Write a SQL Query Activity that joins Members and Visits on MemberID, filters by Tier and visit count in the last 7 days using HAVING COUNT >= 2, and outputs to a sendable DE',
          'Import both DEs into a single combined DE each week and filter with a data filter',
          'Use an Exclusion List on the Members DE to remove Basic members and those with fewer than 2 visits',
        ],
        correct: 1,
        explanation: 'A SQL Query Activity is the right tool because it can join two Data Extensions, apply filters across both (Tier from Members, visit date and count from Visits), and use GROUP BY with HAVING to enforce the "at least 2 visits" requirement. The result goes to a sendable DE that an email send can use directly. Filter Activities cannot join multiple DEs, and combining everything into one DE creates maintenance problems.',
        domainId: 'data_management',
        chapter: 1,
      },
      {
        type: 'teach',
        title: 'Data Relationships and Data Hygiene',
        content: 'In Contact Builder, you define relationships between Data Extensions using Attribute Groups and Populations. For Pinnacle Fitness, you would link the Visits DE and Purchases DE back to the Members DE using MemberID. This creates a unified contact model so that Journey Builder and other tools can access all related data for a single member without needing SQL.\n\nData hygiene is just as critical as architecture. Pinnacle should set up processes to handle bounced emails (automatically flagged by Marketing Cloud), unsubscribes (managed via the built-in subscription center or a custom preference center), and duplicate detection. Running a scheduled SQL query to identify duplicate email addresses or orphaned visit records without matching member IDs keeps the data clean over time.\n\nA best practice is to establish a data retention policy from day one. Use the Data Extension retention settings to automatically delete records older than a defined period (for example, visit records older than 24 months). This keeps DEs performant and avoids hitting storage limits as Pinnacle scales beyond 50,000 members.',
        domainId: 'data_management',
        chapter: 1,
      },

      // ============================================================
      // CHAPTER 2: Email Design & Content
      // ============================================================
      {
        type: 'context',
        title: 'The Challenge',
        content: 'With their data architecture in place, Pinnacle Fitness is ready to launch their first Marketing Cloud email campaigns. They want to send a monthly newsletter to all 50,000 members, but it needs to feel personal, not generic. Elite members should see exclusive class invitations, Plus members should see upgrade incentives, and Basic members should see the value of what they are missing.\n\nThe design team also insists the emails must look polished on both desktop and mobile, since 65% of Pinnacle members open email on their phones. The marketing director wants a reusable system, not one-off emails rebuilt from scratch each month.',
        domainId: 'email_design',
        chapter: 2,
      },
      {
        type: 'teach',
        title: 'Content Builder and Reusable Templates',
        content: 'Content Builder is the central hub for creating and managing email content in Marketing Cloud. It uses a folder-based structure where you store emails, templates, content blocks, and images. For Pinnacle Fitness, you would create a folder hierarchy like Pinnacle > Templates, Pinnacle > Content Blocks > Headers, Pinnacle > Content Blocks > Tier Offers, and so on.\n\nTemplates in Content Builder define the structural layout of an email: header, body zones, footer. You build a template once using the drag-and-drop editor or paste in custom HTML, then lock certain regions (like the header and footer with the Pinnacle logo and unsubscribe link) so marketers cannot accidentally alter them. The editable content areas are where monthly campaign content goes.\n\nBy building a single master template for the monthly newsletter, Pinnacle avoids the "rebuild from scratch" problem. Each month, marketers create a new email from the template and only update the content areas, keeping brand consistency and saving hours of work.',
        domainId: 'email_design',
        chapter: 2,
      },
      {
        type: 'question',
        title: 'Check Your Understanding',
        question: 'Pinnacle Fitness wants their monthly newsletter to always include the branded header, footer with legal disclaimers, and unsubscribe link, while letting the marketing team customize only the body content each month. What is the best approach in Content Builder?',
        options: [
          'Create a new email from scratch each month and copy-paste the header and footer from the previous send',
          'Build a template with locked header and footer content areas and editable body zones, then create each monthly email from that template',
          'Use a shared content block for the entire email and edit it in place each month',
          'Save last month\'s email as a new draft and update the body content directly',
        ],
        correct: 1,
        explanation: 'A template with locked regions guarantees that the header, footer, and legal content remain unchanged regardless of who builds the monthly email. Editable zones give the marketing team flexibility for campaign content.',
        domainId: 'email_design',
        chapter: 2,
      },
      {
        type: 'teach',
        title: 'Dynamic Content and AMPscript Personalization',
        content: 'Dynamic Content in Content Builder lets you swap entire content blocks based on subscriber attributes. Pinnacle Fitness can create a Dynamic Content block called "Tier Offer" with three variants: one for Basic (showcasing a Plus upgrade discount), one for Plus (highlighting Elite perks), and one for Elite (featuring an exclusive personal training package). The rule set evaluates the Tier field from the send Data Extension and displays the matching variant.\n\nFor more granular personalization, AMPscript is Marketing Cloud\'s scripting language embedded directly in email HTML. A simple example: use SET to assign the subscriber\'s FirstName and Region at send time, then reference them inline. AMPscript can also execute lookups against other Data Extensions, such as pulling a member\'s last three gym visits to display in the email.\n\nThe combination of Dynamic Content for large block-level swaps and AMPscript for inline personalization gives Pinnacle a single email send that feels individually crafted for each of the 50,000 members.',
        domainId: 'email_design',
        chapter: 2,
      },
      {
        type: 'question',
        title: 'Check Your Understanding',
        question: 'Pinnacle Fitness wants the monthly newsletter to show different hero images and offer text based on membership tier, while also greeting each member by first name and referencing their home region. Which combination of tools should they use?',
        options: [
          'Create three separate emails, one per tier, and use three different send activities',
          'Use Dynamic Content blocks for the tier-specific hero image and offer, and use AMPscript inline for the first name and region personalization',
          'Use AMPscript IF/ELSEIF blocks for everything including the hero images, offers, name, and region',
          'Use Dynamic Content for all personalization including the first name greeting and region reference',
        ],
        correct: 1,
        explanation: 'Dynamic Content is ideal for swapping large visual blocks (hero images, entire offer sections) based on a single attribute like Tier, because it is easy to manage in the Content Builder UI. AMPscript is better for inline personalization like inserting a first name or region into a sentence. Using both together in a single email keeps things maintainable.',
        domainId: 'email_design',
        chapter: 2,
      },
      {
        type: 'teach',
        title: 'Responsive Design Best Practices',
        content: 'With 65% of Pinnacle members reading email on mobile, responsive design is not optional. Content Builder\'s drag-and-drop editor produces responsive layouts by default, stacking columns vertically on small screens. However, custom-coded templates need explicit responsive handling using media queries in a style block within the email head.\n\nKey best practices for Pinnacle\'s emails: use a single-column layout or a two-column layout that stacks cleanly, keep the primary call-to-action button at least 44x44 pixels for easy tapping, set images to max-width: 100% so they scale down, and use web-safe fonts with fallbacks. Preheader text (the snippet visible in the inbox) should be intentionally written, not left to chance.\n\nBefore any send, Pinnacle should use Content Builder\'s Preview and Test feature to check rendering across devices and email clients. For the 50,000-member send, start with a small test batch (1,000 members across all tiers and regions) to validate that dynamic content, AMPscript, and responsive layouts all render correctly before releasing to the full audience.',
        domainId: 'email_design',
        chapter: 2,
      },

      // ============================================================
      // CHAPTER 3: Automation Studio
      // ============================================================
      {
        type: 'context',
        title: 'The Challenge',
        content: 'Pinnacle Fitness now has well-organized data extensions for their 50,000 members and polished email templates for each tier. But the marketing team is overwhelmed. Every Monday, they manually export a list of expiring memberships, import it into Marketing Cloud, and hit send on a renewal reminder. For the East, West, and Central regions, that process repeats three times.\n\nThe VP of Marketing wants this to run like clockwork -- no manual steps, no missed sends, no one stuck babysitting a spreadsheet at 6 AM. It is time to automate.',
        domainId: 'automation',
        chapter: 3,
      },
      {
        type: 'teach',
        title: 'What is Automation Studio?',
        content: 'Automation Studio is the back-end workflow engine in Marketing Cloud. Think of it as a conveyor belt: you line up a sequence of activities, set a schedule, and let the platform execute them without human intervention.\n\nAn automation is built from a series of steps, and each step contains one or more activities. Activities are the individual tasks -- importing a file, running a SQL query, sending an email, or extracting data. Steps run in order, but activities within the same step run in parallel.\n\nFor Pinnacle Fitness, a single automation could query the database for members whose renewal date is 30 days away, filter by region, and then trigger the appropriate email -- all before the front desk staff have finished their morning coffee.',
        domainId: 'automation',
        chapter: 3,
      },
      {
        type: 'question',
        title: 'Check Your Understanding',
        question: 'Pinnacle Fitness needs an automation that first queries their member data extension to find Elite members in the East region, then sends those members a VIP renewal email. How should these activities be arranged in Automation Studio?',
        options: [
          'Both the SQL Query and Send Email in Step 1 so they run at the same time',
          'SQL Query in Step 1, Send Email in Step 2 so the query finishes before the send begins',
          'Send Email in Step 1, SQL Query in Step 2 to capture engagement data after the send',
          'Each activity in its own automation, triggered independently on the same schedule',
        ],
        correct: 1,
        explanation: 'Activities within the same step run in parallel, so the Send Email could fire before the SQL Query populates the target data extension. Placing the SQL Query in Step 1 and the Send Email in Step 2 ensures the query completes first, giving the send activity accurate, up-to-date results.',
        domainId: 'automation',
        chapter: 3,
      },
      {
        type: 'teach',
        title: 'Core Activities: SQL Query, Import, Data Extract, and Send',
        content: 'The four activities you will use most often each solve a distinct problem. A SQL Query activity lets you write SELECT statements against your data extensions -- for example, pulling all Plus-tier members in the Central region whose last visit was more than 60 days ago. An Import File activity brings external data into Marketing Cloud, such as a nightly membership roster from the gym management system.\n\nA Data Extract activity does the reverse: it packages data extension contents into a file and drops it onto an SFTP location for downstream systems. Finally, a Send Email activity delivers a pre-built email to a target data extension or list.\n\nPinnacle could chain all four in a single automation: import the latest membership file at midnight, run a SQL query to segment lapsed members, send a win-back email at 7 AM, and extract send results to a shared SFTP folder for the analytics team.',
        domainId: 'automation',
        chapter: 3,
      },
      {
        type: 'question',
        title: 'Check Your Understanding',
        question: 'Every night at midnight, the gym management system drops an updated membership file onto an SFTP server. Pinnacle needs this data inside Marketing Cloud by 6 AM so the morning email sends use fresh data. They also want a copy of yesterday\'s send results available on the SFTP for the analytics team. What is the correct order of activities?',
        options: [
          'SQL Query > Import File > Send Email > Data Extract',
          'Import File > SQL Query > Send Email > Data Extract',
          'Import File > Data Extract > SQL Query > Send Email',
          'Data Extract > Import File > SQL Query > Send Email',
        ],
        correct: 1,
        explanation: 'The file must be imported first so the data is available in Marketing Cloud. Then a SQL Query segments the fresh data for targeting. The Send Email activity delivers the message using that segment. Finally, a Data Extract exports the send results back to the SFTP for the analytics team.',
        domainId: 'automation',
        chapter: 3,
      },
      {
        type: 'teach',
        title: 'Scheduling and Triggered Automations',
        content: 'Automations can start in three ways. A scheduled automation runs on a fixed cadence -- hourly, daily, weekly, or at a specific time. This is ideal for Pinnacle\'s recurring Monday renewal reminders or nightly data imports. You set the start date, frequency, and time zone, and the platform handles the rest.\n\nA file-drop triggered automation starts automatically when a file appears in a designated SFTP folder. If the gym management system drops the membership file at unpredictable times, a file-drop trigger is more reliable than a fixed schedule because the automation fires only when the data is actually ready.\n\nBest practice: always set error handling notifications so the team is alerted if an automation fails. Pinnacle should configure email alerts to the marketing ops lead. Also, use naming conventions like "DAILY_Import_MemberRoster" so automations are easy to find and audit as the account grows.',
        domainId: 'automation',
        chapter: 3,
      },

      // ============================================================
      // CHAPTER 4: Journey Builder
      // ============================================================
      {
        type: 'context',
        title: 'The Challenge',
        content: 'Pinnacle Fitness can now automate bulk processes with Automation Studio, but the VP of Marketing has a new ask. When a new member signs up, she wants them to receive a personalized welcome series: a welcome email on day one, a "tips to get started" email on day three, and a class recommendation on day seven -- with different content depending on their membership tier.\n\nThis is not a bulk batch job. Each member enters the flow at a different time based on their own sign-up date. Pinnacle needs a tool that responds to individual customer moments, not just a schedule on a calendar.',
        domainId: 'journey_builder',
        chapter: 4,
      },
      {
        type: 'teach',
        title: 'The Journey Builder Canvas',
        content: 'Journey Builder is Marketing Cloud\'s visual tool for creating 1-to-1 customer journeys. Unlike Automation Studio, which processes contacts in bulk on a schedule, Journey Builder moves each contact through a flow at their own pace based on their individual actions and timing.\n\nThe canvas is a drag-and-drop workspace where you build a path from left to right. Every journey starts with an Entry Source that defines who enters and when. From there, you add activities like sending an email, waiting a set period, or splitting contacts down different paths based on data or behavior.\n\nFor Pinnacle, the welcome series would look like a horizontal flow: a contact enters when they join, receives a welcome email immediately, waits three days, receives a tips email, waits four more days, and receives a class recommendation. Elite members might get a different version of each message than Basic members -- all within the same journey.',
        domainId: 'journey_builder',
        chapter: 4,
      },
      {
        type: 'question',
        title: 'Check Your Understanding',
        question: 'Pinnacle wants new members to enter the welcome journey the moment they sign up, regardless of the day or time. Which Entry Source is the best choice?',
        options: [
          'A scheduled data extension entry that runs once daily at midnight',
          'An API event entry that fires in real time when the sign-up system sends data to Marketing Cloud',
          'A single-send journey triggered manually by the marketing team each morning',
          'An audience entry based on a Salesforce report that refreshes every hour',
        ],
        correct: 1,
        explanation: 'An API event fires in real time when the external sign-up system posts data to Marketing Cloud, meaning the new member enters the journey immediately upon registration. A scheduled data extension entry would delay entry until the next scheduled evaluation.',
        domainId: 'journey_builder',
        chapter: 4,
      },
      {
        type: 'teach',
        title: 'Decision Splits, Engagement Splits, and Wait Activities',
        content: 'Once contacts enter a journey, you control their path using three key tools. A Decision Split branches contacts based on data attributes. Pinnacle could split on MembershipTier: Elite members go down one path with premium content, while Basic and Plus members go down another.\n\nAn Engagement Split branches contacts based on their interaction with a previous message. For example, after sending the day-three tips email, Pinnacle could check whether the member opened it. Openers might receive an advanced class schedule, while non-openers get a simplified re-engagement nudge.\n\nWait activities control timing. A "Wait by Duration" pauses a contact for a set period (three days, one week). A "Wait Until Date" holds a contact until a specific date attribute -- useful if Pinnacle wanted to send a birthday offer on the member\'s actual birthday. Combining these three tools lets you build journeys that feel personalized without requiring any manual intervention.',
        domainId: 'journey_builder',
        chapter: 4,
      },
      {
        type: 'question',
        title: 'Check Your Understanding',
        question: 'Pinnacle sends a "Get Started" email on day three of the welcome journey. They want members who opened it to receive an advanced class schedule, and members who did not open it to receive a simpler motivational message instead. Which canvas activity should they use?',
        options: [
          'A Decision Split checking the MembershipTier field in the data extension',
          'A Random Split to send 50% down each path for A/B testing',
          'An Engagement Split evaluating whether the contact opened the day-three email',
          'A second Wait activity set to 24 hours to allow more time for opens before proceeding',
        ],
        correct: 2,
        explanation: 'An Engagement Split evaluates a contact\'s interaction (open, click, or no interaction) with a specific prior email in the journey. Since the branching logic depends on whether the member opened the day-three email, an Engagement Split is the correct choice.',
        domainId: 'journey_builder',
        chapter: 4,
      },
      {
        type: 'teach',
        title: 'Goals, Exit Criteria, and Journey Best Practices',
        content: 'Every journey should have a measurable goal. In Journey Builder, you define a Goal by specifying a data condition that represents success. For Pinnacle\'s welcome series, the goal might be "member books their first class within 14 days." The platform tracks the percentage of contacts who meet the goal, giving the marketing team a clear success metric on the dashboard.\n\nExit Criteria remove contacts from the journey when they no longer belong. If a Pinnacle member cancels their membership, there is no reason to keep sending them onboarding emails. Setting an exit criterion on MemberStatus equals "Cancelled" ensures those contacts leave the journey immediately, no matter which step they are on.\n\nBest practice: start simple. Launch the welcome journey with a single path, measure goal attainment, and then layer in Decision Splits and Engagement Splits in later versions. Keep wait times reasonable and always use a clear naming convention like "WEL-01 New Member Welcome" so the journey list stays manageable as Pinnacle scales.',
        domainId: 'journey_builder',
        chapter: 4,
      },

      // ============================================================
      // CHAPTER 5: Analytics & Reporting
      // ============================================================
      {
        type: 'context',
        title: 'The Challenge',
        content: 'Pinnacle Fitness has been running email campaigns for a month now. Welcome journeys are firing, promotional emails are going out to all three regions, and re-engagement automations are targeting lapsed members.\n\nBut CMO Daniela has a board meeting next week. She needs answers: Which campaigns are actually driving engagement? Are bounce rates under control? Which region responds best to promotional content? The team has data flowing through Marketing Cloud, but nobody has set up proper reporting yet.',
        domainId: 'analytics',
        chapter: 5,
      },
      {
        type: 'teach',
        title: 'Tracking Data Views',
        content: 'Marketing Cloud automatically records every subscriber interaction in system data views. The key ones are _Sent (every email sent), _Open (every tracked open), _Click (every link click), _Bounce (every bounce), and _Unsubscribe (every unsubscribe). These live in the system and can be queried using SQL in Query Activities.\n\nFor Pinnacle, a query joining _Sent to _Open on JobID and SubscriberKey would reveal open rates per send. Joining _Click gives click-through data. These data views are the foundation of all custom reporting in Marketing Cloud.\n\nImportant: tracking data views have retention limits. By default, most are retained for six months. If Pinnacle needs historical data beyond that window, they must extract and store it elsewhere before it expires.',
        domainId: 'analytics',
        chapter: 5,
      },
      {
        type: 'question',
        title: 'Check Your Understanding',
        question: 'Pinnacle wants to build a report showing which members clicked a link in last week\'s "Summer Membership Drive" email but did not open any email in the previous 30 days. Which two data views should the analyst query?',
        options: [
          '_Click and _Open',
          '_Sent and _Bounce',
          '_Click and _Subscribers',
          '_Open and _Unsubscribe',
        ],
        correct: 0,
        explanation: 'To find members who clicked the recent campaign, you query _Click. To check whether those same subscribers had opens in the prior 30 days, you query _Open and look for the absence of records. Together, _Click and _Open provide the data needed for this analysis.',
        domainId: 'analytics',
        chapter: 5,
      },
      {
        type: 'teach',
        title: 'Tracking Extracts and Reports',
        content: 'Tracking Extracts are activities you can add to automations that export tracking data into flat files on the Enhanced FTP. Pinnacle can schedule a daily Tracking Extract to pull send, open, click, and bounce data before it ages out of the system data views. This is the standard approach for long-term data warehousing.\n\nFor day-to-day reporting, Marketing Cloud offers standard reports under the Reports tab, covering metrics like delivery rates, engagement over time, and list growth. These pre-built reports are useful for quick answers. For custom needs, Pinnacle can build reports in Discover or use tools like Google Data Studio connected via extracted data.\n\nThe best practice is to combine both: use standard reports for routine monitoring and Tracking Extracts feeding an external dashboard for deeper, cross-channel analysis.',
        domainId: 'analytics',
        chapter: 5,
      },
      {
        type: 'question',
        title: 'Check Your Understanding',
        question: 'Pinnacle Fitness needs to retain two years of email engagement history for compliance audits, but their Marketing Cloud tracking data views only hold six months of data. What is the recommended approach?',
        options: [
          'Contact Salesforce support to extend the data view retention to two years',
          'Schedule a Tracking Extract automation to regularly export data to the Enhanced FTP and archive it externally',
          'Create a SQL query that copies data view records into a standard data extension before they expire',
          'Enable Einstein Analytics, which automatically stores unlimited historical data',
        ],
        correct: 1,
        explanation: 'Tracking Extracts are the standard mechanism for preserving tracking data beyond the system retention window. By scheduling a regular extract to the Enhanced FTP, Pinnacle can move data to an external data warehouse for long-term storage.',
        domainId: 'analytics',
        chapter: 5,
      },
      {
        type: 'teach',
        title: 'Einstein Analytics and Data Retention Best Practices',
        content: 'Einstein Engagement Scoring uses machine learning to predict which subscribers are most likely to open or click future emails. For Pinnacle, this means each member gets a score indicating their predicted engagement level. The marketing team can use these scores to segment sends, sending different content to highly engaged members versus those at risk of disengaging.\n\nEinstein Engagement Frequency analyzes send patterns and recommends the optimal number of emails per subscriber. If Pinnacle\'s Elite members are getting too many promotional sends and starting to unsubscribe, Einstein can flag the oversaturation before it becomes a bigger problem.\n\nFor data retention, the rule is simple: plan for it on day one. Set up Tracking Extracts early, document your retention requirements, and build automations that archive data on a regular schedule. Waiting until data has already expired is the most common and most preventable analytics mistake in Marketing Cloud.',
        domainId: 'analytics',
        chapter: 5,
      },

      // ============================================================
      // CHAPTER 6: Subscriber Management
      // ============================================================
      {
        type: 'context',
        title: 'The Challenge',
        content: 'Pinnacle Fitness has grown to 50,000 email subscribers across three regions. But growing pains are showing. Some members report receiving emails after canceling their membership. Others complain they get promotional emails they never signed up for. A Basic-tier member in the East region filed a formal complaint.\n\nThe compliance team is concerned. Daniela needs the marketing team to clean up subscriber management immediately: who is on the list, how did they get there, and how do members control what they receive? Getting this wrong is not just a bad experience. It is a legal risk.',
        domainId: 'subscriber_mgmt',
        chapter: 6,
      },
      {
        type: 'teach',
        title: 'All Subscribers and Subscriber Status',
        content: 'The All Subscribers list is the master record of every subscriber in a Marketing Cloud account. Every person who has ever been sent an email exists here. When Pinnacle imports members into a data extension and sends to them, those subscribers are automatically added to All Subscribers if they are not already present.\n\nEach subscriber in All Subscribers has a status: Active (can receive email), Unsubscribed (opted out and must not receive commercial email), Held (temporarily undeliverable due to bounces), or Bounced. These statuses are enforced at the account level. If a member unsubscribes from All Subscribers, they cannot receive any commercial email from any business unit, regardless of which data extension they sit in.\n\nThis is a critical distinction. A subscriber can be present in a send data extension but still be blocked from receiving email if their All Subscribers status is Unsubscribed or Held. Pinnacle must understand this hierarchy to avoid compliance issues.',
        domainId: 'subscriber_mgmt',
        chapter: 6,
      },
      {
        type: 'question',
        title: 'Check Your Understanding',
        question: 'A Pinnacle Fitness member appears in the "East Region Promo" data extension with valid data, but they are not receiving any emails from sends to that data extension. The member has not contacted Pinnacle about opting out. What is the most likely cause?',
        options: [
          'The data extension has reached its maximum row limit',
          'The subscriber\'s status in All Subscribers is Held or Unsubscribed',
          'The member\'s email domain is blocking all Marketing Cloud sends',
          'The send definition is filtered to exclude Basic-tier members',
        ],
        correct: 1,
        explanation: 'When a subscriber exists in a send data extension but does not receive emails, the most common cause is their status in All Subscribers. If the subscriber has bounced enough times to be set to Held, or if they previously unsubscribed, Marketing Cloud will suppress the send at the account level.',
        domainId: 'subscriber_mgmt',
        chapter: 6,
      },
      {
        type: 'teach',
        title: 'Publication Lists and Suppression Lists',
        content: 'Publication lists let subscribers control which types of email they receive without unsubscribing from everything. Pinnacle could create publication lists for "Promotional Offers," "Class Schedules," and "Membership Updates." A member who unsubscribes from Promotional Offers would still receive class schedule emails. This granularity reduces total unsubscribes and keeps members engaged on the topics they care about.\n\nSuppression lists work in the opposite direction. They are lists of subscribers who should be excluded from specific sends. Pinnacle might maintain a suppression list of recently canceled members or VIP members who should only receive messages from their dedicated account manager. Suppression lists are applied at send time to remove matching subscribers.\n\nThe key difference: publication lists are subscriber-controlled (members opt in or out), while suppression lists are marketer-controlled (the business decides who to exclude). Both are essential for a mature subscriber management strategy.',
        domainId: 'subscriber_mgmt',
        chapter: 6,
      },
      {
        type: 'question',
        title: 'Check Your Understanding',
        question: 'Pinnacle Fitness wants to let members choose whether they receive promotional emails while ensuring they always receive transactional membership renewal notices. At the same time, recently canceled members (within 30 days) should never receive promotional emails even if they are still technically subscribed. Which combination of tools should Pinnacle use?',
        options: [
          'Two publication lists: one for promotional, one for transactional',
          'A publication list for promotional emails and a suppression list of recently canceled members',
          'A single All Subscribers unsubscribe for promotional and a data filter for canceled members',
          'Suppression lists for both promotional opt-outs and canceled members',
        ],
        correct: 1,
        explanation: 'A publication list for promotional emails gives members the choice to opt out of promos without losing transactional messages. A suppression list of recently canceled members is a marketer-controlled safeguard that ensures those members are excluded from promos regardless of their subscription status.',
        domainId: 'subscriber_mgmt',
        chapter: 6,
      },
      {
        type: 'teach',
        title: 'Preference Centers and CAN-SPAM Compliance',
        content: 'A preference center is a web page where subscribers manage their own communication preferences. Rather than offering only a binary "unsubscribe from all" option, Pinnacle can build a preference center that lets members select which publication lists they want, update their email address, or choose email frequency. Smart Capture forms or CloudPages are typically used to build these. A well-designed preference center reduces unsubscribes by giving members control.\n\nCAN-SPAM compliance is non-negotiable. Every commercial email Pinnacle sends must include a physical mailing address, a clear unsubscribe mechanism, and the unsubscribe must be honored within 10 business days (Marketing Cloud processes them immediately). Emails must not use deceptive subject lines or misleading header information. Transactional emails (like membership confirmations) are exempt from some requirements but must still not be misleading.\n\nThe best practice for Pinnacle: build a CloudPages preference center linked to publication lists, include the required physical address and unsubscribe link in every email template, and audit subscriber statuses monthly to catch any compliance gaps before they become complaints.',
        domainId: 'subscriber_mgmt',
        chapter: 6,
      },
    ],
  },
];
