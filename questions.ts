
import { Question } from './types.ts';

export const ALL_QUESTIONS: Question[] = [
  // Email Studio (Expanded)
  {
    categoryId: 'email_studio',
    text: "What is the primary purpose of a 'Send Classification' in Email Studio?",
    options: [
      "To classify emails for internal reporting.",
      "To define the CAN-SPAM sender profile, delivery profile, and unsubscribe handling for a send.",
      "To determine the A/B testing parameters.",
      "To link an email to a specific journey in Journey Builder."
    ],
    correct: 1,
    explanation: "A Send Classification is a required component for any email send, bundling together the sender information (Sender Profile), delivery options (Delivery Profile), and how unsubscribes are processed (CAN-SPAM)."
  },
  {
    categoryId: 'email_studio',
    text: "Which type of content block allows you to display different content based on subscriber attributes?",
    options: [
      "Static Content Block",
      "Free Form Content Block",
      "Dynamic Content Block",
      "A/B Test Content Block"
    ],
    correct: 2,
    explanation: "Dynamic Content blocks are used to personalize content by defining rules based on subscriber data, showing different content to different segments of your audience within a single email."
  },
  {
    categoryId: 'email_studio',
    text: "What does AMPscript's Lookup() function do?",
    options: [
      "Finds a specific HTML element in the email.",
      "Searches for a subscriber in All Subscribers.",
      "Retrieves a value from a row in a Data Extension.",
      "Validates an email address format."
    ],
    correct: 2,
    explanation: "The Lookup() function is used to search for a specific row in a Data Extension that matches a set of criteria and returns a value from a specified column in that row."
  },
  {
    categoryId: 'email_studio',
    text: "In Email Studio, what is the function of a 'Suppression List'?",
    options: [
      "A list of subscribers who have opened every email.",
      "A list of subscribers to always include in a send.",
      "A list of subscribers to exclude from a send.",
      "A list that has been archived and is no longer in use."
    ],
    correct: 2,
    explanation: "A suppression list is a list of subscribers that you don't want to receive your communications. SFMC will exclude any email addresses on a suppression list from the audience at send time."
  },
  {
    categoryId: 'email_studio',
    text: "Which feature allows you to test up to two different versions of an email to see which one performs better?",
    options: [
      "Dynamic Content",
      "A/B Testing",
      "Send Throttling",
      "Validation"
    ],
    correct: 1,
    explanation: "A/B Testing in Email Studio lets you test different subject lines, from names, content areas, or send times to determine which version yields better results."
  },
  {
    categoryId: 'email_studio',
    text: "What is the 'Send Log' data extension primarily used for?",
    options: [
      "To log errors during an email send.",
      "To store a record of every email sent from an account for reporting and auditing.",
      "To list all available templates in the account.",
      "To keep a log of user login activity."
    ],
    correct: 1,
    explanation: "The Send Log is a data extension that can be configured to capture specific data points about each email sent, such as SubscriberKey, JobID, and other custom data, at the time of send."
  },
    {
    categoryId: 'email_studio',
    text: "What type of unsubscribe method removes a subscriber from all future commercial sends from the business unit?",
    options: [
        "List Unsubscribe",
        "Master Unsubscribe",
        "Global Unsubscribe",
        "Transactional Unsubscribe"
    ],
    correct: 1,
    explanation: "Master Unsubscribe removes the subscriber from all commercial sends within the current business unit, while still allowing them to receive transactional emails."
  },
  {
    categoryId: 'email_studio',
    text: "What is the purpose of 'Send Throttling'?",
    options: [
        "To speed up the email sending process.",
        "To control the rate at which emails are sent per hour.",
        "To automatically remove invalid email addresses.",
        "To measure email engagement."
    ],
    correct: 1,
    explanation: "Send Throttling allows you to specify the number of emails sent per hour, which can be useful for managing server load and controlling the response from a new campaign."
  },
  {
    categoryId: 'email_studio',
    text: "What does the 'Validate' tool in Email Studio check for?",
    options: [
        "Correct spelling and grammar in the email body.",
        "Correct personalization string syntax, content blocks, and required elements like a physical mailing address.",
        "If the email will be flagged as spam by major ISPs.",
        "If all images in the email have alt text."
    ],
    correct: 1,
    explanation: "The Validate function checks for common issues such as correct AMPscript and personalization syntax, the presence of an unsubscribe link, and a physical mailing address before sending."
  },
  {
    categoryId: 'email_studio',
    text: "Which of these is NOT a standard component of a Send Classification?",
    options: [
        "Sender Profile",
        "Delivery Profile",
        "CAN-SPAM Classification",
        "Template"
    ],
    correct: 3,
    explanation: "A Send Classification consists of three components: Sender Profile (From information), Delivery Profile (IP Address and header/footer), and CAN-SPAM Classification (Transactional or Commercial)."
  },

  // Automation Studio (Expanded)
  {
    categoryId: 'automation_studio',
    text: "Which activity in Automation Studio would you use to run a SQL query on a Data Extension?",
    options: [
      "Script Activity",
      "Data Extract Activity",
      "Filter Activity",
      "Query Activity"
    ],
    correct: 3,
    explanation: "The 'Query Activity' is specifically designed to execute SQL queries to retrieve, segment, or update data within Data Extensions."
  },
  {
    categoryId: 'automation_studio',
    text: "What is the primary difference between a 'Triggered' and a 'Scheduled' Automation?",
    options: [
      "Triggered automations can only send emails.",
      "Scheduled automations run at a specific time, while triggered automations run when a file is dropped in the FTP.",
      "Triggered automations have a more complex user interface.",
      "Scheduled automations cannot use SQL queries."
    ],
    correct: 1,
    explanation: "Scheduled automations run on a recurring schedule (e.g., hourly, daily, weekly), whereas Triggered automations are initiated by an event, specifically a file being uploaded to a designated FTP folder."
  },
  {
    categoryId: 'automation_studio',
    text: "Which Automation Studio activity is used to move a file from the SFMC FTP to a different location?",
    options: [
      "Data Extract Activity",
      "File Transfer Activity",
      "Import File Activity",
      "Script Activity"
    ],
    correct: 1,
    explanation: "The File Transfer Activity is used to manage files. It can unzip/decrypt files or move them from one location to another, including from the SFMC Safehouse to an FTP location."
  },
  {
    categoryId: 'automation_studio',
    text: "If you need to execute server-side JavaScript in an automation, which activity should you use?",
    options: [
      "Query Activity",
      "Filter Activity",
      "Script Activity",
      "Verification Activity"
    ],
    correct: 2,
    explanation: "The Script Activity is used to execute Server-Side JavaScript (SSJS). It's powerful for tasks that go beyond the capabilities of standard activities, like complex data manipulation or API calls."
  },
  {
    categoryId: 'automation_studio',
    text: "What is the purpose of the 'Verification Activity'?",
    options: [
        "To verify that the automation ran successfully.",
        "To check if a data condition is met and stop the automation if it is not.",
        "To verify user permissions before running.",
        "To check for duplicate subscribers."
    ],
    correct: 1,
    explanation: "A Verification Activity checks if a target data extension or file meets certain conditions (e.g., has more than 0 records). If the condition isn't met, the automation stops, preventing subsequent steps from running on empty data."
  },
  {
    categoryId: 'automation_studio',
    text: "In what order do activities run on a single step in an automation?",
    options: [
        "In the order they were created.",
        "Alphabetical order.",
        "They run simultaneously (in parallel).",
        "In the order they are arranged visually on the canvas."
    ],
    correct: 2,
    explanation: "All activities placed on the same step within an automation are executed at the same time, in parallel. To force a specific order, you must place activities on subsequent steps."
  },
  {
    categoryId: 'automation_studio',
    text: "What does a 'Data Extract Activity' do?",
    options: [
      "Imports data into a data extension.",
      "Converts data from a data extension into a file (e.g., CSV, ZIP).",
      "Deletes data from a data extension.",
      "Runs a SQL query."
    ],
    correct: 1,
    explanation: "A Data Extract Activity is used to pull data out of Marketing Cloud and convert it into a file format that can then be used by other activities, like a File Transfer, to send it to an FTP site."
  },
  {
    categoryId: 'automation_studio',
    text: "What is the 'Safehouse' in the context of a File Transfer Activity?",
    options: [
        "A secure folder for storing user passwords.",
        "The main folder of the Enhanced FTP.",
        "A secure, temporary storage location for files being processed by Marketing Cloud.",
        "An archive of all previously run automations."
    ],
    correct: 2,
    explanation: "The Safehouse is a highly secure location on SFMC servers used to temporarily store files during transfer or decryption processes, ensuring data is not exposed on the FTP."
  },
    {
    categoryId: 'automation_studio',
    text: "What happens if a SQL Query Activity is set to 'Overwrite' and the query fails or returns no rows?",
    options: [
        "The automation stops and shows an error.",
        "The target Data Extension is cleared of all its records.",
        "The target Data Extension remains unchanged.",
        "A notification email is sent to the administrator."
    ],
    correct: 1,
    explanation: "A dangerous feature of 'Overwrite' is that if the query fails or results in an empty data set, the activity will first clear the target Data Extension completely, resulting in data loss."
  },
  {
    categoryId: 'automation_studio',
    text: "Which starting source would you use for an automation that needs to run every morning at 6 AM?",
    options: [
        "File Drop",
        "API Trigger",
        "Schedule",
        "Manual Start"
    ],
    correct: 2,
    explanation: "The 'Schedule' starting source is used to configure an automation to run at a specific time on a recurring basis, such as daily, weekly, or monthly."
  },

  // Journey Builder (Expanded)
  {
    categoryId: 'journey_builder',
    text: "What is the purpose of an 'Entry Source' in Journey Builder?",
    options: [
      "To define the final goal of the journey.",
      "To admit contacts into a journey when they meet specific criteria.",
      "To connect two different journeys together.",
      "To remove contacts from a journey."
    ],
    correct: 1,
    explanation: "The Entry Source defines how contacts enter a journey. This could be a Data Extension, an API event, a Salesforce Data event, or other triggers."
  },
  {
    categoryId: 'journey_builder',
    text: "Which flow control activity allows you to send contacts down different paths based on their attributes or behavior?",
    options: [
      "Wait Activity",
      "Update Contact Activity",
      "Join Activity",
      "Decision Split"
    ],
    correct: 3,
    explanation: "A Decision Split evaluates contact data and sends each contact down a specific path based on the criteria met. For example, sending customers down different paths based on their last purchase date."
  },
  {
    categoryId: 'journey_builder',
    text: "What does the 'Einstein STO' (Send Time Optimization) activity do in a journey?",
    options: [
      "Sends the email at a random time to optimize for server load.",
      "Waits to send an email until each individual contact is most likely to open it.",
      "Splits the audience into A/B test groups for send times.",
      "Sends the email only to contacts who are predicted to be highly engaged."
    ],
    correct: 1,
    explanation: "The Einstein STO activity uses AI to analyze each contact's past engagement behavior and determines the optimal time within the next 24 hours to send an email to maximize the chance of it being opened."
  },
  {
    categoryId: 'journey_builder',
    text: "What is the function of a Journey's 'Goal'?",
    options: [
      "To define the number of contacts allowed in the journey.",
      "To measure the success of the journey by tracking how many contacts meet a target criteria.",
      "To specify the end date of the journey.",
      "To set the email sending speed."
    ],
    correct: 1,
    explanation: "A Goal is a measurement of customer actions that you want to promote. When a contact meets the goal criteria, Journey Builder records it, allowing you to see how effective your journey is at achieving its objective."
  },
  {
    categoryId: 'journey_builder',
    text: "What happens to a contact in a journey when they meet the 'Exit Criteria'?",
    options: [
      "They are sent a final email.",
      "Their contact record is deleted.",
      "They are immediately removed from the journey.",
      "They are moved to the start of the journey."
    ],
    correct: 2,
    explanation: "Exit Criteria define a condition that, if met by a contact, will cause them to be ejected from the journey, regardless of where they are in the path."
  },
  {
    categoryId: 'journey_builder',
    text: "What is the key difference between a 'Decision Split' and an 'Engagement Split'?",
    options: [
      "Decision Splits have more branches.",
      "Decision Splits use contact data, while Engagement Splits use a contact's interaction with a preceding email.",
      "Engagement Splits can only be used at the start of a journey.",
      "Only Decision Splits can be used with Einstein features."
    ],
    correct: 1,
    explanation: "A Decision Split evaluates attributes on the contact record at that moment. An Engagement Split evaluates whether a contact opened or clicked a link in a specific email sent just before the split."
  },
  {
    categoryId: 'journey_builder',
    text: "What is the purpose of the 'Update Contact' activity?",
    options: [
      "To send the contact an email asking them to update their profile.",
      "To modify a value in the journey's entry source data extension for a specific contact.",
      "To check if the contact's email address is still valid.",
      "To change a user's password."
    ],
    correct: 1,
    explanation: "The Update Contact activity is used to change a value for a contact in the data extension that the journey is using, allowing you to track status or update preferences as they move through the journey."
  },
  {
    categoryId: 'journey_builder',
    text: "In Journey Builder settings, what does 'Re-entry anytime' mean?",
    options: [
      "A contact can enter the journey multiple times simultaneously.",
      "A contact can re-enter the journey as soon as they trigger the entry criteria, even if they are already in it.",
      "A contact can only re-enter after the journey has been stopped and restarted.",
      "A contact can only enter once."
    ],
    correct: 1,
    explanation: "'Re-entry anytime' allows a contact to enter a journey multiple times, with each entry being a separate path. This is useful for transactional journeys like order confirmations."
  },
    {
    categoryId: 'journey_builder',
    text: "The 'Path Optimizer' activity is used to...",
    options: [
        "Find the shortest route for a contact to reach the goal.",
        "Test up to 10 different journey paths against each other to see which performs best.",
        "Automatically select the next best channel for a message (Email or SMS).",
        "Speed up the journey for highly engaged contacts."
    ],
    correct: 1,
    explanation: "Path Optimizer allows you to perform sophisticated A/B/n testing by sending contacts down different paths and automatically or manually selecting a winner based on engagement or goal attainment."
  },
  {
    categoryId: 'journey_builder',
    text: "Which wait activity type would you use to pause a contact until next Friday at 9:00 AM?",
    options: [
        "Wait by Duration",
        "Wait by Attribute",
        "Wait Until Date",
        "Wait by API Call"
    ],
    correct: 2,
    explanation: "'Wait Until Date' allows you to hold a contact at a specific step in the journey until a fixed, specific date and time occurs."
  },
  
  // Data Management (Expanded)
  {
    categoryId: 'data_management',
    text: "What is the key difference between a 'Standard Data Extension' and a 'Sendable Data Extension'?",
    options: [
      "Standard DEs cannot store dates.",
      "Sendable DEs must have a primary key.",
      "Standard DEs cannot be used in Journey Builder.",
      "Sendable DEs must contain a field that relates to subscribers (like Subscriber Key or Email Address)."
    ],
    correct: 3,
    explanation: "A Sendable Data Extension requires a field that is explicitly mapped to the Subscriber Key (or email address) to establish a send relationship, making it possible to send emails to the contacts within it."
  },
  {
    categoryId: 'data_management',
    text: "In Contact Builder, what is the function of 'Attribute Groups'?",
    options: [
      "To group similar email templates together.",
      "To create folders for storing data extensions.",
      "To link several data extensions to the Contact Record.",
      "To assign user permissions for data access."
    ],
    correct: 2,
    explanation: "Attribute Groups are used to organize and link data extensions together within the contact model. They create relationships between the contact record and other data, forming a comprehensive, 360-degree view of the customer."
  },
  {
    categoryId: 'data_management',
    text: "Which of these is the recommended unique identifier for a contact across all of Marketing Cloud?",
    options: [
      "Email Address",
      "Subscriber ID",
      "Contact ID",
      "Subscriber Key"
    ],
    correct: 3,
    explanation: "Subscriber Key is the best practice for a unique identifier. Unlike an email address which can change or be shared, the Subscriber Key is a persistent value (like a customer ID) that uniquely identifies a person regardless of their channel or email address."
  },
  {
    categoryId: 'data_management',
    text: "What is a 'Primary Key' used for in a Data Extension?",
    options: [
      "To mark a data extension as sendable.",
      "To encrypt sensitive data fields.",
      "To uniquely identify each row in the data extension.",
      "To link the data extension to an automation."
    ],
    correct: 2,
    explanation: "A Primary Key is a field (or combination of fields) that contains a unique value for each row. It's used to prevent duplicate rows and is essential for efficiently updating records."
  },
  {
    categoryId: 'data_management',
    text: "What are 'Data Views' in Marketing Cloud?",
    options: [
      "Custom analytics dashboards.",
      "System-generated tables that store tracking data, like _Sent, _Open, and _Click.",
      "The preview of a data extension's records.",
      "A way to view data from multiple business units at once."
    ],
    correct: 1,
    explanation: "Data Views are queryable system tables that contain information about your sends, subscriber behavior, and journey details. You can query them using SQL to extract valuable analytics data."
  },
  {
    categoryId: 'data_management',
    text: "What is the purpose of 'Synchronized Data Extensions'?",
    options: [
      "To sync data between two Marketing Cloud business units.",
      "To bring data from Salesforce Sales Cloud or Service Cloud into Marketing Cloud in near real-time.",
      "To create a backup of your data extensions.",
      "To sync data with an external FTP server."
    ],
    correct: 1,
    explanation: "Synchronized Data Extensions are used with Marketing Cloud Connect to mirror data from standard or custom Salesforce objects, making it available for segmentation and journeys in SFMC."
  },
  {
    categoryId: 'data_management',
    text: "If you need to store data that can be updated quickly and frequently, should you use a Primary Key?",
    options: [
      "No, Primary Keys slow down updates.",
      "Yes, a Primary Key is required for fast and efficient updates.",
      "It doesn't matter for update speed.",
      "Only for sendable data extensions."
    ],
    correct: 1,
    explanation: "Having a Primary Key is crucial for performance when updating records in a Data Extension. Without it, the system must scan the entire table, but with a key, it can find and update the row directly."
  },
  {
    categoryId: 'data_management',
    text: "What happens if you try to import a row into a Data Extension with a Primary Key that already exists?",
    options: [
      "A new row is added with a suffix.",
      "The import fails for that row.",
      "The existing row is updated with the new data (upsert).",
      "A duplicate row is created."
    ],
    correct: 2,
    explanation: "When importing into a DE with a primary key, the system performs an 'upsert' operation. If the key exists, the row is updated; if it doesn't, a new row is added."
  },
  {
    categoryId: 'data_management',
    text: "What does the 'Contact Deletion' process in Contact Builder do?",
    options: [
        "It flags the contact as 'deleted' but keeps the data.",
        "It immediately purges all data related to the contact from the account.",
        "It removes the contact from sendable data extensions but leaves them in other DEs after a set period.",
        "It unsubscribes the contact from all communications."
    ],
    correct: 2,
    explanation: "The Contact Deletion framework is designed to completely remove a contact and their associated data from Marketing Cloud to help with data privacy compliance. The process is irreversible."
  },
  {
    categoryId: 'data_management',
    text: "How do you link a 'child' Data Extension to a 'parent' Data Extension in Contact Builder?",
    options: [
        "By using the same name for both.",
        "By creating an attribute group and defining a relationship between the fields.",
        "By using a SQL Join query.",
        "By placing them in the same folder."
    ],
    correct: 1,
    explanation: "In Contact Builder, you create a data model by linking data extensions. This is done by adding them to an Attribute Group and creating a relationship (e.g., ContactKey on parent links to CustomerID on child)."
  },
  {
    categoryId: 'data_management',
    text: "What is the primary function of the 'Data Retention Policy' setting on a Data Extension?",
    options: [
      "To back up the data extension daily.",
      "To automatically delete records from the data extension after a specified period.",
      "To set the maximum number of rows the data extension can hold.",
      "To archive the data extension when it's no longer in use."
    ],
    correct: 1,
    explanation: "A Data Retention Policy is a crucial feature for data governance that helps manage data volume by automatically deleting individual records or the entire data extension after a defined timeframe."
  },

  // Analytics (Expanded)
  {
    categoryId: 'analytics',
    text: "What does the 'Unique Click-Through Rate' (CTOR) measure?",
    options: [
      "The total number of clicks divided by the total number of emails sent.",
      "The number of unique subscribers who clicked a link out of the number of unique subscribers who opened the email.",
      "The total number of clicks divided by the total number of emails delivered.",
      "The number of times a single subscriber clicked any link."
    ],
    correct: 1,
    explanation: "CTOR (Unique Clicks / Unique Opens) is a key metric for content engagement. It tells you how effective your email's content and calls-to-action were at prompting a click from the people who actually saw your email."
  },
  {
    categoryId: 'analytics',
    text: "In Journey Builder analytics, what does 'Goal Attainment' show?",
    options: [
      "The total number of contacts who entered the journey.",
      "The percentage of contacts who met the journey's defined goal.",
      "The average time contacts spent in the journey.",
      "The number of emails sent from the journey."
    ],
    correct: 1,
    explanation: "Goal Attainment measures the effectiveness of a journey by tracking how many contacts met the goal criteria you set (e.g., made a purchase, filled out a form). It's a direct measure of the journey's success."
  },
  {
    categoryId: 'analytics',
    text: "What is the primary function of 'Tracking Aliases' in email links?",
    options: [
      "To hide the destination URL from the subscriber.",
      "To create shorter links for use in SMS messages.",
      "To give a friendly, reportable name to a URL, making tracking reports easier to read.",
      "To encrypt the link for better security."
    ],
    correct: 2,
    explanation: "Tracking Aliases let you assign a recognizable name to a link. In reports, instead of seeing a long URL, you'll see the alias (e.g., 'Hero_Button_Click'), which makes analysis much clearer."
  },
  {
    categoryId: 'analytics',
    text: "What does the 'Bounce Rate' in an email send report represent?",
    options: [
      "The percentage of emails that were opened and then immediately closed.",
      "The percentage of emails that were not delivered to the recipient's mail server.",
      "The percentage of subscribers who clicked the unsubscribe link.",
      "The percentage of emails marked as spam."
    ],
    correct: 1,
    explanation: "Bounce Rate is the percentage of sent emails that could not be delivered. This can be due to a hard bounce (invalid address) or a soft bounce (temporary issue like a full inbox)."
  },
  {
    categoryId: 'analytics',
    text: "Which standard report would you use to see the performance of all emails sent within a specific date range?",
    options: [
      "Journey Builder Email Send Report",
      "Recent Email Sending Summary",
      "Email Performance Over Time Report",
      "Subscriber Engagement Report"
    ],
    correct: 2,
    explanation: "The Email Performance Over Time Report provides an aggregate view of key metrics (sends, opens, clicks, etc.) for all email sends that occurred within a specified timeframe."
  },
  {
    categoryId: 'analytics',
    text: "What is an 'Impression Region' used for in email analytics?",
    options: [
        "To track which country the subscriber opened the email in.",
        "To track views of a specific content area within an email, even if it wasn't clicked.",
        "To define the main hero image of an email.",
        "To see how the email renders on different devices."
    ],
    correct: 1,
    explanation: "By wrapping a content area in an Impression Region tag, you can track how many times that specific part of the email was viewed by subscribers, which is useful for non-clickable content."
  },
    {
    categoryId: 'analytics',
    text: "What is the key difference between 'Total Opens' and 'Unique Opens'?",
    options: [
        "Unique opens are faster to calculate.",
        "Total opens includes every open event, while unique opens counts only the first time each subscriber opened the email.",
        "Unique opens only counts opens on mobile devices.",
        "Total opens are an Einstein prediction, while unique opens are actuals."
    ],
    correct: 1,
    explanation: "If one subscriber opens the same email 5 times, this counts as 5 total opens but only 1 unique open. Unique opens tells you how many people saw your message."
  },
  {
    categoryId: 'analytics',
    text: "Which tool offers the most advanced, customizable reporting and visualization capabilities in SFMC?",
    options: [
        "Standard Reports",
        "Journey Builder Analytics",
        "Email Studio Tracking",
        "Datorama Reports for Marketing Cloud (formerly Intelligence Reports)"
    ],
    correct: 3,
    explanation: "Datorama Reports (Intelligence Reports) is a premium offering that provides powerful, flexible dashboards and analysis tools, allowing you to slice and dice your data far beyond what standard reports can do."
  },
  {
    categoryId: 'analytics',
    text: "Querying the `_Subscribers` Data View will give you information about...",
    options: [
        "All contacts in your account.",
        "Subscribers who exist on the 'All Subscribers' list.",
        "A log of all email sends.",
        "Contacts who have unsubscribed."
    ],
    correct: 1,
    explanation: "The `_Subscribers` data view contains records for all subscribers on the All Subscribers list, including their status (active, bounced, unsubscribed)."
  },
  {
    categoryId: 'analytics',
    text: "What does the `_JourneyActivity` data view allow you to query?",
    options: [
        "A list of all active journeys.",
        "Performance data for specific activities within a journey (e.g., an email open or click).",
        "The total number of contacts in all journeys.",
        "The settings for each journey."
    ],
    correct: 1,
    explanation: "The `_JourneyActivity` data view is used to retrieve tracking data about a contact's interaction with a specific journey activity, like an email open, which is useful for custom reporting."
  },

  // Mobile Studio (Expanded)
  {
    categoryId: 'mobile_studio',
    text: "Which Mobile Studio application is used for sending SMS and MMS messages?",
    options: [
      "MobilePush",
      "MobileConnect",
      "GroupConnect",
      "MobileMessages"
    ],
    correct: 1,
    explanation: "MobileConnect is the SFMC tool specifically designed for creating, sending, and tracking SMS and MMS messages."
  },
  {
    categoryId: 'mobile_studio',
    text: "In MobilePush, what is required to send a push notification to a specific device?",
    options: [
      "The user's phone number.",
      "A valid email address.",
      "The device's unique Push Token (or Device ID).",
      "The user's first name."
    ],
    correct: 2,
    explanation: "Operating systems (iOS/Android) provide a unique Push Token for each app installation on a device. MobilePush requires this token to know where to deliver the notification."
  },
  {
    categoryId: 'mobile_studio',
    text: "What is a 'Keyword' in MobileConnect?",
    options: [
      "A password for logging into the app.",
      "A word or phrase that customers can text to a short code to interact with your brand.",
      "A tracking alias for a link in an SMS.",
      "A tag for organizing messages."
    ],
    correct: 1,
    explanation: "Keywords (like JOIN, HELP, or STOP) are used to trigger specific actions or messages in MobileConnect when a user texts them to your designated short or long code."
  },
  {
    categoryId: 'mobile_studio',
    text: "What type of message in MobilePush can be triggered when a device enters or exits a predefined physical area?",
    options: [
      "Outbound Push",
      "Geofence Message",
      "Inbox Message",
      "Proximity Message (Beacon)"
    ],
    correct: 1,
    explanation: "Geofence messaging allows you to trigger a push notification when a user's device, with the app installed and location services enabled, crosses the boundary of a specific geographic location."
  },
  {
    categoryId: 'mobile_studio',
    text: "What is the main purpose of 'GroupConnect'?",
    options: [
      "To send group SMS messages to multiple people at once.",
      "To create chat groups within a mobile app.",
      "To send messages to contacts on third-party chat apps like LINE.",
      "To connect mobile data with email data."
    ],
    correct: 2,
    explanation: "GroupConnect is designed to integrate with popular chat applications, primarily LINE in the APAC market, allowing brands to send notifications and rich content through those platforms."
  },
  {
    categoryId: 'mobile_studio',
    text: "What is a 'Short Code' in the context of SMS marketing?",
    options: [
      "A shortened URL for use in text messages.",
      "A 5 or 6 digit number used by brands to send and receive SMS messages at scale.",
      "A code for redeeming a discount.",
      "The character limit for an SMS message."
    ],
    correct: 1,
    explanation: "Short codes are special, easy-to-remember numbers approved by carriers for high-volume application-to-person (A2P) messaging. They are essential for mass SMS campaigns."
  },
    {
    categoryId: 'mobile_studio',
    text: "In MobilePush, what is an 'Attribute'?",
    options: [
        "The color of the push notification icon.",
        "A piece of data about the contact or device, used for segmentation and personalization.",
        "The sound the notification makes.",
        "The title of the push notification."
    ],
    correct: 1,
    explanation: "Attributes in MobilePush are key-value pairs that store information about a contact (e.g., 'FirstName', 'Favorite_Category') or their device, enabling you to create targeted audiences."
  },
  {
    categoryId: 'mobile_studio',
    text: "Which AMPscript function would you use to send a triggered SMS message from a Journey or Automation?",
    options: [
        "SendSMS()",
        "CreateSmsConversation()",
        "InvokeMobileConnect()",
        "Send.Sms()"
    ],
    correct: 0,
    explanation: "The `SendSMS()` AMPscript function is used to programmatically trigger an outbound SMS message from MobileConnect."
  },
  {
    categoryId: 'mobile_studio',
    text: "The 'STOP' keyword in MobileConnect is a legal requirement for which regulation?",
    options: [
        "GDPR",
        "CAN-SPAM",
        "TCPA (Telephone Consumer Protection Act)",
        "CCPA"
    ],
    correct: 2,
    explanation: "The TCPA in the United States mandates that consumers must have a clear and easy way to opt-out of SMS communications, and honoring the 'STOP' keyword is a standard way to comply."
  },
  {
    categoryId: 'mobile_studio',
    text: "What is the difference between a 'silent' and an 'alert' push notification?",
    options: [
        "Silent pushes are for Android only.",
        "Alert pushes show a message to the user, while silent pushes deliver data to the app in the background without notifying the user.",
        "Silent pushes don't use any data.",
        "Alert pushes can be personalized, silent pushes cannot."
    ],
    correct: 1,
    explanation: "A silent push is a powerful tool for developers to wake up an app in the background to sync data, update content, or perform other tasks without interrupting the user with a visible alert."
  },
  
  // Einstein (Expanded)
  {
    categoryId: 'einstein',
    text: "What is the primary goal of 'Einstein Engagement Scoring'?",
    options: [
      "To predict the best products to recommend to a customer.",
      "To automatically create subject lines for emails.",
      "To predict a subscriber's likelihood to open or click an email in the near future.",
      "To identify which data extensions are used most frequently."
    ],
    correct: 2,
    explanation: "Einstein Engagement Scoring analyzes past customer behavior to generate predictive scores, such as the likelihood to open, click, or unsubscribe, allowing marketers to segment their audience for targeted campaigns."
  },
  {
    categoryId: 'einstein',
    text: "'Einstein Content Selection' helps marketers by...",
    options: [
      "Writing entire email copy from scratch.",
      "Automatically selecting and delivering the best content asset for each individual subscriber at open time.",
      "Choosing the best time of day to launch a journey.",
      "Splitting contacts into A/B test groups."
    ],
    correct: 1,
    explanation: "Einstein Content Selection is a content personalization engine. You provide it with a pool of content assets, and it uses AI to select and serve the asset most likely to be engaged with by each subscriber when they open the email."
  },
  {
    categoryId: 'einstein',
    text: "Which Einstein feature analyzes email engagement to suggest improvements for subject lines?",
    options: [
      "Einstein Send Time Optimization",
      "Einstein Engagement Frequency",
      "Einstein Copy Insights",
      "Einstein Content Tagging"
    ],
    correct: 2,
    explanation: "Einstein Copy Insights analyzes the text from your previous email subject lines to provide performance insights and recommendations, helping you craft more effective subject lines in the future."
  },
  {
    categoryId: 'einstein',
    text: "What does 'Einstein Engagement Frequency' recommend?",
    options: [
      "The best day of the week to send emails.",
      "The optimal number of emails to send to each subscriber over a period of time.",
      "How frequently you should update your data extensions.",
      "The ideal number of links to include in an email."
    ],
    correct: 1,
    explanation: "Einstein Engagement Frequency analyzes your send patterns and subscriber engagement to identify subscribers who are over- or under-saturated, helping you optimize your send cadence."
  },
  {
    categoryId: 'einstein',
    text: "What is the purpose of 'Einstein Content Tagging'?",
    options: [
      "To tag subscribers with their interests.",
      "To automatically apply searchable tags to image assets in Content Builder by analyzing their content.",
      "To add tracking tags to email links.",
      "To tag which content is performing best."
    ],
    correct: 1,
    explanation: "Einstein Content Tagging uses image recognition to analyze your image files and automatically assign relevant tags (e.g., 'bicycle', 'outdoors', 'blue'), making your content library much easier to search and manage."
  },
  {
    categoryId: 'einstein',
    text: "Which of these is a 'persona' that Einstein Engagement Scoring might assign to a subscriber?",
    options: [
      "Frequent Shopper",
      "Loyalists",
      "New Subscriber",
      "Admin User"
    ],
    correct: 1,
    explanation: "Einstein groups subscribers into personas like Loyalists, Window Shoppers, or Dormant/Winback based on their predicted engagement patterns, providing a high-level way to segment your audience."
  },
    {
    categoryId: 'einstein',
    text: "In Einstein Content Selection, what is a 'fallback asset'?",
    options: [
        "An asset shown to subscribers who are not engaged.",
        "An asset displayed if an unexpected error occurs or no other asset meets the selection criteria.",
        "The asset with the highest click-through rate.",
        "An asset that is archived and no longer in use."
    ],
    correct: 1,
    explanation: "A fallback asset is a default piece of content that Einstein will serve if, for any reason, it cannot select a personalized asset for a subscriber, ensuring that no one sees a blank content block."
  },
  {
    categoryId: 'einstein',
    text: "How does Einstein Send Time Optimization (STO) build its model for a contact?",
    options: [
        "By asking the user for their preferences in a form.",
        "By analyzing their past 90 days of email engagement (opens, clicks).",
        "By using their time zone and assuming a 9 AM send time.",
        "By looking at their purchase history."
    ],
    correct: 1,
    explanation: "STO analyzes up to 90 days of a contact's historical engagement data to find patterns and build a predictive model of when they are most likely to interact with an email."
  },
  {
    categoryId: 'einstein',
    text: "What is the minimum amount of data required for 'Einstein Scoring Split' in Journey Builder to function reliably?",
    options: [
        "At least 100 contacts.",
        "At least 1,000 contacts who have opened an email in the last 90 days.",
        "At least 10,000 total subscribers in the account.",
        "At least 1 year of sending history."
    ],
    correct: 2,
    explanation: "To build its predictive models, Einstein requires a sufficient volume of data. For scoring splits, this generally means a minimum of 10,000 subscribers in the business unit to create a reliable model."
  },
  {
    categoryId: 'einstein',
    text: "Which feature would you use to predict if a subscriber is about to unsubscribe?",
    options: [
        "Einstein Churn Score",
        "Einstein Open Score",
        "Einstein Unsubscribe Prediction",
        "Einstein Engagement Scoring for Unsubscribes"
    ],
    correct: 3,
    explanation: "Einstein Engagement Scoring provides several predictive scores, including the 'Likelihood to Unsubscribe', which helps marketers identify at-risk subscribers and potentially target them with retention campaigns."
  },
  {
    categoryId: 'email_studio',
    text: "In Content Builder, what is the primary advantage of using a 'Code Snippet' content block over a 'Free Form' block for complex AMPscript?",
    options: [
      "Code Snippets can contain images, while Free Form cannot.",
      "Code Snippets offer better syntax highlighting and error checking for AMPscript.",
      "Code Snippets have a higher character limit.",
      "Code Snippets can be made dynamic, while Free Form blocks are always static."
    ],
    correct: 1,
    explanation: "Code Snippets provide a dedicated editor with syntax highlighting for AMPscript, HTML, and SSJS, making it easier to write, debug, and manage complex code compared to a standard Free Form block."
  },
  {
    categoryId: 'journey_builder',
    text: "What is the primary function of a 'Join' activity in Journey Builder?",
    options: [
      "To merge two separate journeys into one.",
      "To have a contact join a new Data Extension.",
      "To bring contacts from different paths of a split back into a single path.",
      "To allow a new group of contacts to join an active journey."
    ],
    correct: 2,
    explanation: "The Join activity is used to reunify contacts from multiple branches of a Decision Split or Engagement Split, allowing them to proceed down a common path."
  },
  {
    categoryId: 'analytics',
    text: "Which Data View would you query to find information about subscribers who have had at least one email bounce in the last 30 days?",
    options: [
      "_Sent",
      "_Open",
      "_Click",
      "_Bounce"
    ],
    correct: 3,
    explanation: "The `_Bounce` data view stores records of every bounce event, including the SubscriberKey, JobID, and bounce reason. It is the correct source for analyzing bounce data."
  },

  // ============================================================
  // SALES CLOUD
  // ============================================================
  {
    categoryId: 'sales_cloud',
    text: "A sales rep converts a Lead that has an existing Account match in Salesforce. What happens by default during Lead conversion?",
    options: [
      "A new Account is always created regardless of matches",
      "The rep can choose to merge the Lead into the existing Account",
      "The Lead is automatically deleted and a Task is created on the existing Account",
      "The system blocks conversion until the duplicate Account is removed"
    ],
    correct: 1,
    explanation: "During Lead conversion, Salesforce identifies existing Account matches and allows the rep to select an existing Account rather than creating a new one, preventing duplicates."
  },
  {
    categoryId: 'sales_cloud',
    text: "A sales manager wants Opportunity stages to follow a specific sequence where reps cannot skip stages. Which feature should be configured?",
    options: [
      "Validation Rules on the Stage field",
      "A Sales Process with a guided selling path",
      "Workflow Rules that auto-update the Stage field",
      "Record Types with separate page layouts per stage"
    ],
    correct: 0,
    explanation: "Validation Rules can enforce that the Stage field only moves forward in a defined sequence. A Sales Process defines which stages are available but does not prevent skipping stages on its own."
  },
  {
    categoryId: 'sales_cloud',
    text: "A company uses Person Accounts. A marketing user notices that Person Accounts do not appear when creating a Campaign Member. What is the most likely reason?",
    options: [
      "Person Accounts cannot be added as Campaign Members",
      "The user needs to search under Contacts, since Person Accounts have an implicit Contact record",
      "Campaign Members only support Leads and business Accounts",
      "The Person Account record type is not associated with the Campaign"
    ],
    correct: 1,
    explanation: "Person Accounts have an underlying Contact record. When adding Campaign Members, you search for the Person Account under Contacts, not Accounts."
  },
  {
    categoryId: 'sales_cloud',
    text: "A sales director wants to see a report of all Opportunities closing this quarter, grouped by Stage, with a bar chart showing total Amount per Stage. Which report format should be used?",
    options: [
      "Tabular report with a chart",
      "Summary report grouped by Stage",
      "Matrix report grouped by Stage and Close Date",
      "Joined report combining Opportunities and Activities"
    ],
    correct: 1,
    explanation: "A Summary report grouped by Stage allows grouping and summarizing the Amount field, and supports adding a bar chart. Tabular reports do not support groupings or charts."
  },
  {
    categoryId: 'sales_cloud',
    text: "A company sells products at different prices depending on the customer's region. What is the recommended approach to manage this in Salesforce?",
    options: [
      "Create separate Products for each region",
      "Use one standard Price Book and apply discounts via Workflow Rules",
      "Create custom Price Books for each region with region-specific prices",
      "Use a formula field on the Opportunity Product to calculate the regional price"
    ],
    correct: 2,
    explanation: "Custom Price Books allow the same Product to have different prices for different regions. The standard Price Book holds the default list price, while custom Price Books hold region-specific pricing."
  },
  {
    categoryId: 'sales_cloud',
    text: "A VP of Sales enables Collaborative Forecasting and wants managers to be able to adjust their direct reports' forecast amounts without changing the underlying Opportunity data. Which feature supports this?",
    options: [
      "Opportunity Amount override",
      "Manager Judgment adjustments",
      "Forecast Quota adjustments",
      "Cumulative Forecast Rollup settings"
    ],
    correct: 1,
    explanation: "Manager Judgment (manager adjustments) in Collaborative Forecasting allows managers to adjust a subordinate's forecast amount at the forecast level without modifying the actual Opportunity records."
  },
  {
    categoryId: 'sales_cloud',
    text: "A sales rep creates an Opportunity but cannot select any Products to add. The Opportunity has no Price Book assigned. What must happen first?",
    options: [
      "The admin must add Products directly to the Opportunity",
      "The rep must select a Price Book on the Opportunity before adding Products",
      "Products are automatically added based on the Opportunity Record Type",
      "The rep must create a Quote first, then Products sync to the Opportunity"
    ],
    correct: 1,
    explanation: "An Opportunity must have a Price Book associated with it before Products (Opportunity Line Items) can be added. The rep selects the appropriate Price Book, then chooses Products from it."
  },
  {
    categoryId: 'sales_cloud',
    text: "A company wants to track which marketing Campaigns influenced won Opportunities, even if the Campaign was not the primary source. Which feature should they use?",
    options: [
      "Campaign ROI reports filtered by won Opportunities",
      "Campaign Influence (multi-touch attribution) with Customizable Campaign Influence",
      "A lookup relationship from Opportunity to Campaign",
      "Campaign Hierarchy rollup fields"
    ],
    correct: 1,
    explanation: "Customizable Campaign Influence allows multiple Campaigns to receive attribution credit on a single Opportunity, enabling multi-touch attribution beyond just the primary Campaign Source."
  },
  {
    categoryId: 'sales_cloud',
    text: "An Account has both a billing address and a shipping address. When a new Contact is created under this Account, which address is auto-populated on the Contact's mailing address?",
    options: [
      "The Account's Billing Address",
      "The Account's Shipping Address",
      "Both addresses are copied to the Contact",
      "No address is auto-populated on the Contact"
    ],
    correct: 0,
    explanation: "When a Contact is created on an Account, Salesforce auto-populates the Contact's Mailing Address with the Account's Billing Address by default."
  },
  {
    categoryId: 'sales_cloud',
    text: "A sales team uses a Sales Process called 'Enterprise Sales' with stages: Prospecting, Qualification, Proposal, Negotiation, Closed Won, Closed Lost. A new requirement asks that the 'SMB Sales' team skip Negotiation entirely. What is the best approach?",
    options: [
      "Remove the Negotiation stage from the global picklist values",
      "Create a new Sales Process called 'SMB Sales' that excludes Negotiation and assign it via a Record Type",
      "Use a Validation Rule to block SMB reps from selecting Negotiation",
      "Create a separate Opportunity object for SMB deals"
    ],
    correct: 1,
    explanation: "Creating a separate Sales Process with only the relevant stages and associating it with an SMB Record Type is the standard approach. This keeps the Enterprise process intact while giving SMB a tailored stage path."
  },

  // ============================================================
  // SERVICE CLOUD
  // ============================================================
  {
    categoryId: 'service_cloud',
    text: "A support manager wants to automatically route cases to agents based on their current workload and skill set. Which feature should they configure?",
    options: [
      "Case Assignment Rules",
      "Omni-Channel with Skills-Based Routing",
      "Escalation Rules",
      "Workflow Rules"
    ],
    correct: 1,
    explanation: "Omni-Channel with Skills-Based Routing automatically routes work items to agents based on their skills and current capacity, ensuring balanced workloads and appropriate matching of cases to agent expertise."
  },
  {
    categoryId: 'service_cloud',
    text: "A service agent frequently sends the same paragraph explaining return policies. They want to insert this text into case comments with a few keystrokes. Which feature best addresses this need?",
    options: [
      "Macros",
      "Quick Text",
      "Email Templates",
      "Auto-Response Rules"
    ],
    correct: 1,
    explanation: "Quick Text allows agents to create reusable text snippets that can be inserted into fields like case comments, emails, and chats using a keyboard shortcut, saving time on repetitive typing."
  },
  {
    categoryId: 'service_cloud',
    text: "A company wants to ensure that high-priority cases from platinum customers are reassigned to a senior support tier if not resolved within 4 hours. Which feature should they use?",
    options: [
      "Case Assignment Rules",
      "Auto-Response Rules",
      "Escalation Rules",
      "Entitlement Processes"
    ],
    correct: 2,
    explanation: "Escalation Rules automatically reassign or notify users when cases meet specified criteria and remain unresolved after a defined time period, ensuring critical cases receive timely attention."
  },
  {
    categoryId: 'service_cloud',
    text: "An agent needs to perform multiple repetitive steps on a case: change the status, update a field, and send an email. They want to do this in a single click from the Service Console. What should they use?",
    options: [
      "Quick Text",
      "Flow",
      "Macros",
      "Process Builder"
    ],
    correct: 2,
    explanation: "Macros in the Service Console allow agents to execute multiple actions on a record with a single click, such as updating fields, sending emails, and changing statuses, streamlining repetitive multi-step tasks."
  },
  {
    categoryId: 'service_cloud',
    text: "A company offers different support response times based on customer contracts: Gold customers get 4-hour response, Silver gets 8-hour response. Which two features work together to enforce this?",
    options: [
      "Escalation Rules and Case Assignment Rules",
      "Entitlements and Milestones",
      "Service Level Agreements and Workflow Rules",
      "Omni-Channel and Queue Management"
    ],
    correct: 1,
    explanation: "Entitlements define the level of support a customer is entitled to, while Milestones are time-dependent steps within an Entitlement Process that track required response and resolution times, together enforcing SLA commitments."
  },
  {
    categoryId: 'service_cloud',
    text: "A support team wants their Knowledge Articles to appear as suggested solutions when an agent opens a case, based on the case subject and description. Which Service Console feature enables this?",
    options: [
      "Knowledge Sidebar with Suggested Articles",
      "Einstein Search Personalization",
      "Article Quick Find",
      "Global Search Override"
    ],
    correct: 0,
    explanation: "The Knowledge Sidebar in the Service Console can be configured to automatically suggest relevant Knowledge Articles based on case field values like subject and description, helping agents find solutions faster."
  },
  {
    categoryId: 'service_cloud',
    text: "A new case is created via Web-to-Case. The company wants the case automatically assigned to different queues based on the product and region specified by the customer. What should the admin configure?",
    options: [
      "Omni-Channel Routing Configuration",
      "Case Assignment Rules with multiple rule entries",
      "A record-triggered Flow on Case creation",
      "Territory Management Rules"
    ],
    correct: 1,
    explanation: "Case Assignment Rules evaluate rule entries in order and assign cases to users or queues based on criteria such as product and region. They are the standard declarative tool for routing new cases to the correct queue on creation."
  },
  {
    categoryId: 'service_cloud',
    text: "An agent is working in the Service Console and needs to view a case, its related contact, and a Knowledge Article side by side without losing context. Which Service Console capability supports this?",
    options: [
      "Split View and subtabs",
      "Multi-monitor support",
      "Pinned lists and workspace tabs",
      "Utility Bar components"
    ],
    correct: 0,
    explanation: "The Service Console supports Split View and subtabs, allowing agents to open related records as subtabs within a workspace tab so they can view and work with multiple records side by side without navigating away from their current case."
  },
  {
    categoryId: 'service_cloud',
    text: "A customer service team notices that some cases are stuck in the New status because no assignment rule matched them. What is the most likely cause and fix?",
    options: [
      "The default case owner is not set; configure a default case owner in Support Settings",
      "Case auto-response rules need to be activated",
      "The Omni-Channel presence status is set to offline",
      "Escalation Rules are overriding the Assignment Rules"
    ],
    correct: 0,
    explanation: "When no assignment rule entry matches a case, the case is assigned to the default case owner defined in Support Settings. If no default owner is set, cases may remain unassigned. Configuring a default case owner ensures all cases have an owner."
  },
  {
    categoryId: 'service_cloud',
    text: "A manager wants to track whether agents are responding to cases within the contractual first-response time. Milestone tracking shows some milestones as violated. Where in the entitlement configuration is the first-response deadline defined?",
    options: [
      "On the Case record type page layout",
      "In the Milestone record within the Entitlement Process",
      "In the Escalation Rule time trigger",
      "On the Service Contract line item"
    ],
    correct: 1,
    explanation: "First-response deadlines are defined as Milestones within an Entitlement Process. Each Milestone specifies the time limit and can trigger warning and violation actions, allowing managers to track and enforce contractual response times."
  },

  // ============================================================
  // DATA CLOUD
  // ============================================================
  {
    categoryId: 'data_cloud',
    text: "A company wants to bring in real-time website interaction data from their custom application into Data Cloud. Which ingestion method is most appropriate?",
    options: [
      "Ingestion API with Streaming connector",
      "MuleSoft connector with batch schedule",
      "SFTP file upload",
      "Salesforce CRM connector"
    ],
    correct: 0,
    explanation: "The Ingestion API with a Streaming connector is designed for real-time data ingestion from external custom applications, making it ideal for capturing live website interactions as they occur."
  },
  {
    categoryId: 'data_cloud',
    text: "An admin notices that two customer records from different data streams are not being merged into a single Unified Profile despite having the same email address. What should they check first?",
    options: [
      "Whether the Activation Target is correctly configured",
      "Whether the Identity Resolution ruleset includes an email-based match rule",
      "Whether Calculated Insights have been refreshed",
      "Whether the Data Space has segmentation enabled"
    ],
    correct: 1,
    explanation: "Identity Resolution rulesets define the match and reconciliation rules that determine how records are unified. If email is not included as a match rule, records sharing the same email will not be merged into a single Unified Profile."
  },
  {
    categoryId: 'data_cloud',
    text: "A marketing team wants to create a segment of customers who have spent more than $500 in the last 90 days. The purchase amount is spread across multiple transaction records. What must be configured before building the segment?",
    options: [
      "An Activation Target pointing to Marketing Cloud",
      "A Calculated Insight that aggregates total spend per customer over 90 days",
      "A new Data Stream for purchase summaries",
      "A Data Action to sum purchase amounts"
    ],
    correct: 1,
    explanation: "Calculated Insights allow you to create aggregate metrics like total spend per customer over a defined time window. This computed value can then be used as a filter criterion when building segments."
  },
  {
    categoryId: 'data_cloud',
    text: "A company has three business units that should not see each other's customer data within Data Cloud. How should the administrator handle this requirement?",
    options: [
      "Create three separate Salesforce orgs",
      "Use Permission Sets to restrict record-level access",
      "Configure separate Data Spaces for each business unit",
      "Build three different Identity Resolution rulesets"
    ],
    correct: 2,
    explanation: "Data Spaces provide logical data separation within a single Data Cloud instance, allowing different business units to maintain isolated views of their data while sharing the same underlying infrastructure."
  },
  {
    categoryId: 'data_cloud',
    text: "After setting up a new Data Stream from an S3 source, an admin sees that data is ingested but the fields are not available for segmentation. What is the most likely missing step?",
    options: [
      "The admin has not created an Activation Target",
      "The Data Stream fields have not been mapped to a Data Model Object (DMO)",
      "The Identity Resolution ruleset needs to be rerun",
      "The Ingestion API endpoint has not been whitelisted"
    ],
    correct: 1,
    explanation: "Data from Data Streams must be mapped to Data Model Objects (DMOs) in the data model before the fields become available for downstream use in segmentation, Calculated Insights, and other features."
  },
  {
    categoryId: 'data_cloud',
    text: "A retailer wants to push a Data Cloud segment to Google Ads for targeted advertising. What must be configured in Data Cloud to enable this?",
    options: [
      "A Data Action with a webhook to Google Ads",
      "A Calculated Insight filtered by the segment criteria",
      "An Activation Target configured for Google Ads with the segment published to it",
      "A new Data Stream that exports to Google Ads"
    ],
    correct: 2,
    explanation: "Activation Targets define the external destinations where segments can be published. To send a segment to Google Ads, you must configure Google Ads as an Activation Target and then activate the segment to that target."
  },
  {
    categoryId: 'data_cloud',
    text: "An organization is mapping ingested data to the Data Cloud data model. They have customer purchase records that include both buyer information and product details. How should this data be modeled?",
    options: [
      "Map everything to a single Engagement DMO",
      "Map buyer fields to an Individual DMO and product fields to a separate Product DMO, linked through a Sales Order DMO",
      "Create a custom Calculated Insight to separate the data",
      "Store all fields in a single Data Stream without mapping"
    ],
    correct: 1,
    explanation: "Data Cloud's data model follows a normalized structure. Buyer information maps to the Individual DMO, product details map to the Product DMO, and the transactional relationship is captured through the Sales Order DMO, maintaining proper relational integrity."
  },
  {
    categoryId: 'data_cloud',
    text: "A Data Cloud admin needs to trigger an outbound action in real time when a customer's unified profile meets certain criteria, such as a loyalty score dropping below a threshold. Which feature should they use?",
    options: [
      "Scheduled Segmentation with daily refresh",
      "Data Actions triggered from a Data Cloud-triggered flow",
      "A Calculated Insight with an email alert",
      "An Activation Target refresh schedule"
    ],
    correct: 1,
    explanation: "Data Actions, when used with Data Cloud-triggered flows, enable near-real-time responses to profile changes. When a unified profile meets specified criteria, the flow fires and the Data Action can trigger outbound calls, notifications, or updates in external systems."
  },
  {
    categoryId: 'data_cloud',
    text: "During Identity Resolution, a company finds that too many unrelated records are being merged together, creating overly large unified profiles. Which adjustment would help resolve this?",
    options: [
      "Increase the number of Data Streams",
      "Tighten the match rules by requiring more matching fields or using exact match instead of fuzzy match",
      "Add more Activation Targets",
      "Increase the Calculated Insight refresh frequency"
    ],
    correct: 1,
    explanation: "Overly broad match rules, such as relying on a single fuzzy match criterion, can cause unrelated records to merge. Tightening match rules by requiring multiple fields to match or switching from fuzzy to exact matching reduces false-positive merges."
  },
  {
    categoryId: 'data_cloud',
    text: "A company ingests data from Salesforce CRM, a mobile app via Ingestion API, and a marketing platform via connector. They want a single view of engagement across all sources for each customer. What is the correct sequence of steps?",
    options: [
      "Create segments, then configure Activation Targets, then run Identity Resolution",
      "Map data to DMOs, run Identity Resolution to create Unified Profiles, then build Calculated Insights or segments on the unified data",
      "Run Identity Resolution first, then ingest data, then map to DMOs",
      "Build Calculated Insights on raw Data Streams, then run Identity Resolution"
    ],
    correct: 1,
    explanation: "The correct Data Cloud workflow is: ingest data and map it to DMOs in the data model, then run Identity Resolution to unify records into Unified Profiles, and finally leverage the unified data for Calculated Insights, segmentation, and activations."
  },

  // ============================================================
  // EXPERIENCE CLOUD
  // ============================================================
  {
    categoryId: 'experience_cloud',
    text: "A company wants to allow unauthenticated users to view Knowledge articles on their Experience Cloud site, but restrict access to case creation. Which approach should the administrator configure?",
    options: [
      "Create a custom permission set for guest users and assign it to the site's guest user profile",
      "Configure the Guest User Profile with object permissions for Knowledge and remove case creation from the public page layout",
      "Enable 'Allow guest users to access public APIs' and use sharing rules to limit case access",
      "Set up a sharing set that grants guest users read access to Knowledge objects only"
    ],
    correct: 1,
    explanation: "The Guest User Profile controls what unauthenticated visitors can access on an Experience Cloud site. By granting Knowledge object read permissions and removing case object permissions from this profile, admins can allow article viewing while restricting case creation."
  },
  {
    categoryId: 'experience_cloud',
    text: "A nonprofit organization needs to give partner users access to the same set of Accounts and Contacts that their portal account's parent organization owns. Which feature should be configured?",
    options: [
      "Organization-Wide Defaults set to Public Read/Write for Accounts and Contacts",
      "A sharing set that maps the partner user's Account to the Account record",
      "A sharing rule based on the partner user's role in the role hierarchy",
      "An Apex managed sharing class that runs on partner user login"
    ],
    correct: 1,
    explanation: "Sharing sets in Experience Cloud grant portal or community users access to records based on a relationship between the user's profile (such as their Account) and the records. This is the standard mechanism for giving partner users access to records owned by their parent organization."
  },
  {
    categoryId: 'experience_cloud',
    text: "A marketing team wants to display different banner content on their Experience Cloud site depending on whether a visitor is a returning customer or a new prospect. Which feature supports this requirement?",
    options: [
      "Dynamic Forms on the site's Lightning record pages",
      "Audience targeting with criteria-based audiences in Experience Builder",
      "A Flow component embedded on the home page with decision elements",
      "Customization through a custom Aura component using $Browser global variable"
    ],
    correct: 1,
    explanation: "Audience targeting in Experience Builder allows administrators to define audiences based on criteria such as profile, location, or user attributes, and then show different page variations or component content to each audience segment without code."
  },
  {
    categoryId: 'experience_cloud',
    text: "A company using Experience Cloud CMS wants content authors to create articles once and publish them across both their customer portal and their public marketing site. What should the architect recommend?",
    options: [
      "Create separate CMS workspaces for each site and use a scheduled Flow to sync content",
      "Use a single CMS workspace and connect it to multiple Experience Cloud sites as channels",
      "Export CMS content as JSON and import it into each site using the CMS API",
      "Enable cross-site content sharing in Setup and add each site to a content sharing group"
    ],
    correct: 1,
    explanation: "Salesforce CMS workspaces support multiple channels. By adding multiple Experience Cloud sites as channels within the same workspace, content authors can create content once and make it available across all connected sites."
  },
  {
    categoryId: 'experience_cloud',
    text: "An Experience Cloud site is not appearing in Google search results despite being publicly accessible. Which combination of actions should the administrator take to improve SEO?",
    options: [
      "Enable public access and add meta tags through the site's Head Markup; search engines will index automatically",
      "Enable public access, verify the site's SEO properties in Builder, and submit the auto-generated sitemap to Google Search Console",
      "Create a Visualforce page with meta tags and set it as the site's default landing page",
      "Contact Salesforce support to enable the SEO indexing feature, which is disabled by default"
    ],
    correct: 1,
    explanation: "Experience Cloud sites generate a sitemap automatically when public access is enabled. To maximize SEO, admins should configure page-level SEO properties (titles, descriptions) in Experience Builder and submit the sitemap.xml to Google Search Console for indexing."
  },

  // ============================================================
  // COMMERCE CLOUD
  // ============================================================
  {
    categoryId: 'commerce_cloud',
    text: "A B2B Commerce customer needs to support account-specific negotiated pricing where different buyer accounts see different prices for the same product. Which pricing approach is most appropriate?",
    options: [
      "Use standard price books and assign each buyer account a different price book via entitlement policies",
      "Create a custom pricing engine using Apex that queries a custom pricing object at checkout",
      "Configure tiered pricing rules in the Commerce pricing workspace and assign them to buyer groups",
      "Set up discount schedules on each product and associate them with individual account records"
    ],
    correct: 0,
    explanation: "B2B Commerce on Lightning supports account-specific pricing through price books associated with buyer accounts via entitlement policies. This allows each account or buyer group to see negotiated prices from their assigned price book while keeping configuration declarative."
  },
  {
    categoryId: 'commerce_cloud',
    text: "A retail company wants its storefront to load quickly with modern front-end frameworks while still using Salesforce for back-end commerce services. Which architecture should the solution architect recommend?",
    options: [
      "A SiteGenesis-based storefront with embedded Lightning Web Components",
      "A Salesforce Composable Storefront (PWA Kit) using headless commerce APIs",
      "A custom Visualforce storefront hosted on Salesforce servers with commerce controllers",
      "A SFRA storefront with a React front-end overlay compiled at build time"
    ],
    correct: 1,
    explanation: "Salesforce Composable Storefront (formerly PWA Kit) is the headless commerce solution for B2C Commerce that decouples the front-end from the back-end. It allows teams to use modern JavaScript frameworks while leveraging B2C Commerce APIs for catalog, pricing, and order management."
  },
  {
    categoryId: 'commerce_cloud',
    text: "A Commerce Cloud merchant wants to run a promotion that offers 20% off all items in the 'Summer Collection' category, but only for orders above $100, and it should not stack with any other cart-level discounts. How should this be configured?",
    options: [
      "Create a product-level promotion with a category qualifier, a cart amount condition, and set the promotion's exclusivity to 'Class'",
      "Create a cart-level promotion with the discount applied to qualifying products and set stacking rules to 'No Stacking'",
      "Use a coupon-based promotion with the category assigned as the qualifying group and a minimum order threshold",
      "Create an order-level promotion with a product qualifier and configure mutual exclusion in the promotion campaign"
    ],
    correct: 0,
    explanation: "This scenario requires a product-level promotion scoped to a specific category with a cart-level qualifying condition (order above $100). Setting the promotion exclusivity to 'Class' prevents it from combining with other promotions in the same class, effectively blocking stacking with other cart-level discounts."
  },
  {
    categoryId: 'commerce_cloud',
    text: "A B2B Commerce implementation requires that buyers can only see and purchase products that their organization has been approved for. Which feature should the developer configure to enforce this?",
    options: [
      "Product catalog permission sets assigned to each buyer's community user profile",
      "Entitlement policies linked to buyer groups that define product access and pricing",
      "Custom product visibility rules written in Apex and triggered on product page load",
      "Category access controls in the Commerce app builder with role-based restrictions"
    ],
    correct: 1,
    explanation: "B2B Commerce uses entitlement policies to control which products and price books are available to specific buyer groups. By associating buyer accounts with buyer groups and configuring entitlement policies, administrators can restrict product visibility to only approved items for each organization."
  },
  {
    categoryId: 'commerce_cloud',
    text: "A merchant's Commerce Cloud storefront is experiencing slow product search results and poor relevance. Which combination of actions should improve the search experience?",
    options: [
      "Increase the server hardware allocation and enable Elasticsearch caching in Business Manager",
      "Configure search refinements, adjust searchable attributes, and set up synonym lists in Business Manager",
      "Migrate to a custom SOSL-based search implementation with fuzzy matching enabled",
      "Enable Einstein Search Recommendations and disable the default search index to avoid conflicts"
    ],
    correct: 1,
    explanation: "B2C Commerce search performance and relevance are improved through Business Manager configurations: defining which product attributes are searchable and their ranking weight, setting up search refinements (facets) for filtering, and creating synonym lists so customers find products regardless of exact terminology."
  },
];