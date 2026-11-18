/**
 * Every fact on the site lives here and comes from one of:
 * SHRAVANI_RESUME_Nov_26.pdf, a README or notebook in github.com/shravanisci, her LinkedIn profile
 * (experience, projects, certifications, articles), or a direct answer from Shravani.
 * Do not add metrics or claims that cannot be traced to one of those.
 */

export const links = {
  email: "shravanibsbollapragada@gmail.com",
  github: "https://github.com/shravanisci",
  linkedin: "https://www.linkedin.com/in/shravani-bs-bollapragada-09a2b930b/",
  orcid: "https://orcid.org/0009-0007-8981-7410",
  resume: "/SHRAVANI_RESUME_Nov_26.pdf",
};

export type Status = "shipped" | "progress";

export const statusLabel: Record<Status, string> = {
  shipped: "Completed",
  progress: "Ongoing",
};

/* ------------------------------------------------------------------ */
/* Hero claims: each underlined phrase opens the evidence behind it    */
/* ------------------------------------------------------------------ */

export type Claim = {
  id: string;
  text: string;
  status: Status;
  evidence: string;
  source?: { label: string; href: string };
  /** The Selected work case study this claim is proven by. Claims without one point to `href`. */
  project?: string;
  /** Where the claim links when it has no case study. */
  href?: string;
};

export const heroClaims: Claim[] = [
  {
    id: "metastasis",
    text: "how colorectal cancer adapts to the liver",
    status: "shipped",
    evidence:
      "640 genes differentially expressed between primary tumours and liver metastases in GSE50760 (429 up, 211 down). ORA and GSEA both point to metabolic rewiring, extracellular remodelling and complement and coagulation signalling.",
    source: { label: "shravanisci/Colon-Cancer-Metastasis-Analysis", href: "https://github.com/shravanisci/Colon-Cancer-Metastasis-Analysis" },
    project: "crc-liver-metastasis",
  },
  {
    id: "biomarkers",
    text: "which genes can diagnose breast cancer",
    status: "shipped",
    evidence:
      "From 54,675 probes in the GSE42568 cohort down to nine genes (eight present on the validation array), combining differential expression, pathway enrichment and STRING network hubs. ROC AUC 0.9898 under 5-fold CV in discovery, and 0.9438 (95% CI 0.894–0.984) when the frozen model is scored on an independent cohort, GSE15852, it never saw during selection.",
    source: { label: "shravanisci/GSE42568-Breast-Cancer-Transcriptomics_Analysis", href: "https://github.com/shravanisci/GSE42568-Breast-Cancer-Transcriptomics_Analysis" },
    project: "breast-cancer-biomarkers",
  },
  {
    id: "egfr",
    text: "how drugs can be designed around resistance mutations",
    status: "shipped",
    evidence:
      "A docking and molecular dynamics study against EGFR carrying L858R, T790M and C797S, the triple mutant that defeats existing lung cancer drugs. Four compounds outscored the reference inhibitors; MOL_9 held the most stable complex at about -365 kJ/mol.",
    source: { label: "Prescience Insilico internship", href: "https://www.linkedin.com/in/shravani-bs-bollapragada-09a2b930b/details/projects/" },
    project: "egfr-nsclc",
  },
  {
    id: "dissertation",
    text: "writing my undergraduate dissertation",
    status: "progress",
    evidence:
      "My Stanford fellowship on molecular imaging ended in August 2026. Since then, my main focus has been my undergraduate dissertation at JAIN University.",
    href: "#about",
  },
];

/** The hero claim a case study proves, if any. */
export const claimFor = (slug: string) => heroClaims.find((c) => c.project === slug);

/** Where a claim links: its case study, or its own anchor. */
export const claimHref = (c: Claim) => (c.project ? `/research/${c.project}` : (c.href ?? "#about"));

/* ------------------------------------------------------------------ */
/* Flagship projects                                                   */
/* ------------------------------------------------------------------ */

export type Stage = { name: string; detail: string };

export type Figure = {
  src: string;
  alt: string;
  /** Short name for the figure's tab. */
  label: string;
  caption: string;
  width: number;
  height: number;
  /** Figures exported on a dark background sit on a dark plate instead of the white default. */
  plate?: "dark";
  /** A clip instead of a still: the path stem for <stem>.webm, <stem>.mp4 and <stem>-poster.jpg. */
  video?: string;
};

export type Project = {
  slug: string;
  name: string;
  /** Short title for the research index row. */
  short: string;
  /** Field shown in the index row. */
  field: string;
  year: string;
  tagline: string;
  context: string;
  status: Status;
  problem: string;
  approach: string;
  outcome: string;
  pipeline: Stage[];
  /** Optional breakdown of what the project covers, shown as a compact list. */
  coverage?: { family: string; items: string }[];
  /** Key figures, each one already stated in the text above; shown as one data line. */
  facts?: { label: string; value: string }[];
  /** Short code-like token groups worth showing verbatim (for example mutations or datasets). */
  tokens?: { label: string; items: string[] }[];
  /** Where an in-progress project stands, step by step, restated from its outcome. */
  progress?: { step: string; state: "done" | "works" | "not yet" | "next" }[];
  /** Plots from the analysis itself, served from public/figures. When present they take the artifact slot. */
  figures?: Figure[];
  stack: string[];
  links: { label: string; href: string }[];
};

export const flagships: Project[] = [
  {
    slug: "breast-cancer-biomarkers",
    name: "Identification of potential biomarkers in breast cancer",
    short: "Breast cancer biomarkers",
    field: "Transcriptomics & ML",
    year: "2026",
    tagline: "Narrowing 54,675 microarray probes to an eight-gene panel that holds up in a second, independent cohort.",
    context: "Capstone, BioTechTrek cancer transcriptomics internship · 2026",
    status: "shipped",
    problem:
      "Which genes are most strongly and reliably dysregulated in breast tumours compared with normal breast tissue, and can a small panel of them tell the two apart accurately? A genome-wide array measures tens of thousands of probes at once, and most of what changes is noise or a side effect of something else. And a panel that only works on the cohort it was chosen from isn't a biomarker, it's an overfit.",
    approach:
      "An end-to-end pipeline in one notebook, Python with R/Bioconductor through rpy2. GEOparse pulls GSE42568 from GEO: 121 samples (104 tumour, 17 normal) on an Affymetrix U133 Plus 2.0 array. After QC by boxplot, PCA and Ward clustering, limma fits a Tumor − Normal contrast with empirical Bayes moderation and Benjamini-Hochberg correction at FDR < 0.05 and |log2FC| > 1. Probes map to gene symbols with mygene, then Enrichr runs over-representation against GO-BP and KEGG while GSEApy runs preranked GSEA (1,000 permutations) against KEGG 2021 and MSigDB Hallmark. The top 100 up- and down-regulated genes go to the STRING API, and NetworkX ranks hub genes by degree centrality. Candidates have to clear all three filters at once: a top-10 network hub, strong differential expression, and membership in an enriched pathway. A Random Forest then tests the panel under stratified 5-fold cross-validation, with scaling fitted inside each fold. For independent validation, GSE15852 — a different platform (GPL96 vs the discovery cohort's GPL570), 43 patients with matched tumour/normal pairs — is pulled fresh from GEO and reprocessed end to end: its own limma fit, its own GPL96 annotation. The eight of nine panel genes present on GPL96 (AQP7 isn't on that array) are scored with a logistic regression frozen on the full discovery set, never refit on validation data, and the classification threshold is fixed from the discovery ROC (Youden's J) before validation labels are touched.",
    outcome:
      "6,471 probes were differentially expressed: 3,386 up and 3,085 down. The direction fits the tissue, with epithelial genes up (EPCAM, DSP, KRT18) and adipocyte genes down (LEP, FABP4, PLIN1). Enrichment splits the same way: proliferation up (E2F targets NES +2.37, G2-M checkpoint +2.24) and metabolism down (adipogenesis NES −2.51, fatty acid metabolism −2.17, PPAR signalling −2.18). The nine-gene panel (EPCAM, CDH1, TOP2A, EZH2 up; PCK1, GPD1, AQP7, ACADL, APOB down) reached ROC AUC 0.9898 with 93.4% accuracy and perfect specificity under 5-fold CV, and EZH2 was the most informative feature — but the genes were chosen using all 121 samples before cross-validation, so that AUC was optimistic, and normal breast being mostly fat meant the down-regulated metabolic genes could partly reflect adipocyte content rather than tumour biology. On GSE15852, a cohort the genes were never near during selection, the frozen eight-gene logistic model scored AUC 0.9438 (95% CI 0.894–0.984, patient-pair bootstrap), with sensitivity 100% and specificity 69.8% at the discovery-derived threshold (accuracy 84.9%, F1 0.869). Seven of the eight genes replicated their paired tumour-vs-normal direction after FDR correction; only APOB didn't (p = 0.294), consistent with it being the weakest feature in the original panel. EPCAM alone almost matches the full model on its own (AUC 0.913 vs 0.944, difference not significant by paired DeLong, p = 0.201) — the combination adds robustness more than raw discriminative power. The honest read: this is a real, reproducible transcriptional signal that crosses platforms and cohorts, not a nine-gene miracle panel. Prospective or clinical-grade validation is the step after this.",
    pipeline: [
      { name: "Data", detail: "GSE42568 via GEOparse: 121 samples, 104 tumour and 17 normal, on 54,675 probes." },
      { name: "QC", detail: "Per-sample boxplots, PCA on z-scored expression, and Ward hierarchical clustering." },
      { name: "DEGs", detail: "limma through rpy2: lmFit, contrasts.fit, eBayes, FDR < 0.05 and |log2FC| > 1." },
      { name: "Enrich", detail: "Enrichr over-representation on GO-BP and KEGG, plus preranked GSEA on KEGG and Hallmark." },
      { name: "Network", detail: "STRING interactions for the top 200 DEGs, with hubs ranked by degree centrality in NetworkX." },
      { name: "Shortlist", detail: "Hub gene and strong differential expression and enriched pathway: nine genes." },
      { name: "Discovery CV", detail: "Random Forest under stratified 5-fold cross-validation, scored by pooled out-of-fold ROC." },
      { name: "Independent validation", detail: "GSE15852 (GPL96, 43 matched tumour/normal pairs) reprocessed end to end; frozen discovery model, no refitting." },
    ],
    facts: [
      { label: "differentially expressed probes", value: "6,471" },
      { label: "discovery ROC AUC", value: "0.9898" },
      { label: "validation ROC AUC", value: "0.9438" },
      { label: "validation sensitivity", value: "1.00" },
    ],
    tokens: [
      { label: "Up in tumour", items: ["EPCAM", "CDH1", "TOP2A", "EZH2"] },
      { label: "Down in tumour", items: ["PCK1", "GPD1", "AQP7", "ACADL", "APOB"] },
    ],
    progress: [
      { step: "Differential expression, enrichment and PPI network", state: "done" },
      { step: "Nine-gene panel, ROC AUC 0.9898 under 5-fold CV", state: "done" },
      { step: "Independent validation on GSE15852: AUC 0.9438, 95% CI 0.894–0.984", state: "done" },
      { step: "Prospective or clinical-grade validation", state: "next" },
    ],
    figures: [
      {
        src: "/figures/breast/04_volcano_plot.png",
        alt: "Volcano plot of log2 fold change against significance for every probe, with up- and down-regulated probes highlighted.",
        label: "Volcano",
        caption: "Volcano plot: 6,471 probes pass FDR < 0.05 and |log2FC| > 1, split 3,386 up and 3,085 down.",
        width: 987,
        height: 790,
      },
      {
        src: "/figures/breast/10_roc_curve.png",
        alt: "ROC curve for the nine-gene Random Forest classifier, rising almost immediately to a true positive rate near 1, with AUC 0.9898.",
        label: "ROC",
        caption: "Pooled out-of-fold ROC for the nine-gene panel under stratified 5-fold cross-validation.",
        width: 702,
        height: 624,
      },
      {
        src: "/figures/breast/12_heatmap_candidate_biomarkers.png",
        alt: "Clustered heatmap of the nine candidate biomarkers across all samples, with tumour and normal samples forming separate blocks.",
        label: "Panel heatmap",
        caption: "The nine candidates across all 121 samples: tumour and normal separate into two blocks.",
        width: 1264,
        height: 1025,
      },
      {
        src: "/figures/breast/11_feature_importance.png",
        alt: "Bar chart of mean Random Forest feature importance, with EZH2 highest, then PCK1 and GPD1.",
        label: "Feature importance",
        caption: "Mean Random Forest importance over the five folds: EZH2 carries the most signal.",
        width: 1189,
        height: 690,
      },
      {
        src: "/figures/breast/08_ppi_upregulated_lcc.png",
        alt: "Protein-protein interaction network of the up-regulated genes, largest connected component, with hub genes at the centre.",
        label: "PPI network",
        caption: "STRING interactions among the up-regulated genes; hubs are ranked by degree centrality.",
        width: 1189,
        height: 989,
      },
      {
        src: "/figures/breast/13_validation_roc_curve.png",
        alt: "ROC curve for the frozen eight-gene logistic regression model scored on the independent GSE15852 cohort, AUC 0.9438 with 95% confidence interval 0.8940 to 0.9838.",
        label: "Validation ROC",
        caption: "The discovery-trained eight-gene model scored on GSE15852, a cohort it never saw during selection: AUC 0.9438.",
        width: 2364,
        height: 2064,
      },
      {
        src: "/figures/breast/14_validation_individual_gene_roc.png",
        alt: "ROC curves for each of the eight panel genes individually in the GSE15852 validation cohort, with EPCAM highest at AUC 0.913 and APOB lowest at AUC 0.582.",
        label: "Per-gene validation ROC",
        caption: "Per-gene validation AUCs: EPCAM carries most of the signal (0.913); APOB is the weak link (0.582).",
        width: 2670,
        height: 2066,
      },
    ],
    stack: ["Transcriptomics", "Microarray analysis", "Differential expression", "ORA", "GSEA", "PPI networks", "Random Forest", "Logistic regression", "Cross-validation", "Independent cohort validation", "ROC analysis", "Bootstrap CIs", "Python", "rpy2", "R", "Bioconductor", "limma", "GSEApy", "NetworkX", "STRING"],
    links: [
      { label: "Discovery notebook and figures", href: "https://github.com/shravanisci/GSE42568-Breast-Cancer-Transcriptomics_Analysis" },
    ],
  },
  {
    slug: "crc-liver-metastasis",
    name: "Transcriptomic reprogramming in colorectal cancer liver metastasis",
    short: "Colorectal cancer liver metastasis",
    field: "Transcriptomics",
    year: "2026",
    tagline: "How colorectal cancer cells change their gene expression to survive and grow in the liver.",
    context: "Independent research · 2026",
    status: "shipped",
    problem:
      "Nearly half of colorectal cancer patients develop liver metastases, and metastasis drives most of the deaths. Reaching the liver is only the first step: to survive there, a cancer cell has to adapt to a completely different tissue. Which transcriptional programs change when it does?",
    approach:
      "I compared primary colorectal tumours with liver metastases from GEO dataset GSE50760, using R and Bioconductor through Python. I ran differential expression with limma-voom, checked sample structure with PCA, a volcano plot and a clustered heatmap, then tested what the genes do with over-representation analysis (g:Profiler) and preranked GSEA (GSEApy) against GO and KEGG.",
    outcome:
      "PCA separated primary and metastatic samples clearly. 640 genes were significantly dysregulated, 429 up and 211 down. ORA and GSEA independently pointed to metabolic rewiring (fatty acid, glycolysis, drug and xenobiotic metabolism, PPAR signalling), extracellular remodelling, and complement and coagulation cascades. Metastasis looks like adaptation as much as migration. The input was FPKM-normalised data, not raw counts, so these results are exploratory and generate hypotheses.",
    pipeline: [
      { name: "Data", detail: "GSE50760: primary colorectal tumours and their liver metastases, 23,509 genes." },
      { name: "Model", detail: "limma-voom: voom transformation, linear model, empirical Bayes moderation." },
      { name: "DEGs", detail: "640 significant genes, 429 up and 211 down." },
      { name: "Visualise", detail: "PCA, volcano plot and a clustered heatmap of the top genes." },
      { name: "ORA", detail: "g:Profiler over-representation across GO and KEGG." },
      { name: "GSEA", detail: "Preranked GSEA on the full gene list, compared with ORA." },
    ],
    facts: [
      { label: "differentially expressed genes", value: "640" },
      { label: "up", value: "429" },
      { label: "down", value: "211" },
    ],
    figures: [
      {
        src: "/figures/crc/volcanoplot_gse50760.png",
        alt: "Volcano plot of log fold change against significance for every gene, liver metastasis versus primary tumour, with significant genes highlighted.",
        label: "Volcano",
        caption: "Volcano plot: genes that changed between primary tumours and liver metastases.",
        width: 833,
        height: 701,
      },
      {
        src: "/figures/crc/pcaplot_gse50760.png",
        alt: "PCA plot in which primary colorectal tumours and liver metastases form separate clusters.",
        label: "PCA",
        caption: "PCA: primary and metastatic samples separate into distinct transcriptomic states.",
        width: 974,
        height: 790,
      },
      {
        src: "/figures/crc/clustered_heatmap_gse50760.png",
        alt: "Clustered heatmap of the top differentially expressed genes across all samples.",
        label: "Heatmap",
        caption: "Heatmap: hierarchical clustering of the top differentially expressed genes.",
        width: 989,
        height: 1025,
      },
      {
        src: "/figures/crc/ora_vs_gsea.png",
        alt: "Comparison of the top KEGG pathways found by over-representation analysis and by GSEA.",
        label: "ORA vs GSEA",
        caption: "ORA vs GSEA: two methods, overlapping pathway themes.",
        width: 1163,
        height: 790,
      },
    ],
    stack: ["RNA-seq analysis", "Differential expression", "PCA", "ORA", "GSEA", "R", "Bioconductor", "limma", "Python", "pandas", "Jupyter Notebook"],
    links: [{ label: "Notebook and figures", href: "https://github.com/shravanisci/Colon-Cancer-Metastasis-Analysis" }],
  },
  {
    slug: "egfr-nsclc",
    name: "Computational design of selective EGFR inhibitors",
    short: "Selective EGFR inhibitors",
    field: "Structural biology",
    year: "2025",
    tagline: "A comparative docking and molecular dynamics study against the EGFR triple mutant that makes lung cancer drug-resistant.",
    context: "Prescience Insilico, Bengaluru · 2025",
    status: "shipped",
    problem:
      "EGFR-mutant non-small cell lung cancer responds to targeted inhibitors, then stops: resistance typically returns within 9 to 14 months, driven by T790M and C797S. Osimertinib handles T790M but is defeated by C797S, and compound mutants such as L858R/T790M/C797S leave few options. Could a screen find compounds that still bind the triple mutant selectively, without also hitting the wild-type receptor or the related HER2 kinase?",
    approach:
      "I worked inside the PRinS3 platform. With BioIn I prepared three targets: 6WXN (chain A), which already carries T790M and C797S, where I induced L858R to model the triple mutant; 1M17, wild-type EGFR, where I added L858R; and 1N8Z (chain C), the HER2 kinase domain, as an off-target control. All three were stripped of water and heteroatoms, with loops refined and missing residues completed. For ligands I started from five known inhibitors (BLU-945, EAI045, JBJ-04-125-02, osimertinib and erlotinib). ChemIn ran a SMILES similarity search above 70% and returned 91 related compounds, which I filtered to 22 at an IC50 under 5 nM; SyMoG generated 39 new molecules from the same inputs, shortlisted to 25 by Lipinski's rule of five. X-ESS docked both sets against all three targets, with binding pockets confirmed against literature residues, PrankWeb predictions and SwissDock grid runs. Four complexes then went to molecular dynamics on the triple mutant: a TIP3P water model in a triclinic box at pH 7.4, energy minimisation, then NVT and NPT equilibration, over a 3.0 ns run.",
    outcome:
      "Four compounds bound the triple mutant better than the reference drugs. From the database set, CHEMBL4747958 and CHEMBL5191510 outscored gefitinib and osimertinib; from the generated set, Mol_4 and Mol_9 outscored osimertinib and JBJ-125. Binding was consistently strongest against 6WXN, which supports it as the key resistance model. In simulation, MOL_9 had the lowest MM-PBSA energy at about -365 kJ/mol and formed five hydrogen bonds with ASP, GLN and MET residues, against fewer for gefitinib. Every ligand equilibrated with an average RMSD below 0.27 nm, and MOL_9 held the most consistent conformation. That makes MOL_9 the primary lead and CHEMBL510 the secondary, with Mol_4 an exploratory hit. Next would be ADMET profiling, QSAR modelling and in vitro testing in NSCLC models.",
    pipeline: [
      { name: "Targets", detail: "6WXN as the triple mutant, 1M17 as wild-type EGFR, 1N8Z (HER2) as an off-target control." },
      { name: "Prepare", detail: "BioIn: heteroatoms removed, loops refined, missing residues completed, L858R induced." },
      { name: "Ligands", detail: "ChemIn similarity search (91 hits, 22 kept at IC50 < 5 nM) and 39 SyMoG-generated molecules (25 kept)." },
      { name: "Dock", detail: "X-ESS across all three targets, with pockets validated against literature, PrankWeb and SwissDock." },
      { name: "Simulate", detail: "3.0 ns molecular dynamics on the triple mutant: TIP3P, triclinic box, pH 7.4, NVT then NPT." },
      { name: "Leads", detail: "Ranked on MM-PBSA energy, hydrogen bonding and RMSD stability." },
    ],
    facts: [
      { label: "EGFR targets", value: "3" },
      { label: "MOL_9 MM-PBSA", value: "~-365 kJ/mol" },
      { label: "average RMSD", value: "<0.27 nm" },
      { label: "MD run", value: "3.0 ns" },
    ],
    figures: [
      {
        src: "/figures/egfr/docking-known.png",
        alt: "Docking energies in kcal/mol for 22 database-derived ligands against three targets, with the 6WXN triple mutant scoring lowest throughout.",
        label: "Docking: known",
        caption: "Docking energies for 22 database-derived ligands across all three targets. The triple mutant (6WXN) scores lowest throughout.",
        width: 1258,
        height: 493,
        plate: "dark",
      },
      {
        src: "/figures/egfr/docking-generated.png",
        alt: "Docking energies for the AI-generated molecules against three targets, with mol_9 and mol_4 reaching the lowest energies on 6WXN.",
        label: "Docking: generated",
        caption: "Docking energies for the AI-generated molecules. mol_9 and mol_4 bind the triple mutant hardest.",
        width: 1249,
        height: 493,
        plate: "dark",
      },
      {
        src: "/figures/egfr/rmsd-mol9.png",
        alt: "RMSD of the MOL_9 and 6WXN complex over a 3 nanosecond simulation, rising quickly then holding near 0.20 nanometres.",
        label: "RMSD",
        caption: "RMSD of the MOL_9 complex over the 3.0 ns run: it equilibrates quickly, then holds near 0.20 nm.",
        width: 989,
        height: 430,
        plate: "dark",
      },
      {
        src: "/figures/egfr/md-mol9-poster.jpg",
        video: "/figures/egfr/md-mol9",
        alt: "Molecular dynamics clip of the EGFR triple mutant with MOL_9, in green, held in the kinase pocket throughout the run.",
        label: "MD: MOL_9",
        caption: "MOL_9, the primary lead, stays in the pocket across the simulation.",
        width: 640,
        height: 418,
        plate: "dark",
      },
      {
        src: "/figures/egfr/md-chembl510-poster.jpg",
        video: "/figures/egfr/md-chembl510",
        alt: "Molecular dynamics clip of the EGFR triple mutant with CHEMBL510, in red, bound in the kinase pocket.",
        label: "MD: CHEMBL510",
        caption: "CHEMBL510, the secondary lead, in the same pocket.",
        width: 640,
        height: 342,
        plate: "dark",
      },
      {
        src: "/figures/egfr/md-mol4-poster.jpg",
        video: "/figures/egfr/md-mol4",
        alt: "Molecular dynamics clip of the EGFR triple mutant with Mol_4, in yellow, bound in the kinase pocket.",
        label: "MD: Mol_4",
        caption: "Mol_4, the exploratory hit, bound to the triple mutant.",
        width: 640,
        height: 392,
        plate: "dark",
      },
      {
        src: "/figures/egfr/md-control-poster.jpg",
        video: "/figures/egfr/md-control",
        alt: "Molecular dynamics clip of the EGFR triple mutant with the gefitinib control, in pale green, bound in the kinase pocket.",
        label: "MD: control",
        caption: "The gefitinib control, for comparison: it formed fewer hydrogen bonds than MOL_9.",
        width: 640,
        height: 328,
        plate: "dark",
      },
    ],
    stack: ["Structure-based drug design", "Virtual screening", "Molecular docking", "Molecular dynamics", "MM-PBSA", "Protein structure refinement", "PRinS3", "PyMOL", "PrankWeb", "SwissDock"],
    links: [{ label: "Project summary", href: "https://www.linkedin.com/in/shravani-bs-bollapragada-09a2b930b/details/projects/" }],
  },
  {
    slug: "abc-immune-circuit",
    name: "Adaptive Biocomputational Control of immune states",
    short: "Adaptive control of immune states",
    field: "Systems immunology",
    year: "2026",
    tagline: "An exploratory model that reads cytokine signals as inputs to a regulatory-or-effector immune decision.",
    context: "Independent exploratory work · early 2026",
    status: "progress",
    problem:
      "Transcriptomics usually describes immune responses as lists of genes going up or down. That doesn't explain how the immune system decides between calming down (regulatory) and attacking (effector). Can cytokine signals be read as inputs to a decision circuit?",
    approach:
      "I treated cytokines as input signals. For each GEO dataset I resolved TNF, IL6 and IFNG signals from expression data, set percentile thresholds, and applied logic-gated rules for two mutually exclusive circuits, one regulatory and one effector. The regulatory circuit is designed for context-aware IL-10 activation. Each sample is classified into an immune state, and each disease is kept in its own notebook to preserve its biological context.",
    outcome:
      "The framework runs on three distinct immune contexts: inflammatory bowel disease, COVID-19 PBMCs and melanoma under immunotherapy. It is exploratory, meant to test whether the idea is valid rather than to be optimised. Next on the list are logic calibrated with interpretable machine learning, larger cytokine networks, and multi-layer control models.",
    pipeline: [
      { name: "Data", detail: "Expression data for IBD, COVID-19 PBMCs and melanoma under immunotherapy." },
      { name: "Signals", detail: "TNF, IL6 and IFNG signals resolved from the genes for each cytokine and its receptors." },
      { name: "Thresholds", detail: "Percentile cut-offs (25th and 75th) for each signal, per dataset." },
      { name: "Logic", detail: "Logic-gated rules for a regulatory and an effector circuit." },
      { name: "State", detail: "Each sample is classified as regulatory-on or effector-on." },
    ],
    tokens: [
      { label: "Datasets", items: ["GSE100833 · IBD", "GSE157103 · COVID-19 PBMCs", "GSE165278 · Melanoma, immunotherapy"] },
      { label: "Cytokine inputs", items: ["TNF", "IL6", "IFNG", "IL-10 (output)"] },
    ],
    stack: ["Systems immunology", "Transcriptomics", "Python", "pandas", "NumPy", "GEOparse", "Jupyter Notebook"],
    links: [{ label: "Notebooks", href: "https://github.com/shravanisci/ABC-Immune-Circuit" }],
  },
];

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

/** The interests named in her LinkedIn About, plus the resume's research focus. */
export const interests = [
  "Systems biology",
  "Molecular imaging",
  "Transcriptomics",
  "Disease biology",
  "AI-enabled biomedical discovery",
  "Precision medicine and translational genomics",
];

/* ------------------------------------------------------------------ */
/* Presentations, honors, education, techniques                        */
/* ------------------------------------------------------------------ */

export type Presentation = {
  year: string;
  title: string;
  kind: string;
  venue: string;
  note?: string;
  summary?: string;
  /** A photo or export of the poster itself, served from public/posters (portrait, about 3:4). */
  image?: string;
};

export const presentations: Presentation[] = [
  {
    year: "2026",
    title: "Transcriptomic Analysis Reveals Candidate Diagnostic Biomarkers and Metabolic Reprogramming Signatures in Breast Cancer",
    kind: "Capstone project",
    venue: "BioTechTrek Cancer Transcriptomics and Data Analysis Internship",
  },
  {
    year: "2025",
    title: "Computational Design of Selective EGFR Inhibitors: A Comparative Docking & MD Study",
    kind: "Project presentation",
    venue: "Prescience Insilico, Bengaluru",
    summary:
      "Modelling the EGFR triple mutant (L858R/T790M/C797S), screening database and AI-generated ligands against it, and validating the top complexes by molecular dynamics.",
  },
  {
    year: "2025",
    title: "Waste not; want not: innovative floral waste packaging",
    kind: "Research poster",
    venue: "INAC: Industrial & Academic Confab 2025, JAIN (Deemed-to-be University), Bengaluru",
    note: "1st Prize",
    summary:
      "Biodegradable packaging made from temple, market and festival floral waste, with cellulose or chitosan bound by polylactic acid (PLA) for durability and moisture resistance. It's a response to at least a tonne of floral waste a day in India and about 184 million tonnes of plastic packaging waste a year worldwide.",
  },
  {
    year: "2024",
    title: "Zero Hunger Through Genetics",
    kind: "Poster, UN SDG 2",
    venue: "Genetics experiential learning project, JAIN (Deemed-to-be University)",
    summary:
      "How GM crops, CRISPR-based crop improvement, biofortification and AI-driven precision agriculture could support food security, weighed against farmer livelihoods and sustainability.",
  },
];

export const honors: { year: string; title: string; org: string }[] = [
  { year: "2026", title: "Selected Fellow, Summer Mini Fellowship on Molecular Imaging", org: "Stanford University School of Medicine" },
  { year: "2026", title: "Certificate of Appreciation for selection to the Stanford fellowship", org: "School of Sciences, JAIN (Deemed-to-be University)" },
  { year: "2025", title: "1st Prize, Research Poster Competition", org: "INAC: Industrial & Academic Confab 2025, JAIN (Deemed-to-be University) · for “Waste not; want not”" },
  { year: "2024", title: "Third Prize, Poetry Competition", org: "JAIN (Deemed-to-be University)" },
];

export const education: { years: string; degree: string; school: string; notes: string[] }[] = [
  {
    years: "2024 to 2028",
    degree: "B.Sc. Biochemistry, Genetics and Biotechnology",
    school: "JAIN (Deemed-to-be University), School of Sciences, Bengaluru",
    notes: ["Cumulative GPA 9.14 (years 1 and 2)", "Undergraduate dissertation in progress"],
  },
  {
    years: "2022 to 2024",
    degree: "High School Diploma, Science",
    school: "EKYA Schools, ITPL, Bengaluru",
    notes: ["90% aggregate in Biology, Chemistry and Physics"],
  },
];

/** From the resume's skills section, plus the tools named in her projects. */
export const techniques: { name: string; items: string[]; appliedIn?: { label: string; project?: string }[] }[] = [
  { name: "Laboratory", items: ["Gel electrophoresis", "Microscopy", "Basic cell culture", "Microbiology techniques"] },
  {
    name: "Transcriptomics",
    items: ["RNA-seq analysis", "Differential expression (limma-voom)", "Functional enrichment (ORA, GSEA)", "PCA and clustering", "Biomarker evaluation (ROC)"],
    appliedIn: [
      { label: "Colorectal cancer liver metastasis", project: "crc-liver-metastasis" },
      { label: "Breast cancer biomarkers", project: "breast-cancer-biomarkers" },
      { label: "Adaptive control of immune states", project: "abc-immune-circuit" },
    ],
  },
  {
    name: "Structural biology",
    items: ["Protein structure refinement", "In silico mutagenesis", "Molecular docking", "Virtual screening", "Molecular dynamics", "MM-PBSA", "Structure-based drug design"],
    appliedIn: [{ label: "Selective EGFR inhibitors", project: "egfr-nsclc" }],
  },
  { name: "Sequence analysis", items: ["BLAST", "Functional annotation"], appliedIn: [{ label: "Bioinformatics internship, IIT Kharagpur × EdiGlobe" }] },
  { name: "Software", items: ["PyMOL", "GROMACS", "SwissDock", "PRinS3", "Python (pandas, NumPy)", "R and Bioconductor (learning)", "Jupyter"] },
];

/* ------------------------------------------------------------------ */
/* Journey                                                             */
/* ------------------------------------------------------------------ */

export type Milestone = {
  when: string;
  title: string;
  org: string;
  kind: "internship" | "fellowship";
  points: string[];
  sources?: { label: string; href: string }[];
};

export const milestones: Milestone[] = [
  {
    when: "Jun 2026",
    title: "Summer Fellow, Mini Fellowship on Molecular Imaging",
    org: "Stanford University School of Medicine",
    kind: "fellowship",
    points: [
      "Selected for Stanford's Summer 2026 Mini Fellowship on Molecular Imaging, which ran from June to August 2026.",
      "The program covered molecular imaging technologies, cancer imaging, biomedical innovation and AI-driven approaches in healthcare research, through seminars and discussions with researchers and clinicians.",
      "Received a Certificate of Appreciation from the School of Sciences, Jain University, for the selection.",
    ],
  },
  {
    when: "May 2026",
    title: "Bioinformatics & AI Intern",
    org: "Gnanalytica, Eindhoven (hybrid)",
    kind: "internship",
    points: [
      "Contributed to Healthytica, an AI-assisted platform that follows people's health data over time, from May to July 2026.",
      "Helped design workflows for longitudinal health analytics, preventive healthcare and biomarker interpretation, and helped validate how its AI features fit into real clinical workflows.",
    ],
    
  },
  {
    when: "May 2026",
    title: "Cancer Transcriptomics & Data Analysis Intern",
    org: "BioTechTrek",
    kind: "internship",
    points: [
      "Two months of hands-on cancer transcriptomics: RNA-seq analysis, differential expression, functional enrichment, pathway analysis, biomarker identification and data visualisation.",
      "Capstone: “Transcriptomic Analysis Reveals Candidate Diagnostic Biomarkers and Metabolic Reprogramming Signatures in Breast Cancer”.",
    ],
    sources: [{ label: "Read the research", href: "/research/breast-cancer-biomarkers" }],
  },
  {
    when: "Jun 2025",
    title: "AI-Assisted Drug Discovery Intern",
    org: "Prescience Insilico, Bengaluru",
    kind: "internship",
    points: [
      "Trained in structure-based drug discovery: protein–ligand docking, target prioritisation, and AI-assisted decision support for early-stage drug discovery.",
      "Designed computational strategies against drug-resistant mutant EGFR in non-small cell lung cancer, and interpreted docking and scoring results in light of the biochemical mechanism.",
    ],
    sources: [{ label: "Read the research", href: "/research/egfr-nsclc" }],
  },
  {
    when: "Oct 2024",
    title: "Bioinformatics Intern",
    org: "IIT Kharagpur × EdiGlobe",
    kind: "internship",
    points: [
      "Analysed open-access genomic datasets with reproducible bioinformatics workflows.",
      "Used BLAST for sequence similarity and did functional annotation, linking sequence-level results to protein function and pathways.",
    ],
    
  },
];

/** Memberships, service and outreach. */
export const involvement: { event: string; project: string; result?: string; href?: string }[] = [
  { event: "AACR Journals", project: "Student member, reading cancer biology and translational research", result: "Since 2025" },
  { event: "ISMND", project: "Student member" },
  { event: "NEP Saarthi, Jain University", project: "Student liaison for the National Education Policy 2020", result: "Since 2025" },
  { event: "Shabd Forum, Jain University", project: "Photography Co-head of the journaling and media club" },
  { event: "Surgiterns, Girl Up Surgeons", project: "Medical outreach program of the Girl Up UN Foundation", result: "2022" },
];

/** From LinkedIn and the resume, newest first. Courses with no date on either are listed last. */
export const certifications: { name: string; issuer: string; date: string; note?: string; verify?: string }[] = [
  {
    name: "Cancer Transcriptomics and Data Analysis Internship",
    issuer: "BioTechTrek",
    date: "May 2026",
    note: "Credential ID BTT26-CT1-P126",
  },
  { name: "PRinS3 Software Practitioner", issuer: "Prescience Insilico", date: "Jun 2025", note: "Valid until Jun 2028" },
  { name: "Certificate of Internship", issuer: "Prescience Insilico", date: "Jun 2025" },
  { name: "Industrial Biotechnology", issuer: "The University of Manchester", date: "May 2025" },
  { name: "SEEK: Social Emotional Education, Knowledge to Practice", issuer: "UNESCO MGIEP", date: "Mar 2025" },
  { name: "Bioinformatics Training & Internship", issuer: "Kshitij, IIT Kharagpur, with EdiGlobe", date: "Nov 2024" },
  { name: "Surgiterns", issuer: "Girl Up Surgeons", date: "Aug 2022" },
  { name: "Python in Genomic Data Science", issuer: "Johns Hopkins University", date: "" },
];

/** Articles published on LinkedIn, newest first. Two are co-written with Prof. Sairam Bollapragada. */
/** The drawn symbol on each article card's cover. */
export type Glyph = "microscope" | "senescence" | "tumour" | "storm" | "network" | "gut" | "capsule" | "lattice" | "hyphae" | "helix" | "shield";

export const articles: { title: string; href: string; coauthor?: string; glyph: Glyph }[] = [
  {
    title: "Beyond the Image: When microscopy becomes quantitative",
    href: "https://www.linkedin.com/pulse/beyond-image-when-microscopy-becomes-quantitative-bs-bollapragada-i4poe/", glyph: "microscope",
  },
  {
    title: "The Banana Effect: Why We Catch ‘Old Age’ From Our Own Cells",
    href: "https://www.linkedin.com/pulse/banana-effect-why-we-catch-old-age-from-our-own-cells-shravani-lp0yc/", glyph: "senescence",
  },
  {
    title: "Cancer Does Not Outsmart You. It Waits You Out.",
    href: "https://www.linkedin.com/pulse/cancer-does-outsmart-you-waits-out-shravani-bs-bollapragada-oz1gc/", glyph: "tumour",
  },
  { title: "Predicting Bio-Storms", href: "https://www.linkedin.com/pulse/predicting-bio-storms-shravani-bs-bollapragada-vsj8c/", glyph: "storm" },
  {
    title: "Beyond Neurons: Why the Future of AI Looks More Like Metabolism",
    href: "https://www.linkedin.com/pulse/beyond-neurons-why-future-ai-looks-more-like-shravani-bs-bollapragada-ii0tc/", glyph: "network",
  },
  {
    title: "The Gut as the Second Brain: The Microbiome that Cures Depression",
    href: "https://www.linkedin.com/pulse/gut-second-brain-microbiome-cures-depression-shravani-bs-bollapragada-kxdcf/", glyph: "gut",
  },
  {
    title: "From Farm Fires to Pharmacies: How Agricultural Waste Could Fuel the Next Antibiotic Revolution",
    href: "https://www.linkedin.com/pulse/from-farm-fires-pharmacies-how-agricultural-waste-bs-bollapragada-9rpsf/", glyph: "capsule",
  },
  {
    title: "Nanoremediation: The Future of Environmental Cleanup",
    href: "https://www.linkedin.com/pulse/nanoremediation-future-environmental-cleanup-shravani-bs-bollapragada-pyy6f/", glyph: "lattice",
  },
  {
    title: "Plastic Degrading Fungi",
    href: "https://www.linkedin.com/pulse/plastic-degrading-fungi-breakthrough-biotechnology-bs-bollapragada-rr4cf/", glyph: "hyphae",
  },
  {
    title: "Bioinformatics: A Catalyst for Ethical and Efficient Model Organism Research",
    href: "https://www.linkedin.com/pulse/bioinformatics-catalyst-ethical-efficient-model-bs-bollapragada-wlsnf/", glyph: "helix",
    coauthor: "with Prof. Sairam Bollapragada",
  },
  {
    title: "EHR and Bioinformatics: A Cybersecurity Perspective",
    href: "https://www.linkedin.com/pulse/ehr-bioinformatics-cybersecurity-perspective-shravani-bs-bollapragada-zante/", glyph: "shield",
    coauthor: "with Prof. Sairam Bollapragada",
  },
];

/**
 * What I'm working on right now, outside the projects above. Shown as the "Currently" card in
 * Research Approach. Fill in `topic` (one sentence) and `supervisor` once Shravani confirms them;
 * until then the card shows `body` instead of a topic.
 */
export const rightNow: {
  title: string;
  body: string;
  since: string;
  place: string;
  topic?: string;
  supervisor?: string;
  href?: string;
  cta?: string;
} = {
  title: "Writing my undergraduate dissertation",
  body: "The Stanford molecular imaging fellowship wrapped up in August 2026. Since then, most of my time has gone into my undergraduate dissertation at JAIN University.",
  since: "Aug 2026",
  place: "JAIN (Deemed-to-be University)",
};
