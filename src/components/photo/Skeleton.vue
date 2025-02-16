<template>
  <div class="placeholder" :style="{ gridRowEnd: `span ${randomSpan}` }">
    <div class="shimmer"></div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'PhotoSkeleton',
  data() {
    return {
      randomSpan: Math.floor(Math.random() * 5) + 10,
    }
  },
}
</script>

<style scoped lang="scss">
.placeholder {
  background: #eee;
  border-radius: 8px;
  overflow: hidden;
  position: relative;

  .shimmer {
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    animation: shimmer 1.5s infinite;
  }
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>
