<script setup lang="ts">
</script>

<template>
  <section class="background absolute top-0 left-0 h-full w-full">
    <div
      v-for="(value) in 100"
      :key="value"
      class="circle-container"
    >
      <div class="cicle" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.background {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
  width: 100%;
  height: 100%;

  mask-image: radial-gradient(
    white 0%,
    white 30%,
    transparent 80%,
    transparent
  );
}

.circle-container {
  $particleNum: 200;
  $particleColor: lightgray;

  position: absolute;
  transform: translateY(-10vh);
  animation-iteration-count: infinite;
  animation-timing-function: linear;

  .circle {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    mix-blend-mode: screen;
    background-image: radial-gradient(circle,rgba(191, 166, 73, 0.9) 0%, rgba(235, 232, 218, 0.1) 20%, rgba(255, 255, 255, 0) 100%);

    animation: fadein-frames 200ms infinite, scale-frames 2s infinite;

    @keyframes fade-frames {
      0% {
        opacity: 1;
      }

      50% {
        opacity: 0.7;
      }

      100% {
        opacity: 1;
      }
    }

    @keyframes scale-frames {
      0% {
        transform: scale3d(0.4, 0.4, 1);
      }

      50% {
        transform: scale3d(2.2, 2.2, 1);
      }

      100% {
        transform: scale3d(0.4, 0.4, 1);
      }
    }

      width: 2px;
      height: 2px;

      $startPositionY: random(10) + 100;
      $framesName: "move-frames-" + $i;
      $moveDuration: 28000 + random(9000) + ms;

      animation-name: #{$framesName};
      animation-duration: $moveDuration;
      animation-delay: random(37000) + ms;

      @keyframes #{$framesName} {
        from {
          transform: translate3d(random(100) + vw, $startPositionY + vh, 0);
        }

        to {
          transform: translate3d(random(100) + vw, -$startPositionY - random(30) + vh, 0);
        }
      }

      .circle {
        animation-delay: random(4000) + ms;
      }
  }

  $particleBaseSize: 8;

  @for $i from 1 through $particleNum {
    &:nth-child(#{$i}) {
      $circleSize: random($particleBaseSize);
      width: $circleSize + px;
      height: $circleSize + px;

      $startPositionY: random(10) + 100;
      $framesName: "move-frames-" + $i;
      $moveDuration: 28000 + random(9000) + ms;

      animation-name: #{$framesName};
      animation-duration: $moveDuration;
      animation-delay: random(37000) + ms;

      @keyframes #{$framesName} {
        from {
          transform: translate3d(random(100) + vw, $startPositionY + vh, 0);
        }

        to {
          transform: translate3d(random(100) + vw, -$startPositionY - random(30) + vh, 0);
        }
      }

      .circle {
        animation-delay: random(4000) + ms;
      }
    }
  }
}
</style>
