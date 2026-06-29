<template>
  <div class="hero-terrain" aria-hidden="true">
    <svg
      class="hero-terrain__layer hero-terrain__layer--back"
      viewBox="0 0 1440 450"
      preserveAspectRatio="xMidYMax slice"
    >
      <defs>
        <filter
          id="terrain-glow-back"
          x="-8%"
          y="-30%"
          width="116%"
          height="160%"
          color-interpolation-filters="sRGB"
        >
          <feDropShadow dx="0" dy="-5" stdDeviation="7" flood-color="#380FE9" flood-opacity="0.2" />
          <feDropShadow dx="0" dy="-2" stdDeviation="3" flood-color="#380FE9" flood-opacity="0.15" />
        </filter>
      </defs>
      <path
        fill="#15103A"
        filter="url(#terrain-glow-back)"
        d="M0 450V359
           C240 258 420 278 720 346
           C1020 382 1260 362 1440 351
           V450Z"
      />
    </svg>

    <svg
      class="hero-terrain__layer hero-terrain__layer--mid"
      viewBox="0 0 1440 300"
      preserveAspectRatio="xMidYMax slice"
    >
      <defs>
        <filter
          id="terrain-glow-mid"
          x="-8%"
          y="-30%"
          width="116%"
          height="160%"
          color-interpolation-filters="sRGB"
        >
          <feDropShadow dx="0" dy="-4" stdDeviation="6" flood-color="#380FE9" flood-opacity="0.18" />
          <feDropShadow dx="0" dy="-2" stdDeviation="2.5" flood-color="#380FE9" flood-opacity="0.14" />
        </filter>
      </defs>
      <path
        fill="#0F0B28"
        filter="url(#terrain-glow-mid)"
        d="M0 300V270
           C320 265 580 279 860 221
           C1100 166 1280 182 1440 174
           V300Z"
      />
    </svg>

    <svg
      class="hero-terrain__layer hero-terrain__layer--front"
      viewBox="0 0 1440 180"
      preserveAspectRatio="xMidYMax slice"
    >
      <defs>
        <filter
          id="terrain-glow-front"
          x="-8%"
          y="-35%"
          width="116%"
          height="165%"
          color-interpolation-filters="sRGB"
        >
          <feDropShadow dx="0" dy="-4" stdDeviation="5" flood-color="#380FE9" flood-opacity="0.17" />
          <feDropShadow dx="0" dy="-1" stdDeviation="2" flood-color="#380FE9" flood-opacity="0.12" />
        </filter>
      </defs>
      <path
        fill="#0A0A14"
        filter="url(#terrain-glow-front)"
        d="M0 180V162
           C280 128 520 168 800 175
           C1080 180 1300 172 1440 166
           V180Z"
      />
    </svg>
  </div>
</template>

<style scoped>
.hero-terrain {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 72%;
  pointer-events: none;
  z-index: 2;
  transform-origin: center bottom;
}

.hero-terrain__layer {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  display: block;
}

.hero-terrain__layer--back {
  height: 76%;
  z-index: 1;
}

.hero-terrain__layer--mid {
  height: 68%;
  z-index: 2;
}

.hero-terrain__layer--front {
  height: 46%;
  z-index: 3;
}

@media (max-width: 920px) {
  .hero-terrain__layer--back {
    max-height: clamp(100px, 28vh, 280px);
  }

  .hero-terrain__layer--mid {
    max-height: clamp(88px, 24vh, 240px);
  }

  .hero-terrain__layer--front {
    max-height: clamp(72px, 18vh, 180px);
  }
}

@media (max-width: 480px) {
  .hero-terrain__layer--back {
    max-height: clamp(84px, 22vh, 200px);
  }

  .hero-terrain__layer--mid {
    max-height: clamp(72px, 18vh, 170px);
  }

  .hero-terrain__layer--front {
    max-height: clamp(60px, 14vh, 140px);
  }
}
</style>
