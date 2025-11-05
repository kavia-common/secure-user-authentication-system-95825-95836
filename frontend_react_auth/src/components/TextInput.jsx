import React from 'react';

/**
 * PUBLIC_INTERFACE
 * TextInput renders a labeled input with accessible attributes and inline error.
 */
function TextInput({
  id,
  label,
  type = 'text',
  value,
  onChange,
  required = false,
  placeholder = '',
  autoComplete,
  error,
}) {
  const describedBy = error ? `${id}-error` : undefined;

  return (
    <div className="input-group">
      <label className="input-label" htmlFor={id}>
        {label} {required ? <span aria-hidden="true" style={{ color: '#EF4444' }}>*</span> : null}
      </label>
      <input
        className="input-field"
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={describedBy}
      />
      {error ? (
        <span id={`${id}-error`} className="input-error" style={{ color: '#B91C1C', fontSize: 12 }}>
          {error}
        </span>
      ) : null}
    </div>
  );
}

export default TextInput;
