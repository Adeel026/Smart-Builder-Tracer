// import React, { useState } from 'react';
// import TextField from '@mui/material/TextField';
// import 'react-toastify/dist/ReactToastify.css';
// import { toast } from 'react-toastify';
// import { Grid, Paper } from '@mui/material';
// import "./quality.css";


// const paperStyle = {
//   padding: 20,
//   height: '70vh',
//   width: 480,
//   margin: "20px auto",
// }

// const Quality = () => {
//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [contactNumber, setContactNumber] = useState('');
//   const [address, setAddress] = useState('');
//   const [fees, setFees] = useState(0);

//   const handleAppointment = async () => {
//     const calculatedFees = 4000;
//     setFees(calculatedFees);

//     const appointmentData = {
//       name: fullName,
//       email,
//       phone: contactNumber,
//       address,
//       fees: calculatedFees,
//     };

//     try {
//       const response = await fetch('http://localhost:8000/auth/create-appointment', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(appointmentData),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('Appointment created successfully:', data);
//         toast.success('Appointment booked successfully. Details sent via email.');
//       } else {
//         console.error('Failed to create appointment:', response.statusText);
//         window.alert("Failed to create an appointment")
//       }
//     } catch (error) {
//       console.error('Error creating appointment:', error.message);
//     }
//   };

//   return (
//     <>
//       <div className="quality">
//         <Grid align='center'>
//           <Paper elevation={20} style={paperStyle}>
//             <h1 className='text-3xl font-bold font-sans'>Book an Appointment for Material inspection</h1>
//             <TextField
//               label="Full Name"
//               value={fullName}
//               onChange={(e) => setFullName(e.target.value)}
//               fullWidth
//               margin="normal"
//             />
//             <TextField
//               label="Email Address"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               fullWidth
//               margin="normal"
//             />
//             <TextField
//               label="Contact Number"
//               value={contactNumber}
//               onChange={(e) => setContactNumber(e.target.value)}
//               fullWidth
//               margin="normal"
//             />
//             <TextField
//               label="Address"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               fullWidth
//               margin="normal"
//             />

//             <button
//               onClick={handleAppointment}
//               className='hidden md:block p-3 px-6 pt-2 text-white bg-red-950 rounded-full self-baseline hover:bg-red-500 mt-10 mb-10'
//             >
//               Book an Appointment now!
//             </button>
//             <div className='mt-12'>
//               <p className=' text-xl font-bold'>Quality Assurance Team Fees: {fees} PKR</p>
//             </div>
//           </Paper>
//         </Grid>
//       </div>
//     </>
//   );
// };

// export default Quality;

import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextField from '@mui/material/TextField';
import { Grid, Paper } from '@mui/material';
import './quality.css';

const paperStyle = {
  padding: 20,
  height: '70vh',
  width: 480,
  margin: '20px auto',
};

const Quality = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [fees, setFees] = useState(0);

  const handleAppointment = async () => {
    const calculatedFees = 4000;
    setFees(calculatedFees);

    const appointmentData = {
      name: fullName,
      email,
      phone: contactNumber,
      address,
      fees: calculatedFees,
    };

    try {
      const response = await fetch('http://localhost:8000/auth/create-appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Appointment created successfully:', data);
        toast.success('Appointment booked successfully. Details sent via email.');
      } else {
        console.error('Failed to create appointment:', response.statusText);
        window.alert('Failed to create an appointment');
      }
    } catch (error) {
      console.error('Error creating appointment:', error.message);
    }
  };

  return (
    <>
      <div className="quality">
        <Grid align="center">
          <Paper elevation={20} style={paperStyle}>
            <h1 className="text-3xl font-bold font-sans">Book an Appointment for Material inspection</h1>
            <TextField
              label="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Contact Number"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              fullWidth
              margin="normal"
            />

            <button
              onClick={handleAppointment}
              className="hidden md:block p-3 px-6 pt-2 text-white bg-red-950 rounded-full self-baseline hover:bg-red-500 mt-10 mb-10"
            >
              Book an Appointment now!
            </button>
            <div className="mt-12">
              <p className="text-xl font-bold">Quality Assurance Team Fees: {fees} PKR</p>
            </div>
          </Paper>
        </Grid>
      </div>
      <ToastContainer />
    </>
  );
};

export default Quality;

