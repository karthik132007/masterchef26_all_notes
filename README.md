# masterchef26 — class notes 📓

Day-wise + concept-wise class notes. **Next.js** site, **plain HTML** notes, no backend. Deploys on Vercel as-is.

## courses

| course | mode | url | notes folder |
|---|---|---|---|
| GenAI & Agentic AI | concepts | `/courses/genai-agentic-ai/<slug>` | `public/notes/genai-agentic-ai/` |
| Spring Boot | days | `/courses/spring-boot/day-N` | `public/notes/spring-boot/` |
| Networking | concepts | `/courses/networking/<slug>` | `public/notes/networking/` |
| Operating Systems | concepts | `/courses/os/<slug>` | `public/notes/os/` |
| High-Level Design | concepts | `/courses/hld/<slug>` | `public/notes/hld/` |

Current networking concepts: `osi`, `tcp`, `dns`, `gateway`, `http-1-2-3`.
Current HLD concepts: `monolith`, `load-balancer`, `api-gateway`, `caching`, `db`, `microservices`.
OS concept list is empty for now — add topics in `lib/courses.js` when ready.

## adding notes for a class day (day-wise courses)

1. Open the course folder under `public/notes/`, copy `_template.html` → `day-N.html`
   (e.g. `public/notes/spring-boot/day-3.html`). The name must match the sidebar day.
2. Write plain HTML — fragment only, no `<html>/<head>/<body>`. Free styling:
   `.kicker`, `.callout.exam / .gotcha / .remember / .try`, plus styled
   `h2, p, ul, table, pre` out of the box.
3. Push to main. Vercel redeploys. The sidebar + prev/next pick the day up automatically.
   Days with no file show *"day N notes coming soon"* on their own.

## adding notes for a concept (networking / os / hld)

1. Add the concept in `lib/courses.js` under the course's `topics` array:
   `{ slug: "load-balancer", title: "Load Balancer" }`.
2. In `public/notes/<course-id>/`, copy `_template.html` → `<slug>.html`
   (e.g. `public/notes/networking/load-balancer.html`). The name must match the topic slug.
3. Write plain HTML fragment, push to main. Missing files show
   *"<concept> notes coming soon"* on their own.

## course plan (optional, per course)

Drop `plan.html` in the course folder (e.g. `public/notes/genai-agentic-ai/plan.html`)
and it becomes the first sidebar entry ("Course plan") inside the same notes layout —
same sidebar, same reading area, prev/next flows through it. The course index
redirects there automatically. No `plan.html` = course index goes straight to day 1
(like spring-boot does now).

## changing structure

- `lib/courses.js` — the single source of truth: subjects, colours, plus
  `mode: "days"` (`totalDays`) or `mode: "concepts"` (`topics: [{ slug, title }]`).
  Bump `totalDays` to add days, push to `topics` to add concepts,
  add an entry (+ notes folder) to add a subject.
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
