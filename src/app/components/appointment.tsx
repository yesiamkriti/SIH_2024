import './appointment.css';
import './appointmentStatus';
import AppointmentStatus from './appointmentStatus';
export default function Appointment() {
    const appointments = [
        { id: 1, visitType: 'Noramal', Doctor: 'Dr. Chandra', Hospital: 'Cris Velaskez', location: 'City Hospital', date: '02/06/2024', duration: '40 min', comments: '-',  status: `Pending` },
        { id: 2, visitType: 'Noramal', Doctor: 'Dr. Chandra', Hospital: 'Cris Velaskez', location: 'City Hospital', date: '02/06/2024', duration: '40 min', comments: '-',  status: 'Pending' },
        { id: 3, visitType: 'Noramal', Doctor: 'Dr. Chandra', Hospital: 'Cris Velaskez', location: 'City Hospital', date: '02/06/2024', duration: '40 min', comments: '-',  status: 'Pending' },
        { id: 4, visitType: 'Noramal', Doctor: 'Dr. Chandra', Hospital: 'Cris Velaskez', location: 'City Hospital', date: '02/06/2024', duration: '40 min', comments: '-',  status: 'Pending' },
        { id: 5, visitType: 'Urgent', Doctor: 'Dr. Chandra', Hospital: 'Cris Velaskez', location: 'City Hospital', date: '02/06/2024', duration: '40 min', comments: '-',  status: 'Pending' },
        { id: 6, visitType: 'Urgent', Doctor: 'Dr. Chandra', Hospital: 'Cris Velaskez', location: 'City Hospital', date: '02/06/2024', duration: '40 min', comments: '-',  status: 'Pending' },
        { id: 7, visitType: 'Urgent', Doctor: 'Dr. Chandra', Hospital: 'Cris Velaskez', location: 'City Hospital', date: '02/06/2024', duration: '40 min', comments: '-',  status: 'Pending' },
        { id: 8, visitType: 'Urgent', Doctor: 'Dr. Chandra', Hospital: 'Cris Velaskez', location: 'City Hospital', date: '02/06/2024', duration: '40 min', comments: '-',  status: 'Pending' },
        { id: 9, visitType: 'Urgent', Doctor: 'Dr. Chandra', Hospital: 'Cris Velaskez', location: 'City Hospital', date: '02/06/2024', duration: '40 min', comments: '-',  status: 'Pending' },
        { id: 10, visitType: 'Urgent', Doctor: 'Dr. Chandra', Hospital: 'Cris Velaskez', location: 'City Hospital', date: '02/06/2024', duration: '40 min', comments: '-',  status: 'Pending' },
        { id: 11, visitType: 'Urgent', Doctor: 'Dr. Chandra', Hospital: 'Cris Velaskez', location: 'City Hospital', date: '02/06/2024', duration: '40 min', comments: '-',  status: 'Pending' },
        { id: 12, visitType: 'Urgent', Doctor: 'Dr. Chandra', Hospital: 'Cris Velaskez', location: 'City Hospital', date: '02/06/2024', duration: '40 min', comments: '-',  status: 'Pending' },
    ];
    return (
        <div className="appointment-main-cont">
            <div className="Appointment-heading-cont">
                <h1 className="Appointment-heading">Appointment</h1>
                <button className="Apply-Appointment-button">Apply Appointment</button>
            </div>
            <div className="Appointments-list-cont">
                <table>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Visit Type</th>
                            <th>Doctor</th>
                            <th>Hospital Name</th>
                            <th>Location</th>
                            <th>Date</th>
                            <th>Duration</th>
                            <th>Comments</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appointment, index) => (
                            <tr key={appointment.id}>
                                <td>{appointment.id}</td>
                                <td>{appointment.visitType}</td>
                                <td>{appointment.Doctor}</td>
                                <td>{appointment.Hospital}</td>
                                <td>{appointment.location}</td>
                                <td>{appointment.date}</td>
                                <td>{appointment.duration}</td>
                                <td>{appointment.comments}</td>
                                <td className="status"><AppointmentStatus/>{appointment.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}