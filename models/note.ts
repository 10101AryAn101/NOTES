import { Schema, models, model, type Model } from 'mongoose';
import { connectToDatabase } from '@/lib/mongodb';

export interface Note {
  title: string;
  content: string;
  createdAt: Date;
}

export interface NoteDocument extends Note {
  _id: string;
}

export interface NoteDTO {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

const NoteSchema = new Schema<NoteDocument>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: () => new Date(),
      immutable: true,
    },
  },
  {
    timestamps: false,
  },
);

function getNoteModel() {
  return (models.Note as Model<NoteDocument>) || model<NoteDocument>('Note', NoteSchema);
}

export async function getNoteCollection() {
  await connectToDatabase();
  return getNoteModel();
}

export async function fetchAllNotes(): Promise<NoteDTO[]> {
  const NoteModel = await getNoteCollection();
  const docs = await NoteModel.find().sort({ createdAt: -1 }).lean();
  return docs.map((doc) => ({
    id: String(doc._id),
    title: doc.title,
    content: doc.content,
    createdAt:
      (doc.createdAt as Date | undefined)?.toISOString?.() ?? new Date().toISOString(),
  }));
}
