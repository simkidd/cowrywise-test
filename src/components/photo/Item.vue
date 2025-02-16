<template>
  <div class="photo-item" :style="{ gridRowEnd: `span ${rowSpan}` }" @click="$emit('click')">
    <div class="photo-image-wrapper">
      <img
        :src="photo.urls.small"
        :alt="photo.alt_description"
        class="photo-image"
        @load="calculateRowSpan"
      />
    </div>
    <div class="image-overlay">
      <div class="text-content">
        <p class="author">{{ photo.user.name }}</p>
        <p class="location">{{ location }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { UnsplashPhoto } from '@/interfaces/unsplash.interface'
import type { PropType } from 'vue'

export default {
  name: 'PhotoItem',
  props: {
    photo: {
      type: Object as PropType<UnsplashPhoto>,
      required: true,
    },
  },
  data() {
    return {
      rowSpan: 0,
      baseRowHeight: 10, // Should match grid-auto-rows
      rowGap: 32, // Should match CSS grid gap
    }
  },
  computed: {
    location() {
      return this.photo.user.location || 'Unknown Location'
    },
  },
  methods: {
    calculateRowSpan(event: Event) {
      const img = event.target as HTMLImageElement
      const containerWidth = img.parentElement?.clientWidth || 250
      const aspectRatio = img.naturalHeight / img.naturalWidth
      const calculatedHeight = containerWidth * aspectRatio
      this.rowSpan = Math.ceil(
        (calculatedHeight + this.rowGap) / (this.baseRowHeight + this.rowGap),
      )
    },
  },
}
</script>

<style scoped lang="scss">
.photo-item {
  position: relative;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;

  .photo-image-wrapper {
    width: 100%;
    height: 100%;
    display: block;

    .photo-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .image-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    background: linear-gradient(to top, rgb(0, 0, 0), transparent);
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 50%;

    .text-content {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .author {
      font-weight: 600;
      margin: 0;
    }

    .location {
      font-size: 0.85rem;
      opacity: 0.8;
      margin: 0;
    }
  }
}
</style>
