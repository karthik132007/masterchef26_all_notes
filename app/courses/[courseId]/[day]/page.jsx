import { notFound, redirect } from "next/navigation";
import { existsSync } from "fs";
import { join } from "path";
import CourseView from "../../../../components/CourseView";
import {
  courses,
  getCourse,
  getEntrySlugs,
  isConceptCourse,
} from "../../../../lib/courses";
import { displayEntryLabel } from "../../../../lib/courseLabels";

function planPath(courseId) {
  return join(process.cwd(), "public", "notes", courseId, "plan.html");
}

export function generateStaticParams() {
  // every course × (plan + day/concept) page is pre-rendered: fully static, vercel-ready
  return courses.flatMap((c) => {
    const slugs = getEntrySlugs(c);
    if (existsSync(planPath(c.id))) slugs.unshift("plan");
    return slugs.map((day) => ({ courseId: c.id, day }));
  });
}

export async function generateMetadata({ params }) {
  const { courseId, day } = await params;
  const course = getCourse(courseId);
  if (!course) return {};
  return {
    title: `${displayEntryLabel(course, day)} · ${course.title} — Nexora`,
    description: `${displayEntryLabel(course, day)} notes for ${course.title}. High-velocity engineering revision.`,
  };
}

const year = new Date().getFullYear();

export default async function DayPage({ params }) {
  const { courseId, day } = await params;
  const course = getCourse(courseId);
  if (!course) notFound();

  if (courseId === "genai-agentic-ai" && day === "day-1") {
    redirect("/courses/genai-agentic-ai/foundations");
  }

  if (courseId === "networking" && day === "load-balancer") {
    redirect("/courses/hld/load-balancer");
  }

  if (courseId === "hld" && day === "cacheing") {
    redirect("/courses/hld/caching");
  }

  const hasPlan = existsSync(planPath(course.id));
  let slug = day;
  if (day === "plan") {
    if (!hasPlan) notFound();
  } else if (isConceptCourse(course)) {
    if (!getEntrySlugs(course).includes(day)) notFound();
  } else {
    const n = parseInt(String(day).replace("day-", ""), 10);
    if (!Number.isInteger(n) || n < 1 || n > course.totalDays) notFound();
    slug = `day-${n}`;
  }

  return (
    <>
      <CourseView course={course} day={slug} hasPlan={hasPlan} />
      <footer>
        <div className="wrap">
          <span>
            <b>Nexora</b> · {course.short} · {year} · spotted an error?
            fix the html, push, done.
          </span>
          <span>
            <a href="/">home</a>
            {courses
              .filter((c) => c.id !== course.id)
              .map((c) => (
                <span key={c.id}>
                  {" "}
                  · <a href={`/courses/${c.id}`}>{c.short}</a>
                </span>
              ))}
          </span>
        </div>
      </footer>
    </>
  );
}
