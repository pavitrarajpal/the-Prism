# Design System Strategy: The Ceremonial Canvas

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Ceremonial Canvas."**

This system rejects the frantic, high-contrast density of modern SaaS interfaces in favor of the slow, intentional movements of a traditional matcha ceremony. We are not building a "utility"; we are crafting a digital sanctuary.

To achieve a high-end editorial feel, we break the "template" look through **intentional asymmetry** and **tonal depth**. Layouts should feel curated, not generated. By removing white entirely, we lean into a "tinted reality" where every surface feels like handmade washi paper or glazed ceramic. We use breathing room (negative space) as a functional element to guide the user's eye through a ritualistic flow.

## 2. Visual Language & Color Theory

The palette is rooted in botanical serenity. We use the interplay between the deep organic greens and the soft, petal-like pinks to create a sophisticated, low-fatigue environment.

### The "No-Line" Rule
Traditional UI relies on 1px borders to define sections. In this system, **borders are prohibited.**
Structural boundaries must be defined solely through:
* **Background Color Shifts:** Moving from `surface` (#ebffe8) to `surface-container-low` (#dafdd8).
* **Tonal Transitions:** Using the `surface-dim` (#c0e3c0) to anchor a section.
* **Negative Space:** Using the `Spacing Scale` (specifically tokens 16 and 20) to create clear "islands" of content.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of fine, dyed paper.
* **The Base Layer:** Always `surface`.
* **The Content Layer:** Use `surface-container` to house primary content.
* **The Accent Layer:** Use `surface-container-highest` for elements that require immediate focus.
* **The Glass Rule:** To create a "signature" look, floating elements (like navigation bars or hovering cards) should use a backdrop-blur (12px–20px) with a semi-transparent `surface-variant` fill. This creates a "frosted glass" effect that allows the botanical background to bleed through, softening the interface.

### Signature Textures
Avoid flat, "dead" buttons. For primary CTAs, utilize a subtle linear gradient from `primary` (#7f525d) to `primary-container` (#ebb2bf). This provides a "glow" that mimics light hitting a silk ribbon.

## 3. Typography: The Editorial Voice

Typography is the "scent" of the brand. We use **Noto Serif** to evoke a sense of history, craft, and prestige.

* **Display & Headlines:** Use `display-lg` and `headline-lg` with generous tracking adjustments. These should feel like titles in a high-end art magazine. Don't be afraid of extreme scale; a single word in `display-lg` can serve as a powerful anchor for a page.
* **Body Copy:** `body-lg` (Noto Serif) is the workhorse. The serif ensures that long-form content feels like a tactile reading experience.
* **Labels & Metadata:** Use **Manrope** (`label-md`). The transition from a serif headline to a clean, geometric sans-serif label provides the "Modern High-End" tension required for a professional polish.

## 4. Elevation & Depth: Tonal Layering

We convey hierarchy through weight and tone rather than traditional drop shadows.

* **The Layering Principle:** Depth is achieved by "stacking." A `surface-container-lowest` card placed on a `surface-container-low` section creates a natural lift.
* **Ambient Shadows:** If a floating effect is vital, shadows must be **tinted**. Use the `on-surface` color (#04210b) at a 4%–6% opacity with a blur radius of at least 24px. Never use pure grey or black for shadows; it "muddies" the botanical palette.
* **The "Ghost Border" Fallback:** If a container requires a boundary for accessibility, use a `Ghost Border`: the `outline-variant` token at **15% opacity**. This provides a whisper of a container without breaking the minimalist aesthetic.

## 5. Component Guidelines

### Buttons (The Ritual Touchpoints)
* **Primary:** Pill-shaped (`rounded-full`), using the signature pink gradient. Text is `on-primary` (white is forbidden, use the lightest pink/cream variant if necessary, though here we lean into the `primary-fixed` tone).
* **Secondary:** Ghost style. No background, only a `Ghost Border` and `primary` text.
* **State Changes:** On hover, the button should not "glow" with light, but rather deepen in tone (moving to `on-primary-container`), mimicking the way a leaf darkens when wet.

### Cards & Lists
* **Strict Rule:** No dividers. Separate list items with `spacing-4` or `spacing-5`.
* **Interaction:** On hover, a card should shift from `surface-container` to `surface-container-high`. This subtle shift is enough to signal interactivity without visual clutter.

### Input Fields
* Avoid the "box" look. Use a `surface-variant` background with a `rounded-sm` corner.
* The active state is signaled by a `primary` underline (2px), rather than a full-box highlight.

### Specialized Ritual Components
* **The Infusion Loader:** Instead of a generic spinning circle, use a fading petal animation or a slow-growing organic stroke using the `secondary` green.
* **The Progress Stepper:** Use horizontal lines that look like "stems," with `primary-container` nodes that "bloom" into `primary` when active.

## 6. Do's and Don'ts

### Do:
* **Embrace Asymmetry:** Offset your headlines. Let images overlap the edges of containers. It feels more human and less "bootstrap."
* **Use the Spacing Scale:** Stick religiously to the provided tokens. Inconsistency in spacing is the fastest way to make a high-end system feel cheap.
* **Prioritize Readability:** Ensure the `on-surface` text on the `background` color meets a 4.5:1 contrast ratio.

### Don't:
* **No #FFFFFF:** There is no place for pure white in a ritual. If you need a "bright" spot, use `surface-container-lowest`.
* **No Harsh Corners:** Avoid `rounded-none` unless it is for a specific editorial decorative element. Use `rounded-md` or `rounded-lg` to maintain the "soft" botanical feel.
* **No Generic Grids:** Don't just center everything. Use the "Editorial Offset"—place your primary text 1/3rd from the left to create a sophisticated, intentional imbalance.
