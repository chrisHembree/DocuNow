import { useEffect, useState } from 'react'
import {
  Box,
  Card,
  CardActionArea,
  Chip,
  CircularProgress,
  Grid as Grid,
  IconButton,
  Skeleton,
  Tooltip,
  Typography,Button,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined'
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined'
import { getDocuments, deleteDocument } from '../services/documentService'
import type { Document } from '../types/Document'
import UploadDocumentDialog from '../components/UploadDocumentDialog'
import AddIcon from '@mui/icons-material/Add'
import LogoutIcon from '@mui/icons-material/Logout'

// Generate a consistent accent color per category name
const PALETTE = [
  '#6366f1', '#0ea5e9', '#10b981', '#f59e0b',
  '#ec4899', '#8b5cf6', '#14b8a6', '#f97316',
]

function getCategoryColor(category: string): string {
  let hash = 0
  for (let i = 0; i < category.length; i++) hash = category.charCodeAt(i) + ((hash << 5) - hash)
  return PALETTE[Math.abs(hash) % PALETTE.length]
}

// ─── Document Card ────────────────────────────────────────────────────────────

interface DocumentCardProps {
  document: Document
  onDelete: (id: number) => void
}

function DocumentCard({ document, onDelete }: DocumentCardProps) {
  const [deleting, setDeleting] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const accent = getCategoryColor(document.category_name || 'default')

  const handleDeleteClick = async (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    if (!confirmDelete) {
      setConfirmDelete(true)
      setTimeout(() => setConfirmDelete(false), 2500)
      return
    }
    setDeleting(true)
    await onDelete(document.id)
  }

  return (
    <Card
      elevation={0}
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 3,
        overflow: 'hidden',
        bgcolor: 'background.paper',
        transition: 'border-color 0.2s, transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          borderColor: accent,
          transform: 'translateY(-3px)',
          boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
        },
        // Accent bar revealed on hover
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          backgroundColor: accent,
          opacity: 0,
          transition: 'opacity 0.2s',
          zIndex: 1,
        },
        '&:hover::before': {
          opacity: 1,
        },
      }}
    >
      {/* Delete button — sits above the CardActionArea */}
      <Tooltip
        title={confirmDelete ? 'Click again to confirm' : 'Delete document'}
        placement="top"
      >
        <IconButton
          size="small"
          onClick={handleDeleteClick}
          disabled={deleting}
          aria-label="Delete document"
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            zIndex: 2,
            color: confirmDelete ? 'error.main' : 'text.disabled',
            bgcolor: confirmDelete ? 'error.light' : 'transparent',
            border: '1px solid',
            borderColor: confirmDelete ? 'error.main' : 'transparent',
            borderRadius: 1.5,
            width: confirmDelete ? 'auto' : 30,
            height: 30,
            px: confirmDelete ? 1 : 0,
            fontSize: 11,
            fontWeight: 600,
            transition: 'all 0.15s ease',
            '&:hover': {
              bgcolor: 'error.light',
              borderColor: 'error.main',
              color: 'error.main',
            },
          }}
        >
          {deleting ? (
            <CircularProgress size={13} color="error" />
          ) : confirmDelete ? (
            'Sure?'
          ) : (
            <DeleteIcon sx={{ fontSize: 16 }} />
          )}
        </IconButton>
      </Tooltip>

      {/* Entire card is clickable and opens the document */}
      <CardActionArea
        component="a"
        href={document.file}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          flex: 1,
          p: 2.5,
          gap: 1.5,
          height: '100%',
          // Override MUI hover ripple color to use accent
          '&:hover .MuiCardActionArea-focusHighlight': {
            opacity: 0.04,
          },
        }}
      >
        {/* File icon bubble */}
        <Box
          sx={{
            width: 46,
            height: 46,
            borderRadius: 2,
            bgcolor: `${accent}18`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: accent,
            flexShrink: 0,
          }}
        >
          <InsertDriveFileOutlinedIcon fontSize="small" />
        </Box>

        {/* Title + description */}
        <Box sx={{ flex: 1, minWidth: 0, width: '100%' }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              pr: 4, // avoid overlap with delete button
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              lineHeight: 1.35,
              mb: 0.5,
            }}
          >
            {document.title}
          </Typography>

          {document.description && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                lineHeight: 1.55,
              }}
            >
              {document.description}
            </Typography>
          )}
        </Box>

        {/* Footer: category chip + open hint */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            mt: 'auto',
          }}
        >
          <Chip
            label={document.category_name}
            size="small"
            sx={{
              bgcolor: `${accent}18`,
              color: accent,
              border: `1px solid ${accent}40`,
              fontWeight: 500,
              fontSize: 11,
              height: 24,
              maxWidth: '70%',
            }}
          />
          <Typography variant="caption" color="text.disabled" sx={{ fontWeight: 500 }}>
            Open ↗
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  )
}

// ─── Skeleton Card ────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <Card
      elevation={0}
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 3,
        p: 2.5,
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
      }}
    >
      <Skeleton variant="rounded" width={46} height={46} sx={{ borderRadius: 2 }} />
      <Box sx={{ flex: 1 }}>
        <Skeleton variant="text" width="70%" height={20} sx={{ mb: 0.5 }} />
        <Skeleton variant="text" width="90%" height={16} />
        <Skeleton variant="text" width="55%" height={16} />
      </Box>
      <Skeleton variant="rounded" width={80} height={24} sx={{ borderRadius: 20 }} />
    </Card>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [uploadDialogOpen, setUploadDialogOpen] =
  useState(false)

  
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

useEffect(() => {
  const loadDocuments = async () => {
    await fetchDocuments()
  }

  loadDocuments()
}, [])

  const handleDelete = async (id: number) => {
    try {
      await deleteDocument(id)
      setDocuments((prev) => prev.filter((d) => d.id !== id))
    } catch (error) {
      console.error('Error deleting document:', error)
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pb: 10 }}>
      {/* Header */}
      <Box
        sx={{
          px: { xs: 2.5, sm: 6 },
          pt: { xs: 4, sm: 6 },
          pb: 0,
          mb: 5,
          borderBottom: '1px solid',
          borderColor: 'divider',
          background: (theme) =>
            `linear-gradient(180deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
        }}
      >
        <Typography
          variant="overline"
          sx={{
            color: 'primary.main',
            fontWeight: 700,
            letterSpacing: '0.12em',
            display: 'block',
            mb: 2,
          }}
        >
          DocuNow
        </Typography>

        <Box
  sx={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 2,
    pb: 3.5,
  }}
>
  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5 }}>
    <Typography
      variant="h4"
      sx={{
        fontWeight: 700,
        letterSpacing: '-0.02em',
      }}
    >
      Documents
    </Typography>

    {!loading && (
      <Typography
        variant="body2"
        color="text.disabled"
      >
        {documents.length}{' '}
        {documents.length === 1
          ? 'file'
          : 'files'}
      </Typography>
    )}
  </Box>

  <Box sx={{ display: 'flex', gap: 2 }}>
  <Button
    variant="contained"
    startIcon={<AddIcon />}
    onClick={() => setUploadDialogOpen(true)}
    sx={{
      borderRadius: 2,
      textTransform: 'none',
      fontWeight: 600,
    }}
  >
    Upload Document
  </Button>

  <Button
    variant="outlined"
    color="inherit"
    startIcon={<LogoutIcon />}
    onClick={() => {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }}
    sx={{
      borderRadius: 2,
      textTransform: 'none',
      fontWeight: 600,
    }}
  >
    Logout
  </Button>
</Box>
</Box>

      </Box>

      {/* Document grid */}
      <Box sx={{ px: { xs: 2.5, sm: 6 } }}>
        {loading ? (
          <Grid container spacing={2.5}>
            {Array.from({ length: 6 }).map((_, i) => (
              <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
                <SkeletonCard />
              </Grid>
            ))}
          </Grid>
        ) : documents.length === 0 ? (
          <Box
            sx={{
              textAlign: 'center',
              py: 12,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              color: 'text.disabled',
            }}
          >
            <FolderOpenOutlinedIcon sx={{ fontSize: 52, opacity: 0.3 }} />
            <Typography variant="body1">No documents yet</Typography>
          </Box>
        ) : (
          <Grid container spacing={2.5}>
            {documents.map((doc) => (
              <Grid key={doc.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <DocumentCard document={doc} onDelete={handleDelete} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
      <UploadDocumentDialog
  open={uploadDialogOpen}
  onClose={() => setUploadDialogOpen(false)}
  onUploadSuccess={fetchDocuments}
/>
    </Box>
  )
}

export default DocumentsPage



