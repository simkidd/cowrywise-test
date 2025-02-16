<template>
  <div class="app">
    <div class="top-header">
      <div class="top-header-inner container">
        <div class="search-results-text">
          Search Results for
          <span> "{{ query }}" </span>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="container-inner">
        <div class="photo-grid">
          <template v-if="loading">
            <PhotoSkeleton v-for="n in 8" :key="n" />
          </template>

          <template v-else>
            <PhotoItem
              v-for="photo in searchResults"
              :key="photo.id"
              :photo="photo"
              @click="openModal(photo)"
            />
          </template>
        </div>
      </div>
    </div>

    <ImageModal v-if="selectedPhoto" :photo="selectedPhoto" @close="selectedPhoto = null" />
  </div>
</template>

<script lang="ts">
import PhotoItem from '@/components/photo/Item.vue'
import ImageModal from '@/components/photo/Modal.vue'
import PhotoSkeleton from '@/components/photo/Skeleton.vue'
import type { UnsplashPhoto } from '@/interfaces/unsplash.interface'
import { unsplashService } from '@/services/unsplash.service'

export default {
  name: 'SearchView',
  components: { PhotoItem, PhotoSkeleton, ImageModal },
  props: {
    query: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      searchResults: [] as UnsplashPhoto[],
      loading: true,
      selectedPhoto: null as UnsplashPhoto | null,
    }
  },
  watch: {
    query: {
      immediate: true,
      handler(newQuery) {
        if (newQuery) {
          this.fetchPhotos()
        }
      },
    },
  },
  mounted() {
    this.fetchPhotos()
  },
  methods: {
    async fetchPhotos() {
      this.loading = true
      try {
        const res = await unsplashService.searchPhotos(this.query)
        this.searchResults = res
      } catch (error) {
        console.error('API Error:', error)
        this.searchResults = []
      } finally {
        this.loading = false
      }
    },

    openModal(photo: UnsplashPhoto) {
      this.selectedPhoto = photo
    },
  },
}
</script>

<style scoped lang="scss">
.app {
  width: 100%;
  min-height: 100dvh;
  position: relative;

  .top-header {
    background: #dde3ea;
    height: 250px;

    &-inner {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
    }
  }
}

.search-results-text {
  margin: 0 auto;
  font-size: 42px;
  font-weight: bold;
  width: 100%;
  color: #273754;

  @media (max-width: 768px) {
    font-size: 32px;
  }

  span {
    color: #747c92;
  }
}

.container {
  position: relative;

  &-inner {
    position: relative;
    max-width: 900px;
    margin-inline: auto;
    margin-top: -50px;
    padding-bottom: 3rem;

    .photo-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      grid-auto-rows: 10px;
      width: 100%;
      row-gap: 32px;
      column-gap: 45px;
    }
  }
}
</style>
