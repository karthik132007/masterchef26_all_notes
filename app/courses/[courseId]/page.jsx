import { notFound, redirect } from "next/navigation";
import { existsSync } from "fs";
import { join } from "path";
import { courses, getCourse } from "../../../lib/courses";

export function generateStaticParams() {
  return courses.map((c) => ({ courseId: c.id }));
}

// Course landing just forwards into the notes layout:
// plan first (if plan.html exists), otherwise day 1.
export default async function CourseRoot({ params }) {
  const { courseId } = await params;
  const course = getCourse(courseId);
  if (!course) notFound();
  const hasPlan = existsSync(
    join(process.cwd(), "public", "notes", course.id, "plan.html")
  );
  redirect(`/courses/${course.id}/${hasPlan ? "plan" : "day-1"}`);
}
