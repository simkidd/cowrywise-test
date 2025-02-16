<template>
  <div class="modal-backdrop" @click.self="close">
    <div class="modal-content">
      <div class="image-wrapper">
        <img :src="photo.urls.regular" :alt="photo.alt_description" />
      </div>
      <div class="modal-info">
        <p class="author">{{ photo.user.name }}</p>
        <p class="location">{{ location }}</p>
      </div>
    </div>
    <button class="close-button" @click="close">×</button>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import type { UnsplashPhoto } from '../../interfaces/unsplash.interface.ts'

export default {
  name: 'ImageModal',
  props: {
    photo: { type: Object as PropType<UnsplashPhoto>, required: true },
  },
  computed: {
    location() {
      return this.photo.user.location || 'Unknown Location'
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
  background: rgba(139, 138, 138, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn 0.3s ease-out;

  .modal-content {
    position: relative;
    max-width: 90%;
    max-height: 90%;
    border-radius: 10px;
    overflow: hidden;

    .image-wrapper {
      img {
        max-height: 80vh;
        max-width: 100%;
      }
    }

    .modal-info {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding-block: 24px;
      padding-inline: 40px;
      background: #fff;

      .author {
        font-size: 1.2rem;
        margin-bottom: 8px;
        font-weight: bold;
        color: #1e1d1d;
      }

      .location {
        font-size: 14px;
        color: gray;
      }
    }
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
