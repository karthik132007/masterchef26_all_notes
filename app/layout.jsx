import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  title: "Nexora — Field Notes for Sharper Minds",
  description:
    "High-quality, student-made notes for computer science & AI. Learn faster. Revise smarter. Be interview-ready.",
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
