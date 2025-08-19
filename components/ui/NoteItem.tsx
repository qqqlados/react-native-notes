import { Note } from "@/types/note";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../ThemedText";

export const NoteItem = ({
	note,
	onPress,
}: {
	note: Note;
	onPress?: () => void;
}) => {
	return (
		<TouchableOpacity onPress={onPress}>
			<View style={styles.container}>
				<View style={styles.content}>
					<ThemedText style={styles.title} numberOfLines={1}>
						{note.title}
					</ThemedText>
					<ThemedText style={styles.text} numberOfLines={1}>
						{note.text}
					</ThemedText>
				</View>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		maxHeight: 80,
		backgroundColor: "#fff",
		paddingHorizontal: 12,
		justifyContent: "center",
		borderRadius: 12,
		padding: 12,
	},
	content: {
		gap: 2,
	},
	title: {
		fontWeight: "700",
	},
	text: {
		color: "#6b7280",
	},
});
