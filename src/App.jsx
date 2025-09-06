import React from 'react'
import { Button } from './components/ui/button'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './layout/app-layout'
import LandingPage from './pages/LandingPage'
import Onboarding from './pages/Onboarding'
import JobPage from './pages/JobPage'
import JobListing from './pages/JobListing'
import PostJob from './pages/PostJob'
import SaveJobs from './pages/SaveJobs'
import MyJobs from './pages/MyJobs'
import './App.css'
import { ThemeProvider } from './components/theme-provider'
import ProtectedRoute from './components/protected-route'
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element:<LandingPage />,
      },
      {
        path: "/onboarding",
        element: (
          <ProtectedRoute>
            <Onboarding />
          </ProtectedRoute>
        ),
      },
      {
        path: "/jobs",
        element: (
          <ProtectedRoute>
            <JobListing />
          </ProtectedRoute>
        ),
      },
      {
        path: "/job/:id",
        element: (
          <ProtectedRoute>
            <JobPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/post-job",
        element: (
          <ProtectedRoute>
            <PostJob />
          </ProtectedRoute>
        ),
      },
      {
        path: "/saved-jobs",
        element: (
          <ProtectedRoute>
            <SaveJobs />
          </ProtectedRoute>
        ),
      },
      {
        path: "/my-jobs",
        element: (
          <ProtectedRoute>
            <MyJobs />
          </ProtectedRoute>
        ),
      },
    ],
  }
])
export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      {/* App Routes */}
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}
