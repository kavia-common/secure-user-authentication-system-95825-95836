import React from 'react';
import Button from '../components/Button';

/**
 * PUBLIC_INTERFACE
 * Dashboard is a protected placeholder page displayed after successful login.
 * Shows a simple welcome banner and a logout button that clears the session.
 */
function Dashboard() {
  const user = (() => {
    try {
      const s = localStorage.getItem('auth_user');
      return s ? JSON.parse(s) : null;
    } catch {
      return null;
    }
  })();

  const onLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    // Force a navigation using full reload-safe approach
    window.location.assign('/login');
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card" role="region" aria-labelledby="dashboard-title">
        <div className="success-banner" role="status" aria-live="polite">
          <span className="success-icon" aria-hidden="true">✅</span>
          <div className="success-text">
            <h3 className="success-title" id="dashboard-title">
              Welcome{user?.name ? `, ${user.name}` : ''}!
            </h3>
            <p className="success-desc">You are now signed in. This is a protected page.</p>
          </div>
        </div>

        <div style={{ marginTop: 18, display: 'flex', justifyContent: 'center' }}>
          <Button variant="secondary" onClick={onLogout}>Log out</Button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
