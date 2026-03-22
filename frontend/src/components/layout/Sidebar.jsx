import { clsx } from 'clsx';
import {
  LayoutDashboard,
  LogOut,
  Menu,
  Receipt,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/authStore';
import Button from '../ui/Button';

export default function Sidebar() {
  const { user, clearUser } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { to: '/',             labelKey: 'nav.dashboard',    icon: LayoutDashboard, end: true },
    { to: '/transactions', labelKey: 'nav.transactions', icon: Receipt },
  ];

  const handleLogout = () => {
    clearUser();
    navigate('/login', { replace: true });
  };

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-primary-800">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-500">
          <span className="text-lg font-bold text-white">₿</span>
        </div>
        <div>
          <p className="text-sm font-bold text-white leading-tight">Finance</p>
          <p className="text-xs text-primary-300 leading-tight">Tracker</p>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ to, labelKey, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary-500 text-white'
                  : 'text-primary-200 hover:bg-primary-800 hover:text-white',
              )
            }
          >
            <Icon size={18} />
            {t(labelKey)}
          </NavLink>
        ))}
      </nav>

      {/* User & Logout */}
      <div className="border-t border-primary-800 px-4 py-4">
        <div className="mb-3 px-2">
          <p className="text-xs font-semibold text-white truncate">{user?.name}</p>
          <p className="text-xs text-primary-300 truncate">{user?.email}</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-primary-200 hover:bg-primary-800 hover:text-white"
          onClick={handleLogout}
        >
          <LogOut size={16} />
          {t('nav.logout')}
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:shrink-0 bg-primary-950 min-h-screen">
        <SidebarContent />
      </aside>

      {/* Mobile hamburger trigger */}
      <button
        className="fixed top-4 left-4 z-40 flex lg:hidden items-center justify-center h-10 w-10 rounded-lg bg-primary-950 text-white shadow-md"
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative w-64 shrink-0 bg-primary-950 min-h-screen">
            <button
              className="absolute top-4 right-4 text-primary-300 hover:text-white"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  );
}
