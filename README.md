# AI Content Generator
This is an AI-powered content generation platform built with [Next.js](https://nextjs.org), Stripe, Clerk, and Google GenAI. It allows users to generate blog posts, social media content, and more using customizable templates.

## Features

- Extensive template library for various content types
- AI-powered content generation (Google GenAI)
- Membership and billing via Stripe
- User authentication via Clerk
- Usage tracking and credit limits
- Responsive UI with Tailwind CSS

## Required Environment Variables

Before running the project, set the following environment variables in your `.env.local` file:

```env
# MongoDB connection string
MONGODB_URI=your_mongodb_connection_string

# Stripe keys and price ID
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_MONTHLY_PRICE_ID=your_stripe_monthly_price_id
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Google GenAI API key
GOOGLE_GEN_AI_API_KEY=your_google_genai_api_key

# Clerk configuration
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Public site URL
NEXT_PUBLIC_URL=http://localhost:3000

# Monthly credits limit (number of words)
NEXT_PUBLIC_CREDITS_LIMIT=10000
```

## Getting Started

1. **Install dependencies:**

   ```sh
   npm install
   # or
   yarn install
   ```

2. **Set up environment variables:**

   Create a `.env.local` file in the root directory and add all required variables as shown above.

3. **Run the development server:**

   ```sh
   npm run dev
   # or
   yarn dev
   ```

4. **Open the app:**

   Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `app/` – Next.js app directory (pages, layouts, API routes)
- `components/` – UI components
- `context/` – React context providers
- `models/` – Mongoose models
- `utils/` – Utility functions
- `actions/` – Server actions (AI, Stripe, etc.)

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Stripe Docs](https://stripe.com/docs)
- [Clerk Docs](https://clerk.com/docs)
- [Google GenAI Docs](https://ai.google.dev/)


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
