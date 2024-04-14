# 💸 Better Budget (Web App)

 - 🎯 **Purpose**: BetterBudget, is a project dedicated to empowering individuals and families to take control of their finances. I believe that with the right tools and insights, people can make more informed financial decisions, achieve their financial goals, and secure their financial future.

 - 👉 **Features**: *Personalized Expense Tracking - AI Assistant - Goal Setting/Tracking - Simplistic Usage*

 - 💻 **Tech Stack**:\
        - Frontend: *React.js/Vite/MantineUI*\
        - Backend: *Node.js/Express/PostgreSQL*\
        - Utilities: *Nodemon/dayjs/Postman/TailwindCSS/*

 - ⚡ **Quick Start**:\
        1. ```cd <desired location>```\
        2. ```git clone https://github.com/aqzx127/Better-Budget.git```\
        3. ```cd frontend | backend```\
        4. ```npm install```\
        5. ```npm run dev | npm start```

## 📚 Main Feature Todo's for a MVP:
    - User Registration/Account Creation (Feature 1) [X]

        - User Account Data Model (Auth0/JWT) [X]
            - UserId [string, unique]
            - Email [string, unique] (Must Receive email conformation after registration!)
            - Name
            - Bio
            - Region

        - User has a main built in Better-Budget Account and can add multiple Plaid accounts which are separate entities. [/] IDEA SCRATCHED

        - Prompt user to input monthly income to start with [X]

        - User Profile Creation [X]
                - Settings Page []
                - Notifications Setup [] (NOT IMPORTANT RN)
                - Bio/About Page [X]
                - Terms of Service [ ]
        
        - Bank Linking [/] IDEA SCRATCHED
                - Plaid API [X] (Still need to save Plaid data to local postgreSQL DB)
                - Populate Balance [X], 
                - Populate/List Transactions []
                - Categorize Expenses [] (Need to train MLM to categorize transactions, AWS SageMaker)
---
    - User Expense Tracking (Feature 2) [X]

        - Data Entry
           - Form Fields [X]
           - Categorization [ ]
           - Date Picker [X]
           - File Upload (Receipt/Photo) [ ] (NOT IMPORTANT RN)

           - User Statement/Transaction Data Model
                - Amount [int]  v
                - Date/Time [string] (dayJS autofill)
                - Category [string]
                - Payment Method [string]
                - Description/Notes [string]
                - Receipts/Images [file upload] (optional)
        
        - Data Privacy & Security 
           - Privacy Policy
           - Data Encryption (Transit/Rest)
           - Secure Authentication
           - Ensure Legal Compliance [GDPR/CCPA] (Financial Data)

        - Analytics & Reporting
           - Dashboard: Shows recent expenses, total spendings by category, ect
           - Reports: Allow users to generate monthly detailed reports
           - Transaction History: Show users a list of all their previous transactions
---
    - AI Insights Chatbot via OpenAI API (Feature 3) [X] NEEDS $FUNDS 
        - BudgetBuddy Main Features:
           - Analyze user income/expense and savings goals
           - Provide recommendations based on user data
           - Ensure security and privacy of user financial data while delivering insights
--- 
    - User Goal Setting and Tracking (Feature 4) [X]

        - Set Specific Goals with target amounts/deadlines
        - System must track users progress toward goal in real-time
        - Users should receive feedback on goals to help them stay on track
        - System to adapt and mention goal recommendations based on user data

### ❓ Other Thoughts & Concerns
 - Framer Motion?
 - Banking API? (Plaid)
 - Payment of OpenAI API Services?
 - Hosting for Frontend/Backend & Database?
 - Ability to Scale?
 - Overall Theme/Design of UI?
 - State Management Library?
 - Testing? (Unit/Integration/End-to-End)
 - API Documentation?
 - Rate Limiting?
 - Helmet? (Security)
 - Possible External Security Risks?
 - Input Validation/Sanitize?
 - Error Logging/ App Monitoring?
 - Performance Optimizations?
 - Responsive Design?
 - Docker/Kubernetes?
 - CI/CD?
 - Accessibility?
 - Internationalization/Localization? (Currency, Language)