import { Settings } from 'lucide-react'
import { Link } from 'react-router'

export function SettingsLink() {
  return (
    <Link
      to="/ajustes"
      aria-label="Ajustes"
      title="Ajustes"
      className="inline-flex size-12 items-center justify-center rounded-full text-slate-600 active:bg-slate-200"
    >
      <Settings className="size-7" />
    </Link>
  )
}
