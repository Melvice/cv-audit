# CV Audit

AI-powered CV analysis using Next.js + Anthropic Claude.
Paste a job posting and your CV → get a match score, keyword gap analysis, and AI-rewritten bullet suggestions.

### [vercel app link](https://cv-audit.vercel.app/)
## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Anthropic SDK** (`claude-sonnet-4-6`
- vercel (for deployment)

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Add your API key
cp .env.example .env.local
# Edit .env.local and paste your key from https://console.anthropic.com

# 3. Run locally
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
cv-optimizer/
├── app/
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts       ← Anthropic API call (server-side)
│   ├── page.tsx               ← Main input form
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ResultsPanel.tsx       ← Score + keywords + rewrites
│   └── ScoreRing.tsx          ← Animated SVG score ring
├── types/
│   └── index.ts               ← Shared TypeScript types
├── .env.example               ← Copy to .env.local
└── package.json
```

## Deploy to Vercel

```bash
npx vercel
# Add ANTHROPIC_API_KEY in Vercel dashboard → Settings → Environment Variables
```

## How it works

1. User pastes job posting + CV in the browser
2. React calls `/api/analyze` (Next.js API route)
3. Server builds a structured prompt and calls Claude Sonnet
4. Claude returns JSON: score, matched/missing keywords, rewrite suggestions
5. Results render in the browser

The API key never touches the browser — it lives only in the server-side route.
