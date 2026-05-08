# ScriptFlow AI — Setup Guide

**AI-powered script generator for content creators and marketers**

---

## Quick Start (5 minutes)

### 1. Clone & Install

```bash
git clone <your-repo-url> scriptflow-ai
cd scriptflow-ai
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in all values (instructions for each service below).

### 3. Run locally

```bash
npm run dev
```

Visit `http://localhost:3000`

---

## Service Setup

### OpenAI API Key

1. Go to [platform.openai.com](https://platform.openai.com)
2. Create account or sign in
3. Go to API Keys → Create new secret key
4. Copy to `OPENAI_API_KEY` in `.env.local`
5. Add a payment method and set a spending limit (recommended: $20/month to start)

### Clerk (Authentication)

1. Go to [clerk.com](https://clerk.com) and create an account
2. Create a new application — name it "ScriptFlow AI"
3. Enable Email + Google OAuth in the Clerk dashboard
4. Copy the Publishable Key and Secret Key to your `.env.local`
5. In Clerk dashboard → Paths, set:
   - Sign-in URL: `/sign-in`
   - Sign-up URL: `/sign-up`
   - After sign-in: `/dashboard`
   - After sign-up: `/dashboard`

### Supabase (Database)

1. Go to [app.supabase.com](https://app.supabase.com) and create a project
2. Wait for provisioning (~2 minutes)
3. Go to SQL Editor and paste the contents of `supabase/schema.sql` → Run
4. Go to Settings → API and copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`

### Stripe (Payments — TEST MODE)

The app is pre-configured for Stripe TEST MODE. No real charges occur during testing.

1. Go to [dashboard.stripe.com](https://dashboard.stripe.com) and create an account
2. Enable test mode (toggle in top left)
3. Go to API Keys → copy test keys to `.env.local`
4. Create two products:
   - **ScriptFlow Pro Monthly** — $19/month recurring → copy Price ID to `STRIPE_PRO_MONTHLY_PRICE_ID`
   - **ScriptFlow Pro Annual** — $149/year recurring → copy Price ID to `STRIPE_PRO_ANNUAL_PRICE_ID`
5. Set up webhook (for subscription events):
   - Go to Developers → Webhooks → Add endpoint
   - URL: `https://your-domain.com/api/webhooks/stripe`
   - Events: `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`, `checkout.session.completed`
   - Copy Signing Secret → `STRIPE_WEBHOOK_SECRET`

**Testing Stripe locally:**
```bash
# Install Stripe CLI
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

**To go live:** Replace all `sk_test_...` / `pk_test_...` / `whsec_...` values with your live keys from the Stripe dashboard.

---

## Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import from GitHub
3. Add all environment variables from `.env.local` to Vercel's environment settings
4. Deploy — Vercel auto-detects Next.js

After deploying:
- Update `NEXT_PUBLIC_APP_URL` to your production URL (e.g. `https://scriptflowai.com`)
- Update your Stripe webhook URL to the production domain
- Update Clerk's allowed origins in the Clerk dashboard

---

## File Structure

```
src/
  app/
    page.tsx              # Landing page
    layout.tsx            # Root layout (Clerk, metadata, fonts)
    globals.css           # Tailwind + design tokens
    dashboard/
      page.tsx            # Main generator dashboard
      layout-inner.tsx    # Sidebar navigation
      script/[id]/page.tsx # Script detail view
    pricing/page.tsx      # Pricing page with Stripe checkout
    settings/page.tsx     # Account & subscription settings
    sign-in/              # Clerk sign-in
    sign-up/              # Clerk sign-up
    api/
      generate/route.ts         # POST — generate script with GPT-4o
      scripts/route.ts          # GET — script history
      scripts/[id]/route.ts     # GET/DELETE — single script
      subscription/
        checkout/route.ts       # POST — Stripe checkout
        portal/route.ts         # POST — Stripe billing portal
        status/route.ts         # GET — plan/usage status
      webhooks/stripe/route.ts  # POST — Stripe webhook handler
      user/route.ts             # GET/DELETE — user data
  components/
    Navbar.tsx            # Floating glass navbar
    Footer.tsx            # Footer with links
    UpgradeModal.tsx      # Freemium gate modal
  lib/
    supabase.ts           # Supabase client + types
    stripe.ts             # Stripe client + plan config
    openai.ts             # OpenAI client + prompt builder
    user.ts               # User helpers (create, usage check)
supabase/
  schema.sql              # Database schema — run in Supabase SQL editor
```

---

## Customization

- **Colors**: Edit `tailwind.config.ts` → `theme.extend.colors`
- **Script types**: Edit `src/lib/openai.ts` → `SCRIPT_TYPES` array
- **Pricing**: Edit `src/lib/stripe.ts` → `PLANS` + update Stripe products
- **Landing copy**: Edit `src/app/page.tsx`
- **Rate limits**: Edit `src/lib/stripe.ts` → `PLANS.free.scriptsPerMonth` and `PLANS.pro.scriptsPerMonth`
