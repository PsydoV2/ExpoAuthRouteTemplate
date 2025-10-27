# 🚀 Expo Auth Route Template

A modern, lightweight **Expo starter template** featuring **authentication**, **file-based routing**, and **fully themed components** — built with [`expo-router`](https://expo.github.io/router/) and TypeScript.

> ⚡️ Ideal for kickstarting new React Native projects with clean structure, persistent auth, and ready-to-scale design patterns.

📦 GitHub: [PsydoV2/ExpoAuthRouteTemplate](https://github.com/PsydoV2/ExpoAuthRouteTemplate)

---

## ✨ Features

- 🔐 **Authentication Context** — centralized login state via React Context
- 💾 **Persistent Login** — AsyncStorage-based session hydration
- 🧭 **File-Based Routing** — clean folder structure with `(auth)` and `(tabs)` layouts
- 🎨 **Dynamic Theming** — built-in dark & light mode with `Themed` wrapper components
- 🪄 **Auto Navigation Redirects** — authenticated users skip login automatically
- ⚡ **Expo Ready** — compatible with Expo SDK 54+ & EAS Build
- 💻 **TypeScript + Strict Mode** — stable, scalable foundation
- 🧱 **Custom UI Components** — centralized in `/components/Themed.tsx`
- 📱 **Responsive Layout** — SafeArea handling & consistent spacing
- 🧰 **Developer Experience** — path aliases (`@/`), ESLint, Prettier, hot reload
- 🧩 **Extensible Architecture** — easily plug in APIs, state, or native modules

---

## 🧠 Project Structure

```bash
ExpoAuthRouteTemplate/
├── app/
│   ├── (auth)/           # Login & Auth routes
│   │   └── index.tsx
│   ├── (tabs)/           # Main app tabs after login
│   │   ├── index.tsx
│   │   └── profile.tsx
│   ├── _layout.tsx       # Global router layout
│   └── +not-found.tsx    # 404 fallback
│
├── src/
│   ├── context/
│   │   └── ctx.tsx       # Auth/session context
│   ├── hooks/
│   │   └── useSession.ts # Session logic hook
│   └── utils/            # Helper utilities
│
├── components/
│   ├── Themed.tsx        # Themed wrapper (auto dark/light)
│   └── EditScreenInfo.tsx
│
├── constants/
│   └── Colors.ts         # Centralized color palette
│
├── package.json
└── tsconfig.json
```

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

> 💡 Tip: Press `r` to reload or `m` to open the Metro bundler menu.

---

## 🧱 Tech Stack

| Layer        | Technology                           |
| ------------ | ------------------------------------ |
| Framework    | **Expo SDK 54**                      |
| Navigation   | **expo-router v6**                   |
| Language     | **TypeScript**                       |
| UI / Theme   | **React Native + Themed Components** |
| State / Auth | **React Context + AsyncStorage**     |
| Build        | **EAS Build**, OTA updates ready     |
| Testing      | **Jest + jest-expo**                 |

---

## 🧭 Roadmap

- [ ] Add signup screen example
- [ ] Add toast/snackbar system
- [ ] Integrate API auth demo
- [ ] Add i18n example (multi-language)

---

## 🪪 License

This project is licensed under the **MIT License**.
See [`LICENSE`](./LICENSE) for details.

---

### ❤️ Credits

Created with ☕ and Expo by [PsydoV2](https://github.com/PsydoV2)
