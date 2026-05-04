import Link from 'next/link'
import { projects } from '@/data/projects'

const demoProjects = projects.slice(0, 3)

const stats = [
  { label: '进行中项目', value: '1' },
  { label: '已完成项目', value: '2' },
  { label: '累计探究天数', value: '15' },
]

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">我的探究</h1>
          <p className="mt-1 text-sm text-muted">查看你的项目进度和学习记录</p>
        </div>
        <Link
          href="/projects"
          className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-light"
        >
          添加新项目
        </Link>
      </div>

      {/* Stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-white p-5 text-center"
          >
            <p className="text-2xl font-bold text-primary">{stat.value}</p>
            <p className="mt-1 text-sm text-muted">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Current Project */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold text-foreground">当前项目</h2>
        <Link
          href="/dashboard/current"
          className="mt-4 block rounded-xl border border-border bg-white p-6 transition-all hover:border-primary/30 hover:shadow-sm"
        >
          <div className="flex items-start justify-between">
            <div>
              <span className="rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-600">
                进行中
              </span>
              <h3 className="mt-3 text-xl font-semibold text-foreground">
                我的身体地图
              </h3>
              <p className="mt-1 text-sm text-muted">第3天 / 共14天</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-primary">75%</p>
              <div className="mt-1 h-2 w-20 overflow-hidden rounded-full bg-gray-100">
                <div className="h-full w-[75%] rounded-full bg-primary" />
              </div>
            </div>
          </div>

          {/* Week days */}
          <div className="mt-4 flex gap-1.5">
            {['一', '二', '三', '四', '五', '六', '日'].map((day, i) => (
              <div
                key={day}
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium ${
                  i < 3
                    ? 'bg-primary text-white'
                    : i === 3
                      ? 'border-2 border-primary text-primary'
                      : 'bg-gray-100 text-muted'
                }`}
              >
                {day}
              </div>
            ))}
          </div>
        </Link>
      </div>

      {/* Past Projects */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold text-foreground">已完成的项目</h2>
        <div className="mt-4 space-y-3">
          {demoProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-xl border border-border bg-white p-4 transition-all hover:shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-foreground">{project.name}</h3>
                  <p className="mt-0.5 text-sm text-muted">{project.theme}</p>
                </div>
                <span className="text-xs text-green-600">已完成</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
