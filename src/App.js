import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import LandingPage from './Components/LandingPage/LandingPage';
import Sign_Up from './Components/Sign_Up/Sign_Up';
import Login from './Components/Login/Login';
import InstantConsultation from './Components/InstantConsultationBooking/InstantConsultation';
import FindDoctorSearch from './Components/InstantConsultationBooking/FindDoctorSearch/FindDoctorSearch';
import BookingConsultation from '/Components/BookingConsultation';
import Notification from './Components/Notification/Notification';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Notification>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Sign_Up />} />
          <Route path="/login" element={<Login />} />
          <Route path="/instant-consultation" element={<InstantConsultation />} />
          <Route path='/finddoctor' element={<FindDoctorSearch />} />
          <Route path='/search/doctors' element={<BookingConsultation />} />
        </Routes>
        </Notification>
      </BrowserRouter>
    </div>
  );
}

export default App;
