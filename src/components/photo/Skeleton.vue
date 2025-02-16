<template>
  <div class="placeholder" :style="{ gridRowEnd: `span ${randomSpan}` }">
    <div class="shimmer"></div>
    <div class="text-overlay">
      <div class="text-placeholder author-placeholder"></div>
      <div class="text-placeholder location-placeholder"></div>
    </div>
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

  .text-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    pointer-events: none;
  }

  .text-placeholder {
    background: rgba(200, 198, 198, 0.2);
    border-radius: 4px;
    height: 16px;
    position: relative;
    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.1) 50%,
        rgba(255, 255, 255, 0) 100%
      );
      animation: shimmer 1.5s infinite;
    }
  }

  .author-placeholder {
    width: 60%;
    height: 20px;
  }

  .location-placeholder {
    width: 40%;
    height: 14px;
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
