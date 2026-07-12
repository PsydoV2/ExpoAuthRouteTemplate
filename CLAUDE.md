# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

An Expo (SDK 57) starter template providing authentication, file-based routing (expo-router v7), and themed UI components. It's meant to be cloned/forked as the base for new React Native projects — `app/AuthScreen.tsx` and `constants/APIRoutes.ts` contain demo/placeholder logic that consuming projects are expected to replace.

## Commands

```bash
npm install          # install dependencies
npx expo start        # start dev server (press i/a/w for iOS/Android/web)
npm run android        # expo start --android
npm run ios            # expo start --ios
npm run web             # expo start --web
npm test               # jest --watchAll (jest-expo preset)
```

```bash
npm run lint          # expo lint (eslint-config-expo)
npx tsc --noEmit       # typecheck (no dedicated script)
```

## Architecture

### Routing and auth gating (expo-router)

- `app/_layout.tsx` is the root layout. It loads fonts, sets the system UI background per color scheme, hides the splash screen, and wraps everything in providers in this fixed order: `SafeAreaProvider > UserProvider > SessionProvider > ToastProvider > ThemeProvider > Slot`. As of expo-router 56+, `ThemeProvider`/`DarkTheme`/`DefaultTheme` must be imported from `expo-router` itself, not `@react-navigation/native` — expo-router is no longer compatible with the raw react-navigation package (Metro will fail the bundle otherwise, with `EXPO_ROUTER_DISABLE_RN_NAVIGATION_CHECK=1` as an escape hatch).
- `unstable_settings.initialRouteName` is `"AuthScreen"`, so the app boots into `app/AuthScreen.tsx` by default.
- `app/(auth)/_layout.tsx` is the auth guard: it reads `useSession()` and while `isLoading` shows a spinner, and if `!isAuthenticated` issues `<Redirect href="/AuthScreen" />`. Everything under `app/(auth)/` is therefore only reachable when signed in. Add new protected screens inside `app/(auth)/`; anything outside it (like `AuthScreen.tsx`) is public.
- `app/(auth)/(tabs)/` is the bottom-tab area (`_layout.tsx` configures the tab bar); `app/(auth)/modal.tsx` is presented as a modal from the auth stack.

### Session/auth (`src/context/AuthContext.tsx`)

- `SessionProvider` / `useSession()` exposes `{ isAuthenticated, session, isLoading, signIn(token), signOut() }`.
- Session token persistence is generic via `src/hooks/useStorageState.ts`, a `[[isLoading, value], setValue]`-shaped hook backed by `AsyncStorage` (JSON-serialized). `signIn`/`signOut` just call `setSession(token | null)`.
- `src/context/UserProvider.tsx` / `useUser()` is a separate context for the user DTO (`src/types/DTOUser.ts`: `{ id, username, email }`), persisted directly to `AsyncStorage` under its own key, with `setUser`, `updateUser` (partial merge), `clearUser`. Auth (are we logged in) and user profile data are intentionally decoupled — a real backend integration typically calls both `signIn(token)` and `setUser(...)` together after a successful login (see the example in `app/AuthScreen.tsx`).

### API calls (`src/hooks/useAPI.ts`)

- `useApi()` returns two functions built on one internal `request()`: `callApi(route, method, body)` (attaches `Authorization: Bearer <session>` when a session exists) and `callAuthentication(route, method, body)` (no auth header — used for login/register). Both parse JSON, and on a non-ok response or thrown error they push an error message through `useToast()` (`src/context/ToastProvider.tsx`) and return `null` instead of throwing.
- Route URLs come from `constants/APIRoutes.ts`, which switches `API_URL` based on `__DEV__` and a hardcoded `DEV_LOCAL` flag (`localhost:9080/api` in local dev). Update this file's URLs/flag per project/environment rather than hardcoding routes elsewhere.

### Theming (`components/Themed.tsx` + `constants/StyleVariables.ts`)

- `constants/StyleVariables.ts` exports a single object with parallel `light` and `dark` palettes sharing the same keys (`bgDark`, `bg`, `bgLight`, `text`, `textMuted`, `border`, `primary`, `danger`, `success`, etc.) plus shared `borderRadius`/`gap`. Add new colors to both palettes with the same key.
- `components/Themed.tsx` exports `Text`, `View`, `Card`, `ScreenContent`, and the `useThemeColor(props, colorName)` hook — drop-in replacements for RN's `Text`/`View` that resolve colors via `useThemeColor` (per-component `light`/`dark` prop override → palette default) based on `useColorScheme()`. `ScreenContent` additionally caps width (`maxWidth` prop, default `600`) and centers itself on web (`Platform.OS === "web"`) so layouts don't stretch full-width in a browser; pass a smaller `maxWidth` for narrower flows (e.g. `AuthScreen.tsx` uses `400`). All screens use these instead of manually resolving `Colors[scheme]` — reach for `useThemeColor({}, "key")` when you need a raw color value (e.g. for a `Pressable`'s dynamic style function or an icon's `color` prop) rather than re-deriving the palette by hand. Note `View`/`Card` default their background to the palette (`bgDark`/`bgLight`) — for a purely structural wrapper nested inside a `Card` that shouldn't repaint its background, use plain RN `View` instead (see `(tabs)/index.tsx`'s `chipRow`).

### Path aliases

`@/*` maps to the project root (not `src/`) — configured in both `tsconfig.json` (`paths`) and `babel.config.js` (`module-resolver`). Both must stay in sync if the alias changes. Example: `import Colors from "@/constants/StyleVariables"`, `import { useSession } from "@/src/context/AuthContext"`.

### TypeScript strictness

`tsconfig.json` enables `strict`, `noUncheckedIndexedAccess`, and `noImplicitOverride` on top of `expo/tsconfig.base`. Code should type-check cleanly under these settings (e.g. array/object index access returns `T | undefined`). No `baseUrl` is set (deprecated as of TypeScript 6.0) — `paths` resolve relative to the tsconfig.json directory automatically.

### app.json / config plugins

Splash screen config lives under the `expo-splash-screen` entry in `plugins` (an array-form plugin with `image`/`resizeMode`/`backgroundColor`), not a top-level `splash` key — that key was removed from the config schema. There is likewise no top-level `newArchEnabled` anymore; the New Architecture is mandatory and always on. Run `npx expo-doctor` after touching `app.json` to catch schema drift like this early.
