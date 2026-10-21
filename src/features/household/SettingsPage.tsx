import { ArrowLeft, LogOut } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router'
import { useBackgroundWrite } from '@/components/toast/useBackgroundWrite'
import { Button } from '@/components/ui/Button'
import { IconButton } from '@/components/ui/IconButton'
import { PageHeader } from '@/components/ui/PageHeader'
import { TextField } from '@/components/ui/TextField'
import { useCurrentUser } from '@/features/auth/authContext'
import { signOut } from '@/features/auth/authService'
import { InviteCard } from './components/InviteCard'
import { SectionsEditor } from './components/SectionsEditor'
import { renameHousehold } from './householdRepository'
import { useHousehold } from './householdContext'

export function SettingsPage() {
  const navigate = useNavigate()
  const user = useCurrentUser()
  const { household, items, me } = useHousehold()
  const write = useBackgroundWrite()
  const [name, setName] = useState(household.name)

  function commitName() {
    const trimmed = name.trim()
    if (trimmed && trimmed !== household.name) write(renameHousehold(household.id, trimmed))
    else setName(household.name)
  }

  return (
    <div className="mx-auto max-w-2xl pb-[max(2.5rem,env(safe-area-inset-bottom))]">
      <PageHeader
        title="Ajustes"
        actions={
          <IconButton label="Voltar" onClick={() => (window.history.state?.idx > 0 ? navigate(-1) : navigate('/casa'))}>
            <ArrowLeft className="size-7" />
          </IconButton>
        }
      />

      <div className="flex flex-col gap-8 px-4">
        <SettingsSection title="Família">
          <ul className="flex flex-col gap-2">
            {household.memberIds.map((memberId) => {
              const member = household.members[memberId]
              return (
                <li key={memberId} className="flex items-center gap-3 rounded-2xl bg-white p-3 ring-1 ring-slate-200">
                  {member?.photoURL ? (
                    <img src={member.photoURL} alt="" referrerPolicy="no-referrer" className="size-11 rounded-full" />
                  ) : (
                    <span className="flex size-11 items-center justify-center rounded-full bg-brand-100 font-bold text-brand-800">
                      {member?.name.charAt(0) ?? '?'}
                    </span>
                  )}
                  <span className="flex-1 text-lg">
                    {member?.name ?? 'Sem nome'}
                    {memberId === me.id && <span className="text-slate-500"> (você)</span>}
                  </span>
                  {memberId === household.ownerId && <span className="text-sm text-slate-500">criou a lista</span>}
                </li>
              )
            })}
          </ul>
          <InviteCard household={household} />
        </SettingsSection>

        <SettingsSection title="Lista">
          <TextField
            label="Nome da lista"
            value={name}
            maxLength={60}
            onChange={(event) => setName(event.target.value)}
            onBlur={commitName}
            onKeyDown={(event) => event.key === 'Enter' && event.currentTarget.blur()}
          />
        </SettingsSection>

        <SettingsSection title="Seções do mercado">
          <SectionsEditor household={household} items={items} />
        </SettingsSection>

        <SettingsSection title="Sua conta">
          <p className="text-slate-600">
            Conectado como <strong>{user.email}</strong>
          </p>
          <Button variant="secondary" block onClick={() => void signOut()}>
            <LogOut className="size-5" aria-hidden />
            Sair da conta
          </Button>
        </SettingsSection>
      </div>
    </div>
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
