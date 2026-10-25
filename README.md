# alhuissi.com

A personal home for Alfredo L’huissier. An independently authored, lightweight site built with semantic HTML, CSS and minimal JavaScript.

## Preview locally

From the repository root: `python3 -m http.server 8000` then open http://localhost:8000.

No dependencies or build step. All assets are stored in `assets/` except the GitHub portrait, which loads from GitHub's avatar CDN.

## Publishing

GitHub Pages → Settings → Pages → Source: **Deploy from a branch**, branch **main**, folder **/(root)**. The custom domain alhuissi.com should be configured **only after** the initial preview is accepted, DNS and email records have been audited, and thedeval.com redirects have been planned. Do not set DNS just to preview.

Media sources: Dream Ocean imagery from `alhuissi/dream-ocean-website`; Pocket Orbit gameplay from `alhuissi/pocket-orbit`. Re-export or replace these assets as the games change.

## Notes before domain migration

- Switch canonical, OG and sitemap URLs to https://alhuissi.com/ after the domain cutover.
- Replace the temporary `mailto:alfredo@thedeval.com` link if a new mailbox is commissioned; never modify MX/SPF/DKIM/DMARC records for a website move.
- Keep thedeval.com online until redirects and email continuity are configured.
- Social and Steam publisher links should be checked after launch. No newsletter, analytics, or contact service is invented by this site.
