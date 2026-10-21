import { useBackgroundWrite } from '@/components/toast/useBackgroundWrite'
import { Button } from '@/components/ui/Button'
import { Sheet } from '@/components/ui/Sheet'
import { useI18n } from '@/i18n/i18nContext'
import { leaveHousehold, setActiveHousehold } from '../householdRepository'
import type { Household } from '../model'

interface LeaveListSheetProps {
  open: boolean
  onClose: () => void
  household: Household
  userId: string
}

export function LeaveListSheet({ open, onClose, household, userId }: LeaveListSheetProps) {
  const { t } = useI18n()
  const write = useBackgroundWrite()
  const isLastMember = household.memberIds.length === 1

  function handleLeave() {
    // Clearing the active list first moves the user to onboarding before their access is revoked,
    // so the list screens never flash an access error.
    write(setActiveHousehold(userId, null))
    write(leaveHousehold(household, userId))
    onClose()
  }

  return (
    <Sheet open={open} onClose={onClose} title={t.leave.title(household.name)}>
      <div className="flex flex-col gap-5">
        <p className="text-lg text-slate-700">{isLastMember ? t.leave.lastMember : t.leave.shared}</p>
        <Button variant="destructive" size="lg" block onClick={handleLeave}>
          {t.leave.confirm}
        </Button>
        <Button variant="secondary" size="lg" block onClick={onClose}>
          {t.leave.cancel}
        </Button>
      </div>
    </Sheet>
  )
}
