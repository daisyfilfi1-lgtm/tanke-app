import Link from 'next/link'
import { notFound } from 'next/navigation'

const dayData: Record<number, {
  title: string
  bigIdea: string
  steps: string[]
  materials: string[]
  tips: string
  reflection: string
}> = {
  1: {
    title: '初识身体',
    bigIdea: '我们的身体由不同的部分组成，每个部分都有独特的功能。',
    steps: [
      '和孩子一起站在大镜子前，从上到下观察身体',
      '指着不同的身体部位，说出它们的名称',
      '让孩子触摸对应的部位，感受不同的质感',
      '画一张"身体地图"，标注出今天认识的所有部位',
    ],
    materials: ['大镜子', '画纸', '彩色笔'],
    tips: '如果孩子对某个部位特别好奇，可以多花时间探索。跟随孩子的兴趣节奏很重要。',
    reflection: '你今天发现了身体哪个部位最让你惊讶？',
  },
  2: {
    title: '五官探索',
    bigIdea: '我们的五官（眼、耳、鼻、口、手）帮助我们感知和理解世界。',
    steps: [
      '准备五种感官探索的物品',
      '蒙眼猜物游戏：用手触摸猜出物品',
      '气味辨别：闭上眼睛辨别不同气味',
      '声音侦探：辨别不同声音的来源',
    ],
    materials: ['眼罩', '不同质感的物品', '有气味的食材', '发声物品'],
    tips: '可以让孩子自己选择想要探索的物品，增加参与感。',
    reflection: '你最喜欢用哪个感官来了解世界？为什么？',
  },
  3: {
    title: '身体轮廓画',
    bigIdea: '每个人的身体都是独特的，我们的身体轮廓记录了成长的印记。',
    steps: [
      '在大张白纸上让孩子躺下，画出身体轮廓',
      '和孩子一起在轮廓上标注身体部位',
      '用彩色笔装饰身体轮廓画',
      '和孩子讨论：我们的身体每天都在变化吗？',
    ],
    materials: ['大张白纸（足以躺下一个人）', '彩色笔', '蜡笔', '胶带'],
    tips: '可以把完成的轮廓画贴在墙上，过几个月再画一张做对比。',
    reflection: '你的身体轮廓和爸爸妈妈的有什么不同？',
  },
}

export default async function DayDetailPage(props: {
  params: Promise<{ id: string }>
}) {
  const { id } = await props.params
  const dayNum = parseInt(id, 10)
  const day = dayData[dayNum]

  if (!day) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Navigation */}
      <nav className="mb-8 text-sm text-muted">
        <Link href="/dashboard" className="hover:text-primary">
          仪表盘
        </Link>
        <span className="mx-2">/</span>
        <Link href="/dashboard/current" className="hover:text-primary">
          我的身体地图
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">第{dayNum}天</span>
      </nav>

      <div className="rounded-xl border border-border bg-white p-8 sm:p-10">
        {/* Day Header */}
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
            {String(dayNum).padStart(2, '0')}
          </span>
          <h1 className="text-2xl font-bold text-foreground">第{dayNum}天 · {day.title}</h1>
        </div>

        {/* Big Idea */}
        <div className="mt-6 rounded-lg bg-indigo-50 p-4">
          <p className="text-sm font-medium text-indigo-600">核心探究问题</p>
          <p className="mt-1 text-foreground">{day.bigIdea}</p>
        </div>

        {/* Steps */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-foreground">探究步骤</h2>
          <ol className="mt-4 space-y-4">
            {day.steps.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                  {i + 1}
                </span>
                <p className="pt-0.5 text-foreground">{step}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Materials */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-foreground">所需材料</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {day.materials.map((m) => (
              <span
                key={m}
                className="rounded-full bg-amber-50 px-3 py-1 text-sm text-amber-600"
              >
                {m}
              </span>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm font-medium text-amber-700">给家长的提示</p>
          <p className="mt-1 text-sm text-amber-800">{day.tips}</p>
        </div>

        {/* Reflection */}
        <div className="mt-8 rounded-lg border border-green-200 bg-green-50 p-4">
          <p className="text-sm font-medium text-green-700">探究后的思考</p>
          <p className="mt-1 text-sm text-green-800">{day.reflection}</p>
        </div>

        {/* Complete Button */}
        <div className="mt-8 flex items-center justify-between">
          {dayNum > 1 && (
            <Link
              href={`/dashboard/current/day/${dayNum - 1}`}
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-gray-50"
            >
              &larr; 前一天
            </Link>
          )}
          <div className="flex-1" />
          {dayNum < 7 && (
            <Link
              href={`/dashboard/current/day/${dayNum + 1}`}
              className="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-light"
            >
              {dayNum < 3 ? '标记已完成' : '继续下一天'}
            </Link>
          )}
        </div>
      </div>

      {/* Back to Week View */}
      <div className="mt-6 text-center">
        <Link
          href="/dashboard/current"
          className="text-sm text-muted hover:text-primary hover:underline"
        >
          &larr; 返回周视图
        </Link>
      </div>
    </div>
  )
}
