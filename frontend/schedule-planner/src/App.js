import React from 'react';
import Header from './components/Header';
import Home from './components/Home';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import Login from './pages/LoginPage';
import Footer from './components/Footer';
import CalendarPage from './pages/CalendarPage';
import CourseSelectionPage from './pages/CourseSelectionPage';
// import UploadTranscript from './components/TranscriptUpload';
import AboutUsPage from './pages/AboutUsPage';
import Signup from './pages/SignupPage';

function App() {
  return (
    <div>
      <Header/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/calendar" element={<CalendarPage/>}/>
          <Route path="/courseSelection" element={<CourseSelectionPage/> } />
          {/* <Route path="/uploadTranscript" element={<UploadTranscript/>}/> */}
          <Route path="/aboutus" element={<AboutUsPage />} />
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
