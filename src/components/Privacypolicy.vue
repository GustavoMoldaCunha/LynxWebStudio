<template>
  <div class="privacy-page">
    <MenuBtn />

    <article class="pp-content">
      <header class="pp-header">
        <div class="section-deco pp-deco">
          <SectionDecoDraw orientation="horizontal" observe-target=".pp-header">
            <template #star>
              <DecoSparkle class="section-deco-sparkle" />
            </template>
            <template #line>
              <SectionDecoLine class="section-deco-line" />
            </template>
          </SectionDecoDraw>
          <span class="section-deco-label">[ privacidade ]</span>
        </div>
        <h1>Política de <em>Privacidade</em></h1>
        <p class="pp-lead">
          Como tratamos os dados pessoais coletados neste site, em conformidade com a LGPD.
        </p>
        <p class="pp-updated">Última atualização: 3 de julho de 2026</p>
      </header>

      <div class="pp-body">
        <section v-for="(sec, i) in sections" :key="i" class="pp-section">
          <h2>{{ sec.title }}</h2>
          <div class="pp-section-content" v-html="sec.content" />
        </section>

        <section class="pp-section pp-contact">
          <h2>Dúvidas sobre privacidade?</h2>
          <p class="pp-contact-intro">
            Para exercer seus direitos ou esclarecer qualquer ponto desta política, fale conosco:
          </p>
          <div class="pp-contact-info">
            <div class="pp-contact-item" v-for="item in contactItems" :key="item.label">
              <span class="pp-contact-label">{{ item.label }}</span>
              <span class="pp-contact-value" v-html="item.value" />
            </div>
          </div>
        </section>
      </div>
    </article>

    <SiteFooter />
  </div>
</template>

<script setup>
import MenuBtn from './Navbar.vue'
import SiteFooter from './SiteFooter.vue'
import DecoSparkle from './DecoSparkle.vue'
import SectionDecoDraw from './SectionDecoDraw.vue'
import SectionDecoLine from './SectionDecoLine.vue'

const sections = [
  {
    title: 'Introdução',
    content: `
      <p>Esta Política de Privacidade explica, de forma clara, quais dados pessoais são coletados neste site, como eles são usados e quais são os seus direitos.</p>
      <p>O tratamento de dados segue a <strong>Lei Geral de Proteção de Dados Pessoais (LGPD — Lei nº 13.709/2018)</strong>.</p>
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
      <p>Para exercer qualquer um dos direitos acima, envie um e-mail para <a href="mailto:contato@lynx.app.br">contato@lynx.app.br</a> com o assunto <strong>“Privacidade — LGPD”</strong>, informando qual direito deseja exercer e dados que permitam identificar sua solicitação.</p>
      <p>Responderemos em até <strong>15 dias úteis</strong>, conforme previsto na LGPD.</p>
    `,
  },
  {
    title: 'Cookies e rastreamento',
    content: `
      <p>Atualmente, este site <strong>não utiliza cookies de rastreamento</strong>, Google Analytics ou ferramentas similares de monitoramento de navegação.</p>
      <p>Está prevista, para o futuro, a implementação de ferramentas de análise (como Google Analytics) para entender o uso do site de forma agregada. Quando isso ocorrer, esta política será <strong>atualizada</strong> com informações sobre quais cookies são usados, suas finalidades e como você pode gerenciá-los.</p>
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
  --blue: #380FE9;
  background: #0A0A14;
  color: #E8E6FF;
  font-family: var(--font-body, 'Lexend Deca', sans-serif);
  font-size: 1rem;
  line-height: 1.75;
  min-height: 100vh;
  width: 100%;
  max-width: 100%;
  overflow-x: clip;
  position: relative;
  padding-inline: var(--section-pad-x, 48px);
}

.privacy-page::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(56, 15, 233, 0.05) 1px, transparent 1px);
  background-size: 28px 28px;
  pointer-events: none;
}

.pp-content {
  position: relative;
  z-index: 1;
  max-width: var(--section-max-width, 1280px);
  margin: 0 auto;
  padding: calc(5rem + var(--section-pad-y, 96px)) 0 var(--section-pad-y, 96px);
}

.pp-deco {
  margin-bottom: 16px;
}

.pp-header {
  max-width: 640px;
  margin-bottom: 64px;
}

.pp-header h1 {
  font-family: var(--font-display, 'Noto Serif', serif);
  font-size: clamp(2.4rem, 4.5vw, 4rem);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.025em;
  color: #E8E6FF;
  margin: 0 0 16px;
}

.pp-lead {
  color: #9090B0;
  margin: 0 0 12px;
  max-width: 560px;
}

.pp-updated {
  font-size: var(--text-sm);
  color: rgba(232, 230, 255, 0.45);
  margin: 0;
  letter-spacing: 0.02em;
}

.pp-body {
  max-width: 640px;
  border-top: 1px solid rgba(56, 15, 233, 0.18);
}

.pp-section {
  padding: 40px 0;
  border-bottom: 1px solid rgba(56, 15, 233, 0.18);
}

.pp-section h2 {
  font-family: var(--font-display, 'Noto Serif', serif);
  font-size: 1.15rem;
  font-weight: 700;
  color: #E8E6FF;
  margin: 0 0 16px;
  letter-spacing: -0.01em;
}

.pp-section-content :deep(p) {
  color: rgba(232, 230, 255, 0.72);
  margin: 0 0 12px;
}

.pp-section-content :deep(p:last-child) {
  margin-bottom: 0;
}

.pp-section-content :deep(ul) {
  list-style: none;
  margin: 12px 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.pp-section-content :deep(li) {
  position: relative;
  padding-left: 20px;
  color: rgba(232, 230, 255, 0.72);
  line-height: 1.6;
}

.pp-section-content :deep(li::before) {
  content: '';
  position: absolute;
  left: 0;
  top: 0.62em;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--blue);
}

.pp-section-content :deep(strong) {
  color: #E8E6FF;
  font-weight: 600;
}

.pp-section-content :deep(a) {
  color: #F0FF1F;
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-color: rgba(240, 255, 31, 0.35);
}

.pp-contact-intro {
  color: rgba(232, 230, 255, 0.72);
  margin: 0 0 24px;
}

.pp-contact-info {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.pp-contact-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.pp-contact-label {
  font-size: var(--text-sm);
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #F0FF1F;
}

.pp-contact-value {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.8);
  overflow-wrap: anywhere;
}

.pp-contact-value :deep(a) {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-color: rgba(255, 255, 255, 0.25);
}

@media (max-width: 920px) {
  .pp-content {
    padding-top: calc(4.5rem + 64px);
    padding-bottom: 64px;
  }

  .pp-header {
    margin-bottom: 48px;
  }

  .pp-section {
    padding: 32px 0;
  }
}
</style>
