# Standardize and Simplify Homepage Cards

## Card system
- Give project and skill cards one spacing rhythm: consistent internal padding, heading and body sizes, reserved title/description space, predictable line clamps, and equal-height grid rows.
- Keep the most useful scan-level content visible: preview, project or skill category name, and a short summary.
- Move project results and tags, and skill lists, into an accessible “View details” disclosure so scanning is quieter.
- Use the same “View details” label and chevron treatment on every card.

## Interaction and accessibility
- Separate interactive previews from navigation so controls are not nested inside a card-wide link.
- Give each project a clearly labeled “View case study” link after its details control; skill cards use “View details” as their single action because they have no destination page.
- Add visible keyboard focus rings, meaningful card region labels, expanded-state announcements, and unique relationships between each details control and its content.
- Ensure mobile tap targets are at least 44px and decorative icons are hidden from assistive technology.

## Preview responsiveness
- Update the interactive shell to measure its actual container rather than the browser window.
- Scale desktop mode to fit the available card width and height without clipping, including when desktop mode is selected on a phone-sized screen.
- Keep the mobile/desktop switch reachable, labeled, and keyboard operable in either mode.

## Validation
- Test every homepage project and skill card with keyboard-only navigation.
- Switch interactive projects between mobile and desktop modes at desktop and phone viewport sizes and check for clipping or horizontal page overflow.
- Verify details expansion, card alignment, dark mode contrast, reduced-motion behavior, and the latest build status.

## Technical details
- Refactor the project card away from a card-wide link and use the shared Button primitive for actions.
- Use the existing collapsible primitive for disclosure behavior and `ResizeObserver` for container-aware preview sizing.
- Apply the same card treatment wherever the shared project card appears, including the senior UX designer page.
