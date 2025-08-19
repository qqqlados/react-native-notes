import type { Note } from "@/types/note";
import { axiosInstance } from "@/utils/axios";

export const notesApi = {
	async getAll(): Promise<Note[] | { message: string }> {
		try {
			const res = await axiosInstance.get(`/notes`);
			return res.data;
		} catch (err) {
			const error = err as { message: string };
			console.log(error.message);
			return { message: error.message };
		}
	},

	async getById(id: string): Promise<Note | { message: string }> {
		try {
			const res = await axiosInstance.get(`/notes/${String(id)}`);
			return res.data;
		} catch (err) {
			const error = err as { message: string };
			console.log(error.message);
			return { message: error.message };
		}
	},

	async create(note: Note): Promise<Note | { message: string }> {
		try {
			const res = await axiosInstance.post(`/notes`, note);
			return res.data.note;
		} catch (err) {
			const error = err as { message: string };
			console.log(error.message);
			return { message: error.message };
		}
	},

	async update(
		id: string,
		payload: Partial<Pick<Note, "text" | "title">>
	): Promise<Note | { message: string }> {
		try {
			const res = await axiosInstance.put(`/notes/${String(id)}`, payload);
			return res.data.note;
		} catch (err) {
			const error = err as { message: string };
			console.log(error.message);
			return { message: error.message };
		}
	},

	async delete(id: string): Promise<{ message: string }> {
		try {
			await axiosInstance.delete(`/notes/${String(id)}`);
			return { message: "Note deleted successfully" };
		} catch (err) {
			const error = err as { message: string };
			console.log(error.message);
			return { message: error.message };
		}
	},
};
