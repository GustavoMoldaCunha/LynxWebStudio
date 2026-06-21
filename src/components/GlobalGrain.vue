<template>
  <div class="global-grain" aria-hidden="true">
    <svg
      class="global-grain__pattern"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <filter id="globalGrainFilter" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="3"
            stitchTiles="stitch"
            seed="7"
            result="noise"
          />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="2 0 0 0 -0.45
                    0 2 0 0 -0.45
                    0 0 2 0 -0.45
                    0 0 0 1 0"
            result="contrast"
          />
        </filter>
        <pattern
          id="globalGrainPattern"
          width="256"
          height="256"
          patternUnits="userSpaceOnUse"
        >
          <rect width="256" height="256" fill="white" filter="url(#globalGrainFilter)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#globalGrainPattern)" />
    </svg>
  </div>
</template>
