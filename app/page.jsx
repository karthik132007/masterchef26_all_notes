import Navbar from "../components/Navbar";
import Hero from "../components/landing/Hero";
import InterviewSpotlight from "../components/landing/InterviewSpotlight";
import RoadmapBanner from "../components/landing/RoadmapBanner";
import TrackGrid from "../components/landing/TrackGrid";
import RevisionBlueprint from "../components/landing/RevisionBlueprint";
import SiteFooter from "../components/landing/SiteFooter";

export const metadata = {
  title: "Riviso — Learn Fast, Revise Faster",
  description:
    "The fastest way to learn, connect the dots, and revise core computer science & AI. Visual mental models first, exact math and runnable code after — plus battle-tested FAANG & AI interview drills.",
};

export default function Home() {
  return (
    <>
      <Navbar />

      <Hero />

      <main className="wrap">
        <InterviewSpotlight />
        <RoadmapBanner />
        <TrackGrid />
        <RevisionBlueprint />
      </main>

      <SiteFooter />
    </>
  );
}
