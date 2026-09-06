import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  title: "masterchef26 — class notes that actually make sense",
  description:
    "Shared class notes for masterchef26: GenAI & Agentic AI and Spring Boot. Written by students, for students.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
