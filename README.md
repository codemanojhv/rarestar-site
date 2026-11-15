# Rarestar Studio and String Theory Ads

One Next.js project serves two sites using hostname routing:

- `www.rarestar.studio` — Rarestar Studio
- `stringtheoryads.in` — String Theory Ads

`www.stringtheoryads.in` and the former `stringtheoryads.rarestar.studio` hostname redirect to the product domain when their DNS points to this project. The canonical URLs, sitemap, manifest and page metadata are derived from the site configuration in `src/types/site.ts`.

## Local development

```sh
npm install
npm run dev
```

Open `http://localhost:3001` for the studio and `http://stringtheoryads.localhost:3001` for the product site.

```sh
npm run typecheck
npm run test:contact
npm run build
```

The contact check mocks the email provider and does not send a message.

## Enquiries

Both forms post to `/api/contact`. Set `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, and `CONTACT_RECEIVER_EMAIL` in Vercel or in an untracked `.env.local` for local development. The sender must be permitted by the Resend account. The recipient defaults to `hello@rarestar.studio`; the visitor's email is used as reply-to. If sending fails, the form retains the details and offers a retry and email fallback.

Campaign, venue and careers enquiries have different fields. A visitor's illustrative place, moment and sample headline are included only when the context is shown beside the form. Cross-domain links carry only the place and moment; free text and contact details never go into the URL. Identical retries use the same Resend idempotency key. Logs contain delivery status and a correlation ID, not enquiry contents.

The form uses server validation, an origin check and a honeypot. The honeypot only filters simple automated submissions; managed Turnstile was deferred by request. Use shared rate limiting or a challenge if abuse becomes a problem.

## Deployment and DNS

The GitHub repository is connected to the `rarestarstudio` Vercel project. Both product hostnames must be attached there. Set the apex A record and `www` CNAME at the domain's authoritative DNS provider to the values Vercel currently recommends for this project. Preserve unrelated DNS records. Verify the production deployment, DNS, HTTPS and redirects after a change.

Run `graphify update .` after code changes as described in `AGENTS.md`.
