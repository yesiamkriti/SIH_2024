import AppointmentStatus from './appointmentStatus';
import './patientappointment.css';
export default function patientAppointment(){
    const appointments = [
        { id: 1,visitType: 'Noramal', Reference: 'Dr. Chandra', ReferenceHospital: 'Cris Velaskez', location: 'City Hospital', date: '02/06/2024',visittime:'12:00 p.m.', comments: '-',  status: `Pending` },
        { id: 2,visitType: 'Noramal', Reference: 'Dr. Chandra', ReferenceHospital: 'Cris Velaskez', location: 'City Hospital', date: '02/06/2024',visittime:'12:00 p.m.', comments: '-',  status: 'Pending' },
        { id: 3,visitType: 'Noramal', Reference: 'Dr. Chandra', ReferenceHospital: 'Cris Velaskez', location: 'City Hospital', date: '02/06/2024',visittime:'12:00 p.m.', comments: '-',  status: 'Pending' },
        { id: 4,visitType: 'Noramal', Reference: 'Dr. Chandra', ReferenceHospital: 'Cris Velaskez', location: 'City Hospital', date: '02/06/2024',visittime:'12:00 p.m.', comments: '-',  status: 'Pending' },
        { id: 5,visitType: 'Urgent', Reference: 'Dr. Chandra', ReferenceHospital: 'Cris Velaskez', location: 'City Hospital', date: '02/06/2024',visittime:'12:00 p.m.', comments: '-',  status: 'Pending' },
        { id: 6,visitType: 'Urgent', Reference: 'Dr. Chandra', ReferenceHospital: 'Cris Velaskez', location: 'City Hospital', date: '02/06/2024',visittime:'12:00 p.m.', comments: '-',  status: 'Pending' },
        { id: 7,visitType: 'Urgent', Reference: 'Dr. Chandra', ReferenceHospital: 'Cris Velaskez', location: 'City Hospital', date: '02/06/2024',visittime:'12:00 p.m.', comments: '-',  status: 'Pending' },
        { id: 8,visitType: 'Urgent', Reference: 'Dr. Chandra', ReferenceHospital: 'Cris Velaskez', location: 'City Hospital', date: '02/06/2024',visittime:'12:00 p.m.', comments: '-',  status: 'Pending' },
        { id: 9,visitType: 'Urgent', Reference: 'Dr. Chandra', ReferenceHospital: 'Cris Velaskez', location: 'City Hospital', date: '02/06/2024',visittime:'12:00 p.m.', comments: '-',  status: 'Pending' },
        { id: 10,visitType: 'Urgent', Reference: 'Dr. Chandra', ReferenceHospital: 'Cris Velaskez', location: 'City Hospital', date: '02/06/2024',visittime:'12:00 p.m.', comments: '-',  status: 'Pending' },
        { id: 11,visitType: 'Urgent', Reference: 'Dr. Chandra', ReferenceHospital: 'Cris Velaskez', location: 'City Hospital', date: '02/06/2024',visittime:'12:00 p.m.', comments: '-',  status: 'Pending' },
        { id: 12,visitType: 'Urgent', Reference: 'Dr. Chandra', ReferenceHospital: 'Cris Velaskez', location: 'City Hospital', date: '02/06/2024',visittime:'12:00 p.m.', comments: '-',  status: 'Pending' },
    ];
    return(
        <main>
            <div className="patient-appointment-main-cont">
                <div className="patient-appointment-heading-cont">
                </div>
                <div className="patient-Appointments-list-cont">
                <table>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Visit Type</th>
                            <th>Reference Doctor</th>
                            <th>Hospital Name</th>
                            <th>Location</th>
                            <th>Date</th>
                            <th>Visit Time</th>
                            <th>Comments</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appointment, index) => (
                            <tr key={appointment.id}>
                                <td>{appointment.id}</td>
                                <td>{appointment.visitType}</td>
                                <td>{appointment.Reference}</td>
                                <td>{appointment.ReferenceHospital}</td>
                                <td>{appointment.location}</td>
                                <td>{appointment.date}</td>
                                <td>{appointment.visittime}</td>
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