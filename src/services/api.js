// src/services/api.js

// KSS Connect currently uses Supabase directly.
// This compatibility object exists so any older import of "api"
// does not crash the application.

const api = {
  async get() {
    return {
      data: []
    }
  },

  async post() {
    return {
      data: {}
    }
  },

  async put() {
    return {
      data: {}
    }
  },

  async delete() {
    return {
      data: {}
    }
  }
}

export default api
