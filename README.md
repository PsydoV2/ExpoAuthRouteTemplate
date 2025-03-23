## 📄 `README.md`

# Expo Auth Route Template

A clean and minimal starter template for building Expo apps with authentication, routing, and dark/light mode support — powered by `expo-router`.

> 🧪 Repository: [PsydoV2/ExpoAuthRouteTemplate](https://github.com/PsydoV2/ExpoAuthRouteTemplate)

---

## ✨ Features

- 🔐 Simple authentication flow with context
- 🧭 File-based routing using `expo-router`
- 🌗 Light & Dark mode support
- 📱 Responsive layout with SafeArea handling
- 🎨 Customizable theming (neutral black/white/gray base)
- 🧪 Type-safe routing via `typedRoutes`
- 🚀 Ready for EAS Build & OTA Updates

---

## 🧑‍💻 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/PsydoV2/ExpoAuthRouteTemplate.git
cd ExpoAuthRouteTemplate
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the app

```bash
npx expo start
```

---

## 📁 File Structure

```
|   .gitignore
|   app.json
|   babel.config.js
|   filetree.txt
|   package-lock.json
|   package.json
|   README.md
|   tsconfig.json
|
+---.expo
|   |   devices.json
|   |   README.md
|   |
|   \---types
|           router.d.ts
|
+---app
|   |   +html.tsx
|   |   +not-found.tsx
|   |   AuthScreen.tsx
|   |   _layout.tsx
|   |
|   \---(auth)
|       |   modal.tsx
|       |   _layout.tsx
|       |
|       \---(tabs)
|               index.tsx
|               two.tsx
|               _layout.tsx
|
+---assets
|   +---fonts
|   |       SpaceMono-Regular.ttf
|   \---images
|           adaptive-icon.png
|           favicon.png
|           icon.png
|           splash.png
|
+---components
|   |   EditScreenInfo.tsx
|   |   ExternalLink.tsx
|   |   StyledText.tsx
|   |   Themed.tsx
|   |   useClientOnlyValue.ts
|   |   useClientOnlyValue.web.ts
|   |   useColorScheme.ts
|   |   useColorScheme.web.ts
|   \---__tests__
|           StyledText-test.js
|
+---constants
|       Colors.ts
|
\---src
    +---context
    |       ctx.tsx
    \---hooks
            useStorageState.ts
```

---

## 🧠 How it works

- When `useSession()` has no session, users are redirected to `/login`.
- After calling `signIn()`, a fake session is set and the user lands in the main tab view.
- Uses layout-based routing to separate `(auth)` from main app `(tabs)`.
- Built-in support for dark/light themes via `Themed` components.

---

## 📜 License

MIT — free to use, share and modify.

---

## 🧱 Built with ❤️ by [Psydo](https://github.com/PsydoV2)
