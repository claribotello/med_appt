import React, { useEffect, useState } from 'react';
import './BookingConsultation.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import FindDoctorSearch from './FindDoctorSearch/FindDoctorSearch';
import DoctorCard from './DoctorCard/DoctorCard';

const BookingConsultation = () => {
    const [searchParams] = useSearchParams();
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [isSearched, setIsSearched] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    const [formDetails, setFormDetails] = useState({
        doctorName: '',
        speciality: '',
        yourName: '',
        phoneNumber: '',
        date: '',
        time: ''
    });

    const getDoctorsDetails = () => {
        fetch('https://api.npoint.io/9a5543d36f1460da2f63')
            .then(res => res.json())
            .then(data => {
                if (searchParams.get('speciality')) {
                    const filtered = data.filter(doctor => doctor.speciality.toLowerCase() === searchParams.get('speciality').toLowerCase());
                    setFilteredDoctors(filtered);
                    setIsSearched(true);
                } else {
                    setFilteredDoctors([]);
                    setIsSearched(false);
                }
                setDoctors(data);
            })
            .catch(err => console.log(err));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDetails({
            ...formDetails,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (selectedDoctor) {
            // Store appointment details in local storage
            localStorage.setItem('appointmentDetails', JSON.stringify(formDetails));
            localStorage.setItem('appointmentTime', formDetails.time);
            localStorage.setItem('appointmentDate', formDetails.date);
            localStorage.setItem('doctorData', JSON.stringify({ name: selectedDoctor.name, speciality: selectedDoctor.speciality }));

            // For demo purposes, just log to console
            console.log('Appointment booked:', formDetails);
        } else {
            alert('Please select a doctor');
        }
    };

    const handleSearch = (searchText) => {
        if (searchText === '') {
            setFilteredDoctors([]);
            setIsSearched(false);
        } else {
            const filtered = doctors.filter(
                (doctor) =>
                    doctor.speciality.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredDoctors(filtered);
            setIsSearched(true);
        }
    };

    const handleDoctorSelect = (doctor) => {
        setSelectedDoctor(doctor);
        setFormDetails({
            ...formDetails,
            doctorName: doctor.name,
            speciality: doctor.speciality
        });
    };

    const navigate = useNavigate();
    useEffect(() => {
        getDoctorsDetails();
    }, [searchParams]);

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" name="doctorName" value={formDetails.doctorName} placeholder="Doctor's Name" onChange={handleChange} readOnly required />
                <input type="text" name="speciality" value={formDetails.speciality} placeholder="Speciality" onChange={handleChange} readOnly required />
                <input type="text" name="yourName" placeholder="Your Name" onChange={handleChange} required />
                <input type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} required />
                <input type="date" name="date" placeholder="Date of Appointment" onChange={handleChange} required />
                <input type="time" name="time" placeholder="Time Slot" onChange={handleChange} required />
                <button type="submit">Book Appointment</button>
            </form>

            <center>
                <div className="searchpage-container">
                    <FindDoctorSearch onSearch={handleSearch} />
                    <div className="search-results-container">
                        {isSearched ? (
                            <center>
                                <h2>{filteredDoctors.length} doctors are available {searchParams.get('location')}</h2>
                                <h3>Book appointments with minimum wait-time & verified doctor details</h3>
                                {filteredDoctors.length > 0 ? (
                                    filteredDoctors.map(doctor => (
                                        <DoctorCard 
                                            className="doctorcard" 
                                            {...doctor} 
                                            key={doctor.name}
                                            onClick={() => handleDoctorSelect(doctor)}
                                        />
                                    ))
                                ) : (
                                    <p>No doctors found.</p>
                                )}
                            </center>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            </center>
        </>
    );
};

export default BookingConsultation;
