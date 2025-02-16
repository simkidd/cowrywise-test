import type { UnsplashPhoto, UnsplashSearchResponse } from '../interfaces/unsplash.interface'
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
  async getPhotos(page: number = 1, perPage: number = 8): Promise<UnsplashPhoto[]> {
    try {
      const response = await baseApi.get<UnsplashPhoto[]>('/photos', {
        params: {
          page: page,
          per_page: perPage,
        },
      })
      return response.data
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  },
}
