

## Plan: Three Fixes

### 1. Remove Download PDF button (Resume page)
Remove the `<a href="/resume/..."><Button>Download PDF</Button></a>` block (lines 173-177 in `Resume.tsx`), keeping only the "Save as PDF" print button.

### 2. Scroll to top on route change
Add a `ScrollToTop` component that calls `window.scrollTo(0, 0)` on every `location.pathname` change, and place it inside `<BrowserRouter>` in `App.tsx`.

### 3. Fix device toggle scroll jump in ResponsiveAppShell
Remove the `useEffect` on lines 41-49 of `ResponsiveAppShell.tsx` that scrolls the page (`window.scrollTo`) when `forcedLayout` changes. This is the code causing the page to jump when toggling between mobile/desktop views.

