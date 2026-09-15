import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  title: "Nexora — High-Velocity Notes & Rapid Revision",
  description:
    "Master core Computer Science, AI, Systems, and FAANG interview drills. Visual mental models first, exact math and code after.",
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
