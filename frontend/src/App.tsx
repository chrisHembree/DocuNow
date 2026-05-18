import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute'

import LoginPage from './pages/LoginPage'
import DocumentsPage from './pages/DocumentPage'

function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/documents"
        element={
          <ProtectedRoute>
            <DocumentsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="*"
        element={
          <Navigate to="/documents" />
        }
      />
    </Routes>
  )
}

export default App








