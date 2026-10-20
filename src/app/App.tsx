import { RouterProvider } from 'react-router'
import { ToastProvider } from '@/components/toast/ToastProvider'
import { AuthProvider } from '@/features/auth/AuthProvider'
import { I18nProvider } from '@/i18n/I18nProvider'
import { router } from './router'

export function App() {
  return (
    <I18nProvider>
      <AuthProvider>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </AuthProvider>
    </I18nProvider>
  )
}
