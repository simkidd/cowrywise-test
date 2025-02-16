<template>
  <div class="app">
    <div class="top-header">
      <div class="top-header-inner container">
        <SearchInput
          v-model="searchQuery"
          @search="fetchPhotos"
          placeholder="Search for photo"
          class="main-search"
        />
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
              v-for="photo in photos"
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
import ImageModal from './components/photo/Modal.vue'
import PhotoItem from './components/photo/Item.vue'
import PhotoSkeleton from './components/photo/Skeleton.vue'
import { unsplashService } from './services/unsplash.service'
import SearchInput from '@/components/search/Input.vue'
import type { UnsplashPhoto } from './interfaces/unsplash.interface'

export default {
  components: { PhotoItem, PhotoSkeleton, ImageModal, SearchInput },
  data() {
    return {
      photos: [] as UnsplashPhoto[],
      searchQuery: 'african',
      loading: true,
      selectedPhoto: null as UnsplashPhoto | null,
    }
  },
  watch: {
    searchQuery() {
      this.fetchPhotos()
    },
  },
  mounted() {
    this.fetchPhotos()
  },
  methods: {
    async fetchPhotos() {
      this.loading = true
      try {
        const response = await unsplashService.searchPhotos(this.searchQuery)
        this.photos = response
      } catch (error) {
        console.error('API Error:', error)
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

.main-search {
  margin: 0 auto;
}

.container {
  position: relative;

  &-inner {
    position: relative;
    max-width: 900px;
    margin-inline: auto;
    margin-top: -80px;
    padding-block: 3rem;

    .photo-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      grid-auto-rows: 10px;
      width: 100%;
      gap: 32px;
      column-gap: 45px;
    }
  }
}
</style>
