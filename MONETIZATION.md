# ScriptFlow AI — Monetization Model

## Revenue Streams

### 1. SaaS Subscriptions (Primary)

| Plan | Price | Limit |
|------|-------|-------|
| Free | $0/month | 5 scripts/month |
| Pro Monthly | $19/month | 200 scripts/month |
| Pro Annual | $149/year | 200 scripts/month |

**Unit economics at 100 Pro subscribers:**
- Monthly revenue: ~$1,900/month
- OpenAI cost estimate: ~$0.02–0.05 per script × 20,000 scripts/month = ~$400–1,000
- Gross margin: ~47–79%

**Unit economics at 500 Pro subscribers:**
- Monthly revenue: ~$9,500/month
- OpenAI costs: ~$2,000–5,000
- Gross margin: ~47–79%

---

## Freemium Funnel

The free tier is deliberately tight (5 scripts/month) to create a natural upgrade trigger.

**Conversion funnel:**
1. User signs up (free, no card required)
2. Uses 5 free scripts — typically within 1-3 sessions for active creators
3. Hits the upgrade modal after the 5th script
4. Converts to Pro at $19/month

**Tested conversion benchmarks (comparable SaaS):**
- Free → Pro conversion: 3–8% of active free users
- Annual vs monthly: 30–40% of Pro subscribers choose annual

---

## Growth Levers for the Buyer

### Immediate (Week 1)
1. Launch on Product Hunt — AI tools consistently rank well
2. Post before/after (manual script vs ScriptFlow output) on Twitter/LinkedIn
3. List on AppSumo or similar deal platforms for a quick cash injection

### Short-term (Month 1–3)
4. Add affiliate program — 30% commission for 12 months drives word-of-mouth among creators
5. Create YouTube tutorials showing ScriptFlow generating scripts for specific niches
6. Partner with 3-5 mid-size YouTube creators (10k–100k subs) for sponsored integrations

### Medium-term (Month 3–12)
7. Add a "Script Pack" product — pre-made script templates for $29 one-time purchase
8. Add a team/agency plan — $99/month for 5 seats with shared history
9. Build an API product for developers who want to embed ScriptFlow into their tools

---

## Expansion Revenue Ideas

- **Done-for-you tier**: $99–299 for a human-reviewed, production-ready script (high-margin service layer)
- **Custom brand voice training**: Pro+ tier at $49/month — user pastes 5 of their own scripts, AI learns their style
- **Bulk script packages**: 50 scripts for $39 one-time — converts freelancers and agencies

---

## Cost Structure

| Item | Estimated Monthly Cost |
|------|----------------------|
| OpenAI GPT-4o API | $0.02–0.05 per script |
| Vercel hosting | $0–20 (scales with traffic) |
| Supabase | $0–25 (free tier covers early stage) |
| Clerk auth | $0–25 (free for first 10k MAU) |
| Stripe fees | 2.9% + $0.30 per transaction |

**Break-even point:** ~15 Pro subscribers cover all fixed costs.

---

## Flippa Listing Notes

This app is being sold as a fully operational, monetized SaaS. Buyer gets:
- Complete source code (Next.js, TypeScript)
- All design assets and copy
- Database schema
- This documentation
- Domain transfer (if applicable)

The codebase is clean, well-documented, and structured for a freelancer to maintain or expand without deep technical knowledge.
