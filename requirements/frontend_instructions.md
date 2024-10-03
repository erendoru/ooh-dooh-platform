#Project Overview
Use this guide to create a web app where users can use billboards from advertising agencies in their area. A modern web app where users can log in and customers can view billboards, add them to their cart, upload their images, and purchase billboards.

#Feature Requirements

We will use NextJS(14), TailwindCSS, shadcn UI, Supabase for auth and backend and iyzico for payment.
We will have different pages:

- Home Page
- Login Page
- Signup Page
- Dashboard Page
- Billboard Page
- Billboard Detail Page
- Cart Page
- Checkout Page
- Order Page
- Profile Page
  in the navbar there will be pages and links for customers to understand the app different pages.
  - Have a nice UI & Animation when the user interact with website.
  - Use TailwindCSS for styling.
  - Use shadcn UI for styling.
  - Use Supabase for auth and backend.
  - Use iyzico for payment.
  - Use NextJS for frontend.

#Relevant Docs

#Current File Structure

.
├── .next
├── node_modules
├── public
├── requirements
├── src
│ └── app
│ ├── analiz
│ ├── cart
│ ├── checkout
│ ├── dashboard
│ ├── login
│ ├── my-billboards
│ ├── orders
│ ├── pano-yukle
│ ├── profile
│ ├── register
│ ├── reklam-ver
│ ├── settings
│ ├── ClientLayout.tsx
│ ├── globals.css
│ ├── layout.tsx
│ ├── not-found.tsx
│ └── page.tsx
│ ├── components
│ ├── contexts
│ │ └── AuthContext.tsx
│ ├── hooks
│ │ ├── useCart.ts
│ │ └── useDashboard.ts
│ └── lib
│ ├── supabase.ts
│ ├── supabaseUtils.ts
│ ├── userUtils.ts
│ ├── utils.ts
│ └── types.ts
├── .env.local
├── .eslintrc.json
├── .gitignore
├── components.json
├── next-env.d.ts
└── next.config.mjs

#Rules

- All new components should be in the components folder.
- All new pages goes in the src/app folder. in a folder with the same name as the page.
