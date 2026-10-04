Design System: formER
1. Visual Theme & Atmosphere
formER is an intelligent form-filling assistant for people who repeatedly complete complicated online forms.
The visual language is calm, precise, technical, and trustworthy. It should feel like a carefully engineered productivity tool rather than a typical AI startup landing page.
The atmosphere is editorial and software-native: generous whitespace, strong typography, restrained surfaces, deliberate asymmetry, and small moments of interface motion.
The design should communicate that formER understands forms, documents, and user information with precision.
Design Variance: 6/10 Motion Intensity: 4/10 Visual Density: 4/10
Use controlled asymmetry rather than visual chaos. Every unusual placement should have a clear compositional reason.
Do not make the interface feel futuristic for its own sake. Intelligence should be communicated through behavior and interface states, not through glowing visual effects.
2. Color Palette & Roles
Canvas
Paper White — #F8F9F7 Primary page background. Use as the dominant canvas across the marketing site.
Surface
Clean Surface — #FFFFFF Used for product interface previews, elevated panels, navigation surfaces, and contained interactive areas.
Primary Text
Charcoal Ink — #181A19 Primary headlines, navigation, important interface text.
Secondary Text
Muted Graphite — #626966 Descriptions, supporting copy, metadata, and secondary interface information.
Structural Border
Soft Line — #E2E6E3 Used for subtle 1px separators, field boundaries, and structural divisions.
Accent
Form Teal — #0B6B59 The only accent color.
Use for primary CTAs, selected states, confirmation states, focus rings, important status indicators, and meaningful interactions.
Do not introduce additional decorative accent colors.
Do not use purple, violet, cyan neon, electric blue, pink, or multicolor gradients.
Never use pure black (#000000).
Do not use gradient text.
3. Typography Architecture
Display
Geist
Use bold and semibold weights for major headlines.
Headlines should feel confident and editorial rather than enormous or theatrical.
Use controlled tracking and a strong hierarchy based on weight, scale, and color.
Body
Geist
Use relaxed leading and readable line lengths.
Body copy should generally remain below approximately 65 characters per line.
Technical
Geist Mono
Use for:


form field names

confidence values

document metadata

technical states

browser-extension details

small system labels

example field mappings
Never use monospace as decorative body typography.
Typography Anti-Patterns
Never use Inter.
Never use generic serif fonts.
Never create oversized text that dominates the entire viewport.
Never use more than approximately two lines for the primary hero headline.
4. Brand Personality
formER should visually communicate:
Precision Clarity Safety Intelligence Efficiency Control
The product should feel like the system is helping the user, not making decisions on the user's behalf.
Avoid visual metaphors involving robots, brains, magic sparkles, circuit boards, futuristic holograms, or glowing AI particles.
5. Navigation
Desktop navigation should occupy approximately 68px in height.
The navigation should remain visually quiet.
Left: formER wordmark.
Center/right: Product How it works Security
Primary action: Get started
Do not create multiple competing CTA buttons.
Do not use oversized navigation bars.
Mobile navigation collapses into a simple menu with the primary CTA remaining accessible.
6. Hero Composition
Use a left-aligned asymmetric hero.
The left side contains:
A concise product statement.
A strong headline communicating the core value.
A short supporting paragraph.
One primary CTA.
The right side contains a realistic formER product visualization.
The product visualization should show an actual online form being interpreted by formER.
Example visual:
A browser form contains fields such as:
Full Name Father's Name Date of Birth 10th Percentage Email Address Phone Number
formER visually identifies the fields and connects them to structured profile data.
Show subtle semantic relationships such as:
"Full Name" → profile.personal.fullName
"10th Percentage" → education.tenth.percentage
"Email" → contact.email
Include confidence information as a restrained interface detail.
The hero visual is the primary visual identity of formER.
Do not use abstract gradient blobs.
Do not use stock photography as the main hero visual.
Do not use a generic dashboard screenshot.
Do not center the entire hero.
Do not use “Scroll to explore” or decorative scroll indicators.
7. Product Visualization Language
Product visuals should look like real software.
Use believable form fields, browser chrome, document previews, structured data, mappings, and system states.
The product UI should use:
Small radii for fields and controls.
Moderate radii for larger containers.
Thin structural borders.
Very subtle shadows only where hierarchy requires elevation.
Generous whitespace.
Technical metadata in Geist Mono.
Product screenshots should contain believable data rather than generic placeholder strings such as “John Doe” or “Acme”.
8. Landing Page Layout System
Do not repeat the same section composition throughout the landing page.
Use different layout families to create rhythm.
Recommended sequence:
Section 1 — Hero
Asymmetric editorial hero.
Left: product message.
Right: interactive form interpretation visualization.
Section 2 — The Problem
Use a large editorial statement followed by a visual sequence of increasingly complex forms.
Communicate the frustration of repeatedly entering the same information.
Avoid three equal feature cards.
Section 3 — The Agent
Use a wide product visualization.
Show the agent moving through:
Observe → Understand → Map → Validate → Fill
This should be represented visually as an actual product state rather than a marketing diagram.
Section 4 — Semantic Mapping
Use a large asymmetric mapping composition.
Webpage field on one side.
Canonical profile information on the other.
Connections between them should feel technical and deliberate.
Example:
Father's Name → personal.fatherName
Qualification → education.highestQualification
10th Board → education.tenth.board
Use Geist Mono for field paths.
Section 5 — Documents Become Structured Data
Show a document preview transitioning into structured profile information.
Examples:
Marksheet → education data
Resume → professional data
Certificate → qualification data
The visual should communicate extraction and organization without using AI clichés.
Section 6 — Browser Extension
Show a realistic browser window containing an external form.
The formER extension should appear as a side panel.
The side panel should contain:
Detected fields Ready to fill Needs confirmation
This section should make the product's browser-extension workflow obvious.
Section 7 — Trust & Control
Use an editorial composition rather than a generic “security features” card grid.
Communicate that sensitive or ambiguous information requires user review.
Important concepts:
User-controlled profile data.
Confidence-aware filling.
Confirmation for ambiguous fields.
No blind submission.
Do not claim absolute security or make unverifiable security promises.
Section 8 — Final CTA
A restrained closing section.
One clear action:
Get started
Keep the final section visually simple.
9. Components
Buttons
Primary buttons use Form Teal (#0B6B59) with light text.
Buttons should feel tactile.
Active state: approximately -1px vertical translation.
No outer glow.
No animated gradient borders.
No oversized pill buttons unless they serve a clear semantic purpose.
Cards
Cards are not the default container for every piece of content.
Only use elevation when it communicates hierarchy.
Prefer borders, whitespace, alignment, and grouping over excessive boxed containers.
Avoid a landing page made entirely from rounded cards.
Inputs
Labels appear above fields.
Never use placeholder text as the only label.
Use clear focus states.
Errors appear directly below the affected field.
Status Indicators
Use restrained states.
Example:
Ready Review Mapped Needs confirmation
Confidence values may use Geist Mono.
Do not turn every state into a colorful badge.
Loading
Use skeleton states matching the exact layout.
Avoid generic circular loading spinners wherever possible.
10. Motion Philosophy
Motion should explain product behavior.
Use restrained spring-like transitions.
Default interaction feel:
stiffness: 100 damping: 20
Prefer transform and opacity animation.
Use motion for:
Field detection.
Semantic mapping.
Confidence changes.
Side-panel opening.
Document extraction.
State transitions.
Section reveals.
Do not animate everything.
Do not create perpetual floating blobs.
Do not use cursor-following effects.
Do not use dramatic cinematic scroll animations.
Motion should make the product feel intelligent and responsive without becoming distracting.
11. Responsive Behavior
Mobile-first.
Below 768px:
All multi-column layouts collapse to a single column.
No horizontal scrolling.
Hero becomes:
headline description CTA product visualization
Product visualizations must remain readable and may become vertically stacked compositions.
Minimum interactive touch target: 44px.
Navigation becomes a clean mobile menu.
Typography scales smoothly.
Spacing reduces proportionally while retaining generous breathing room.
Do not simply shrink desktop layouts.
12. Content Tone
Copy should be direct, specific, and human.
Prefer:
"Fill long online forms without typing the same information again."
Avoid:
"Unleash the future of seamless AI-powered experiences."
Avoid:
"Next-generation"
"Seamless"
"Elevate"
"Revolutionary"
"Unlock"
"AI-powered transformation"
Do not use exaggerated claims.
13. Anti-Patterns — NEVER DO
Never use AI-purple or neon-blue gradients.
Never use neon outer glows.
Never use glowing AI particles or sparkles.
Never use glassmorphism as the primary visual language.
Never use Inter.
Never use generic serif fonts.
Never use pure black.
Never use gradient-filled giant headlines.
Never use three equal feature cards in a horizontal row.
Never use generic SaaS dashboard screenshots.
Never use robot, brain, circuit-board, or holographic AI imagery.
Never use fake statistics.
Never use placeholder names such as John Doe, Acme, Nexus, or Lorem Ipsum.
Never use emojis in the interface.
Never use multiple competing accent colors.
Never put every section inside a rounded container.
Never make every section another left-text/right-image zig-zag.
Never create arbitrary decorative elements without a functional or compositional reason.
Never use decorative scroll arrows.
Never use custom mouse cursors.
Never allow overlapping content.
Never make security claims that are not explicitly supported by the product.
Never invent product functionality that has not been defined.
14. Design Principle
formER should look like software that understands structure.
The visual system should repeatedly reinforce the transformation:
Messy online form → understood fields → structured user information → validated mapping → controlled autofill
The interface should communicate intelligence through clarity, relationships, and interaction rather than through stereotypical AI decoration.