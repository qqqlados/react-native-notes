import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useNotesStore } from "@/store/NotesStore";
import { Note } from "@/types/note";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { ModalCustom } from "../Modal";

export const EditNoteModal = ({
	note,
	open,
	onClose,
}: {
	note: Note;
	open: boolean;
	onClose: () => void;
}) => {
	const [title, setTitle] = useState(note.title);
	const [text, setText] = useState(note.text);
	const [saving, setSaving] = useState(false);

	const updateNote = useNotesStore(state => state.updateNote);

	const hasChanges = title !== note.title || text !== note.text;

	const saveBtnDisabled =
		saving || !title.trim() || !text.trim() || !hasChanges;

	const border = useThemeColor({}, "border" as any);

	const inputBg = useThemeColor({}, "inputBg" as any);

	const { t } = useTranslation();

	const onSave = async () => {
		setSaving(true);
		await updateNote(note.id, { title, text });
		setSaving(false);
		onClose();
	};

	return (
		<ModalCustom open={open} title={t("editNote.title")} onClose={onClose}>
			<TextInput
				style={[
					styles.input,
					{ borderColor: border, backgroundColor: inputBg },
				]}
				placeholder={t("createNote.placeholderTitle")}
				value={title}
				onChangeText={setTitle}
			/>
			<TextInput
				style={[
					styles.input,
					styles.multiline,
					{ borderColor: border, backgroundColor: inputBg },
				]}
				placeholder={t("editNote.placeholderText")}
				value={text}
				onChangeText={setText}
				multiline
			/>

			<TouchableOpacity
				onPress={onSave}
				disabled={saveBtnDisabled}
				style={[
					styles.button,
					(saving || saveBtnDisabled) && {
						opacity: 0.5,
					},
				]}
			>
				<Text style={styles.buttonText}>
					{saving ? t("common.saving") : t("common.save")}
				</Text>
			</TouchableOpacity>
		</ModalCustom>
	);
};

const styles = StyleSheet.create({
	input: {
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 12,
		paddingVertical: 10,
	},
	multiline: { minHeight: 100, textAlignVertical: "top" },
	row: { flexDirection: "row", justifyContent: "space-between" },
	button: {
		textAlign: "center",
		paddingVertical: 12,
		paddingHorizontal: 16,
		alignSelf: "center",
		alignItems: "center",
		borderRadius: 8,
		fontWeight: "700",
		width: 150,
		height: 40,
		backgroundColor: Colors.dark.icon,
	},
	buttonText: {
		color: Colors.light.background,
	},
});
