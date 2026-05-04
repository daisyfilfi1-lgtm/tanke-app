import Link from 'next/link'
import { projects } from '@/data/projects'

const themeMap: Record<string, string> = {
  'Who We Are': '我们是谁',
  'Where We Are in Place and Time': '我们身处什么时空',
  'How We Express Ourselves': '我们如何表达自己',
  'How the World Works': '世界如何运作',
  'How We Organize Ourselves': '我们如何组织自己',
  'Sharing the Planet': '共享地球',
}

const themeColors = [
  'from-indigo-400 to-purple-400',
  'from-rose-400 to-orange-400',
  'from-emerald-400 to-teal-400',
  'from-cyan-400 to-blue-400',
  'from-violet-400 to-fuchsia-400',
  'from-amber-400 to-yellow-400',
]

export default function Home() {
  const uniqueThemes = [...new Set(projects.map(p => p.theme))]

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-indigo-50">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 lg:pt-28 lg:pb-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              欢迎来到{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                探客
              </span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              通过探究式学习，激发孩子们的好奇心与创造力，在探索中理解世界、认识自我。
            </p>
            <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
              <Link
                href="/projects"
                className="rounded-full bg-indigo-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-xl transition-all duration-300"
              >
                查看项目
              </Link>
              <Link
                href="/about"
                className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-indigo-600 border-2 border-indigo-200 shadow-sm hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-300"
              >
                了解更多
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30" />
      </section>

      {/* 价值主张 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">为什么选择探客？</h2>
          <p className="mt-4 text-lg text-gray-500">不是让记住答案，而是教会提出更好的问题</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: '以问题为驱动', desc: '每个项目从真实问题出发，在寻找答案中构建知识', icon: '🔍', color: 'bg-indigo-50' },
            { title: '超学科融合', desc: '打破学科边界，融合科学、艺术、语言、数学等多个领域', icon: '🧩', color: 'bg-purple-50' },
            { title: '在家即可完成', desc: '使用家中常见材料，每日30-60分钟，家长轻松陪伴', icon: '🏠', color: 'bg-rose-50' },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-2xl p-8 shadow-md shadow-indigo-100/50 hover:shadow-xl transition-all duration-300">
              <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center text-2xl mb-5`}>
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 六大主题 */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">六大探究主题</h2>
            <p className="mt-4 text-lg text-gray-500">培养全面发展的探究者</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {uniqueThemes.map((theme, i) => (
              <div key={theme} className="group bg-white rounded-2xl shadow-md shadow-indigo-100/50 hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${themeColors[i % themeColors.length]}`} />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900">{themeMap[theme] || theme}</h3>
                  <p className="mt-2 text-sm text-gray-500">{projects.filter(p => p.theme === theme).length} 个项目</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 年龄段 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">适合每个成长阶段</h2>
          <p className="mt-4 text-lg text-gray-500">按年龄段精心设计，确保难度适宜、兴趣匹配</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { age: '3-6岁', title: '学前启蒙', desc: '以感官探索和游戏为主，培养好奇心', color: 'from-indigo-400 to-purple-400' },
            { age: '6-12岁', title: '小学探究', desc: '系统PYP项目，培养跨学科思维', color: 'from-rose-400 to-orange-400' },
            { age: '11-16岁', title: '中学挑战', desc: '深度MYP项目，培养批判性思维', color: 'from-emerald-400 to-teal-400' },
          ].map((item) => (
            <div key={item.age} className="relative rounded-2xl overflow-hidden shadow-lg group">
              <div className={`bg-gradient-to-br ${item.color} p-8 text-white`}>
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-sm font-medium mb-4">{item.age}</span>
                <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                <p className="text-white/80 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-indigo-600 to-purple-600 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white">准备好开始探究了吗？</h2>
          <p className="mt-4 text-lg text-indigo-100 max-w-xl mx-auto">浏览60+精心设计的项目，找到适合孩子的第一个探究之旅</p>
          <div className="mt-8">
            <Link href="/projects" className="inline-block rounded-full bg-white px-10 py-4 text-sm font-semibold text-indigo-600 shadow-lg hover:bg-indigo-50 hover:shadow-xl transition-all duration-300">
              浏览所有项目
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
