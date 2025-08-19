import { ThemedText } from "@/components/ThemedText";
import i18n from "@/utils/languages";
import React, { useMemo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const LANGUAGES = [
	{ code: "en", label: "EN" },
	{ code: "fr", label: "FR" },
	{ code: "it", label: "IT" },
] as const;

export function LanguageSwitcher() {
	const current = i18n.language?.slice(0, 2) || "en";
	const items = useMemo(() => LANGUAGES, []);

	return (
		<View style={styles.container}>
			{items.map(l => {
				const active = current === l.code;
				return (
					<TouchableOpacity
						key={l.code}
						onPress={() => i18n.changeLanguage(l.code)}
						style={[styles.item, active && styles.itemActive]}
					>
						<ThemedText
							style={[styles.itemText, active && styles.itemTextActive]}
						>
							{l.label}
						</ThemedText>
					</TouchableOpacity>
				);
			})}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		gap: 8,
	},
	item: {
		paddingVertical: 6,
		paddingHorizontal: 10,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: "rgba(0,0,0,0.2)",
		backgroundColor: "rgba(255,255,255,0.6)",
	},
	itemActive: {
		backgroundColor: "rgba(0,0,0,0.75)",
		borderColor: "rgba(0,0,0,0.75)",
	},
	itemText: {
		fontSize: 12,
	},
	itemTextActive: {
		color: "#fff",
		fontWeight: "700",
	},
});
