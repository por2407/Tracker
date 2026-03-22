import { Bell } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../store/authStore';

export default function Navbar({ title }) {
  const { user } = useAuth();
  const { i18n } = useTranslation();

  const toggleLang = () => {
    const next = i18n.language === 'th' ? 'en' : 'th';
    i18n.changeLanguage(next);
    localStorage.setItem('lang', next);
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white/90 backdrop-blur px-6 py-3">
      <h1 className="text-lg font-semibold text-slate-800 lg:text-xl">{title}</h1>

      <div className="flex items-center gap-3">
        {/* Language toggle */}
        <button
          onClick={toggleLang}
          className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors shadow-card"
          aria-label="Toggle language"
        >
          <span className="text-base leading-none">{i18n.language === 'th' ? '🇹🇭' : '🇬🇧'}</span>
          {i18n.language === 'th' ? 'TH' : 'EN'}
        </button>

        {/* Notification bell (decorative) */}
        <button
          className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
          aria-label="Notifications"
        >
          <Bell size={18} />
        </button>

        {/* Avatar */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-sm font-semibold text-white select-none">
            {user?.name?.[0]?.toUpperCase() ?? 'U'}
          </div>
          <span className="hidden sm:block text-sm font-medium text-slate-700">
            {user?.name}
          </span>
        </div>
      </div>
    </header>
  );
}
