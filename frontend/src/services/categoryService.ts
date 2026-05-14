import axios from 'axios'

import type { Category } from '../types/Category'

const API_URL = 'http://127.0.0.1:8000/api/categories/'

export const getCategories = async (): Promise<Category[]> => {
  const response = await axios.get(API_URL)

  return response.data
}




