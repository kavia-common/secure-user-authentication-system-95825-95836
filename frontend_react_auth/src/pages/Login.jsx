import React, { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const location = useLocation();

  const successFromRegister = location.state?.successMessage || '';
  const showRegisterSuccess = !!successFromRegister;

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  // Basic email or username heuristic: allow either "name" or "name@domain"
  const isEmailLike = (val) => /\S+@\S+\.\S+/.test(val);

  const validate = () => {
    const e = {};
    if (!form.email.trim()) e.email = 'Email or username is required';
    if (form.email && form.email.includes('@') && !isEmailLike(form.email)) {
      e.email = 'Enter a valid email address or use a username without @';
    }
    if (!form.password.trim()) e.password = 'Password is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const isValid = useMemo(() => {
    if (!form.email.trim() || !form.password.trim()) return false;
    if (form.email.includes('@') && !isEmailLike(form.email)) return false;
    return true;
  }, [form.email, form.password]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setAlertMsg('');
    if (!validate()) return;
    setSubmitting(true);
    try {
      // Attempt API call; if backend not ready, error will be surfaced.
      const data = await loginApi({ email: form.email, password: form.password });
      // Persist token placeholder and user; backends often return token but our placeholder might not.
      const token = data?.token || 'demo-token';
      const user = data?.user || { email: form.email, name: (form.email.split('@')[0]) || 'User' };
      localStorage.setItem('auth_token', token);
      localStorage.setItem('auth_user', JSON.stringify(user));
      // Navigate to dashboard with a welcome notice.
      navigate('/dashboard', { replace: true });
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

      {showRegisterSuccess && (
        <Alert variant="success" role="status">{successFromRegister}</Alert>
      )}
      {alertMsg ? <Alert variant="error">{alertMsg}</Alert> : null}

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
        <div style={{ fontSize: 12, color: 'rgba(17,24,39,0.7)' }}>
          Use your registered email or username.
        </div>
        <div style={{ marginTop: 14 }}>
          <Button type="submit" loading={submitting} disabled={submitting || !isValid} variant="primary">
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
