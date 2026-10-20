import { Trash2 } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { SelectField } from '@/components/ui/SelectField'
import { Sheet } from '@/components/ui/Sheet'
import { Switch } from '@/components/ui/Switch'
import { TextField } from '@/components/ui/TextField'
import { useHousehold } from '@/features/household/householdContext'
import { normalizeText } from '@/lib/text'
import type { Item, ItemDraft } from '../model'
import { suggestSection } from '../sections'
import { useItemActions } from '../useItemActions'

export type EditorTarget = { mode: 'create'; name?: string } | { mode: 'edit'; item: Item }

interface ItemEditorSheetProps {
  target: EditorTarget | null
  onClose: () => void
}

export function ItemEditorSheet({ target, onClose }: ItemEditorSheetProps) {
  return (
    <Sheet open={target !== null} onClose={onClose} title={target?.mode === 'edit' ? 'Editar item' : 'Novo item'}>
      {target && <ItemEditorForm key={target.mode === 'edit' ? target.item.id : 'new'} target={target} onDone={onClose} />}
    </Sheet>
  )
}

function initialDraft(target: EditorTarget): Required<ItemDraft> {
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
  const [draft, setDraft] = useState(() => initialDraft(target))
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
        label="Nome"
        value={draft.name}
        onChange={(event) => handleNameChange(event.target.value)}
        maxLength={80}
        required
        autoFocus={target.mode === 'create' && !target.name}
        hint={duplicate ? `Já existe "${duplicate.name}" na lista.` : undefined}
      />

      <Switch label="Precisa comprar" checked={draft.needed} onChange={(needed) => update({ needed })} />

      {draft.needed && (
        <TextField
          label="Quanto comprar? (opcional)"
          placeholder="Ex.: 2 pacotes"
          value={draft.quantity}
          onChange={(event) => update({ quantity: event.target.value })}
          maxLength={40}
        />
      )}

      <TextField
        label="Observação (opcional)"
        placeholder="Ex.: light, marca preferida"
        value={draft.note}
        onChange={(event) => update({ note: event.target.value })}
        maxLength={60}
      />

      <SelectField
        label="Seção do mercado"
        options={sections}
        value={draft.section}
        onChange={(event) => {
          setSectionTouched(true)
          update({ section: event.target.value })
        }}
      />

      <Button type="submit" size="lg" block disabled={!draft.name.trim() || !!duplicate}>
        Salvar
      </Button>

      {target.mode === 'edit' && (
        <Button variant="danger" block onClick={handleDelete}>
          <Trash2 className="size-5" aria-hidden />
          Excluir item
        </Button>
      )}
    </form>
  )
}
