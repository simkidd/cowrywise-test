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
import ImageModal from '@/components/photo/Modal.vue'
import PhotoItem from '@/components/photo/Item.vue'
import PhotoSkeleton from '@/components/photo/Skeleton.vue'
import { unsplashService } from '@/services/unsplash.service'
import type { UnsplashPhoto } from '@/interfaces/unsplash.interface'
import SearchInput from '@/components/search/Input.vue'

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
