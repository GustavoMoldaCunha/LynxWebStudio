<template>
  <div class="privacy-page">
    <header class="pp-topbar">
      <RouterLink to="/" class="pp-back">
        <ArrowLeft :size="16" stroke-width="2.5" />
        Voltar ao site
      </RouterLink>
    </header>

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
        <span class="meta-tag">Última atualização: 3 de julho de 2026</span>
        <span class="meta-tag">lynx.app.br</span>
        <span class="meta-tag">LGPD</span>
      </div>
    </div>

    <main>
      <div class="section" v-for="(sec, i) in sections" :key="i">
        <div class="section-number">{{ String(i + 1).padStart(2, '0') }} —</div>
        <h2>{{ sec.title }}</h2>
        <div v-html="sec.content" />
      </div>

      <div class="contact-card">
        <div class="section-number">Contato</div>
        <h2>Dúvidas sobre privacidade?</h2>
        <p>Para exercer seus direitos ou esclarecer qualquer ponto desta política, fale conosco:</p>
        <div class="contact-item" v-for="item in contactItems" :key="item.label">
          <span class="contact-label">{{ item.label }}</span>
          <span class="contact-value" v-html="item.value" />
        </div>
      </div>
    </main>

    <footer class="pp-footer">
      <p>© 2026 <strong>LYNX Studio</strong> — lynx.app.br. Todos os direitos reservados.<br />
      Esta política pode ser atualizada periodicamente. Recomendamos revisá-la com regularidade.</p>
    </footer>
  </div>
</template>

<script setup>
import { ArrowLeft } from 'lucide-vue-next'
import DecoSparkle from './DecoSparkle.vue'
import SectionDecoDraw from './SectionDecoDraw.vue'
import SectionDecoLine from './SectionDecoLine.vue'

const sections = [
  {
    title: 'Introdução',
    content: `
      <p>Esta Política de Privacidade explica, de forma clara, quais dados pessoais são coletados neste site, como eles são usados e quais são os seus direitos.</p>
      <p>O tratamento de dados segue a <strong>Lei Geral de Proteção de Dados Pessoais (LGPD — Lei nº 13.709/2018)</strong>.</p>
      <div class="highlight"><p>Ao preencher e enviar o formulário de contato, você declara estar ciente e de acordo com esta política.</p></div>
    `,
  },
  {
    title: 'Quem é o responsável pelo tratamento',
    content: `
      <p>O responsável pelo tratamento dos dados pessoais coletados neste site é <strong>o responsável por este site</strong> (lynx.app.br), projeto de estúdio web em operação pessoal.</p>
      <p>Atualmente não há CNPJ vinculado a esta operação, mas esta política será atualizada caso a estrutura jurídica do projeto mude.</p>
      <p>Para assuntos relacionados a privacidade e dados pessoais, utilize o e-mail <strong>contato@lynx.app.br</strong>.</p>
    `,
  },
  {
    title: 'Quais dados coletamos e para quê',
    content: `
      <p>Coletamos apenas os dados que você informa voluntariamente ao entrar em contato conosco.</p>
      <p><strong>Formulário de contato</strong> — ao enviar uma mensagem, coletamos:</p>
      <ul>
        <li><strong>Nome</strong> — para identificar quem entrou em contato</li>
        <li><strong>Telefone ou WhatsApp</strong> — para retornar sua solicitação</li>
        <li><strong>Mensagem</strong> — o conteúdo do seu pedido, dúvida ou projeto</li>
      </ul>
      <p><strong>Finalidade:</strong> usar essas informações exclusivamente para <strong>ler, responder e dar continuidade ao seu contato</strong>.</p>
      <p>Os dados do formulário são encaminhados por e-mail, via serviço técnico de envio, para <strong>contato@lynx.app.br</strong>. Não utilizamos esses dados para publicidade, perfis de comportamento ou finalidades diferentes da resposta ao contato.</p>
    `,
  },
  {
    title: 'Base legal do tratamento',
    content: `
      <p>O tratamento dos dados informados no formulário de contato tem como base legal o <strong>consentimento</strong>, nos termos do art. 7º, I, da LGPD.</p>
      <p>Ao preencher o formulário e clicar em enviar, você consente que seus dados sejam tratados para a finalidade descrita nesta política.</p>
      <p>Você pode <strong>revogar esse consentimento</strong> a qualquer momento — veja a seção sobre seus direitos abaixo.</p>
    `,
  },
  {
    title: 'Compartilhamento de dados',
    content: `
      <p>Seus dados <strong>não são vendidos, alugados nem compartilhados</strong> com terceiros para fins comerciais ou de marketing.</p>
      <p>Os dados podem ser tratados apenas por:</p>
      <ul>
        <li><strong>Resend</strong> — provedor técnico de envio de e-mail, que atua como operador para entregar a mensagem do formulário ao responsável pelo site. O Resend processa os dados estritamente para viabilizar o envio do e-mail.</li>
        <li><strong>Autoridades competentes</strong> — quando houver obrigação legal, regulatória ou ordem judicial.</li>
      </ul>
    `,
  },
  {
    title: 'Por quanto tempo guardamos os dados',
    content: `
      <p>As mensagens de contato são mantidas pelo tempo necessário para <strong>responder e concluir o atendimento</strong> da sua solicitação.</p>
      <p>Após o encerramento do contato, os dados podem ser conservados por até <strong>12 meses</strong>, para registro de comunicações e eventual retomada de conversas. Passado esse prazo, buscamos excluir ou anonimizar as informações, salvo quando a lei exigir retenção por período maior.</p>
    `,
  },
  {
    title: 'Seus direitos (LGPD)',
    content: `
      <p>De acordo com a LGPD, você tem direito a:</p>
      <ul>
        <li><strong>Acesso</strong> — confirmar se tratamos seus dados e solicitar uma cópia</li>
        <li><strong>Correção</strong> — corrigir dados incompletos, inexatos ou desatualizados</li>
        <li><strong>Exclusão</strong> — solicitar a eliminação dos dados, quando aplicável</li>
        <li><strong>Portabilidade</strong> — receber seus dados em formato estruturado, quando couber</li>
        <li><strong>Revogação do consentimento</strong> — retirar o consentimento a qualquer momento, sem prejuízo de tratamentos realizados antes da revogação</li>
      </ul>
    `,
  },
  {
    title: 'Como exercer seus direitos',
    content: `
      <p>Para exercer qualquer um dos direitos acima, envie um e-mail para <strong><a href="mailto:contato@lynx.app.br">contato@lynx.app.br</a></strong> com o assunto <strong>“Privacidade — LGPD”</strong>, informando qual direito deseja exercer e dados que permitam identificar sua solicitação.</p>
      <p>Responderemos em até <strong>15 dias úteis</strong>, conforme previsto na LGPD.</p>
    `,
  },
  {
    title: 'Cookies e rastreamento',
    content: `
      <p>Atualmente, este site <strong>não utiliza cookies de rastreamento</strong>, Google Analytics ou ferramentas similares de monitoramento de navegação.</p>
      <div class="no-cookie">✓ Sem cookies de rastreamento ou publicidade no momento</div>
      <p style="margin-top: 16px;">Está prevista, para o futuro, a implementação de ferramentas de análise (como Google Analytics) para entender o uso do site de forma agregada. Quando isso ocorrer, esta política será <strong>atualizada</strong> com informações sobre quais cookies são usados, suas finalidades e como você pode gerenciá-los.</p>
    `,
  },
]

const contactItems = [
  { label: 'Site', value: 'lynx.app.br' },
  { label: 'E-mail', value: '<a href="mailto:contato@lynx.app.br">contato@lynx.app.br</a>' },
  { label: 'Assunto', value: 'Privacidade — LGPD' },
]
</script>

<style scoped>
.privacy-page {
  --yellow: var(--accent-yellow, #F0FF1F);
  --blue: #380FE9;
  --blue-light: #E8E6FF;
  --dark: #0A0A14;
  --border: rgba(56, 15, 233, 0.18);
  --r-sm: 8px;
  --r-md: 12px;
  --r-xl: 24px;
  --r-pill: 999px;

  background: var(--dark);
  color: var(--blue-light);
  font-family: var(--font-body, 'Lexend Deca', sans-serif);
  font-size: 16px;
  line-height: 1.7;
  min-height: 100vh;
  width: 100%;
  max-width: 100%;
  overflow-x: clip;
}

.pp-topbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(10, 10, 20, 0.85);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border);
  padding: 16px 24px;
}

.pp-back {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: rgba(232, 230, 255, 0.75);
  text-decoration: none;
  font-size: var(--text-sm);
  transition: color 0.2s ease;
}

.pp-back:hover {
  color: var(--yellow);
}

.hero {
  max-width: 800px;
  margin: 0 auto;
  padding: 64px 24px 48px;
}

.hero-deco {
  margin-bottom: 24px;
}

h1 {
  font-family: var(--font-display, 'Noto Serif', serif);
  font-size: clamp(2rem, 5vw, 3.2rem);
  font-weight: 700;
  line-height: 1.1;
  color: #fff;
  margin-bottom: 24px;
  letter-spacing: -0.02em;
}

h1 em {
  font-style: italic;
  color: var(--yellow);
}

.hero-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.meta-tag {
  font-size: var(--text-sm);
  color: rgba(232, 230, 255, 0.5);
  border: 1px solid var(--border);
  border-radius: var(--r-pill);
  padding: 4px 12px;
}

main {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 24px 128px;
}

.section {
  border: 1px solid var(--border);
  border-radius: var(--r-xl);
  padding: 40px;
  margin-bottom: 16px;
  background: rgba(13, 13, 26, 0.6);
  backdrop-filter: blur(8px);
  transition: border-color 0.3s;
}

.section:hover {
  border-color: rgba(56, 15, 233, 0.38);
}

.section-number {
  font-family: var(--font-body, 'Lexend Deca', sans-serif);
  font-size: var(--text-sm);
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--blue);
  margin-bottom: 12px;
}

h2 {
  font-family: var(--font-display, 'Noto Serif', serif);
  font-size: 1.3rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 16px;
  letter-spacing: -0.01em;
}

.section :deep(p),
.contact-card :deep(p) {
  color: rgba(232, 230, 255, 0.75);
  margin-bottom: 12px;
}

.section :deep(p:last-child) {
  margin-bottom: 0;
}

.section :deep(ul) {
  margin: 12px 0;
  padding-left: 0;
  list-style: none;
}

.section :deep(li) {
  color: rgba(232, 230, 255, 0.75);
  padding: 6px 0 6px 24px;
  position: relative;
  border-bottom: 1px solid rgba(56, 15, 233, 0.08);
}

.section :deep(li:last-child) {
  border-bottom: none;
}

.section :deep(li::before) {
  content: '→';
  position: absolute;
  left: 0;
  color: var(--blue);
  font-size: 0.85em;
  top: 7px;
}

.section :deep(strong) {
  color: #fff;
  font-weight: 500;
}

.section :deep(a) {
  color: var(--yellow);
  text-decoration: none;
  border-bottom: 1px solid rgba(240, 255, 31, 0.3);
  transition: border-color 0.2s;
}

.section :deep(a:hover) {
  border-color: var(--yellow);
}

.section :deep(.highlight) {
  background: rgba(56, 15, 233, 0.1);
  border: 1px solid rgba(56, 15, 233, 0.3);
  border-left: 3px solid var(--blue);
  border-radius: var(--r-md);
  padding: 16px 20px;
  margin: 16px 0;
}

.section :deep(.highlight p) {
  color: var(--blue-light);
  margin: 0;
}

.section :deep(.no-cookie) {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(240, 255, 31, 0.08);
  border: 1px solid rgba(240, 255, 31, 0.25);
  border-radius: var(--r-pill);
  padding: 8px 16px;
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--yellow);
  margin-top: 12px;
}

.contact-card {
  background: linear-gradient(135deg, rgba(56, 15, 233, 0.15), rgba(56, 15, 233, 0.05));
  border: 1px solid rgba(56, 15, 233, 0.35);
  border-radius: var(--r-xl);
  padding: 40px;
  margin-top: 32px;
}

.contact-card h2 {
  color: var(--yellow);
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid var(--border);
  min-width: 0;
}

.contact-item:last-child {
  border-bottom: none;
}

.contact-label {
  font-size: var(--text-sm);
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(232, 230, 255, 0.4);
  min-width: 72px;
  flex-shrink: 0;
  padding-top: 1px;
}

.contact-value {
  color: #fff;
  min-width: 0;
  overflow-wrap: anywhere;
}

.contact-value :deep(a) {
  color: var(--yellow);
  text-decoration: none;
  border-bottom: 1px solid rgba(240, 255, 31, 0.3);
  transition: border-color 0.2s;
}

.contact-value :deep(a:hover) {
  border-color: var(--yellow);
}

.pp-footer {
  border-top: 1px solid var(--border);
  padding: 32px 24px;
  text-align: center;
}

.pp-footer p {
  font-size: var(--text-sm);
  color: rgba(232, 230, 255, 0.3);
  margin: 0;
}

.pp-footer strong {
  color: rgba(232, 230, 255, 0.5);
}

@media (max-width: 600px) {
  .section,
  .contact-card {
    padding: 24px 20px;
  }

  .hero {
    padding: 48px 20px 32px;
  }

  main {
    padding: 0 20px 128px;
  }

  .contact-item {
    flex-direction: column;
    gap: 4px;
  }
}
</style>
