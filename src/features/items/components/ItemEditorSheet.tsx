import { Trash2 } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { SelectField } from '@/components/ui/SelectField'
import { Sheet } from '@/components/ui/Sheet'
import { Switch } from '@/components/ui/Switch'
import { TextField } from '@/components/ui/TextField'
import { useHousehold } from '@/features/household/householdContext'
import { useI18n } from '@/i18n/i18nContext'
import { normalizeText } from '@/lib/text'
import { ITEM_LIMITS, type Item, type ItemDraft } from '../model'
import { useItemActions } from '../useItemActions'
import { useSuggestSection } from '../useSuggestSection'

export type EditorTarget = { mode: 'create'; name?: string } | { mode: 'edit'; item: Item }

interface ItemEditorSheetProps {
  target: EditorTarget | null
  onClose: () => void
}

export function ItemEditorSheet({ target, onClose }: ItemEditorSheetProps) {
  const { t } = useI18n()
  return (
    <Sheet
      open={target !== null}
      onClose={onClose}
      title={target?.mode === 'edit' ? t.editor.editTitle : t.editor.createTitle}
    >
      {target && <ItemEditorForm key={target.mode === 'edit' ? target.item.id : 'new'} target={target} onDone={onClose} />}
    </Sheet>
  )
}

function initialDraft(target: EditorTarget, suggestSection: (name: string) => string): Required<ItemDraft> {
  if (target.mode === 'edit') {
    const { name, section, note, quantity, needed } = target.item
    return { name, section, note, quantity, needed }
  }
  const name = target.name ?? ''
  return { name, section: suggestSection(name), note: '', quantity: '', needed: true }
}

function ItemEditorForm({ target, onDone }: { target: EditorTarget; onDone: () => void }) {
  const { household, items } = useHousehold()
  const actions = useItemActions()
  const suggestSection = useSuggestSection()
  const { t } = useI18n()
  const [draft, setDraft] = useState(() => initialDraft(target, suggestSection))
  const [sectionTouched, setSectionTouched] = useState(target.mode === 'edit')

  const sections = household.sections.includes(draft.section) ? household.sections : [...household.sections, draft.section]
  const draftKey = normalizeText(draft.name)
  const duplicate = items.find(
    (item) => normalizeText(item.name) === draftKey && (target.mode === 'create' || item.id !== target.item.id),
  )

  const update = (changes: Partial<ItemDraft>) => setDraft((current) => ({ ...current, ...changes }))

  function handleNameChange(name: string) {
    update(sectionTouched ? { name } : { name, section: suggestSection(name) })
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!draft.name.trim() || duplicate) return
    const normalized = { ...draft, needed: draft.needed || draft.quantity.trim() !== '' }
    if (target.mode === 'edit') actions.update(target.item, normalized)
    else actions.add(normalized)
    onDone()
  }

  function handleDelete() {
    if (target.mode !== 'edit') return
    actions.remove(target.item)
    onDone()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <TextField
        label={t.editor.name}
        value={draft.name}
        onChange={(event) => handleNameChange(event.target.value)}
        maxLength={ITEM_LIMITS.name}
        required
        autoFocus={target.mode === 'create' && !target.name}
        hint={duplicate ? t.editor.duplicate(duplicate.name) : undefined}
      />

      <Switch label={t.editor.needed} checked={draft.needed} onChange={(needed) => update({ needed })} />

      {draft.needed && (
        <TextField
          label={t.editor.quantity}
          placeholder={t.editor.quantityPlaceholder}
          value={draft.quantity}
          onChange={(event) => update({ quantity: event.target.value })}
          maxLength={ITEM_LIMITS.quantity}
        />
      )}

      <TextField
        label={t.editor.note}
        placeholder={t.editor.notePlaceholder}
        value={draft.note}
        onChange={(event) => update({ note: event.target.value })}
        maxLength={ITEM_LIMITS.note}
      />

      <SelectField
        label={t.editor.section}
        options={sections}
        value={draft.section}
        onChange={(event) => {
          setSectionTouched(true)
          update({ section: event.target.value })
        }}
      />

      <Button type="submit" size="lg" block disabled={!draft.name.trim() || !!duplicate}>
        {t.common.save}
      </Button>

      {target.mode === 'edit' && (
        <Button variant="danger" block onClick={handleDelete}>
          <Trash2 className="size-5" aria-hidden />
          {t.editor.delete}
        </Button>
      )}
    </form>
  )
}
