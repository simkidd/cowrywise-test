import type { UnsplashPhoto, UnsplashSearchResponse } from '../types/unsplash'
import baseApi from './base.service'

export const unsplashService = {
  async searchPhotos(query: string, perPage: number = 8): Promise<UnsplashPhoto[]> {
    try {
      const response = await baseApi.get<UnsplashSearchResponse>('/search/photos', {
        params: {
          query,
          per_page: perPage,
          order_by: 'latest',
        },
      })
      return response.data.results
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  },
}
