// Single source of truth for courses + days.
// To add more days, just bump `totalDays`. To add a subject, add an entry here
// + a folder under public/notes/<id>/ — no other code changes needed.

export const courses = [
  {
    id: "genai-agentic-ai",
    title: "GenAI & Agentic AI",
    short: "genai + agents",
    mark: "GA",
    color: "var(--yellow)",
    desc: "Prompts, LLMs, RAG — then agents that plan, call tools and get stuff done. One course, full arc.",
    totalDays: 12,
  },
  {
    id: "spring-boot",
    title: "Spring Boot",
    short: "spring boot",
    mark: "SB",
    color: "var(--mint)",
    desc: "Controllers, services, JPA, exception handling. Everything to ship a real REST API.",
    totalDays: 10,
  },
];

export function getCourse(id) {
  return courses.find((c) => c.id === id);
}

export function daySlug(n) {
  return `day-${n}`;
}

export function dayLabel(slug) {
  if (slug === "plan") return "Course plan";
  const n = parseInt(String(slug).replace("day-", ""), 10);
  return Number.isFinite(n) ? `Day ${n}` : slug;
}

export function dayNumber(slug) {
  if (slug === "plan") return 0;
  return parseInt(String(slug).replace("day-", ""), 10);
}
