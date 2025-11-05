import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const isEmail = (val) => /\S+@\S+\.\S+/.test(val);
  const hasMin = (val) => val.length >= 8;
  const hasNum = (val) => /\d/.test(val);
  const hasLetter = (val) => /[A-Za-z]/.test(val);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!isEmail(form.email)) e.email = 'Enter a valid email address';
    if (!form.password.trim()) e.password = 'Password is required';
    else {
      if (!hasMin(form.password)) e.password = 'Use at least 8 characters';
      else if (!hasNum(form.password) || !hasLetter(form.password)) {
        e.password = 'Include letters and numbers for stronger security';
      }
    }
    if (!form.confirmPassword.trim()) e.confirmPassword = 'Confirm your password';
    if (form.password && form.confirmPassword && form.password !== form.confirmPassword) {
      e.confirmPassword = 'Passwords do not match';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const isValid = useMemo(() => {
    if (!form.name.trim() || !isEmail(form.email)) return false;
    if (!hasMin(form.password) || !hasNum(form.password) || !hasLetter(form.password)) return false;
    if (form.password !== form.confirmPassword) return false;
    return true;
  }, [form]);

  const onSubmit = async (ev) => {
    ev.preventDefault();
    setAlertMsg('');
    if (!validate()) return;
    setSubmitting(true);
    try {
      await registerApi({ name: form.name, email: form.email, password: form.password });
      // Navigate to login with a success toast message in state
      navigate('/login', {
        replace: true,
        state: { successMessage: 'Registration successful. Please sign in to continue.' },
      });
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

      {alertMsg ? <Alert variant="error">{alertMsg}</Alert> : null}

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
        <div style={{ fontSize: 12, color: 'rgba(17,24,39,0.7)' }}>
          Password must be at least 8 characters and include letters and numbers.
        </div>
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
          <Button type="submit" loading={submitting} disabled={submitting || !isValid} variant="primary">
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
