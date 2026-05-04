import Link from 'next/link'
import { pypThemes } from '@/data/projects'

const features = [
  {
    title: '以问题为驱动',
    description: '每个项目从一个真实世界的大问题出发，让孩子在寻找答案的过程中主动构建知识。',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
      </svg>
    ),
  },
  {
    title: '超学科融合',
    description: '打破学科边界，在同一个项目中融合科学、艺术、语言、数学、社会等多领域知识。',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
  {
    title: '在家即可完成',
    description: '所有项目使用家中常见材料，每日30-60分钟，家长轻松陪伴，孩子自主探究。',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
]

const ageGroups = [
  {
    range: '3-6岁',
    label: '学前启蒙',
    description: '以感官探索和游戏为主，培养好奇心和对世界的基本认知。',
    color: 'bg-pink-50 text-pink-600',
  },
  {
    range: '6-12岁',
    label: '小学探究',
    description: '系统化的PYP超学科项目，培养跨学科思维和研究技能。',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    range: '11-16岁',
    label: '中学挑战',
    description: '深度MYP项目，聚焦全球议题，培养批判性思维和行动力。',
    color: 'bg-purple-50 text-purple-600',
  },
]

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-amber-50" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              让每个孩子
              <span className="block text-primary">都成为探究者</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted sm:text-xl">
              探客为3-16岁孩子生成超学科项目式学习方案。
              不是&ldquo;AI老师&rdquo;在教，而是&ldquo;AI搭脚手架&rdquo;，
              让孩子在解决真实问题的过程中自己长出知识。
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link
                href="/projects"
                className="rounded-lg bg-primary px-8 py-3 text-base font-medium text-white shadow-lg shadow-indigo-200 transition-colors hover:bg-primary-light"
              >
                开始探究
              </Link>
              <Link
                href="/about"
                className="rounded-lg border border-border bg-white px-8 py-3 text-base font-medium text-foreground transition-colors hover:bg-gray-50"
              >
                了解更多
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-foreground">为什么选择探客？</h2>
            <p className="mt-3 text-muted">
              探究式学习不是让孩子记住答案，而是教会他们提出更好的问题。
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-border bg-white p-8 transition-shadow hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50 text-primary">
                  {feature.icon}
                </div>
                <h3 className="mt-5 text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PYP Themes */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-foreground">六大超学科主题</h2>
            <p className="mt-3 text-muted">
              项目基于IB PYP六大超学科主题设计，培养全面发展的探究者
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pypThemes.map((theme) => (
              <Link
                key={theme}
                href={`/projects?theme=${encodeURIComponent(theme)}`}
                className="rounded-xl border border-border bg-white p-5 transition-all hover:border-primary/30 hover:shadow-md"
              >
                <h3 className="font-medium text-foreground">{theme}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Age Groups */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-foreground">适合每个成长阶段</h2>
            <p className="mt-3 text-muted">
              项目按年龄段精心设计，确保难度适宜、兴趣匹配
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {ageGroups.map((group) => (
              <div
                key={group.range}
                className="rounded-xl border border-border p-8 text-center transition-shadow hover:shadow-md"
              >
                <span className={`inline-block rounded-full px-4 py-1.5 text-sm font-medium ${group.color}`}>
                  {group.range}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{group.label}</h3>
                <p className="mt-2 text-sm text-muted">{group.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-indigo-600 to-purple-600 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white">准备好开始探究了吗？</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-indigo-100">
            浏览60+精心设计的项目，找到适合你孩子的第一个探究之旅。
          </p>
          <div className="mt-8">
            <Link
              href="/projects"
              className="inline-block rounded-lg bg-white px-8 py-3 text-base font-medium text-indigo-600 shadow-lg transition-colors hover:bg-indigo-50"
            >
              浏览项目
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
