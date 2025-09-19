# 🚀 Expo Auth Route Template

A clean and minimal **Expo starter template** with **authentication**, **file-based routing**, and **dark/light mode support** — powered by [`expo-router`](https://expo.github.io/router/).

> ✅ Ideal to kickstart modern React Native apps with clean structure, fast onboarding and built-in auth.

📦 GitHub Repository: [PsydoV2/ExpoAuthRouteTemplate](https://github.com/PsydoV2/ExpoAuthRouteTemplate)

---

## ✨ Features

- 🔐 Simple authentication flow (React Context + AsyncStorage)
- 🧭 File-based routing using `expo-router v6`
- 🌗 Built-in dark & light mode with centralized color palette
- ⚡ Splash screen & font loading ready
- 📱 Mobile-friendly layout with SafeArea handling
- 💻 TypeScript + strict mode + `@/...` path aliases
- 🚀 Ready for EAS Build and OTA updates

---

## 📦 Use Cases

- Creating new **Expo apps with login / signup**
- Learning `expo-router` + auth logic
- Rapid prototyping with a clean structure
- Boilerplate for production-ready apps

---

## 🧑‍💻 Getting Started

### 1. Clone

```bash
git clone https://github.com/PsydoV2/ExpoAuthRouteTemplate.git
cd ExpoAuthRouteTemplate
```

### 2. Install

```bash
npm install
```

### 3. Run

```bash
npx expo start
```

---

## 🧰 Common Commands

| Command                    | Description                          |
| -------------------------- | ------------------------------------ |
| `npm run start`            | Start Metro Bundler (development)    |
| `npm run android`          | Start the app on Android emulator    |
| `npm run ios`              | Start the app on iOS simulator       |
| `npm run web`              | Start the app in the browser         |
| `npm run test`             | Run unit tests with Jest             |
| `npx expo install --check` | Check Expo SDK compatibility         |
| `npx expo-doctor`          | Diagnose common project issues       |
| `npx expo prebuild`        | Generate native iOS/Android projects |

> 💡 Use `-c` with `npx expo start` to clear the Metro cache if you run into weird errors.

---

## ⚙️ Setup

### 📝 app.json (default)

All basic configuration lives in `app.json`.
Edit fields like `name`, `slug`, `scheme`, `icon`, `splash`, `bundleIdentifier`, etc.

Example:

```jsonc
{
  "expo": {
    "name": "MyApp",
    "slug": "myapp",
    "scheme": "myapp",
    "icon": "./assets/images/icon.png",
    "ios": { "bundleIdentifier": "com.example.myapp" },
    "android": { "package": "com.example.myapp" }
  }
}
```

### 🌐 Environment Variables

#### Option A — Public (recommended for frontend config)

Use `.env`:

```
EXPO_PUBLIC_API_URL=https://api.example.com
```

Access in code:

```ts
const apiUrl = process.env.EXPO_PUBLIC_API_URL;
```

> Variables starting with `EXPO_PUBLIC_` are embedded into your bundle at build time.

#### Option B — Private (for secrets)

Add values to `extra` in `app.json`:

```jsonc
{
  "expo": {
    "extra": {
      "apiUrl": "https://internal.example.com"
    }
  }
}
```

Access with `expo-constants`:

```ts
import Constants from "expo-constants";
const apiUrl = (Constants.expoConfig?.extra as any)?.apiUrl as string;
```

> Use EAS Secrets if you don’t want them stored in the repo.

---

## 🧠 How It Works

- `SessionProvider` manages `session` state in AsyncStorage
- While `isLoading`, the app shows a splash/loading state
- No session → user stays on `/AuthScreen`
- After `signIn()` → user is navigated into `(auth)/(tabs)`
- Global auth state is available via `useSession()`

---

## 📁 Project Structure

```
ExpoAuthRouteTemplate/
├── app/
│   ├── +html.tsx
│   ├── +not-found.tsx
│   ├── AuthScreen.tsx
│   ├── _layout.tsx
│   └── (auth)/
│       ├── _layout.tsx
│       ├── modal.tsx
│       └── (tabs)/
│           ├── _layout.tsx
│           ├── index.tsx
│           └── two.tsx
├── assets/
│   ├── fonts/SpaceMono-Regular.ttf
│   └── images/ (icon, splash, favicon, adaptive-icon)
├── components/ (UI & hooks)
├── constants/Colors.ts
├── src/
│   ├── context/ctx.tsx
│   └── hooks/useStorageState.ts
├── app.json
├── package.json
└── tsconfig.json
```

---

## 🏗️ Tech Stack

- [Expo SDK 54+](https://docs.expo.dev/)
- [expo-router v6](https://expo.github.io/router/)
- React Native 0.81
- TypeScript (strict)
- AsyncStorage
- SafeAreaContext

---

## 📜 License

**MIT** — Free to use, modify and share.

---

## 🙌 Created by [Psydo](https://github.com/PsydoV2)

[![Donation](https://sfalter.de/FileHosting/Donation.png)](https://streamlabs.com/psydoooo/tip)

```

```
