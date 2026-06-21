<template>
  <div class="privacy-page">

    <!-- HERO -->
    <div class="hero">
      <div class="section-deco hero-deco">
        <SectionDecoDraw orientation="horizontal" observe-target=".hero">
          <template #star>
            <DecoSparkle class="section-deco-sparkle" />
          </template>
          <template #line>
            <SectionDecoLine class="section-deco-line" />
          </template>
        </SectionDecoDraw>
        <span class="section-deco-label">Documentação legal</span>
      </div>
      <h1>Política de <em>Privacidade</em></h1>
      <div class="hero-meta">
        <span class="meta-tag">Última atualização: maio de 2025</span>
        <span class="meta-tag">Cabo Frio, RJ</span>
        <span class="meta-tag">LGPD compliant</span>
      </div>
    </div>

    <!-- MAIN -->
    <main>

      <div class="section" v-for="(sec, i) in sections" :key="i">
        <div class="section-number">{{ String(i + 1).padStart(2, '0') }} —</div>
        <h2>{{ sec.title }}</h2>
        <div v-html="sec.content" />
      </div>

      <!-- CONTATO -->
      <div class="contact-card">
        <div class="section-number">Contato</div>
        <h2>Dúvidas sobre privacidade?</h2>
        <p>Se você tiver qualquer dúvida sobre esta política ou quiser exercer seus direitos, fale conosco:</p>
        <div class="contact-item" v-for="item in contactItems" :key="item.label">
          <span class="contact-label">{{ item.label }}</span>
          <span class="contact-value" v-html="item.value" />
        </div>
      </div>

    </main>

    <footer>
      <p>© 2025 <strong>LYNX Web Studio</strong> — Cabo Frio, RJ. Todos os direitos reservados.<br />
      Esta política pode ser atualizada periodicamente. Recomendamos revisá-la com regularidade.</p>
    </footer>

  </div>
</template>

<script setup>
import DecoSparkle from './DecoSparkle.vue'
import SectionDecoDraw from './SectionDecoDraw.vue'
import SectionDecoLine from './SectionDecoLine.vue'

const sections = [
  {
    title: 'Introdução',
    content: `
      <p>A <strong>LYNX Web Studio</strong> respeita a sua privacidade e está comprometida com a proteção dos dados pessoais que você nos fornece. Esta Política de Privacidade explica de forma clara e objetiva quais informações coletamos, como as utilizamos e como você pode exercer seus direitos sobre elas.</p>
      <p>Esta política está em conformidade com a <strong>Lei Geral de Proteção de Dados Pessoais (LGPD — Lei nº 13.709/2018)</strong>.</p>
      <div class="highlight"><p>Ao utilizar nosso site e preencher nosso formulário de contato, você concorda com os termos descritos nesta política.</p></div>
    `
  },
  {
    title: 'Quais dados coletamos',
    content: `
      <p>Coletamos apenas os dados estritamente necessários para prestar nossos serviços e responder às suas solicitações.</p>
      <p><strong>Formulário de contato</strong> — quando você entra em contato conosco, coletamos:</p>
      <ul>
        <li><strong>Nome completo</strong> — para identificação e personalização do atendimento</li>
        <li><strong>Endereço de e-mail</strong> — para envio da resposta à sua solicitação</li>
        <li><strong>Número de telefone</strong> — para contato, caso necessário</li>
        <li><strong>Mensagem</strong> — o conteúdo da sua solicitação ou dúvida</li>
      </ul>
      <p><strong>Dados de navegação</strong> — ao acessar nosso site, dados técnicos podem ser coletados automaticamente por ferramentas de análise, como tipo de dispositivo, navegador, páginas visitadas e tempo de permanência. Esses dados são anonimizados e utilizados apenas de forma agregada.</p>
    `
  },
  {
    title: 'Como utilizamos seus dados',
    content: `
      <p>Utilizamos seus dados exclusivamente para as seguintes finalidades:</p>
      <ul>
        <li>Responder às mensagens e solicitações enviadas pelo formulário de contato</li>
        <li>Entrar em contato para dar continuidade a um atendimento já iniciado</li>
        <li>Enviar orçamentos ou propostas comerciais solicitadas por você</li>
        <li>Analisar o desempenho do site e melhorar a experiência de navegação (dados agregados e anônimos)</li>
      </ul>
      <p><strong>Não utilizamos seus dados</strong> para envio de publicidade não solicitada, venda a terceiros ou qualquer finalidade diferente das listadas acima.</p>
    `
  },
  {
    title: 'Cookies e rastreamento',
    content: `
      <p>Nosso site <strong>não utiliza cookies para rastreamento</strong> ou criação de perfis de comportamento. Não colocamos cookies de publicidade, retargeting ou redes sociais no seu dispositivo.</p>
      <div class="no-cookie">✓ Sem cookies de rastreamento ou publicidade</div>
      <p style="margin-top: 16px;">Ferramentas de análise que utilizamos podem registrar dados técnicos de forma anônima e agregada (sem identificação pessoal) para nos ajudar a entender como o site é utilizado e melhorar sua experiência.</p>
    `
  },
  {
    title: 'Compartilhamento de dados',
    content: `
      <p>Seus dados pessoais <strong>não são vendidos, alugados ou compartilhados</strong> com terceiros para fins comerciais.</p>
      <p>Os dados poderão ser compartilhados apenas nas seguintes situações:</p>
      <ul>
        <li>Com prestadores de serviços técnicos que nos auxiliam na operação do site (ex: hospedagem, e-mail), estritamente no limite necessário</li>
        <li>Quando exigido por lei, decisão judicial ou autoridade competente</li>
      </ul>
    `
  },
  {
    title: 'Armazenamento e segurança',
    content: `
      <p>Seus dados são armazenados de forma segura e mantidos apenas pelo tempo necessário para atender à finalidade da coleta ou conforme exigido por obrigações legais.</p>
      <p>Adotamos medidas técnicas e organizacionais adequadas para proteger suas informações contra acesso não autorizado, perda ou destruição.</p>
      <p>Mensagens de contato são retidas pelo período necessário para a conclusão do atendimento e, após isso, podem ser excluídas ou anonimizadas.</p>
    `
  },
  {
    title: 'Seus direitos (LGPD)',
    content: `
      <p>De acordo com a LGPD, você tem os seguintes direitos em relação aos seus dados pessoais:</p>
      <ul>
        <li><strong>Acesso</strong> — solicitar a confirmação da existência de tratamento e acesso aos seus dados</li>
        <li><strong>Correção</strong> — solicitar a correção de dados incompletos, inexatos ou desatualizados</li>
        <li><strong>Exclusão</strong> — solicitar a exclusão dos seus dados, quando aplicável</li>
        <li><strong>Portabilidade</strong> — solicitar a portabilidade dos seus dados a outro fornecedor</li>
        <li><strong>Revogação do consentimento</strong> — revogar o consentimento dado a qualquer momento</li>
        <li><strong>Oposição</strong> — opor-se ao tratamento realizado com fundamento em hipótese de dispensa de consentimento</li>
      </ul>
      <p>Para exercer qualquer um desses direitos, entre em contato pelo e-mail abaixo. Responderemos em até <strong>15 dias úteis</strong>.</p>
    `
  }
]

const contactItems = [
  { label: 'Empresa',  value: 'LYNX Web Studio' },
  { label: 'Cidade',   value: 'Cabo Frio, Rio de Janeiro — Brasil' },
  { label: 'E-mail',   value: '<a href="mailto:privacidade@lynxwebstudio.com.br">privacidade@lynxwebstudio.com.br</a>' },
  { label: 'Assunto',  value: 'Indique "Política de Privacidade" no assunto do e-mail' },
]
</script>

<style scoped>
/* ── DESIGN TOKENS ── */
.privacy-page {
  --yellow:     #F0FF1F;
  --blue:       #380FE9;
  --blue-light: #E8E6FF;
  --dark:       #0A0A14;
  --dark2:      #0D0D1A;
  --border:     rgba(56,15,233,0.18);
  --r-sm: 8px; --r-md: 12px; --r-lg: 16px; --r-xl: 24px; --r-pill: 999px;

  background: var(--dark);
  color: var(--blue-light);
  font-family: 'DM Sans', sans-serif;
  font-size: 16px;
  line-height: 1.7;
  min-height: 100vh;
  width: 100%;
  max-width: 100%;
  overflow-x: clip;
}

/* ── HEADER ── */
.pp-header {
  position: sticky; top: 0; z-index: 100;
  background: rgba(10,10,20,0.85);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border);
  padding: 16px 0;
}
.header-inner {
  max-width: 800px; margin: 0 auto; padding: 0 24px;
  display: flex; align-items: center; justify-content: space-between;
}
.logo {
  font-family: 'Syne', sans-serif; font-weight: 800;
  font-size: 1.2rem; letter-spacing: 0.06em;
  color: #fff; text-decoration: none;
}
.logo span { color: var(--yellow); }
.badge {
  font-size: var(--text-sm); font-weight: 600; letter-spacing: 0.12em;
  text-transform: uppercase; color: var(--dark);
  background: var(--yellow); padding: 4px 12px;
  border-radius: var(--r-pill);
}

/* ── HERO ── */
.hero {
  max-width: 800px; margin: 0 auto;
  padding: 80px 24px 48px;
}
.hero-deco {
  margin-bottom: 24px;
}
h1 {
  font-family: 'Syne', sans-serif;
  font-size: clamp(2rem, 5vw, 3.2rem); font-weight: 800;
  line-height: 1.1; color: #fff; margin-bottom: 24px; letter-spacing: -0.02em;
}
.hero-meta { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
.meta-tag {
  font-size: var(--text-sm); color: rgba(232,230,255,0.5);
  border: 1px solid var(--border); border-radius: var(--r-pill); padding: 4px 12px;
}

/* ── MAIN ── */
main {
  max-width: 800px; margin: 0 auto; padding: 0 24px 128px;
}

/* ── SECTION CARD ── */
.section {
  border: 1px solid var(--border); border-radius: var(--r-xl);
  padding: 40px; margin-bottom: 16px;
  background: rgba(13,13,26,0.6); backdrop-filter: blur(8px);
  transition: border-color 0.3s;
  animation: fadeUp 0.5s ease both;
}
.section:hover { border-color: rgba(56,15,233,0.38); }

.section-number {
  font-family: 'Syne', sans-serif; font-size: var(--text-sm); font-weight: 700;
  letter-spacing: 0.16em; text-transform: uppercase;
  color: var(--blue); margin-bottom: 12px;
}
h2 {
  font-family: 'Syne', sans-serif; font-size: 1.3rem; font-weight: 700;
  color: #fff; margin-bottom: 16px; letter-spacing: -0.01em;
}

/* ── DEEP: styles inside v-html ── */
.section :deep(p),
.contact-card :deep(p) {
  color: rgba(232,230,255,0.75); margin-bottom: 12px;
}
.section :deep(p:last-child) { margin-bottom: 0; }

.section :deep(ul) { margin: 12px 0; padding-left: 0; list-style: none; }
.section :deep(li) {
  color: rgba(232,230,255,0.75); padding: 6px 0 6px 24px;
  position: relative; border-bottom: 1px solid rgba(56,15,233,0.08);
}
.section :deep(li:last-child) { border-bottom: none; }
.section :deep(li::before) {
  content: '→'; position: absolute; left: 0;
  color: var(--blue); font-size: 0.85em; top: 7px;
}
.section :deep(strong) { color: #fff; font-weight: 500; }

.section :deep(.highlight) {
  background: rgba(56,15,233,0.1);
  border: 1px solid rgba(56,15,233,0.3);
  border-left: 3px solid var(--blue);
  border-radius: var(--r-md); padding: 16px 20px; margin: 16px 0;
}
.section :deep(.highlight p) { color: var(--blue-light); margin: 0; }

.section :deep(.no-cookie) {
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(240,255,31,0.08);
  border: 1px solid rgba(240,255,31,0.25);
  border-radius: var(--r-pill); padding: 8px 16px;
  font-size: var(--text-sm); font-weight: 500; color: var(--yellow); margin-top: 12px;
}

/* ── CONTACT CARD ── */
.contact-card {
  background: linear-gradient(135deg, rgba(56,15,233,0.15), rgba(56,15,233,0.05));
  border: 1px solid rgba(56,15,233,0.35);
  border-radius: var(--r-xl); padding: 40px; margin-top: 32px;
  animation: fadeUp 0.5s ease both;
}
.contact-card h2 { color: var(--yellow); }
.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid var(--border);
  min-width: 0;
}
.contact-item:last-child { border-bottom: none; }
.contact-label {
  font-size: var(--text-sm); font-weight: 600; letter-spacing: 0.1em;
  text-transform: uppercase; color: rgba(232,230,255,0.4);
  min-width: 72px; flex-shrink: 0; padding-top: 1px;
}
.contact-value {
  color: #fff;
  min-width: 0;
  overflow-wrap: anywhere;
}
.contact-value :deep(a) {
  color: var(--yellow); text-decoration: none;
  border-bottom: 1px solid rgba(240,255,31,0.3); transition: border-color 0.2s;
}
.contact-value :deep(a:hover) { border-color: var(--yellow); }

/* ── FOOTER ── */
footer {
  border-top: 1px solid var(--border);
  padding: 32px 24px; text-align: center;
}
footer p { font-size: var(--text-sm); color: rgba(232,230,255,0.3); margin: 0; }
footer strong { color: rgba(232,230,255,0.5); }


@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── RESPONSIVE ── */
@media (max-width: 600px) {
  .section, .contact-card { padding: 24px 20px; }
  .hero { padding: 48px 20px 32px; }
  main { padding: 0 20px 128px; }
  .contact-item { flex-direction: column; gap: 4px; }
}
</style>