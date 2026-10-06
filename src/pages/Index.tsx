import Layout from "@/components/Layout";
import PitchHero from "@/components/sections/PitchHero";
import PitchIntro from "@/components/sections/PitchIntro";
import PitchContent from "@/components/sections/PitchContent";
import PitchCTA from "@/components/sections/PitchCTA";
import { useEffect } from "react";
import { useLieu } from "@/hooks/useLieu";
import { applySeo, getSeo } from "@/seo/meta";

export default function Index() {
  const lieu = useLieu();

  // Title, description, canonical and structured data for this city
  useEffect(() => {
    applySeo(getSeo(lieu));
  }, [lieu]);

  return (
    <Layout>
      <PitchHero />
      <PitchIntro />
      <PitchContent />
      <PitchCTA />
    </Layout>
  );
}
