import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material'

import { useEffect, useState } from 'react'

import type { Category } from '../types/Category'

import { getCategories } from '../services/categoryService'
import { uploadDocument } from '../services/documentService'

interface UploadDocumentDialogProps {
  open: boolean
  onClose: () => void
  onUploadSuccess: () => void
}

function UploadDocumentDialog({
  open,
  onClose,
  onUploadSuccess,
}: UploadDocumentDialogProps) {
  const [categories, setCategories] = useState<Category[]>([])

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [file, setFile] = useState<File | null>(null)

  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories()
        setCategories(data)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    if (open) {
      fetchCategories()
    }
  }, [open])

  const handleSubmit = async () => {
    if (!file || !title || !categoryId) {
      return
    }

    try {
      setUploading(true)

      const formData = new FormData()

      formData.append('title', title)
      formData.append('description', description)
      formData.append('category', categoryId)
      formData.append('file', file)

      await uploadDocument(formData)

      onUploadSuccess()

      onClose()

      setTitle('')
      setDescription('')
      setCategoryId('')
      setFile(null)
    } catch (error) {
      console.error('Error uploading document:', error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        Upload Document
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />

          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={3}
          />

          <TextField
            select
            label="Category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            fullWidth
          >
            {categories.map((category) => (
              <MenuItem
                key={category.id}
                value={category.id}
              >
                {category.name}
              </MenuItem>
            ))}
          </TextField>

          <Button
            variant="outlined"
            component="label"
          >
            {file ? file.name : 'Choose File'}

            <input
              type="file"
              hidden
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setFile(e.target.files[0])
                }
              }}
            />
          </Button>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={uploading}
        >
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default UploadDocumentDialog










