import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/site/Legal";
import { links } from "@/content/profile";

export const metadata: Metadata = {
  title: "Terms of use",
  description: "Who owns the content on this site, how you may use it, and what the research on it is (and isn't).",
  alternates: { canonical: "/terms" },
  openGraph: { title: "Terms of use · Shravani BS Bollapragada", url: "/terms", siteName: "Shravani BS Bollapragada", type: "website" },
};

export default function Terms() {
  const mail = <a href={`mailto:${links.email}`}>{links.email}</a>;
  return (
    <LegalPage
      kicker="Terms of use"
      title="Terms."
      lead={<p>The short version: read, share links, quote with credit. Ask before reusing figures or the resume. Nothing here is medical advice.</p>}
    >
      <LegalSection id="about" title="About these terms">
        <p>
          These terms cover your use of this website, the personal portfolio of Shravani BS Bollapragada. By using the
          site you agree to them. If you don&apos;t, please don&apos;t use the site.
        </p>
      </LegalSection>

      <LegalSection id="ownership" title="Who owns what">
        <p>
          <strong>Personal content, all rights reserved.</strong> The text, the resume PDF, the research figures and
          plots, the molecular dynamics clips and the share image are © 2026 Shravani BS Bollapragada, unless a
          source says otherwise.
        </p>
        <p>
          <strong>Code, open source.</strong> The site&apos;s source code is released under the MIT License (see the{" "}
          <code>LICENSE</code> file in its repository). That licence covers the code only, not the personal content
          above.
        </p>
      </LegalSection>

      <LegalSection id="use" title="What you may do">
        <ul>
          <li>Read the site, link to it and share it.</li>
          <li>Quote short passages with credit to Shravani BS Bollapragada and a link to this site.</li>
          <li>Download the resume to consider her for a position, program or collaboration.</li>
        </ul>
        <p>
          Please ask first (email {mail}) before republishing figures, clips, the resume or substantial parts of the
          text, or using them in your own work. Don&apos;t present this content as your own, and don&apos;t use it to
          train or fine-tune machine-learning models.
        </p>
      </LegalSection>

      <LegalSection id="research" title="About the research shown">
        <p>
          The projects on this site are <strong>undergraduate and internship research</strong>. Unless a page says
          otherwise, they have not been peer reviewed, and several are explicitly exploratory or ongoing; each case
          study states its own limitations.
        </p>
        <p>
          <strong>Nothing on this site is medical advice</strong>, a diagnosis, or a recommendation about any
          treatment or drug. Compounds, genes and biomarkers discussed here are computational or statistical
          findings, not tested therapies. For health questions, talk to a qualified clinician.
        </p>
      </LegalSection>

      <LegalSection id="names" title="Names of institutions">
        <p>
          Universities, companies, programs and journals (for example Stanford University School of Medicine, JAIN
          (Deemed-to-be University), Prescience Insilico, Gnanalytica, BioTechTrek, IIT Kharagpur and AACR) are named
          only to describe her education, training and experience accurately. Their names and marks belong to them.
          Naming them does not mean they endorse this site or its content.
        </p>
      </LegalSection>

      <LegalSection id="links" title="Links to other sites">
        <p>
          Links to GitHub, LinkedIn and other sites are provided for convenience. Those sites are not controlled from
          here, and their own terms and policies apply.
        </p>
      </LegalSection>

      <LegalSection id="warranty" title="No warranty">
        <p>
          The site is provided &ldquo;as is&rdquo;. Care has gone into making it accurate, but it may contain errors
          or become out of date, and it may be unavailable at times. To the extent the law allows, there is no
          liability for loss arising from using the site or relying on its content. Nothing here limits any right you
          have that the law does not allow to be limited.
        </p>
      </LegalSection>

      <LegalSection id="credits" title="Credits and licences">
        <ul>
          <li>
            Typefaces: <strong>Mona Sans</strong> (GitHub) and <strong>Geist</strong> (Vercel), both under the SIL Open
            Font License 1.1, self-hosted.
          </li>
          <li>Built with Next.js, React, Tailwind CSS and Motion, all under the MIT License.</li>
          <li>
            Expression data from NCBI Gene Expression Omnibus (GEO) series GSE50760, GSE42568, GSE100833, GSE157103 and
            GSE165278, credited to their original submitters.
          </li>
          <li>Protein structures 6WXN, 1M17 and 1N8Z from the RCSB Protein Data Bank.</li>
        </ul>
      </LegalSection>

      <LegalSection id="changes" title="Changes and contact">
        <p>
          These terms may be updated; the date at the top shows the latest version. Questions, permission requests or
          takedown requests: {mail}.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
