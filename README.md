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

The product form posts to `/api/contact`. Set `RESEND_API_KEY` and `RESEND_FROM_EMAIL` in the Vercel project, or in an untracked `.env.local` for local development. The sender must be permitted by the Resend account. Enquiries are addressed to `hello@rarestar.studio`, with the visitor's email set as reply-to. If sending is unavailable, visitors are shown the studio email address instead.

The form uses server validation, an origin check and a honeypot. The honeypot only filters simple automated submissions; use a shared rate limit or challenge if abuse becomes a problem.

## Deployment and DNS

The GitHub repository is connected to the `rarestarstudio` Vercel project. Both product hostnames must be attached there. Set the apex A record and `www` CNAME at the domain's authoritative DNS provider to the values Vercel currently recommends for this project. Preserve unrelated DNS records. Verify the production deployment, DNS, HTTPS and redirects after a change.

Run `graphify update .` after code changes as described in `AGENTS.md`.
