import { defineStore } from 'pinia'
import { productsAPI } from '../services/api'

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [],
    loading: false,
    searchQuery: ''
  }),

  actions: {
    async fetchProducts() {
      this.loading = true
      try {
        const response = await productsAPI.getAll()
        this.products = response.data
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        this.loading = false
      }
    },

    async searchProducts(query) {
      if (!query.trim()) {
        await this.fetchProducts()
        return
      }
      
      this.loading = true
      try {
        const response = await productsAPI.search(query)
        this.products = response.data
        this.searchQuery = query
      } catch (error) {
        console.error('Error searching products:', error)
      } finally {
        this.loading = false
      }
    }
  }
})