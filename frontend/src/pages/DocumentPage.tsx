import { useEffect, useState } from 'react'

import {
  getDocuments,
  deleteDocument,
} from '../services/documentService'

import type { Document } from '../types/Document'

function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const data = await getDocuments()
        setDocuments(data)
      } catch (error) {
        console.error('Error fetching documents:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDocuments()
  }, [])

  const handleDelete = async (id: number) => {
    try {
      await deleteDocument(id)

      setDocuments(
        documents.filter(
          (document) => document.id !== id
        )
      )
    } catch (error) {
      console.error('Error deleting document:', error)
    }
  }

  if (loading) {
    return <p>Loading documents...</p>
  }

  return (
    <div>
      <h1>DocuNow</h1>

      <h2>Documents</h2>

      {documents.map((document) => (
        <div key={document.id}>
          <h3>{document.title}</h3>

          <p>{document.description}</p>

          <a
            href={document.file}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open Document
          </a>

          <br />

          <button
            onClick={() => handleDelete(document.id)}
          >
            Delete
          </button>

          <hr />
        </div>
      ))}
    </div>
  )
}

export default DocumentsPage