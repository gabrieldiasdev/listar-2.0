import { ClipboardList, Plus, SearchX } from 'lucide-react'
import { useDeferredValue, useMemo, useState } from 'react'
import { SettingsLink } from '@/components/SettingsLink'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { PageHeader } from '@/components/ui/PageHeader'
import { SegmentedControl } from '@/components/ui/SegmentedControl'
import { useHousehold } from '@/features/household/householdContext'
import { useI18n } from '@/i18n/i18nContext'
import { normalizeText } from '@/lib/text'
import { ImportSheet } from './components/ImportSheet'
import { ItemEditorSheet, type EditorTarget } from './components/ItemEditorSheet'
import { ItemRow } from './components/ItemRow'
import { SearchBar } from './components/SearchBar'
import { groupBySection } from './sections'
import { useItemActions } from './useItemActions'
import { useSuggestSection } from './useSuggestSection'

type Filter = 'all' | 'needed'

export function CatalogPage() {
  const { household, items, memberName } = useHousehold()
  const actions = useItemActions()
  const suggestSection = useSuggestSection()
  const { t } = useI18n()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<Filter>('all')
  const [editorTarget, setEditorTarget] = useState<EditorTarget | null>(null)
  const [importOpen, setImportOpen] = useState(false)

  const deferredSearch = useDeferredValue(search)
  const searchKey = normalizeText(deferredSearch)
  const neededCount = items.filter((item) => item.needed).length

  const groups = useMemo(() => {
    const visible = items.filter(
      (item) =>
        (searchKey ? normalizeText(item.name).includes(searchKey) : filter === 'all' || item.needed),
    )
    return groupBySection(visible, household.sections)
  }, [items, searchKey, filter, household.sections])

  const hasExactMatch = items.some((item) => normalizeText(item.name) === searchKey)

  return (
    <>
      <PageHeader title={household.name} subtitle={t.catalog.toBuy(neededCount)} actions={<SettingsLink />}>
        {items.length > 0 && (
          <div className="flex flex-col gap-3">
            <SearchBar value={search} onChange={setSearch} />
            {!search && (
              <SegmentedControl
                label={t.catalog.filterLabel}
                value={filter}
                onChange={setFilter}
                options={[
                  { value: 'all', label: t.catalog.filterAll },
                  { value: 'needed', label: t.catalog.filterNeeded(neededCount) },
                ]}
              />
            )}
          </div>
        )}
      </PageHeader>

      <div className="px-4 pb-20">
        {items.length === 0 && (
          <EmptyState
            icon={ClipboardList}
            title={t.catalog.emptyTitle}
            description={t.catalog.emptyDescription}
            action={
              <div className="flex flex-col gap-3">
                <Button size="lg" onClick={() => setImportOpen(true)}>
                  {t.catalog.importList}
                </Button>
                <Button variant="secondary" size="lg" onClick={() => setEditorTarget({ mode: 'create' })}>
                  {t.catalog.addFirst}
                </Button>
              </div>
            }
          />
        )}

        {searchKey && !hasExactMatch && (
          <Button
            variant="secondary"
            size="lg"
            block
            className="mb-4 justify-start"
            onClick={() => {
              actions.add({ name: search.trim(), section: suggestSection(search), needed: true })
              setSearch('')
            }}
          >
            <Plus className="size-6 text-brand-700" aria-hidden />
            <span className="truncate">{t.catalog.quickAdd(search.trim())}</span>
          </Button>
        )}

        {items.length > 0 && groups.length === 0 && !searchKey && (
          <EmptyState
            icon={SearchX}
            title={t.catalog.nothingFlaggedTitle}
            description={t.catalog.nothingFlaggedDescription}
          />
        )}

        {groups.map((group) => (
          <section key={group.section} className="mb-6">
            <h2 className="mb-2 px-1 text-sm font-bold tracking-wide text-slate-500 uppercase">{group.section}</h2>
            <ul className="flex flex-col gap-2">
              {group.items.map((item) => (
                <ItemRow
                  key={item.id}
                  item={item}
                  requestedBy={memberName(item.flaggedBy)}
                  onToggle={() => actions.toggleNeeded(item)}
                  onEdit={() => setEditorTarget({ mode: 'edit', item })}
                />
              ))}
            </ul>
          </section>
        ))}
      </div>

      {items.length > 0 && (
        <Button
          size="lg"
          onClick={() => setEditorTarget({ mode: 'create', name: search.trim() || undefined })}
          className="fixed right-4 bottom-[calc(6rem+env(safe-area-inset-bottom))] z-10 rounded-full shadow-lg"
        >
          <Plus className="size-6" aria-hidden />
          {t.catalog.newItem}
        </Button>
      )}

      <ItemEditorSheet target={editorTarget} onClose={() => setEditorTarget(null)} />
      <ImportSheet open={importOpen} onClose={() => setImportOpen(false)} />
    </>
  )
}
