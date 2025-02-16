<template>
  <div class="modal-backdrop" @click.self="close">
    <div class="modal-content">
      <img :src="photo.urls.regular" :alt="photo.alt_description" />
      <div class="modal-info">
        <p class="author">{{ photo.user.name }}</p>
        <p class="location">{{ location }}</p>
      </div>
      <button class="close-button" @click="close">×</button>
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { type UnsplashPhoto } from '../types/unsplash'

export default {
  props: {
    photo: { type: Object as PropType<UnsplashPhoto>, required: true },
  },
  computed: {
    location() {
      return this.photo.location?.title || 'Unknown Location'
    },
  },
  methods: {
    close() {
      this.$emit('close')
    },
  },
}
</script>

<style scoped lang="scss">
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn 0.3s ease-out;
}

.modal-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;

  img {
    max-height: 80vh;
    max-width: 100%;
    border-radius: 8px;
  }
}

.modal-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 24px;
  color: white;
  background: linear-gradient(transparent 0%, rgba(0, 0, 0, 0.7) 100%);
  border-radius: 0 0 8px 8px;
}

.close-button {
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  padding: 0 8px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
