import { notFound } from "next/navigation";
import { existsSync, readFileSync } from "fs";
import { join } from "path";
import InterviewReader from "../../../components/InterviewReader";
import CNBank from "../../../components/CNBank";
import {
  interviewTracks,
  getInterviewTrack,
} from "../../../lib/interview";

export function generateStaticParams() {
  return interviewTracks.map((t) => ({ track: t.id }));
}

export async function generateMetadata({ params }) {
  const { track: id } = await params;
  const track = getInterviewTrack(id);
  if (!track) return {};
  return {
    title: `${track.title} Interview Drills — Nexora`,
    description: `Top ${track.questions} ${track.title} interview questions with breakdowns. ${track.tagline}`,
  };
}

const year = new Date().getFullYear();

export default async function InterviewTrackPage({ params }) {
  const { track: id } = await params;
  const track = getInterviewTrack(id);
  if (!track) notFound();

  if (track.kind === "bank") {
    const file = join(process.cwd(), "interview_questions", track.file);
    if (!existsSync(file)) notFound();
    const raw = JSON.parse(readFileSync(file, "utf8"));

    // Normalize every bank into one shape:
    // { metadata, questions: [{ id, question, difficulty, topic, companies, year, source? }] }
    const questions = (raw.questions || []).map((q) => ({
      id: q.id,
      question: q.question,
      difficulty: q.difficulty,
      topic: q.topic ?? q.category,
      companies: q.companies || [],
      year: q.year ?? q.reported,
      source: q.source,
    }));
    const bank = {
      metadata: {
        topic: raw.topic ?? raw.title ?? track.title,
        target_companies:
          raw.target_companies ??
          raw.metadata?.target_companies ??
          track.companies,
        source:
          raw.source ?? raw.methodology ?? raw.metadata?.source,
      },
      questions,
    };

    const bankProps =
      track.id === "ml"
        ? {
            kicker: `2025–2026 bank · ${raw.scope ?? "recent ML interviews"}`,
            blurb: `80 recent ML questions from reported ${raw.period ?? "2025–2026"} interviews. Say your answer out loud, then tick the card — progress saves on this device. Company tags appear only where the source explicitly attributes them.`,
            companyNotes: raw.source_notes,
          }
        : {};

    return (
      <>
        <CNBank
          track={track}
          bank={bank}
          tracks={interviewTracks}
          {...bankProps}
        />
        <footer>
          <div className="wrap">
            <span>
              <b>Nexora</b> · {track.short} interview bank · {year}
            </span>
            <span>
              <a href="/">home</a> · <a href="/interview">all drills</a> ·{" "}
              <a href="/roadmaps">roadmaps</a>
            </span>
          </div>
        </footer>
      </>
    );
  }

  const file = join(
    process.cwd(),
    "public",
    "notes",
    track.courseId,
    `${track.slug}.html`
  );
  if (!existsSync(file)) notFound();
  const html = readFileSync(file, "utf8");

  return (
    <>
      <InterviewReader track={track} tracks={interviewTracks} html={html} />
      <footer>
        <div className="wrap">
          <span>
            <b>Nexora</b> · {track.short} interview drills · {year}
          </span>
          <span>
            <a href="/">home</a> · <a href="/interview">all drills</a> ·{" "}
            <a href="/roadmaps">roadmaps</a>
          </span>
        </div>
      </footer>
    </>
  );
}
