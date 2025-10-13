## 🎯 Project Value Proposition

### Core Innovation
This project demonstrates a new model for digital heritage preservation that bridges academic rigor and public engagement. Unlike traditional academic publications (text-heavy, paywalled) or commercial websites (superficial, promotional), this platform offers:

1. **Scholarly Foundation**:
   - Grounded in ethnographic fieldwork and theory
   - Transparent methodology and limitations
   - Proper citations and academic framing

2. **Public Accessibility**:
   - Visually engaging with interactive 3D models
   - Progressive information disclosure (casual browser → deep researcher)
   - No sacrifice of visual appeal for academic credibility

3. **Methodological Contribution**:
   - Showcases web-native research presentation
   - Models how to translate dense academic content for broader audiences
   - Provides template for community-led cultural preservation

### Target Impact

**For Academic Community**:
- Demonstrates effective use of digital media in ethnographic research
- Contributes to intangible cultural heritage scholarship
- Showcases embodied knowledge preservation techniques

**For Cultural Preservation Field**:
- Provides replicable model for documenting disappearing crafts
- Shows how to balance authenticity with accessibility
- Bridges gap between academic research and community practice

**For General Public**:
- Makes serious scholarship accessible without dumbing down
- Reveals invisible labor and skill behind everyday food
- Fosters appreciation for cultural heritage preservation

### Positioning Statement
**"A public-friendly academic project, not an academicized commercial website."**

This is research-first storytelling: every visual element serves a pedagogical purpose, every interaction deepens understanding, and every design choice balances rigor with engagement.


## 🚀 Implementation Phases

### Phase 1: Quick Academic Calibration (1-2 days) 🎯 PRIORITY
**Goal**: Immediate tone improvements with minimal code changes

**Tasks**:
- [ ] Story 3.5.2: Surgical copy edits (Hero, Gallery, Reviews, About sections)
- [ ] Add source citations to Hero and Project Info sections
- [ ] Update button text (Explore → View Documentation)
- [ ] Add "Ethnographic Testimonials" framing to reviews
- [ ] Include limitations statement in About section

**Why First**: Quick wins that immediately shift perception from commercial to academic

### Phase 2: Core Research Translation (3-5 days)
**Goal**: Build the substantive academic infrastructure

**Tasks**:
- [ ] Story 2.1.5: Ethnographic Entry Section
  - Street-to-kitchen video with narration
  - Interactive floor plan
  - Methodology disclosure panel
  - Annotated kitchen videos (3-4 segments)
- [ ] Story 3.5.1: Philosophy Deep-Dive Pages
  - Create at least ONE complete philosophy page as template
  - Implement React Flow concept map
  - Integrate fieldwork quotes and evidence
  - Set up cross-referencing system

**Why Second**: These are the core value-add features that distinguish this from typical websites

### Phase 3: Academic Infrastructure (2-3 days)
**Goal**: Complete the scholarly apparatus

**Tasks**:
- [ ] Epic 6.1: Citation system with footnote tooltips
- [ ] Epic 6.2: Methodology page with detailed protocols
- [ ] Epic 6.3: Data transparency features
- [ ] Create `/references` page with full bibliography

**Why Third**: These enhance credibility and make the project truly citable

---

## 📝 Developer Notes

### Key Dependencies to Install
```bash
npm install reactflow  # For philosophy concept maps
# All other dependencies already installed
```

### File Structure for New Features
```
src/
├── app/
│   ├── philosophy/
│   │   ├── page.tsx              # Overview
│   │   └── [slug]/page.tsx       # Detail pages
│   ├── methodology/page.tsx      # Research protocol
│   └── references/page.tsx       # Bibliography
├── components/
│   ├── sections/
│   │   └── EthnographicEntrySection.tsx
│   ├── philosophy/
│   │   ├── PhilosophyConceptMap.tsx
│   │   ├── PhilosophyContent.tsx
│   │   └── PhilosophyCrossRef.tsx
│   └── academic/
│       ├── FootnoteTooltip.tsx
│       ├── MethodBadge.tsx
│       └── DataSourceIndicator.tsx
├── lib/
│   ├── data/
│   │   ├── philosophies.ts      # Philosophy data
│   │   └── ethnographic.ts      # Fieldwork data
│   └── types.ts                 # Updated with new interfaces
```
