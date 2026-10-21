import { RefreshCw, Share2 } from 'lucide-react'
import { useToast } from '@/components/toast/toastContext'
import { useBackgroundWrite } from '@/components/toast/useBackgroundWrite'
import { Button } from '@/components/ui/Button'
import { useI18n } from '@/i18n/i18nContext'
import { buildInviteLink, regenerateInviteCode } from '../householdRepository'
import type { Household } from '../model'

export function InviteCard({ household }: { household: Household }) {
  const toast = useToast()
  const write = useBackgroundWrite()
  const { t } = useI18n()
  const link = buildInviteLink(household)

  async function handleShare() {
    const message = t.invite.shareText(household.name)
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Listar', text: message, url: link })
      } catch {
        // The user closed the share sheet.
      }
      return
    }
    await navigator.clipboard.writeText(`${message} ${link}`)
    toast({ message: t.invite.copied })
  }

  function handleRegenerate() {
    write(regenerateInviteCode(household.id))
    toast({ message: t.invite.regenerated })
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-slate-600">{t.invite.help}</p>
      <Button size="lg" block onClick={handleShare}>
        <Share2 className="size-6" aria-hidden />
        {t.invite.send}
      </Button>
      <Button variant="ghost" block onClick={handleRegenerate}>
        <RefreshCw className="size-5" aria-hidden />
        {t.invite.regenerate}
      </Button>
    </div>
  )
}
