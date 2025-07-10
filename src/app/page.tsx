import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Features from "@/components/Features";
import Comments from "@/components/Comments";
import StudentResults from "@/components/StudentResults";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <Comments />
      <StudentResults />
    </>
  );
}
