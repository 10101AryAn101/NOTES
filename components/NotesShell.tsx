"use client";

import { useState } from "react";
import { createNote, updateNote, deleteNote } from "@/app/actions";
import { Modal } from "@/components/Modal";
import { NoteCard } from "@/components/NoteCard";
import { NoteForm } from "@/components/NoteForm";
import { ToastProvider, useToast } from "@/components/Toast";

interface NoteDTO {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

interface NotesShellProps {
  initialNotes: NoteDTO[];
}

function NotesShellInner({ initialNotes }: NotesShellProps) {
  const [notes, setNotes] = useState(initialNotes);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mode, setMode] = useState<"create" | "edit" | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const { pushToast } = useToast();

  const activeNote = mode === "edit" ? notes.find((n) => n.id === activeId) : undefined;

  function openCreateModal() {
    setMode("create");
    setActiveId(null);
  }

  function openEditModal(id: string) {
    setMode("edit");
    setActiveId(id);
  }

  function closeModal() {
    setActiveId(null);
    setMode(null);
  }

  function closeDeleteDialog() {
    setDeleteTargetId(null);
  }

  async function handleCreate(formData: FormData) {
    const created = await createNote(formData);
    setNotes((current) => [created, ...current]);
    pushToast("Note created");
  }

  async function handleUpdate(formData: FormData) {
    if (!activeId) return;
    const updated = await updateNote(activeId, formData);
    setNotes((current) => current.map((note) => (note.id === updated.id ? updated : note)));
    pushToast("Note updated");
  }

  async function handleDelete() {
    if (!deleteTargetId) return;
    const result = await deleteNote(deleteTargetId);
    setNotes((current) => current.filter((note) => note.id !== result.id));
    pushToast("Note deleted");
    setDeleteTargetId(null);
  }

  const hasNotes = notes.length > 0;

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-sm font-semibold text-slate-200 sm:text-base">Your notes</h2>
          <p className="mt-1 text-xs text-slate-400 sm:text-sm">
            Quickly capture ideas, decisions, and todos in lightweight cards.
          </p>
        </div>
        <button type="button" className="button-primary" onClick={openCreateModal}>
          New note
        </button>
      </div>

      {hasNotes ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              id={note.id}
              title={note.title}
              content={note.content}
              createdAt={note.createdAt.toString()}
              onEdit={openEditModal}
              onDelete={setDeleteTargetId}
            />
          ))}
        </div>
      ) : (
        <div className="card-surface flex flex-col items-center justify-center gap-3 border border-dashed border-slate-700/70 px-6 py-10 text-center">
          <p className="text-sm font-medium text-slate-200">No notes yet</p>
          <p className="max-w-sm text-xs text-slate-400 sm:text-sm">
            Start by creating your first note. Use it to jot down a thought, plan a task, or capture a meeting outcome.
          </p>
          <button type="button" className="button-primary" onClick={openCreateModal}>
            Create a note
          </button>
        </div>
      )}

      <Modal
        open={mode === "create"}
        title="New note"
        description="Give your note a clear title and a short, focused description."
        onClose={closeModal}
      >
        <NoteForm mode="create" action={handleCreate} onSubmitSuccess={closeModal} />
      </Modal>

      <Modal
        open={mode === "edit" && Boolean(activeId)}
        title="Edit note"
        description="Update the content to reflect changes or new decisions."
        onClose={closeModal}
      >
        <NoteForm
          mode="edit"
          initialTitle={activeNote?.title}
          initialContent={activeNote?.content}
          action={handleUpdate}
          onSubmitSuccess={closeModal}
        />
      </Modal>

      <Modal
        open={Boolean(deleteTargetId)}
        title="Delete note"
        description="This action cannot be undone. The note will be permanently removed."
        onClose={closeDeleteDialog}
      >
        <div className="space-y-4 text-sm text-slate-200">
          <p>Are you sure you want to delete this note?</p>
          <div className="flex justify-end gap-2">
            <button type="button" className="button-ghost" onClick={closeDeleteDialog}>
              Cancel
            </button>
            <form action={handleDelete}>
              <button type="submit" className="button-primary bg-red-500/90 hover:bg-red-400">
                Delete
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export function NotesShell(props: NotesShellProps) {
  return (
    <ToastProvider>
      <NotesShellInner {...props} />
    </ToastProvider>
  );
}
