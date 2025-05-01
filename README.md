# 🚀 Expo Auth Route Template – Starter for Authentication & Routing

A clean, minimal, and developer-friendly **Expo starter template** with **authentication**, **file-based routing**, and **dark/light mode support** – powered by [`expo-router`](https://expo.github.io/router/).

> ✅ Perfect for building modern **React Native apps** with Expo, fast onboarding, and a modular structure.

📦 GitHub Repository: [PsydoV2/ExpoAuthRouteTemplate](https://github.com/PsydoV2/ExpoAuthRouteTemplate)

---

## ✨ Features

- 🔐 Easy-to-extend authentication flow with React context
- 🧭 File-based routing using `expo-router`
- 🌗 Built-in light & dark theme support
- 📱 Mobile-ready layout with SafeArea handling
- 🎨 Theming system with neutral palette (black/white/gray)
- 🔄 Type-safe navigation via `typedRoutes`
- 🚀 EAS Build & OTA Update ready

---

## 📦 Use Cases

This template is ideal for:

- Creating new **Expo apps with login/signup**
- Rapid prototyping with `expo-router`
- Learning authentication & layout separation in React Native
- Boilerplate for apps with light/dark mode and navigation

---

## 🧑‍💻 Getting Started

### 1. Clone the repository

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

---

## 🧠 How It Works

- Users without a session (`useSession()`) are redirected to `/login`
- Calling `signIn()` simulates login and navigates to the main tab layout
- Clean folder structure: `(auth)` routes are separated from `(tabs)`
- Uses `Themed` components for dynamic light/dark theme switching

---

## 📁 Project Structure

Organized for clarity and scalability:

```
ExpoAuthRouteTemplate/
├── app/                 # Route-based views
│   ├── (auth)/          # Auth-related screens
│   └── (tabs)/          # Main tab layout
├── components/          # UI components
├── constants/           # Theme & color definitions
├── src/                 # Context & hooks
└── assets/              # Fonts and images
```

---

## 🏷️ Keywords

`expo`, `react native`, `auth`, `expo-router`, `starter template`, `light dark mode`, `login`, `routing`, `react native boilerplate`

---

## 📜 License

MIT — Free to use, share and modify.

---

## 🙌 Created by [Psydo](https://github.com/PsydoV2)

[![Donation](https://sfalter.de/FileHosting/Donation.png)](https://streamlabs.com/psydoooo/tip)
