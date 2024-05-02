import React, { useState, useEffect } from 'react';
import {
    Container,
    Paper,
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProjectForm() {
    const [projectTitle, setProjectTitle] = useState('');
    const [totalMarlas, setTotalMarlas] = useState('');
    const [stories, setStories] = useState('');
    const [address, setAddress] = useState('');
    const [date, setDate] = useState('');
    const [supervisors, setSupervisors] = useState([]);
    const [selectedSupervisor, setSelectedSupervisor] = useState('');

    useEffect(() => {
        const fetchSupervisors = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch('http://localhost:8000/auth/allSupervisors', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    credentials: "include",
                });

                if (response.ok) {
                    const data = await response.json();
                    setSupervisors(data.supervisors);
                } else {
                    console.error('Failed to fetch supervisors:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching supervisors:', error.message);
            }
        };

        fetchSupervisors();
    }, []);

    const handleCreateProject = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch('http://localhost:8000/auth/add-project', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                credentials: "include",
                body: JSON.stringify({
                    projectTitle,
                    totalMarlas: parseInt(totalMarlas, 10),
                    stories: parseInt(stories, 10),
                    address,
                    date,
                    supervisorStatus: 'requested',
                    selectedSupervisor,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Project created successfully:', data);
                toast.success('Project created successfully.');

            } else {
                console.error('Failed to create project:', response.statusText);
                toast.error('Failed to create project. Please try again.');
            }
        } catch (error) {
            console.error('Error creating project:', error.message);
        }
    };

    return (
        <>
            <div className='mb-10'>
                <Container maxWidth="xs" style={{ textAlign: 'center', marginTop: '1rem' }}>
                    <Paper elevation={20} style={{ padding: '2rem' }} >
                        <h1 className='text-2xl font-serif mx-auto mb-4 '>
                            Create a new project
                        </h1>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Project Title"
                                    fullWidth
                                    value={projectTitle}
                                    onChange={(e) => setProjectTitle(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Total Marlas"
                                    fullWidth
                                    value={totalMarlas}
                                    onChange={(e) => setTotalMarlas(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Address"
                                    fullWidth
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    type="date"
                                    fullWidth
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Stories"
                                    type="number"
                                    fullWidth
                                    value={stories}
                                    onChange={(e) => setStories(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel>Supervisor</InputLabel>
                                    <Select
                                        value={selectedSupervisor}
                                        onChange={(e) => setSelectedSupervisor(e.target.value)}
                                    >
                                        {supervisors.map((supervisor) => (
                                            <MenuItem key={supervisor._id} value={supervisor._id}>
                                                {supervisor.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <button
                                    onClick={handleCreateProject}
                                    className='mx-auto md:block p-3 px-6 pt-2 text-white bg-red-950 rounded-full self-baseline hover:bg-red-500 mt-10 mb-10 sm:mx-auto'
                                >
                                    Create Project
                                </button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
                <ToastContainer />
            </div>
        </>
    );
}

export default ProjectForm;
