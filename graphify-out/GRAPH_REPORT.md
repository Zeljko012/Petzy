# Graph Report - .  (2026-10-07)

## Corpus Check
- Corpus is ~18,613 words - fits in a single context window. You may not need a graph.

## Summary
- 277 nodes · 525 edges · 14 communities (10 shown, 4 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 23 edges (avg confidence: 0.78)
- Token cost: 6,500 input · 9,000 output

## Community Hubs (Navigation)
- Arhitektura i pravila projekta
- Pregled uživo i ilustracije
- Stranice sadržaja i saveti
- Korpa i forma porudžbine
- Zavisnosti paketa
- TypeScript podešavanja
- Početna, prodavnica, dostava
- Server akcija i snimanje porudžbina
- Brend paleta i dizajn pravila
- Raspored, zaglavlje, podnožje
- O nama
- ESLint konfiguracija
- Next konfiguracija
- Vizuelni stil

## God Nodes (most connected - your core abstractions)
1. `formatRSD()` - 22 edges
2. `nadjiProizvod()` - 16 edges
3. `compilerOptions` - 16 edges
4. `Korpa()` - 11 edges
5. `altTekst()` - 11 edges
6. `useKorpa()` - 9 edges
7. `posaljiPorudzbinu()` - 8 edges
8. `Ilustracija()` - 8 edges
9. `BojaId` - 8 edges
10. `proveriIme()` - 8 edges

## Surprising Connections (you probably didn't know these)
- `Petzy sajt (brand folder instructions)` --semantically_similar_to--> `Petzy sajt (project instructions)`  [INFERRED] [semantically similar]
  petzy-brend/CLAUDE.md → CLAUDE.md
- `Positioning: pet gear with your pet's name, not faceless plastic` --semantically_similar_to--> `Osnovno (name, domain petzy.rs, slogan Za tvog najboljeg drugara)`  [INFERRED] [semantically similar]
  PRODUCT.md → petzy-brend/BRAND.md
- `Conversion & proof (CTA, belief order, no fake reviews)` --semantically_similar_to--> `Sadrzaj pravila (vet recommendation, no fake reviews/counters/popups)`  [INFERRED] [semantically similar]
  PRODUCT.md → petzy-brend/BRAND.md
- `Bez pritiska (no pressure)` --semantically_similar_to--> `Sadrzaj pravila (vet recommendation, no fake reviews/counters/popups)`  [INFERRED] [semantically similar]
  PRODUCT.md → petzy-brend/BRAND.md
- `Telefon prvo (mobile first)` --semantically_similar_to--> `Dizajn pravila (mobile first, one CTA per screen, 44px, reduced motion)`  [INFERRED] [semantically similar]
  PRODUCT.md → petzy-brend/BRAND.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Customize -> cart -> COD order flow** — claude_ilustracija, claude_korpa, claude_porudzbina_akcije, claude_porudzbine, claude_resend, petzy_brend_brand_placanje_pouzecem [INFERRED 0.85]
- **Pet-name personalization as brand core** — product_ime_je_heroj, product_pokazi_ne_pricaj, petzy_brend_brand_personalizacija, petzy_brend_brand_pregled_uzivo, claude_ilustracija, claude_katalog [INFERRED 0.85]
- **Design token system (palette, contrast, tokens.css)** — petzy_brend_brand_suncano_dvoriste, petzy_brend_brand_wcag_readability_rules, petzy_brend_brand_tokens_css, claude_tokens_css, claude_no_hardcoded_hex [INFERRED 0.85]

## Communities (14 total, 4 thin omitted)

### Community 0 - "Arhitektura i pravila projekta"
Cohesion: 0.05
Nodes (42): generate-agent-files.js, node_modules/next/dist/docs, Next.js agent rules (breaking-changes notice), Activity hidden pages -> useId instead of fixed id, .env.example, formatRSD (src/lib/format.ts), src/components/Ilustracija.tsx (live preview), src/lib/katalog.ts (catalog, BOJE, delovi) (+34 more)

### Community 1 - "Pregled uživo i ilustracije"
Cohesion: 0.13
Nodes (31): FILTERI, IkonaInfo(), bojaImena(), Ilustracija(), Ime(), osvetljenost(), Props, senka() (+23 more)

### Community 2 - "Stranice sadržaja i saveti"
Cohesion: 0.09
Nodes (26): metadata, SavetiStranica(), generateMetadata(), Sadrzaj(), IkonaKamion(), IkonaKist(), IkonaKorpa(), IkonaKvacica() (+18 more)

### Community 3 - "Korpa i forma porudžbine"
Cohesion: 0.12
Nodes (29): Korpa(), PraznaKorpa(), Rezime(), metadata, FormaPorudzbine(), Hvala(), P, Polje (+21 more)

### Community 4 - "Zavisnosti paketa"
Cohesion: 0.07
Nodes (28): eslint, eslint-config-next, next, dependencies, next, react, react-dom, devDependencies (+20 more)

### Community 5 - "TypeScript podešavanja"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+20 more)

### Community 6 - "Početna, prodavnica, dostava"
Cohesion: 0.17
Nodes (11): DostavaIPovracaj(), metadata, Pocetna(), MiniStavke(), metadata, Prodavnica(), generateMetadata(), Sadrzaj() (+3 more)

### Community 7 - "Server akcija i snimanje porudžbina"
Cohesion: 0.19
Nodes (15): brojPorudzbine(), POLJA, posaljiPorudzbinu(), RezultatPorudzbine, UlaznaStavka, escapeHtml(), Porudzbina, posaljiEmail() (+7 more)

### Community 8 - "Brend paleta i dizajn pravila"
Cohesion: 0.22
Nodes (11): Dizajn pravila (mobile first, one CTA per screen, 44px, reduced motion), Koral #FF6B35, Krem #FFF4E6, Palette Suncano dvoriste, Sunce #FFC93C, Tamni koral #B8461B, Teget #1D3557, Tirkiz #2EC4B6 (+3 more)

### Community 9 - "Raspored, zaglavlje, podnožje"
Cohesion: 0.29
Nodes (5): metadata, nunito, viewport, Podnozje(), Zaglavlje()

## Knowledge Gaps
- **92 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+87 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `formatRSD()` connect `Početna, prodavnica, dostava` to `Pregled uživo i ilustracije`, `Stranice sadržaja i saveti`, `Korpa i forma porudžbine`, `Server akcija i snimanje porudžbina`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **Why does `nadjiProizvod()` connect `Početna, prodavnica, dostava` to `Pregled uživo i ilustracije`, `Stranice sadržaja i saveti`, `Korpa i forma porudžbine`, `Server akcija i snimanje porudžbina`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _92 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Arhitektura i pravila projekta` be split into smaller, more focused modules?**
  _Cohesion score 0.053426248548199766 - nodes in this community are weakly interconnected._
- **Should `Pregled uživo i ilustracije` be split into smaller, more focused modules?**
  _Cohesion score 0.12550607287449392 - nodes in this community are weakly interconnected._
- **Should `Stranice sadržaja i saveti` be split into smaller, more focused modules?**
  _Cohesion score 0.09246088193456614 - nodes in this community are weakly interconnected._
- **Should `Korpa i forma porudžbine` be split into smaller, more focused modules?**
  _Cohesion score 0.11711711711711711 - nodes in this community are weakly interconnected._