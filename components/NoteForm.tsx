"use client";

import { useEffect, useState } from "react";

interface NoteFormProps {
  mode: "create" | "edit";
  initialTitle?: string;
  initialContent?: string;
  action: (formData: FormData) => Promise<void>;
  onSubmitSuccess?: () => void;
}

export function NoteForm({ mode, initialTitle = "", initialContent = "", action, onSubmitSuccess }: NoteFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
  }, [initialTitle, initialContent]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.set("title", title);
      formData.set("content", content);
      await action(formData);
      if (onSubmitSuccess) onSubmitSuccess();
    } catch (err) {
      console.error(err);
      setError("Something went wrong while saving the note.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="space-y-1.5">
        <label className="block text-xs font-medium text-slate-300">Title</label>
        <input
          className="input-base"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Quick summary of your idea"
        />
      </div>
      <div className="space-y-1.5">
        <label className="block text-xs font-medium text-slate-300">Content</label>
        <textarea
          className="textarea-base"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Capture details, decisions, and follow-ups..."
        />
      </div>
      {error ? <p className="text-xs text-red-400">{error}</p> : null}
      <div className="flex items-center justify-end gap-2 pt-1">
        <button
          type="submit"
          disabled={submitting}
          className="button-primary px-5"
        >
          {submitting ? (mode === "create" ? "Creating..." : "Saving...") : mode === "create" ? "Create note" : "Save changes"}
        </button>
      </div>
    </form>
  );
}
