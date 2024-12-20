import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor to add token to requests
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('adminToken')
    if (token) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Bearer ${token}`
    }
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// Add a response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Redirect to login page or refresh token
      if (typeof window !== 'undefined') {
        window.location.href = '/admin/auth'
      }
    }
    return Promise.reject(error)
  }
)

// Auth
export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password })
  const data = response.data as { token?: string };
  if (data.token) {
    localStorage.setItem('adminToken', data.token)
  }
  return response.data
}

export const logout = async () => {
  localStorage.removeItem('adminToken')
  const response = await api.post('/auth/logout')
  return response.data
}

export const signup = async (email: string, password: string, username?: string) => {
  const response = await api.post('/auth/signup', { email, password, username })
  return response.data
}

// Projects
export const getProjects = async (search: string = '', page: number = 1, limit: number = 8) => {
  const response = await api.get('projects', { params: { search, page, limit } })
  return response.data
}

export const createProject = async (projectData: FormData) => {
  const response = await api.post('/projects', projectData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return response.data
}

export const updateProject = async (id: string, projectData: FormData) => {
  const response = await api.put(`/projects/${id}`, projectData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return response.data
}

export const deleteProject = async (id: string) => {
  const response = await api.delete(`/projects/${id}`)
  return response.data
}

// Certifications
export const getCertifications = async (search: string = '', page: number = 1, limit: number = 8) => {
  const response = await api.get('certifications', { params: { search, page, limit } })
  return response.data
}

export const createCertification = async (certificationData: FormData) => {
  const response = await api.post('/certifications', certificationData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return response.data
}

export const updateCertification = async (id: string, certificationData: FormData) => {
  const response = await api.put(`/certifications/${id}`, certificationData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return response.data
}

export const deleteCertification = async (id: string) => {
  const response = await api.delete(`/certifications/${id}`)
  return response.data
}

// Testimonials
export const getTestimonials = async (page: number = 1, limit: number = 8) => {
  const response = await api.get('testimonials', { params: { page, limit } })
  return response.data
}

export const createTestimonial = async (testimonialData: FormData) => {
  const response = await api.post('/testimonials', testimonialData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return response.data
}

export const updateTestimonial = async (id: string, testimonialData: FormData) => {
  const response = await api.put(`/testimonials/${id}`, testimonialData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return response.data
}

export const deleteTestimonial = async (id: string) => {
  const response = await api.delete(`/testimonials/${id}`)
  return response.data
}

// Resume
export const getResume = async () => {
  const response = await api.get('resume')
  return response.data
}

export const updateResume = async (id: string, resumeData: { url: string }) => {
  const response = await api.put(`/resume/${id}`, resumeData)
  return response.data
}

export default api

