
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from "axios";
import React,{useState,useEffect,useReducer} from "react";
import RestaurantTable from "../components/RestaurantTable";
import { Card, CardContent } from '@mui/material';



export default function Restaurant() {
    const [zones, setZones] = useState([]);
    const [series, setSeries] = useState([]);
    const [users, setUsers] = useState([]);
    const [zoneid, setZoneid] = useState("");
    const [serieid, setSerieid] = useState("");
    const [userid, setUserid] = useState("");
    const [nom, setNom] = useState("");
    const [longitude, setLongitude] = useState("");
    const [latitude, setLatitude] = useState("");
    const [dateOuverture, setdateopen] = useState("");
    const [dateFermeture, setdateclose] = useState("");
    const [adresse, setAdresse] = useState("");
    const [photo, setPhotos] = useState("");
    const [upTB, forceUpdate] = useReducer((x) => x + 1, 0);
    const [tableKey, setTableKey] = useState(Date.now());




    useEffect(() => {
        axios.get("http://localhost:8080/api/users/").then((response) => {
            setUsers(response.data);
        });
        axios.get("http://localhost:8080/api/series/").then((response) => {
            setSeries(response.data);
        });
        axios.get("http://localhost:8080/api/zones/").then((response) => {
            setZones(response.data);
        });
    }, [upTB]);


    const handleSubmit = (event) => {
        console.log("jsjkjksjkjkqsdjks",photo);

        event.preventDefault();
        axios.post("http://localhost:8080/api/restaurants/save", {
            nom,
            longitude,
            latitude,
            dateOuverture,
            dateFermeture,
            adresse,
            photo,
            user: {
                id: userid
            },
            zone: {
                id: zoneid
            },
            serie: {
                id: serieid
            }
        }).then((response) => {
            setNom("");
            setLatitude("");
            setLongitude("");
            setAdresse("");
            setdateclose("");
            setdateopen("");
            setPhotos("");
            setZoneid("");
            setSerieid("");
            setUserid("");
            forceUpdate();
            setTableKey(Date.now());

        });
    };


    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            setPhotos(e.target.result);
        };
        reader.readAsDataURL(file);
    };


    return (

        <Container component="main" maxWidth="lg">
            <Card sx={{ marginTop: 3 }} >
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <Box
                            sx={{
                                marginTop: 3,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >

                            <Typography component="h1" variant="h5">
                                Restaurant
                            </Typography>
                            <Box   sx={{ mt: 3 }}>
                                <Grid container spacing={2}>

                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            required
                                            fullWidth

                                            label="restaurant"

                                            autoComplete="restaurant"
                                            id="nom"
                                            value={nom}
                                            onChange={(event) => setNom(event.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            required
                                            fullWidth

                                            label="latitude"

                                            autoComplete="latitude"
                                            id="latitude"
                                            value={latitude}
                                            onChange={(event) => setLatitude(event.target.value)}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            required
                                            fullWidth

                                            label="longitude"

                                            autoComplete="longitude"
                                            id="longitude"
                                            value={longitude}
                                            onChange={(event) => setLongitude(event.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            required
                                            fullWidth

                                            label="adresse"

                                            autoComplete="adresse"
                                            id="adresse"
                                            value={adresse}
                                            onChange={(event) => setAdresse(event.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            required
                                            fullWidth

                                            label="dateopen"
                                            type="date"
                                            autoComplete="dateopen"
                                            id="dateopen"
                                            value={dateOuverture}
                                            onChange={(event) => setdateopen(event.target.value)}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            required
                                            fullWidth

                                            label="dateclose"
                                            type="date"
                                            autoComplete="dateclose"
                                            id="dateclose"
                                            value={dateFermeture}
                                            onChange={(event) => setdateclose(event.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            required
                                            fullWidth
                                            type="file" accept="image/*" onChange={handlePhotoChange}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={4} >


                                        <select
                                            className="form-control"
                                            id="cityId"
                                            value={zoneid}
                                            onChange={(event) => setZoneid(event.target.value)}
                                        >
                                            <option value="">Select a zone </option>
                                            {zones && zones.map((zone) => (
                                                <option key={zone.id} value={zone.id}>
                                                    {zone.nom}
                                                </option>
                                            ))}
                                        </select>
                                    </Grid>

                                    <Grid item xs={12} sm={4} >


                                        <select
                                            className="form-control"
                                            id="serieid"
                                            value={serieid}
                                            onChange={(event) => setSerieid(event.target.value)}
                                        >
                                            <option value="">Select a serie </option>
                                            {series && series.map((serie) => (
                                                <option key={serie.id} value={serie.id}>
                                                    {serie.nom}
                                                </option>
                                            ))}
                                        </select>
                                    </Grid>

                                    <Grid item xs={12} sm={4}>


                                        <select
                                            className="form-control"
                                            id="cityId"
                                            value={userid}
                                            onChange={(event) => setUserid(event.target.value)}
                                        >
                                            <option value="">Select  user </option>
                                            {users && users.map((user) => (
                                                <option key={user.id} value={user.id}>
                                                    {user.nom}
                                                </option>
                                            ))}
                                        </select>
                                    </Grid>

                                </Grid>
                                <Button
                                    type="submit"

                                    sx={{ mt: 3, mb: 2 }}
                                    variant="contained"
                                >
                                    add
                                </Button>


                            </Box>
                        </Box>
                    </form>
                </CardContent>
            </Card>
            <Card sx={{ marginTop: 5 }}>
                <CardContent>
                    <RestaurantTable key={tableKey} />
                </CardContent>
            </Card>
        </Container>


    );
}