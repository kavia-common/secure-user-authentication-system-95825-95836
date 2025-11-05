import React from 'react';

/**
 * PUBLIC_INTERFACE
 * AuthLayout wraps authentication forms with centered card layout and accessibility landmarks.
 */
function AuthLayout({ children, ariaLiveId = 'form-status' }) {
  return (
    <div className="auth-wrapper">
      <div className="auth-card" role="region" aria-labelledby="auth-title">
        <div id={ariaLiveId} aria-live="polite" aria-atomic="true" style={{ position: 'absolute', height: 0, width: 0, overflow: 'hidden' }}></div>
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
