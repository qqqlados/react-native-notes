import { ThemedText } from "@/components/ThemedText";
import { useNotesStore } from "@/store/NotesStore";
import { Note } from "@/types/note";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Loader } from "../Loader";
import { ModalCustom } from "../Modal";

export const DeleteNoteModal = ({
	note,
	open,
	onClose,
}: {
	note: Note;
	open: boolean;
	onClose: () => void;
}) => {
	const [loading, setLoading] = useState(false);
	const deleteNote = useNotesStore(state => state.deleteNote);
	const router = useRouter();
	const { t } = useTranslation();

	const onDelete = async () => {
		setLoading(true);
		setTimeout(async () => {
			await deleteNote(note.id);
			router.back();
			onClose();
		}, 2000);
	};

	return (
		<ModalCustom open={open} title={t("deleteNote.confirm")} onClose={onClose}>
			{loading ? (
				<Loader
					size='large'
					containerStyle={{
						position: "fixed",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
					}}
				/>
			) : (
				<View style={styles.actions}>
					<TouchableOpacity
						onPress={onClose}
						style={[styles.button, styles.cancelButton]}
					>
						<ThemedText>{t("common.cancel")}</ThemedText>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={onDelete}
						style={[styles.button, styles.deleteButton]}
					>
						<ThemedText style={{ color: "#fff" }}>
							{t("common.delete")}
						</ThemedText>
					</TouchableOpacity>
				</View>
			)}
		</ModalCustom>
	);
};

const styles = StyleSheet.create({
	actions: {
		alignSelf: "center",
		alignItems: "center",
		flexDirection: "row",
		gap: 10,
		marginVertical: 20,
	},
	button: {
		paddingVertical: 12,
		paddingHorizontal: 16,
		alignSelf: "center",
		alignItems: "center",
		borderRadius: 8,
		fontWeight: "700",
		width: 150,
		height: 45,
	},
	deleteButton: {
		backgroundColor: "red",
		color: "white",
	},
	cancelButton: {
		backgroundColor: "white",
		color: "black",
	},
});
