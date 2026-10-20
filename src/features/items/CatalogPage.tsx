import { ClipboardList, Plus, SearchX } from 'lucide-react'
import { useDeferredValue, useMemo, useState } from 'react'
import { SettingsLink } from '@/components/SettingsLink'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { PageHeader } from '@/components/ui/PageHeader'
import { SegmentedControl } from '@/components/ui/SegmentedControl'
import { useHousehold } from '@/features/household/householdContext'
import { normalizeText } from '@/lib/text'
import { ImportSheet } from './components/ImportSheet'
import { ItemEditorSheet, type EditorTarget } from './components/ItemEditorSheet'
import { ItemRow } from './components/ItemRow'
import { SearchBar } from './components/SearchBar'
import { groupBySection, suggestSection } from './sections'
import { useItemActions } from './useItemActions'

type Filter = 'all' | 'needed'

export function CatalogPage() {
  const { household, items, memberName } = useHousehold()
  const actions = useItemActions()
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

  const subtitle =
    neededCount === 0 ? 'Nada marcado para comprar' : `${neededCount} ${neededCount === 1 ? 'item' : 'itens'} para comprar`

  return (
    <>
      <PageHeader title={household.name} subtitle={subtitle} actions={<SettingsLink />}>
        {items.length > 0 && (
          <div className="flex flex-col gap-3">
            <SearchBar value={search} onChange={setSearch} />
            {!search && (
              <SegmentedControl
                label="Mostrar"
                value={filter}
                onChange={setFilter}
                options={[
                  { value: 'all', label: 'Todos' },
                  { value: 'needed', label: `Para comprar (${neededCount})` },
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
            title="Sua lista está vazia"
            description="Adicione os produtos que a casa costuma comprar. Depois é só marcar o que está faltando."
            action={
              <div className="flex flex-col gap-3">
                <Button size="lg" onClick={() => setImportOpen(true)}>
                  Importar uma lista
                </Button>
                <Button variant="secondary" size="lg" onClick={() => setEditorTarget({ mode: 'create' })}>
                  Adicionar um item
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
            <span className="truncate">Adicionar “{search.trim()}” e marcar</span>
          </Button>
        )}

        {items.length > 0 && groups.length === 0 && !searchKey && (
          <EmptyState icon={SearchX} title="Nada marcado" description="Toque em um item na aba Todos para marcar que precisa comprar." />
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
          Novo item
        </Button>
      )}

      <ItemEditorSheet target={editorTarget} onClose={() => setEditorTarget(null)} />
      <ImportSheet open={importOpen} onClose={() => setImportOpen(false)} />
    </>
  )
}
