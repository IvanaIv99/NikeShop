# Deploying NikeShop to Laravel Cloud

NikeShop deploys as a **single Laravel Cloud app**: the Laravel API (`Backend/`) also
serves the compiled Angular SPA (`Frontend/`) from its `public/` directory. One URL,
one deploy, same origin (so the SPA calls `/api` with no CORS).

## How it fits together

- `Backend/scripts/build-frontend.sh` — builds Angular (prod) and copies the output into `Backend/public/`.
- `Backend/routes/web.php` — catch-all route serves the SPA `index.html` for any non-`/api` path.
- `Frontend/src/app/shared/environment/environment.prod.ts` — prod build points the SPA at same-origin `/api`.
- Angular build output in `Backend/public/` is git-ignored; it is regenerated on every deploy.

## Laravel Cloud dashboard settings

| Setting | Value |
|---------|-------|
| **Application path** | `Backend` |
| **Build command** | `bash scripts/build-frontend.sh` |
| **Deploy command** | `php artisan migrate --force && php artisan config:cache && php artisan route:cache` |
| **Env vars** | `APP_KEY`, `APP_ENV=production`, `APP_URL=https://<your-app>.laravel.cloud`, plus the `DB_*` vars (Laravel Cloud provisions the database) |

## First-deploy verification checklist

The build script assumes Laravel Cloud checks out the **whole repo** (so `../Frontend`
exists during the `Backend/` build) and provides **Node**. This is expected but was not
verifiable before the first real deploy — confirm it on the first run:

- [ ] Build log shows `==> Installing frontend dependencies` and `==> Building Angular (production)` (i.e. it found `../Frontend`).
- [ ] Build log shows `==> Done. SPA is now served from public/index.html`.
- [ ] Visiting the app root loads the Angular UI (not a Laravel error page).
- [ ] A deep link like `/shop` loads the SPA (catch-all route works, no 404).
- [ ] `GET /api/...` calls succeed from the browser (same-origin).
- [ ] Static assets (`main.*.js`, `styles.*.css`) return 200.

### If the build fails to find `../Frontend`
Fallback: build the frontend in CI (e.g. GitHub Actions) and commit the compiled assets
to a deploy branch that Laravel Cloud tracks, so the Laravel Cloud build does no Node work.

## Local preview of the bundled app (optional)

To preview exactly what production serves (SPA served by Laravel, not `ng serve`):

```bash
bash Backend/scripts/build-frontend.sh   # builds + copies into Backend/public
# then hit the Laravel (Sail) URL
```

Normal local dev is unchanged: run the API (Sail) + `cd Frontend && npm run start:dev`.