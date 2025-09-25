# FairyTaleAi

This is a React Native project created with **React Native CLI**.  
Follow the steps below to run the app on Android or iOS.

---

## Getting Started

### Prerequisites

Before running the project, make sure you have the following installed:

- [Node.js (LTS version)](https://nodejs.org/)
- [Git](https://git-scm.com/)
- [Java JDK 11+](https://adoptium.net/) (for Android build)
- [Android Studio](https://developer.android.com/studio) (Android development)
- [Xcode](https://developer.apple.com/xcode/) (for iOS development, macOS only)
- [CocoaPods](https://cocoapods.org/) (for iOS dependencies)
- [React Native CLI](https://reactnative.dev/docs/environment-setup)

---

## Installation

1. **Clone the repository**
   ```bash
   git clone <repo-link>
   cd MyReactNativeApp
   ```
2. Install dependencies # Using npm
   npm install

# OR using Yarn

yarn install

# Running the App

Step 1: Start Metro (bundler)

# Using npm

npm start

# OR using Yarn

yarn start
Step 2: Run on Android
1.Open Android Studio → Install required SDKs (Android 13 / API 33 recommended).

2.Start an Android Emulator OR connect a real Android device (USB debugging ON).

3.In a new terminal, run:

# Using npm

npm run android

# OR using Yarn

yarn android
Step 3: Run on iOS (macOS only)
1.Install CocoaPods dependencies:
cd ios
pod install
cd ..
2.Start the Metro bundler (if not already running):
npm start
3.In a new terminal, run:

# Using npm

npm run ios

# OR using Yarn

yarn ios
The app will launch in the iOS Simulator (or a connected iPhone if configured).

🔧 Troubleshooting
1.If the build fails, try cleaning dependencies:
rm -rf node_modules
npm install
cd android && ./gradlew clean && cd ..
2.Make sure your emulator/simulator is running before executing run-android or run-ios.
3.On iOS, if you face issues, try updating pods:
cd ios
pod update
cd ..
