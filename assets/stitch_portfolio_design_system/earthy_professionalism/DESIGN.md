---
name: Earthy Professionalism
colors:
  surface: '#fcf9f2'
  surface-dim: '#dcdad3'
  surface-bright: '#fcf9f2'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3ec'
  surface-container: '#f0eee7'
  surface-container-high: '#ebe8e1'
  surface-container-highest: '#e5e2db'
  on-surface: '#1c1c18'
  on-surface-variant: '#444841'
  inverse-surface: '#31312c'
  inverse-on-surface: '#f3f0e9'
  outline: '#747871'
  outline-variant: '#c4c8bf'
  surface-tint: '#51634e'
  primary: '#51634e'
  on-primary: '#ffffff'
  primary-container: '#8fa28a'
  on-primary-container: '#283826'
  inverse-primary: '#b8ccb2'
  secondary: '#566252'
  on-secondary: '#ffffff'
  secondary-container: '#d7e3d0'
  on-secondary-container: '#5b6656'
  tertiary: '#735b25'
  on-tertiary: '#ffffff'
  tertiary-container: '#b7995d'
  on-tertiary-container: '#453100'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d4e8ce'
  primary-fixed-dim: '#b8ccb2'
  on-primary-fixed: '#101f0f'
  on-primary-fixed-variant: '#3a4b38'
  secondary-fixed: '#dae6d3'
  secondary-fixed-dim: '#becab7'
  on-secondary-fixed: '#141e12'
  on-secondary-fixed-variant: '#3f4a3b'
  tertiary-fixed: '#ffdea0'
  tertiary-fixed-dim: '#e3c282'
  on-tertiary-fixed: '#261a00'
  on-tertiary-fixed-variant: '#5a430f'
  background: '#fcf9f2'
  on-background: '#1c1c18'
  surface-variant: '#e5e2db'
  text-deep: '#2D332C'
  glass-border: rgba(143, 162, 138, 0.15)
  sage-shadow: rgba(143, 162, 138, 0.12)
typography:
  display:
    fontFamily: Plus Jakarta Sans
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.0'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 24px
  margin-x: 32px
  section-gap: 120px
  section-gap-mobile: 64px
---

## Brand & Style

This design system is built for a professional portfolio that balances technical competence with a warm, approachable personality. It adapts the structured, high-end aesthetic of airline booking interfaces into a personal brand narrative that feels both organic and highly polished.

The visual style is a blend of **Minimalism** and **Glassmorphism**. It utilizes expansive white space and a restricted, earthy color palette to create a sense of calm and clarity. Subtle frosted-glass effects on navigation and floating elements provide a sense of layered depth, while extreme roundedness removes the typical "stiffness" of corporate portfolios, replacing it with a fluid, modern, and welcoming interface.

## Colors

The palette is rooted in "Sage and Gold," moving away from cold digital blues toward a more human and grounded experience.

*   **Sage Green (#8FA28A):** The primary brand color, used for high-level headings, primary branding, and meaningful iconography.
*   **Pale Sage (#C7D3C0):** A secondary functional color for background sections, subtle gradients, and card borders.
*   **Warm Cream (#F7F4ED):** The global background color, providing a soft, paper-like foundation that is easier on the eyes than pure white.
*   **Gold/Tan (#C8A96B):** The primary call-to-action (CTA) and highlight color, used sparingly to draw attention to interactive elements and success indicators.
*   **Text & Accents:** For body copy and dark headings, a deep variation of sage is used (`#2D332C`) to maintain tonal harmony without resorting to flat black.

## Typography

The typography system uses **Plus Jakarta Sans** for headlines to provide a friendly, modern, and slightly geometric personality. It is paired with **Inter** for all functional and body text to ensure maximum legibility and a systematic feel.

Headlines should utilize tight letter-spacing and generous line heights to mimic the "Aerovia" display style. Large display text is reserved for the hero section to make a bold, confident first impression. On mobile, display and large headlines scale down significantly to maintain vertical rhythm without overwhelming the viewport.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy for desktop, centering content within a 1280px container to ensure a premium, curated feel. On smaller screens, the system transitions to a fluid model with generous margins.

*   **Vertical Rhythm:** Use a strict 8px base unit for all component-level spacing. 
*   **Whitespace:** Emphasize large gaps (120px+) between major sections to allow the design to "breathe," reinforcing the minimalist aesthetic.
*   **Margins:** Maintain consistent 32px safe areas on the sides of the viewport for mobile and tablet views to prevent content from touching the screen edges.

## Elevation & Depth

Hierarchy is established through **Tonal Layers** and **Glassmorphism** rather than traditional high-contrast shadows.

*   **Surfaces:** Cards and containers use a subtle fill of Pale Sage or White with a very low-opacity sage-tinted shadow (`sage-shadow`). 
*   **The Glass Effect:** Navigation bars and floating badges utilize a `backdrop-filter: blur(12px)` with a semi-transparent cream background. This creates a "frosted" look that allows background colors to bleed through softly.
*   **Depth Tiers:**
    1.  **Level 0 (Base):** Warm Cream background.
    2.  **Level 1 (Cards):** Pale Sage or White with a 1px border (`glass-border`).
    3.  **Level 2 (Floating):** Glassmorphic elements with blurred backgrounds and soft, wide-spread shadows to indicate they are "hovering" above the content.

## Shapes

The design system employs an exaggerated roundedness to create a soft, friendly, and organic visual language.

*   **Standard Components:** Buttons and small input fields use a **0.5rem (8px)** radius.
*   **Large Components:** Portfolio cards, hero images, and primary section containers use **rounded-lg (16px)** or **rounded-xl (24px)**.
*   **Floating Elements:** Information badges and tags use **Pill-shaped** radii (fully rounded) to distinguish them from structural content.

## Components

### Buttons
*   **Primary CTA:** Solid Gold/Tan background with Warm Cream text. Large padding (16px 32px) and a subtle 8px radius. 
*   **Secondary CTA:** Outlined style with a Sage Green border and text. No fill, except on hover where it gains a 5% Sage tint.

### Floating Info Badges
*   Used in the hero section for key stats (e.g., "5+ Years Experience"). 
*   **Style:** White semi-transparent background, glass blur, pill-shaped, and a small Gold icon on the left.

### Portfolio Cards
*   White or Pale Sage background with a 1px `glass-border`.
*   Large 24px corner radius. 
*   Images inside cards should also be rounded (16px) to maintain nested corner harmony.

### Navigation Bar
*   Pinned to the top, glassmorphic (blurred background), with a thin bottom border in `glass-border`.
*   Links in Sage Green with a 2px Gold underline that appears only on the active state.

### Input Fields
*   Warm Cream fill with a subtle 1px Sage border.
*   Large 12px padding and 8px corner radius. Focus state uses a 2px Gold border.