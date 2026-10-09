# Tidy the Portfolio UI

## Goal
Polish the visible site first so the homepage, interactive previews, About page, and resume feel more balanced and consistent across desktop and mobile.

## Homepage
- Remove the obsolete “Full study by request” treatment from project cards now that every case study is public.
- Replace the lone “More work” text link with a compact horizontal OneAsure Portal card using its existing image, strongest result, and a clear case-study link.
- Tighten mobile spacing around the opening proof points and actions while preserving the current positioning and content.

## Interactive previews
- Standardize the shared preview header, device switcher, spacing, focus states, and interaction cues through the existing responsive preview shell.
- Check the Asure, Beles, EBT Finder, and OneAsure previews at desktop and phone widths so controls remain visible and previews do not clip.
- Refine the Beles status area so its live-app action and match preview read as one intentional composition without nesting cards.

## About and resume
- Improve the mobile relationship between the About headshot, biography, and resume action so the section has a natural reading order and no awkward gap.
- Make the resume PDF, Word, and Print actions consistent in height, icon alignment, wrapping, and mobile width.

## Validation
- Check the homepage, About page, resume, and affected case studies at desktop and mobile widths.
- Verify keyboard focus, preview switching, text wrapping, overflow, and dark/light theme contrast.
- Confirm the project builds cleanly and inspect the latest runtime signals.

## Technical details
- Reuse the existing design tokens, Button component, shared project data, and responsive preview shell.
- Keep all case-study content, analytics, URLs, public access, and backend behavior unchanged.
- Code cleanup is intentionally deferred until this UI pass is complete.
