import { RouterProvider } from 'react-router'
import { ToastProvider } from '@/components/toast/ToastProvider'
import { AuthProvider } from '@/features/auth/AuthProvider'
import { router } from './router'

export function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </AuthProvider>
  )
}
