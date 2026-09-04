# Reduce Homepage Cognitive Overload

## Goal
Make the homepage easier to scan, compare, and act on. Use consistent visual patterns so recruiters can understand the portfolio without relearning each card.

## What the audit found
- Project cards currently use two different layouts: two full-width featured cards and two smaller cards.
- Their measured heights vary from 625px to 797px, which makes comparison and scanning less predictable.
- The four skill cards already share the same measured size, but their internal spacing should remain locked so longer labels do not change the rhythm.
- The opening section presents several actions at once: an opportunity link, three large buttons, contact links, and a second resume download link. This weakens the primary path to the work.

## Changes

### 1. Standardize all project cards
- Display every project in the same two-column desktop grid and one-column mobile stack.
- Give every card the same structure: preview, impact, title, short description, result strip, and skill chips.
- Use one fixed-height interactive preview area across all projects, with the existing demos scaled into that frame rather than changing the card dimensions.
- Clamp variable-length descriptions and reserve consistent space for results and chips so each row stays aligned.
- Keep the EBT Finder App Store action, but anchor it consistently at the bottom without increasing that card's height.
- Preserve equal card heights within each grid row and use the same width for every project.

### 2. Lock the skill-card rhythm
- Keep the current two-column layout.
- Apply equal-height rows and consistent internal alignment to all four cards.
- Preserve the existing wrapping chip treatment while preventing long labels from creating uneven card dimensions.

### 3. Simplify the opening decision hierarchy
- Keep **View My Work** as the single primary action.
- Keep **Resume** as the secondary action.
- Change **Get in Touch** to a quieter text action, since Contact is already available in the navigation.
- Remove the duplicate PDF download link from the contact-link row while keeping LinkedIn and email available.
- Retain the availability message and credibility facts, but visually group them into one compact scan line.

### 4. Reduce repeated visual signals
- Remove the repeated “Interactive Preview” label from every project card and let the consistent framed preview communicate the pattern.
- Use one clear accent treatment per card, prioritizing quantified outcomes over decorative badges.
- Keep card copy concise on the homepage and leave full context for each case study.

### 5. Validate the result
- Check desktop and mobile layouts for equal card dimensions, readable chips, and stable interactive previews.
- Confirm project cards do not resize during interaction and that all links, demos, and the App Store action still work.
- Check reduced-motion behavior, keyboard focus order, text contrast, and build status.

## Technical details
- Refactor `ProjectCard` from featured and standard variants into one shared card layout.
- Update the homepage project grid to uniform tracks and use fixed preview dimensions with responsive constraints.
- Use CSS grid/flex stretching, line clamping, and reserved content rows rather than hardcoding the entire card to one brittle pixel height.
- Keep the existing semantic color tokens, typography, analytics, and project data unchanged.
