<template>
  <div class="app">
    <div class="top-header">
      <div class="top-header-inner container">
        <SearchInput
          v-model="searchQuery"
          @search="handleSearch"
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

          <template v-else-if="photos.length > 0">
            <PhotoItem
              v-for="photo in photos"
              :key="photo.id"
              :photo="photo"
              @click="openModal(photo)"
            />
          </template>

          <div v-else class="no-results">
            <div class="no-results-content">
              <span class="no-results-icon">📷</span>
              <h2 class="no-results-title">No photos found</h2>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ImageModal v-if="selectedPhoto" :photo="selectedPhoto" @close="selectedPhoto = null" />
  </div>
</template>

<script lang="ts">
import ImageModal from '../components/photo/Modal.vue'
import PhotoItem from '../components/photo/Item.vue'
import PhotoSkeleton from '../components/photo/Skeleton.vue'
import { unsplashService } from '../services/unsplash.service'
import type { UnsplashPhoto } from '../interfaces/unsplash.interface'
import SearchInput from '../components/search/Input.vue'

export default {
  name: 'HomeView',
  components: { PhotoItem, PhotoSkeleton, ImageModal, SearchInput },
  data() {
    return {
      photos: [] as UnsplashPhoto[],
      searchQuery: '',
      loading: true,
      selectedPhoto: null as UnsplashPhoto | null,
    }
  },

  mounted() {
    this.fetchPhotos()
  },
  methods: {
    async fetchPhotos() {
      this.loading = true
      try {
        const response = await unsplashService.getPhotos()
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

    handleSearch(query: string) {
      const trimmedQuery = query.trim()
      if (trimmedQuery) {
        this.$router.push({
          name: 'Search',
          query: { query: trimmedQuery },
        })
      } else {
        this.$router.push('/')
      }
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
    background: var(--color-header-bg);
    height: var(--header-height);

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
    max-width: var(--container-max-width);
    margin-inline: auto;
    margin-top: var(--spacing-container-top);
    padding-bottom: var(--spacing-container-bottom);

    .photo-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(var(--grid-min-column), 1fr));
      grid-auto-rows: var(--grid-auto-rows-base);
      width: 100%;
      row-gap: var(--grid-row-gap);
      column-gap: var(--grid-column-gap);

      .no-results {
        grid-column: 1 / -1;
        text-align: center;
        padding: var(--no-results-padding);
        min-height: 50vh;
        display: flex;
        align-items: center;
        justify-content: center;

        &-content {
          max-width: 500px;
          margin: 0 auto;
        }

        &-icon {
          font-size: var(--no-results-icon-size);
          display: block;
          margin-bottom: 1.5rem;
          opacity: 0.8;
        }

        &-title {
          font-size: var(--text-size-md);
          color: var(--color-text-primary);
          margin-bottom: 1rem;
        }

        &-message {
          color: var(--color-text-secondary);
          font-size: var(--text-size-sm);
          line-height: 1.5;
        }
      }
    }
  }
}
</style>
