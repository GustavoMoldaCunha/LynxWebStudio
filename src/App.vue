<template>

<!---------------------- NAVBAR --------------------->  
  <MenuBtn />
  <ScrollSparkle />

  <main id="main-content">
<!---------------------- HERO --------------------->  
  <section ref="heroRef" class="banner hero" id="top">
    <div class="hero-sky" aria-hidden="true">
      <HeroStarfield
        :parallax-back="heroParallax.offsets.starsBack"
        :parallax-mid="heroParallax.offsets.starsMid"
      />
      <HeroShootingStar />
    </div>
    <HeroTerrain :style="heroParallax.layers.terrain" />
    <div class="hero-front">
      <div class="banner-copy" :style="heroParallax.layers.copy">
        <div class="banner-copy-head">
          <TypingTitle
            tag="h1"
            class="banner-title"
            :threshold="0"
            :delay="0"
            :lines="[
              [
                { text: 'Conectando sua empresa ao ' },
                { text: 'digital', accentClass: 'accent' }
              ]
            ]"
          />
          <ScrollReveal
            tag="p"
            class="banner-description"
            :threshold="0"
            :delay="120"
          >
            Lynx é um estúdio de DESIGN e DESENVOLVIMENTO WEB que transforma presença digital em clientes, com sites de alto padrão e atendimento automatizado por IA.
          </ScrollReveal>
        </div>
        <ScrollReveal tag="div" class="banner-footer" :threshold="0" :delay="220">
          <div class="banner-footer-buttons">
            <div class="banner-footer-side banner-footer-side--left">
              <a class="scroll-btn scroll-btn--outline btn-link banner-footer-link" href="#servicos">
                <span>Ver serviços</span>
                <ArrowDown :size="12" stroke-width="2.5" />
              </a>
            </div>
            <div class="banner-footer-side banner-footer-side--right">
              <button class="scroll-btn banner-footer-cta" @click="scrollToContato">Peça agora</button>
            </div>
          </div>
        </ScrollReveal>
      </div>
      <div class="hero-constellation-band" aria-hidden="true">
        <HeroConstellations
          :parallax-x="heroParallax.offsets.constellation.x"
          :parallax-y="heroParallax.offsets.constellation.y"
        />
      </div>
    </div>
  </section>

<!---------------------- SERVIÇOS -------------------------->  
  <section class="servicos" id="servicos">

    <div class="intro-wrapper">

      <div class="intro-decoracao esquerda">
        <span class="secao-label">[ vantagens ]</span>
        <SectionDecoDraw observe-target=".intro-wrapper">
          <template #line>
            <SectionDecoLine class="barra-lateral" orientation="vertical" />
          </template>
          <template #star>
            <DecoSparkle class="deco-angulo deco-sparkle" />
          </template>
        </SectionDecoDraw>
      </div>

      <div class="intro-centro">
        <TypingTitle
          class="intro-headline"
          :lines="[
            [
              { text: 'Como nós podemos ' },
              { text: 'ajudar', accentClass: 'accent' },
              { text: ' o seu negócio' }
            ]
          ]"
        />
        <p class="intro-sub">Investir em site responsivo, design atraente e velocidade gera vantagem competitiva</p>

        <div class="vantagens-wrap">
          <div class="vantagens">
            <div class="vantagem-bar"
              v-for="item in vantagens"
              :key="item.title">
              <div class="vantagem-header">
                <div class="icon-box">
                  <component :is="item.icon" />
                </div>
                <h3>{{ item.title }}</h3>
                <span class="vantagem-chevron" aria-hidden="true">
                  <ChevronDown />
                </span>
              </div>
              <p>{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="intro-decoracao direita">
        <SectionDecoDraw observe-target=".intro-wrapper" reverse>
          <template #star>
            <DecoSparkle class="deco-angulo deco-sparkle" />
          </template>
          <template #line>
            <SectionDecoLine class="barra-lateral" orientation="vertical" reverse />
          </template>
        </SectionDecoDraw>
      </div>

    </div>

    <div ref="servicesTrack" class="services-track">
    <div ref="servicesPanel" class="services-panel">
      <div class="services-panel-header">
        <div class="section-deco services-panel-deco">
          <SectionDecoDraw orientation="horizontal" observe-target=".services-panel">
            <template #star>
              <DecoSparkle class="section-deco-sparkle" />
            </template>
            <template #line>
              <SectionDecoLine class="section-deco-line" />
            </template>
          </SectionDecoDraw>
          <span class="section-deco-label">[ serviços ]</span>
        </div>
      </div>

      <div ref="servicesStage" class="services-stage">
      <div ref="servicesStackList" class="services-stack">
        <article
          v-for="(service, index) in listaServicos"
          :key="service.num"
          class="service-card"
          :class="{
            'service-card--last': index === listaServicos.length - 1,
            'service-card--collapsed': cardMotion[index]?.collapsed,
          }"
          :style="{
            zIndex: cardMotion[index]?.zIndex ?? index + 1,
            transform: cardMotion[index]?.transform ?? (index === 0 ? 'translate3d(0,0,0)' : 'translate3d(0,100%,0)'),
          }"
        >
          <div class="service-card-inner">
            <div class="service-row-top">
              <span class="service-num">{{ service.num }}</span>
            </div>

            <div class="service-row-body">
              <div class="service-row-main">
                <h3 class="service-title">
                  {{ service.title }}
                  <span v-if="service.isNew" class="service-new-badge">NOVO</span>
                </h3>

                <div class="service-expand">
                  <div class="service-expand-inner">
                    <div class="service-row-detail">
                      <div class="service-tags">
                        <span v-for="tag in service.tags" :key="tag" class="service-tag">
                          {{ tag }}
                        </span>
                      </div>
                      <p class="service-desc">{{ service.desc }}</p>
                    </div>

                    <div class="service-row-aside">
                      <img
                        class="service-illustration"
                        :src="service.image"
                        :alt="`Ilustração de ${service.title}`"
                        loading="lazy"
                      />
                      <button
                        type="button"
                        class="services-cta-btn services-cta-btn--inline"
                        @click="solicitarServico(service)"
                      >
                        Solicitar orçamento
                        <span class="services-cta-arrow">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
      </div>

      <div class="services-panel-footer">
        <div class="services-footer-left section-deco">
          <SectionDecoDraw orientation="horizontal" observe-target=".services-panel">
            <template #star>
              <DecoSparkle class="section-deco-sparkle" />
            </template>
            <template #line>
              <SectionDecoLine class="section-deco-line" />
            </template>
          </SectionDecoDraw>
          <p class="services-footer-text">Para pedidos específicos, por favor nos contate.</p>
        </div>
        <button class="services-cta-btn" @click="scrollToContato">
          Comece seu Projeto Agora
          <span class="services-cta-arrow">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </span>
        </button>
      </div>
    </div>
    </div>
    
    <div class="extras-grid">
      <ScrollReveal
        v-for="(item, index) in extras"
        :key="item.title"
        class="extra-card"
        :delay="index * 120"
      >
        <div class="icon-box-extra">
          <component :is="item.icon" />
        </div>
        <div class="extra-card-body">
          <h4>{{ item.title }}</h4>
          <p>{{ item.desc }}</p>
        </div>
      </ScrollReveal>
    </div>

    <div class="outros-block">
      <div class="outros-top">
        <p class="outros-sub">
          [ outros serviços ]
          <SectionDecoDraw
            orientation="horizontal"
            observe-target=".outros-block"
            class="outros-sub-deco"
          >
            <template #star>
              <DecoSparkle class="outros-sub-sparkle" />
            </template>
            <template #line>
              <SectionDecoLine class="outros-sub-line" />
            </template>
          </SectionDecoDraw>
        </p>
        <TypingTitle
          class="outros-headline"
          :lines="[
            [{ text: 'Já tem um site?' }],
            [{ text: 'Sem problema.', accentClass: 'accent' }]
          ]"
        />
      </div>

      <div class="outros-cards">
        <ScrollReveal
          v-for="(item, index) in outrosServicos"
          :key="item.title"
          class="outro-card"
          :delay="index * 120"
          role="button"
          tabindex="0"
          :aria-label="`Solicitar ${item.title}`"
          @click="solicitarServico(item)"
          @keydown.enter.prevent="solicitarServico(item)"
          @keydown.space.prevent="solicitarServico(item)"
        >
          <div class="outro-icon-wrap">
            <component :is="item.icon" />
          </div>
          <h4>{{ item.title }}</h4>
          <p>{{ item.desc }}</p>
          <span class="outro-cta"><component :is="ArrowUpRight" class="outro-arrow" /></span>
        </ScrollReveal>
      </div>
    </div>
  </section>
  
  <!---------------------- PORTFOLIO --------------------->
  <section class="portfolio" id="portfolio">
    <div class="outros-inner">

      <div class="portfolio-header">
        <div class="portfolio-header-left">
          <TypingTitle
            class="portfolio-headline"
            :delay="0"
            :lines="[
              [{ text: 'O que nós' }],
              [{ text: 'Construímos', accentClass: 'portfolio-accent' }]
            ]"
          />
        </div>
        <ScrollReveal class="section-deco portfolio-deco" :delay="120">
          <SectionDecoDraw orientation="horizontal" observe-target=".portfolio-header">
            <template #star>
              <DecoSparkle class="section-deco-sparkle" />
            </template>
            <template #line>
              <SectionDecoLine class="section-deco-line" />
            </template>
          </SectionDecoDraw>
          <span class="section-deco-label">[ Sites em Destaque ]</span>
        </ScrollReveal>
      </div>

      <div class="portfolio-stage">
        <ScrollReveal class="portfolio-browser-reveal" :delay="240">
          <div class="portfolio-browser">
            <div class="browser-bar">
              <span class="browser-dot"></span>
              <span class="browser-dot"></span>
              <span class="browser-dot"></span>
              <span class="browser-url">{{ projetos[activeProject].url }}</span>
            </div>
            <a
              :href="projetos[activeProject].link"
              :target="projetos[activeProject].link !== '#' ? '_blank' : null"
              :rel="projetos[activeProject].link !== '#' ? 'noopener noreferrer' : null"
              class="browser-screen-link"
              @click="projetos[activeProject].link === '#' && $event.preventDefault()"
            >
              <div class="browser-screen">
                <div
                  v-for="(projeto, i) in projetos"
                  :key="projeto.num"
                  class="browser-screen-slide"
                  :class="{ 'browser-screen-slide--active': activeProject === i }"
                  :aria-hidden="activeProject !== i"
                >
                  <div
                    v-if="projeto.image"
                    class="browser-screen-track"
                    :class="{ 'browser-screen-track--scroll': projeto.imageScroll }"
                  >
                    <img
                      :src="projeto.image"
                      :alt="`Preview do site ${projeto.title}`"
                      class="browser-screen-img"
                      decoding="async"
                      :loading="i === 0 ? 'eager' : 'lazy'"
                      :fetchpriority="i === 0 ? 'high' : 'low'"
                      draggable="false"
                    />
                  </div>
                  <div
                    v-else-if="projeto.logo"
                    class="browser-placeholder browser-placeholder--logo"
                    :style="{ background: projeto.placeholderBg }"
                  >
                    <img
                      :src="projeto.logo"
                      alt=""
                      class="browser-placeholder-logo"
                      decoding="async"
                      loading="lazy"
                      draggable="false"
                    />
                  </div>
                  <div v-else class="browser-placeholder" :style="{ background: projeto.gradient }">
                    <span class="browser-placeholder-label">{{ projeto.title }}</span>
                  </div>
                </div>
              </div>
            </a>

            <button type="button" class="portfolio-arrow portfolio-arrow--prev" aria-label="Projeto anterior" @click="prevProject">
              <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <button type="button" class="portfolio-arrow portfolio-arrow--next" aria-label="Próximo projeto" @click="nextProject">
              <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        </ScrollReveal>

        <div class="portfolio-info">
          <ScrollReveal tag="span" class="portfolio-num" :delay="360">
            {{ projetos[activeProject].num }} — {{ projetos[activeProject].category }}
          </ScrollReveal>
          <ScrollReveal tag="h3" class="portfolio-title" :delay="480">
            {{ projetos[activeProject].title }}
          </ScrollReveal>
          <ScrollReveal tag="p" class="portfolio-desc" :delay="600">
            {{ projetos[activeProject].desc }}
          </ScrollReveal>
          <ScrollReveal
            tag="a"
            class="portfolio-cta"
            :href="projetos[activeProject].ctaLink ?? projetos[activeProject].link"
            :target="(projetos[activeProject].ctaLink ?? projetos[activeProject].link) !== '#' ? '_blank' : null"
            :delay="720"
          >
            {{ projetos[activeProject].ctaLabel ?? 'Visitar site' }}
            <ArrowUpRight v-if="projetos[activeProject].ctaArrowUp" class="portfolio-cta-arrow" aria-hidden="true" />
            <span v-else aria-hidden="true">→</span>
          </ScrollReveal>

          <ScrollReveal class="portfolio-dots" :delay="840" role="tablist" aria-label="Projetos do portfólio">
            <button
              v-for="(p, i) in projetos"
              :key="i"
              type="button"
              role="tab"
              class="portfolio-dot"
              :class="{ 'portfolio-dot--active': activeProject === i }"
              :aria-label="`Ir para o projeto ${i + 1} de ${projetos.length}: ${p.title}`"
              :aria-selected="activeProject === i"
              @click="activeProject = i"
            />
          </ScrollReveal>
        </div>

      </div>
    </div>
  </section>

  <!---------------------- PROCESSO --------------------->
  <section class="processo" id="processo">
  <div class="processo-wrapper">
    <div class="processo-header">
      <div class="processo-deco-line">
        <SectionDecoDraw orientation="horizontal" observe-target=".processo">
          <template #star>
            <DecoSparkle class="processo-deco-sparkle" />
          </template>
          <template #line>
            <SectionDecoLine class="processo-deco-bar" />
          </template>
        </SectionDecoDraw>
        <span class="processo-label">[ processo ]</span>
      </div>

      <TypingTitle :lines="[[{ text: 'Nosso processo' }]]" />
      <p>
        Um fluxo estratégico para transformar sua ideia em um produto digital
        eficiente, bonito e funcional.
      </p>
    </div>

    <div class="processo-grid">
          <div class="processo-card processo-card-lg">
            <span class="processo-numero">01</span>
            <h3>Estratégia e Briefing</h3>
            <p>
              Começamos com uma conversa para entender seu negócio, seu público e o que o site precisa resolver.
              A partir disso, definimos a estrutura de páginas, o tom visual e as prioridades do projeto — tudo documentado antes de qualquer linha ser desenhada.
            </p>
          </div>

          <div class="processo-card processo-card-sm">
            <span class="processo-numero">02</span>
            <h3>Design da Interface</h3>
            <p>
              Criamos o layout completo do site com base na estratégia definida. Você recebe uma prévia visual para aprovar antes do desenvolvimento começar, evitando retrabalho e ajustando o que for preciso ainda nessa fase.
            </p>
          </div>

          <div class="processo-card processo-card-wide">
            <span class="processo-numero">03</span>
            <h3>Desenvolvimento</h3>
            <p>
              Com o design aprovado, desenvolvemos o site com foco em performance, responsividade (funciona bem em celular, tablet e desktop) e nas integrações necessárias, como formulários, WhatsApp, pagamento ou áreas administrativas.
            </p>
          </div>

          <div class="processo-card processo-card-cta">
            <span class="processo-numero">04</span>
            <h3>Testes, Lançamento e Suporte</h3>
            <p>
              Antes de publicar, testamos o site em diferentes dispositivos e navegadores. Após o lançamento, oferecemos um período de suporte para pequenos ajustes e garantimos que tudo continue funcionando como deveria.
            </p>
            <button class="processo-cta-btn" @click="scrollToContato">Solicite um orçamento</button>
          </div>
        </div>
      </div>
    </section>

  <!---------------------- PRICING --------------------->
  <section class="pricing" id="pricing">
    <div class="pricing-wrapper">

      <div class="pricing-header">
        <div class="section-deco pricing-deco">
          <SectionDecoDraw orientation="horizontal" observe-target=".pricing">
            <template #star>
              <DecoSparkle class="section-deco-sparkle" />
            </template>
            <template #line>
              <SectionDecoLine class="section-deco-line" />
            </template>
          </SectionDecoDraw>
          <span class="section-deco-label">[ preços ]</span>
        </div>
        <TypingTitle
          class="pricing-headline"
          :lines="[
            [
              { text: 'Simples, transparente, ' },
              { text: 'justo', accentClass: 'pricing-accent' }
            ]
          ]"
        />
      </div>

      <div class="pricing-cards">

        <!-- Card Simples -->
        <div class="pricing-card">
          <span class="pricing-tier">Simples</span>
          <div class="pricing-price">
            <span class="pricing-from">a partir de</span>
            <span class="pricing-value">R$570</span>
          </div>
          <p class="pricing-desc">Site institucional profissional de uma página</p>
          <div class="pricing-divider"></div>
          <ul class="pricing-features">
            <li>Layout simples e estruturado</li>
            <li>Site Responsivo (desktop, tablet, celular)</li>
            <li>Animações de scroll básicas</li>
            <li>Formulário de contato</li>
            <li>2 rodadas de revisões</li>
          </ul>
        </div>

        <!-- Card Premium (Recommended) -->
        <div class="pricing-card pricing-card--featured">
          <span class="pricing-badge">Recomendado</span>
          <span class="pricing-tier">Premium</span>
          <div class="pricing-price">
            <span class="pricing-value pricing-value--quote">Sob Orçamento</span>
          </div>
          <p class="pricing-desc">Design personalizado de alto nível</p>
          <div class="pricing-divider"></div>
          <ul class="pricing-features">
            <li>Layout e direção visual customizados</li>
            <li>Site Responsivo (desktop, tablet, celular)</li>
            <li>Animações e interações avançadas</li>
            <li>Vídeo embutido ou galeria filtrável</li>
            <li>Formulário de contato com notificações</li>
            <li>2 rodadas de revisões</li>
          </ul>
        </div>

      </div>
    </div>
  </section>  

  <!---------------------- CONTATO --------------------->
  <section class="contato" id="contato" data-section="contato">
    <div class="contato-inner">
      <!-- Lado esquerdo -->
        <div class="contato-left">
          <TypingTitle
            class="contato-headline"
            :lines="[
              [{ text: 'Vamos Conversar' }],
              [{ text: 'E Conectar', accentClass: 'contato-accent' }]
            ]"
          />
          
          <p class="contato-desc">
            Conte-nos sobre o seu projeto e daremos o primeiro passo juntos.
          </p>

          <div class="contato-info">
            <div class="contato-form-group">
              <span class="contato-label">WhatsApp</span>
              <div class="contato-input-shell contato-info-card">
                <a
                  class="contato-info-link"
                  href="https://wa.me/5522981069554?text=Olá, gostaria de mais informações."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span class="contato-info-text">+55 (22) 98106-9554</span>
                  <ArrowRight class="contato-info-arrow" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div class="contato-form-group">
              <span class="contato-label">E-mail</span>
              <div class="contato-input-shell contato-info-card">
                <a
                  class="contato-info-link"
                  href="mailto:contato@lynx.app.br?subject=Contato%20pelo%20site%20LYNX&body=Olá,%20gostaria%20de%20mais%20informações."
                >
                  <span class="contato-info-text">contato@lynx.app.br</span>
                  <ArrowRight class="contato-info-arrow" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>

      
      <form class="contato-form-wrap" @submit.prevent="enviarFormulario">
        <div class="contato-form-group">
          <label class="contato-label" for="contato-nome">Nome</label>
          <div class="contato-input-shell">
            <input
              id="contato-nome"
              v-model="formNome"
              class="contato-input"
              type="text"
              name="nome"
              placeholder="Seu nome"
              :disabled="formLoading"
              required
            />
          </div>
        </div>

        <div class="contato-form-group">
          <label class="contato-label" for="contato-email">E-mail</label>
          <div
            class="contato-input-shell"
            :class="{ 'contato-input-shell--invalid': mostrarAvisoEmail() }"
          >
            <input
              id="contato-email"
              :value="formEmail"
              class="contato-input"
              type="email"
              name="email"
              inputmode="email"
              autocomplete="email"
              placeholder="seu@email.com"
              :disabled="formLoading"
              required
              @input="onEmailInput"
              @blur="formEmailTocado = true"
            />
          </div>
          <p
            v-if="mostrarAvisoEmail()"
            class="contato-feedback contato-feedback--aviso"
            role="status"
          >
            Informe um e-mail válido com @ e domínio (ex.: nome@empresa.com).
          </p>
        </div>

        <div class="contato-form-group">
          <label class="contato-label" for="contato-telefone">Telefone / Whatsapp</label>
          <div class="contato-input-shell">
            <input
              id="contato-telefone"
              v-model="formTelefone"
              class="contato-input"
              type="tel"
              name="telefone"
              placeholder="+55 (22) 00000-0000"
              :disabled="formLoading"
              required
            />
          </div>
        </div>

        <div class="contato-form-group">
          <label class="contato-label" for="contato-detalhes">Detalhes</label>
          <div class="contato-input-shell contato-input-shell--textarea">
            <textarea
              id="contato-detalhes"
              v-model="formDetalhes"
              class="contato-input contato-textarea"
              name="mensagem"
              placeholder="Conte-nos sobre o seu negócio e o que você precisa..."
              rows="5"
              :disabled="formLoading"
              required
            ></textarea>
          </div>
        </div>

        <p v-if="formErro" class="contato-feedback contato-feedback--erro" role="alert">
          {{ formErro }}
        </p>

        <div class="btn-constellation-contato">
          <button
            class="contato-submit"
            :class="{ 'contato-submit--success': formEnviado }"
            type="submit"
            :disabled="formLoading || formEnviado"
          >
            <span v-if="formLoading">Enviando...</span>
            <span v-else-if="formEnviado">✓ Enviado com sucesso!</span>
            <span v-else>Enviar Solicitação</span>
          </button>
        </div>
      </form>
    </div>
  </section>
  </main>
  <!---------------------- FOOTER --------------------->
  <SiteFooter />
</template>


<script setup>
    import MenuBtn from './components/Navbar.vue'
    import HeroStarfield from './components/HeroStarfield.vue'
    import HeroShootingStar from './components/HeroShootingStar.vue'
    import HeroConstellations from './components/HeroConstellations.vue'
    import HeroTerrain from './components/HeroTerrain.vue'
    import ScrollSparkle from './components/ScrollSparkle.vue'
    import DecoSparkle from './components/DecoSparkle.vue'
    import TypingTitle from './components/TypingTitle.vue'
    import ScrollReveal from './components/ScrollReveal.vue'
    import SectionDecoDraw from './components/SectionDecoDraw.vue'
    import SectionDecoLine from './components/SectionDecoLine.vue'
    import SiteFooter from './components/SiteFooter.vue'
    import { ref, onMounted, nextTick } from 'vue'
    import { scrollTo } from './composables/useLenis'
    import { useHeroMobileMinHeight } from './composables/useHeroMobileMinHeight.js'
    import { useHeroParallax } from './composables/useHeroParallax.js'
    import { useServiceStackScroll } from './composables/useServiceStackScroll.js'
    import LynxLogo from './assets/LynxLogoLetras.png'
    import GeoaxisPreview from './assets/geoaxisambiental.com.br.webp'
    import VictormolPreview from './assets/www.victormol.com.br_.webp'
    import { SlidersHorizontal, Globe, ShieldCheck, Eye, Search, 
             Smartphone, MessageCircle, Zap, Shield, Settings, Instagram, 
             Link2, Code2, ArrowUpRight, ArrowRight, ArrowDown, ChevronDown } from 'lucide-vue-next'

    const vantagens = [
      {
        title: 'Seu negócio visível todos os dias',
        desc: 'Seu site trabalha 24h por você, atraindo clientes mesmo fora do horário comercial.',
        icon: Eye
      },
      {
        title: 'Credibilidade e Profissionalismo',
        desc: 'Seu site transmite profissionalismo e segurança, fazendo sua empresa parecer mais confiável desde o primeiro contato.',
        icon: ShieldCheck
      },
      {
        title: 'Alcance fora das redes sociais',
        desc: 'Você não depende de algoritmos — seu site garante presença online estável e acesso direto aos seus clientes.',
        icon: Globe
      },
      {
        title: 'Controle total do seu negócio online',
        desc: 'Você decide como apresentar sua marca, seus serviços e sua comunicação, sem limitações de plataformas externas.',
        icon: SlidersHorizontal
      }
    ]

    const extras = [
      {
        title: 'Apareça no Google',
        desc: 'SEO técnico desde o primeiro dia.',
        icon: Search
      },
      {
        title: 'Funciona em qualquer dispositivo',
        desc: 'Celular, tablet e computador.',
        icon: Smartphone
      },
      {
        title: 'WhatsApp Integrado',
        desc: 'Contato direto com mensagem personalizada',
        icon: MessageCircle
      },
      {
        title: 'Carregamento rápido',
        desc: 'Menos espera, mais vendas.',
        icon: Zap
      },
      {
        title: 'Segurança e confiabilidade',
        desc: 'HTTPS, backups e boas práticas.',
        icon: Shield
      },
      {
        title: 'Cresce com seu negócio',
        desc: 'Novas páginas e funcionalidades quando você precisar.',
        icon: Settings
      }
    ]

    const outrosServicos = [
      {
        icon: MessageCircle,
        title: 'Automação de WhatsApp',
        desc: 'Respostas automáticas, funis de atendimento e disparo de mensagens para seus clientes.',
        contatoMensagem: 'Desejo contratar automação de WhatsApp.',
      },
      {
        icon: Instagram,
        title: 'Bio Inteligente',
        desc: 'Transforme sua bio do Instagram em uma experiência que guia o visitante até o orçamento ou agendamento.',
        contatoMensagem: 'Desejo criar uma bio inteligente.',
      },
      {
        icon: Link2,
        title: 'Integrações',
        desc: 'WhatsApp, Google Agenda, formulários, CRM, APIs e sistemas da empresa.',
        contatoMensagem: 'Desejo contratar integrações.',
      },
      {
        icon: Code2,
        title: 'Sistemas Sob Medida',
        desc: 'Ferramentas web desenvolvidas para automatizar processos específicos do seu negócio.',
        contatoMensagem: 'Desejo desenvolver um sistema sob medida.',
      },
    ]

    const formNome = ref('')
    const formEmail = ref('')
    const formEmailTocado = ref(false)
    const formTelefone = ref('')
    const formDetalhes = ref('')
    const formEnviado = ref(false)
    const formLoading = ref(false)
    const formErro = ref('')

    const listaServicos = [
      {
        num: '01.',
        title: 'Sites Institucionais',
        tags: ['Marca', 'SEO', 'Web Design'],
        desc: 'Um site institucional que representa sua marca com credibilidade e profissionalismo. Desenvolvido com design moderno, carregamento rápido e otimização para os motores de busca (SEO), para que sua empresa seja encontrada no Google e transforme visitantes em clientes reais. Ideal para quem quer construir autoridade e presença digital sólida.',
        image: '/site_institucional.svg',
        contatoMensagem: 'Desejo criar um site institucional.',
      },
      {
        num: '02.',
        title: 'Landing Pages',
        tags: ['Conversão', 'Campanhas', 'Captação'],
        desc: 'Páginas de alta conversão criadas especificamente para campanhas de tráfego pago, lançamentos de produtos e captação de leads. Layout direto ao ponto, foco total na ação que você quer que o visitante tome — seja preencher um formulário, agendar uma consulta ou fechar uma compra. Cada elemento é pensado para maximizar seu retorno sobre investimento.',
        image: '/landing_page.svg',
        contatoMensagem: 'Desejo criar uma landing page.',
      },
      {
        num: '03.',
        title: 'Lojas Virtuais',
        tags: ['Pagamentos', 'Catálogo', 'Gestão'],
        desc: 'Sua loja online completa, com integração de meios de pagamento (cartão, Pix, boleto), catálogo de produtos organizado e fácil de navegar, e um painel de gestão simples para você controlar estoque, pedidos e vendas sem complicação. Uma solução pronta para vender 24 horas por dia, todos os dias.',
        image: '/ecommerce.svg',
        contatoMensagem: 'Desejo criar uma loja virtual.',
      },
      {
        num: '04.',
        title: 'Assistente Inteligente',
        tags: ['IA', 'Qualificação', 'Atendimento'],
        desc: 'Um assistente de inteligência artificial treinado para atender seus clientes automaticamente, tirar dúvidas frequentes e qualificar quem realmente tem potencial de compra. Ele filtra curiosos e só encaminha pra você (ou pro seu time) os contatos com interesse genuíno — economizando tempo e aumentando a taxa de conversão do seu atendimento.',
        image: '/assistente_inteligente.svg',
        isNew: true,
        contatoMensagem: 'Desejo contratar um assistente inteligente.',
      },
      {
        num: '05.',
        title: 'Link na Bio Profissional',
        tags: ['Instagram', 'IA', 'Conversão'],
        desc: 'Transforme o link da sua bio do Instagram numa mini-página organizada e estratégica. Além de reunir seus principais links, ela conta com um assistente de IA que interage com o visitante, responde perguntas e o conduz até a próxima etapa: pedir um orçamento, agendar um horário ou chamar direto no WhatsApp. Simples pra você, eficiente na conversão.',
        image: '/link_na_bio.svg?v=2',
        isNew: true,
        contatoMensagem: 'Desejo criar um link na bio profissional.',
      }
    ]

    const {
      trackRef: servicesTrack,
      panelRef: servicesPanel,
      stageRef: servicesStage,
      listRef: servicesStackList,
      cardMotion,
    } = useServiceStackScroll({
      getCount: () => listaServicos.length,
    })

    const projetos = ref([
      {
        num: '01',
        category: 'Site Institucional',
        title: 'GeoAxis Consultoria e Engenharia Ambiental',
        desc: 'Site institucional para consultoria ambiental com foco em licenciamento, conformidade legal e soluções sustentáveis para empresas.',
        url: 'geoaxisambiental.com.br',
        link: 'https://geoaxisambiental.com.br/',
        image: GeoaxisPreview,
        imageScroll: true,
        gradient: 'linear-gradient(135deg, #0A0A14 0%, #1a0a4a 50%, #380FE9 100%)'
      },
      {
        num: '02',
        category: 'Site Institucional',
        title: 'Dr. Victor Mol - Radiologista',
        desc: 'Site profissional para radiologista com apresentação de serviços, agendamento de consultas e segunda opinião em exames radiológicos.',
        url: 'victormol.com.br',
        link: 'https://victormol.com.br/',
        image: VictormolPreview,
        imageScroll: true,
        gradient: 'linear-gradient(135deg, #0A0A14 0%, #0d2a1a 50%, #0f6e3a 100%)'
      },
      {
        num: '03',
        category: 'Seu Site',
        title: 'Projeto Disponível',
        desc: 'Seu negócio merece uma presença digital à altura. Vamos construir o seu site juntos.',
        url: 'seusite.com.br',
        link: '#',
        ctaLabel: 'Pedir site',
        ctaLink: '#contato',
        ctaArrowUp: true,
        logo: LynxLogo,
        placeholderBg: '#1A0F55',
        gradient: 'linear-gradient(135deg, #0A0A14 0%, #1a1400 50%, #5a4a00 100%)'
      }
    ])

    const activeProject = ref(0)

    function prevProject() {
      activeProject.value = (activeProject.value - 1 + projetos.value.length) % projetos.value.length
    }

    function nextProject() {
      activeProject.value = (activeProject.value + 1) % projetos.value.length
    }

    function filtrarEmail(value) {
      return value.replace(/[^a-zA-Z0-9.@_+%-]/g, '')
    }

    function emailValido(value) {
      const email = value.trim()
      return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    }

    function mostrarAvisoEmail() {
      const email = formEmail.value.trim()
      if (!formEmailTocado.value && !email) return false
      if (!email) return formEmailTocado.value
      return !emailValido(email)
    }

    function onEmailInput(event) {
      formEmail.value = filtrarEmail(event.target.value)
    }

    async function enviarFormulario() {
      if (formLoading.value || formEnviado.value) return

      formErro.value = ''
      formEmailTocado.value = true

      if (!formNome.value.trim() || !formEmail.value.trim() || !formTelefone.value.trim() || !formDetalhes.value.trim()) {
        formErro.value = 'Preencha nome, e-mail, telefone e detalhes.'
        return
      }

      if (!emailValido(formEmail.value)) {
        formErro.value = 'Informe um e-mail válido com @ e domínio (ex.: nome@empresa.com).'
        return
      }

      formLoading.value = true

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nome: formNome.value.trim(),
            email: formEmail.value.trim(),
            telefone: formTelefone.value.trim(),
            mensagem: formDetalhes.value.trim(),
          }),
        })

        const data = await response.json()

        if (!response.ok || !data.success) {
          throw new Error(data.error || 'Não foi possível enviar. Tente novamente.')
        }

        formEnviado.value = true
        formNome.value = ''
        formEmail.value = ''
        formEmailTocado.value = false
        formTelefone.value = ''
        formDetalhes.value = ''

        setTimeout(() => {
          formEnviado.value = false
        }, 4000)
      } catch (err) {
        formErro.value = err instanceof Error ? err.message : 'Erro ao enviar. Tente novamente.'
      } finally {
        formLoading.value = false
      }
    }

    function scrollToContato(onComplete) {
      const el = document.querySelector('.contato, #contato, [data-section="contato"]')
      if (!el) return

      scrollTo(el, {
        onComplete: () => onComplete?.(),
      })
    }

    function solicitarServico(item) {
      formDetalhes.value = item.contatoMensagem
      formErro.value = ''
      scrollToContato(() => {
        document.getElementById('contato-detalhes')?.focus({ preventScroll: true })
      })
    }

    useHeroMobileMinHeight()

    const heroRef = ref(null)
    const heroParallax = useHeroParallax(heroRef)

    function preloadPortfolioImages() {
      for (const projeto of projetos.value) {
        if (!projeto.image) continue
        const img = new Image()
        img.decoding = 'async'
        img.src = projeto.image
      }
    }

    onMounted(async () => {
      preloadPortfolioImages()
      await nextTick()

      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show')
            revealObserver.unobserve(entry.target)
          }
        })
      }, {
        threshold: 0.2
      })

      document.querySelectorAll('.vantagem-bar').forEach(item => revealObserver.observe(item))
    })
    
</script>


<style scoped>

/* -------------------------------------------------------------
   DESIGN
   -------------------------------------------------------------
   ESPAÇAMENTO: 4 8 12 16 24 32 40 48 64 80 96 128
   CORES:
     --amarelo forte   : #F0FF1F
     --azul forte      : #380FE9
     --azul fraco      : #E8E6FF
     --azul escuro     : #0A0A14
     --azul escuro 2   : #0D0D1A   (para variação de seções)
     --borda           : rgba(56,15,233,0.18)
   RADIUS: --r-sm 8px | --r-md 12px | --r-lg 16px | --r-xl 24px | --r-pill 999px
   --------------------------------------------------------------
*/

/*RESET*/
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

/* ------------------------------- BANNER ---------------------------------------------------- */

.banner.hero {
  position: relative;
  overflow: hidden;
}

.hero-sky {
  position: absolute;
  inset: 0;
  z-index: 1;
  overflow: hidden;
  pointer-events: none;
  isolation: isolate;
  background:
    radial-gradient(ellipse 80% 55% at 50% 0%, rgba(55, 14, 231, 0.28) 0%, transparent 55%),
    radial-gradient(ellipse 60% 40% at 80% 20%, rgba(55, 14, 231, 0.18) 0%, transparent 50%),
    radial-gradient(ellipse 42% 32% at 16% 10%, rgba(55, 14, 231, 0.12) 0%, transparent 62%);
}

.hero-sky::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: clamp(360px, 68vh, 760px);
  background: radial-gradient(
    ellipse 150% 110% at 50% 100%,
    #5a2cff 0%,
    #370EE7 26%,
    rgba(55, 14, 231, 0.42) 48%,
    rgba(55, 14, 231, 0.12) 66%,
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(to top, #000 42%, transparent 100%);
  mask-image: linear-gradient(to top, #000 42%, transparent 100%);
  opacity: 0.6;
  pointer-events: none;
  z-index: 1;
}

.hero-sky :deep(.hero-starfield) {
  z-index: 0;
}

.hero-front {
  position: absolute;
  inset: 0;
  z-index: 4;
  pointer-events: none;
}

.hero-constellation-band {
  position: absolute;
  inset: 0;
  pointer-events: none;
  transform-origin: center center;
}

.hero-constellation-band :deep(.hero-constellations) {
  z-index: 2;
}

.banner {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  min-height: -webkit-fill-available;
  min-height: 100svh;
  min-height: 100dvh;
  box-sizing: border-box;
  padding-top: env(safe-area-inset-top, 0px);
  padding-bottom: env(safe-area-inset-bottom, 0px);
  overflow: hidden;
  isolation: isolate;
  color: #E8E6FF;
  user-select: none;
  background: linear-gradient(to bottom, #0A061C 0%, #160A4A 52%, #370EE7 100%);
  --hero-title: clamp(2.5rem, 0.75rem + 8vw, 5rem);
  --hero-title-line-height: 1.05;
  --hero-title-shadow:
    0 0 18px rgba(232, 230, 255, 0.2),
    0 0 36px rgba(56, 15, 233, 0.12),
    0 0 56px rgba(8, 8, 18, 0.48),
    0 0 112px rgba(8, 8, 18, 0.28),
    0 2px 24px rgba(8, 8, 18, 0.38);
  --hero-title-accent-shadow:
    0 0 16px rgba(240, 255, 31, 0.52),
    0 0 32px rgba(240, 255, 31, 0.34),
    0 0 56px rgba(240, 255, 31, 0.2),
    0 0 88px rgba(240, 255, 31, 0.1);
  --hero-desc: clamp(1rem, 1.15vw, 1.2rem);
  --hero-copy-left: clamp(48px, 12vw, 180px);
  --hero-copy-width: min(50vw, 600px);
  --hero-gap-title-desc: clamp(1.25rem, 2vh, 1.75rem);
  --hero-gap-desc-btn: clamp(2.5rem, 5vh, 4rem);
  --hero-btn-font: clamp(0.8125rem, 0.75rem + 0.35vw, 0.9375rem);
  --hero-btn-secondary-font: clamp(0.8125rem, 0.75rem + 0.35vw, 0.9375rem);
  --hero-btn-pad-y: clamp(12px, 0.65rem + 0.8vw, 18px);
  --hero-btn-pad-x: clamp(22px, 1rem + 2.5vw, 44px);
  --hero-btn-secondary-pad-x: clamp(20px, 0.85rem + 2.2vw, 38px);
  --hero-btn-min-h: clamp(44px, 2.5rem + 1.2vw, 56px);
  --hero-btn-secondary-min-h: clamp(42px, 2.35rem + 1.1vw, 54px);
}

.banner::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: clamp(120px, 22vh, 280px);
  background: linear-gradient(to bottom, transparent 0%, rgba(10, 10, 20, 0.25) 35%, rgba(10, 10, 20, 0.72) 68%, #0A0A14 100%);
  pointer-events: none;
  z-index: 0;
}

@media (min-height: 900px) {
  .banner {
    padding-top: max(env(safe-area-inset-top, 0px), clamp(24px, 5vh, 80px));
    padding-bottom: max(env(safe-area-inset-bottom, 0px), clamp(32px, 4vh, 96px));
  }
}

.banner-inner {
  position: relative;
  z-index: 3;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  max-width: var(--section-max-width);
  min-height: 100%;
  margin: 0 auto;
  padding: clamp(80px, 11vh, 132px) clamp(32px, 6vw, 96px) clamp(36px, 5vh, 72px);
}

.banner-main {
  flex: 1;
  min-height: 0;
}

.banner-copy {
  position: absolute;
  left: var(--hero-copy-left);
  top: 50%;
  z-index: 4;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0;
  width: var(--hero-copy-width);
  max-width: calc(100vw - var(--hero-copy-left) - clamp(24px, 4vw, 48px));
  transform: translateY(-50%) translate3d(var(--hero-parallax-x, 0), var(--hero-parallax-y, 0), 0);
  text-align: left;
  pointer-events: none;
  isolation: isolate;
}

.banner-copy-head {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  width: fit-content;
  max-width: 100%;
}

.banner-copy > * {
  pointer-events: auto;
}

.banner-title {
  display: block;
  width: auto;
  max-width: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-align: left;
  white-space: normal;
  font-size: var(--hero-title);
  font-weight: 700;
  letter-spacing: -0.025em;
  color: #E8E6FF;
  line-height: var(--hero-title-line-height);
  text-shadow: var(--hero-title-shadow);
}

.banner-title :is(.title-accent, .accent) {
  text-shadow: var(--hero-title-accent-shadow);
}

.banner-description {
  width: auto;
  max-width: 100%;
  margin: var(--hero-gap-title-desc) 0 0;
  padding: 0;
  text-align: left;
  font-size: var(--hero-desc);
  line-height: 1.65;
  letter-spacing: 0.01em;
  color: rgba(232, 230, 255, 0.88);
}

.banner-footer {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  min-height: 0;
  flex-shrink: 0;
  margin-top: var(--hero-gap-desc-btn);
  padding-top: 0;
}

.banner-footer-buttons {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  gap: clamp(16px, 2vw, 24px);
}

.banner-footer-side {
  position: relative;
  display: flex;
  align-items: center;
  overflow: visible;
}

.banner-footer-side .scroll-btn {
  position: relative;
  z-index: 1;
}

.banner-footer-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: clamp(6px, 0.8vw, 10px);
  flex-shrink: 0;
  min-width: clamp(152px, 14vw, 200px);
}

.banner-footer-link :deep(svg) {
  width: clamp(16px, 1.3vw, 18px);
  height: clamp(16px, 1.3vw, 18px);
}

.banner-footer-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  min-width: clamp(152px, 14vw, 200px);
}

.btn-link { text-decoration: none; }

.banner-footer .scroll-btn {
  padding: var(--hero-btn-pad-y) var(--hero-btn-pad-x);
  min-height: var(--hero-btn-min-h);
  font-size: var(--hero-btn-font);
  font-weight: 700;
  letter-spacing: 0.12em;
  border-width: 2px;
  border-radius: 999px;
  cursor: pointer;
  font-family: inherit;
  text-transform: uppercase;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, border-color 0.2s ease;
}

.scroll-btn {
  padding: 12px 28px;
  background: #F0FF1F;
  color: #0A0A00;
  border: 1.5px solid #F0FF1F;
  border-radius: 999px;
  cursor: pointer;
  font-size: var(--text-sm);
  font-family: inherit;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.scroll-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(240,255,31,0.32);
}

.scroll-btn:active { transform: scale(0.97); }

.scroll-btn--outline {
  background: #0A0A14;
  color: #F0FF1F;
  border-color: rgba(240, 255, 31, 0.45);
}

.scroll-btn--outline:hover {
  background: #111128;
  border-color: #F0FF1F;
  transform: translateY(-2px);
  box-shadow: 0 0 24px rgba(240, 255, 31, 0.38), 0 8px 28px rgba(240, 255, 31, 0.32);
}




/* ---------------------------- SERVIÇOS ------------------------------------------- */

.servicos {
  background: #0A0A14;
  padding: var(--section-pad-y) var(--section-pad-x);
  /* Avoid overflow clip — it breaks position:sticky in Chromium */
  overflow: visible;
  position: relative;
  z-index: 1;
}

/* Dot grid — very subtle, palette-aligned */
.servicos::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(56,15,233,0.06) 1px, transparent 1px);
  background-size: 28px 28px;
  pointer-events: none;
  z-index: 0;
}

.servicos > * {
  position: relative;
  z-index: 1;
  max-width: var(--section-max-width);
  margin-inline: auto;
  width: 100%;
}

/* ── Intro wrapper (columns with lateral decorations) ── */


.intro-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 0;
}

.secao-label {
  font-size: var(--text-deco);
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #380FE9;
  white-space: nowrap;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  margin-bottom: 8px;
}

.intro-decoracao {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 56px;
  flex-shrink: 0;
}

.intro-decoracao.esquerda { align-items: center; justify-content: flex-start; padding-top: 4px; }
.intro-decoracao.direita  { align-items: center; justify-content: flex-end; padding-bottom: 4px; }

.barra-lateral {
  flex: 1;
  display: block;
  margin: 0 auto;
}

.deco-sparkle {
  display: block;
  width: 28px;
  height: 28px;
  color: #380FE9;
  flex-shrink: 0;
}

.intro-centro {
  flex: 1;
  max-width: 900px;
}

.intro-headline {
  font-size: clamp(2.4rem, 5vw, 4.5rem);
  font-weight: 700;
  color: #E8E6FF;
  line-height: 1.06;
  margin-bottom: 16px;
  letter-spacing: -0.025em;
}

.intro-sub {
  font-size: 1rem;
  color: #9090B0;
  line-height: 1.75;
  max-width: 520px;
  margin: 0 auto 48px;
  text-align: center;
}

.vantagens-wrap {
  position: relative;
  --vantagem-compact-h: 68px;
  --vantagem-expand-h: 84px;
  --vantagem-gap: 8px;
  --vantagem-count: 4;
  height: calc(
    var(--vantagem-count) * var(--vantagem-compact-h) +
    (var(--vantagem-count) - 1) * var(--vantagem-gap) +
    var(--vantagem-expand-h)
  );
}

.vantagens {
  display: flex;
  flex-direction: column;
  gap: var(--vantagem-gap);
  width: 100%;
}

.vantagem-bar {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0;
  padding: 16px 20px;
  border-radius: 14px;
  width: 100%;
  min-height: var(--vantagem-compact-h);
  opacity: 0;
  transform: translateY(16px);
  z-index: 1;
  cursor: pointer;
}

.vantagem-header {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  min-width: 0;
  position: relative;
  z-index: 1;
}

.vantagem-chevron {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  flex-shrink: 0;
  color: #380FE9;
  transition: transform 0.3s ease;
}

.vantagem-chevron svg {
  width: 22px;
  height: 22px;
}

.vantagem-bar:hover .vantagem-chevron {
  transform: rotate(180deg);
}

.vantagem-bar.show { opacity: 1; transform: translateY(0); }

.vantagem-bar.show:hover {
  transform: translateY(-2px);
  z-index: 2;
}

/* Staggered reveal */
.vantagem-bar:nth-child(1) { transition-delay: 0.05s; }
.vantagem-bar:nth-child(2) { transition-delay: 0.12s; }
.vantagem-bar:nth-child(3) { transition-delay: 0.20s; }
.vantagem-bar:nth-child(4) { transition-delay: 0.28s; }

.icon-box {
  position: relative;
  z-index: 1;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #380FE9;
  flex-shrink: 0;
}

.icon-box svg {
  width: 24px;
  height: 24px;
}

.vantagem-bar h3 {
  margin: 0;
  flex: 1;
  min-width: 0;
  font-size: 0.95rem;
  font-weight: 600;
  color: #E8E6FF;
  letter-spacing: -0.01em;
}

/* Expand description on hover — expansion stays within reserved wrap height */
.vantagem-bar p {
  position: relative;
  z-index: 1;
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  margin: 0;
  font-size: var(--text-sm);
  color: #9090B0;
  line-height: 1.72;
  transition: max-height 0.3s ease 0.05s, opacity 0.3s ease 0.05s, margin 0.3s ease;
}

.vantagem-bar:hover p {
  max-height: 80px;
  opacity: 1;
  margin-top: 4px;
}


.services-track {
  --services-track-h: 400vh;
  position: relative;
  width: 100%;
  height: var(--services-track-h);
  margin-top: 80px;
  margin-bottom: 64px;
}

.services-panel {
  --services-sticky-top: calc(5rem + 40px);
  --service-panel-header-h: 2.75rem;
  --service-title-stack-h: 4.75rem;
  --services-panel-pad-x: 44px;
  --services-panel-pad-y-top: 40px;
  --services-panel-pad-y-bottom: 32px;
  --services-stage-h: 60vh;
  width: 100%;
  background: #E8E6FF;
  border-radius: 24px;
  padding: 0;
  position: sticky;
  top: var(--services-sticky-top);
  z-index: 2;
  overflow: hidden;
  font-family: inherit;
  display: flex;
  flex-direction: column;
}

.services-panel-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0;
  padding: var(--services-panel-pad-y-top) var(--services-panel-pad-x) 12px;
  border-bottom: 1px solid rgba(10, 10, 20, 0.12);
  position: relative;
  z-index: 40;
  background: #E8E6FF;
  flex-shrink: 0;
}

.services-panel-deco,
.services-footer-left {
  flex: 1;
  min-width: 0;
}

.services-panel-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  margin-top: 0;
  padding: 24px var(--services-panel-pad-x) var(--services-panel-pad-y-bottom);
  border-top: 1px solid rgba(10,10,20,0.1);
  position: relative;
  z-index: 50;
  background: #E8E6FF;
  flex-shrink: 0;
}

.services-footer-left {
  color: rgba(10,10,20,0.5);
}

.services-footer-text {
  font-size: var(--text-sm);
  color: rgba(10,10,20,0.5);
  line-height: 1.5;
  margin: 0;
  white-space: nowrap;
  flex-shrink: 0;
}

.services-stage {
  position: relative;
  height: var(--services-stage-h);
  overflow: hidden;
  background: #E8E6FF;
  flex-shrink: 0;
}

.services-stack {
  position: absolute;
  inset: 0;
}

.service-card {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: #E8E6FF;
  border-top: 1px solid rgba(10, 10, 20, 0.14);
  padding-inline: var(--services-panel-pad-x);
  margin: 0;
  overflow: hidden;
  transform: translate3d(0, 0, 0);
  will-change: transform;
}

.service-card:first-child {
  border-top: none;
}

.service-card-inner {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 16px 0 28px;
  overflow: visible;
  height: 100%;
  box-sizing: border-box;
}

.service-row-top {
  margin-bottom: 2px;
  line-height: 1;
}

.service-num {
  font-size: 0.75rem;
  font-weight: 600;
  color: rgba(10, 10, 20, 0.45);
  letter-spacing: 0.04em;
  transition: opacity 0.12s ease;
}

.service-row-body {
  display: block;
}

.service-row-main {
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.service-expand {
  display: block;
}

.service-expand-inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, min(280px, 30%));
  gap: 28px 32px;
  align-items: end;
}

.service-row-aside {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-end;
  min-width: 0;
  gap: 12px;
}

.services-panel .service-title {
  font-family: var(--font-display);
  font-weight: 700;
  color: #380FE9;
  font-size: clamp(2.2rem, 5vw, 3.6rem);
  letter-spacing: -0.03em;
  line-height: 1.12;
  margin: 0;
  padding-bottom: 0.08em;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.28em 0.4em;
  transition: opacity 0.12s ease;
}

.service-card--collapsed .service-title {
  opacity: 0.42;
}

.service-card--collapsed .service-num {
  opacity: 0.4;
}

.service-card--collapsed .service-new-badge {
  opacity: 0.55;
}

.service-new-badge {
  display: inline-flex;
  align-items: center;
  font-family: var(--font-body, sans-serif);
  font-size: clamp(0.65rem, 1.2vw, 0.85rem);
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #E8E6FF;
  background: #380FE9;
  border-radius: 999px;
  padding: 0.28em 0.7em;
  line-height: 1;
  vertical-align: middle;
  transform: translateY(-0.15em);
  transition: opacity 0.12s ease;
}

.service-row-detail {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 12px;
  max-width: none;
}

.service-tags {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  margin: 0;
}

.service-tag {
  font-size: var(--text-sm);
  font-weight: 500;
  color: #E8E6FF;
  border: 1px solid #380FE9;
  border-radius: 999px;
  padding: 3px 12px;
  background: #380FE9;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  white-space: nowrap;
}

.service-desc {
  font-size: clamp(1.05rem, 1.35vw, 1.2rem);
  color: rgba(10,10,20,0.6);
  line-height: 1.65;
  margin: clamp(64px, 9vh, 112px) 0 0;
  max-width: 28rem;
  padding-top: 0;
}

.service-row-aside .service-illustration {
  display: block;
  width: 100%;
  height: auto;
  max-height: min(260px, 36vh);
  object-fit: contain;
  object-position: bottom center;
}

.services-cta-btn--inline {
  width: fit-content;
  max-width: 100%;
  margin-top: auto;
  align-self: center;
  justify-content: flex-start;
  gap: 4px;
  padding: 9px 10px 9px 14px;
  font-size: 0.8125rem;
}

.services-cta-btn--inline .services-cta-arrow {
  width: 24px;
  height: 24px;
}

.services-cta-btn--inline .services-cta-arrow svg {
  width: 14px;
  height: 14px;
}

/* Panel CTA button */
.services-cta-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  background: #111128;
  color: #E8E6FF;
  border: 1px solid rgba(56,15,233,0.14);
  border-radius: 999px;
  padding: 12px 20px 12px 24px;
  font-size: var(--text-sm);
  font-weight: 600;
  font-family: inherit;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}

.services-cta-btn:hover { background: #380FE9; transform: translateY(-2px); }
.services-cta-btn:active { transform: scale(0.97); }

.services-cta-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(56,15,233,0.1);
  color: #380FE9;
  flex-shrink: 0;
}

.services-cta-btn:hover .services-cta-arrow {
  background: #F0FF1F;
  color: #380FE9;
}


/* ─── EXTRAS GRID ────────────────────────────────────────── */

.extras-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  align-items: stretch;
}

.extra-card,
.outro-card,
.vantagem-bar,
.processo-card,
.pricing-card {
  overflow: hidden;
  background:
    radial-gradient(ellipse 90% 80% at 0% 0%, rgba(138, 138, 255, 0.08) 0%, transparent 58%),
    radial-gradient(ellipse 90% 80% at 100% 100%, rgba(138, 138, 255, 0.08) 0%, transparent 58%),
    #0D0A24;
  backdrop-filter: blur(12px) saturate(120%);
  -webkit-backdrop-filter: blur(12px) saturate(120%);
  border: none;
  transition: transform 0.22s ease, background 0.22s ease;
}

.extra-card::before,
.outro-card::before,
.vantagem-bar::before,
.processo-card::before,
.pricing-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background:
    linear-gradient(135deg, rgba(138, 138, 255, 0.38) 0%, rgba(138, 138, 255, 0) 42%),
    linear-gradient(315deg, rgba(138, 138, 255, 0.38) 0%, rgba(138, 138, 255, 0) 42%);
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask-composite: exclude;
  pointer-events: none;
  z-index: 0;
}

.extra-card:hover,
.outro-card:hover,
.processo-card:hover,
.pricing-card:hover {
  background:
    radial-gradient(ellipse 90% 80% at 0% 0%, rgba(138, 138, 255, 0.12) 0%, transparent 58%),
    radial-gradient(ellipse 90% 80% at 100% 100%, rgba(138, 138, 255, 0.12) 0%, transparent 58%),
    #0D0A24;
}

.vantagem-bar.show:hover {
  background:
    radial-gradient(ellipse 90% 80% at 0% 0%, rgba(91, 58, 255, 0.1) 0%, transparent 58%),
    radial-gradient(ellipse 90% 80% at 100% 100%, rgba(91, 58, 255, 0.1) 0%, transparent 58%),
    #100D2A;
}

.vantagem-bar.show:hover {
  box-shadow: 0 6px 28px rgba(8, 8, 22, 0.38);
}

.extra-card:hover::before,
.outro-card:hover::before,
.processo-card:hover::before,
.pricing-card:hover::before {
  background:
    linear-gradient(135deg, rgba(138, 138, 255, 0.52) 0%, rgba(138, 138, 255, 0) 42%),
    linear-gradient(315deg, rgba(138, 138, 255, 0.52) 0%, rgba(138, 138, 255, 0) 42%);
}

.vantagem-bar.show:hover::before {
  background:
    linear-gradient(135deg, rgba(91, 58, 255, 0.62) 0%, rgba(138, 138, 255, 0) 42%),
    linear-gradient(315deg, rgba(91, 58, 255, 0.62) 0%, rgba(138, 138, 255, 0) 42%);
}

.vantagem-bar {
  transition: opacity 0.55s ease, transform 0.55s ease, background 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 0 0 transparent;
}

.vantagem-bar::before {
  transition: background 0.2s ease;
}

.extra-card {
  position: relative;
  display: flex;
  align-items: stretch;
  gap: 12px;
  height: 100%;
  min-height: 0;
  padding: 20px 20px 20px 16px;
  border-radius: 14px;
}

.extra-card.scroll-reveal--played:hover {
  transform: translateY(-2px);
}

.icon-box-extra {
  position: relative;
  z-index: 1;
  flex-shrink: 0;
  align-self: flex-start;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #380FE9;
}

.extra-card-body {
  position: relative;
  z-index: 1;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
  min-height: calc(2 * var(--text-sm) * 1.2 + 4px + 2 * var(--text-sm) * 1.55);
}

.extra-card h4 {
  min-height: calc(2 * var(--text-sm) * 1.2);
  display: flex;
  align-items: flex-start;
  margin: 0;
  font-size: var(--text-sm);
  font-weight: 600;
  color: #E8E6FF;
  letter-spacing: -0.01em;
}

.extra-card p {
  flex: 1;
  margin: 0;
  font-size: var(--text-sm);
  color: #9090B0;
  line-height: 1.55;
}


.outros-block {
  margin-top: 64px;
}

.outros-top {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 32px;
  margin-bottom: 64px;
}

.outros-headline {
  font-size: clamp(1.9rem, 3.4vw, 2.75rem);
  font-weight: 600;
  line-height: 1.15;
  color: #E8E6FF;
  letter-spacing: -0.02em;
  margin: 0;
  flex-shrink: 0;
  text-align: right;
}

.outros-sub {
  flex: 1;
  min-width: 0;
  justify-content: flex-start;
  font-size: var(--text-deco);
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #380FE9;
  white-space: nowrap;
  padding-bottom: 6px;
}

.outros-sub-deco.section-deco-draw--horizontal {
  flex: 1;
}

/* Cards grid */
.outros-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.outro-card {
  position: relative;
  border-radius: 16px;
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  text-align: left;
  font: inherit;
  color: inherit;
}

.outro-card.scroll-reveal--played:hover {
  transform: translateY(-4px);
}

.outro-card > * {
  position: relative;
  z-index: 1;
}


.outro-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #380FE9;
  margin-top: auto;
  opacity: 0.45;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.outro-arrow {
  width: 18px;
  height: 18px;
  stroke: #0D0A24;
  fill: none;
  transition: transform 0.2s ease;
}

.outro-card:hover .outro-cta {
  opacity: 1;
  transform: translateX(3px) translateY(-3px);
}

.outro-card:hover .outro-arrow { transform: none; }

.outro-icon-wrap {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  color: #380FE9;
}

.outro-icon-wrap svg {
  width: 24px;
  height: 24px;
  stroke: currentColor;
  stroke-width: 1.5;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.outro-card h4 {
  font-size: 1rem;
  font-weight: 700;
  color: #E8E6FF;
  margin: 0 0 8px;
  letter-spacing: -0.01em;
}

.outro-card p {
  font-size: var(--text-sm);
  color: #9090B0;
  line-height: 1.72;
  margin: 0 0 20px;
}

.outros-inner {
  max-width: var(--section-max-width);
  margin: 0 auto;
}


/* ------------------------------ PORTFOLIO ------------------------------------- */

.portfolio {
  background: #0D0D1A;
  padding: var(--section-pad-y) var(--section-pad-x);
}

.portfolio-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 48px;
}

.portfolio-deco {
  flex: 1;
  min-width: 0;
  justify-content: flex-end;
  margin-left: auto;
}

.portfolio-headline {
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 5vw, 3.4rem);
  font-weight: 700;
  color: #E8E6FF;
  line-height: 1.1;
}

.portfolio-stage {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 40px;
  align-items: center;
}

.portfolio-browser-reveal {
  min-width: 0;
}

.portfolio-browser {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(56, 15, 233, 0.25);
  background: #1a1a2e;
  contain: layout paint;
}

.browser-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  background: #16162a;
  border-bottom: 1px solid rgba(56, 15, 233, 0.18);
}

.browser-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(232, 230, 255, 0.12);
}

.browser-url {
  margin-left: 10px;
  font-size: var(--text-sm);
  color: rgba(232, 230, 255, 0.3);
  letter-spacing: 0.04em;
}

.browser-screen-link {
  display: block;
  text-decoration: none;
  cursor: pointer;
}

.browser-screen {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #0e0e1c;
  container-type: size;
  contain: layout paint style;
}

.browser-screen-slide {
  position: absolute;
  inset: 0;
  z-index: 0;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  content-visibility: hidden;
  transition:
    opacity 0.45s ease,
    visibility 0s linear 0.45s;
}

.browser-screen-slide--active {
  z-index: 1;
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  content-visibility: visible;
  transition:
    opacity 0.45s ease,
    visibility 0s linear 0s;
}

@media (prefers-reduced-motion: reduce) {
  .browser-screen-slide,
  .browser-screen-slide--active {
    transition: none;
  }
}

.browser-screen-track {
  width: 100%;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
}

.browser-screen-img {
  width: 100%;
  height: auto;
  display: block;
  max-width: none;
  user-select: none;
  -webkit-user-drag: none;
}

.browser-screen-track--scroll {
  transition: none;
}

.browser-screen-link:hover .browser-screen-slide--active .browser-screen-track--scroll {
  transition: transform 10s ease;
  transform: translate3d(0, min(0px, calc(100cqh - 100%)), 0);
  will-change: transform;
}

@media (prefers-reduced-motion: reduce) {
  .browser-screen-track--scroll,
  .browser-screen-link:hover .browser-screen-slide--active .browser-screen-track--scroll {
    transition: none !important;
    transform: none !important;
    will-change: auto;
  }
}

.browser-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.4s ease;
}

.browser-placeholder-label {
  font-family: var(--font-display);
  font-size: clamp(1.2rem, 3vw, 2rem);
  font-weight: 700;
  color: rgba(232, 230, 255, 0.15);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  user-select: none;
}

.browser-placeholder-logo {
  width: min(85%, 380px);
  max-height: 67%;
  object-fit: contain;
  user-select: none;
  -webkit-user-drag: none;
}

.portfolio-arrow {          /* Setas */
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1.5px solid rgba(240, 255, 31, 0.4);
  background: rgba(10, 10, 20, 0.7);
  color: #F0FF1F;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(6px);
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
  z-index: 2;
}
.portfolio-arrow:hover {
  background: rgba(240, 255, 31, 0.12);
  border-color: #F0FF1F;
  transform: translateY(-50%) scale(1.08);
}

.portfolio-arrow--prev { left: 16px; }
.portfolio-arrow--next { right: 16px; }

.portfolio-info {   /* Info */
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.portfolio-num {
  font-size: var(--text-sm);
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #F0FF1F;
}

.portfolio-title {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  font-weight: 700;
  color: #E8E6FF;
  line-height: 1.15;
}

.portfolio-desc {
  font-size: var(--text-sm);
  color: rgba(232, 230, 255, 0.55);
  line-height: 1.6;
}

.portfolio-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 22px;
  border-radius: 999px;
  border: 1.5px solid #F0FF1F;
  background: transparent;
  color: #F0FF1F;
  font-size: var(--text-sm);
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-decoration: none;
  width: fit-content;
  transition: background 0.2s ease, transform 0.2s ease;
}

.portfolio-cta.scroll-reveal--played:hover {
  background: rgba(240, 255, 31, 0.08);
  transform: translateY(-2px);
}

.portfolio-cta-arrow {
  width: 18px;
  height: 18px;
  stroke: currentColor;
  fill: none;
  flex-shrink: 0;
}

.portfolio-dots {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}

.portfolio-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: rgba(232, 230, 255, 0.2);
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
  padding: 0;
}

.portfolio-dot--active {
  background: #F0FF1F;
  transform: scale(1.25);
}


/* -------------------------------------- PROCESSO -------------------------------------------------*/

.processo {
  padding: var(--section-pad-y) var(--section-pad-x);
  position: relative;
  overflow: hidden;
  background: #0A0A14;
}

.processo::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(56,15,233,0.05) 1px, transparent 1px);
  background-size: 28px 28px;
  pointer-events: none;
  z-index: 0;
}

.processo > * { position: relative; z-index: 1; }

.processo-wrapper {
  max-width: var(--section-max-width);
  margin: 0 auto;
}

.processo-deco-line {
  margin-bottom: 16px;
}

.processo-header {
  margin-bottom: 64px;
}

.processo-header h2 {
  font-size: clamp(2.4rem, 4.5vw, 4rem);
  font-weight: 700;
  color: #E8E6FF;
  margin-bottom: 16px;
  letter-spacing: -0.025em;
  line-height: 1.05;
}

.processo-header p {
  color: #9090B0;
  max-width: 560px;
  font-size: 1rem;
  line-height: 1.75;
}

.processo-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  margin-bottom: 0;
}

.processo-card {
  position: relative;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 0 0 transparent;
  transition: transform 0.22s ease, background 0.22s ease, box-shadow 0.22s ease;
}

.processo-card-lg   { grid-column: span 3; }
.processo-card-sm   { grid-column: span 2; }
.processo-card-wide { grid-column: span 2; }
.processo-card-cta  { grid-column: span 3; }

.processo-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 28px rgba(8, 8, 22, 0.38);
}

.processo-card > * {
  position: relative;
  z-index: 1;
}

.processo-numero {
  position: absolute;
  top: 12px;
  right: 16px;
  font-size: 4.5rem;
  font-weight: 700;
  color: rgba(56,15,233,0.1);
  line-height: 1;
  pointer-events: none;
  user-select: none;
  z-index: 0;
}

.processo-card h3 {
  color: #E8E6FF;
  margin-bottom: 12px;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.processo-card p {
  color: #9090B0;
  font-size: var(--text-sm);
  line-height: 1.72;
}

.processo-cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 24px;
  padding: 10px 20px;
  border-radius: 999px;
  font-size: var(--text-sm);
  font-family: inherit;
  font-weight: 600;
  letter-spacing: 0.01em;
  color: #E8E6FF;
  border: 1.5px solid rgba(56,15,233,0.4);
  background: rgba(56,15,233,0.1);
  cursor: pointer;
  text-decoration: none;
  transition: background 0.22s ease, border-color 0.22s ease, transform 0.2s ease;
  position: relative;
}

.processo-cta-btn:hover {
  background: #380FE9;
  border-color: #380FE9;
  color: #E8E6FF;
  transform: translateX(2px);
}

.processo-cta-btn:active { transform: scale(0.97); }



/* ----------------------------------- PREÇO ------------------------------------------ */

.pricing {
  background: #0A0A14;
  padding: var(--section-pad-y) var(--section-pad-x);
}

.pricing-wrapper {
  max-width: var(--section-max-width);
  margin: 0 auto;
}

.pricing-header {
  margin-bottom: 48px;
}

.pricing-deco {
  margin-bottom: 12px;
}

.pricing-headline {
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 5vw, 3.6rem);
  font-weight: 700;
  color: #E8E6FF;
  line-height: 1.1;
}

.pricing-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  align-items: start;
  min-width: 0;
}

.pricing-card {
  position: relative;
  min-width: 0;
  border-radius: 16px;
  padding: 32px;
  color: #E8E6FF;
  overflow: visible;
  box-shadow: 0 0 0 transparent;
  transition: transform 0.22s ease, background 0.22s ease, box-shadow 0.22s ease;
}

.pricing-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 28px rgba(8, 8, 22, 0.38);
}

.pricing-card > * {
  position: relative;
  z-index: 1;
}

.pricing-card--featured::before {
  background:
    linear-gradient(135deg, rgba(240, 255, 31, 0.5) 0%, rgba(138, 138, 255, 0) 42%),
    linear-gradient(315deg, rgba(240, 255, 31, 0.5) 0%, rgba(138, 138, 255, 0) 42%);
}

.pricing-card--featured:hover::before {
  background:
    linear-gradient(135deg, rgba(240, 255, 31, 0.68) 0%, rgba(138, 138, 255, 0) 42%),
    linear-gradient(315deg, rgba(240, 255, 31, 0.68) 0%, rgba(138, 138, 255, 0) 42%);
}

.pricing-badge {
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  background: #F0FF1F;
  color: #0A0A00;
  font-size: var(--text-sm);
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 4px 14px;
  border-radius: 999px;
  white-space: nowrap;
}

.pricing-tier {
  display: block;
  font-size: var(--text-sm);
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(232, 230, 255, 0.5);
  margin-bottom: 12px;
}

.pricing-price {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 8px;
}

.pricing-from {
  font-size: var(--text-sm);
  font-weight: 600;
  color: rgba(232, 230, 255, 0.55);
  letter-spacing: 0.02em;
  text-transform: lowercase;
}

.pricing-value {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 700;
  color: #E8E6FF;
  line-height: 1;
}

.pricing-value--quote {
  font-size: clamp(1.65rem, 3.2vw, 2.35rem);
}

.pricing-desc {
  font-size: var(--text-sm);
  color: rgba(232, 230, 255, 0.55);
  margin-bottom: 24px;
}

.pricing-divider {
  height: 1px;
  background: rgba(56, 15, 233, 0.18);
  margin-bottom: 24px;
}

.pricing-card--featured .pricing-divider {
  background: rgba(240, 255, 31, 0.15);
}

.pricing-features {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.pricing-features li {
  position: relative;
  padding-left: 20px;
  font-size: var(--text-sm);
  color: rgba(232, 230, 255, 0.75);
  line-height: 1.4;
}

.pricing-features li::before {
  content: '—';
  position: absolute;
  left: 0;
  color: rgba(232, 230, 255, 0.35);
}



/* ------------------------------------------- CONTATO -------------------------------------------*/

.contato {
  position: relative;
  min-height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--section-pad-y) var(--section-pad-x);
  background-image: url('./assets/formbg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: scroll;
}

.contato::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(5,10,40,0.52);
  z-index: 0;
}

.contato-inner {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-start;
  gap: 80px;
  width: 100%;
  max-width: var(--section-max-width);
  margin: 0 auto;
}

.contato-left {
  flex: 1 1 0;
  min-width: 0;
  color: #fff;
}

.contato-headline {
  font-size: clamp(2.2rem, 4vw, 3.5rem);
  font-weight: 700;
  line-height: 1.12;
  letter-spacing: -0.025em;
  margin: 0 0 16px 0;
  color: #fff;
}

.contato-desc {
  font-size: 1rem;
  color: rgba(255,255,255,0.6);
  line-height: 1.72;
  margin-bottom: 32px;
}

.contato-info {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 360px;
}

.contato-info-card:hover::before {
  border-color: rgba(240, 255, 31, 0.55);
  background: rgba(10, 10, 20, 0.48);
}

.contato-info-link {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  padding: 12px 16px;
  border-radius: 10px;
  color: #fff;
  font-size: 0.95rem;
  font-family: inherit;
  text-decoration: none;
  box-sizing: border-box;
  transition: color 0.2s ease;
}

.contato-info-text {
  min-width: 0;
  flex: 1;
  color: var(--accent-yellow);
}

.contato-info-arrow {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  stroke: currentColor;
  fill: none;
  transition: transform 0.2s ease, color 0.2s ease;
}

.contato-info-link:hover {
  color: #F0FF1F;
}

.contato-info-link:hover .contato-info-arrow {
  transform: translateX(3px);
}

.contato-form-wrap {
  flex: 1 1 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.contato-form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.contato-label {
  font-size: var(--text-sm);
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #fff;
}

.contato-input-shell {
  position: relative;
  isolation: isolate;
  border-radius: 10px;
}

.contato-input-shell::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  border-radius: inherit;
  background: rgba(10, 10, 20, 0.38);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  backdrop-filter: blur(24px) saturate(180%);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.28);
  border: 1.5px solid rgba(255, 255, 255, 0.22);
  pointer-events: none;
  transition: border-color 0.22s ease, background 0.22s ease, box-shadow 0.22s ease;
}

@supports not (
  (-webkit-backdrop-filter: blur(1px)) or (backdrop-filter: blur(1px))
) {
  .contato-input-shell::before {
    background: rgba(10, 10, 20, 0.92);
  }
}

.contato-input-shell:focus-within::before {
  border-color: rgba(240, 255, 31, 0.75);
  background: rgba(10, 10, 20, 0.48);
  box-shadow:
    0 4px 24px rgba(0, 0, 0, 0.28),
    0 0 0 3px rgba(240, 255, 31, 0.12);
}

.contato-input-shell--invalid::before {
  border-color: rgba(255, 140, 140, 0.85);
}

.contato-input-shell--invalid:focus-within::before {
  border-color: rgba(255, 140, 140, 0.95);
  box-shadow:
    0 4px 24px rgba(0, 0, 0, 0.28),
    0 0 0 3px rgba(255, 140, 140, 0.14);
}

.contato-input-shell:has(:disabled)::before {
  opacity: 0.72;
}

.contato-input {
  position: relative;
  z-index: 1;
  width: 100%;
  padding: 12px 16px;
  border-radius: 10px;
  border: none;
  background: transparent;
  color: #fff;
  font-size: 0.95rem;
  font-family: inherit;
  outline: none;
  box-sizing: border-box;
}

.contato-input::placeholder { color: rgba(255,255,255,0.28); }

.contato-input:focus {
  outline: none;
}

.contato-input:disabled {
  cursor: not-allowed;
  color: rgba(255, 255, 255, 0.55);
}

.contato-textarea {
  resize: vertical;
  min-height: 120px;
}

.btn-constellation-contato { /* Botão */
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin-top: 4px;
}

.contato-submit {
  width: 100%;
  padding: 14px 24px;
  border-radius: 10px;
  border: none;
  background: #F0FF1F;
  color: #0A0A00;
  font-size: 0.95rem;
  font-weight: 700;
  font-family: inherit;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.18s ease, box-shadow 0.2s ease;
}

.contato-submit:hover {
  background: #F5FF5A;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(240,255,31,0.28);
}

.contato-submit:active { transform: scale(0.98); }

.contato-submit[disabled]:not(.contato-submit--success) {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.contato-submit--success,
.contato-submit--success[disabled] {
  opacity: 1;
  cursor: default;
  background: #F0FF1F;
  color: #0A0A00;
  transform: none;
  box-shadow: none;
}

.contato-feedback {
  margin: 0;
  font-size: var(--text-sm);
  line-height: 1.5;
}

.contato-feedback--erro {
  color: #ffb4b4;
}

.contato-feedback--aviso {
  color: #ffd28a;
}


/* ------------------------------------ FOOTER ------------------------------------- */
/* Footer styles live in SiteFooter.vue */


/* ------------------------------- RESPONSIVIDADE ------------------------------------- */

/* Desktop small */
@media (max-width: 1160px) {
  .processo-grid { grid-template-columns: repeat(4, 1fr); }
  .processo-card-lg   { grid-column: span 2; }
  .processo-card-sm   { grid-column: span 2; }
  .processo-card-wide { grid-column: span 2; }
  .processo-card-cta  { grid-column: span 2; }
}

/* Tablet large */
@media (max-width: 1024px) {
  .processo-grid { grid-template-columns: 1fr 1fr; }
  .processo-card-lg, .processo-card-cta { grid-column: span 2; }
  .processo-card-sm, .processo-card-wide { grid-column: span 1; }

  .outros-cards { grid-template-columns: repeat(2, 1fr); }

  .portfolio-stage {
    grid-template-columns: 1fr;
  }
  .portfolio-info {
    align-items: flex-start;
  }
}

/* Tablet */
@media (max-width: 920px) {
  .banner-inner {
    padding: clamp(64px, 12vh, 96px) clamp(20px, 4vw, 32px) clamp(24px, 4vh, 40px);
  }

  .servicos,
  .processo,
  .pricing,
  .portfolio {
    padding-bottom: 80px;
  }

  .intro-decoracao { display: none; }
  .intro-wrapper { flex-direction: column; }

  .outros-top {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }

  .outros-sub { width: 100%; justify-content: flex-start; }

  .processo-grid { grid-template-columns: 1fr 1fr; }
  .processo-card-lg,
  .processo-card-sm,
  .processo-card-wide,
  .processo-card-cta { grid-column: span 1; }
  .processo-card-lg,
  .processo-card-cta { grid-column: span 2; }
}

/* Tablet small */
@media (max-width: 860px) {
  .contato-inner {
    flex-direction: column;
    align-items: stretch;
    gap: 40px;
    min-width: 0;
  }

  .contato-left {
    flex: none;
    width: 100%;
    text-align: left;
  }

  .contato-info {
    align-items: flex-start;
    width: 100%;
    max-width: none;
    margin-inline: 0;
  }

  .contato-info .contato-form-group {
    align-items: flex-start;
    width: fit-content;
    max-width: 100%;
  }

  .contato-info-card {
    width: fit-content;
    max-width: 100%;
  }

  .contato-info-link {
    width: auto;
  }

  .contato-info-text {
    flex: 0 1 auto;
  }

  .contato-form-wrap { width: 100%; max-width: none; }

  .pricing-cards { grid-template-columns: 1fr; }

  .services-track {
    margin-top: 56px;
    margin-bottom: 48px;
  }

  .services-panel {
    --services-sticky-top: calc(4.5rem + 32px);
    --service-panel-header-h: 2.5rem;
    --service-title-stack-h: 4.5rem;
    --services-panel-pad-x: 24px;
    --services-panel-pad-y-top: 28px;
    --services-panel-pad-y-bottom: 24px;
  }

  .service-expand-inner {
    grid-template-columns: minmax(0, 1fr);
    gap: 20px;
  }

  .service-row-detail {
    max-width: 100%;
    padding-top: 12px;
  }

  .service-desc {
    margin-top: clamp(48px, 7vh, 72px);
    padding-top: 0;
  }

  .service-row-aside .service-illustration {
    width: 100%;
    max-height: min(220px, 32vh);
  }

  .services-cta-btn--inline {
    margin-top: 14px;
    align-self: flex-start;
  }

  .services-panel-footer {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }

  .services-footer-left {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .services-footer-left .section-deco-draw--horizontal {
    flex: none;
    width: 100%;
  }

  .services-footer-text {
    order: -1;
    white-space: normal;
    width: 100%;
  }

  .services-cta-btn {
    width: 100%;
    justify-content: center;
  }
}

/* Scroll sparkle hidden below 1400px */

/* Mobile large */
@media (max-width: 768px) {
  .intro-frase { padding: 48px 24px; }
  .intro-frase p { font-size: 1rem; }

  .processo-grid { grid-template-columns: 1fr; }
  .processo-card-lg,
  .processo-card-sm,
  .processo-card-wide,
  .processo-card-cta { grid-column: span 1; }

  .outros-cards { grid-template-columns: repeat(2, 1fr); }

  .extras-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }

  .portfolio-browser-reveal {
    display: flex;
    justify-content: center;
    padding-inline: clamp(28px, 8vw, 44px);
  }

  .portfolio-browser {
    width: min(72vw, 300px);
    border-radius: 28px;
    box-shadow:
      0 24px 48px rgba(0, 0, 0, 0.32),
      0 0 0 1px rgba(56, 15, 233, 0.2);
  }

  .browser-bar {
    padding: 10px 14px;
    justify-content: center;
  }

  .browser-dot {
    display: none;
  }

  .browser-url {
    margin-left: 0;
    font-size: 0.75rem;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }

  .browser-screen {
    aspect-ratio: 9 / 17;
  }

  .portfolio-arrow {
    width: 32px;
    height: 32px;
  }

  .portfolio-arrow--prev { left: 10px; }
  .portfolio-arrow--next { right: 10px; }

  .portfolio-info {
    align-items: center;
    text-align: center;
  }

  .portfolio-desc {
    max-width: min(320px, 82vw);
  }

  .banner-inner {
    padding-left: clamp(20px, 4vw, 32px);
    padding-right: clamp(20px, 4vw, 32px);
  }
}

/* Hero empilhado — tablet e mobile */
@media (max-width: 920px) {
  .banner {
    --hero-desc: clamp(0.95rem, 2.2vw, 1.125rem);
    --hero-copy-width: min(78vw, 560px);
    --hero-gap-title-desc: clamp(1rem, 2.5vh, 1.5rem);
    --hero-gap-desc-btn: clamp(1.5rem, 3.5vh, 2.25rem);
    --hero-front-top: clamp(96px, 11svh, 128px);
    --hero-front-bottom: 0px;
    --hero-constellation-content-gap: 10px;
    --hero-constellation-lift: 10px;
    --hero-constellation-mountain-gap: 0px;
    --hero-constellation-width: clamp(36vw, 44vw, 420px);
    --hero-title-line-height: 1.02;
    min-height: var(--hero-mobile-min-height, 100svh);
  }

  @media (min-height: 1000px) {
    .banner {
      min-height: var(--hero-mobile-min-height, auto);
    }
  }

  .banner-copy-head {
    isolation: isolate;
  }

  .banner-copy-head::before {
    content: '';
    position: absolute;
    z-index: -1;
    left: 50%;
    top: 50%;
    width: min(118%, calc(100% + clamp(36px, 8vw, 56px)));
    height: calc(100% + clamp(18px, 4vw, 28px));
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background: radial-gradient(
      ellipse at center,
      rgba(10, 10, 20, 0.65) 0%,
      rgba(14, 11, 34, 0.4) 50%,
      rgba(10, 10, 20, 0) 100%
    );
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    pointer-events: none;
  }

  .banner-copy {
    isolation: auto;
  }

  .hero-front {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding:
      var(--hero-front-top)
      clamp(24px, 5vw, 40px)
      var(--hero-front-bottom);
    overflow: visible;
  }

  .banner-copy {
    position: relative;
    z-index: 2;
    top: auto;
    left: auto;
    transform: none;
    width: 100%;
    max-width: var(--hero-copy-width);
    align-self: center;
    align-items: center;
    text-align: center;
    margin-inline: auto;
  }

  .banner-title,
  .banner-description {
    text-align: center;
  }

  .banner-title {
    margin-top: clamp(8px, 1.5svh, 16px);
  }

  .banner-description {
    font-family: var(--font-body);
    font-weight: 500;
    font-synthesis: none;
    line-height: 1.5;
    text-shadow:
      0 2px 12px rgba(0, 0, 0, 0.85),
      0 1px 4px rgba(0, 0, 0, 0.9);
  }

  .banner-footer {
    position: relative;
    z-index: 3;
    justify-content: center;
    align-items: center;
    margin-top: var(--hero-gap-desc-btn);
  }

  .banner-footer-buttons {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: clamp(12px, 2vw, 20px);
  }

  .banner-footer-side {
    width: auto;
    justify-content: center;
  }

  .hero-constellation-band {
    position: absolute;
    top: var(--hero-constellation-top, auto);
    right: auto;
    bottom: auto;
    left: 50%;
    z-index: 1;
    transform: translateX(-50%) translateY(calc(-1 * var(--hero-constellation-lift, 0px)));
    flex-shrink: 0;
    width: var(--hero-constellation-width);
    max-width: calc(100vw - 2 * clamp(24px, 5vw, 40px));
    margin-top: 0;
    aspect-ratio: var(--hero-constellation-aspect, 1 / 1.15);
    overflow: visible;
    pointer-events: none;
    --hero-constellation-star-min-radius: 22px;
    --hero-constellation-sparkle-min-radius: 12px;
  }

  .hero-constellation-band :deep(.hero-constellations) {
    position: relative;
    inset: auto;
    width: 100%;
    height: 100%;
  }

  .banner-footer-link,
  .banner-footer-cta {
    width: auto;
    min-width: clamp(148px, 22vw, 200px);
    justify-content: center;
  }
}

/* Mobile */
@media (max-width: 480px) {
  .outros-cards { grid-template-columns: 1fr; }
  .extras-grid { grid-template-columns: minmax(0, 1fr); }

  .banner-inner {
    padding: calc(72px + env(safe-area-inset-top, 0px)) calc(20px + env(safe-area-inset-right, 0px)) calc(24px + env(safe-area-inset-bottom, 0px)) calc(20px + env(safe-area-inset-left, 0px));
  }

  .banner {
    --hero-desc: clamp(0.9rem, 3.5vw, 1rem);
    --hero-copy-width: min(85vw, 340px);
    --hero-gap-title-desc: 0.875rem;
    --hero-gap-desc-btn: 1.125rem;
    --hero-front-top: clamp(88px, 14svh, 108px);
    --hero-constellation-content-gap: 4px;
    --hero-constellation-lift: 16px;
    --hero-constellation-width: clamp(58vw, 68vw, 74vw);
    --hero-title-line-height: 1;
    --hero-title-shadow:
      0 2px 20px rgba(0, 0, 0, 0.8),
      0 2px 8px rgba(0, 0, 0, 0.9);
    --hero-title-accent-shadow:
      0 2px 20px rgba(0, 0, 0, 0.8),
      0 2px 8px rgba(0, 0, 0, 0.9),
      0 0 18px rgba(240, 255, 31, 0.42);
  }

  .banner-title {
    margin-top: clamp(12px, 2.5svh, 22px);
  }

  .banner-footer-buttons {
    flex-direction: column;
    gap: clamp(8px, 1.5vh, 12px);
  }

  .banner-footer-side--right {
    order: 1;
  }

  .banner-footer-side--left {
    order: 2;
  }

  .hero-constellation-band {
    max-width: calc(100vw - 2 * clamp(20px, 5vw, 32px));
    --hero-constellation-star-min-radius: 26px;
    --hero-constellation-sparkle-min-radius: 14px;
  }

  .banner-footer-link,
  .banner-footer-cta {
    min-width: clamp(160px, 48vw, 220px);
  }

  .servicos,
  .processo,
  .pricing,
  .portfolio,
  .contato {
    padding-bottom: 80px;
  }

  .portfolio-header { flex-direction: column; align-items: flex-start; gap: 8px; }
  .portfolio-deco {
    width: 100%;
    margin-left: 0;
  }
  .processo-header h2 { font-size: 2.2rem; }

  .services-panel {
    --services-sticky-top: calc(4rem + 28px);
    --service-panel-header-h: 2.35rem;
    --service-title-stack-h: 4.25rem;
    --services-panel-pad-x: 16px;
    --services-panel-pad-y-top: 24px;
    --services-panel-pad-y-bottom: 20px;
  }
}

</style>