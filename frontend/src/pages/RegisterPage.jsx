import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { register as registerApi } from '../api/auth.api';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password.length < 6) {
      setError(t('auth.passwordMin'));
      return;
    }

    setLoading(true);
    try {
      await registerApi({ name: form.name, email: form.email, password: form.password });
      navigate('/login', { replace: true });
    } catch (err) {
      setError(err.response?.data?.error ?? t('auth.registrationFailed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 p-4">
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-500 shadow-lg mb-4">
            <span className="text-2xl font-bold text-white">฿</span>
          </div>
          <h1 className="text-2xl font-bold text-white">{t('common.appName')}</h1>
          <p className="text-primary-300 text-sm mt-1">{t('auth.registerSubtitle')}</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl bg-white p-7 shadow-modal">
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <Input
              label={t('auth.fullName')}
              type="text"
              placeholder="John Doe"
              value={form.name}
              onChange={set('name')}
              autoComplete="name"
              required
            />
            <Input
              label={t('auth.email')}
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={set('email')}
              autoComplete="email"
              required
            />
            <Input
              label={t('auth.password')}
              type="password"
              placeholder="Min 6 characters"
              value={form.password}
              onChange={set('password')}
              autoComplete="new-password"
              required
            />

            {error && (
              <p className="rounded-lg bg-expense-50 px-3 py-2 text-sm text-expense-700">
                {error}
              </p>
            )}

            <Button type="submit" className="w-full mt-2" disabled={loading}>
              {loading ? t('auth.creating') : t('auth.createAccount')}
            </Button>
          </form>

          <p className="mt-5 text-center text-sm text-slate-500">
            {t('auth.hasAccount')}{' '}
            <Link
              to="/login"
              className="font-medium text-primary-600 hover:text-primary-700"
            >
              {t('auth.signInLink')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
