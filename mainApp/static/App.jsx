import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import LandingPage from './components/LandingPage';
import ShowCourses from './components/ShowCourses';
import CoursePage from './components/CoursePage';
import AppNavBar from './components/AppNavBar';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import CreateUpload from './components/CreateUpload';
import UpdateUpload from './components/UpdateUpload';
import ShowUpload from './components/ShowUpload';
import Search from './components/Search';
import Activate from './components/Activate';
import DoActivate from './components/DoActivate';
import { Toaster } from 'react-hot-toast';
import ResetPassword from './components/ResetPassword';
import ResetPasswordConfirm from './components/ResetPasswordConfirm.jsx';
import { useDispatch } from 'react-redux';
import { setCsrfToken } from './redux/csrfSlice'; 

function App() {
  const dispatch = useDispatch()
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  useEffect(() =>{
    const csrfToken = getCookie('csrftoken');
    dispatch(setCsrfToken(csrfToken));
  }, [dispatch])

  return (
    <RecoilRoot>
      <Router>
        <AppNavBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/courses" element={<ShowCourses />} />
          <Route path="/courses/:id" element={<CoursePage />} />
          <Route path="/updateCourse/:courseId" element={<UpdateCourse />} />
          <Route path="/createCourse" element={<CreateCourse />} />
          <Route path="/createUpload/:courseId" element={<CreateUpload />} />
          <Route path="/updateUpload/:uploadId" element={<UpdateUpload />} />
          <Route path="/uploads/:courseId" element={<ShowUpload />} />
          <Route path="/search/:query" element={<Search />} />
          <Route path="EmailActivate" element={<DoActivate />} />
          <Route path="/activate/:uid/:token" element={<Activate />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />} />
        </Routes>
        <Toaster />
      </Router>
    </RecoilRoot>
  );
}

export default App;
