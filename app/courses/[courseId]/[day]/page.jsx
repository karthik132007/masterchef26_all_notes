import { notFound } from "next/navigation";
import { existsSync } from "fs";
import { join } from "path";
import Navbar from "../../../../components/Navbar";
import CourseView from "../../../../components/CourseView";
import { courses, getCourse, daySlug, dayLabel } from "../../../../lib/courses";

function planPath(courseId) {
  return join(process.cwd(), "public", "notes", courseId, "plan.html");
}

export function generateStaticParams() {
  // every course × (plan + day) page is pre-rendered: fully static, vercel-ready
  return courses.flatMap((c) => {
    const slugs = Array.from({ length: c.totalDays }, (_, i) => daySlug(i + 1));
    if (existsSync(planPath(c.id))) slugs.unshift("plan");
    return slugs.map((day) => ({ courseId: c.id, day }));
  });
}

export async function generateMetadata({ params }) {
  const { courseId, day } = await params;
  const course = getCourse(courseId);
  if (!course) return {};
  return {
    title: `${dayLabel(day)} · ${course.title} — masterchef26 notes`,
    description: `${dayLabel(day)} notes for ${course.title}. Student-written class notes.`,
  };
}

const year = new Date().getFullYear();

export default async function DayPage({ params }) {
  const { courseId, day } = await params;
  const course = getCourse(courseId);
  if (!course) notFound();

  const hasPlan = existsSync(planPath(course.id));
  let slug = day;
  if (day === "plan") {
    if (!hasPlan) notFound();
  } else {
    const n = parseInt(String(day).replace("day-", ""), 10);
    if (!Number.isInteger(n) || n < 1 || n > course.totalDays) notFound();
    slug = daySlug(n);
  }

  return (
    <>
      <Navbar
        links={courses
          .filter((c) => c.id !== course.id)
          .map((c) => ({ href: `/courses/${c.id}`, label: c.short }))}
      />
      <CourseView course={course} day={slug} hasPlan={hasPlan} />
      <footer>
        <div className="wrap">
          <span>
            <b>masterchef26 notes</b> · {course.short} · {year} · spotted an
            error? fix the html, push, done.
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
