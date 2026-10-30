# SiteSphere design system

SiteSphere builds websites and runs local SEO for businesses that serve their
neighbourhood: clinics, restaurants, law firms, salons and trades. The site has one
job: convince an owner that we are the team to make them the business people find
first nearby, and get them to book a strategy call.

Everything below is defined as tokens in `app/globals.css` (`@theme`) and used
through Tailwind utilities such as `bg-paper`, `text-ink` and `bg-cobalt`.

## Identity

- **The idea:** local search. The hero is an illustrated "near me" search where your
  business moves to first place. Map paper, street grids and map pins come from
  the same source.
- **The logo sets the type pairing:** "*site*" is an italic serif and "**sphere.**"
  is a heavy grotesk. The site uses the same two voices.
- **One memorable moment:** the hero search animation. Everything else stays quiet.
- **No prices on the site.** Every engagement is scoped after a free audit, and the
  copy says so.

## Colour

| Token | Hex | Use |
| --- | --- | --- |
| `paper` | `#EDEEE8` | Page background. A cool mineral off-white, like map paper |
| `paper-deep` | `#E1E3DA` | Banded sections (marquee, engagements), skeletons |
| `card` | `#F7F8F4` | Raised surfaces: hero panel, service panel, form fields |
| `ink` | `#0B1A2E` | Text, dark sections (Industries, Contact, Footer) |
| `ink-soft` | `#475265` | Body copy and secondary text |
| `ink-faint` | `#7A8494` | Captions, hints, inactive pins |
| `line` | `ink / 14%` | Dividers and borders on light surfaces |
| `night-line` | `paper / 16%` | Dividers and borders on dark surfaces |
| `cobalt` | `#2340F5` | **The only action colour.** Primary buttons, active states, your map pin, focus rings |
| `cobalt-deep` | `#1A2FC0` | Primary button hover |
| `cobalt-wash` | `#DFE4FF` | Highlighted result row, input focus halo |
| `marigold` | `#F4B63C` | Star ratings, checkmarks and icons on dark backgrounds. Never used for text on light backgrounds |

Rules:

- Cobalt means "you can act here" or "this is you". Don't use it decoratively.
- Dark sections use `ink` with `paper` text at 100/85/70/60% opacity for hierarchy.
- No gradients as decoration. The only radial gradients are the hero grid mask and
  nothing else.

## Typography

| Role | Family | Setting |
| --- | --- | --- |
| Display / headings | Archivo (variable, `wdth` axis) | 800 weight, tracking `-0.04em` to `-0.045em`, leading `0.95`–`1.02`; the hero uses `font-stretch: 92%` |
| Body / UI | Archivo | 400–600, 17px base, leading 1.6 |
| Serif voice | Newsreader Italic | Hero second line, service outcomes, engagement terms |

Scale (fluid with `clamp`):

| Step | Size |
| --- | --- |
| Hero H1 | `clamp(2.75rem, 7vw, 5.75rem)` |
| Section H2 | `clamp(2rem, 4.4vw, 3.5rem)` |
| Contact H2 | `clamp(2.25rem, 5vw, 4rem)` |
| H3 | 1.5–1.75rem, 700–800 |
| Lead paragraph | 1.125–1.25rem |
| Body | 1.0625rem |
| Small / captions | 0.8125–0.9375rem |

Rules:

- Sentence case everywhere. No all-caps eyebrow labels above headings.
- The serif sets whole lines or sentences, never a single highlighted word.
- Keep paragraph measure under ~70 characters (`max-w-[34rem]`–`[38rem]`).
- Use `text-balance` on headings and `text-pretty` on paragraphs.

## Spacing and layout

- Container: `max-w-[76rem]`, gutters `16px` (mobile), `24px` (sm), `32px` (lg).
- Section rhythm: `py-24` mobile and `py-32` from `sm`.
- Two-column sections use asymmetric grids (`0.8fr / 1.2fr`, `0.9fr / 1.1fr`) and
  stack below `lg`.
- Left-aligned content throughout. Nothing is centred except captions under the
  hero panel on small screens.

## Breakpoints

Tailwind defaults: `sm 640`, `md 768`, `lg 1024`, `xl 1280`.

- `< lg`: hamburger opens the Sheet drawer; services render as stacked cards.
- `≥ lg`: inline navigation; services render as a tab list with a detail panel.
- The page is tested at 1440×900 and 412×915 with no horizontal scroll.

## Radius and elevation

Radius follows hierarchy rather than one value for everything:

| Element | Radius |
| --- | --- |
| Buttons, chips, nav pills | `9999px`. Pills echo the search bar |
| Inputs, list rows | `12px` (`rounded-xl`) |
| Panels (hero search, service panel, engagements, form) | `20px` (`--radius-panel`) |
| Browser frame in Industries | `14px` |

Shadows:

- `shadow-lift`: the one elevation for floating panels on paper.
- `shadow-press`: primary buttons only (a cobalt glow plus an inner highlight).
- Dark sections use a deeper black drop shadow for the browser and phone frames.

## Buttons (`app/components/ui/button.tsx`)

| Variant | Use |
| --- | --- |
| `primary` | Cobalt. One per view: "Book a free strategy call", "Send enquiry" |
| `secondary` | Outlined ink that fills to ink on hover. Secondary actions |
| `inverse` | Paper on dark sections, turns marigold on hover |
| `ghost` | Icon or menu buttons |

Sizes: `md` (44px, the minimum touch target) and `lg` (56px). Labels say exactly
what happens ("See what we build", "Discuss Grow"). Don't add arrows to labels.

## Components

- **Navbar:** transparent at the top, then `paper/85` with blur and a hairline once
  scrolled. On mobile it uses a Sheet (Radix Dialog) drawer that slides from the
  right and closes when a link is chosen.
- **LocalSearchDemo:** the hero animation. It types a query, shows results, then
  moves "Your …" to first place with a spring layout animation, a highlighted row,
  a pulsing pin and Call/Website/Directions chips. It cycles through a restaurant,
  clinic, AC repair service, salon and law firm.
- **Marquee:** CSS-only, with two copies of the list and a 48s linear loop. It
  pauses on hover and has masked edges.
- **Services:** an accessible tab list (arrow keys work) with the detail panel
  cross-fading. The outcome line is in the serif.
- **Industries:** eight industry chips (restaurants, clinics, law, salons, trades,
  real estate, gyms, retail). Choosing one swaps an illustrative site preview
  showing that industry's headline, primary action and key features. SiteSphere
  works with every kind of local business, so no single sector is the showcase.
- **Process:** a real sequence, so it is numbered. A GSAP ScrollTrigger rail fills
  as you scroll and each step's marker turns cobalt.
- **Engagements:** Launch / Grow / Partner in a single panel split by hairlines,
  with no prices and no "recommended" badge.
- **FAQ:** a Radix Accordion, plus `FAQPage` JSON-LD for search and answer engines.
- **Contact:** the form hands off to WhatsApp, with direct WhatsApp and email cards
  next to it.

## Motion

- **Page load:** one staggered rise for the hero copy, then the search panel settles
  in from a slight tilt.
- **Ambient motion:** only the hero search loop and the marquee.
- **Scroll:** only the Process rail (GSAP, scrubbed).
- **User-triggered motion:** tab panel cross-fade, accordion height, sheet slide,
  form success state, button colour changes.
- **Easing:** `cubic-bezier(0.22, 1, 0.36, 1)` (`--ease-out-soft`).
- **Reduced motion:** the search demo shows its final state, the Process rail is
  filled, and global CSS shortens all animations to near zero.

## Libraries

- `motion` (Motion for React): layout and presence animations
- `gsap` and `@gsap/react` (`useGSAP`, ScrollTrigger): the Process scroll rail
- `@radix-ui/react-dialog` and `@radix-ui/react-accordion`: shadcn-style Sheet and
  Accordion in `app/components/ui`
- `lucide-react`: icons
- `clsx` and `tailwind-merge`: the `cn()` helper

## Testing

`npm run test:e2e` runs `tests/home.spec.ts` on desktop and mobile. It checks layout
overflow, console errors, that no prices appear, anchor targets, mobile navigation,
service tabs, the industry picker, the FAQ accordion and the WhatsApp hand-off.
