import { useThemeColor } from "@/hooks/useThemeColor";
import {
	ActivityIndicator,
	StyleProp,
	StyleSheet,
	View,
	ViewStyle,
} from "react-native";
import { ThemedText } from "../ThemedText";

export const Loader = ({
	size = "large",
	color = "primary",
	text = "Loading...",
	containerStyle,
}: {
	size?: "small" | "large";
	color?: string;
	text?: string;
	containerStyle?: StyleProp<ViewStyle>;
}) => {
	const primary = useThemeColor({}, "primary" as any);

	return (
		<View style={[styles.container, containerStyle]}>
			<ActivityIndicator size={size} color={color} />
			<ThemedText style={{ color: primary }}>{text}</ThemedText>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "transparent",
	},
});
