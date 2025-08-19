import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "../ThemedText";

export const BackButton = () => {
	const router = useRouter();

	return (
		<TouchableOpacity onPress={() => router.back()} style={styles.container}>
			<ThemedText style={styles.text}>← Back</ThemedText>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingVertical: 8,
		paddingRight: 12,
	},
	text: {
		color: "#0c61c2",
		fontSize: 18,
	},
});
