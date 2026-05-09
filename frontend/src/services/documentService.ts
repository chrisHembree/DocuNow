import axios from 'axios'
import type { Document } from '../types/Document'

const API_URL = 'http://127.0.0.1:8000/api/documents/'

export const getDocuments = async (): Promise<Document[]> => {
  const response = await axios.get(API_URL)
  return response.data
}






















