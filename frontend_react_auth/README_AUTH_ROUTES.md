How to preview the auth screens

- Start the frontend: npm start
- Default route / redirects to /login
- Navigate between pages using the header links:
  - /login for the sign in form
  - /register for the registration form
  - /dashboard (protected) requires a successful login

End-to-end auth flow (frontend)
- Register
  - After successful registration, you are redirected to /login with a success toast.
  - Client-side validation checks: name required, valid email, min 8 char password incl. letters and numbers, and matching confirm password.
- Login
  - On success, the app stores auth_token (placeholder) and auth_user in localStorage and navigates to /dashboard.
  - /dashboard is protected with a simple ProtectedRoute wrapper.
- Logout
  - On the dashboard, press "Log out" to clear the session and navigate to /login.

API integration placeholders
- Base URL is read from REACT_APP_API_BASE_URL (fallback http://localhost:3001)
- POST /login and POST /register are called via src/services/api.js
- If a token exists (localStorage.auth_token), it is added as Authorization: Bearer <token> on requests.
- Errors are shown in an Alert without crashing if the backend is not available.

Notes
- The backend demo may not return a token; a placeholder token "demo-token" is used for navigation if missing.
- Update the backend to return a real token field (e.g., { token: "...", user: {...} }) for full integration.
