import React from 'react';
import Header from './components/Header';
import Home from './components/Home';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import Login from './pages/LoginPage';
import Footer from './components/Footer';
import CalendarPage from './pages/CalendarPage';
import CourseSelectionPage from './pages/CourseSelectionPage';
// import UploadTranscript from './components/TranscriptUpload';

function App() {
  return (
    <div>
      <Header/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/calendar" element={<CalendarPage/>}/>
          <Route path="/courseSelection" element={<CourseSelectionPage/> } />
          {/* <Route path="/uploadTranscript" element={<UploadTranscript/>}/> */}
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
