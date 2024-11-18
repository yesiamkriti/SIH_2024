import AppointmentStatus from './appointmentStatus';
import './doctorappointment.css';
export default function DoctorAppointment(){
    const appointments = [
        { id: 1,patientname:'demo', visitType: 'Noramal', Reference: 'Dr. Chandra', ReferenceHospital: 'Cris Velaskez', location: 'City Hospital', date: '02/06/2024',visittime:'12:00 p.m.', duration: '40 min', comments: '-',  status: `Pending` },
        { id: 2,patientname:'demo', visitType: 'Noramal', Reference: 'Dr. Chandra', ReferenceHospital: 'Cris Velaskez', location: 'City Hospital', date: '02/06/2024',visittime:'12:00 p.m.', duration: '40 min', comments: '-',  status: 'Pending' },
        { id: 3,patientname:'demo', visitType: 'Noramal', Reference: 'Dr. Chandra', ReferenceHospital: 'Cris Velaskez', location: 'City Hospital', date: '02/06/2024',visittime:'12:00 p.m.', duration: '40 min', comments: '-',  status: 'Pending' },
        { id: 4,patientname:'demo', visitType: 'Noramal', Reference: 'Dr. Chandra', ReferenceHospital: 'Cris Velaskez', location: 'City Hospital', date: '02/06/2024',visittime:'12:00 p.m.', duration: '40 min', comments: '-',  status: 'Pending' },
        { id: 5,patientname:'demo', visitType: 'Urgent', Reference: 'Dr. Chandra', ReferenceHospital: 'Cris Velaskez', location: 'City Hospital', date: '02/06/2024',visittime:'12:00 p.m.', duration: '40 min', comments: '-',  status: 'Pending' },
        { id: 6,patientname:'demo', visitType: 'Urgent', Reference: 'Dr. Chandra', ReferenceHospital: 'Cris Velaskez', location: 'City Hospital', date: '02/06/2024',visittime:'12:00 p.m.', duration: '40 min', comments: '-',  status: 'Pending' },
        { id: 7,patientname:'demo', visitType: 'Urgent', Reference: 'Dr. Chandra', ReferenceHospital: 'Cris Velaskez', location: 'City Hospital', date: '02/06/2024',visittime:'12:00 p.m.', duration: '40 min', comments: '-',  status: 'Pending' },
        { id: 8,patientname:'demo', visitType: 'Urgent', Reference: 'Dr. Chandra', ReferenceHospital: 'Cris Velaskez', location: 'City Hospital', date: '02/06/2024',visittime:'12:00 p.m.', duration: '40 min', comments: '-',  status: 'Pending' },
        { id: 9,patientname:'demo', visitType: 'Urgent', Reference: 'Dr. Chandra', ReferenceHospital: 'Cris Velaskez', location: 'City Hospital', date: '02/06/2024',visittime:'12:00 p.m.', duration: '40 min', comments: '-',  status: 'Pending' },
        { id: 10,patientname:'demo', visitType: 'Urgent', Reference: 'Dr. Chandra', ReferenceHospital: 'Cris Velaskez', location: 'City Hospital', date: '02/06/2024',visittime:'12:00 p.m.', duration: '40 min', comments: '-',  status: 'Pending' },
        { id: 11,patientname:'demo', visitType: 'Urgent', Reference: 'Dr. Chandra', ReferenceHospital: 'Cris Velaskez', location: 'City Hospital', date: '02/06/2024',visittime:'12:00 p.m.', duration: '40 min', comments: '-',  status: 'Pending' },
        { id: 12,patientname:'demo', visitType: 'Urgent', Reference: 'Dr. Chandra', ReferenceHospital: 'Cris Velaskez', location: 'City Hospital', date: '02/06/2024',visittime:'12:00 p.m.', duration: '40 min', comments: '-',  status: 'Pending' },
    ];
    return(
        <main>
            <div className="doctor-appointment-main-cont">
                <div className="Doctor-appointment-heading-cont">
                    <h1 className='Doctor-appointment-heading'>Today's Appointment</h1>
                </div>
                <div className="Doctor-Appointments-list-cont">
                <table>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Patient Name</th>
                            <th>Visit Type</th>
                            <th>Reference Doctor</th>
                            <th>Reference Hospital Name</th>
                            <th>Location</th>
                            <th>Date</th>
                            <th>Visit Time</th>
                            <th>Duration</th>
                            <th>Comments</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appointment, index) => (
                            <tr key={appointment.id}>
                                <td>{appointment.id}</td>
                                <td>{appointment.patientname}</td>
                                <td>{appointment.visitType}</td>
                                <td>{appointment.Reference}</td>
                                <td>{appointment.ReferenceHospital}</td>
                                <td>{appointment.location}</td>
                                <td>{appointment.date}</td>
                                <td>{appointment.visittime}</td>
                                <td>{appointment.duration}</td>
                                <td>{appointment.comments}</td>
                                <td className="status"><AppointmentStatus/>{appointment.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </div>
        </main>
    )
}