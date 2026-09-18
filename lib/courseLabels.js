import { entryLabel } from "./courses";

const springBootDayTitles = {
  "day-1": "JDBC & Persistence Fundamentals",
  "day-2": "ORM, JPA & Hibernate",
  "day-3": "Spring Framework & Spring Boot",
  "day-4": "Spring MVC & REST APIs",
  "day-5": "Spring Data JPA",
  "day-6": "Production-Style Application Basics",
  "day-7": "Microservices Fundamentals",
  "day-8": "Eureka, Discovery & Load Balancing",
  "day-9": "API Gateway & Resilience",
  "day-10": "Production Readiness & Revision",
};

export function displayEntryLabel(course, slug) {
  if (course?.id === "spring-boot" && springBootDayTitles[slug]) {
    return springBootDayTitles[slug];
  }
  return entryLabel(course, slug);
}
