import { ArrowDown, ArrowUp, Plus, Trash2 } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { useBackgroundWrite } from '@/components/toast/useBackgroundWrite'
import { IconButton } from '@/components/ui/IconButton'
import type { Item } from '@/features/items/model'
import { useI18n } from '@/i18n/i18nContext'
import { normalizeText } from '@/lib/text'
import { updateSections } from '../householdRepository'
import type { Household } from '../model'

interface SectionsEditorProps {
  household: Household
  items: Item[]
}

export function SectionsEditor({ household, items }: SectionsEditorProps) {
  const write = useBackgroundWrite()
  const { t } = useI18n()
  const [newSection, setNewSection] = useState('')
  const { sections } = household
  const usedSections = new Set(items.map((item) => item.section))

  const save = (next: string[]) => write(updateSections(household.id, next))

  function move(index: number, offset: number) {
    const next = [...sections]
    const [section] = next.splice(index, 1)
    if (section === undefined) return
    next.splice(index + offset, 0, section)
    save(next)
  }

  function handleAdd(event: FormEvent) {
    event.preventDefault()
    const name = newSection.trim()
    if (!name || sections.some((section) => normalizeText(section) === normalizeText(name))) return
    save([...sections, name])
    setNewSection('')
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-slate-600">{t.settings.sectionsHelp}</p>
      <ol className="flex flex-col divide-y divide-slate-100 rounded-2xl bg-white ring-1 ring-slate-200">
        {sections.map((section, index) => (
          <li key={section} className="flex items-center gap-1 py-1 pl-4">
            <span className="flex-1 text-lg">{section}</span>
            <IconButton label={t.settings.moveUp(section)} disabled={index === 0} onClick={() => move(index, -1)} className="disabled:opacity-25">
              <ArrowUp className="size-5" />
            </IconButton>
            <IconButton
              label={t.settings.moveDown(section)}
              disabled={index === sections.length - 1}
              onClick={() => move(index, 1)}
              className="disabled:opacity-25"
            >
              <ArrowDown className="size-5" />
            </IconButton>
            <IconButton
              label={t.settings.removeSection(section)}
              disabled={usedSections.has(section)}
              title={usedSections.has(section) ? t.settings.sectionInUse : t.settings.removeSection(section)}
              onClick={() => save(sections.filter((s) => s !== section))}
              className="text-red-700 disabled:opacity-25"
            >
              <Trash2 className="size-5" />
            </IconButton>
          </li>
        ))}
      </ol>
      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          aria-label={t.settings.newSection}
          placeholder={t.settings.newSection}
          value={newSection}
          onChange={(event) => setNewSection(event.target.value)}
          maxLength={40}
          className="min-h-12 flex-1 rounded-xl border border-slate-300 bg-white px-4 text-lg focus:border-brand-600 focus:outline-3 focus:outline-brand-200"
        />
        <IconButton type="submit" label={t.settings.addSection} className="rounded-xl bg-brand-700 text-white active:bg-brand-800">
          <Plus className="size-6" />
        </IconButton>
      </form>
    </div>
  )
}
