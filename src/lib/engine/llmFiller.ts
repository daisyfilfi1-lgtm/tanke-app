import type { DayFrame, StudentProfile, ProjectTemplate } from "./templateEngine"

export interface StepCard {
  stepId: number
  type: "action" | "observe" | "record" | "reflect"
  title: string
  instruction: string
  tip: string | null
  duration: number
}

export interface LearningPackage {
  packageId: string
  dayTitle: string
  estimatedMinutes: number
  steps: StepCard[]
  microTK: { question: string; trigger: string } | null
  parentNote: string
  deliverable: { type: string; description: string }
  safetyWarning: string | null
}

export interface CompletionRecord {
  day: number
  completed: boolean
  duration: number
  issues: string[]
}

export async function generateLearningPackage(
  template: ProjectTemplate,
  profile: StudentProfile,
  dayFrame: DayFrame,
  history: CompletionRecord[]
): Promise<LearningPackage> {
  const yesterdayDone = history.find((h) => h.day === dayFrame.day - 1)
  const isSimplified: boolean = yesterdayDone ? !yesterdayDone.completed : false

  const prompt = buildPrompt(template, profile, dayFrame, history, isSimplified)
  const response = await callLLM(prompt)
  return parseResponse(response, dayFrame, isSimplified)
}

function buildPrompt(
  template: ProjectTemplate,
  profile: StudentProfile,
  dayFrame: DayFrame,
  history: CompletionRecord[],
  isSimplified: boolean
): string {
  return `你是一个儿童探究活动设计师。请为以下任务填充具体内容。

项目: ${template.title}
学生年龄: ${profile.age}岁
注意力时长: ${profile.attentionSpan}分钟

今日核心任务: ${dayFrame.coreAction}
预计时长: ${dayFrame.estimatedMinutes[0]}-${dayFrame.estimatedMinutes[1]}分钟
可用材料: ${dayFrame.materials.join(", ")}
替代材料: ${dayFrame.substitutes.join(", ")}
${isSimplified ? "注意：昨天任务未完成，今日自动降级（减少步骤）。" : ""}

请生成JSON（不要额外解释）:
{
  "dayTitle": "吸引孩子的标题（≤10字）",
  "steps": [
    {
      "stepId": 1,
      "type": "action|observe|record|reflect",
      "title": "步骤标题（≤8字）",
      "instruction": "具体指令（≤80字，动词开头）",
      "tip": "困难提示或null",
      "duration": "预计分钟数"
    }
  ],
  "microTK": {
    "question": "反思问题（关联日常生活）",
    "trigger": "after_upload"
  },
  "parentNote": "家长协助提示（≤30字）",
  "deliverable": {
    "type": "photo|voice|data|text",
    "description": "具体上传内容"
  },
  "safetyWarning": null
}`
}

async function callLLM(prompt: string): Promise<string> {
  const response = await fetch("http://127.0.0.1:15722/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1000,
      temperature: 0.7,
    }),
  })
  const data = await response.json()
  return data.choices?.[0]?.message?.content || ""
}

function parseResponse(
  text: string,
  dayFrame: DayFrame,
  isSimplified: boolean
): LearningPackage {
  try {
    const jsonStart = text.indexOf("{")
    const jsonEnd = text.lastIndexOf("}")
    if (jsonStart === -1 || jsonEnd === -1) throw new Error("No JSON found")
    const json = JSON.parse(text.slice(jsonStart, jsonEnd + 1))

    return {
      packageId: `pkg_${Date.now()}`,
      dayTitle: json.dayTitle || dayFrame.coreAction,
      estimatedMinutes: isSimplified ? Math.min(dayFrame.estimatedMinutes[0], 10) : dayFrame.estimatedMinutes[1],
      steps: isSimplified ? json.steps.slice(0, 2) : json.steps,
      microTK: json.microTK || null,
      parentNote: json.parentNote || "无特殊需求",
      deliverable: json.deliverable || { type: "photo", description: dayFrame.coreAction },
      safetyWarning: json.safetyWarning || dayFrame.safetyCheck,
    }
  } catch {
    return {
      packageId: `pkg_${Date.now()}`,
      dayTitle: dayFrame.coreAction,
      estimatedMinutes: dayFrame.estimatedMinutes[1],
      steps: [
        {
          stepId: 1,
          type: "action",
          title: dayFrame.coreAction.slice(0, 8),
          instruction: dayFrame.coreAction,
          tip: null,
          duration: dayFrame.estimatedMinutes[1],
        },
      ],
      microTK: null,
      parentNote: "今日任务比较简单，孩子可以独立完成",
      deliverable: { type: "photo", description: `完成${dayFrame.coreAction}` },
      safetyWarning: dayFrame.safetyCheck,
    }
  }
}
