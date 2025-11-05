How to preview the auth screens

- Start the frontend: npm start
- Default route / redirects to /login
- Navigate between pages using the header links:
  - /login for the sign in form
  - /register for the registration form

API integration placeholders
- Base URL is read from REACT_APP_API_BASE_URL (fallback http://localhost:3001)
- POST /login and POST /register are called via src/services/api.js
- Errors are shown in an Alert without crashing if the backend is not available.
