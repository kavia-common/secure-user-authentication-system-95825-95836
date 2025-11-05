import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import Alert from '../components/Alert';
import { register as registerApi } from '../services/api';

/**
 * PUBLIC_INTERFACE
 * Register page with name, email, password, confirm password fields and validation.
 */
function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    if (!form.password.trim()) e.password = 'Password is required';
    if (!form.confirmPassword.trim()) e.confirmPassword = 'Confirm your password';
    if (form.password && form.confirmPassword && form.password !== form.confirmPassword) {
      e.confirmPassword = 'Passwords do not match';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    setAlertMsg('');
    if (!validate()) return;
    setSubmitting(true);
    try {
      await registerApi({ name: form.name, email: form.email, password: form.password });
      setAlertMsg('Registration successful (placeholder). You can sign in now.');
    } catch (err) {
      setAlertMsg(err?.message || 'Unable to register.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout ariaLiveId="register-status">
      <div className="auth-header">
        <h2 id="auth-title" className="auth-title">Create your account</h2>
        <p className="auth-desc">Join us to get started</p>
      </div>

      {alertMsg ? <Alert variant={alertMsg.includes('successful') ? 'success' : 'error'}>{alertMsg}</Alert> : null}

      <form onSubmit={onSubmit} noValidate>
        <TextInput
          id="name"
          label="Full Name"
          value={form.name}
          onChange={onChange}
          required
          autoComplete="name"
          placeholder="Jane Doe"
          error={errors.name}
        />
        <TextInput
          id="email"
          label="Email"
          type="email"
          value={form.email}
          onChange={onChange}
          required
          autoComplete="email"
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
          autoComplete="new-password"
          placeholder="••••••••"
          error={errors.password}
        />
        <TextInput
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          value={form.confirmPassword}
          onChange={onChange}
          required
          autoComplete="new-password"
          placeholder="••••••••"
          error={errors.confirmPassword}
        />
        <div style={{ marginTop: 14 }}>
          <Button type="submit" loading={submitting} disabled={submitting} variant="primary">
            Create Account
          </Button>
        </div>
      </form>

      <div className="form-footer" aria-live="polite">
        <span>Already have an account? </span>
        <Link to="/login">Sign in</Link>
      </div>
    </AuthLayout>
  );
}

export default Register;
