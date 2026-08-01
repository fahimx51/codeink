# CodeInk

A full-stack article publishing platform built with Next.js — write, edit, publish, like, comment, and read articles with a rich-text editor and a Redis-backed caching layer for fast reads.

**Live Demo:** https://codeink-three.vercel.app/

---

## Features

- ✍️ **Rich-text article editor** using React Quill — supports headings, bold, italic, lists, and more
- 📝 **Full CRUD for articles** — create, edit, delete your own articles from a personal dashboard
- ❤️ **Likes** — like/unlike articles with real-time count
- 💬 **Comments** — flat (non-nested) commenting on articles
- 👁️ **View tracking** — Redis-buffered view counter with per-user cooldown to prevent refresh-spam inflating counts, periodically flushed to Postgres
- ⚡ **Redis caching** — article detail pages are cached in Redis, cutting repeat-read latency and reducing database load
- 🔐 **Authentication** — secure sign-in/sign-up via Clerk
- 🖼️ **Image uploads** — article thumbnails hosted via Cloudinary
- 🌗 **Dark/light theme toggle**
- 📱 **Fully responsive UI** built with Tailwind CSS

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | PostgreSQL |
| ORM | Prisma |
| Cache | Redis (ioredis) |
| Auth | Clerk |
| Rich Text Editor | React Quill (react-quill-new) |
| Image Hosting | Cloudinary |
| Deployment | Vercel |

---

## Architecture Highlights

**Caching strategy:** Article detail pages check Redis first before hitting Postgres. On a cache miss, the article is fetched via Prisma, then written back to Redis with a 24-hour expiry — reducing repeated database reads for popular articles.

**View counting:** Rather than writing to Postgres on every page view (which doesn't scale under load), views are incremented atomically in Redis first. A per-user cooldown key prevents the same visitor from inflating the count via repeated refreshes. A background job periodically flushes accumulated Redis counts into the Postgres `views` column, keeping the database write load low while still persisting an accurate, durable count.

---

## Getting Started

### Prerequisites

- Node.js 18+
- A PostgreSQL database (e.g. [Neon](https://neon.tech))
- A Redis instance (e.g. [Upstash](https://upstash.com))
- A [Clerk](https://clerk.com) account for authentication
- A [Cloudinary](https://cloudinary.com) account for image hosting


## Author

**Foisal Ahmed Fahim**
Full Stack Developer | Competitive Programmer
[GitHub](https://github.com/fahimx51)