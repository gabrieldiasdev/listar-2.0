import { Settings } from 'lucide-react'
import { Link } from 'react-router'
import { useI18n } from '@/i18n/i18nContext'

export function SettingsLink() {
  const { t } = useI18n()
  return (
    <Link
      to="/ajustes"
      aria-label={t.nav.settings}
      title={t.nav.settings}
      className="inline-flex size-12 items-center justify-center rounded-full text-slate-600 active:bg-slate-200"
    >
      <Settings className="size-7" />
    </Link>
  )
}
