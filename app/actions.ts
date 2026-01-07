"use server";

import { revalidatePath } from "next/cache";
import { getNoteCollection } from "@/models/note";

interface NotePayload {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export async function createNote(formData: FormData): Promise<NotePayload> {
  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();

  if (!title || !content) {
    throw new Error("Title and content are required");
  }

  const NoteModel = await getNoteCollection();
  const created = await NoteModel.create({ title, content });

  revalidatePath("/");

  return {
    id: String(created._id),
    title: created.title,
    content: created.content,
    createdAt: created.createdAt?.toISOString?.() ?? new Date().toISOString(),
  };
}

export async function updateNote(id: string, formData: FormData): Promise<NotePayload> {
  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();

  if (!id) {
    throw new Error("Note id is required");
  }

  const NoteModel = await getNoteCollection();
  const updated = await NoteModel.findByIdAndUpdate(id, { title, content }, { new: true });

  if (!updated) {
    throw new Error("Note not found");
  }

  revalidatePath("/");

  return {
    id: String(updated._id),
    title: updated.title,
    content: updated.content,
    createdAt: updated.createdAt?.toISOString?.() ?? new Date().toISOString(),
  };
}

export async function deleteNote(id: string): Promise<{ id: string }> {
  if (!id) {
    throw new Error("Note id is required");
  }

  const NoteModel = await getNoteCollection();
  await NoteModel.findByIdAndDelete(id);

  revalidatePath("/");

  return { id };
}
