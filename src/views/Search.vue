<template>
  <div class="search-page">
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

          <template v-else-if="searchResults.length > 0">
            <PhotoItem
              v-for="photo in searchResults"
              :key="photo.id"
              :photo="photo"
              @click="openModal(photo)"
            />
          </template>

          <div v-else class="no-results">
            <div class="no-results-content">
              <span class="no-results-icon">📷</span>
              <h2 class="no-results-title">No photos found for "{{ query }}"</h2>
              <p class="no-results-message">
                Try searching for something else or check your spelling
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ImageModal v-if="selectedPhoto" :photo="selectedPhoto" @close="selectedPhoto = null" />
  </div>
</template>

<script lang="ts">
import PhotoItem from '../components/photo/Item.vue'
import ImageModal from '../components/photo/Modal.vue'
import PhotoSkeleton from '../components/photo/Skeleton.vue'
import type { UnsplashPhoto } from '../interfaces/unsplash.interface'
import { unsplashService } from '../services/unsplash.service'

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
.search-page {
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

.search-results-text {
  margin: 0 auto;
  font-size: var(--text-size-xl);
  font-weight: bold;
  width: 100%;
  color: var(--color-text-primary);

  @media (max-width: var(--breakpoint-md)) {
    font-size: var(--text-size-lg);
  }

  span {
    color: var(--color-text-secondary);
  }
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
