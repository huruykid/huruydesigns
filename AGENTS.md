# Architecture Rules

- Render the public Asure narrative from typed local content in the project page, so reading the complete case study does not depend on passcode verification or a backend request.
- Derive fintech employment details from resume data and render supporting projects through ProjectCard's optional context variant, so facts stay synchronized and homepage card output remains unchanged.
- Preserve every route's self-referencing canonical and og:url during prerendering, including the homepage, so raw HTML identifies the correct page before JavaScript runs.
- Restore saved App Store chats as alternating user/assistant turns with explicit interrupted-reply notices, so navigation and failed streams cannot permanently block continuation.