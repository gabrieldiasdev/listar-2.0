import { useId, useMemo, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Sheet } from '@/components/ui/Sheet'
import { useHousehold } from '@/features/household/householdContext'
import { normalizeText } from '@/lib/text'
import { parseItemList } from '../parseItemList'
import { suggestSection } from '../sections'
import { useItemActions } from '../useItemActions'

interface ImportSheetProps {
  open: boolean
  onClose: () => void
}

export function ImportSheet({ open, onClose }: ImportSheetProps) {
  const { items } = useHousehold()
  const actions = useItemActions()
  const textareaId = useId()
  const [text, setText] = useState('')

  const newItems = useMemo(() => {
    const existing = new Set(items.map((item) => normalizeText(item.name)))
    return parseItemList(text).filter((parsed) => !existing.has(normalizeText(parsed.name)))
  }, [text, items])

  function handleImport() {
    actions.importMany(newItems.map((parsed) => ({ ...parsed, section: suggestSection(parsed.name) })))
    setText('')
    onClose()
  }

  return (
    <Sheet
      open={open}
      onClose={onClose}
      title="Importar lista"
      footer={
        <Button size="lg" block disabled={newItems.length === 0} onClick={handleImport}>
          {newItems.length === 0 ? 'Nenhum item novo' : `Adicionar ${newItems.length} ${newItems.length === 1 ? 'item' : 'itens'}`}
        </Button>
      }
    >
      <label htmlFor={textareaId} className="mb-2 block text-slate-700">
        Cole ou digite os itens, <strong>um por linha</strong>. A seção de cada um é escolhida automaticamente e pode ser
        trocada depois.
      </label>
      <textarea
        id={textareaId}
        value={text}
        onChange={(event) => setText(event.target.value)}
        rows={10}
        placeholder={'Arroz\nFeijão\nCreme de leite    light'}
        className="w-full rounded-xl border border-slate-300 bg-white p-4 text-lg focus:border-brand-600 focus:outline-3 focus:outline-brand-200"
      />
    </Sheet>
  )
}
