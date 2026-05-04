export type AnomalyType = "timeout" | "abnormal_data" | "child_confusion" | "weather_disruption"

export interface AnomalySignal {
  type: AnomalyType
  data: any
}

export interface FallbackAction {
  severity: "hint" | "simplify" | "replace" | "pause"
  action: {
    type: string
    content: string
    durationAdjustment?: number
  }
}

export function detectAnomalies(
  history: any[],
  currentData: any
): AnomalySignal[] {
  const signals: AnomalySignal[] = []

  // timeout: 任务超过24小时未完成
  const pendingTasks = history.filter(
    (h) => !h.completed && h.day < getCurrentDay()
  )
  if (pendingTasks.length > 0) {
    signals.push({ type: "timeout", data: { days: pendingTasks.length } })
  }

  // abnormal_data: 连续上传相同数据
  const uploads = history.filter((h) => h.uploadValue !== undefined)
  if (uploads.length >= 3) {
    const lastThree = uploads.slice(-3)
    if (
      lastThree.every((u) => u.uploadValue === lastThree[0].uploadValue)
    ) {
      signals.push({ type: "abnormal_data", data: { value: lastThree[0].uploadValue } })
    }
  }

  // child_confusion: 关键词检测
  if (currentData?.text) {
    const confusionWords = ["不会", "不懂", "太难", "不知道", "help"]
    const found = confusionWords.filter((w) => currentData.text.includes(w))
    if (found.length > 0) {
      signals.push({ type: "child_confusion", data: { words: found, text: currentData.text } })
    }
  }

  return signals
}

export function getFallback(signal: AnomalySignal): FallbackAction {
  switch (signal.type) {
    case "timeout":
      return {
        severity: "simplify",
        action: {
          type: "reduce_steps",
          content: "昨天没完成没关系，今天只做最核心的一步就好！",
          durationAdjustment: -10,
        },
      }
    case "abnormal_data":
      return {
        severity: "hint",
        action: {
          type: "observation_guide",
          content: "你发现了吗？数值好像没有变化。试试换个时间或者换个位置再测一次？",
        },
      }
    case "child_confusion":
      return {
        severity: "hint",
        action: {
          type: "step_by_step",
          content: "没关系，我们一步一步来。先找到需要的工具，然后...",
        },
      }
    case "weather_disruption":
      return {
        severity: "replace",
        action: {
          type: "indoor_alternative",
          content: "今天天气不适合户外活动，我们换个室内也能完成的探索吧！",
        },
      }
    default:
      return {
        severity: "hint",
        action: { type: "general", content: "遇到困难了？慢慢来，加油！" },
      }
  }
}

function getCurrentDay(): number {
  // 模拟：实际应该从数据库或 session 获取
  return Math.floor((Date.now() - new Date("2026-05-01").getTime()) / 86400000) + 1
}
