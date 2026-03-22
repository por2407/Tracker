import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import DashboardPage from '../pages/DashboardPage';
import TransactionsPage from '../pages/TransactionsPage';

const router = createBrowserRouter([
  // ── Public routes ────────────────────────────────────────────
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },

  // ── Protected routes (wrapped in authenticated Layout) ───────
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'transactions', element: <TransactionsPage /> },
    ],
  },
]);

export default router;
