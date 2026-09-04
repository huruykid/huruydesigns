# Simplify the Homepage Opening

## Goal
Make the first screen feel more deliberate, senior, and focused on Huruy's positioning rather than decorative effects.

## Changes
- Remove the orange dot grid from the homepage opening.
- Remove the three blurred orange background shapes and the decorative background gradient.
- Preserve the current content, calls to action, spacing, and project section below.
- Keep the orange accent where it carries meaning, such as the name, availability status, and primary action.

## Validation
- Check the opening at desktop and mobile sizes to ensure the clean background still has balanced spacing and hierarchy.
- Confirm no empty decorative elements remain and that dark mode remains legible.
- Confirm the page builds without errors.

## Technical details
- Delete the homepage-only `DotGrid` element and its SVG definition.
- Remove only the decorative background layers from the opening section. No content or workflow changes.
