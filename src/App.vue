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
              [{ text: 'Conectando' }],
              [{ text: 'sua empresa' }],
              [
                { text: 'ao ' },
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
                <span>Ver soluções</span>
                <ArrowDown :size="12" stroke-width="2.5" />
              </a>
            </div>
            <div class="banner-footer-side banner-footer-side--right">
              <a
                class="scroll-btn banner-footer-cta btn-link"
                href="https://wa.me/5522981069554?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20um%20or%C3%A7amento%20para%20meu%20projeto."
                target="_blank"
                rel="noopener noreferrer"
              >
                Peça agora
              </a>
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
            [{ text: 'O que podemos' }],
            [{ text: 'fazer pelo seu' }],
            [{ text: 'negócio', accentClass: 'accent' }]
          ]"
        />
        <p class="intro-sub">Mais do que colocar sua empresa online, criamos uma estrutura para ela ser encontrada, transmitir confiança e gerar novas oportunidades.</p>

        <div class="vantagens-wrap">
          <div class="vantagens">
            <article class="vantagem-card"
              v-for="(item, index) in vantagens"
              :key="item.title">
              <DecoSparkle
                v-if="index === 0"
                class="vantagem-card-sparkle vantagem-card-sparkle--edge vantagem-card-sparkle--edge-left vantagem-card-sparkle--top"
                aria-hidden="true"
              />
              <DecoSparkle
                v-if="index === 0"
                class="vantagem-card-sparkle vantagem-card-sparkle--edge vantagem-card-sparkle--edge-left vantagem-card-sparkle--bottom"
                aria-hidden="true"
              />
              <DecoSparkle class="vantagem-card-sparkle vantagem-card-sparkle--top" aria-hidden="true" />
              <DecoSparkle class="vantagem-card-sparkle vantagem-card-sparkle--bottom" aria-hidden="true" />
              <DecoSparkle
                v-if="index === vantagens.length - 1"
                class="vantagem-card-sparkle vantagem-card-sparkle--edge vantagem-card-sparkle--edge-right vantagem-card-sparkle--top"
                aria-hidden="true"
              />
              <DecoSparkle
                v-if="index === vantagens.length - 1"
                class="vantagem-card-sparkle vantagem-card-sparkle--edge vantagem-card-sparkle--edge-right vantagem-card-sparkle--bottom"
                aria-hidden="true"
              />
              <div class="vantagem-body">
                <div class="vantagem-header">
                  <h3>{{ item.title }}</h3>
                </div>
                <p>{{ item.desc }}</p>
              </div>
            </article>
          </div>
        </div>
      </div>

    </div>

    <div
      ref="servicesTrack"
      class="services-track"
      :class="{ 'services-track--static': isMobileStack }"
    >
    <div
      ref="servicesPanel"
      class="services-panel"
      :class="{ 'services-panel--static': isMobileStack }"
    >
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
          <span class="section-deco-label">[ soluções ]</span>
        </div>
      </div>

      <div
        ref="servicesStage"
        class="services-stage"
        :class="{ 'services-stage--static': isMobileStack }"
      >
      <div
        ref="servicesStackList"
        class="services-stack"
        :class="{ 'services-stack--static': isMobileStack }"
      >
        <article
          v-for="(service, index) in listaServicos"
          :key="service.num"
          class="service-card"
          :class="{
            'service-card--last': index === listaServicos.length - 1,
            'service-card--collapsed': !isMobileStack && cardMotion[index]?.collapsed,
            'service-card--static': isMobileStack,
          }"
          :style="isMobileStack
            ? undefined
            : {
                zIndex: cardMotion[index]?.zIndex ?? index + 1,
                transform: cardMotion[index]?.transform ?? (index === 0 ? 'translate3d(0,0,0)' : 'translate3d(0,100%,0)'),
                '--service-card-stack-offset': cardMotion[index]?.stackOffset ?? '0px',
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
                    <div
                      class="service-row-detail"
                      :class="{ 'service-row-detail--with-list': service.features?.length }"
                    >
                      <div class="service-tags">
                        <span v-for="tag in service.tags" :key="tag" class="service-tag">
                          {{ tag }}
                        </span>
                      </div>
                      <p class="service-desc">{{ service.desc }}</p>
                      <ul v-if="service.features?.length" class="service-feature-list">
                        <li v-for="feature in service.features" :key="feature">
                          {{ feature }}
                        </li>
                      </ul>
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

                    <div
                      class="service-row-aside"
                      :class="{ 'service-row-aside--preview': service.image?.startsWith('/Preview') }"
                    >
                      <img
                        class="service-illustration"
                        :class="{ 'service-illustration--preview': service.image?.startsWith('/Preview') }"
                        :src="service.image"
                        :alt="`Ilustração de ${service.title}`"
                        loading="lazy"
                      />
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

    <div class="products-deco section-deco">
      <SectionDecoDraw orientation="horizontal" observe-target=".products-deco">
        <template #star>
          <DecoSparkle class="section-deco-sparkle" />
        </template>
        <template #line>
          <SectionDecoLine class="section-deco-line" />
        </template>
      </SectionDecoDraw>
      <span class="section-deco-label">[ produtos ]</span>
    </div>

    <div class="extras-grid" aria-label="Recursos adicionais inclusos">
      <ScrollReveal
        v-for="(item, index) in extras"
        :key="item.title"
        class="extra-card"
        :delay="index * 120"
      >
        <DecoSparkle class="extra-card-sparkle extra-card-sparkle--top" aria-hidden="true" />
        <DecoSparkle class="extra-card-sparkle extra-card-sparkle--bottom" aria-hidden="true" />

        <div
          class="extra-media"
          :class="{ 'extra-media--image': item.image }"
          aria-hidden="true"
        >
          <img
            v-if="item.image"
            :src="item.image"
            alt=""
            class="extra-media-image"
            loading="lazy"
            decoding="async"
            draggable="false"
          />
          <component v-else :is="item.icon" class="extra-media-icon" />
        </div>

        <div class="extra-card-body">
          <div class="extra-card-copy">
            <h4>{{ item.title }}</h4>
            <p>{{ item.desc }}</p>
          </div>
          <button
            type="button"
            class="extra-card-cta"
            @click="solicitarServico(item)"
          >
            Solicitar este recurso
            <span class="extra-card-cta-icon" aria-hidden="true">
              <ArrowRight :size="16" stroke-width="2.5" />
            </span>
          </button>
        </div>
      </ScrollReveal>
    </div>

    <div v-if="false" class="outros-block">
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
            <ArrowRight class="portfolio-cta-arrow" aria-hidden="true" />
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
  <section v-if="SHOW_PRICING_SECTION" class="pricing" id="pricing">
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
      <form class="contato-form-wrap" @submit.prevent="enviarFormulario">
        <h2 class="contato-form-title">
          Tem alguma pergunta?<br>
          Vamos conversar
        </h2>

        <div class="contato-form-row">
          <div class="contato-form-group">
            <label class="contato-label" for="contato-nome">Nome*</label>
            <input
              id="contato-nome"
              v-model="formNome"
              class="contato-input"
              type="text"
              name="nome"
              placeholder="Digite seu nome"
              :disabled="formLoading"
              required
            />
          </div>

          <div class="contato-form-group">
            <label class="contato-label" for="contato-email">E-mail*</label>
            <input
              id="contato-email"
              :value="formEmail"
              class="contato-input"
              :class="{ 'contato-input--invalid': mostrarAvisoEmail() }"
              type="email"
              name="email"
              inputmode="email"
              autocomplete="email"
              placeholder="Digite seu e-mail"
              :disabled="formLoading"
              required
              @input="onEmailInput"
              @blur="formEmailTocado = true"
            />
          </div>
        </div>

        <p
          v-if="mostrarAvisoEmail()"
          class="contato-feedback contato-feedback--aviso"
          role="status"
        >
          Informe um e-mail válido com @ e domínio (ex.: nome@empresa.com).
        </p>

        <div class="contato-form-group">
          <label class="contato-label" for="contato-detalhes">Mensagem*</label>
          <textarea
            id="contato-detalhes"
            v-model="formDetalhes"
            class="contato-input contato-textarea"
            name="mensagem"
            placeholder="Digite sua mensagem"
            rows="4"
            :disabled="formLoading"
            required
          ></textarea>
        </div>

        <p v-if="formErro" class="contato-feedback contato-feedback--erro" role="alert">
          {{ formErro }}
        </p>

        <div class="contato-actions">
          <button
            class="contato-submit"
            :class="{ 'contato-submit--success': formEnviado }"
            type="submit"
            :disabled="formLoading || formEnviado"
          >
            <span v-if="formLoading">Enviando...</span>
            <span v-else-if="formEnviado">✓ Enviado com sucesso!</span>
            <span v-else>Enviar</span>
            <span class="contato-submit-icon" aria-hidden="true">
              <ArrowUpRight />
            </span>
          </button>
          <p class="contato-privacy">Ao enviar, você concorda com nossa Política de Privacidade.</p>
        </div>
      </form>

      <div class="contato-links" aria-label="Canais de contato">
        <a
          class="contato-channel-card"
          :href="INSTAGRAM_URL"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="contato-channel-main">
            <span class="contato-channel-icon">
              <Instagram aria-hidden="true" />
            </span>
            <span class="contato-channel-name">Instagram</span>
          </span>
          <span class="contato-channel-action">
            <span class="contato-channel-arrow"><ArrowUpRight aria-hidden="true" /></span>
            Abrir perfil
          </span>
        </a>

        <a
          class="contato-channel-card"
          href="https://wa.me/5522981069554?text=Ol%C3%A1%2C%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es."
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="contato-channel-main">
            <span class="contato-channel-icon">
              <MessageCircle aria-hidden="true" />
            </span>
            <span class="contato-channel-name">WhatsApp</span>
          </span>
          <span class="contato-channel-action">
            <span class="contato-channel-arrow"><ArrowUpRight aria-hidden="true" /></span>
            Iniciar conversa
          </span>
        </a>
      </div>
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
    import LynxLogo from './assets/LynxLogoLetras.webp'
    import GeoaxisPreview from './assets/geoaxisambiental.com.br.webp'
    import VictormolPreview from './assets/www.victormol.com.br_.webp'
    import { Globe, MessageCircle, Zap, Settings, Instagram, 
             Link2, Code2, ArrowUpRight, ArrowRight, ArrowDown } from 'lucide-vue-next'

    const SHOW_PRICING_SECTION = false
    const INSTAGRAM_URL = 'https://www.instagram.com/lynxwebstudio'

    const vantagens = [
      {
        title: 'Seja encontrado por novos clientes',
        desc: 'Tenha uma presença profissional no Google e permita que pessoas que já procuram pelos seus serviços encontrem sua empresa com facilidade.',
        icon: Globe,
      },
      {
        title: 'Transforme visitas em contatos',
        desc: 'Organizamos informações, serviços e chamadas para ação para que o visitante entenda rapidamente sua empresa e saiba qual é o próximo passo.',
        icon: MessageCircle,
      },
      {
        title: 'Evolua seu site junto com o negócio',
        desc: 'Comece com o que sua empresa precisa hoje e adicione novas páginas, integrações e automações conforme ela evolui.',
        icon: Settings,
      },
    ]

    const extras = [
      {
        title: 'Site Institucional',
        desc: 'Apresente sua empresa, seus serviços e seus diferenciais em uma estrutura profissional, responsiva e fácil de navegar.',
        icon: Globe,
        image: '/SiteInstitucional.webp',
        contatoMensagem: 'Desejo criar um site institucional.'
      },
      {
        title: 'Landing Page',
        desc: 'Uma página objetiva para divulgar um serviço, produto, campanha ou direcionar visitantes para uma ação específica.',
        icon: Zap,
        image: '/LandingPage.webp',
        contatoMensagem: 'Desejo criar uma landing page.'
      },
      {
        title: 'Loja Virtual',
        desc: 'Catálogo, carrinho e pagamentos integrados para sua empresa vender produtos pela internet com uma experiência organizada.',
        icon: Settings,
        image: '/E-commerce.webp',
        contatoMensagem: 'Desejo criar uma loja virtual.'
      },
      {
        title: 'Link na Bio Personalizado',
        desc: 'Uma página exclusiva para reunir serviços, contatos, agendamentos e links importantes com a identidade da sua marca.',
        icon: Link2,
        image: '/LinkBio.webp',
        contatoMensagem: 'Desejo criar um link na bio personalizado.'
      },
      {
        title: 'Sistema Web',
        desc: 'Ferramentas personalizadas para organizar cadastros, atendimentos, agendas, relatórios e processos internos.',
        icon: Code2,
        image: '/Sistema.webp',
        contatoMensagem: 'Desejo desenvolver um sistema web.'
      },
      {
        title: 'Assistente Inteligente',
        desc: 'Um assistente integrado ao site para responder dúvidas frequentes, apresentar informações e direcionar o visitante ao contato correto.',
        icon: MessageCircle,
        image: '/AssistenteInteligente.webp',
        contatoMensagem: 'Desejo contratar um assistente inteligente.'
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
        title: 'Consultoria de Entrada',
        tags: ['LANDING PAGE', 'LINK NA BIO', 'SITE ONE PAGE'],
        desc: 'Para profissionais e pequenos negócios que precisam iniciar com uma presença digital clara, profissional e fácil de acessar.',
        features: [
          'Diagnóstico e organização das informações',
          'Landing page, site one page ou link na bio',
          'Direção visual alinhada à marca',
          'Design responsivo para todos os dispositivos',
          'WhatsApp, formulário e chamadas para contato',
          'SEO técnico, domínio, publicação e suporte inicial',
        ],
        image: '/Preview1.webp',
        contatoMensagem: 'Desejo contratar a Consultoria de Entrada.',
      },
      {
        num: '02.',
        title: 'Consultoria Profissional',
        tags: ['SITE INSTITUCIONAL', 'LOJA VIRTUAL', 'REFORMULAÇÃO'],
        desc: 'Para empresas que precisam apresentar melhor seus serviços ou produtos, fortalecer sua credibilidade e oferecer uma experiência completa ao público.',
        features: [
          'Site institucional completo ou loja virtual',
          'Planejamento e organização do conteúdo',
          'Páginas internas e seções estratégicas',
          'Formulários e integrações',
          'SEO técnico e alta performance',
          'Métricas e treinamento de uso',
          'Suporte após a publicação',
        ],
        image: '/Preview2.webp',
        contatoMensagem: 'Desejo contratar a Consultoria Profissional.',
      },
      {
        num: '03.',
        title: 'Consultoria Avançada',
        tags: ['SISTEMA WEB', 'AUTOMAÇÕES', 'ASSISTENTE COM IA'],
        desc: 'Para negócios que precisam conectar sua presença digital a processos, atendimentos e ferramentas específicas da empresa.',
        features: [
          'Sistema web ou área administrativa',
          'Login, áreas restritas e banco de dados',
          'Cadastros, agendas e formulários avançados',
          'Integrações, automações e assistente inteligente',
          'Planejamento técnico personalizado',
          'Acompanhamento após o lançamento',
        ],
        image: '/Preview3.webp',
        contatoMensagem: 'Desejo contratar a Consultoria Avançada.',
      }
    ]

    const {
      trackRef: servicesTrack,
      panelRef: servicesPanel,
      stageRef: servicesStage,
      listRef: servicesStackList,
      cardMotion,
      isMobileStack,
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
      return email.length > 0 && !emailValido(email)
    }

    function onEmailInput(event) {
      formEmail.value = filtrarEmail(event.target.value)
    }

    async function enviarFormulario() {
      if (formLoading.value || formEnviado.value) return

      formErro.value = ''
      formEmailTocado.value = true

      if (!formNome.value.trim() || !formEmail.value.trim() || !formDetalhes.value.trim()) {
        formErro.value = 'Preencha nome, e-mail e mensagem.'
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

      document.querySelectorAll('.vantagem-card').forEach(item => revealObserver.observe(item))
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
  z-index: 0;
}

.hero-sky :deep(.hero-starfield) {
  z-index: 2;
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
  z-index: 3;
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
  background:
    linear-gradient(to bottom, rgba(10, 6, 28, 0.18) 0%, rgba(22, 10, 74, 0.08) 48%, rgba(55, 14, 231, 0.18) 100%),
    url('/hero-abstract-bg.webp') center / cover no-repeat,
    linear-gradient(to bottom, #0A061C 0%, #160A4A 52%, #370EE7 100%);
  --hero-title: clamp(2.45rem, 0.72rem + 4.7vw, 4.9rem);
  --hero-title-line-height: 1.08;
  --hero-title-glow-bleed: clamp(12px, 0.18em, 22px);
  --hero-title-shadow: none;
  --hero-title-accent-shadow:
    0 0 16px rgba(240, 255, 31, 0.52),
    0 0 32px rgba(240, 255, 31, 0.34),
    0 0 56px rgba(240, 255, 31, 0.2),
    0 0 88px rgba(240, 255, 31, 0.1);
  --hero-desc: clamp(1rem, 1.08vw, 1.16rem);
  --hero-copy-left: clamp(32px, 8vw, 128px);
  --hero-copy-width: min(78vw, 760px);
  --hero-action-width: clamp(360px, 34vw, 448px);
  --hero-gap-title-desc: clamp(1.45rem, 2.4vh, 2rem);
  --hero-gap-desc-btn: clamp(2rem, 4vh, 3.1rem);
  --hero-btn-font: clamp(0.75rem, 0.7rem + 0.28vw, 0.86rem);
  --hero-btn-secondary-font: clamp(0.75rem, 0.7rem + 0.28vw, 0.86rem);
  --hero-btn-pad-y: clamp(10px, 0.55rem + 0.65vw, 15px);
  --hero-btn-pad-x: clamp(20px, 0.9rem + 2vw, 36px);
  --hero-btn-secondary-pad-x: clamp(18px, 0.8rem + 1.8vw, 32px);
  --hero-btn-min-h: clamp(42px, 2.35rem + 0.95vw, 52px);
  --hero-btn-secondary-min-h: clamp(40px, 2.25rem + 0.9vw, 50px);
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
  padding-bottom: clamp(24px, 4vh, 96px);
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
  z-index: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0;
  width: fit-content;
  max-width: calc(100vw - var(--hero-copy-left) - clamp(24px, 4vw, 48px));
  padding: clamp(64px, 7vh, 92px) clamp(18px, 2vw, 26px);
  transform: translateY(calc(-50% - clamp(12px, 2.5vh, 48px))) translate3d(var(--hero-parallax-x, 0), var(--hero-parallax-y, 0), 0);
  text-align: left;
  pointer-events: none;
  box-sizing: border-box;
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
  position: relative;
  z-index: 4;
  pointer-events: auto;
}

.banner-title {
  display: block;
  width: auto;
  max-width: 100%;
  margin: 0 0 calc(-1 * var(--hero-title-glow-bleed));
  padding: 0 0 var(--hero-title-glow-bleed);
  box-sizing: border-box;
  text-align: left;
  white-space: normal;
  font-size: var(--hero-title);
  font-weight: 700;
  letter-spacing: -0.025em;
  color: #E8E6FF;
  line-height: var(--hero-title-line-height);
  text-shadow: var(--hero-title-shadow);
  overflow: visible;
  hyphens: none;
  word-break: keep-all;
}

.banner-title :deep(.title-line) {
  display: block;
  white-space: nowrap;
  overflow: visible;
}

.banner-title :is(.title-accent, .accent),
.banner-title :deep(.title-accent),
.banner-title :deep(.accent) {
  text-shadow: var(--hero-title-accent-shadow);
}

.banner-description {
  width: auto;
  max-width: min(100%, var(--hero-action-width));
  margin: var(--hero-gap-title-desc) 0 0;
  padding: 0;
  text-align: left;
  font-size: var(--hero-desc);
  line-height: 1.65;
  letter-spacing: 0.01em;
  color: rgba(232, 230, 255, 0.88);
}

@media (orientation: portrait) and (min-width: 921px) {
  .banner-copy {
    left: 50%;
    align-items: center;
    width: min(78vw, 760px);
    max-width: calc(100vw - 2 * clamp(48px, 8vw, 120px));
    transform: translate(-50%, calc(-50% - clamp(12px, 2.5vh, 48px))) translate3d(var(--hero-parallax-x, 0), var(--hero-parallax-y, 0), 0);
    text-align: center;
  }

  .banner-copy-head {
    align-items: center;
    width: 100%;
  }

  .banner-title,
  .banner-description {
    text-align: center;
  }

  .banner-description {
    margin-inline: auto;
  }
}

.banner-footer {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: auto;
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
  background:
    linear-gradient(135deg, #F6FF62 0%, #F0FF1F 45%, #C9D70F 100%);
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
  background:
    linear-gradient(135deg, rgba(56, 15, 233, 0.24) 0%, rgba(10, 10, 20, 0.96) 48%, rgba(240, 255, 31, 0.08) 100%);
  color: #F0FF1F;
  border-color: rgba(240, 255, 31, 0.45);
}

.scroll-btn--outline:hover {
  background:
    linear-gradient(135deg, rgba(56, 15, 233, 0.34) 0%, #111128 46%, rgba(240, 255, 31, 0.13) 100%);
  border-color: #F0FF1F;
  transform: translateY(-2px);
  box-shadow: 0 0 24px rgba(240, 255, 31, 0.38), 0 8px 28px rgba(240, 255, 31, 0.32);
}




/* ---------------------------- SERVIÇOS ------------------------------------------- */

.servicos {
  background: #0A0A14;
  padding: clamp(112px, 11vw, 168px) var(--section-pad-x) clamp(128px, 12vw, 184px);
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
  min-height: auto;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 0;
  padding-block: clamp(16px, 3vw, 40px);
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
  position: relative;
  flex: 1;
  max-width: 1120px;
  text-align: center;
}

.intro-headline {
  font-size: clamp(2.1rem, 4vw, 3.7rem);
  font-weight: 700;
  color: #E8E6FF;
  line-height: 1.06;
  width: fit-content;
  max-width: 100%;
  margin-inline: 0 auto;
  margin-bottom: 16px;
  letter-spacing: -0.025em;
  overflow: visible;
  text-align: left;
}

.intro-headline :deep(.title-line) {
  display: block;
  white-space: nowrap;
  overflow: visible;
}

.intro-headline :deep(.accent),
.outros-headline :deep(.accent),
.portfolio-headline :deep(.portfolio-accent),
.pricing-headline :deep(.pricing-accent) {
  text-shadow:
    0 0 14px rgba(240, 255, 31, 0.48),
    0 0 28px rgba(240, 255, 31, 0.28),
    0 0 52px rgba(240, 255, 31, 0.14);
}

.intro-sub {
  font-size: clamp(1rem, 1.35vw, 1.18rem);
  color: #9090B0;
  line-height: 1.72;
  max-width: 760px;
  margin: 0;
  text-align: left;
}

.vantagens-wrap {
  position: relative;
  width: 100%;
  margin-top: clamp(68px, 9vh, 116px);
}

.vantagens {
  --vantagem-divider-color: rgba(79, 70, 229, 0.58);
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  width: 100%;
  overflow: visible;
  border-top: 1px solid var(--vantagem-divider-color);
  border-bottom: 1px solid var(--vantagem-divider-color);
  background:
    radial-gradient(ellipse 70% 85% at 100% 0%, rgba(56, 15, 233, 0.18), transparent 58%),
    radial-gradient(ellipse 80% 70% at 0% 100%, rgba(240, 255, 31, 0.06), transparent 62%),
    rgba(10, 10, 20, 0.58);
}

.vantagem-card {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  align-items: stretch;
  width: 100%;
  min-height: clamp(260px, 24vw, 340px);
  opacity: 0;
  transform: translateY(16px);
  z-index: 1;
  overflow: visible;
}

.vantagem-card::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background:
    radial-gradient(ellipse 88% 34% at 50% 104%, rgba(102, 154, 255, 0.52) 0%, rgba(35, 101, 255, 0.24) 33%, transparent 72%),
    radial-gradient(ellipse 78% 28% at 50% 100%, rgba(232, 230, 255, 0.32) 0%, rgba(79, 70, 229, 0.28) 34%, transparent 72%),
    linear-gradient(to bottom, rgba(10, 10, 20, 0) 0%, rgba(35, 101, 255, 0.08) 76%, rgba(102, 154, 255, 0.18) 100%);
  box-shadow:
    inset 0 -22px 34px rgba(102, 154, 255, 0.18),
    inset 0 -8px 14px rgba(232, 230, 255, 0.16),
    inset 14px 0 28px rgba(35, 101, 255, 0.12),
    inset -14px 0 28px rgba(79, 70, 229, 0.12);
}

.vantagem-card:nth-of-type(2)::before {
  background:
    radial-gradient(ellipse 88% 34% at 50% -4%, rgba(102, 154, 255, 0.52) 0%, rgba(35, 101, 255, 0.24) 33%, transparent 72%),
    radial-gradient(ellipse 78% 28% at 50% 0%, rgba(232, 230, 255, 0.32) 0%, rgba(79, 70, 229, 0.28) 34%, transparent 72%),
    linear-gradient(to top, rgba(10, 10, 20, 0) 0%, rgba(35, 101, 255, 0.08) 76%, rgba(102, 154, 255, 0.18) 100%);
  box-shadow:
    inset 0 22px 34px rgba(102, 154, 255, 0.18),
    inset 0 8px 14px rgba(232, 230, 255, 0.16),
    inset 14px 0 28px rgba(35, 101, 255, 0.12),
    inset -14px 0 28px rgba(79, 70, 229, 0.12);
}

.vantagem-card:nth-of-type(1) {
  z-index: 4;
}

.vantagem-card:nth-of-type(2) {
  z-index: 3;
}

.vantagem-card:nth-of-type(3) {
  z-index: 2;
}

.vantagem-card:not(:last-child)::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  width: 1px;
  background: var(--vantagem-divider-color);
  pointer-events: none;
}

.vantagem-header {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  min-width: 0;
  position: relative;
  z-index: 1;
}

.vantagem-card.show { opacity: 1; transform: translateY(0); }

/* Staggered reveal */
.vantagem-card:nth-of-type(1) { transition-delay: 0.05s; }
.vantagem-card:nth-of-type(2) { transition-delay: 0.12s; }
.vantagem-card:nth-of-type(3) { transition-delay: 0.20s; }

.vantagem-card h3 {
  margin: 0;
  min-width: 0;
  font-family: var(--font-display);
  font-size: clamp(1.22rem, 1.55vw, 1.62rem);
  line-height: 1.1;
  font-weight: 700;
  color: #E8E6FF;
  letter-spacing: 0;
  text-align: left;
}

/* Expand description on hover — expansion stays within reserved wrap height */
.vantagem-card p {
  position: relative;
  z-index: 1;
  margin: clamp(18px, 1.9vw, 26px) 0 0;
  max-width: 34ch;
  font-size: clamp(0.9rem, 0.95vw, 1rem);
  color: rgba(232, 230, 255, 0.74);
  line-height: 1.55;
  text-align: left;
}

.vantagem-body {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-width: 0;
  padding: clamp(28px, 3.4vw, 46px) clamp(22px, 3vw, 40px);
  background:
    radial-gradient(ellipse 70% 90% at 100% 0%, rgba(56, 15, 233, 0.16), transparent 62%),
    rgba(13, 10, 36, 0.58);
}

.vantagem-card:first-of-type .vantagem-body {
  background:
    linear-gradient(to right, #0A0A14 0%, rgba(10, 10, 20, 0.82) 12%, rgba(10, 10, 20, 0) 34%),
    radial-gradient(ellipse 70% 90% at 100% 0%, rgba(56, 15, 233, 0.16), transparent 62%),
    rgba(13, 10, 36, 0.58);
}

.vantagem-card:last-of-type .vantagem-body {
  background:
    linear-gradient(to left, #0A0A14 0%, rgba(10, 10, 20, 0.82) 12%, rgba(10, 10, 20, 0) 34%),
    radial-gradient(ellipse 70% 90% at 100% 0%, rgba(56, 15, 233, 0.16), transparent 62%),
    rgba(13, 10, 36, 0.58);
}

.vantagem-card-sparkle {
  position: absolute;
  left: 100%;
  z-index: 12;
  width: 28px;
  height: 28px;
  color: #4F46E5;
  filter:
    drop-shadow(0 0 12px rgba(79, 70, 229, 0.58))
    drop-shadow(0 0 20px rgba(79, 70, 229, 0.28));
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.vantagem-card-sparkle--top {
  top: 0;
}

.vantagem-card-sparkle--bottom {
  top: 100%;
}

.vantagem-card-sparkle--edge-left {
  left: 0;
}

.vantagem-card-sparkle--edge-right {
  left: 100%;
}

.vantagem-card:last-of-type .vantagem-card-sparkle--bottom:not(.vantagem-card-sparkle--edge) {
  display: none;
}

.vantagem-card:last-of-type .vantagem-card-sparkle:not(.vantagem-card-sparkle--edge) {
  display: none;
}

.services-track {
  --services-track-h: 400vh;
  position: relative;
  width: 100%;
  height: var(--services-track-h);
  margin-top: clamp(112px, 12vw, 168px);
  margin-bottom: 64px;
}

.services-track--static {
  height: auto;
}

.services-panel {
  --services-sticky-top: calc(5rem + 40px);
  --service-panel-header-h: 2.75rem;
  --service-title-stack-h: 4.75rem;
  --services-panel-pad-x: 44px;
  --services-panel-pad-y-top: 40px;
  --services-panel-pad-y-bottom: 32px;
  --services-stage-h: clamp(420px, 48vh, 560px);
  --service-expand-mt: 4px;
  --service-detail-pt: 4px;
  --service-desc-mt: clamp(40px, 5vh, 72px);
  --service-title-scale: 1;
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

.services-panel--static {
  position: static;
  top: auto;
  /* Keep overflow hidden so border-radius clips children */
  overflow: hidden;
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

.services-stage--static {
  height: auto;
  overflow: visible;
  flex-shrink: 1;
}

.services-stack {
  position: absolute;
  inset: 0;
}

.services-stack--static {
  position: static;
  inset: auto;
  display: flex;
  flex-direction: column;
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

.service-card--static {
  position: static;
  inset: auto;
  overflow: visible;
  transform: none !important;
  will-change: auto;
  height: auto;
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
  height: calc(100% - var(--service-card-stack-offset, 0px));
  box-sizing: border-box;
}

.service-card--static .service-card-inner {
  height: auto;
}

@media (prefers-reduced-motion: reduce) {
  .services-track {
    height: auto;
  }

  .services-panel {
    position: static;
    top: auto;
    overflow: hidden;
  }

  .services-stage {
    height: auto;
    overflow: visible;
  }

  .services-stack {
    position: static;
    inset: auto;
    display: flex;
    flex-direction: column;
  }

  .service-card {
    position: static;
    inset: auto;
    overflow: visible;
    transform: none !important;
    will-change: auto;
    height: auto;
  }

  .service-card-inner {
    height: auto;
  }
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
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
}

.service-row-main {
  min-width: 0;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
}

.service-expand {
  display: block;
  flex: 1;
  min-height: 0;
  margin-top: var(--service-expand-mt, 10px);
}

.service-expand-inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(340px, min(460px, 36%));
  gap: 28px clamp(36px, 5vw, 72px);
  align-items: stretch;
  height: 100%;
  min-height: 0;
}

.service-row-aside {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-end;
  min-width: 0;
  gap: clamp(16px, 2.2vh, 24px);
  height: 100%;
}

.service-row-aside--preview {
  justify-content: flex-start;
  padding-top: clamp(18px, 3.5vh, 42px);
}

.services-panel .service-title {
  font-family: var(--font-display);
  font-weight: 700;
  color: #380FE9;
  font-size: calc(clamp(3.25rem, 6.8vw, 5.25rem) * var(--service-title-scale, 1));
  letter-spacing: -0.03em;
  line-height: 1.12;
  margin: 0;
  /* Keep descenders inside the title box so the stack cut can sit flush */
  padding-bottom: calc(0.22em * var(--service-title-scale, 1));
  display: block;
  transition: opacity 0.12s ease;
}

.service-card--collapsed .service-title {
  opacity: 0.42;
  padding-bottom: calc(0.34em * var(--service-title-scale, 1));
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
  padding: 0.5em 0.95em;
  line-height: 1;
  white-space: nowrap;
  vertical-align: middle;
  margin-left: 0.35em;
  transform: translateY(-0.12em);
  transition: opacity 0.12s ease;
}

.service-row-detail {
  --service-content-gap: clamp(22px, 3vh, 34px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding-top: var(--service-detail-pt, 12px);
  min-height: 0;
  height: 100%;
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
  font-size: clamp(1.02rem, 1.36vw, 1.2rem);
  color: rgba(10,10,20,0.6);
  line-height: 1.6;
  margin: clamp(56px, 8vh, 96px) 0 0;
  max-width: 34rem;
  padding-top: 0;
}

.service-row-detail--with-list .service-desc {
  margin-top: var(--service-content-gap);
  max-width: 38rem;
}

.service-feature-list {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 10px;
  width: min(100%, 38rem);
  margin: var(--service-content-gap) 0 0;
  padding: 0;
  list-style: none;
  color: rgba(10, 10, 20, 0.58);
  font-size: clamp(0.9rem, 1.02vw, 1.04rem);
  font-weight: 400;
  line-height: 1.48;
}

.service-feature-list li {
  position: relative;
  min-width: 0;
  padding-left: 16px;
}

.service-feature-list li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.56em;
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: #380FE9;
  box-shadow: 0 0 10px rgba(56, 15, 233, 0.3);
}

.service-row-aside .service-illustration {
  display: block;
  width: min(100%, 340px);
  height: auto;
  max-height: min(340px, 38vh);
  align-self: center;
  object-fit: contain;
  object-position: bottom center;
}

.service-row-aside .service-illustration--preview {
  width: min(100%, 500px);
  max-height: min(560px, 62vh);
  object-position: top center;
}

.services-cta-btn--inline {
  width: min(100%, 330px);
  max-width: 100%;
  margin-top: var(--service-content-gap);
  align-self: flex-start;
  justify-content: center;
  gap: 8px;
  padding: 12px 12px 12px 18px;
  font-size: 0.88rem;
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

.products-deco {
  width: min(100%, var(--section-max-width));
  margin: clamp(64px, 8vw, 108px) auto clamp(28px, 4vw, 48px);
  padding-inline: var(--services-panel-pad-x, 48px);
}

.products-deco .section-deco-label {
  color: #380FE9;
}

.extras-grid {
  --extra-divider-color: rgba(79, 70, 229, 0.58);
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  width: 100vw;
  max-width: none;
  margin-inline: calc(50% - 50vw);
  border-top: 1px solid var(--extra-divider-color);
  border-bottom: 1px solid var(--extra-divider-color);
  background:
    radial-gradient(ellipse 70% 85% at 100% 0%, rgba(56, 15, 233, 0.22), transparent 58%),
    radial-gradient(ellipse 80% 70% at 0% 100%, rgba(240, 255, 31, 0.07), transparent 62%),
    rgba(10, 10, 20, 0.72);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.28);
}

.outro-card,
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

.outro-card::before,
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

.outro-card::after,
.processo-card::after,
.pricing-card::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  border-radius: inherit;
  pointer-events: none;
  background:
    radial-gradient(ellipse 88% 34% at 50% 104%, rgba(102, 154, 255, 0.42) 0%, rgba(35, 101, 255, 0.2) 34%, transparent 74%),
    radial-gradient(ellipse 78% 28% at 50% 100%, rgba(232, 230, 255, 0.22) 0%, rgba(79, 70, 229, 0.22) 34%, transparent 74%),
    linear-gradient(to bottom, rgba(10, 10, 20, 0) 0%, rgba(35, 101, 255, 0.06) 76%, rgba(102, 154, 255, 0.14) 100%);
  box-shadow:
    inset 0 -18px 30px rgba(102, 154, 255, 0.12),
    inset 0 -7px 14px rgba(232, 230, 255, 0.1),
    inset 12px 0 24px rgba(35, 101, 255, 0.08),
    inset -12px 0 24px rgba(79, 70, 229, 0.08);
}

.outro-card:hover,
.processo-card:hover,
.pricing-card:hover {
  background:
    radial-gradient(ellipse 90% 80% at 0% 0%, rgba(138, 138, 255, 0.12) 0%, transparent 58%),
    radial-gradient(ellipse 90% 80% at 100% 100%, rgba(138, 138, 255, 0.12) 0%, transparent 58%),
    #0D0A24;
}

.outro-card:hover::before,
.processo-card:hover::before,
.pricing-card:hover::before {
  background:
    linear-gradient(135deg, rgba(138, 138, 255, 0.52) 0%, rgba(138, 138, 255, 0) 42%),
    linear-gradient(315deg, rgba(138, 138, 255, 0.52) 0%, rgba(138, 138, 255, 0) 42%);
}

.vantagem-card {
  transition: opacity 0.55s ease, transform 0.55s ease;
  box-shadow: 0 0 0 transparent;
}

.extra-card {
  position: relative;
  display: grid;
  grid-template-columns: minmax(220px, 40%) minmax(0, 60%);
  height: clamp(250px, 29vw, 360px);
  border-bottom: 0;
  overflow: visible;
}

.extra-card:not(:last-child)::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  height: 1px;
  background: var(--extra-divider-color);
  pointer-events: none;
}

.extra-card:first-child::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  z-index: 2;
  height: 1px;
  background: var(--extra-divider-color);
  pointer-events: none;
}

.extra-card-sparkle {
  position: absolute;
  left: 40%;
  z-index: 3;
  width: 28px;
  height: 28px;
  color: #4F46E5;
  filter:
    drop-shadow(0 0 12px rgba(79, 70, 229, 0.58))
    drop-shadow(0 0 20px rgba(79, 70, 229, 0.28));
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.extra-card-sparkle--top {
  top: 0;
}

.extra-card-sparkle--bottom {
  top: 100%;
  display: none;
}

.extra-card:last-child .extra-card-sparkle--bottom {
  display: block;
}

.extra-media {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  border-right: 1px solid var(--extra-divider-color);
  background:
    radial-gradient(ellipse 70% 70% at 50% 50%, rgba(56, 15, 233, 0.12), transparent 64%),
    linear-gradient(180deg, rgba(7, 7, 16, 0.88), rgba(13, 10, 36, 0.64));
}

.extra-media-icon {
  width: clamp(64px, 9vw, 112px);
  height: clamp(64px, 9vw, 112px);
  color: rgba(240, 255, 31, 0.16);
  stroke-width: 1.25;
}

.extra-media--image {
  overflow: hidden;
}

.extra-media-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

.extra-card-body {
  position: relative;
  isolation: isolate;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: clamp(22px, 3vw, 40px);
  min-width: 0;
  padding: clamp(26px, 3.6vw, 46px) clamp(26px, 4.8vw, 64px);
  background:
    radial-gradient(ellipse 70% 90% at 100% 0%, rgba(56, 15, 233, 0.1), transparent 64%),
    rgba(13, 10, 36, 0.58);
}

.extra-card-body::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background:
    radial-gradient(ellipse 34% 88% at 104% 50%, rgba(102, 154, 255, 0.22) 0%, rgba(35, 101, 255, 0.1) 34%, transparent 76%),
    radial-gradient(ellipse 28% 78% at 100% 50%, rgba(232, 230, 255, 0.1) 0%, rgba(79, 70, 229, 0.12) 34%, transparent 76%),
    linear-gradient(to left, rgba(102, 154, 255, 0.07) 0%, rgba(35, 101, 255, 0.03) 24%, rgba(10, 10, 20, 0) 100%);
  box-shadow:
    inset -18px 0 30px rgba(102, 154, 255, 0.06),
    inset -7px 0 14px rgba(232, 230, 255, 0.05);
}

.extra-card-body > * {
  position: relative;
  z-index: 1;
}

.extra-card-copy {
  max-width: 650px;
}

.extra-card h4 {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 2.55vw, 2.3rem);
  font-weight: 600;
  line-height: 1.08;
  color: #E8E6FF;
  letter-spacing: 0;
}

.extra-card p {
  margin: clamp(18px, 2.4vw, 28px) 0 0;
  max-width: 56ch;
  font-size: clamp(1rem, 1.35vw, 1.24rem);
  color: rgba(232, 230, 255, 0.74);
  line-height: 1.45;
}

.extra-card-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: min(100%, 320px);
  min-height: 56px;
  padding: 14px 22px;
  border: 1px solid rgba(240, 255, 31, 0.38);
  border-radius: 999px;
  background: rgba(10, 10, 20, 0.76);
  color: #F0FF1F;
  font-family: var(--font-body);
  font-size: 0.92rem;
  font-weight: 800;
  letter-spacing: 0;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}

.extra-card-cta:hover {
  transform: translateY(-2px);
  border-color: #F0FF1F;
  background: #F0FF1F;
  color: #380FE9;
}

.extra-card-cta:active {
  transform: scale(0.98);
}

.extra-card-cta-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
}

.extra-card-cta:hover .extra-card-cta-icon {
  background: transparent;
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
  justify-content: center;
  gap: 12px;
  padding: 14px 22px;
  border-radius: 999px;
  border: 1px solid rgba(240, 255, 31, 0.38);
  background: rgba(10, 10, 20, 0.76);
  color: #F0FF1F;
  font-size: 0.92rem;
  font-weight: 800;
  letter-spacing: 0;
  text-transform: none;
  text-decoration: none;
  width: fit-content;
  min-height: 56px;
  transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}

.portfolio-cta.scroll-reveal--played:hover {
  transform: translateY(-2px);
  border-color: #F0FF1F;
  background: #F0FF1F;
  color: #380FE9;
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
  min-height: 260px;
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

.processo-card:nth-child(1)::after {
  background:
    radial-gradient(ellipse 88% 34% at 50% 104%, rgba(102, 154, 255, 0.26) 0%, rgba(35, 101, 255, 0.12) 34%, transparent 76%),
    radial-gradient(ellipse 78% 28% at 50% 100%, rgba(232, 230, 255, 0.12) 0%, rgba(79, 70, 229, 0.12) 34%, transparent 76%),
    linear-gradient(to bottom, rgba(10, 10, 20, 0) 0%, rgba(35, 101, 255, 0.03) 76%, rgba(102, 154, 255, 0.08) 100%);
  box-shadow:
    inset 0 -18px 30px rgba(102, 154, 255, 0.06),
    inset 0 -7px 14px rgba(232, 230, 255, 0.05),
    inset 12px 0 24px rgba(35, 101, 255, 0.04),
    inset -12px 0 24px rgba(79, 70, 229, 0.04);
}

.processo-card:nth-child(2)::after {
  background:
    radial-gradient(ellipse 88% 34% at 50% -4%, rgba(102, 154, 255, 0.24) 0%, rgba(35, 101, 255, 0.1) 34%, transparent 76%),
    radial-gradient(ellipse 78% 28% at 50% 0%, rgba(232, 230, 255, 0.1) 0%, rgba(79, 70, 229, 0.11) 34%, transparent 76%),
    linear-gradient(to top, rgba(10, 10, 20, 0) 0%, rgba(35, 101, 255, 0.025) 76%, rgba(102, 154, 255, 0.07) 100%);
  box-shadow:
    inset 0 18px 30px rgba(102, 154, 255, 0.05),
    inset 0 7px 14px rgba(232, 230, 255, 0.04),
    inset 12px 0 24px rgba(35, 101, 255, 0.03),
    inset -12px 0 24px rgba(79, 70, 229, 0.03);
}

.processo-card:nth-child(3)::after {
  background:
    radial-gradient(ellipse 34% 88% at -4% 50%, rgba(102, 154, 255, 0.24) 0%, rgba(35, 101, 255, 0.1) 34%, transparent 76%),
    radial-gradient(ellipse 28% 78% at 0% 50%, rgba(232, 230, 255, 0.1) 0%, rgba(79, 70, 229, 0.11) 34%, transparent 76%),
    linear-gradient(to right, rgba(102, 154, 255, 0.07) 0%, rgba(35, 101, 255, 0.025) 24%, rgba(10, 10, 20, 0) 100%);
  box-shadow:
    inset 18px 0 30px rgba(102, 154, 255, 0.05),
    inset 7px 0 14px rgba(232, 230, 255, 0.04),
    inset 0 -12px 24px rgba(35, 101, 255, 0.03),
    inset 0 12px 24px rgba(79, 70, 229, 0.03);
}

.processo-card:nth-child(4)::after {
  background:
    radial-gradient(ellipse 34% 88% at 104% 50%, rgba(102, 154, 255, 0.24) 0%, rgba(35, 101, 255, 0.1) 34%, transparent 76%),
    radial-gradient(ellipse 28% 78% at 100% 50%, rgba(232, 230, 255, 0.1) 0%, rgba(79, 70, 229, 0.11) 34%, transparent 76%),
    linear-gradient(to left, rgba(102, 154, 255, 0.07) 0%, rgba(35, 101, 255, 0.025) 24%, rgba(10, 10, 20, 0) 100%);
  box-shadow:
    inset -18px 0 30px rgba(102, 154, 255, 0.05),
    inset -7px 0 14px rgba(232, 230, 255, 0.04),
    inset 0 -12px 24px rgba(35, 101, 255, 0.03),
    inset 0 12px 24px rgba(79, 70, 229, 0.03);
}

.processo-numero {
  position: absolute;
  top: 12px;
  right: 16px;
  font-size: clamp(5rem, 7.5vw, 6.25rem);
  font-weight: 700;
  color: rgba(102, 154, 255, 0.16);
  line-height: 1;
  pointer-events: none;
  user-select: none;
  z-index: 0;
  text-shadow: 0 0 24px rgba(56, 15, 233, 0.18);
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
  padding: var(--section-pad-y) var(--section-pad-x);
  background: #0A0A14;
  overflow: hidden;
}

.contato::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 70% 45% at 50% 0%, rgba(56, 15, 233, 0.16), transparent 68%),
    linear-gradient(to bottom, rgba(232, 230, 255, 0.04), transparent 22%);
  z-index: 0;
  pointer-events: none;
}

.contato-inner {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 360px);
  gap: 16px;
  width: 100%;
  max-width: var(--section-max-width);
  margin: 0 auto;
}

.contato-form-wrap {
  position: relative;
  min-width: 0;
  min-height: clamp(460px, 43vw, 610px);
  padding: clamp(34px, 4.2vw, 56px);
  display: grid;
  align-content: center;
  gap: clamp(26px, 3.2vw, 44px);
  border-radius: 16px;
  border: 1px solid rgba(232, 230, 255, 0.16);
  background:
    radial-gradient(ellipse 74% 52% at 10% 0%, rgba(56, 15, 233, 0.24), transparent 66%),
    radial-gradient(ellipse 58% 48% at 92% 16%, rgba(240, 255, 31, 0.09), transparent 70%),
    linear-gradient(145deg, rgba(17, 17, 40, 0.98) 0%, rgba(8, 8, 22, 0.98) 58%, rgba(10, 10, 20, 0.98) 100%);
  color: #E8E6FF;
  box-shadow:
    0 18px 58px rgba(0, 0, 0, 0.36),
    inset 0 0 0 1px rgba(255, 255, 255, 0.04);
  overflow: hidden;
}

.contato-form-wrap::before {
  content: '';
  position: absolute;
  top: 0;
  left: clamp(34px, 4.2vw, 56px);
  right: clamp(34px, 4.2vw, 56px);
  height: 1px;
  background: linear-gradient(90deg, #380FE9, rgba(240, 255, 31, 0.9), rgba(232, 230, 255, 0));
  opacity: 0.85;
  pointer-events: none;
}

.contato-form-wrap > * {
  position: relative;
  z-index: 1;
}

.contato-form-title {
  max-width: 560px;
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3.55rem);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: 0;
  color: #E8E6FF;
}

.contato-form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(24px, 4vw, 56px);
  align-items: start;
}

.contato-form-group {
  min-width: 0;
}

.contato-label {
  display: block;
  margin-bottom: 10px;
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(240, 255, 31, 0.82);
}

.contato-input {
  width: 100%;
  min-height: 54px;
  padding: 15px 16px;
  border: 1px solid rgba(232, 230, 255, 0.14);
  border-radius: 12px;
  background: rgba(232, 230, 255, 0.055);
  color: #F6F5FF;
  font-size: 1rem;
  font-family: inherit;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
}

.contato-input::placeholder { color: rgba(232, 230, 255, 0.42); }

.contato-input:focus {
  border-color: rgba(240, 255, 31, 0.68);
  background: rgba(232, 230, 255, 0.085);
  box-shadow:
    0 0 0 3px rgba(240, 255, 31, 0.08),
    0 0 28px rgba(56, 15, 233, 0.16);
}

.contato-input--invalid {
  border-color: rgba(255, 117, 117, 0.82);
  box-shadow: 0 0 0 3px rgba(255, 117, 117, 0.1);
}

.contato-input:disabled {
  cursor: not-allowed;
  opacity: 0.62;
}

.contato-textarea {
  min-height: 132px;
  resize: none;
}

.contato-actions {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 2px;
}

.contato-submit {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  min-height: 56px;
  padding: 8px 8px 8px 28px;
  border-radius: 999px;
  border: 1px solid rgba(240, 255, 31, 0.5);
  background:
    linear-gradient(135deg, #F6FF62 0%, #F0FF1F 50%, #C9D70F 100%);
  color: #111128;
  font-size: 0.95rem;
  font-weight: 700;
  font-family: inherit;
  letter-spacing: 0;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow:
    0 14px 30px rgba(0, 0, 0, 0.22),
    0 0 32px rgba(240, 255, 31, 0.16);
  transition: background 0.2s ease, transform 0.18s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.contato-submit-icon,
.contato-channel-arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 999px;
  background: #111128;
  color: #F0FF1F;
  flex-shrink: 0;
}

.contato-submit-icon svg,
.contato-channel-arrow svg,
.contato-channel-icon svg {
  width: 18px;
  height: 18px;
  stroke-width: 2.4;
}

.contato-submit:hover {
  border-color: rgba(240, 255, 31, 0.84);
  transform: translateY(-2px);
  box-shadow:
    0 18px 36px rgba(0, 0, 0, 0.3),
    0 0 40px rgba(240, 255, 31, 0.22);
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
  border-color: rgba(56, 232, 97, 0.48);
  background: rgba(56, 232, 97, 0.14);
  color: #DFFFE6;
  transform: none;
  box-shadow: none;
}

.contato-privacy {
  max-width: 250px;
  margin: 0;
  color: rgba(232, 230, 255, 0.58);
  font-size: 0.9rem;
  line-height: 1.35;
}

.contato-links {
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 16px;
  min-height: clamp(460px, 43vw, 610px);
}

.contato-channel-card {
  position: relative;
  min-height: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: clamp(24px, 3vw, 42px);
  padding: clamp(24px, 2.5vw, 34px);
  border-radius: 18px;
  border: 1.5px solid rgba(255, 255, 255, 0.26);
  background:
    radial-gradient(ellipse 70% 60% at 50% 18%, rgba(56, 15, 233, 0.1), transparent 66%),
    rgba(5, 5, 16, 0.92);
  color: #E8E6FF;
  text-decoration: none;
  overflow: hidden;
  box-shadow: 0 18px 58px rgba(0, 0, 0, 0.28);
  transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
}

.contato-channel-card:hover {
  transform: translateY(-2px);
  border-color: rgba(232, 230, 255, 0.48);
  background:
    radial-gradient(ellipse 70% 60% at 50% 18%, rgba(56, 15, 233, 0.16), transparent 66%),
    rgba(7, 7, 20, 0.96);
}

.contato-channel-main {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  align-self: flex-start;
}

.contato-channel-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 999px;
  border: 1.5px solid rgba(232, 230, 255, 0.56);
  color: #E8E6FF;
}

.contato-channel-name {
  font-size: 0.95rem;
  font-weight: 700;
  color: #E8E6FF;
  text-transform: uppercase;
}

.contato-channel-action {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: rgba(232, 230, 255, 0.72);
  font-size: 0.95rem;
}

.contato-channel-arrow {
  width: 34px;
  height: 34px;
  background: #E8E6FF;
  color: #0A0A14;
}

.contato-feedback {
  margin: 0;
  font-size: var(--text-sm);
  line-height: 1.5;
}

.contato-feedback--erro {
  color: #FF8E8E;
}

.contato-feedback--aviso {
  color: #F0FF1F;
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
    padding-top: 88px;
    padding-bottom: 80px;
  }

  .intro-decoracao { display: none; }
  .intro-wrapper {
    min-height: auto;
    flex-direction: column;
    padding-block: 0;
  }

  .intro-centro {
    max-width: 100%;
  }

  .intro-headline,
  .intro-sub {
    margin-inline: auto;
    text-align: center;
  }

  .vantagens-wrap {
    min-height: 0;
    margin-top: 48px;
  }

  .vantagens {
    display: grid;
    grid-template-columns: 1fr;
  }

  .vantagem-card {
    grid-template-columns: minmax(0, 1fr);
    min-height: auto;
  }

  .vantagem-card:not(:last-child)::after {
    top: auto;
    right: 0;
    left: 0;
    bottom: 0;
    width: auto;
    height: 1px;
  }

  .vantagem-card-sparkle {
    left: 50%;
  }

  .vantagem-card-sparkle--edge {
    display: none;
  }

  .vantagem-card:last-of-type .vantagem-card-sparkle--bottom {
    display: block;
  }

  .vantagem-card:last-of-type .vantagem-card-sparkle--top {
    display: block;
  }

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
    grid-template-columns: 1fr;
  }

  .contato-form-wrap,
  .contato-links {
    min-height: auto;
  }

  .contato-links {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: none;
  }

  .contato-channel-card {
    min-height: 220px;
  }

  .contato-form-wrap { width: 100%; max-width: none; }

  .pricing-cards { grid-template-columns: 1fr; }

  .services-track {
    margin-top: 56px;
    margin-bottom: 48px;
    height: auto;
  }

  .services-panel {
    --services-sticky-top: calc(4.5rem + 32px);
    --service-panel-header-h: 2.5rem;
    --service-title-stack-h: 4.5rem;
    --services-panel-pad-x: 24px;
    --services-panel-pad-y-top: 28px;
    --services-panel-pad-y-bottom: 24px;
    position: static;
    top: auto;
    overflow: hidden;
  }

  .services-stage {
    height: auto;
    overflow: visible;
  }

  .services-stack {
    position: static;
    inset: auto;
    display: flex;
    flex-direction: column;
  }

  .service-card {
    position: static;
    inset: auto;
    overflow: visible;
    transform: none !important;
    will-change: auto;
    height: auto;
    padding-inline: var(--services-panel-pad-x);
  }

  .service-card-inner {
    height: auto;
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 28px 0 56px;
    align-items: flex-start;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    box-sizing: border-box;
  }

  .service-row-top {
    margin: 0;
    line-height: 1;
  }

  .service-num {
    font-size: 1rem;
    font-weight: 700;
    color: rgba(10, 10, 20, 0.45);
    letter-spacing: 0;
  }

  .service-row-body {
    display: block;
    width: 100%;
  }

  .service-row-main {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 0;
  }

  .services-panel .service-title {
    order: 0;
    padding-bottom: 0;
    font-size: clamp(2.625rem, 11.6vw, 3rem);
    line-height: 0.95;
    letter-spacing: -0.03em;
    max-width: 100%;
  }

  .service-new-badge {
    font-size: 0.7rem;
    padding: 0.48em 0.9em;
    transform: translateY(-0.08em);
  }

  .service-expand {
    display: contents;
    margin-top: 14px;
  }

  .service-expand-inner {
    display: contents;
  }

  .service-row-detail {
    --service-content-gap: 22px;
    display: contents;
    max-width: none;
    padding-top: 0;
    width: 100%;
    height: auto;
  }

  .service-desc {
    order: 2;
    margin: 32px 0 0;
    max-width: none;
    padding-top: 0;
    font-size: 18px;
    line-height: 1.5;
    text-wrap: pretty;
  }

  .service-feature-list {
    order: 3;
    grid-template-columns: minmax(0, 1fr);
    gap: 16px;
    width: 100%;
    margin-top: 28px;
    font-size: 17px;
    line-height: 1.45;
    text-wrap: pretty;
  }

  .service-feature-list li {
    display: grid;
    grid-template-columns: 6px minmax(0, 1fr);
    column-gap: 9px;
    align-items: start;
    padding-left: 0;
    max-width: 100%;
  }

  .service-feature-list li::before {
    position: static;
    grid-column: 1;
    margin-top: 0.52em;
  }

  .service-row-aside {
    order: 1;
    display: flex;
    width: 100%;
    gap: 0;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    padding-top: 0;
    height: auto;
    max-width: 100%;
  }

  .service-tags {
    display: none;
  }

  .service-row-aside .service-illustration {
    display: block;
    width: min(70%, 275px);
    max-height: min(275px, 36vh);
    object-position: top center;
  }

  .services-cta-btn--inline {
    order: 4;
    margin-top: 36px;
    margin-inline: auto;
    align-self: center;
    justify-content: center;
    width: min(100%, 330px);
    max-width: 100%;
    background: #111128;
    color: #E8E6FF;
    border: 1px solid rgba(56,15,233,0.14);
    border-radius: 999px;
    min-height: 64px;
    padding: 10px 12px 10px 18px;
    font-size: 0.88rem;
    font-weight: 600;
    gap: 8px;
    text-align: center;
  }

  .services-cta-btn--inline:hover {
    background: #380FE9;
    transform: translateY(-2px);
    color: #E8E6FF;
  }

  .services-cta-btn--inline:active {
    transform: scale(0.97);
  }

  .services-cta-btn--inline .services-cta-arrow {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: rgba(56,15,233,0.28);
    color: #380FE9;
  }

  .services-cta-btn--inline:hover .services-cta-arrow {
    background: #F0FF1F;
    color: #380FE9;
    transform: translateX(2px);
  }

  .services-cta-btn--inline .services-cta-arrow svg {
    width: 14px;
    height: 14px;
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

  .services-panel-footer .services-cta-btn {
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

  .processo-card {
    min-height: 230px;
  }

  .outros-cards { grid-template-columns: repeat(2, 1fr); }

  .contato-form-wrap {
    padding: 32px 24px;
  }

  .contato-form-row,
  .contato-links {
    grid-template-columns: 1fr;
  }

  .contato-actions {
    align-items: flex-start;
    flex-direction: column;
  }

  .contato-channel-card {
    min-height: 190px;
  }

  .extra-card {
    grid-template-columns: minmax(0, 1fr);
    height: auto;
    min-height: 0;
  }

  .extra-media {
    min-height: clamp(160px, 34vw, 220px);
    border-right: 0;
    border-bottom: 1px solid var(--extra-divider-color);
  }

  .extra-card-sparkle {
    left: 50%;
  }

  .extra-card-body {
    gap: 28px;
    padding: 28px 24px 32px;
  }

  .extra-card h4 {
    font-size: clamp(1.45rem, 6vw, 2rem);
  }

  .extra-card p {
    font-size: 1rem;
  }

  .extra-card-cta {
    width: 100%;
    min-height: 52px;
  }

  .products-deco {
    width: 100vw;
    max-width: none;
    margin-inline: calc(50% - 50vw);
    padding-inline: 20px;
  }

  .products-deco .section-deco-label {
    width: 100%;
    text-align: left;
  }

  .products-deco > .section-deco-draw {
    width: 100%;
  }

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

  .outros-headline,
  .portfolio-headline,
  .pricing-headline,
  .processo-header h2 {
    font-size: clamp(2.25rem, 8.8vw, 3.25rem);
    line-height: 1.06;
    letter-spacing: -0.025em;
  }

  .portfolio-headline,
  .pricing-headline {
    max-width: min(100%, 680px);
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
    --hero-front-top: clamp(72px, 8svh, 96px);
    --hero-front-bottom: 0px;
    --hero-constellation-content-gap: 10px;
    --hero-constellation-lift: 0px;
    --hero-constellation-mountain-gap: 0px;
    --hero-constellation-width: clamp(44vw, 52vw, 480px);
    --hero-title-line-height: 1.02;
    min-height: var(--hero-mobile-min-height, 100svh);
    background:
      linear-gradient(to bottom, rgba(10, 6, 28, 0.2) 0%, rgba(19, 8, 60, 0.1) 52%, rgba(42, 15, 184, 0.16) 100%),
      url('/hero-abstract-bg.webp') center / cover no-repeat,
      linear-gradient(to bottom, #0A061C 0%, #13083C 52%, #2A0FB8 100%);
  }

  .hero-sky::before {
    height: clamp(200px, 38vh, 400px);
    opacity: 0.32;
    background: radial-gradient(
      ellipse 140% 90% at 50% 100%,
      #4a24e0 0%,
      rgba(55, 14, 231, 0.4) 28%,
      rgba(55, 14, 231, 0.12) 52%,
      transparent 100%
    );
    -webkit-mask-image: linear-gradient(to top, #000 28%, transparent 100%);
    mask-image: linear-gradient(to top, #000 28%, transparent 100%);
  }

  @media (min-height: 1000px) {
    .banner {
      min-height: var(--hero-mobile-min-height, auto);
    }
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
    z-index: auto;
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

  .banner-copy-head {
    align-items: center;
    width: 100%;
  }

  .banner-title,
  .banner-description {
    text-align: center;
  }

  .banner-description {
    margin-inline: auto;
  }

  .banner-title {
    margin-top: 0;
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
    z-index: 4;
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
    z-index: 3;
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

  .extra-media {
    min-height: 150px;
  }

  .extra-card-body {
    padding: 26px 20px 30px;
  }

  .extra-card-cta {
    min-height: 50px;
    font-size: 0.84rem;
  }

  .intro-headline {
    font-size: clamp(1.95rem, 8.4vw, 2.6rem);
    line-height: 1.08;
    max-width: calc(100vw - 40px);
  }

  .intro-headline :deep(.title-line) {
    white-space: normal;
  }

  .vantagem-card {
    grid-template-columns: 1fr;
  }

  .vantagem-card::before,
  .vantagem-card:nth-of-type(2)::before {
    background:
      linear-gradient(to right, #0A0A14 0%, rgba(10, 10, 20, 0.82) 7%, rgba(10, 10, 20, 0) 22%, rgba(10, 10, 20, 0) 78%, rgba(10, 10, 20, 0.82) 93%, #0A0A14 100%),
      radial-gradient(ellipse 130% 58% at 50% 106%, rgba(102, 154, 255, 0.28) 0%, rgba(35, 101, 255, 0.14) 38%, transparent 82%),
      radial-gradient(ellipse 112% 46% at 50% 100%, rgba(232, 230, 255, 0.14) 0%, rgba(79, 70, 229, 0.18) 36%, transparent 82%),
      linear-gradient(to bottom, rgba(10, 10, 20, 0) 0%, rgba(35, 101, 255, 0.05) 78%, rgba(102, 154, 255, 0.12) 100%);
    box-shadow:
      inset 0 -18px 30px rgba(102, 154, 255, 0.12),
      inset 0 -7px 14px rgba(232, 230, 255, 0.1);
  }

  .vantagem-body {
    padding: 36px 28px 42px;
  }

  .vantagem-card:first-of-type .vantagem-body,
  .vantagem-card:nth-of-type(2) .vantagem-body,
  .vantagem-card:last-of-type .vantagem-body {
    background:
      linear-gradient(to right, #0A0A14 0%, rgba(10, 10, 20, 0.82) 7%, rgba(10, 10, 20, 0) 22%, rgba(10, 10, 20, 0) 78%, rgba(10, 10, 20, 0.82) 93%, #0A0A14 100%),
      radial-gradient(ellipse 96% 110% at 100% 0%, rgba(56, 15, 233, 0.12), transparent 68%),
      rgba(13, 10, 36, 0.58);
  }

  .vantagem-card h3 {
    font-size: clamp(1.25rem, 5.8vw, 1.62rem);
    line-height: 1.08;
  }

  .vantagem-card p {
    margin-top: 16px;
    font-size: 0.95rem;
    line-height: 1.52;
  }

  .banner-inner {
    padding: calc(72px + env(safe-area-inset-top, 0px)) calc(20px + env(safe-area-inset-right, 0px)) calc(24px + env(safe-area-inset-bottom, 0px)) calc(20px + env(safe-area-inset-left, 0px));
  }

  .banner {
    --hero-title: clamp(2.75rem, 13.6vw, 3.75rem);
    --hero-desc: clamp(0.9rem, 3.5vw, 1rem);
    --hero-copy-width: calc(100vw - 40px);
    --hero-gap-title-desc: clamp(1.75rem, 4svh, 2.4rem);
    --hero-gap-desc-btn: clamp(2.25rem, 5svh, 3.4rem);
    --hero-front-top: clamp(76px, 8svh, 94px);
    --hero-constellation-content-gap: 4px;
    --hero-constellation-lift: 0px;
    --hero-constellation-width: clamp(68vw, 78vw, 86vw);
    --hero-title-line-height: 0.98;
    --hero-title-shadow: none;
    --hero-title-accent-shadow:
      0 0 18px rgba(240, 255, 31, 0.42);
  }

  .banner-title {
    margin-top: 0;
  }

  .hero-front {
    align-items: flex-start;
    padding-inline: calc(20px + env(safe-area-inset-left, 0px)) calc(20px + env(safe-area-inset-right, 0px));
  }

  .banner-copy {
    align-self: stretch;
    align-items: flex-start;
    max-width: var(--hero-copy-width);
    text-align: left;
    margin-inline: 0;
  }

  .banner-copy-head {
    align-items: flex-start;
  }

  .banner-title,
  .banner-description {
    text-align: left;
  }

  .banner-description {
    max-width: min(100%, 30rem);
    margin-inline: 0;
    line-height: 1.65;
    color: rgba(232, 230, 255, 0.8);
  }

  .banner-footer {
    align-items: stretch;
    justify-content: flex-start;
    width: 100%;
  }

  .banner-footer-buttons {
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    width: 100%;
    gap: clamp(16px, 2.6svh, 24px);
  }

  .banner-footer-side {
    width: 100%;
    justify-content: stretch;
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

  .banner-footer .banner-footer-link,
  .banner-footer .banner-footer-cta {
    width: 100%;
    min-width: 0;
    min-height: clamp(48px, 6.4svh, 58px);
    padding-block: clamp(13px, 1.9svh, 18px);
    font-size: clamp(0.74rem, 3vw, 0.86rem);
  }

  .banner-footer-link {
    border-color: rgba(240, 255, 31, 0.45);
    background:
      linear-gradient(135deg, rgba(56, 15, 233, 0.24) 0%, rgba(10, 10, 20, 0.96) 48%, rgba(240, 255, 31, 0.08) 100%);
    color: #F0FF1F;
  }

  .banner-footer-cta {
    border-color: rgba(240, 255, 31, 0.58);
    background:
      linear-gradient(135deg, #F6FF62 0%, #F0FF1F 45%, #C9D70F 100%);
    box-shadow:
      0 0 0 1px rgba(232, 230, 255, 0.08) inset,
      0 0 34px rgba(240, 255, 31, 0.2);
  }

  .servicos,
  .processo,
  .pricing,
  .portfolio,
  .contato {
    padding-bottom: 80px;
  }

  .contato-form-wrap {
    border-radius: 14px;
    padding: 28px 20px;
  }

  .contato-submit {
    width: 100%;
    justify-content: space-between;
  }

  .contato-channel-card {
    min-height: 168px;
    border-radius: 14px;
    padding: 24px 20px;
  }

  .portfolio-header { flex-direction: column; align-items: flex-start; gap: 8px; }
  .portfolio-deco {
    width: 100%;
    margin-left: 0;
  }

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
