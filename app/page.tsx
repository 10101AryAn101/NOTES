import { Suspense } from "react";
import { fetchAllNotes } from "@/models/note";
import { NotesShell } from "@/components/NotesShell";
import { NoteSkeleton } from "@/components/NoteSkeleton";

async function NotesList() {
  const notes = await fetchAllNotes();
  return <NotesShell initialNotes={notes} />;
}

export default function Page() {
  return (
    <section className="space-y-4">
      <Suspense
        fallback={
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <NoteSkeleton key={index} />
            ))}
          </div>
        }
      >
        <NotesList />
      </Suspense>
    </section>
  );
}
