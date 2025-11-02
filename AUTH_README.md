AuthContext & Axios setup

Files changed/added:

- src/context/AuthContext.jsx - central AuthProvider and useAuthContext hook
- src/utils/axios.js - publicAxios/privateAxios + setAuthToken/clearAuthToken
- src/utils/auth.js - getJWT/setJWT/clearJWT (localStorage)
- src/api/auth/login.js - loginUser API wrapper (returns Xano response)
- src/components/AuthStatus.jsx - small component showing auth state
- src/pages/LoginExample.jsx - example login form using useAuthContext

Quick usage

1. Wrap your app (already done in src/main.jsx):

<AuthProvider>
  <App />
</AuthProvider>

2. Login from a component (example in src/pages/LoginExample.jsx):

const { login } = useAuthContext();
await login({ email, password });

3. Use auth state anywhere:

const { user, isAuthenticated, logout } = useAuthContext();

4. Axios: use publicAxios for unauthenticated calls, privateAxios for calls that require Authorization header. The header is set automatically when you login through the AuthProvider.

Notes

- This setup assumes Xano returns { authToken, user } from the login endpoint. AuthProvider will persist token to localStorage and fetch /auth/me when needed.
- For React Native replace localStorage usage in src/utils/auth.js with AsyncStorage (small edit).
