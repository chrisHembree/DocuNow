import axios from 'axios'
import type { Document } from '../types/Document'

const API_URL = 'http://127.0.0.1:8000/api/documents/'

export const getDocuments = async (): Promise<Document[]> => {
  const response = await axios.get(API_URL)
  return response.data
}

export const deleteDocument = async (id: number) => {
  await axios.delete(`${API_URL}${id}/`)
}

export const updateDocument = async (
  id: number,
  updatedData: Partial<Document>
): Promise<Document> => {
  const response = await axios.patch(
    `${API_URL}${id}/`,
    updatedData
  )

  return response.data
}





















