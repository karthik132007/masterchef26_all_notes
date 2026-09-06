# masterchef26 — class notes 📓

Day-wise class notes. **Next.js** site, **plain HTML** notes, no backend. Deploys on Vercel as-is.

## courses

| course | url | notes folder |
|---|---|---|
| GenAI & Agentic AI | `/courses/genai-agentic-ai/day-N` | `public/notes/genai-agentic-ai/` |
| Spring Boot | `/courses/spring-boot/day-N` | `public/notes/spring-boot/` |

## adding notes for a class day (the only workflow you need)

1. Open the course folder under `public/notes/`, copy `_template.html` → `day-N.html`
   (e.g. `public/notes/spring-boot/day-3.html`). The name must match the sidebar day.
2. Write plain HTML — fragment only, no `<html>/<head>/<body>`. Free styling:
   `.kicker`, `.callout.exam / .gotcha / .remember / .try`, plus styled
   `h2, p, ul, table, pre` out of the box.
3. Push to main. Vercel redeploys. The sidebar + prev/next pick the day up automatically.
   Days with no file show *"day N notes coming soon"* on their own.

## course plan (optional, per course)

Drop `plan.html` in the course folder (e.g. `public/notes/genai-agentic-ai/plan.html`)
and it becomes the first sidebar entry ("Course plan") inside the same notes layout —
same sidebar, same reading area, prev/next flows through it. The course index
redirects there automatically. No `plan.html` = course index goes straight to day 1
(like spring-boot does now).

## changing structure

- `lib/courses.js` — the single source of truth: subjects, day counts, colours.
  Bump `totalDays` to add days, add an entry (+ notes folder) to add a subject.
- `app/` — homepage (`page.jsx`), course routes (`courses/[courseId]/[day]/`).
- `components/CourseView.jsx` — sidebar, day navigation, html loading.
- `app/globals.css` — the notebook theme + `.note-body` styles for note html.

## run locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # verify production build
```

## deploy (vercel)

Import the repo → framework preset: **Next.js** → defaults. No env vars, no backend.
