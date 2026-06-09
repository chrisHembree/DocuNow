import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Card,
  TextField,
  Typography,
} from '@mui/material'


import { login } from '../services/authService'

function LoginPage() {
  const [username, setUsername] =
    useState('')


    
  const [password, setPassword] =
    useState('')

  const [error, setError] =
    useState('')

  const navigate = useNavigate()



  const handleLogin = async () => {
    try {
      const data = await login(
        username,
        password
      )

      localStorage.setItem(
        'token',
        data.token
      )

      navigate('/')
    } catch (err) {
      console.error(err)
      setError('Invalid credentials')
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
      }}
    >
      <Card
        sx={{
          p: 4,
          width: 400,
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            mb: 3,
            fontWeight: 700,
          }}
        >
          DocuNow Login
        </Typography>

        <TextField
          fullWidth
          label="Username"
          sx={{ mb: 2 }}
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <TextField
          fullWidth
          type="password"
          label="Password"
          sx={{ mb: 2 }}
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        {error && (
          <Typography
            color="error"
            sx={{ mb: 2 }}
          >
            {error}
          </Typography>
        )}

        <Button
          fullWidth
          variant="contained"
          onClick={handleLogin}
        >
          Login
        </Button>
      </Card>
    </Box>
  )
}

export default LoginPage