import { useI18n } from '@/i18n/i18nContext'
import { cn } from '@/lib/cn'

/** Google requires this attribution whenever the floating reCAPTCHA badge is hidden (see index.css). */
export function RecaptchaNotice({ className }: { className?: string }) {
  const { t } = useI18n()
  const linkClass = 'underline underline-offset-2 hover:text-slate-700'

  return (
    <p className={cn('text-xs text-slate-400', className)}>
      {t.recaptcha.before}
      <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className={linkClass}>
        {t.recaptcha.privacy}
      </a>
      {t.recaptcha.middle}
      <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer" className={linkClass}>
        {t.recaptcha.terms}
      </a>
      {t.recaptcha.after}
    </p>
  )
}
