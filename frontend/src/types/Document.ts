





export interface Document {
  id: number
  title: string
  description: string
  file: string
  created_at: string
  updated_at: string
  category: number
  uploaded_by: number | null
}