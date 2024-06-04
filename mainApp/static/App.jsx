import React from 'react';
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
import { Toaster } from 'react-hot-toast';

function App() {
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
        </Routes>
        <Toaster />
      </Router>
    </RecoilRoot>
  );
}

export default App;
