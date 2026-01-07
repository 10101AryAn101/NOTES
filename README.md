# Notes app

This is a small notes application I built with Next.js (App Router), MongoDB (using Mongoose) and Tailwind CSS.

You can create notes, edit them and delete them. Each note has a title, content and a created time. Notes are shown in a simple card layout.

## Tech used

- Next.js (App Router, TypeScript)
- React
- MongoDB + Mongoose
- Tailwind CSS

## How to run

1. Install dependencies:

```bash
npm install
```

2. Set up environment variable in a `.env` file in the project root:

```bash
MONGODB_URI="mongodb+srv://<user>:<password>@<cluster>/<db>?appName=<app>"
```

3. Start the dev server:

```bash
npm run dev
```

4. Open `http://localhost:3000` in the browser.

## Main files (short overview)

- `app/layout.tsx` – basic layout and global styles
- `app/page.tsx` – loads notes and renders the main screen
- `app/actions.ts` – server actions for create / update / delete
- `lib/mongodb.ts` – MongoDB connection helper
- `models/note.ts` – note schema and queries
- `components/` – UI parts like note card, form, modal etc.

## What the UI does

- Shows all notes in a responsive grid
- "New note" button opens a modal with a form
- Edit and delete buttons are on each note card
- There is an empty state when there are no notes
- Simple toast messages show after create / update / delete
