import { Approach } from "@/components/site/Approach";
import { Contact } from "@/components/site/Contact";
import { Featured } from "@/components/site/Featured";
import { FigureStrip } from "@/components/site/FigureStrip";
import { Hero } from "@/components/site/Hero";
import { Methods } from "@/components/site/Methods";
import { Record } from "@/components/site/Record";
import { Research } from "@/components/site/Research";
import { Reveal } from "@/components/site/Reveal";
import { SectionRail } from "@/components/site/SectionRail";
import { Stats } from "@/components/site/Stats";
import { TopNav } from "@/components/site/TopNav";
import { SLIDE } from "@/components/site/transitions";
import { ViewTransition } from "react";

export default function Home() {
  return (
    <ViewTransition enter={SLIDE} exit={SLIDE} default="none">
    <div className="site">
      <a className="pill skip" href="#work">
        Skip to selected research
      </a>
      <TopNav />
      <main id="main">
        <Hero />
        <Approach />
        <Stats />
        <Featured />
        <FigureStrip />
        <Research />
        <Methods />
        <Record />
        <Contact />
      </main>
      <SectionRail />
      <Reveal />
    </div>
    </ViewTransition>
  );
}
