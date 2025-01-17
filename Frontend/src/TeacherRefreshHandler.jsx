import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function TeacherRefreshHandler({ setTeacherIsAuthenticated }) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userRole = localStorage.getItem('userRole');

        if (token && userRole === 'teacher') {
            setTeacherIsAuthenticated(true);
            if (location.pathname === '/' || 
                location.pathname === '/mainLogin' || 
                location.pathname === '/adminLogin' ||
                location.pathname === '/mainSignup' || 
                location.pathname === '/admin-verify-email/:token' ||
                location.pathname === '/student-verify-email/:token' || 
                location.pathname === '/teacher-verify-email/:token' || 
                location.pathname === '/admin-forgot-password' ||
                location.pathname === '/student-forgot-password' ||
                location.pathname === '/teacher-forgot-password' ||
                location.pathname === '/admin-reset-password/:token' ||
                location.pathname === '/student-reset-password/:token' ||
                location.pathname === '/teacher-reset-password/:token'
            )                 {
                navigate('/teacherHome', { replace: false });
            }
        }
    }, [location, navigate, setTeacherIsAuthenticated])
    return(
        null
    )
}

export default TeacherRefreshHandler;
