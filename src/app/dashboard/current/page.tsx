import Link from 'next/link'

const weekDays = [
  { id: 1, title: '初识身体', status: 'completed' as const },
  { id: 2, title: '五官探索', status: 'completed' as const },
  { id: 3, title: '身体轮廓画', status: 'in_progress' as const },
  { id: 4, title: '内部器官', status: 'pending' as const },
  { id: 5, title: '骨骼与运动', status: 'pending' as const },
  { id: 6, title: '五感实验', status: 'pending' as const },
  { id: 7, title: '总结展示', status: 'pending' as const },
]

const statusConfig = {
  completed: { label: '已完成', class: 'bg-green-50 text-green-600 border-green-200' },
  in_progress: { label: '进行中', class: 'bg-blue-50 text-blue-600 border-blue-200' },
  pending: { label: '待开始', class: 'bg-gray-50 text-muted border-border' },
}

export default function CurrentProjectPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/dashboard"
            className="text-sm text-muted hover:text-primary hover:underline"
          >
            &larr; 返回仪表盘
          </Link>
          <h1 className="mt-2 text-2xl font-bold text-foreground">我的身体地图</h1>
          <p className="mt-1 text-sm text-muted">第一周 · 认识自己的身体</p>
        </div>
      </div>

      {/* Progress */}
      <div className="mt-6 rounded-xl border border-border bg-white p-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">本周进度</span>
          <span className="text-sm text-muted">3/7 天</span>
        </div>
        <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
          <div className="h-full w-[42%] rounded-full bg-primary" />
        </div>
      </div>

      {/* Week Grid */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {weekDays.map((day) => {
          const status = statusConfig[day.status]
          return (
            <Link
              key={day.id}
              href={
                day.status === 'pending'
                  ? '#'
                  : `/dashboard/current/day/${day.id}`
              }
              className={`block rounded-xl border p-5 transition-all hover:shadow-sm ${
                day.status === 'pending'
                  ? 'cursor-default opacity-60'
                  : 'hover:border-primary/30'
              } ${status.class}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-foreground/30">
                  {String(day.id).padStart(2, '0')}
                </span>
                <span
                  className={`rounded-full border px-2 py-0.5 text-xs font-medium ${status.class}`}
                >
                  {status.label}
                </span>
              </div>
              <h3 className="mt-2 font-medium text-foreground">{day.title}</h3>
            </Link>
          )
        })}
      </div>

      {/* Note */}
      <p className="mt-8 text-center text-xs text-muted">
        登录后即可查看AI生成的每日详细任务和材料清单
      </p>
    </div>
  )
}
