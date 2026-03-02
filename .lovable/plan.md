

## AI Portfolio Chatbot — Plan

### What it does
A floating chat widget (bottom-right bubble) powered by Lovable AI that answers recruiter questions about Huruy's background, projects, skills, and availability. It uses a warm, conversational tone — like chatting with Huruy himself.

### Knowledge base (system prompt)
The chatbot's system prompt will be hardcoded in an edge function and include:
- **Bio**: 8+ years UX/Product Design, B.S. Psychology (Ergonomics & Human Factors), CSU Eastbay
- **Work history**: Asure Software (2023–present), IMMERSE (2020–2023), Datable (2016–2020)
- **Leadership**: HPN4Tigray communications lead (2020–present)
- **Projects**: All 5 portfolio projects with summaries, roles, outcomes, and tools
- **Skills**: Full expertise list from About page (UX/UI, Research, Design Systems, Dev, Collaboration, AI)
- **Availability**: Open to relocation, ready to help organizations with product design, UX design, and AI needs. Top 1% in Lovable. Always loves to learn.
- **Contact**: huruydesigns@gmail.com, linkedin.com/in/huruydesigns

### Chatbot behavior rules
- **Link to projects**: When asked about a specific project, respond with a clickable link to `/project/{id}`
- **Offer resume**: When asked, provide link to `/resume` page
- **Suggest contact**: Nudge toward the contact page or email when appropriate
- **Decline off-topic**: Politely redirect non-portfolio questions ("I'm Huruy's portfolio assistant — happy to chat about his work and experience!")
- **Tone**: Warm, conversational, confident but not salesy

### Architecture

```text
┌─────────────────────┐
│  ChatBubble (React)  │  Floating button + expandable panel
│  └─ streamChat()     │  SSE streaming via fetch
└──────────┬──────────┘
           │ POST /functions/v1/portfolio-chat
           ▼
┌─────────────────────┐
│  Edge Function       │  System prompt with full portfolio context
│  portfolio-chat      │  Calls Lovable AI Gateway (gemini-3-flash)
│                      │  Streams response back via SSE
└─────────────────────┘
```

### Components to build

1. **Edge function** (`supabase/functions/portfolio-chat/index.ts`)
   - System prompt with all portfolio knowledge baked in
   - Streams via Lovable AI Gateway using `google/gemini-3-flash-preview`
   - Handles 429/402 errors gracefully
   - `verify_jwt = false` in config.toml

2. **ChatBubble component** (`src/components/ChatBubble.tsx`)
   - Floating button (bottom-right, accent-colored message icon)
   - Expandable chat panel with message history
   - Token-by-token streaming display
   - Markdown rendering for AI responses
   - 3-4 suggested starter questions ("What projects has Huruy worked on?", "What tools does Huruy use?", "Is Huruy open to new opportunities?")
   - Close/minimize button
   - Mobile-responsive (full-width on small screens)

3. **Integration** — Add `<ChatBubble />` to `Layout.tsx` so it appears on every page

### Starter questions (shown as chips)
- "What has Huruy worked on?"
- "What are Huruy's top skills?"
- "Is Huruy open to new roles?"
- "Tell me about the EBT Finder project"

