export interface DayFrame {
  day: number
  type: "action" | "observe" | "record" | "reflect" | "create" | "social"
  coreAction: string
  estimatedMinutes: [number, number]
  materials: string[]
  substitutes: string[]
  difficultyFactors: string[]
  safetyCheck: string | null
}

export interface WeekFrame {
  week: number
  theme: string
  days: DayFrame[]
}

export interface ProjectTemplate {
  id: string
  title: string
  weeks: number
  daysPerWeek: number
  ageRange: { min: number; max: number }
  themes: string[]
  difficulty: number
  spaceType: string[]
  weekFrames: WeekFrame[]
}

export interface StudentProfile {
  age: number
  attentionSpan: number
  themes: string[]
  spaceResources: string[]
}

export interface TemplateMatch {
  template: ProjectTemplate
  score: number
  reason: string
}

const templateCache: Map<string, ProjectTemplate> = new Map()

export async function loadTemplate(projectId: string): Promise<ProjectTemplate | null> {
  if (templateCache.has(projectId)) {
    return templateCache.get(projectId)!
  }
  try {
    const data = await import(`@/data/templates/${projectId}.json`)
    templateCache.set(projectId, data)
    return data as ProjectTemplate
  } catch {
    return null
  }
}

export function matchTemplates(
  templates: ProjectTemplate[],
  profile: StudentProfile
): TemplateMatch[] {
  const scored = templates
    .filter((t) => profile.age >= t.ageRange.min && profile.age <= t.ageRange.max)
    .filter((t) => t.difficulty <= Math.max(1, Math.floor(profile.attentionSpan / 4)))
    .map((t) => {
      let score = 0
      const reasons: string[] = []

      const themeMatch = t.themes.filter((th) =>
        profile.themes.some((pt) => th.includes(pt) || pt.includes(th))
      )
      score += themeMatch.length * 20
      if (themeMatch.length > 0) reasons.push(`主题匹配: ${themeMatch.join(",")}`)

      const spaceMatch = t.spaceType.filter((st) =>
        profile.spaceResources.some((ps) => st.includes(ps) || ps.includes(st))
      )
      score += spaceMatch.length * 15
      if (spaceMatch.length > 0) reasons.push(`空间匹配: ${spaceMatch.join(",")}`)

      return {
        template: t,
        score,
        reason: reasons.join("; ") || "默认匹配",
      }
    })
    .sort((a, b) => b.score - a.score)

  return scored
}

export function getDayFrame(
  template: ProjectTemplate,
  week: number,
  day: number
): DayFrame | null {
  const wf = template.weekFrames.find((w) => w.week === week)
  if (!wf) return null
  return wf.days.find((d) => d.day === day) || null
}
