import { notFound, redirect } from "next/navigation";
import { existsSync } from "fs";
import { join } from "path";
import { courses, getCourse, firstEntrySlug } from "../../../lib/courses";

export function generateStaticParams() {
  return courses.map((c) => ({ courseId: c.id }));
}

// Course landing just forwards into the notes layout:
// plan first (if plan.html exists), otherwise first day / first concept.
export default async function CourseRoot({ params }) {
  const { courseId } = await params;
  const course = getCourse(courseId);
  if (!course) notFound();
  const hasPlan = existsSync(
    join(process.cwd(), "public", "notes", course.id, "plan.html")
  );
  if (hasPlan) redirect(`/courses/${course.id}/plan`);
  const first = firstEntrySlug(course);
  if (first) redirect(`/courses/${course.id}/${first}`);
  notFound();
}
