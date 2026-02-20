
# Add Interactive Previews to EBT Finder and Beles Project Cards

## What Changes
Replace the static hero mockup images on the EBT Finder and Beles project cards with interactive phone previews -- matching the existing OneAsure card treatment (pulsing "Interactive Preview" badge + phone shell with live, scrollable content).

## Design Based on Screenshots

### EBT Finder Interactive Demo
Recreate the app screen visible in the screenshot:
- **Status bar** (green) with time and icons
- **Search bar** with location/query text and a green send button
- **Category icon row**: scrollable pills with food-type icons (All, Fast Food, Grocery, Bakery, Farmers Market, etc.) -- tappable to toggle active state
- **Restaurant result card(s)**: "Dalle Kitchen" style card with a gradient food photo placeholder, store name, address, star rating, and a green "VIEW DETAILS" button
- 2-3 store cards to make scrolling feel real
- **Bottom navigation**: Home, Search, Wishlist, Profile icons
- Green/teal color palette (#2d8a4e style) matching the screenshot

### Beles Interactive Demo
Recreate the match screen visible in the screenshot:
- **Status bar** with time
- **"It's a match, Berhane!"** heading text with subtitle
- **Two overlapping profile photo circles** with heart icons (using colored placeholder avatars)
- **"Say Kemey"** button (yellow/gold, matching the Beles brand)
- **"Keep Swiping"** button (outlined)
- Tapping "Say Kemey" triggers a confetti/celebration animation and transitions to a "Message sent!" confirmation state
- Tapping "Keep Swiping" resets to show a new match name
- Dark/warm background tone matching the screenshot

### ProjectCard Update
Generalize the interactive preview logic:
- Create a `demoComponents` map: `{ "oneasure-portal": BenefitsModuleDemo, "ebtfinder": EBTSearchDemo, "beles": BelesMatchDemo }`
- Any project with a mapped demo gets the phone shell + pulsing badge -- whether featured or not
- Non-featured cards use a slightly smaller phone shell (200px wide, 340px tall) so they fit the grid cards
- Featured card keeps the current 220px wide, 380px tall shell

---

## Technical Details

### New Files

**`src/components/case-study/EBTSearchDemo.tsx`**
- Self-contained component styled with inline styles (like BenefitsModuleDemo)
- Green color palette (#2d8a4e brand, #e8f5e9 backgrounds)
- Stateful category filter pills (tap to select)
- 3 store result cards with food imagery gradients, name, address, rating stars, "ACCEPTS EBT" badge, "VIEW DETAILS" button
- Fixed bottom nav bar (Home, Search, Wishlist, Profile)
- Tapping "VIEW DETAILS" shows a simple detail overlay with a back button

**`src/components/case-study/BelesMatchDemo.tsx`**
- Dark/warm themed to match the Beles screenshot aesthetic
- "It's a match!" screen with two overlapping avatar circles
- "Say Kemey" (gold) and "Keep Swiping" buttons
- Tapping "Say Kemey" animates hearts and shows a confirmation state
- Tapping "Keep Swiping" cycles to the next match name
- Subtle Framer Motion animations for transitions

### Modified File

**`src/components/ProjectCard.tsx`**
- Import `EBTSearchDemo` and `BelesMatchDemo`
- Create `demoComponents` record mapping project IDs to their demo components
- Replace the `isOneasure` conditional with a generic check: `const DemoComponent = demoComponents[project.id]`
- If `DemoComponent` exists, render the phone shell + badge (for both featured and non-featured)
- Non-featured cards: phone shell at 200px wide, 340px content height, centered in the card area with `bg-muted/30` background and vertical padding
- Featured cards: keep current 220px wide, 380px content height
