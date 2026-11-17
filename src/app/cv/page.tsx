import type { Metadata } from "next";
import Link from "next/link";
import { PrintButton } from "@/components/site/PrintButton";
import { SubPage } from "@/components/site/SubPage";
import { caseHref } from "@/components/site/links";
import {
  articles,
  certifications,
  education,
  flagships,
  honors,
  involvement,
  links,
  milestones,
  presentations,
  statusLabel,
  techniques,
} from "@/content/profile";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "CV",
  description: "Curriculum vitae of Shravani BS Bollapragada, undergraduate researcher in the life sciences.",
  alternates: { canonical: "/cv" },
  openGraph: { title: "CV · Shravani BS Bollapragada", url: "/cv", siteName: "Shravani BS Bollapragada", type: "profile" },
};

const host = siteUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");
const gh = links.github.replace(/^https?:\/\//, "");
const li = "linkedin.com/in/shravani-bs-bollapragada";

function Sec({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section className="cv-sec" aria-labelledby={id}>
      <h2 id={id} className="cv-h">
        {title}
      </h2>
      <div className="cv-body">{children}</div>
    </section>
  );
}

/**
 * The CV, built from the same content file as the rest of the site so the two never disagree.
 * Reads as a page on screen and prints to a clean, single-column A4 document.
 */
export default function CV() {
  return (
    <SubPage
      className="cv-page"
      nav={
        <>
          <Link href="/#work">Research</Link>
          <a href={links.resume} download>
            Original PDF
          </a>
          <PrintButton />
        </>
      }
    >
      <article className="cv">
        <header className="cv-top">
          <h1 className="cv-name disp">Shravani BS Bollapragada</h1>
          <p className="cv-role">Undergraduate researcher, life sciences · B.Sc. Biochemistry, Genetics and Biotechnology</p>
          <p className="cv-contact">
            <a href={`mailto:${links.email}`}>{links.email}</a>
            <span aria-hidden="true"> · </span>
            <a href={links.orcid}>ORCID {links.orcid.replace("https://orcid.org/", "")}</a>
            <span aria-hidden="true"> · </span>
            <a href={links.github}>{gh}</a>
            <span aria-hidden="true"> · </span>
            <a href={links.linkedin}>{li}</a>
            <span aria-hidden="true"> · </span>
            <a href={siteUrl}>{host}</a>
          </p>
        </header>

        <Sec id="cv-edu" title="Education">
          {education.map((e) => (
            <div key={e.degree} className="cv-item">
              <div className="cv-row">
                <h3>{e.degree}</h3>
                <span className="cv-when">{e.years.replace(" to ", " – ")}</span>
              </div>
              <p className="cv-sub">{e.school}</p>
              <p className="cv-note">{e.notes.join(" · ")}</p>
            </div>
          ))}
        </Sec>

        <Sec id="cv-exp" title="Research experience">
          {milestones.map((m) => (
            <div key={m.title + m.when} className="cv-item">
              <div className="cv-row">
                <h3>{m.title}</h3>
                <span className="cv-when">{m.when}</span>
              </div>
              <p className="cv-sub">{m.org}</p>
              <ul className="cv-list">
                {m.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </Sec>

        <Sec id="cv-proj" title="Research projects">
          {flagships.map((p) => (
            <div key={p.slug} className="cv-item">
              <div className="cv-row">
                <h3>
                  <Link href={caseHref(p.slug)}>{p.name}</Link>
                </h3>
                <span className="cv-when">
                  {p.year} · {statusLabel[p.status]}
                </span>
              </div>
              <p className="cv-sub">{p.context}</p>
              <p className="cv-note">{p.tagline}</p>
            </div>
          ))}
        </Sec>

        <Sec id="cv-pres" title="Presentations & posters">
          {presentations.map((p) => (
            <div key={p.title} className="cv-item">
              <div className="cv-row">
                <h3>
                  {p.title}
                  {p.note ? <span className="cv-badge">{p.note}</span> : null}
                </h3>
                <span className="cv-when">{p.year}</span>
              </div>
              <p className="cv-sub">
                {p.kind} · {p.venue}
              </p>
            </div>
          ))}
        </Sec>

        <Sec id="cv-hon" title="Honors">
          {honors.map((h) => (
            <div key={h.title} className="cv-item">
              <div className="cv-row">
                <h3>{h.title}</h3>
                <span className="cv-when">{h.year}</span>
              </div>
              <p className="cv-sub">{h.org}</p>
            </div>
          ))}
        </Sec>

        <Sec id="cv-tech" title="Techniques">
          <dl className="cv-tech">
            {techniques.map((t) => (
              <div key={t.name}>
                <dt>{t.name}</dt>
                <dd>{t.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </Sec>

        <Sec id="cv-cert" title="Courses & certifications">
          {certifications.map((c) => (
            <div key={c.name + c.date} className="cv-item is-tight">
              <div className="cv-row">
                <h3>{c.name}</h3>
                <span className="cv-when">{c.date || "—"}</span>
              </div>
              <p className="cv-sub">
                {c.issuer}
                {c.note ? ` · ${c.note}` : ""}
              </p>
            </div>
          ))}
        </Sec>

        <Sec id="cv-mem" title="Memberships & outreach">
          {involvement.map((v) => (
            <div key={v.event} className="cv-item is-tight">
              <div className="cv-row">
                <h3>{v.event}</h3>
                <span className="cv-when">{v.result}</span>
              </div>
              <p className="cv-sub">{v.project}</p>
            </div>
          ))}
        </Sec>

        <Sec id="cv-wr" title="Science writing">
          <ol className="cv-writing">
            {articles.map((a) => (
              <li key={a.href}>
                <a href={a.href}>{a.title}</a>
                {a.coauthor ? <span className="cv-sub"> ({a.coauthor})</span> : null}
              </li>
            ))}
          </ol>
        </Sec>
      </article>
    </SubPage>
  );
}
