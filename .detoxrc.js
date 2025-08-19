/** @type {Detox.DetoxConfig} */
module.exports = {
	testRunner: "jest",
	runnerConfig: "e2e/config.json",
	configurations: {
		"ios.sim.debug": {
			type: "ios.simulator",
			binaryPath: "ios/build/Build/Products/Debug-iphonesimulator/YourApp.app",
			build:
				"xcodebuild -workspace ios/YourApp.xcworkspace -scheme YourApp -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build",
			device: {
				type: "iPhone 14",
			},
		},
		"android.emu.debug": {
			type: "android.emulator",
			binaryPath: "android/app/build/outputs/apk/debug/app-debug.apk",
			build:
				"cd android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug && cd ..",
			device: {
				avdName: "Pixel_3a_API_30_x86",
			},
		},
	},
};
