import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Loader } from "@/components/ui/Loader";
import { DeleteNoteModal } from "@/components/ui/modals/delete-note-modal";
import { EditNoteModal } from "@/components/ui/modals/edit-note-modal";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useNotesStore } from "@/store/NotesStore";
import { useTranslation } from "react-i18next";

export default function NoteDetailScreen() {
	const router = useRouter();
	const { id } = useLocalSearchParams<{ id: string }>();

	const fetchNoteById = useNotesStore(state => state.fetchNoteById);
	const notes = useNotesStore(state => state.notes);
	const isLoading = useNotesStore(state => state.isLoading);

	const [editModalOpen, setEditModalOpen] = useState(false);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);

	const primary = useThemeColor({}, "primary" as any);
	const danger = useThemeColor({}, "danger" as any);
	const icon = useThemeColor({}, "icon");
	const { t } = useTranslation();

	// Найти заметку по ID
	const note = notes.find(n => String(n.id) === id);

	useEffect(() => {
		if (id && !note) {
			fetchNoteById(Number(id));
		}
	}, [id, note, fetchNoteById]);

	if (isLoading) {
		return;
	}

	if (!note) {
		return (
			<SafeAreaView style={styles.safe}>
				<ThemedView style={styles.loader}>
					<ThemedText>{t("notes.notFound")}</ThemedText>
				</ThemedView>
			</SafeAreaView>
		);
	}

	return (
		<ThemedView style={styles.wrapper}>
			{isLoading ? (
				<Loader size='large' color={primary} />
			) : (
				<>
					<View style={styles.header}>
						<TouchableOpacity
							onPress={() => router.back()}
							style={styles.backButton}
						>
							<ThemedText style={{ color: icon }}>
								← {t("common.back")}
							</ThemedText>
						</TouchableOpacity>
						<View style={styles.headerActions}>
							<TouchableOpacity
								onPress={() => setEditModalOpen(true)}
								style={styles.actionButton}
							>
								<IconSymbol name='pencil' size={24} color={primary} />
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => setDeleteModalOpen(true)}
								style={styles.actionButton}
							>
								<IconSymbol name='trash' size={24} color={danger} />
							</TouchableOpacity>
						</View>
					</View>

					<View style={styles.content}>
						<View style={styles.noteHeader}>
							<ThemedText type='title'>{note.title}</ThemedText>

							{note.createdAt && (
								<ThemedText style={[styles.noteDate, { color: icon }]}>
									{t("notes.createdAt")}{" "}
									{new Date(note.createdAt).toLocaleDateString()}
								</ThemedText>
							)}
						</View>

						<ThemedText style={styles.noteText}>{note.text}</ThemedText>
					</View>
				</>
			)}

			{editModalOpen && (
				<EditNoteModal
					note={note}
					open={editModalOpen}
					onClose={() => setEditModalOpen(false)}
				/>
			)}
			{deleteModalOpen && (
				<DeleteNoteModal
					note={note}
					open={deleteModalOpen}
					onClose={() => setDeleteModalOpen(false)}
				/>
			)}
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	safe: { flex: 1 },
	wrapper: {
		flex: 1,
	},
	loader: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: "#e5e7eb",
	},
	backButton: {
		padding: 8,
	},
	headerActions: {
		flexDirection: "row",
		gap: 12,
	},
	actionButton: {
		padding: 8,
	},
	content: {
		flex: 1,
		padding: 16,
		gap: 16,
	},
	noteHeader: {
		flexDirection: "column",
		gap: 8,
		alignItems: "flex-start",
		justifyContent: "flex-start",
	},
	noteText: {
		lineHeight: 24,
		flex: 1,
	},
	noteDate: {
		fontSize: 14,
	},
});
