import { useThemeColor } from "@/hooks/useThemeColor";
import {
	KeyboardAvoidingView,
	Modal,
	Platform,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import { ThemedText } from "../ThemedText";

export const ModalCustom = ({
	open,
	title,
	children,
	onClose,
}: {
	open: boolean;
	title: string;
	children: React.ReactNode;
	onClose?: () => void;
}) => {
	const surface = useThemeColor({}, "surface" as any);

	return (
		<Modal
			visible={open}
			animationType='fade'
			transparent
			statusBarTranslucent
			onRequestClose={onClose}
		>
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.select({
					ios: "padding",
					android: "height",
					default: undefined,
				})}
				keyboardVerticalOffset={Platform.select({
					ios: 24,
					android: 0,
					default: 0,
				})}
			>
				<TouchableOpacity
					style={styles.modalBackdrop}
					activeOpacity={1}
					onPress={onClose}
				>
					<TouchableOpacity
						style={styles.modalCard}
						activeOpacity={1}
						onPress={e => e.stopPropagation()}
					>
						{title && (
							<ThemedText type='title' style={styles.modalTitle}>
								{title}
							</ThemedText>
						)}
						{children}
					</TouchableOpacity>
				</TouchableOpacity>
			</KeyboardAvoidingView>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalBackdrop: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.4)",
		justifyContent: "flex-end" as const,
	},
	modalCard: {
		padding: 16,
		borderTopLeftRadius: 12,
		borderTopRightRadius: 12,
		gap: 10,
		backgroundColor: "#fff",
	},
	modalTitle: { marginBottom: 5, textAlign: "center", fontSize: 22 as const },
});
