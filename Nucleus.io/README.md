# Nucleus.io

Static marketing site — plain HTML, CSS and JS, styled with Tailwind CSS.

## Tailwind CSS build

Tailwind is **not** loaded from the CDN at runtime (the Play CDN is not meant for
production and re-parses the full config on every page load). Instead, the
utility classes used across the `.html` files are compiled ahead of time into
`tailwind.css`, which each page loads via a plain `<link>` tag.

This means **new or changed Tailwind classes in the HTML won't render until
`tailwind.css` is rebuilt.**

### Rebuilding locally

```bash
cd Nucleus.io
npm install        # first time only, or after package.json changes
npm run build:css  # regenerates tailwind.css from the current HTML
```

Commit the updated `tailwind.css` along with your HTML changes.

### Automatic rebuild in CI

A GitHub Actions workflow (`.github/workflows/build-tailwind.yml`) rebuilds
`tailwind.css` automatically on every push to `app.py` that touches the HTML
files, `tailwind.config.js`, or `tailwind.input.css`. If the rebuilt file
differs from what's committed, the workflow commits the update back to the
branch itself — so even if you forget to run the build locally, the live site
won't end up serving stale CSS for long. Running the build locally first is
still the faster feedback loop while you're actively editing.

### Files involved

- `tailwind.config.js` — theme (colors, spacing, fonts, etc.) and content paths.
- `tailwind.input.css` — the `@tailwind` directives Tailwind compiles from.
- `tailwind.css` — the generated, minified output actually loaded by the site.
- `package.json` / `package-lock.json` — pins `tailwindcss` and its
  `@tailwindcss/forms` / `@tailwindcss/container-queries` plugins.
