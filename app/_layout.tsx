import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
	});

	if (!loaded) {
		// Async font loading only occurs in development.
		return null;
	}

	return (
		<SafeAreaProvider>
			<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
				<SafeAreaView style={{ flex: 1 }}>
					<Stack screenOptions={{ headerShown: false }}>
						<Stack.Screen name='(tabs)' />
						<Stack.Screen name='my-notes' />
						<Stack.Screen name='+not-found' />
					</Stack>
					<StatusBar style='auto' />
				</SafeAreaView>
			</ThemeProvider>
		</SafeAreaProvider>
	);
}
