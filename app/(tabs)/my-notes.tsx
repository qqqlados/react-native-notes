import { useEffect, useMemo } from "react";
import { FlatList, Image, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Loader } from "@/components/ui/Loader";
import { NoteItem } from "@/components/ui/NoteItem";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useNotesStore } from "@/store/NotesStore";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

export default function MyNotesScreen() {
	const fetchNotes = useNotesStore(state => state.fetchNotes);
	const updateNote = useNotesStore(state => state.updateNote);
	const deleteNote = useNotesStore(state => state.deleteNote);
	const notes = useNotesStore(state => state.notes);
	const isLoading = useNotesStore(state => state.isLoading);

	const router = useRouter();
	const { t } = useTranslation();

	useEffect(() => {
		fetchNotes();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const primary = useThemeColor({}, "primary" as any);

	const empty = useMemo(
		() => (
			<View style={styles.emptyWrap}>
				<Image
					source={require("@/assets/images/note_img.png")}
					style={{ width: 300, height: 300 }}
				/>
				<ThemedText style={{ textAlign: "center" }}>
					{t("notes.noNotes")}
				</ThemedText>
			</View>
		),
		[t]
	);

	if (isLoading) {
		return <Loader size='large' color={primary} />;
	}

	return (
		<ThemedView style={styles.wrapper}>
			<View style={styles.header}>
				<ThemedText type='title' style={styles.title}>
					{t("notes.myNotesTitle")}
				</ThemedText>
			</View>

			{isLoading ? (
				<Loader size='large' color={primary} />
			) : (
				<FlatList
					data={notes}
					contentContainerStyle={{
						flex: 1,
						gap: 5,
						paddingBottom: 40,
					}}
					keyExtractor={item => String(item.id)}
					renderItem={({ item }) => (
						<NoteItem
							note={item}
							onPress={() => router.push(`/my-notes/${item.id}` as any)}
						/>
					)}
					ListEmptyComponent={empty}
				/>
			)}
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		paddingVertical: 24,
		paddingHorizontal: 12,
		backgroundColor: "rgba(0,0,0,0.01)",
	},
	header: {
		marginLeft: 12,
	},
	title: {
		marginBottom: 12,
	},
	loader: { flex: 1, alignItems: "center", justifyContent: "center" },
	emptyWrap: {
		flex: 1,
		padding: 16,
		alignItems: "center",
		justifyContent: "center",
		gap: 20,
	},
});
