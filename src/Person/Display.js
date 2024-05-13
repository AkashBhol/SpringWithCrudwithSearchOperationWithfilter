import React, { useState } from 'react';
import { Autocomplete, Button, Card, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Navigate } from 'react-router-dom';

const Display = () => {
    const [payload, setPayload] = useState({
        name: '',
        gender: '',
        course: '',
        dateofJoining: ''
    });

    const [records, setRecords] = useState([]);

    const genderOptions = ['male', 'female', 'other'];
    const courses = ['B.tech', 'MBA', 'MCA'];

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPayload({
            ...payload,
            [name]: value
        });
    };

    // const handleSubmit = () => {
    // axios.get('http://localhost:8083/api/v2/get/feild', payload )
    // .then((res) => {
    // Swal.fire({
    // title: 'Success!',
    // icon: 'success',
    // text: 'Your data has been successfully submitted'
    // });
    // alert(res.data)
    // setRecords(res.data);
    // })
    // .catch((error) => {
    // Swal.fire({
    // title: 'Error!',
    // icon: 'error',
    // text: `Error: ${error.message}`
    // });
    // console.error('Error:', error);
    // });
    // };

    {/* const handleSubmit = () => {
        const queryParams = new URLSearchParams(payload).toString();
        const url = `http://localhost:8083/api/v2/get/feild?${queryParams}`;
    
        // Make GET request with the constructed URL
        axios.get(url)
            .then((res) => {
                Swal.fire({
                    title: 'Success!',
                    icon: 'success',
                    text: 'Your data has been successfully submitted'
                });
                alert(res.data)
                setRecords(res.data);
            })
            .catch((error) => {
                Swal.fire({
                    title: 'Error!',
                    icon: 'error',
                    text: `Error: ${error.message}`
                });
                console.error('Error:', error);
            });
    };*/}
    const handleSubmit = () => {
        debugger
        axios.get("http://localhost:8083/api/v2/get").then((res) => {
            if (res.data.code === "PROD0000") {
                setRecords(res?.data);
            }
        })
            // console.log(JSON.stringify(records));
            .catch((Error) => {
                Swal.fire({
                    title: 'Error!',
                    icon: 'error',
                    text: 'Unable to Fetch Data'

                })
            })
    }
    // alert(JSON.stringify(records?.data))
     alert(records.length);
    const handleRefress = () => {
        setPayload({
            name: '',
            gender: '',
            course: '',
            dateofJoining: ''
        });
        setRecords([]);
    };
    console.log("Records length:", records.length);
    return (
        <>
            <Card style={{ height: '150px', width: '800px', margin: 'auto' }}>
                <Typography>
                    <span style={{ color: 'blue', fontSize: '20px' }}>Filter Page</span>
                </Typography>
                <Grid container item xs={12} display={'flex'}>
                    <Grid item xs={3}>
                        <TextField
                            size='small'
                            required
                            label='Name'
                            name='name'
                            value={payload.name}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={3}>
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
                    <Grid item xs={3}>
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
                    <Grid item xs={3}>
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
                    <Grid item xs={4} pl={4}>
                        <Button variant='contained' onClick={handleSubmit}>
                            Search
                        </Button>
                    </Grid>
                    <Grid item xs={4} pl={4}>
                        <Button variant='contained' onClick={handleRefress}>
                            Refresh
                        </Button>
                    </Grid>

                    <Grid item xs={4} pl={4}>
                        <Button variant='contained' onClick={() => Navigate("/")}>
                            back
                        </Button>
                    </Grid>
                </Grid>
            </Card>

            {/* {records.length >= 0 && (
                <div style={{ margin: '20px auto', maxWidth: '800px' }}>
                    <Typography variant="h5" align="center">Records</Typography>
                    <table style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Course</th>
                                <th>Date of Joining</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.map((record, index) => (
                                <tr key={index}>
                                    <td>{record.name}</td>
                                    <td>{record.gender}</td>
                                    <td>{record.course}</td>
                                    <td>{record.dateofJoining}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                            )}*/}

            {records.length >= 0  && (
                <div style={{ margin: '20px auto', maxWidth: '800px' }}>
                    <Typography variant="h5" align="center">Records</Typography>
                    <table style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Course</th>
                                <th>Date of Joining</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.map((record, index) => (
                                <tr key={index}>
                                    <td>{record.name}</td>
                                    <td>{record.gender}</td>
                                    <td>{record.course}</td>
                                    <td>{record.dateofJoining}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}


        </>
    );
};

export default Display;
