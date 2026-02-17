

## Replace Remaining Static ImageSlots with Interactive Components

### Overview
Replace 4 of the 9 remaining ImageSlots with interactive, animated components. The other 5 remain as ImageSlots since they need real screenshots (personas, wireframes, visual design, shmagele screens, appendix).

---

### 1. Usability Testing Results -- Animated Stat Bars
**Replaces:** `usability-testing` (line 228)

An animated bar chart component that visualizes the 4 key usability findings. Each bar animates from 0% to its value when scrolled into view using framer-motion's `whileInView`.

- 62.5% -- Lacked personal connection
- 37.5% -- Shmagele confusion
- 50% -- Women: Just Friends
- 12.5% -- Men: Just Friends

Color-coded bars with labels. Simple, data-forward, reinforces research rigor.

**New file:** `src/components/case-study/UsabilityStatBars.tsx`

---

### 2. Navigation Before/After Comparison -- Interactive Slider
**Replaces:** `nav-redesign` (line 264)

A side-by-side or toggle-based before/after component (similar pattern to JustFriendsToggle). Users toggle between "Before" and "After" states to see:

- **Before:** 6 cramped nav icons (Home, Search, Matches, Events, Chat, Profile) with labels showing "cluttered" feedback
- **After:** 4 clean nav icons (Home, Matches, Events, Profile) with improved spacing and user satisfaction quote

Uses framer-motion crossfade. Styled as a mock phone nav bar.

**New file:** `src/components/case-study/NavRedesignComparison.tsx`

---

### 3. Event Discovery -- Animated Event Carousel
**Replaces:** `feature-events` (line 324)

A horizontally scrollable carousel of mock event cards, each styled as an app card with:
- Event name (Tigray Festival, Mekete Fundraiser, Cultural Workshop, Support Group)
- Date and location
- Attendee count
- RSVP button (toggles on click with animation)

Auto-scrolls gently, pausable on hover. Uses CSS scroll-snap or embla-carousel (already installed).

**New file:** `src/components/case-study/EventCarousel.tsx`

---

### 4. Match Notifications -- Animated Notification Stack
**Replaces:** `feature-notifications` (line 346)

Notifications appear one by one in a stacked toast-like animation (bottom to top), simulating the real app notification experience. Each notification slides in with a delay, stays briefly, then the next appears. Loops after all 4 have shown.

Uses the existing 4 notification messages. Styled as phone notification banners with app icon and timestamp.

**New file:** `src/components/case-study/NotificationStack.tsx`

---

### Modified File
**`src/components/case-study/BelesCaseStudy.tsx`**
- Import all 4 new components
- Replace ImageSlot at line 228 with `UsabilityStatBars`
- Replace ImageSlot at line 264 with `NavRedesignComparison`
- Replace ImageSlot at line 324 with `EventCarousel`
- Replace ImageSlot at line 346 with `NotificationStack`

### Dependencies
All components use already-installed packages: `framer-motion`, `lucide-react`, `embla-carousel-react`, and existing UI components.
