<template>

<!---------------------- GLOBAL GRAIN --------------------->
  <GlobalGrain />

<!---------------------- NAVBAR --------------------->  
  <MenuBtn />
  <ScrollSparkle />

<!---------------------- HERO --------------------->  
  <section class="banner hero" id="top">
    <div class="hero-sky" aria-hidden="true">
      <HeroStarfield />
      <HeroConstellations />
    </div>
    <HeroTerrain />
    <div class="banner-copy">
      <h1 class="banner-title">{{ typedTitle }}</h1>
      <p class="banner-description">
        LYNX é um estúdio de DESIGN e DESENVOLVIMENTO WEB que ajuda negócios a crescerem com PRESENÇA DIGITAL DE ALTO PADRÃO.
      </p>
      <div class="banner-footer">
        <div class="banner-footer-buttons">
          <div class="banner-footer-side banner-footer-side--left">
            <a class="scroll-btn scroll-btn--outline btn-link banner-footer-link" href="#servicos">
              <span>Veja mais</span>
              <ArrowDown :size="12" stroke-width="2.5" />
            </a>
          </div>
          <div class="banner-footer-side banner-footer-side--right">
            <button class="scroll-btn banner-footer-cta" @click="scrollToNext">Peça agora</button>
          </div>
        </div>
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

    <div class="services-panel">
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

      <div class="services-list">
        <div
          v-for="(service, index) in listaServicos"
          :key="index"
          class="service-row"
          :class="{
            'service-row--active': activeService === index,
            'service-row--last': index === listaServicos.length - 1
          }"
          :data-service-card="index"
          :style="serviceRowEnterStyle(index)"
          @mouseenter="activeService = index"
        >
          <div class="service-row-top">
            <span class="service-num" :class="{ 'service-num--dim': activeService !== index }">
              {{ service.num }}
            </span>
          </div>

          <div class="service-row-body">
            <h3 class="service-title" :class="{ 'service-title--dim': activeService !== index }">
              {{ service.title }}
            </h3>

            <div class="service-content-wrapper">
              <div class="service-row-detail">
                <div class="service-row-left">
                  <div class="service-tags">
                    <span v-for="tag in service.tags" :key="tag" class="service-tag">
                      {{ tag }}
                    </span>
                  </div>
                  <p class="service-desc">{{ service.desc }}</p>
                </div>

                <div class="service-row-images">
                  <div class="service-img-card">
                    <div class="service-img-placeholder" :class="service.imgClass1"></div>
                  </div>
                  <div class="service-img-card">
                    <div class="service-img-placeholder" :class="service.imgClass2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
    
    <div class="extras-grid">
      <div class="extra-card" v-for="item in extras" :key="item.title">
        <div class="icon-box-extra">
          <component :is="item.icon" />
        </div>
        <div class="extra-card-body">
          <h4>{{ item.title }}</h4>
          <p>{{ item.desc }}</p>
        </div>
      </div>
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
        <div class="outro-card" v-for="item in outrosServicos" :key="item.title">
          <div class="outro-icon-wrap">
            <component :is="item.icon" />
          </div>
          <h4>{{ item.title }}</h4>
          <p>{{ item.desc }}</p>
          <span class="outro-cta"><component :is="ArrowUpRight" class="outro-arrow" /></span>
        </div>
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
            :lines="[
              [{ text: 'O que nós' }],
              [{ text: 'Construímos', accentClass: 'portfolio-accent' }]
            ]"
          />
        </div>
        <div class="section-deco portfolio-deco">
          <SectionDecoDraw orientation="horizontal" observe-target=".portfolio-header">
            <template #star>
              <DecoSparkle class="section-deco-sparkle" />
            </template>
            <template #line>
              <SectionDecoLine class="section-deco-line" />
            </template>
          </SectionDecoDraw>
          <span class="section-deco-label">[ Sites em Destaque ]</span>
        </div>
      </div>

      <div class="portfolio-stage">
        <!-- Browser mockup -->
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
              <div class="browser-placeholder" :style="{ background: projetos[activeProject].gradient }">
                <span class="browser-placeholder-label">{{ projetos[activeProject].title }}</span>
              </div>
            </div>
          </a>

          <!-- Setas de navegação -->
          <button class="portfolio-arrow portfolio-arrow--prev" @click="prevProject">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button class="portfolio-arrow portfolio-arrow--next" @click="nextProject">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>

        <!-- Info lateral -->
        <div class="portfolio-info">
          <span class="portfolio-num">{{ projetos[activeProject].num }} — {{ projetos[activeProject].category }}</span>
          <h3 class="portfolio-title">{{ projetos[activeProject].title }}</h3>
          <p class="portfolio-desc">{{ projetos[activeProject].desc }}</p>
          <a :href="projetos[activeProject].link" target="_blank" class="portfolio-cta">
            Visitar site <span>→</span>
          </a>

          <!-- Dots -->
          <div class="portfolio-dots">
            <button
              v-for="(p, i) in projetos"
              :key="i"
              class="portfolio-dot"
              :class="{ 'portfolio-dot--active': activeProject === i }"
              @click="activeProject = i"
            />
          </div>
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

        <!-- Card Standard -->
        <div class="pricing-card">
          <span class="pricing-tier">Standard</span>
          <div class="pricing-price">
            <span class="pricing-value">R$500</span>
            <span class="pricing-old">– R$750</span>
          </div>
          <p class="pricing-desc">Site institucional profissional de uma página</p>
          <div class="pricing-divider"></div>
          <ul class="pricing-features">
            <li>Layout simples e estruturado</li>
            <li>Mobile responsivo</li>
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
            <span class="pricing-value">R$1.000</span>
            <span class="pricing-old">– R$1.500</span>
          </div>
          <p class="pricing-desc">Design personalizado de alto nível</p>
          <div class="pricing-divider"></div>
          <ul class="pricing-features">
            <li>Layout e direção visual customizados</li>
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
            <div class="contato-info-item">
              <span class="contato-info-label">WhatsApp</span>
              <span class="contato-info-value">+55 (22) 98106-9554</span>
            </div>

            <div class="contato-info-item">
              <span class="contato-info-label">E-mail</span>
              <span class="contato-info-value">contato@suaempresa.com</span>
            </div>
          </div>
        </div>

      
      <div class="contato-form-wrap">     <!-- Formulário -->
        <div class="contato-form-group">
          <label class="contato-label">Nome</label>
          <input
            v-model="formNome"
            class="contato-input"
            type="text"
            placeholder="Seu nome"
          />
        </div>

        <div class="contato-form-group">
          <label class="contato-label">Telefone / Whatsapp</label>
          <input
            v-model="formTelefone"
            class="contato-input"
            type="text"
            placeholder="+55 (22) 00000-0000"
          />
        </div>

        <div class="contato-form-group">
          <label class="contato-label">Detalhes</label>
          <textarea
            v-model="formDetalhes"
            class="contato-input contato-textarea"
            placeholder="Conte-nos sobre o seu negócio e o que você precisa..."
            rows="5"
          ></textarea>
        </div>

        <div class="btn-constellation-contato">
          <button class="contato-submit" @click="enviarFormulario">

            <span v-if="!formEnviado">Enviar Solicitação</span>
            <span v-else>✓ Enviado com sucesso!</span>
          </button>
        </div>
      </div>
    </div>
  </section>
  <!---------------------- FOOTER --------------------->
  <footer class="footer">
    <div class="footer-top">
      <span class="footer-copy">©2026 LYNX Studio. All Rights Reserved</span>
      <nav class="footer-nav">
        <a href="#">Política de Privacidade</a>
      </nav>
    </div>
    <div class="footer-logo-wrap">
      <img :src="LynxLogo" alt="LYNX" class="footer-logo" />
    </div>
  </footer>
</template>


<script setup>
    import MenuBtn from './components/Navbar.vue'
    import HeroStarfield from './components/HeroStarfield.vue'
    import HeroConstellations from './components/HeroConstellations.vue'
    import HeroTerrain from './components/HeroTerrain.vue'
    import ScrollSparkle from './components/ScrollSparkle.vue'
    import DecoSparkle from './components/DecoSparkle.vue'
    import TypingTitle from './components/TypingTitle.vue'
    import SectionDecoDraw from './components/SectionDecoDraw.vue'
    import SectionDecoLine from './components/SectionDecoLine.vue'
    import GlobalGrain from './components/GlobalGrain.vue'
    import { ref, onMounted, onUnmounted, nextTick } from 'vue'
    import { initLenis, destroyLenis, scrollTo } from './composables/useLenis'
    import LynxLogo from './assets/LynxLogoLetras.png'
    import { SlidersHorizontal, Globe, ShieldCheck, Eye, Search, 
             Smartphone, MessageCircle, Zap, Shield, Settings, Palette, 
             BarChart2, FileText, ArrowUpRight, ArrowDown, ChevronDown } from 'lucide-vue-next'

    const typedTitle = ref('')

    const heroTitle = 'Conectando sua empresa ao digital'
    const speed = 80 

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
        title: 'SEO Otimizado',
        desc: 'Seu site preparado para aparecer no Google',
        icon: Search
      },
      {
        title: '100% Responsivo',
        desc: 'Perfeito em qualquer tela',
        icon: Smartphone
      },
      {
        title: 'WhatsApp Integrado',
        desc: 'Contato direto com mensagem personalizada',
        icon: MessageCircle
      },
      {
        title: 'Alta Performance',
        desc: 'Carregamento rápido e otimizado',
        icon: Zap
      },
      {
        title: 'Segurança',
        desc: 'Proteção com HTTPS e boas práticas',
        icon: Shield
      },
      {
        title: 'Manutenção',
        desc: 'Suporte e atualizações contínuas',
        icon: Settings
      }
    ]

    const outrosServicos = [
      {
        icon: MessageCircle, // ou o ícone que preferir do lucide-vue
        title: 'Automação de WhatsApp',
        desc: 'Respostas automáticas, funis de atendimento e disparo de mensagens para seus clientes.',
      },
      {
        icon: Palette,
        title: 'Rebranding',
        desc: 'Renovação completa da identidade visual da sua marca — logo, paleta, tipografia e tom de voz.',
      },
      {
        icon: BarChart2,
        title: 'Gestão de Tráfego',
        desc: 'Campanhas no Google e Meta Ads para atrair visitantes qualificados e converter mais.',
      },
      {
        icon: FileText,
        title: 'Criação de Conteúdo',
        desc: 'Textos, artes e estratégia de publicações para redes sociais e blog da sua empresa.',
      },
    ]

    const formNome = ref('')
    const formTelefone = ref('')
    const formDetalhes = ref('')
    const formEnviado = ref(false)

    const activeService = ref(0) // Começa com o primeiro aberto (01)

    const listaServicos = [
      {
        num: '01.',
        title: 'Sites Institucionais',
        tags: ['User Interface', 'User Experience', 'Web Design'],
        desc: 'Presença online profissional para apresentar sua empresa, serviços e gerar credibilidade.',
        imgClass1: 'service-img-placeholder--1',
        imgClass2: 'service-img-placeholder--2'
      },
      {
        num: '02.',
        title: 'E-Commerce',
        tags: ['Shopify', 'VTEX'],
        desc: 'Venda seus produtos online com um site rápido, seguro e fácil de usar.',
        imgClass1: 'service-img-placeholder--1', // Você pode criar classes de imagens específicas depois
        imgClass2: 'service-img-placeholder--2'
      },
      {
        num: '03.',
        title: 'Landing Pages',
        tags: ['Copywriting', 'Launch', 'Optimization'],
        desc: 'Páginas de alta conversão estruturadas para campanhas de tráfego pago e lançamentos de produtos.',
        imgClass1: 'service-img-placeholder--1',
        imgClass2: 'service-img-placeholder--2'
      }
    ]

    const SERVICE_CARD_ANIMATION_DELAYS = [0.1, 0.3, 0.5]
    const serviceCardsEntered = ref(listaServicos.map(() => false))

    const projetos = ref([
      {
        num: '01',
        category: 'Site Institucional',
        title: 'GeoAxis Consultoria e Engenharia Ambiental',
        desc: 'Site institucional para consultoria ambiental com foco em licenciamento, conformidade legal e soluções sustentáveis para empresas.',
        url: 'geoaxisambiental.com.br',
        link: 'https://geoaxisambiental.com.br/',
        gradient: 'linear-gradient(135deg, #0A0A14 0%, #1a0a4a 50%, #380FE9 100%)'
      },
      {
        num: '02',
        category: 'Site Institucional',
        title: 'Dr. Victor Mol - Radiologista',
        desc: 'Site profissional para radiologista com apresentação de serviços, agendamento de consultas e segunda opinião em exames radiológicos.',
        url: 'victormol.com.br',
        link: 'https://victormol.com.br/',
        gradient: 'linear-gradient(135deg, #0A0A14 0%, #0d2a1a 50%, #0f6e3a 100%)'
      },
      {
        num: '03',
        category: 'E-Commerce',
        title: 'Projeto em Breve',
        desc: 'Aqui vai a descrição do seu projeto: tecnologias usadas, desafios e resultados obtidos para o cliente.',
        url: 'seucliente.com.br',
        link: '#',
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

    function enviarFormulario() {
      if (!formNome.value || !formTelefone.value) return
      formEnviado.value = true
      setTimeout(() => {
        formNome.value = ''
        formTelefone.value = ''
        formDetalhes.value = ''
        formEnviado.value = false
      }, 3000)
    }

    function scrollToContato() {
      const el = document.querySelector('.contato, #contato, [data-section="contato"]')
      if (el) scrollTo(el)
    }

    function scrollToNext() {
      const el = document.querySelector('#servicos')
      if (el) scrollTo(el)
    }

    initLenis()

    onUnmounted(() => {
      destroyLenis()
    })

    function revealServiceCard(index) {
      if (serviceCardsEntered.value[index]) return

      const next = [...serviceCardsEntered.value]
      next[index] = true
      serviceCardsEntered.value = next
    }

    function serviceRowEnterStyle(index) {
      if (!serviceCardsEntered.value[index]) {
        return {
          opacity: '0',
          transform: 'translateY(40px)',
        }
      }

      return {
        animation: `service-card-enter 0.7s ease ${SERVICE_CARD_ANIMATION_DELAYS[index]}s forwards`,
      }
    }

    onMounted(async () => {
      let i = 0
      const typeTitle = setInterval(() => {
        typedTitle.value += heroTitle[i]
        i++
        if (i === heroTitle.length) clearInterval(typeTitle)
      }, speed)

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

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        serviceCardsEntered.value = listaServicos.map(() => true)
        return
      }

      const serviceCardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return

          const index = Number(entry.target.dataset.serviceCard)
          if (!Number.isNaN(index)) revealServiceCard(index)

          serviceCardObserver.unobserve(entry.target)
        })
      }, {
        threshold: 0.12,
        rootMargin: '0px 0px -8% 0px',
      })

      document
        .querySelectorAll('#servicos .services-list .service-row')
        .forEach(item => serviceCardObserver.observe(item))
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
  overflow: hidden;
}

.hero-sky {
  position: absolute;
  inset: 0;
  z-index: 1;
  overflow: hidden;
  pointer-events: none;
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
  background: linear-gradient(to bottom, #0A0A14 0%, #14102E 100%);
  --hero-title: clamp(2.75rem, 4.8vw, 5rem);
  --hero-title-shadow:
    0 0 56px rgba(8, 8, 18, 0.48),
    0 0 112px rgba(8, 8, 18, 0.28),
    0 2px 24px rgba(8, 8, 18, 0.38);
  --hero-desc: clamp(1rem, 1.15vw, 1.2rem);
  --hero-copy-left: clamp(48px, 12vw, 180px);
  --hero-copy-width: min(50vw, 600px);
  --hero-gap-title-desc: clamp(1.25rem, 2vh, 1.75rem);
  --hero-gap-desc-btn: clamp(2.5rem, 5vh, 4rem);
  --hero-btn-font: clamp(0.9rem, 1vw, 0.9375rem);
  --hero-btn-secondary-font: clamp(0.9rem, 0.95vw, 0.9375rem);
  --hero-btn-pad-y: clamp(14px, 1.6vw, 18px);
  --hero-btn-pad-x: clamp(28px, 3.4vw, 44px);
  --hero-btn-secondary-pad-x: clamp(24px, 3vw, 38px);
  --hero-btn-min-h: clamp(48px, 5vw, 56px);
  --hero-btn-secondary-min-h: clamp(46px, 4.8vw, 54px);
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
  max-width: 1600px;
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
  transform: translateY(-50%);
  text-align: left;
  pointer-events: none;
}

.banner-copy > * {
  pointer-events: auto;
}

.banner-title {
  display: block;
  width: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-align: left;
  white-space: normal;
  font-size: var(--hero-title);
  font-weight: 800;
  letter-spacing: -0.025em;
  color: #E8E6FF;
  line-height: 1.2;
  text-shadow: var(--hero-title-shadow);
}

.banner-description {
  width: 100%;
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
  overflow-x: clip;
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
  font-weight: 800;
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
  margin-bottom: 48px;
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


.services-panel {
  margin-top: 80px;
  margin-bottom: 64px;
  background: #E8E6FF;
  border-radius: 24px;
  padding: 40px 44px 32px;
  position: relative;
  overflow: hidden;
  font-family: inherit;
}

.services-panel-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
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
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid rgba(10,10,20,0.1);
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

.services-list {
  border-top: 1px solid rgba(10,10,20,0.12);
}

.service-row {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid rgba(10,10,20,0.12);
  padding: 16px 0 0;
  cursor: default;
  transition: padding-bottom 0.35s ease;
}

.service-row--last { border-bottom: none; }
.service-row--active { padding-bottom: 32px; }

.service-row-top { margin-bottom: 2px; }

.service-num {
  font-size: var(--text-sm);
  font-weight: 600;
  color: rgba(10,10,20,0.55);
  letter-spacing: 0.04em;
  transition: color 0.25s ease;
}

.service-num--dim { color: rgba(10,10,20,0.25); }

.service-row-body { padding-bottom: 20px; }

/* Active service title */
.services-panel .service-title {
  font-family: 'Recoleta', serif;
  font-weight: 700;
  color: #380FE9;
  font-size: clamp(2.4rem, 5.5vw, 4.5rem);
  letter-spacing: -0.03em;
  line-height: 1.0;
  margin: 0 0 12px 0;
  transition: color 0.25s ease, opacity 0.25s ease;
}

.services-panel .service-title--dim {
  color: #380FE9 !important;
  opacity: 0.18;
}

.service-row:not(.service-row--active) .service-title { opacity: 0.18; }

/* Collapsible content */
.service-content-wrapper {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.38s ease;
  overflow: hidden;
}

.service-row--active .service-content-wrapper { grid-template-rows: 1fr; }

.service-row-detail {
  min-height: 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 32px;
  padding-top: 16px;
}

.service-row-left {
  flex: 1;
  max-width: 400px;
}

.service-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 12px;
}

.service-tag {
  font-size: var(--text-sm);
  font-weight: 500;
  color: rgba(10,10,20,0.65);
  border: 1px solid rgba(10,10,20,0.22);
  border-radius: 999px;
  padding: 3px 12px;
  background: transparent;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.service-desc {
  font-size: var(--text-sm);
  color: rgba(10,10,20,0.6);
  line-height: 1.7;
  margin: 0;
  max-width: 300px;
}

.service-row-images {
  display: flex;
  gap: 10px;
  align-items: flex-end;
}

.service-img-card {
  border-radius: 10px;
  overflow: hidden;
  width: 144px;
  height: 96px;
  background: #0A0A14;
  flex-shrink: 0;
}

.service-img-placeholder { width: 100%; height: 100%; }

.service-img-placeholder--1 {
  background: linear-gradient(135deg, #0d1b3e 0%, #1a3060 40%, #2255a4 70%, #4a90d9 100%);
  position: relative;
}

.service-img-placeholder--1::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 60%),
    radial-gradient(ellipse at 30% 40%, rgba(100,180,255,0.12) 0%, transparent 60%);
}

.service-img-placeholder--2 {
  background: linear-gradient(135deg, #050510 0%, #0d0d22 50%, #1a1a38 100%);
  position: relative;
}

.service-img-placeholder--2::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 60% 30%, rgba(56,15,233,0.22) 0%, transparent 60%),
    linear-gradient(45deg, rgba(0,0,0,0.4) 0%, transparent 100%);
}

/* Panel CTA button */
.services-cta-btn {
  display: flex;
  align-items: center;
  gap: 10px;
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
.vantagem-bar {
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
.vantagem-bar::before {
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
.outro-card:hover {
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
.outro-card:hover::before {
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

.extra-card:hover {
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
}

.outro-card:hover {
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
  font-family: 'Recoleta', serif;
  font-size: clamp(2.2rem, 5vw, 3.4rem);
  font-weight: 800;
  color: #E8E6FF;
  line-height: 1.1;
}

.portfolio-stage {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 40px;
  align-items: center;
}

.portfolio-browser {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(56, 15, 233, 0.25);
  background: #1a1a2e;
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
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #0e0e1c;
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
  font-family: 'Recoleta', serif;
  font-size: clamp(1.2rem, 3vw, 2rem);
  font-weight: 700;
  color: rgba(232, 230, 255, 0.15);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  user-select: none;
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
  font-family: 'Recoleta', serif;
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  font-weight: 800;
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

.portfolio-cta:hover {
  background: rgba(240, 255, 31, 0.08);
  transform: translateY(-2px);
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
  font-weight: 800;
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
  overflow: hidden;
  background: #111128;
  border: 1px solid rgba(56,15,233,0.15);
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}

.processo-card-lg   { grid-column: span 3; }
.processo-card-sm   { grid-column: span 2; }
.processo-card-wide { grid-column: span 2; }
.processo-card-cta  { grid-column: span 3; }

.processo-card:hover {
  transform: translateY(-5px);
  border-color: rgba(56,15,233,0.36);
  box-shadow: 0 12px 40px rgba(56,15,233,0.1);
}
.processo-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top right, rgba(56,15,233,0.09), transparent 60%);
  opacity: 0;
  transition: opacity 0.35s ease;
}
.processo-card:hover::before { opacity: 1; }

.processo-numero {
  position: absolute;
  top: 12px;
  right: 16px;
  font-size: 4.5rem;
  font-weight: 800;
  color: rgba(56,15,233,0.1);
  line-height: 1;
  pointer-events: none;
  user-select: none;
}

.processo-card h3 {
  color: #E8E6FF;
  margin-bottom: 12px;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  position: relative;
}

.processo-card p {
  color: #9090B0;
  font-size: var(--text-sm);
  line-height: 1.72;
  position: relative;
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
  font-family: 'Recoleta', serif;
  font-size: clamp(2.2rem, 5vw, 3.6rem);
  font-weight: 800;
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
  background: rgba(255, 255, 255, 0.03);
  border: 1.5px solid rgba(56, 15, 233, 0.22);
  border-radius: 16px;
  padding: 32px;
  color: #E8E6FF;
  transition: border-color 0.2s ease;
}

.pricing-card--featured {
  border-color: #F0FF1F;
  background: rgba(240, 255, 31, 0.03);
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

.pricing-value {
  font-family: 'Recoleta', serif;
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 800;
  color: #E8E6FF;
  line-height: 1;
}

.pricing-old {
  font-size: var(--text-sm);
  color: rgba(232, 230, 255, 0.38);
  text-decoration: line-through;
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
  font-weight: 800;
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
}

.contato-info-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.contato-info-label {
  font-size: var(--text-sm);
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #F0FF1F;
}

.contato-info-value {
  font-size: 0.95rem;
  color: rgba(255,255,255,0.8);
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
  color: rgba(255,255,255,0.75);
}

.contato-input {
  width: 100%;
  padding: 12px 16px;
  border-radius: 10px;
  border: 1.5px solid rgba(255,255,255,0.22);
  background: rgba(255,255,255,0.05);
  color: #fff;
  font-size: 0.95rem;
  font-family: inherit;
  outline: none;
  transition: border-color 0.22s ease, background 0.22s ease, box-shadow 0.22s ease;
  box-sizing: border-box;
}

.contato-input::placeholder { color: rgba(255,255,255,0.28); }

.contato-input:focus {
  border-color: #F0FF1F;
  background: rgba(240,255,31,0.05);
  box-shadow: 0 0 0 3px rgba(240,255,31,0.12);
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

.contato-submit[disabled],  
.contato-submit:has(span:empty) {    /* Aviso */
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}


/* ------------------------------------ FOOTER ------------------------------------- */

.footer {
  background: #0A0A14;
  border-top: 1px solid rgba(56, 15, 233, 0.18);
  padding: var(--section-pad-y) var(--section-pad-x) 0;
  overflow: hidden;
}

.footer-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 32px;
  max-width: var(--section-max-width);
  margin-inline: auto;
  width: 100%;
}

.footer-copy {
  font-size: var(--text-sm);
  color: rgba(232, 230, 255, 0.4);
  letter-spacing: 0.04em;
}

.footer-nav {
  display: flex;
  gap: 40px;
}

.footer-nav a {
  font-size: var(--text-sm);
  color: rgba(232, 230, 255, 0.4);
  text-decoration: none;
  letter-spacing: 0.04em;
  transition: color 0.2s ease;
}

.footer-nav a:hover {
  color: #F0FF1F;
}

.footer-logo-wrap {
  display: flex;
  align-items: flex-end;
  width: 100%;
  max-width: var(--section-max-width);
  margin-inline: auto;
  margin-top: -15px;
}

.footer-logo {
  width: 100%;
  max-height: 260px;
  object-fit: contain;
  object-position: bottom center;
  opacity: 1;
  display: block;
}




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
    align-items: center;
    gap: 40px;
    min-width: 0;
  }

  .contato-left {
    flex: none;
    width: 100%;
    text-align: center;
  }

  .contato-info { align-items: center; }

  .contato-form-wrap { width: 100%; max-width: 480px; }

  .pricing-cards { grid-template-columns: 1fr; }

  .services-panel { padding: 28px 24px 24px; }

  .service-row-detail {
    flex-direction: column;
    gap: 20px;
  }

  .service-row-left { max-width: 100%; }

  .service-row-images {
    width: 100%;
    flex-wrap: wrap;
  }

  .service-img-card {
    flex: 1 1 calc(50% - 5px);
    width: auto;
    min-width: 0;
  }

  .services-panel-footer {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }

  .services-footer-left {
    width: 100%;
  }

  .services-cta-btn {
    width: 100%;
    justify-content: center;
  }
}

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

  .banner {
    --hero-title: clamp(2.25rem, 7vw, 3.25rem);
    --hero-desc: clamp(0.9rem, 2.8vw, 1.0625rem);
    --hero-copy-left: clamp(24px, 6vw, 40px);
    --hero-copy-width: min(80vw, 520px);
    --hero-gap-title-desc: clamp(1rem, 2.5vh, 1.5rem);
    --hero-gap-desc-btn: clamp(2rem, 4.5vh, 3rem);
    --hero-btn-font: clamp(0.9rem, 2.2vw, 0.9375rem);
    --hero-btn-secondary-font: clamp(0.9rem, 2.1vw, 0.9375rem);
    --hero-btn-pad-y: clamp(14px, 3vw, 18px);
    --hero-btn-pad-x: clamp(26px, 5.5vw, 36px);
    --hero-btn-secondary-pad-x: clamp(24px, 5vw, 32px);
    --hero-btn-min-h: clamp(46px, 11vw, 52px);
    --hero-btn-secondary-min-h: clamp(44px, 10.5vw, 50px);
  }

  .banner-copy {
    top: clamp(96px, 14vh, 128px);
    transform: none;
    max-width: calc(100% - var(--hero-copy-left) - clamp(16px, 4vw, 24px));
  }

  .extras-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }

  .banner-inner {
    padding-left: clamp(20px, 4vw, 32px);
    padding-right: clamp(20px, 4vw, 32px);
  }

  .footer { padding-top: 24px; }
  .footer-logo { max-height: 180px; }
}

/* Mobile */
@media (max-width: 480px) {
  .outros-cards { grid-template-columns: 1fr; }
  .extras-grid { grid-template-columns: minmax(0, 1fr); }

  .banner-inner {
    padding: calc(72px + env(safe-area-inset-top, 0px)) calc(20px + env(safe-area-inset-right, 0px)) calc(24px + env(safe-area-inset-bottom, 0px)) calc(20px + env(safe-area-inset-left, 0px));
  }

  .banner {
    --hero-title: clamp(2rem, 8.5vw, 2.75rem);
    --hero-desc: clamp(0.9rem, 3.5vw, 1rem);
    --hero-copy-left: clamp(20px, 5vw, 32px);
    --hero-copy-width: min(85vw, 340px);
    --hero-gap-title-desc: 1rem;
    --hero-gap-desc-btn: 2rem;
    --hero-btn-font: 0.9rem;
    --hero-btn-secondary-font: 0.9rem;
    --hero-btn-pad-y: 14px;
    --hero-btn-pad-x: 28px;
    --hero-btn-secondary-pad-x: 26px;
    --hero-btn-min-h: 48px;
    --hero-btn-secondary-min-h: 46px;
  }

  .banner-copy {
    top: clamp(88px, 13vh, 112px);
    transform: none;
  }

  .banner-footer-buttons {
    flex-direction: column;
    align-items: flex-start;
    gap: clamp(12px, 2.5vh, 16px);
  }

  .banner-footer-side {
    width: auto;
    justify-content: flex-start;
  }

  .banner-footer-link,
  .banner-footer-cta {
    width: auto;
    min-width: clamp(160px, 48vw, 220px);
    justify-content: center;
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
    justify-content: flex-start;
  }
  .processo-header h2 { font-size: 2.2rem; }

  .services-panel { padding: 24px 16px 20px; }

  .footer { padding-top: 24px; }
  .footer-top { flex-direction: column; align-items: flex-start; gap: 12px; }
  .footer-logo { max-height: 120px; }
}

</style>