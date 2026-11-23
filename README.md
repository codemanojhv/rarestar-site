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

Both landing pages link directly to `hello@rarestar.studio` using the visitor's email app. The previous `/api/contact` endpoint remains available for compatibility; it is not used by the landing pages. Its Resend configuration and existing honeypot are unchanged.

## Deployment and DNS

The GitHub repository is connected to the `rarestarstudio` Vercel project. Both product hostnames must be attached there. Set the apex A record and `www` CNAME at the domain's authoritative DNS provider to the values Vercel currently recommends for this project. Preserve unrelated DNS records. Verify the production deployment, DNS, HTTPS and redirects after a change.

Run `graphify update .` after code changes as described in `AGENTS.md`.
