import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Alert displays feedback messages with variants like error or success.
 */
function Alert({ variant = 'error', children, role = 'alert' }) {
  return (
    <div className={`alert alert-${variant}`} role={role}>
      {children}
    </div>
  );
}

export default Alert;
