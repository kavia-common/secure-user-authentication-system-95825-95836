import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Button renders a primary button with optional loading spinner.
 */
function Button({ type = 'button', children, loading = false, disabled = false, variant = 'primary', onClick }) {
  return (
    <button
      type={type}
      className={`btn btn-${variant}`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? <span className="btn-loading-spinner" aria-hidden="true" /> : null}
      <span>{children}</span>
    </button>
  );
}

export default Button;
