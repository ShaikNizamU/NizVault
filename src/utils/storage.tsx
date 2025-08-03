import EncryptedStorage from 'react-native-encrypted-storage';
import { v4 as uuidv4 } from 'uuid';

export type Note = {
  id: string;
  title: string;
  content: string;
};

const STORAGE_KEY = 'secure_notes';

export const saveNote = async (
  title: string,
  content: string,
): Promise<void> => {
  const existing = await getNotes(); // fetch existing
  const newNote = {
    id: Date.now(),
    title,
    content,
    createdAt: new Date().toISOString(),
  };
  const updatedNotes = [...existing, newNote];
  await EncryptedStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotes));
};

export const getNotes = async (): Promise<Note[]> => {
  const result = await EncryptedStorage.getItem(STORAGE_KEY);
  return result ? JSON.parse(result) : [];
};

export const getNoteById = async (id: string): Promise<Note | undefined> => {
  const notes = await getNotes();
  return notes.find(note => note.id === id);
};

export const deleteNote = async (id: string) => {
  const notes = await getNotes();
  const filtered = notes.filter(note => note.id !== id);
  await EncryptedStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};
