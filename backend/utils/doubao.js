function getConfig() {
  return {
    apiKey: process.env.DOUBAO_API_KEY || '',
    endpoint: process.env.DOUBAO_ENDPOINT || 'https://ark.cn-beijing.volces.com/api/v3/chat/completions',
    model: process.env.DOUBAO_MODEL || 'doubao-seed-2-0-pro-260215',
    timeout: parseInt(process.env.DOUBAO_TIMEOUT || '120000', 10),
    maxRetries: parseInt(process.env.DOUBAO_MAX_RETRIES || '2', 10),
  }
}

async function callDoubao(systemPrompt, userMessage, retries) {
  const cfg = getConfig()
  if (retries == null) retries = cfg.maxRetries

  if (!cfg.apiKey) {
    throw new Error('DOUBAO_API_KEY 未配置，请在 backend/.env 文件中设置')
  }

  let lastError = null

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), cfg.timeout)

      const response = await fetch(cfg.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cfg.apiKey}`,
        },
        body: JSON.stringify({
          model: cfg.model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userMessage },
          ],
          temperature: 0.7,
          max_tokens: 8192,
        }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorText = await response.text().catch(() => '')
        throw new Error(`豆包API返回错误 (${response.status}): ${errorText}`)
      }

      const result = await response.json()
      const content = result?.choices?.[0]?.message?.content

      if (!content) {
        throw new Error('豆包API返回内容为空')
      }

      return content
    } catch (err) {
      lastError = err
      if (err.name === 'AbortError') {
        lastError = new Error(`豆包API请求超时 (${cfg.timeout / 1000}秒)`)
      }
      if (attempt < retries) {
        console.warn(`豆包API调用失败 (第${attempt}/${retries}次)，准备重试: ${lastError.message}`)
        await new Promise(r => setTimeout(r, 1000 * attempt))
      }
    }
  }

  throw lastError
}

function extractJson(text) {
  let cleaned = text.trim()

  if (cleaned.startsWith('```')) {
    const match = cleaned.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/)
    if (match) {
      cleaned = match[1].trim()
    }
  }

  try {
    return JSON.parse(cleaned)
  } catch (e) {
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[0])
      } catch (e2) {
        throw new Error(`模型返回内容无法解析为合法JSON: ${cleaned.substring(0, 200)}`)
      }
    }
    throw new Error(`模型返回内容不是有效的JSON格式: ${cleaned.substring(0, 200)}`)
  }
}

export { callDoubao, extractJson }
