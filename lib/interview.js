// Single source of truth for interview prep tracks.
// Content is reused from the existing course notes (kept in place);
// these pages are a minimal, reader-friendly wrapper around them.

export const interviewTracks = [
  {
    id: "os",
    title: "Operating Systems",
    short: "OS",
    mark: "OS",
    color: "var(--pink)",
    tagline:
      "From process PCB context switching and 4-level page tables to Linux CFS, epoll zero-copy, and GPU RDMA memory bypass.",
    companies: ["OpenAI", "Anthropic", "Google", "Meta", "NVIDIA"],
    courseId: "os",
    slug: "top-50-interview-questions",
    questions: 50,
  },
  {
    id: "ml",
    title: "Machine Learning",
    short: "ML",
    mark: "ML",
    color: "var(--lavender)",
    tagline:
      "80 recent ML questions across coding, transformers, evaluation and production. Filter, drill, track your progress.",
    companies: ["Meta", "OpenAI", "Amazon", "Google", "Apple", "Microsoft"],
    questions: 80,
    sub: "3 levels · 2025–26 bank",
    kind: "bank",
    file: "ml.json",
  },
  {
    id: "cn",
    title: "Computer Networks",
    short: "CN",
    mark: "CN",
    color: "var(--blue)",
    tagline:
      "80 real questions across 13 topics and 4 levels — OSI to BGP, TCP to TLS, DNS to load balancing. Filter, drill, track your progress.",
    companies: ["Google", "Meta", "Amazon", "Microsoft", "Netflix", "NVIDIA"],
    questions: 80,
    sub: "13 topics · 4 levels · 2026 bank",
    kind: "bank",
    file: "computer_networks_interview_questions.json",
  },
];

export function getInterviewTrack(id) {
  return interviewTracks.find((t) => t.id === id);
}
