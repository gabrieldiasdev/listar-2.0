import { createBrowserRouter, Navigate } from 'react-router'
import { LoginPage } from '@/features/auth/LoginPage'
import { JoinPage } from '@/features/household/JoinPage'
import { OnboardingPage } from '@/features/household/OnboardingPage'
import { SettingsPage } from '@/features/household/SettingsPage'
import { CatalogPage } from '@/features/items/CatalogPage'
import { ShoppingPage } from '@/features/shopping/ShoppingPage'
import { HomeRoute } from './guards/HomeRoute'
import { HouseholdGate } from './guards/HouseholdGate'
import { RequireAuth } from './guards/RequireAuth'
import { AppLayout } from './layouts/AppLayout'

export const router = createBrowserRouter([
  { path: '/', element: <HomeRoute /> },
  { path: '/login', element: <LoginPage /> },
  {
    element: <RequireAuth />,
    children: [
      { path: '/entrar/:householdId/:code', element: <JoinPage /> },
      { path: '/bem-vindo', element: <OnboardingPage /> },
      {
        element: <HouseholdGate />,
        children: [
          {
            element: <AppLayout />,
            children: [
              { path: '/casa', element: <CatalogPage /> },
              { path: '/mercado', element: <ShoppingPage /> },
            ],
          },
          { path: '/ajustes', element: <SettingsPage /> },
        ],
      },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
])
