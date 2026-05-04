'use client'

import Link from 'next/link'
import { useParams, useSearchParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

interface DayFrame {
  day: number
  type: string
  coreAction: string
  estimatedMinutes: [number, number]
  materials: string[]
  substitutes: string[]
  difficultyFactors: string[]
  safetyCheck: string | null
}

interface LearningPackage {
  title: string
  steps: { title: string; instruction: string }[]
  materials: string[]
  substitutes: string[]
  reflection: string
  parentNote: string
  safetyWarning: string | null
  estimatedMinutes: number
}

const defaultProjects: Record<string, { title: string; weeks: number; daysPerWeek: number }> = {
  'pyp-001': { title: '我的身体说明书', weeks: 4, daysPerWeek: 5 },
  'pyp-020': { title: '小小植物学家', weeks: 4, daysPerWeek: 5 },
  'pyp-021': { title: '天气观测站', weeks: 4, daysPerWeek: 5 },
  'pyp-002': { title: '情绪小侦探', weeks: 3, daysPerWeek: 5 },
  'pyp-008': { title: '社区探索家', weeks: 4, daysPerWeek: 5 },
}

const fallbackTemplates: Record<string, DayFrame[]> = {
  'pyp-021': [
    { day: 1, type: 'observation', coreAction: '观察今天的天气并用图画记录', estimatedMinutes: [15, 25], materials: ['白纸', '蜡笔', '窗户'], substitutes: ['平板绘画'], difficultyFactors: ['准确表达'], safetyCheck: null },
    { day: 2, type: 'craft', coreAction: '制作天气翻翻书，包含晴天、多云、雨天', estimatedMinutes: [25, 35], materials: ['卡纸', '剪刀', '胶水', '彩笔'], substitutes: ['旧纸箱'], difficultyFactors: ['手工'], safetyCheck: '使用剪刀需监护' },
    { day: 3, type: 'experiment', coreAction: '用冰块和热水模拟云朵形成', estimatedMinutes: [20, 30], materials: ['玻璃罐', '热水', '冰块'], substitutes: ['塑料瓶'], difficultyFactors: ['热水需谨慎'], safetyCheck: '热水由成人操作' },
    { day: 4, type: 'creative', coreAction: '想象云朵像什么动物并用画纸创作', estimatedMinutes: [20, 30], materials: ['画纸', '水彩颜料', '画笔'], substitutes: ['彩泥'], difficultyFactors: ['想象'], safetyCheck: null },
    { day: 5, type: 'reflection', coreAction: '整理观察日记并对比第一天', estimatedMinutes: [15, 25], materials: ['日记本', '彩笔', '贴纸'], substitutes: ['数字整理'], difficultyFactors: ['总结'], safetyCheck: null },
  ]
}

const defaultDayFrames: DayFrame[] = [
  { day: 1, type: 'observation', coreAction: '观察和记录今天的学习内容', estimatedMinutes: [15, 25], materials: ['纸', '笔'], substitutes: ['平板'], difficultyFactors: ['专注'], safetyCheck: null },
  { day: 2, type: 'action', coreAction: '动手实践今天的任务', estimatedMinutes: [20, 30], materials: ['材料'], substitutes: ['替代材料'], difficultyFactors: ['操作'], safetyCheck: null },
  { day: 3, type: 'experiment', coreAction: '尝试新的方法探索', estimatedMinutes: [20, 30], materials: ['材料'], substitutes: ['替代'], difficultyFactors: ['理解'], safetyCheck: null },
  { day: 4, type: 'creative', coreAction: '用创意表达今天的学习', estimatedMinutes: [20, 30], materials: ['画纸', '彩笔'], substitutes: ['平板'], difficultyFactors: ['创意'], safetyCheck: null },
  { day: 5, type: 'reflection', coreAction: '总结和分享本周收获', estimatedMinutes: [15, 25], materials: ['日记本', '彩笔'], substitutes: ['口头'], difficultyFactors: ['总结'], safetyCheck: null },
]

function generatePackage(dayFrame: DayFrame): LearningPackage {
  const title = dayFrame.coreAction
  return {
    title: title.length > 20 ? title.slice(0, 20) + '...' : title,
    steps: [
      { title: '第一步', instruction: `准备材料：${dayFrame.materials.join('、')}` },
      { title: '第二步', instruction: dayFrame.coreAction },
      { title: '第三步', instruction: `完成后引导孩子思考：这个活动让你发现了什么？` },
    ],
    materials: dayFrame.materials,
    substitutes: dayFrame.substitutes || [],
    reflection: dayFrame.type === 'observation' ? '你观察到了什么？有什么让你惊讶的发现？'
      : dayFrame.type === 'experiment' ? '实验的结果和你想的一样吗？'
      : dayFrame.type === 'reflection' ? '今天学到了什么？明天想继续探索什么？'
      : '今天你最大的收获是什么？',
    parentNote: dayFrame.safetyCheck ? `安全提醒：${dayFrame.safetyCheck}` : '让孩子自主完成，必要时给予鼓励。',
    safetyWarning: dayFrame.safetyCheck,
    estimatedMinutes: dayFrame.estimatedMinutes[1],
  }
}

export default function DayDetailPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const id = params?.id as string
  const dayNum = parseInt(id, 10) || 1
  const projectId = searchParams?.get('projectId') || 'pyp-021'
  const week = parseInt(searchParams?.get('week') || '1', 10)

  const project = defaultProjects[projectId] || { title: '默认项目', weeks: 4, daysPerWeek: 5 }
  const dayFrames = fallbackTemplates[projectId] || defaultDayFrames
  const dayFrame = dayFrames.find((d: DayFrame) => d.day === dayNum) || {
    day: dayNum, type: 'action', coreAction: '完成今天的探究活动',
    estimatedMinutes: [15, 25] as [number, number], materials: ['纸', '笔'],
    substitutes: [], difficultyFactors: [], safetyCheck: null
  }

  const [pkg, setPkg] = useState<LearningPackage | null>(null)
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    setPkg(generatePackage(dayFrame))
  }, [dayNum, projectId])

  const handleComplete = () => {
    setCompleted(true)
    const daysPerWeek = project.daysPerWeek
    if (dayNum < daysPerWeek) {
      router.push(`/dashboard/current/day/${dayNum + 1}?projectId=${projectId}&week=${week}&day=${dayNum + 1}`)
    } else if (week < project.weeks) {
      router.push(`/dashboard/current/day/1?projectId=${projectId}&week=${week + 1}&day=1`)
    } else {
      router.push('/dashboard')
    }
  }

  const totalDays = project.weeks * project.daysPerWeek
  const progress = Math.round((dayNum / totalDays) * 100)

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      {/* 面包屑 */}
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/dashboard" className="hover:text-indigo-600">仪表盘</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{project.title}</span>
        <span className="mx-2">/</span>
        <span className="text-gray-900">第{dayNum}天</span>
      </nav>

      {/* 进度条 */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-500 mb-1">
          <span>项目进度</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-indigo-600 h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-xs text-gray-400 mt-1">第{week}周 · 第{dayNum}天</p>
      </div>

      {/* 学习包 */}
      {pkg && (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
          {/* 标题区域 */}
          <div className="flex items-start gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
              {String(dayNum).padStart(2, '0')}
            </span>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{pkg.title}</h1>
              <p className="mt-1 text-sm text-gray-500">预计 {pkg.estimatedMinutes} 分钟</p>
            </div>
          </div>

          {/* 步骤 */}
          <div className="mt-6 space-y-4">
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">探究步骤</h2>
            {pkg.steps.map((step, i) => (
              <div key={i} className="flex gap-3 p-3 rounded-xl bg-gray-50">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">
                  {i + 1}
                </span>
                <p className="text-sm text-gray-700 leading-relaxed">{step.instruction}</p>
              </div>
            ))}
          </div>

          {/* 材料 */}
          <div className="mt-6">
            <h2 className="text-sm font-semibold text-gray-900 mb-2">所需材料</h2>
            <div className="flex flex-wrap gap-2">
              {pkg.materials.map((m) => (
                <span key={m} className="rounded-full bg-amber-50 px-3 py-1 text-xs text-amber-700">{m}</span>
              ))}
            </div>
            {pkg.substitutes.length > 0 && (
              <p className="mt-1 text-xs text-gray-400">替代方案：{pkg.substitutes.join('、')}</p>
            )}
          </div>

          {/* 安全提醒 */}
          {pkg.safetyWarning && (
            <div className="mt-4 rounded-lg bg-red-50 border border-red-200 p-3">
              <p className="text-xs font-medium text-red-700">⚠️ {pkg.safetyWarning}</p>
            </div>
          )}

          {/* 反思问题 */}
          <div className="mt-6 rounded-xl bg-green-50 border border-green-200 p-4">
            <p className="text-xs font-medium text-green-700 mb-1">🤔 探究后的思考</p>
            <p className="text-sm text-green-800">{pkg.reflection}</p>
          </div>

          {/* 家长提示 */}
          <div className="mt-3 rounded-xl bg-amber-50 border border-amber-200 p-4">
            <p className="text-xs font-medium text-amber-700 mb-1">💡 家长提示</p>
            <p className="text-sm text-amber-800">{pkg.parentNote}</p>
          </div>

          {/* 完成按钮 */}
          <div className="mt-8">
            <button
              onClick={handleComplete}
              disabled={completed}
              className={`w-full py-3 rounded-xl text-base font-semibold transition-all ${
                completed
                  ? 'bg-green-500 text-white cursor-default'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200'
              }`}
            >
              {completed ? '✅ 已完成！跳转中...' : '我完成了'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
