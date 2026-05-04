import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-border bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
                探
              </div>
              <span className="text-lg font-bold text-foreground">探客</span>
            </div>
            <p className="mt-3 text-sm text-muted">
              探客是一个AI驱动的探究式学习平台，为3-16岁孩子生成可在家完成的超学科项目式学习方案。
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">探索</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/projects" className="text-sm text-muted transition-colors hover:text-primary">
                  项目列表
                </Link>
              </li>
              <li>
                <Link href="/projects?category=pyp" className="text-sm text-muted transition-colors hover:text-primary">
                  PYP 项目
                </Link>
              </li>
              <li>
                <Link href="/projects?category=myp" className="text-sm text-muted transition-colors hover:text-primary">
                  MYP 项目
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">关于</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted transition-colors hover:text-primary">
                  关于探客
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className="text-sm text-muted transition-colors hover:text-primary">
                  开始探究
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6">
          <p className="text-center text-xs text-muted">
            &copy; {new Date().getFullYear()} 探客 Inquiry Partner. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
