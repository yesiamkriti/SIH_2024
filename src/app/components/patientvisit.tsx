import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import './patientvisit.css'
// Data for different views
const dataToday = [
  { name: '8 AM', patients: 30 },
  { name: '10 AM', patients: 40 },
  { name: '12 PM', patients: 35 },
  { name: '2 PM', patients: 50 },
  { name: '4 PM', patients: 25 },
  { name: '6 PM', patients: 60 },
];

const dataWeekly = [
  { name: 'Mon', patients: 120 },
  { name: 'Tue', patients: 150 },
  { name: 'Wed', patients: 100 },
  { name: 'Thu', patients: 180 },
  { name: 'Fri', patients: 160 },
  { name: 'Sat', patients: 140 },
  { name: 'Sun', patients: 130 },
];

const dataMonthly = [
  { name: 'Week 1', patients: 400 },
  { name: 'Week 2', patients: 600 },
  { name: 'Week 3', patients: 500 },
  { name: 'Week 4', patients: 300 },
];

const dataYearly = [
  { name: 'Jan', patients: 2000 },
  { name: 'Feb', patients: 2200 },
  { name: 'Mar', patients: 1800 },
  { name: 'Apr', patients: 2400 },
  { name: 'May', patients: 2300 },
  { name: 'Jun', patients: 2000 },
  { name: 'Jul', patients: 2600 },
  { name: 'Aug', patients: 2100 },
  { name: 'Sep', patients: 2300 },
  { name: 'Oct', patients: 2500 },
  { name: 'Nov', patients: 1900 },
  { name: 'Dec', patients: 2700 },
];

export default function PatientsChart() {
  const [view, setView] = useState('Today'); // Default view is 'Monthly'

  // Select dataset based on view
  const getData = () => {
    switch (view) {
      case 'Monthly':
        return dataMonthly;
        case 'Weekly':
          return dataWeekly;
          case 'Yearly':
            return dataYearly;
          default:
          return dataToday;
    }
  };

  return (
    <div className='patientvisit-graph-main-cont'>
      {/* Buttons at the top */}
      <div className='patientvisit-graph-button' style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h2>Number Of Patient's Visit Graph</h2><br/>
        <button onClick={() => setView('Today')} style={{ margin: '0 10px' }}>Today</button>
        <button onClick={() => setView('Weekly')} style={{ margin: '0 10px' }}>Weekly</button>
        <button onClick={() => setView('Monthly')} style={{ margin: '0 10px' }}>Monthly</button>
        <button onClick={() => setView('Yearly')} style={{ margin: '0 10px' }}>Yearly</button>
      </div>

      {/* Chart below buttons */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={getData()}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip 
            cursor={{ strokeDasharray: '3 3' }} 
            animationDuration={200} // Faster tooltip animation
            itemStyle={{ transition: 'transform 0.2s ease-in-out' }}
          />
          <Line 
            type="monotone" 
            dataKey="patients" 
            stroke="#8884d8" 
            activeDot={{ r: 8 }} 
            animationDuration={500} // Faster line animation
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
