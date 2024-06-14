import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';

const Notification = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);
  const [appointmentTime, setAppointmentTime] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('email');
    const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
    const storedAppointmentData = JSON.parse(localStorage.getItem(storedDoctorData?.name));
    const storedAppointmentTime = localStorage.getItem('appointmentTime');
    const storedAppointmentDate = localStorage.getItem('appointmentDate');

    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }

    if (storedDoctorData) {
      setDoctorData(storedDoctorData);
    }

    if (storedAppointmentData) {
      setAppointmentData(storedAppointmentData);
    }

    if (storedAppointmentTime) {
      setAppointmentTime(storedAppointmentTime);
    }

    if (storedAppointmentDate) {
      setAppointmentDate(storedAppointmentDate);
    }

    if (storedUsername && storedAppointmentData && storedAppointmentTime && storedAppointmentDate) {
      setShowNotification(true);
    }
  }, []);

  return (
    <div>
      <Navbar></Navbar>
      {children}
      {showNotification && (
        <>
          <div className="appointment-card">
            <div className="appointment-card__content">
              <h3 className="appointment-card__title">Appointment Details</h3>
              <p className="appointment-card__message">
                <strong>User:</strong> {username}
              </p>
              <p className="appointment-card__message">
                <strong>Doctor:</strong> {doctorData?.name}
              </p>
              <p className="appointment-card__message">
                <strong>Appointment Time:</strong> {appointmentTime}
              </p>
              <p className="appointment-card__message">
                <strong>Appointment Date:</strong> {appointmentDate}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Notification;
