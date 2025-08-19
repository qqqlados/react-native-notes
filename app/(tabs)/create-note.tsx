import { useState } from "react";
import {
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { Loader } from "@/components/ui/Loader";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useNotesStore } from "@/store/NotesStore";
import type { Note } from "@/types/note";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

export default function CreateNoteScreen() {
	const createNote = useNotesStore(state => state.createNote);
	const isLoading = useNotesStore(state => state.isLoading);
	const [title, setTitle] = useState("");
	const [text, setText] = useState("");
	const [submitting, setSubmitting] = useState(false);
	const [isTitleFocused, setIsTitleFocused] = useState(false);
	const [isTextFocused, setIsTextFocused] = useState(false);

	const router = useRouter();
	const { t } = useTranslation();

	const primary = useThemeColor({}, "primary" as any);

	const onSubmit = async () => {
		if (!title.trim() || !text.trim()) return;
		setSubmitting(true);
		const newNote: Note = {
			id: Date.now(),
			title: title.trim(),
			text: text.trim(),
			createdAt: new Date().toISOString(),
		};
		await createNote(newNote);

		// I added this timeout for imitation of loading
		setTimeout(() => {
			setSubmitting(false);
			setTitle("");
			setText("");
			router.push(`/my-notes/${newNote.id}`);
		}, 2000);
	};

	if (submitting) {
		return <Loader size='large' color={primary} text={t("common.creating")} />;
	}

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.select({ ios: "padding", default: undefined })}
		>
			<View style={styles.wrapper}>
				<View style={styles.header}>
					<ThemedText type='title'>{t("createNote.title")}</ThemedText>
				</View>

				<View style={styles.form}>
					<TextInput
						style={[
							styles.input,
							isTitleFocused && {
								borderColor: "rgba(0,0,0,0.4)",
								borderWidth: 2,
							},
						]}
						placeholder={t("createNote.placeholderTitle")}
						value={title}
						onChangeText={setTitle}
						onFocus={() => setIsTitleFocused(true)}
						onBlur={() => setIsTitleFocused(false)}
					/>
					<TextInput
						style={[
							styles.input,
							styles.multiline,
							{ backgroundColor: "#fff" },
							isTextFocused && {
								borderColor: "rgba(0,0,0,0.4)",
								borderWidth: 2,
							},
						]}
						placeholder={t("createNote.placeholderText")}
						value={text}
						onChangeText={setText}
						multiline
						onFocus={() => setIsTextFocused(true)}
						onBlur={() => setIsTextFocused(false)}
					/>
					<TouchableOpacity
						onPress={onSubmit}
						disabled={submitting || !title.trim() || !text.trim()}
						style={[
							styles.buttonPrimary,
							submitting ||
								((!title.trim() || !text.trim()) && { opacity: 0.5 }),
						]}
					>
						<Text style={{ color: "white", fontSize: 15 }}>
							{submitting ? t("common.creating") : t("common.create")}
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.01)",
		paddingVertical: 24,
		paddingHorizontal: 12,
		gap: 24,
	},
	header: {
		marginLeft: 12,
	},
	form: { gap: 12 },
	input: {
		borderWidth: 1,
		borderColor: "rgba(0,0,0,0.3)",
		borderRadius: 8,
		paddingHorizontal: 12,
		paddingVertical: 10,
		backgroundColor: "#fff",
	},
	multiline: {
		minHeight: 140,
		maxHeight: 400,
		height: "100%",
		textAlignVertical: "top",
	},
	buttonPrimary: {
		marginHorizontal: "auto",
		justifyContent: "center",
		alignItems: "center",
		color: "white",
		paddingVertical: 12,
		borderRadius: 8,
		width: 150,
		backgroundColor: "purple",
	},
});
