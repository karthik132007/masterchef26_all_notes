// Single source of truth for courses.
// Two modes:
//   mode: "days"     -> day-wise notes (day-1.html, day-2.html, ...). Needs `totalDays`.
//   mode: "concepts" -> concept-wise notes (<slug>.html). Needs `topics: [{ slug, title }]`.

export const courses = [
  {
    id: "genai-agentic-ai",
    title: "GenAI & Agentic AI",
    short: "genai + agents",
    mark: "GA",
    color: "var(--yellow)",
    desc: "Prompts, LLMs, RAG — then agents that plan, call tools and get stuff done. One course, full arc.",
    mode: "concepts",
    topics: [
      { slug: "foundations", title: "Foundations" },
      { slug: "attention", title: "Attention" },
      { slug: "working-with-llms", title: "Working with LLMs" },
      { slug: "building-a-chatbot", title: "Building a Small Chatbot" },
      { slug: "rag", title: "RAG" },
      { slug: "rag-evaluation", title: "RAG Evaluation" },
      { slug: "agents", title: "Agents" },
      { slug: "building-an-agent", title: "Building an Agent from Scratch" },
      { slug: "agent-evaluation", title: "Agent Evaluation & Debugging" },
      { slug: "agentic-principles", title: "Principles of Agentic AI" },
      { slug: "multi-agent-systems", title: "Multi-Agent Systems" },
      { slug: "co-founder-project", title: "Building a Small Co-Founder Clone" },
      { slug: "whats-next", title: "What’s Next?" },
    ],
  },
  {
    id: "spring-boot",
    title: "Spring Boot",
    short: "spring boot",
    mark: "SB",
    color: "var(--mint)",
    desc: "Controllers, services, JPA, exception handling. Everything to ship a real REST API.",
    mode: "days",
    totalDays: 10,
  },
  {
    id: "networking",
    title: "Networking",
    short: "networking",
    mark: "NW",
    color: "var(--blue)",
    desc: "OSI, TCP/IP, subnetting, DNS, HTTP — how machines actually talk to each other.",
    mode: "concepts",
    topics: [
      { slug: "osi", title: "OSI Model" },
      { slug: "tcp", title: "TCP" },
      { slug: "dns", title: "DNS" },
      { slug: "gateway", title: "Gateway" },
      { slug: "http-1-2-3", title: "HTTP/1, HTTP/2, HTTP/3" },
      { slug: "load-balancer", title: "Load Balancer" },
    ],
  },
  {
    id: "os",
    title: "Operating Systems",
    short: "os",
    mark: "OS",
    color: "var(--pink)",
    desc: "Processes, scheduling, memory, concurrency. What happens under your code.",
    mode: "concepts",
    topics: [],
  },
  {
    id: "hld",
    title: "High-Level Design",
    short: "hld",
    mark: "HD",
    color: "var(--orange)",
    desc: "Scaling, load balancing, caching, CAP, sharding. Design systems that survive traffic.",
    mode: "concepts",
    topics: [],
  },
  {
    id: "ml",
    title: "Machine Learning",
    short: "ml",
    mark: "ML",
    color: "var(--lavender)",
    desc: "Zero-to-one ML — intuition, math, and Python from scratch for every concept. No prior course needed: regression → SVMs → trees → clustering → anomaly. Built from ml1.pdf + Ml_algos_scratch.",
    mode: "concepts",
    topics: [
      { slug: "raw-notes", title: "📄 Raw Scans (ml1.pdf)" },
      { slug: "ml-overview", title: "ML Overview" },
      { slug: "linear-regression", title: "Linear Regression" },
      { slug: "cost-function", title: "Cost Function" },
      { slug: "gradient-descent", title: "Gradient Descent" },
      { slug: "multiple-regression", title: "Multiple Regression & Vectorization" },
      { slug: "logistic-regression", title: "Logistic Regression" },
      { slug: "regularization", title: "Regularization" },
      { slug: "svm-linear", title: "SVM — Linear" },
      { slug: "svm-poly-kernel", title: "SVM — Poly Kernel" },
      { slug: "precision-recall", title: "Precision, Recall & F1" },
      { slug: "decision-trees", title: "Trees, Forests & Boosting" },
      { slug: "kmeans-clustering", title: "Clustering & K-Means" },
      { slug: "anomaly-detection", title: "Anomaly Detection" },
    ],
  },
];

export function getCourse(id) {
  return courses.find((c) => c.id === id);
}

export function isConceptCourse(course) {
  return course?.mode === "concepts";
}

// All navigable entry slugs for a course:
// concepts -> topic slugs, days -> day-1..day-N
export function getEntrySlugs(course) {
  if (!course) return [];
  if (isConceptCourse(course)) return (course.topics || []).map((t) => t.slug);
  return Array.from({ length: course.totalDays || 0 }, (_, i) => daySlug(i + 1));
}

export function firstEntrySlug(course) {
  return getEntrySlugs(course)[0] || null;
}

// Human label for any slug: topic title for concepts, "Day N" for days.
export function entryLabel(course, slug) {
  if (!course) return slug;
  if (slug === "plan") return "Course plan";
  if (isConceptCourse(course)) {
    const t = (course.topics || []).find((t) => t.slug === slug);
    if (t) return t.title;
    // fallback: prettify slug ("http-1-2-3" -> "Http 1 2 3")
    return String(slug)
      .split("-")
      .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
      .join(" ");
  }
  return dayLabel(slug);
}

export function entryNumber(course, slug) {
  if (!course || slug === "plan") return 0;
  if (isConceptCourse(course)) {
    const i = (course.topics || []).findIndex((t) => t.slug === slug);
    return i >= 0 ? i + 1 : NaN;
  }
  return dayNumber(slug);
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
