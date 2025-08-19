import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import {
	ImageBackground,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";

export default function WelcomeScreen() {
	const router = useRouter();
	const primary = useThemeColor({}, "primary" as any);
	const text = useThemeColor({}, "text");
	const { t } = useTranslation();

	const handleStart = () => {
		router.push("/(tabs)/my-notes");
	};

	return (
		<ImageBackground
			source={require("../assets/images/welcome_bg.png")}
			style={styles.bg}
			resizeMode='cover'
		>
			<ThemedView
				style={[styles.container, { backgroundColor: "transparent" }]}
			>
				<View style={styles.langRow}>
					<LanguageSwitcher />
				</View>
				<View style={styles.content}>
					<View style={styles.header}>
						<ThemedText type='title' style={styles.title}>
							{t("home.welcomeTitle")}
						</ThemedText>
						<ThemedText style={styles.subtitle}>
							{t("home.welcomeSubtitle")}
						</ThemedText>
					</View>

					<View style={styles.quoteContainer}>
						<ThemedText style={[styles.quote, { color: text }]}>
							"{t("home.quote")}"
						</ThemedText>
						<ThemedText style={[styles.author, { color: text }]}>
							— {t("home.quoteAuthor")}
						</ThemedText>
					</View>

					<View style={styles.description}>
						<ThemedText style={[styles.descriptionText, { color: text }]}>
							{t("home.descriptionLine1")}
							{"\n"}
							{t("home.descriptionLine2")}
						</ThemedText>
					</View>
				</View>

				<View style={styles.footer}>
					<TouchableOpacity style={[styles.startButton]} onPress={handleStart}>
						<ThemedText style={styles.buttonText}>
							{t("common.start")}
						</ThemedText>
					</TouchableOpacity>
				</View>
			</ThemedView>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	bg: { flex: 1 },
	container: {
		flex: 1,
		padding: 24,
	},
	langRow: {
		alignItems: "flex-end",
	},
	content: {
		flex: 1,
		justifyContent: "flex-end",
		alignItems: "center",
	},
	header: {
		alignItems: "center",
		marginBottom: 60,
	},
	title: {
		fontSize: 36,
		fontWeight: "bold",
		marginBottom: 12,
		textAlign: "center",
	},
	subtitle: {
		fontSize: 18,
		opacity: 0.8,
		textAlign: "center",
	},
	quoteContainer: {
		alignItems: "center",
		marginBottom: 40,
		paddingHorizontal: 20,
	},
	quote: {
		fontSize: 20,
		fontStyle: "italic",
		textAlign: "center",
		lineHeight: 28,
		marginBottom: 8,
	},
	author: {
		fontSize: 16,
		opacity: 0.7,
	},
	description: {
		alignItems: "center",
		paddingHorizontal: 20,
	},
	descriptionText: {
		fontSize: 16,
		textAlign: "center",
		lineHeight: 24,
		opacity: 0.8,
	},
	footer: {
		marginTop: 30,
		alignItems: "center",
	},
	startButton: {
		paddingHorizontal: 40,
		paddingVertical: 16,
		borderRadius: 12,
		minWidth: 200,
		alignItems: "center",
		borderWidth: 1,
		borderColor: "gold",
		backgroundColor: Colors.light.background,
	},
	buttonText: {
		color: "gold",
		fontSize: 18,
		fontWeight: "700",
	},
});
