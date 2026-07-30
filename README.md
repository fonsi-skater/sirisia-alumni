# Sirisia Alumni Class — platform

## Structure

```
app/
  layout.tsx          Root layout
  page.tsx             Homepage
  events/               Upcoming events
  contributions/        Live contribution tracking + targets
  gallery/              Event photos
  forum/                Discussion / suggestions area
  meetings/             Video meeting links
  members/              Member directory
components/
  ui/                   Reusable buttons, cards, inputs
  layout/               Navbar, footer, shared shell
lib/
  db.ts                 Prisma client singleton
  mpesa.ts              M-Pesa Daraja integration (stub — built next)
prisma/
  schema.prisma         Database schema (members, targets,
                        contributions, events, photos, posts)
```

## Local setup

1. `npm install`
2. Copy `.env.example` to `.env` and fill in real values
3. `npx prisma db push` — creates the tables from schema.prisma
4. `npm run dev` — starts the site at localhost:3000

## Status

- [x] Project scaffold
- [x] Database schema
- [ ] Member auth (phone + OTP)
- [ ] Live contribution tracking UI
- [ ] M-Pesa Daraja webhook
- [ ] Event + photo gallery pages
- [ ] Forum / discussion board
- [ ] Video meeting embed
- [ ] Social media links section
- [ ] Visual design pass (colors, type, layout)

## Deploy (free tier)

- Frontend: Vercel
- Backend/DB: same Next.js app + Supabase/Neon Postgres (free tier)
- Photos: Cloudinary (free tier)
