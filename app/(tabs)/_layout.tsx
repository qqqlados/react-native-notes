import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useTranslation } from "react-i18next";

export default function TabLayout() {
	const colorScheme = useColorScheme();
	const { t } = useTranslation();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
				headerShown: false,
				tabBarButton: HapticTab,
				tabBarStyle: Platform.select({
					ios: {
						// Use a transparent background on iOS to show the blur effect
						position: "absolute",
					},
					default: {},
				}),
			}}
		>
			<Tabs.Screen
				name='my-notes'
				options={{
					title: t("tabs.myNotes"),
					tabBarIcon: ({ color }) => (
						<IconSymbol size={28} name='list.bullet' color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name='create-note'
				options={{
					title: t("tabs.createNote"),
					tabBarIcon: ({ color }) => (
						<IconSymbol size={28} name='plus.circle.fill' color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
