import { NextRequest, NextResponse } from "next/server"
import { loadTemplate, getDayFrame, type StudentProfile, type ProjectTemplate } from "@/lib/engine/templateEngine"
import { generateLearningPackage, type CompletionRecord } from "@/lib/engine/llmFiller"
import { detectAnomalies, getFallback } from "@/lib/engine/anomalyHandler"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { projectId, week, day, profile, history } = body as {
      projectId: string
      week: number
      day: number
      profile: StudentProfile
      history: CompletionRecord[]
    }

    const template = await loadTemplate(projectId)
    if (!template) {
      return NextResponse.json({ error: "Project template not found" }, { status: 404 })
    }

    const dayFrame = getDayFrame(template, week, day)
    if (!dayFrame) {
      return NextResponse.json({ error: "Day frame not found" }, { status: 404 })
    }

    // 检测异常
    const anomalies = detectAnomalies(history, body.currentData)
    const fallbacks = anomalies.map(getFallback)

    // 生成学习包
    const learningPackage = await generateLearningPackage(
      template as ProjectTemplate,
      profile,
      dayFrame,
      history
    )

    return NextResponse.json({
      success: true,
      data: {
        package: learningPackage,
        fallbacks: fallbacks.length > 0 ? fallbacks : undefined,
      },
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    )
  }
}
