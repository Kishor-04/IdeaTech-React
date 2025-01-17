import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css';
import { useState } from 'react';
import StudentHome from './pages/StudentHome';
import TeacherHome from './pages/TeacherHome';
import AdminHome from './pages/AdminHome';
import AdminSignup from './pages/AdminSignup';
import AdminLogin from './components/AdminLogin';
import StudentRefreshHandler from './StudentRefreshHandler';
import TeacherRefreshHandler from './TeacherRefreshHandler';
import AdminRefreshHandler from './AdminRefreshHandler';
import StudentVerificationHandler from './pages/StudentVerificationHandler';
import TeacherVerificationHandler from './pages/TeacherVerificationHandler';
import AdminVerificationHandler from './pages/AdminVerificationHandler';
import AdminForgotPassword from './pages/AdminForgotPassword';
import StudentForgotPassword from './pages/StudentForgotPassword';
import TeacherForgotPassword from './pages/TeacherForgotPassword';
import AdminResetPassword from './pages/AdminResetPassword';
import StudentResetPassword from './pages/StudentResetPassword';
import TeacherResetPassword from './pages/TeacherResetPassword';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  const [isStudentAuthenticated, setStudentIsAuthenticated] = useState(false);
  const [isTeacherAuthenticated, setTeacherIsAuthenticated] = useState(false);
  const [isAdminAuthenticated, setAdminIsAuthenticated] = useState(false);
  
  const StudentPrivateRoute = ({ element }) => {
    return isStudentAuthenticated ? element : <Navigate to='/mainLogin' />
  }

  const TeacherPrivateRoute = ({ element }) => {
    return isTeacherAuthenticated ? element : <Navigate to='/mainLogin' />
  }

  const AdminPrivateRoute = ({ element }) => {
    return isAdminAuthenticated ? element : <Navigate to='/mainLogin' />
  }

  return (
    <div className="App">
      <StudentRefreshHandler setStudentIsAuthenticated={setStudentIsAuthenticated} />
      <TeacherRefreshHandler setTeacherIsAuthenticated={setTeacherIsAuthenticated} />
      <AdminRefreshHandler setAdminIsAuthenticated={setAdminIsAuthenticated} />

      <Routes>
        <Route path="/" element={<Navigate to="/mainLogin" />} />
        <Route path="/adminSignup" element={<AdminSignup />} />
        <Route path="/mainLogin" element={<Login />} />
        <Route path="/mainSignup" element={<Signup />} />
        <Route path="/studentHome" element={<StudentPrivateRoute element={<StudentHome />} />} />
        <Route path="/teacherHome" element={<TeacherPrivateRoute element={<TeacherHome />} />} />
        <Route path="/adminHome" element={<AdminPrivateRoute element={<AdminHome />} />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/student-verify-email/:token" element={<StudentVerificationHandler />} />
        <Route path="/teacher-verify-email/:token" element={<TeacherVerificationHandler />} />
        <Route path="/admin-verify-email/:token" element={<AdminVerificationHandler />} />  
        <Route path="/admin-forgot-password" element={<AdminForgotPassword />} />
        <Route path="/admin-reset-password/:token" element={<AdminResetPassword />} />
        <Route path="/student-forgot-password" element={<StudentForgotPassword />} />
        <Route path="/student-reset-password/:token" element={<StudentResetPassword />} />
        <Route path="/teacher-forgot-password" element={<TeacherForgotPassword />} />
        <Route path="/teacher-reset-password/:token" element={<TeacherResetPassword />} />   
      </Routes>
    </div>
  );
}

export default App;
