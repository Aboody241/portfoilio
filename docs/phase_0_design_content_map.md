# Phase 0 — Design and Content Audit

**Project:** Abdullah Essam — Software Engineering Portfolio  
**Status:** Complete (pending owner confirmation on open decisions & missing assets)  
**Sources inspected:**
- [abdullah_portfolio_roadmap.md](./abdullah_portfolio_roadmap.md)
- [abdullah_software_engineering_portfolio_brief (2).md](./abdullah_software_engineering_portfolio_brief%20(2).md)
- [Abdullah_Essam_CV.pdf](./Abdullah_Essam_CV.pdf)
- [Style.png](./design/Style.png)
- [Component.png](./design/Component.png)
- [Interaction.png](./design/Interaction.png)
- [hero.png](./pages/hero.png)
- [Skills.png](./pages/Skills.png)
- [Works.png](./pages/Works.png)
- [Contact.png](./pages/Contact.png)

---

## 1. Design Tokens (from `Style.png`)

### Colors
| Token | Hex | Usage |
|---|---|---|
| `BG 1` | `#292F36` | Primary page/section background |
| `BG 2` | `#1A1E23` | Darker surface, code-style cards, header/footer contrast |
| `Brand 1` | `#12F7D6` | Primary accent, section titles, primary CTA, active nav/focus |
| `Brand 2` | `#98FAEC` | Secondary accent, skill category cards, footer social icons |
| `Grey` | `#43454D` | Borders, dividers, muted UI elements |
| `White` | `#FFFFFF` | Primary text, secondary button fill |
| Tech accents | `#E54F26`, `#0C73B8`, `#E7A020`, `#28A9E0` | Technology badge circles (adapt to actual stack icons) |

### Typography
- **Display & Body (`Ubuntu`):**
  - `BG Text-U`: Regular, 117px / 134px (decorative/hero background text)
  - `H1-U`: Regular, 64px / 72px
  - `H2-U`: Regular, 32px / 36px
  - `Button-U`: Regular, 20px / 24px
  - `Article-U`: Light, 16px / 32px (32px paragraph spacing)
  - `Para-U`: Light, 16px / 18px (16px paragraph spacing)
  - `Label-U-M`: Medium, 14px / 16px
  - `Label-U-L`: Light, 14px / 16px
- **Monospace (`IBM Plex Mono`):**
  - `Number-M`: Medium, 48px / 62px (stats/metrics if used)
  - `H2-M`: Medium, 32px / 42px
  - `Logo-M`: Medium, 32px / 42px
  - `Menu-M`: Regular, 24px / 32px
  - `Media-M`: Regular, 16px / 20px
  - `Para-M`: Regular, 16px / 20px
  - `Code-M`: Regular, 14px / 18px (code-tag cards, metadata)

---

## 2. Components & Responsive Behavior (from `Component.png` & `Interaction.png`)

- **Header:** Logo (`<C/> AbdullahEssam` or `<AE/>`), navigation links, and social icon links (GitHub, LinkedIn, Email). Collapses labels on tablet and simplifies to compact row/menu on mobile.
- **Floating Left Navigation Rail:** Fixed vertical pill with section icons; highlights active section on scroll and reveals section tooltip on hover. *(Hidden or moved to bottom/top drawer on small mobile screens to avoid horizontal overlap.)*
- **Module Title:** Centered mouse/scroll indicator (`0` + dashed line) above `Brand 1` heading and subtitle.
- **Buttons:** 3 pill variants — Filled `Brand 1`, Filled `White`, Outlined `Brand 1`.
- **Footer:** Copyright, social icon circles (`Brand 2`), and minimal links; single-row on desktop, stacked on tablet/mobile.

---

## 3. Design-to-Content Mapping

| Design Section | Brief / Roadmap / CV Content Area | Adaptation Notes |
|---|---|---|
| **Hero** (`hero.png`) | **1. Hero / Introduction** | 3-column layout under `Developer` (`BG Text-U`): **(Left)** Asymmetric rounded profile card with avatar, `Abdullah`, `General Software Engineer`, Cairo/Egypt, email/links, 4 skill pills, and `Download CV` button; **(Center)** `<h1>` `Hey / I'm Abdullah, / Software Engineer` `</h1>`, `<p>` intro, and `Let's Talk` CTA; **(Right)** Dark `BG 2` stats pill (replace template's `8 Years of Experience` with accurate, verifiable numbers). |
| **About Me** | **6. About** | Keep topographic background + `<p>` code-style card + right-side portrait/workspace visual. Highlight Computer Science background, application engineering, and systems mindset. |
| **Skills** | **4. Technical Skills** (+ **3. Engineering Approach**) | Replace generic `Web`/`App` cards with capability categories from the brief (e.g., Application Engineering, Backend & APIs, Engineering Fundamentals, Web/Systems, AI Exploration). No percentage bars. |
| **Works** | **2. Selected Projects** | Adapt carousel/showcase for **TaskFlow**, **Smart Home / Smart Office**, **Tawsylah**, and optional **AADF**. Each project needs a full case-study view (modal or `/projects/[slug]` page) following the 9-part template (Overview, Problem, Solution, My Role, Engineering, Challenges, Outcome, Tech Stack, Links). |
| **Blogs** *(Template section)* | **5. Experience & Contributions** *(or Omit)* | Roadmap §6 explicitly excludes a Blog/CMS from the initial release. Recommend replacing this section with **Experience & Contributions** (or **Engineering Approach**) using the clean card/column layout, or omitting it. |
| **Contact** | **7. Contact** | Keep the `Send Me A Message` layout, or pair it with direct Email / LinkedIn / GitHub actions. Since no custom backend is planned, a form will require a static form service (e.g., Formspree/Web3Forms) or `mailto:` fallback. |

---

## 4. Accessibility & Performance Notes

1. **Contrast check:** Verify `Brand 1` (`#12F7D6`) and `Brand 2` (`#98FAEC`) text on `#292F36` / `#FFFFFF` meets WCAG AA contrast; use dark text (`#1A1E23`) on bright `#12F7D6`/`#98FAEC` fills.
2. **Hover tooltip delay:** `Interaction.png` specifies a 2-second hover delay on the left nav rail. Reduce to immediate/150ms hover + keyboard focus support so it feels responsive and is accessible via keyboard.
3. **Reduced motion:** Wrap Framer Motion transitions and scroll animations in `prefers-reduced-motion` checks.
4. **Search bar:** The template header includes a search popup for blogs. If Blogs are omitted, remove the search UI rather than leaving an inert control.
5. **Images:** Optimize project screenshots and About photo with `next/image` and provide descriptive `alt` text.

---

## 5. Missing Assets & Decisions Needed Before Phase 1

### Design / Layout Decisions
1. **Hero stats pill (`hero.png`):** Confirm what 3 accurate metrics to show in the right-hand stats card (e.g., `5` Languages, `5+` Projects, `121+` Community Devs — replacing the template's `8 Years of Experience`).
2. **Project lineup reconciliation:** The brief lists **TaskFlow**, **Smart Home / Smart Office**, **Tawsylah**, and **AADF**, whereas the CV lists **Delivery System**, **BrainBox AI**, **Insulin95**, **Multiverse Mentor**, and **Signfy**. Confirm which 3–4 projects to feature in `Works`.
3. **Blogs section:** Confirm whether to **replace** the `Blogs` section with **Experience & Achievements** (`FAD Community`, ISEF, IEEE YESIST12, etc.) or **omit** it.
4. **Contact form:** Confirm whether you want a working static form (e.g., Formspree / Web3Forms) or direct contact links (`mailto:`, LinkedIn, GitHub) without a form.
5. **Project presentation:** Confirm whether clicking a project in `Works` opens a dedicated **case-study route** (`/projects/[slug]`) or an **in-page modal/drawer**.

### Content & Asset Inputs Needed
- [x] CV PDF (`docs/Abdullah_Essam_CV.pdf` — will copy to `public/` for `Download CV` button)
- [x] GitHub profile URL: `https://github.com/Aboody241`
- [x] LinkedIn profile URL: *None for now (omit from active links)*
- [x] Public contact email address: `ounabdallah216@gmail.com`
- [ ] About section photo (or approved workspace image)
- [ ] Approved project screenshots + public repo/demo links for the selected 3–4 projects

