import Link from 'next/link'
import { projects, getAgeRangeLabel, getDifficultyLabel } from '@/data/projects'

export default async function ProjectsPage(props: {
  searchParams: Promise<{ category?: string; theme?: string }>
}) {
  const searchParams = await props.searchParams
  const activeCategory = searchParams.category || 'all'
  const activeTheme = searchParams.theme || ''

  const filtered = projects.filter((p) => {
    if (activeCategory !== 'all' && p.category !== activeCategory) return false
    if (activeTheme && p.theme !== activeTheme) return false
    return true
  })

  const categories = [
    { id: 'all', label: '全部' },
    { id: 'pyp', label: 'PYP (3-12岁)' },
    { id: 'myp', label: 'MYP (11-16岁)' },
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold text-foreground">探究项目库</h1>
        <p className="mt-3 text-muted">
          浏览60+精心设计的超学科项目，找到适合孩子的探究之旅
        </p>
      </div>

      {/* Filters */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={cat.id === 'all' ? '/projects' : `/projects?category=${cat.id}`}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
              activeCategory === cat.id
                ? 'bg-primary text-white'
                : 'border border-border bg-white text-muted hover:border-primary/50 hover:text-primary'
            }`}
          >
            {cat.label}
          </Link>
        ))}
      </div>

      {activeTheme && (
        <div className="mt-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-1.5 text-sm text-indigo-600">
            主题筛选: {activeTheme}
            <Link href="/projects" className="ml-1 text-indigo-400 hover:text-indigo-600">
              &times;
            </Link>
          </span>
        </div>
      )}

      {/* Project Grid */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.id}`}
            className="group rounded-xl border border-border bg-white p-6 transition-all hover:border-primary/30 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  project.category === 'pyp'
                    ? 'bg-blue-50 text-blue-600'
                    : 'bg-purple-50 text-purple-600'
                }`}
              >
                {project.category === 'pyp' ? 'PYP' : 'MYP'}
              </span>
              <span className="text-xs text-muted">{project.durationWeeks}周</span>
            </div>
            <h3 className="mt-3 text-lg font-semibold text-foreground group-hover:text-primary">
              {project.name}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
              {project.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-muted">
                {getAgeRangeLabel(project.ageRange)}
              </span>
              <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-muted">
                {getDifficultyLabel(project.difficulty)}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-16 text-center text-muted">
          <p>没有找到匹配的项目</p>
        </div>
      )}
    </div>
  )
}
