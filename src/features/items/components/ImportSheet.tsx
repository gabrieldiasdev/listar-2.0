import { useId, useMemo, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Sheet } from '@/components/ui/Sheet'
import { useHousehold } from '@/features/household/householdContext'
import { useI18n } from '@/i18n/i18nContext'
import { normalizeText } from '@/lib/text'
import { parseItemList } from '../parseItemList'
import { useItemActions } from '../useItemActions'
import { useSuggestSection } from '../useSuggestSection'

interface ImportSheetProps {
  open: boolean
  onClose: () => void
}

export function ImportSheet({ open, onClose }: ImportSheetProps) {
  const { items } = useHousehold()
  const actions = useItemActions()
  const suggestSection = useSuggestSection()
  const { t } = useI18n()
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
      title={t.importList.title}
      footer={
        <Button size="lg" block disabled={newItems.length === 0} onClick={handleImport}>
          {newItems.length === 0 ? t.importList.nothingNew : t.importList.add(newItems.length)}
        </Button>
      }
    >
      <label htmlFor={textareaId} className="mb-2 block text-slate-700">
        {t.importList.instructionsBefore}
        <strong>{t.importList.instructionsEmphasis}</strong>
        {t.importList.instructionsAfter}
      </label>
      <textarea
        id={textareaId}
        value={text}
        onChange={(event) => setText(event.target.value)}
        rows={10}
        placeholder={t.importList.placeholder}
        className="w-full rounded-xl border border-slate-300 bg-white p-4 text-lg focus:border-brand-600 focus:outline-3 focus:outline-brand-200"
      />
    </Sheet>
  )
}
