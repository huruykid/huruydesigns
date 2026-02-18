
## Interactive Pay Module Component

### What I Found

The current phone frame wraps `oneasure-pay-screen.png` — a screenshot of the OneAsure Pay portal screen. After analyzing the image, it contains 9 distinct, identifiable sections:

1. Header bar — "Pay · View & Manage all your financial information"
2. Pay card — masked salary amount, View Paystub / Print Paystub buttons
3. Pay Breakdown — donut chart with Take Home Pay ($4,262.79), segmented by Take Home Pay, Taxes, Post-Tax Deductions, and Pre-Tax Deductions; "View Compensation & Rate" link
4. Deductions Calculator — card with illustration and Launch Calculator CTA
5. W-4 Calculator — card with illustration and Launch Calculator CTA
6. Pay Disbursement — table listing Checking (80%), Savings (10%), Savings 2 (10%); View All / Add New Allocation
7. Pay History — 3 paycheck rows (Aug 31, Aug 30, July 31) with $3,452.57 each + View Full Pay History
8. W-2s — year rows 2022, 2021, 2020, 2019 + View Prior Years
9. Marketplace — ZayZoon "wages in seconds" card

The goal is to replace the static `payScreenImage` with a new React component — `PayModuleDemo.tsx` — that faithfully recreates these sections with real interactivity, inside the same phone frame shell.

---

### New Component: `src/components/case-study/PayModuleDemo.tsx`

A self-contained scrollable mobile app screen built in React + Tailwind, rendered inside the existing phone frame in `OneAsureCaseStudy.tsx`.

#### Key Interactive Features

**Donut Chart (Pay Breakdown)**
- Built with inline SVG — no external chart library needed
- 4 segments: Take Home Pay (67%), Taxes (21%), Post-Tax Ded. (5%), Pre-Tax Ded. (7%)
- Clicking a legend pill highlights that segment (stroke-width increase + dimming of others)
- Center label updates to show the clicked segment's label and amount
- Animated on mount using `framer-motion` stroke-dashoffset

**Pay Card**
- Salary amount masked by default (shown as ●●●●●) with a toggle eye icon to reveal the real value ($4,262.79)
- View Paystub / Print Paystub buttons styled in the OneAsure teal brand color

**Deductions Calculator & W-4 Calculator**
- Interactive cards — clicking "Launch Calculator" shows an inline micro-calculator overlay (simple input + result, dismissible with a close button)

**Pay Disbursement**
- Accordion-style expandable rows — click any account row to see a faux edit allocation UI
- "Add New Allocation" button opens a small inline form (account name + % input)

**Pay History**
- Expandable rows — clicking a row shows a breakdown (Gross Pay, Taxes, Net Pay)

**W-2s**
- Each year row has a download icon that animates (spin → checkmark) on click to simulate downloading

**Marketplace**
- ZayZoon card with "Try It Now" and "Learn More" buttons — clicking "Learn More" shows an expanded description card

---

### Component Structure

```text
PayModuleDemo
├── Header bar (teal bg, "Pay" title + search/avatar icons)
├── Pay card (masked salary, view toggle, 2 CTA buttons)
├── Pay Breakdown (SVG donut + interactive legend pills)
│   └── "View Compensation & Rate" link
├── Deductions Calculator card (launch → inline overlay)
├── W-4 Calculator card (launch → inline overlay)
├── Pay Disbursement table (expandable rows + add form)
├── Pay History list (expandable rows)
├── W-2s list (download animation per row)
└── Marketplace / ZayZoon card (expandable description)
```

All sections are separated by thin dividers just like the original, and use the OneAsure teal (`#1a6e8e` / `#0d7a9c`) as the primary brand color.

---

### Files to Modify

1. **`src/components/case-study/PayModuleDemo.tsx`** — Create the new interactive component (new file)

2. **`src/components/case-study/OneAsureCaseStudy.tsx`** — Replace `import payScreenImage` and the `<img>` tag inside the phone screen area with `<PayModuleDemo />` (the scrollable screen div already exists with `h-[480px] overflow-y-auto` — the component renders directly inside it)

No other files need to change. The phone shell, glow, scroll hint, and description text beside the phone all remain exactly as they are.
