import { RefreshCw, Share2 } from 'lucide-react'
import { useToast } from '@/components/toast/toastContext'
import { useBackgroundWrite } from '@/components/toast/useBackgroundWrite'
import { Button } from '@/components/ui/Button'
import { buildInviteLink, regenerateInviteCode } from '../householdRepository'
import type { Household } from '../model'

export function InviteCard({ household }: { household: Household }) {
  const toast = useToast()
  const write = useBackgroundWrite()
  const link = buildInviteLink(household)

  async function handleShare() {
    const message = `Entre na nossa lista de compras "${household.name}" no Listar:`
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Listar', text: message, url: link })
      } catch {
        // The user closed the share sheet.
      }
      return
    }
    await navigator.clipboard.writeText(`${message} ${link}`)
    toast({ message: 'Link copiado! Cole no WhatsApp para enviar.' })
  }

  function handleRegenerate() {
    write(regenerateInviteCode(household.id))
    toast({ message: 'Link novo criado. O link antigo parou de funcionar.' })
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-slate-600">Envie o link para quem vai usar a lista com você. Quem abrir entra direto.</p>
      <Button size="lg" block onClick={handleShare}>
        <Share2 className="size-6" aria-hidden />
        Enviar convite
      </Button>
      <Button variant="ghost" block onClick={handleRegenerate}>
        <RefreshCw className="size-5" aria-hidden />
        Gerar link novo
      </Button>
    </div>
  )
}
