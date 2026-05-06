# 🚀 Expo Auth Route Template

A modern, lightweight **Expo starter template** featuring **authentication**, **file-based routing**, and **fully themed components** — built with [`expo-router`](https://expo.github.io/router/) v7 and TypeScript.

> ⚡ Ideal for kickstarting new React Native projects with clean structure, persistent auth, and ready-to-scale design patterns.

📦 GitHub: [PsydoV2/ExpoAuthRouteTemplate](https://github.com/PsydoV2/ExpoAuthRouteTemplate)

---

## ✨ Features

- 🔐 **Authentication Context** — centralized session state via React Context + AsyncStorage
- 💾 **Persistent Login** — token survives app restarts via `useStorageState`
- 🧭 **File-Based Routing** — protected `(auth)` group with automatic redirects
- 🎨 **Dynamic Theming** — automatic dark/light mode with `Themed` wrapper components
- 📳 **Haptic Feedback** — `expo-haptics` integration (Impact + Notification types)
- 📡 **Device Info** — `expo-constants` + `Platform` data out of the box
- 🔗 **Deep Linking** — `expo-linking` for external URLs and in-app links
- 💻 **Web-Responsive Layout** — `maxWidth` constraints so it doesn't look broken on desktop
- 🧱 **Custom UI Components** — `Text`, `View`, `Card`, `ScreenContent` in `/components/Themed.tsx`
- 🍞 **Toast Notifications** — animated overlay with success / error / info variants
- 🌐 **API Hooks** — `useApi` (authenticated) and `callAuthentication` (public) fetch wrappers
- 👤 **User Context** — `UserProvider` with AsyncStorage persistence and partial update support
- 📱 **New Architecture** — React Native 0.83 with mandatory New Arch (no legacy bridge)
- 💻 **TypeScript Strict Mode** — `noUncheckedIndexedAccess`, `noImplicitOverride`, path aliases

---

## 🧠 Project Structure

```
ExpoAuthRouteTemplate/
├── app/
│   ├── (auth)/                   # Protected area — redirects to AuthScreen if not logged in
│   │   ├── (tabs)/
│   │   │   ├── _layout.tsx       # Tab bar configuration
│   │   │   ├── index.tsx         # Home tab — expo-haptics demo
│   │   │   └── two.tsx           # Second tab — expo-constants + expo-linking demo
│   │   ├── _layout.tsx           # Auth guard (Stack)
│   │   └── modal.tsx             # Info modal with app/device info
│   ├── _layout.tsx               # Root layout — providers + splash screen + system UI
│   ├── AuthScreen.tsx            # Login screen — replace signIn() with your real auth
│   ├── +html.tsx                 # Web: HTML shell (viewport, charset)
│   └── +not-found.tsx            # 404 fallback
│
├── src/
│   ├── context/
│   │   ├── AuthContext.tsx       # Session state: isAuthenticated, signIn, signOut
│   │   ├── UserProvider.tsx      # User DTO: setUser, updateUser, clearUser
│   │   └── ToastProvider.tsx     # showToast(message, type, duration)
│   ├── hooks/
│   │   ├── useStorageState.ts    # Generic AsyncStorage-backed useState
│   │   └── useAPI.ts             # callApi (+ auth header) / callAuthentication (public)
│   └── types/
│       └── DTOUser.ts            # { id, username, email }
│
├── components/
│   ├── Themed.tsx                # Text, View, Card, ScreenContent (web max-width aware)
│   ├── Toast.tsx                 # Animated slide-in toast
│   ├── StyledText.tsx            # MonoText (SpaceMono)
│   └── EditScreenInfo.tsx        # Dev helper — shows file path
│
├── constants/
│   ├── StyleVariables.ts         # Full color palette — light + dark
│   └── APIRoutes.ts              # API_URL with DEV_LOCAL toggle
│
├── app.json                      # newArchEnabled, plugins, typedRoutes
├── tsconfig.json                 # strict, paths (@/), moduleResolution: Bundler
└── babel.config.js               # module-resolver for @/ alias
```

---

## 🧑‍💻 Getting Started

### 1. Clone

```bash
git clone https://github.com/PsydoV2/ExpoAuthRouteTemplate.git
cd ExpoAuthRouteTemplate
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the app

```bash
npx expo start
```

> 💡 Press `i` for iOS simulator, `a` for Android emulator, `w` for browser.

---

## 🔐 Adding Your Auth Logic

Open `app/AuthScreen.tsx` and replace the demo `signIn("demo-token")` call:

```ts
const handleLogin = async () => {
  const data = await callAuthentication<{ token: string }>(API_ROUTE_LOGIN, "POST", {
    email,
    password,
  });
  if (!data?.token) return;
  await signIn(data.token);
  setUser({ id: data.id, username: data.username, email: data.email });
};
```

Configure your API URL in `constants/APIRoutes.ts`.

---

## 🧱 Tech Stack

| Layer         | Technology                               |
| ------------- | ---------------------------------------- |
| Framework     | **Expo SDK 55**                          |
| Navigation    | **expo-router v7** (`~55.0.x`)           |
| Runtime       | **React 19.2 · React Native 0.83**       |
| Architecture  | **New Architecture** (mandatory in SDK 55) |
| Language      | **TypeScript 5.9** (strict)              |
| UI / Theme    | **React Native + Themed Components**     |
| State / Auth  | **React Context + AsyncStorage**         |
| Haptics       | **expo-haptics**                         |
| Device Info   | **expo-constants**                       |
| Linking       | **expo-linking**                         |
| Build         | **EAS Build**, OTA-update ready          |
| Testing       | **Jest + jest-expo**                     |

---

## 🎨 Theming

Colors live in `constants/StyleVariables.ts`. Both `light` and `dark` palettes share the same keys:

| Key           | Usage                          |
| ------------- | ------------------------------ |
| `bgDark`      | Screen background, tab bar     |
| `bgLight`     | Cards, inputs                  |
| `text`        | Primary text                   |
| `textMuted`   | Labels, hints                  |
| `border`      | Card borders, dividers         |
| `primary`     | Buttons, active states, links  |
| `danger`      | Destructive actions, errors    |
| `success`     | Confirmations, positive states |

Use the `Themed` components for automatic light/dark switching:

```tsx
import { Text, View, Card, ScreenContent } from "@/components/Themed";

// ScreenContent automatically constrains to maxWidth 600 on web
<ScreenContent>
  <Card>
    <Text>Hello</Text>
  </Card>
</ScreenContent>
```

---

## 🧭 Roadmap

- [x] Toast / snackbar system
- [x] API auth hook (`useApi`)
- [x] User context with AsyncStorage
- [x] expo-haptics integration
- [x] Web-responsive layout
- [ ] Signup screen example
- [ ] Form validation example
- [ ] i18n / multi-language example

---

## 🪪 License

MIT — see [`LICENSE`](./LICENSE) for details.

---

### ❤️ Credits

Created with ☕ and Expo by [PsydoV2](https://github.com/PsydoV2)
