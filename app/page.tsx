import { Hero } from "@/components/sections/Hero";
import { FeaturedWorks } from "@/components/sections/FeaturedWorks";
import { AboutPreview } from "@/components/sections/AboutPreview";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedWorks />
      <AboutPreview />
    </>
  );
}
