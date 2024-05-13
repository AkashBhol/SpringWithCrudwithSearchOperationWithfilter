import { Autocomplete, Button, Card, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CreatePerson = () => {
    const navigate=useNavigate();
    const [payload, setPayload] = useState({
        name: '',
        gender: '',
        course: '',
        dateofJoining: ''
    });

    const genderOptions = ['male', 'female', 'other'];
    const courses = ['B.tech', 'MBA', 'MCA'];

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPayload({
            ...payload,
            [name]: value
        });
    };

    const handleSubmit = () => {
        axios.post('http://localhost:8083/api/v2/post', payload)
            .then((res) => {
                Swal.fire({
                    title: 'Success!',
                    icon: 'success',
                    text: 'Your data has been successfully submitted'
                });
                setPayload({
                    name: '',
                    gender: '',
                    course: '',
                    dateofJoining: ''
                });
            })
            .catch((error) => {
                Swal.fire({
                    title: 'Error!',
                    icon: 'error',
                    text: `Error: ${error.message}`
                });
                console.error('Error:', error);
            });
    };

    const handleRefress = () => {
        setPayload({
            name: '',
            gender: '',
            course: '',
            dateofJoining: ''
        });
    };

    return (
        <>
        <Card style={{ height: '300px', width: '400px', margin: 'auto' }}>
            <Typography>
                <span style={{ color: 'blue', fontSize: '20px' }}>Person Registration Form</span>
            </Typography>
            <Grid container item xs={12} display={'flex'}>
                <Grid item xs={6}>
                    <TextField
                        size='small'
                        required
                        label='Name'
                        name='name'
                        value={payload.name}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Autocomplete
                        options={genderOptions}
                        value={payload.gender}
                        onChange={(event, value) => setPayload({ ...payload, gender: value })}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                size='small'
                                required
                                label='Gender'
                                name='gender'
                                value={payload.gender}
                                onChange={handleChange}
                            />
                        )}
                    />
                </Grid>
            </Grid>
            <Grid xs={12} display={'flex'} pt={3}>
                <Grid item xs={6}>
                    <Autocomplete
                        options={courses}
                        value={payload.course}
                        onChange={(event, value) => setPayload({ ...payload, course: value })}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                size='small'
                                required
                                label='Course'
                                name='course'
                                value={payload.course}
                                onChange={handleChange}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        size='small'
                        required
                        label='Enter Start Date'
                        name='dateofJoining'
                        value={payload.dateofJoining}
                        onChange={handleChange}
                    />
                </Grid>
            </Grid>
            <Grid item xs={12} display={'flex'} pt={3}>
                <Grid item xs={6}>
                    <Button variant='contained' onClick={handleSubmit}>
                        Save
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button variant='contained' onClick={handleRefress}>
                        Refresh
                    </Button>
                </Grid>
            </Grid>
        </Card>
        <Grid>
            <Button variant='primary' onClick={()=>navigate("/dispaly")}>Click</Button>
        </Grid>
       </> 
    );
};

export default CreatePerson;
