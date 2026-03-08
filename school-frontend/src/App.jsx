import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './components/PrivateRoute'

import Login     from './pages/Login'
import Dashboard from './pages/Dashboard'
import Students  from './pages/Students'
import Teachers  from './pages/Teachers'
import Classes   from './pages/Classes'
import Subjects  from './pages/Subjects'
import Grades    from './pages/Grades'
import Absences  from './pages/Absences'
import Schedules from './pages/Schedules'
import Messages  from './pages/Messages'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/students" element={<PrivateRoute roles={['admin','teacher']}><Students /></PrivateRoute>} />
          <Route path="/teachers" element={<PrivateRoute roles={['admin']}><Teachers /></PrivateRoute>} />
          <Route path="/classes"  element={<PrivateRoute roles={['admin','teacher']}><Classes /></PrivateRoute>} />
          <Route path="/subjects" element={<PrivateRoute roles={['admin']}><Subjects /></PrivateRoute>} />
          <Route path="/grades"   element={<PrivateRoute><Grades /></PrivateRoute>} />
          <Route path="/absences" element={<PrivateRoute><Absences /></PrivateRoute>} />
          <Route path="/schedules"element={<PrivateRoute><Schedules /></PrivateRoute>} />
          <Route path="/messages" element={<PrivateRoute><Messages /></PrivateRoute>} />

          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}