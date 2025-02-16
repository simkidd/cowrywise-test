<template>
  <div class="app">
    <div class="top-header">
      <div class="top-header-inner container">
        <SearchInput
          v-model="searchQuery"
          @search="searchPhotos"
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
import { debounce } from './utils/debounce'

export default {
  components: { PhotoItem, PhotoSkeleton, ImageModal, SearchInput },
  data() {
    return {
      photos: [] as UnsplashPhoto[],
      searchQuery: 'vue js',
      loading: true,
      selectedPhoto: null as UnsplashPhoto | null,
      debouncedSearch: null as (() => void) | null,
    }
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
    async searchPhotos() {
      if (this.searchQuery.trim() === '') {
        this.photos = []
        return
      }
      await this.fetchPhotos()
    },
    handleSearch() {
      if (this.debouncedSearch) {
        this.debouncedSearch()
      }
    },
    openModal(photo: UnsplashPhoto) {
      this.selectedPhoto = photo
    },
  },
  watch: {
    searchQuery() {
      this.handleSearch()
    },
  },
}
</script>

<style scoped lang="scss">
:root {
  --grid-gap: 20px;
  --search-height: 250px;
}

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
  padding: 0 40px;
}

.container {
  position: relative;

  &-inner {
    position: relative;
    max-width: 1000px;
    margin-inline: auto;
    margin-top: -50px;

    .photo-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      grid-auto-rows: 10px;
      width: 100%;
      gap: 30px;
    }
  }
}
</style>
