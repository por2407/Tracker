import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { login as loginApi } from '../api/auth.api';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../store/authStore';

export default function LoginPage() {
  const { saveUser } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await loginApi({ email: form.email, password: form.password });
      saveUser(user);
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.response?.data?.error ?? t('auth.invalidCredentials'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-500 shadow-lg mb-4">
            <span className="text-2xl font-bold text-white"></span>
          </div>
          <h1 className="text-2xl font-bold text-white">{t('common.appName')}</h1>
          <p className="text-primary-300 text-sm mt-1">{t('auth.loginSubtitle')}</p>
        </div>

        <div className="rounded-2xl bg-white p-7 shadow-modal">
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
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
              placeholder=""
              value={form.password}
              onChange={set('password')}
              autoComplete="current-password"
              required
            />
            {error && (
              <p className="rounded-lg bg-expense-50 px-3 py-2 text-sm text-expense-700">
                {error}
              </p>
            )}
            <Button type="submit" className="w-full mt-2" disabled={loading}>
              {loading ? t('auth.signingIn') : t('auth.signIn')}
            </Button>
          </form>

          <p className="mt-5 text-center text-sm text-slate-500">
            {t('auth.noAccount')}{' '}
            <Link to="/register" className="font-medium text-primary-600 hover:text-primary-700">
              {t('auth.createLink')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
