import React from 'react';
import Header from './components/Header';
import Home from './components/Home';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Footer from './components/Footer';
import CalendarPage from './pages/CalendarPage';
import PrerequisiteTrees from './components/PrerequisiteTrees';

import CourseSelectionPage from './pages/CourseSelectionPage';
// import CourseInformationPage from './pages/CourseInformationPage'
// import UploadTranscript from './components/TranscriptUpload';
// import AboutUsPage from './pages/AboutUsPage';
import Signup from './pages/SignupPage';
import Roadmap from './pages/RoadmapPage'

function App() {
  return (
    <div>
      <Header/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/calendar" element={<CalendarPage/>}/>
          <Route path="/prerequisites" element={<PrerequisiteTrees/>}/>
          <Route path="/courseSelection" element={<CourseSelectionPage/> } />
          <Route path="/roadmap" element={<Roadmap />} />
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
