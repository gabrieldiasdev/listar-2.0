import { ArrowLeft, ChevronRight, LogOut } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { Link, useNavigate } from 'react-router'
import { useBackgroundWrite } from '@/components/toast/useBackgroundWrite'
import { Button } from '@/components/ui/Button'
import { IconButton } from '@/components/ui/IconButton'
import { PageHeader } from '@/components/ui/PageHeader'
import { SegmentedControl } from '@/components/ui/SegmentedControl'
import { TextField } from '@/components/ui/TextField'
import { site } from '@/config/site'
import { useCurrentUser } from '@/features/auth/authContext'
import { signOut } from '@/features/auth/authService'
import { useI18n } from '@/i18n/i18nContext'
import { LOCALES } from '@/i18n/locales'
import { InviteCard } from './components/InviteCard'
import { LeaveListSheet } from './components/LeaveListSheet'
import { SectionsEditor } from './components/SectionsEditor'
import { renameHousehold } from './householdRepository'
import { useHousehold } from './householdContext'

export function SettingsPage() {
  const navigate = useNavigate()
  const user = useCurrentUser()
  const { household, items, me } = useHousehold()
  const write = useBackgroundWrite()
  const { t, locale, setLocale } = useI18n()
  const [name, setName] = useState(household.name)
  const [leaveOpen, setLeaveOpen] = useState(false)

  function commitName() {
    const trimmed = name.trim()
    if (trimmed && trimmed !== household.name) write(renameHousehold(household.id, trimmed))
    else setName(household.name)
  }

  return (
    <div className="mx-auto max-w-2xl pb-[max(2.5rem,env(safe-area-inset-bottom))]">
      <PageHeader
        title={t.settings.title}
        actions={
          <IconButton label={t.common.back} onClick={() => (window.history.state?.idx > 0 ? navigate(-1) : navigate('/casa'))}>
            <ArrowLeft className="size-7" />
          </IconButton>
        }
      />

      <div className="flex flex-col gap-8 px-4">
        <SettingsSection title={t.settings.family}>
          <ul className="flex flex-col gap-2">
            {household.memberIds.map((memberId) => {
              const member = household.members[memberId]
              return (
                <li key={memberId} className="flex items-center gap-3 rounded-2xl bg-white p-3 ring-1 ring-slate-200">
                  {member?.photoURL ? (
                    <img src={member.photoURL} alt="" referrerPolicy="no-referrer" className="size-11 rounded-full" />
                  ) : (
                    <span className="flex size-11 items-center justify-center rounded-full bg-brand-100 font-bold text-brand-800">
                      {member?.name.charAt(0) || '?'}
                    </span>
                  )}
                  <span className="flex-1 text-lg">
                    {member?.name || t.common.noName}
                    {memberId === me.id && <span className="text-slate-500">{t.settings.you}</span>}
                  </span>
                  {memberId === household.ownerId && <span className="text-sm text-slate-500">{t.settings.owner}</span>}
                </li>
              )
            })}
          </ul>
          <InviteCard household={household} />
        </SettingsSection>

        <SettingsSection title={t.settings.list}>
          <TextField
            label={t.settings.listName}
            value={name}
            maxLength={60}
            onChange={(event) => setName(event.target.value)}
            onBlur={commitName}
            onKeyDown={(event) => event.key === 'Enter' && event.currentTarget.blur()}
          />
        </SettingsSection>

        <SettingsSection title={t.settings.sections}>
          <SectionsEditor household={household} items={items} />
        </SettingsSection>

        <SettingsSection title={t.settings.language}>
          <SegmentedControl
            label={t.settings.language}
            value={locale}
            onChange={setLocale}
            options={LOCALES.map((option) => ({ value: option, label: t.languageRegions[option] }))}
          />
        </SettingsSection>

        <SettingsSection title={t.settings.account}>
          <p className="text-slate-600">
            {t.settings.signedInAs} <strong>{user.email}</strong>
          </p>
          <Button variant="secondary" block onClick={() => void signOut()}>
            <LogOut className="size-5" aria-hidden />
            {t.auth.signOut}
          </Button>
        </SettingsSection>

        <SettingsSection title={t.settings.privacy}>
          <nav className="flex flex-col divide-y divide-slate-100 rounded-2xl bg-white ring-1 ring-slate-200">
            <SettingsLink to={site.privacyPath}>{t.settings.privacyPolicy}</SettingsLink>
            <SettingsLink to={site.termsPath}>{t.settings.terms}</SettingsLink>
          </nav>
          <Button variant="danger" block onClick={() => setLeaveOpen(true)}>
            {t.settings.leaveList}
          </Button>
          <Link to={site.deleteAccountPath} className="py-2 text-center font-semibold text-red-700 underline-offset-4 hover:underline">
            {t.settings.deleteAccount}
          </Link>
        </SettingsSection>
      </div>

      <LeaveListSheet open={leaveOpen} onClose={() => setLeaveOpen(false)} household={household} userId={me.id} />
    </div>
  )
}

function SettingsLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="flex min-h-14 items-center justify-between px-4 text-lg text-slate-800">
      {children}
      <ChevronRight className="size-5 text-slate-400" aria-hidden />
    </Link>
  )
}

function SettingsSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="px-1 text-sm font-bold tracking-wide text-slate-500 uppercase">{title}</h2>
      {children}
    </section>
  )
}
