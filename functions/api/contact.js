const FROM_EMAIL = 'contato@lynx.app.br'
const TO_EMAIL = 'contato@lynx.app.br'

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function emailValido(value) {
  const email = value.trim()
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
}

function parseBody(data) {
  const nome = data?.nome?.trim() ?? ''
  const email = data?.email?.trim() ?? ''
  const telefone = data?.telefone?.trim() ?? ''
  const mensagem = data?.mensagem?.trim() ?? ''

  if (!nome || nome.length < 2) {
    return { error: 'Informe um nome válido.' }
  }

  if (!email || !emailValido(email)) {
    return { error: 'Informe um e-mail válido com @ e domínio (ex.: nome@empresa.com).' }
  }

  if (!telefone || telefone.length < 8) {
    return { error: 'Informe um telefone ou WhatsApp válido.' }
  }

  if (!mensagem || mensagem.length < 10) {
    return { error: 'Descreva seu projeto com pelo menos 10 caracteres.' }
  }

  if (nome.length > 120 || email.length > 254 || telefone.length > 40 || mensagem.length > 5000) {
    return { error: 'Um ou mais campos excedem o tamanho permitido.' }
  }

  return { nome, email, telefone, mensagem }
}

export function onRequestOptions() {
  return jsonResponse({ ok: true })
}

export async function onRequestPost({ request, env }) {
  if (!env.RESEND_API_KEY) {
    return jsonResponse(
      { success: false, error: 'Serviço de e-mail não configurado.' },
      500,
    )
  }

  let data
  try {
    data = await request.json()
  } catch {
    return jsonResponse({ success: false, error: 'JSON inválido.' }, 400)
  }

  const parsed = parseBody(data)
  if (parsed.error) {
    return jsonResponse({ success: false, error: parsed.error }, 400)
  }

  const { nome, email, telefone, mensagem } = parsed
  const subject = `[LYNX] Novo contato — ${nome}`

  const text = [
    'Novo contato pelo site LYNX',
    '',
    `Nome: ${nome}`,
    `E-mail: ${email}`,
    `Telefone / WhatsApp: ${telefone}`,
    '',
    'Mensagem:',
    mensagem,
  ].join('\n')

  const html = `
    <h2>Novo contato pelo site LYNX</h2>
    <p><strong>Nome:</strong> ${escapeHtml(nome)}</p>
    <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
    <p><strong>Telefone / WhatsApp:</strong> ${escapeHtml(telefone)}</p>
    <p><strong>Mensagem:</strong></p>
    <p style="white-space:pre-wrap">${escapeHtml(mensagem)}</p>
  `.trim()

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        subject,
        text,
        html,
      }),
    })

    const result = await response.json()

    if (!response.ok) {
      console.error('Resend error:', result)
      return jsonResponse(
        { success: false, error: 'Não foi possível enviar o e-mail. Tente novamente.' },
        500,
      )
    }

    return jsonResponse({
      success: true,
      message: 'Mensagem enviada com sucesso!',
      messageId: result?.id ?? null,
    })
  } catch (err) {
    console.error('Erro ao enviar e-mail:', err)
    return jsonResponse(
      { success: false, error: 'Não foi possível enviar o e-mail. Tente novamente.' },
      500,
    )
  }
}
