import type { Note } from "@/types/note";
import { create } from "zustand";
import { notesApi } from "../services/notesApi";

export type NotesState = {
	notes: Note[];
	isLoading: boolean;
	error?: string;

	fetchNotes: () => Promise<void>;
	fetchNoteById: (id: number) => Promise<void>;
	createNote: (note: Note) => Promise<void>;
	updateNote: (
		id: number,
		payload: Partial<Pick<Note, "text" | "title">>
	) => Promise<void>;
	deleteNote: (id: number) => Promise<void>;
};

export const useNotesStore = create<NotesState>((set, get) => ({
	notes: [],
	isLoading: true,

	async fetchNotes() {
		set({ isLoading: true, error: undefined });
		return notesApi
			.getAll()
			.then(data => {
				if ("message" in data) {
					set({ error: data.message, isLoading: false });
				} else {
					set({ notes: data, isLoading: false });
				}
			})
			.catch(err => {
				set({
					isLoading: false,
					error: err?.message ?? "Failed to load notes",
				});
			});
	},

	async fetchNoteById(id: number) {
		set({ isLoading: true, error: undefined });
		return notesApi
			.getById(String(id))
			.then(data => {
				if ("message" in data) {
					set({ error: data.message, isLoading: false });
				} else {
					set({ notes: [data], isLoading: false });
				}
			})
			.catch(err => {
				set({
					isLoading: false,
					error: err?.message ?? "Failed to load note",
				});
			});
	},

	async createNote(note) {
		const prev = get().notes;
		set({ notes: [note, ...prev], error: undefined });
		return notesApi
			.create(note)
			.then(created => {
				if ("message" in created) {
					set({ error: created.message, isLoading: false });
				} else {
					set({ notes: [created, ...prev.filter(n => n.id !== note.id)] });
				}
			})
			.catch(err => {
				set({ notes: prev, error: err?.message ?? "Failed to create note" });
			});
	},

	async updateNote(id, payload) {
		const prevNotes = get().notes;
		set({
			notes: prevNotes.map(n =>
				n.id === Number(id) ? { ...n, ...payload } : n
			),
			error: undefined,
		});
		return notesApi
			.update(String(id), payload)
			.then(updated => {
				if ("message" in updated) {
					set({ error: updated.message, isLoading: false });
				} else {
					set({
						notes: get().notes.map(n => (n.id === Number(id) ? updated : n)),
					});
				}
			})
			.catch(err => {
				set({
					notes: prevNotes,
					error: err?.message ?? "Failed to update note",
				});
			});
	},

	async deleteNote(id) {
		const prevNotes = get().notes;
		set({
			notes: prevNotes.filter(n => n.id !== Number(id)),
			error: undefined,
		});
		return notesApi
			.delete(String(id))
			.then(() => {
				set({ notes: prevNotes.filter(n => n.id !== Number(id)) });
			})
			.catch(err => {
				set({
					notes: prevNotes,
					error: err?.message ?? "Failed to delete note",
				});
			});
	},
}));
