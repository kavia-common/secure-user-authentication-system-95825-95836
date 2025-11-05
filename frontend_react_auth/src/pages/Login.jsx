import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import Alert from '../components/Alert';
import { login as loginApi } from '../services/api';

/**
 * PUBLIC_INTERFACE
 * Login page with email/username and password fields, validation, and API placeholder.
 */
function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const e = {};
    if (!form.email.trim()) e.email = 'Email or username is required';
    if (!form.password.trim()) e.password = 'Password is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setAlertMsg('');
    if (!validate()) return;
    setSubmitting(true);
    try {
      // Attempt API call; if backend not ready, error will be surfaced.
      await loginApi({ email: form.email, password: form.password });
      setAlertMsg('Login successful (placeholder).');
    } catch (err) {
      setAlertMsg(err?.message || 'Unable to login.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout ariaLiveId="login-status">
      <div className="auth-header">
        <h2 id="auth-title" className="auth-title">Welcome back</h2>
        <p className="auth-desc">Sign in to continue</p>
      </div>

      {alertMsg ? <Alert variant={alertMsg.includes('successful') ? 'success' : 'error'}>{alertMsg}</Alert> : null}

      <form onSubmit={onSubmit} noValidate>
        <TextInput
          id="email"
          label="Email or Username"
          value={form.email}
          onChange={onChange}
          required
          autoComplete="username"
          placeholder="you@example.com"
          error={errors.email}
        />
        <TextInput
          id="password"
          label="Password"
          type="password"
          value={form.password}
          onChange={onChange}
          required
          autoComplete="current-password"
          placeholder="••••••••"
          error={errors.password}
        />
        <div style={{ marginTop: 14 }}>
          <Button type="submit" loading={submitting} disabled={submitting} variant="primary">
            Sign In
          </Button>
        </div>
      </form>

      <div className="form-footer" aria-live="polite">
        <span>Don&apos;t have an account? </span>
        <Link to="/register">Create one</Link>
      </div>
    </AuthLayout>
  );
}

export default Login;
