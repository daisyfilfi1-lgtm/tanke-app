import Link from 'next/link'

const values = [
  {
    title: '探究是本能，不是任务',
    description:
      '每个孩子天生就是探究者——他们问"为什么"，拆东西，把颜料混在一起。探客不是教孩子知识，而是守护和引导这种本能，让学习回归探索的本质。',
  },
  {
    title: 'AI是脚手架，不是老师',
    description:
      '我们的AI不直接给出答案，而是为孩子搭建"够一够就能摸到"的思考阶梯。孩子在解决真实问题的过程中自己长出知识，而非被动接收信息。',
  },
  {
    title: '学习在生活里，不在课本里',
    description:
      '最好的学习发生在真实生活中。每个项目都使用家中常见材料，让孩子在厨房、客厅、公园里完成探究——学习不必等到教室。',
  },
]

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground">关于探客</h1>
        <p className="mt-4 text-lg text-muted">
          让探究式学习走进每个家庭
        </p>
      </div>

      <div className="mt-12 space-y-16">
        {/* What is 探客 */}
        <section>
          <h2 className="text-2xl font-bold text-foreground">什么是探客？</h2>
          <div className="mt-4 space-y-4 text-muted leading-relaxed">
            <p>
              探客是一个AI驱动的探究式学习平台，面向3-16岁孩子及其家庭。我们基于IB PYP和MYP课程框架，
              设计了一系列可以在家中完成的超学科项目式学习方案。
            </p>
            <p>
              每个项目从一个真实世界的大问题出发，通过每日30-60分钟的动手活动，
              让孩子在观察、实验、创作和反思中主动构建知识。AI负责生成个性化的学习路径和任务引导，
              但真正的主角永远是孩子。
            </p>
          </div>
        </section>

        {/* Values */}
        <section>
          <h2 className="text-2xl font-bold text-foreground">核心理念</h2>
          <div className="mt-6 space-y-8">
            {values.map((v) => (
              <div key={v.title} className="rounded-xl border border-border bg-white p-6">
                <h3 className="text-lg font-semibold text-foreground">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{v.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* For Whom */}
        <section>
          <h2 className="text-2xl font-bold text-foreground">适合谁？</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-white p-5">
              <h3 className="font-semibold text-foreground">对于孩子</h3>
              <p className="mt-2 text-sm text-muted">
                如果你喜欢问"为什么"、喜欢动手做东西、喜欢探索世界——探客是你的游乐场。
              </p>
            </div>
            <div className="rounded-xl border border-border bg-white p-5">
              <h3 className="font-semibold text-foreground">对于家长</h3>
              <p className="mt-2 text-sm text-muted">
                如果你希望孩子的学习不只停留在书本和屏幕前，想和他们一起做有意义的事——探客是你的伙伴。
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* CTA */}
      <div className="mt-16 text-center">
        <Link
          href="/projects"
          className="inline-block rounded-lg bg-primary px-8 py-3 text-base font-medium text-white shadow-lg transition-colors hover:bg-primary-light"
        >
          开始你的第一次探究
        </Link>
      </div>
    </div>
  )
}
