//// PUBLIC_INTERFACE
/// devProbe provides helper functions to test backend connectivity from the frontend app.
/// Usage (in browser console after the app loads):
///   window.DevProbe.registerTestUser()
///   window.DevProbe.loginTestUser()
import { apiClient, register as registerApi, login as loginApi } from './api';

function makeTestEmail() {
  const ts = Date.now();
  return `testuser_${ts}@example.com`;
}

// PUBLIC_INTERFACE
export function attachDevProbeToWindow() {
  const probe = {
    async registerTestUser(overrides = {}) {
      const payload = {
        name: 'Test User',
        email: overrides.email || makeTestEmail(),
        password: 'password123',
        ...overrides,
      };
      console.log('[DevProbe] Registering:', payload);
      try {
        const res = await registerApi(payload);
        console.log('[DevProbe] Register success:', res);
        return res;
      } catch (e) {
        console.error('[DevProbe] Register error:', e);
        throw e;
      }
    },
    async loginTestUser({ email, password = 'password123' }) {
      const payload = { email, password };
      console.log('[DevProbe] Logging in:', payload);
      try {
        const res = await loginApi(payload);
        console.log('[DevProbe] Login success:', res);
        return res;
      } catch (e) {
        console.error('[DevProbe] Login error:', e);
        throw e;
      }
    },
    apiBaseUrl: apiClient.defaults.baseURL,
  };
  if (typeof window !== 'undefined') {
    window.DevProbe = probe;
    console.log('[DevProbe] Attached to window.DevProbe. Base URL:', probe.apiBaseUrl);
  }
  return probe;
}

attachDevProbeToWindow();
