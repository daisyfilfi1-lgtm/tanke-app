import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProjectById, getAgeRangeLabel, getDifficultyLabel } from '@/data/projects'

export default async function ProjectDetailPage(props: {
  params: Promise<{ id: string }>
}) {
  const { id } = await props.params
  const project = getProjectById(id)

  if (!project) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-muted">
        <Link href="/projects" className="hover:text-primary">
          项目库
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{project.name}</span>
      </nav>

      <div className="rounded-xl border border-border bg-white p-8 sm:p-10">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span
              className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                project.category === 'pyp'
                  ? 'bg-blue-50 text-blue-600'
                  : 'bg-purple-50 text-purple-600'
              }`}
            >
              {project.category === 'pyp' ? 'PYP 小学项目' : 'MYP 中学项目'}
            </span>
            <h1 className="mt-3 text-3xl font-bold text-foreground">{project.name}</h1>
          </div>
          <Link
            href="/auth/login"
            className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-light"
          >
            开始这个项目
          </Link>
        </div>

        {/* Theme */}
        <p className="mt-4 text-lg text-muted">主题：{project.theme}</p>

        {/* Description */}
        <p className="mt-4 leading-relaxed text-foreground">{project.description}</p>

        {/* Info Grid */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-gray-50 p-4 text-center">
            <p className="text-sm text-muted">适合年龄</p>
            <p className="mt-1 text-lg font-semibold text-foreground">
              {getAgeRangeLabel(project.ageRange)}
            </p>
          </div>
          <div className="rounded-lg bg-gray-50 p-4 text-center">
            <p className="text-sm text-muted">持续时间</p>
            <p className="mt-1 text-lg font-semibold text-foreground">{project.durationWeeks}周</p>
          </div>
          <div className="rounded-lg bg-gray-50 p-4 text-center">
            <p className="text-sm text-muted">难度等级</p>
            <p className="mt-1 text-lg font-semibold text-foreground">
              {getDifficultyLabel(project.difficulty)}
            </p>
          </div>
        </div>

        {/* Disciplines */}
        <div className="mt-8">
          <h2 className="text-sm font-semibold text-foreground">涉及学科</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {project.disciplines.map((d) => (
              <span
                key={d}
                className="rounded-full bg-indigo-50 px-3 py-1 text-sm text-indigo-600"
              >
                {d}
              </span>
            ))}
          </div>
        </div>

        {/* Materials */}
        <div className="mt-6">
          <h2 className="text-sm font-semibold text-foreground">所需材料</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {project.materials.map((m) => (
              <span
                key={m}
                className="rounded-full bg-amber-50 px-3 py-1 text-sm text-amber-600"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 开始项目按钮 */}
      <div className="mt-8 text-center space-y-3">
        <Link
          href={`/dashboard/current/day/1?projectId=${id}&week=1&day=1`}
          className="inline-block rounded-xl bg-indigo-600 px-8 py-3 text-base font-medium text-white shadow-lg transition-all hover:bg-indigo-700"
        >
          开始这个项目
        </Link>
        <br />
        <Link
          href="/projects"
          className="text-sm text-muted underline-offset-4 hover:text-primary hover:underline"
        >
          &larr; 返回项目库
        </Link>
      </div>
    </div>
  )
}
